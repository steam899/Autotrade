// app/api/trade/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, symbol, side, quantity, type = 'MARKET' } = body;

    // Baca kunci rahsia daripada persekitaran pelayan (Vercel Env Variables)
    const apiKey = process.env[`${provider.toUpperCase()}_API_KEY`] || '';
    const apiSecret = process.env[`${provider.toUpperCase()}_API_SECRET`] || '';

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: `Missing API credentials in server environment variables for ${provider}` },
        { status: 401 }
      );
    }

    const timestamp = Date.now();
    const queryString = `symbol=${symbol.replace('/', '')}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`;
    
    // Jana tandatangan selamat HMAC SHA256 mengikut spesifikasi keselamatan bursa
    const signature = crypto
      .createHmac('sha256', apiSecret)
      .update(queryString)
      .digest('hex');

    const targetUrl = `https://api.binance.com/api/v3/order?${queryString}&signature=${signature}`;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.msg || 'Exchange transaction rejected.' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: responseData.orderId,
      status: responseData.status,
      filledQty: parseFloat(responseData.executedQty),
      avgPrice: parseFloat(responseData.price) || 0
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Transaction Route Failure' },
      { status: 500 }
    );
  }
}
