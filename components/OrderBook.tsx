// components/OrderBook.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';

export default function OrderBook() {
  const { orderBook, activeProvider } = useTradingStore();

  const priceDigits = activeProvider === 'polymarket' ? 4 : 1;

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 h-[340px] flex flex-col justify-between">
      <div>
        <div className="border-b border-[#1a1a1a] pb-2 mb-2">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Depth Orderbook</h3>
        </div>

        <div className="grid grid-cols-3 text-[10px] font-mono text-zinc-500 uppercase pb-1.5 border-b border-zinc-900">
          <span>Price ({activeProvider === 'polymarket' ? 'USDC' : 'USDT'})</span>
          <span className="text-right">Size</span>
          <span className="text-right">Total Depth</span>
        </div>

        <div className="space-y-[2px] pt-1">
          {orderBook.asks.slice().reverse().map((ask, idx) => (
            <div key={`ask-${idx}`} className="grid grid-cols-3 text-[11px] font-mono relative">
              <span className="text-red-500 font-medium">{ask.price.toFixed(priceDigits)}</span>
              <span className="text-right text-zinc-300">{ask.size.toFixed(2)}</span>
              <span className="text-right text-zinc-500">{ask.total.toFixed(2)}</span>
              <div className="absolute right-0 top-0 bottom-0 bg-red-500/5 pointer-events-none" style={{ width: `${(ask.size / 5) * 100}%` }} />
            </div>
          ))}
        </div>

        <div className="my-2 bg-[#151515] py-1 px-2 border-y border-[#222] flex justify-between items-center text-[11px] font-mono">
          <span className="text-zinc-500 uppercase text-[9px]">Spread</span>
          <span className="text-orange-500 font-bold">{orderBook.spread.toFixed(priceDigits)}</span>
        </div>

        <div className="space-y-[2px]">
          {orderBook.bids.map((bid, idx) => (
            <div key={`bid-${idx}`} className="grid grid-cols-3 text-[11px] font-mono relative">
              <span className="text-green-500 font-medium">{bid.price.toFixed(priceDigits)}</span>
              <span className="text-right text-zinc-300">{bid.size.toFixed(2)}</span>
              <span className="text-right text-zinc-500">{bid.total.toFixed(2)}</span>
              <div className="absolute right-0 top-0 bottom-0 bg-green-500/5 pointer-events-none" style={{ width: `${(bid.size / 5) * 100}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
