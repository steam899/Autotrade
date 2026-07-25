// app/api/market/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTCUSDT';

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.replace('/', '')}`, {
      next: { revalidate: 1 } // Simpan cache selama 1 saat sahaja
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve data from Binance endpoint.');
    }

    const data = await response.json();

    return NextResponse.json({
      symbol: symbol,
      price: parseFloat(data.lastPrice),
      volume: parseFloat(data.volume),
      high: parseFloat(data.highPrice),
      low: parseFloat(data.lowPrice),
      bid: parseFloat(data.bidPrice),
      ask: parseFloat(data.askPrice),
      changePercent: parseFloat(data.priceChangePercent)
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal market telemetry failure' },
      { status: 500 }
    );
  }
}
