// components/ArbitrageScanner.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';

export default function ArbitrageScanner() {
  const { arbitrage, activeProvider } = useTradingStore();

  const isPolymarket = activeProvider === 'polymarket';
  const pricePrecision = isPolymarket ? 4 : 2;

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 h-[340px] flex flex-col justify-between">
      <div>
        <div className="border-b border-[#1a1a1a] pb-2 mb-2">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Arbitrage Engine</h3>
          <p className="text-[10px] text-zinc-500">Cross-venue discrepancy calculations</p>
        </div>

        <div className="space-y-3.5 my-3 font-mono text-xs">
          <div className="flex justify-between border-b border-zinc-900 pb-1.5">
            <span className="text-zinc-500">Internal Bid Leg:</span>
            <span className="text-white font-bold">${arbitrage.upPrice.toLocaleString(undefined, { minimumFractionDigits: pricePrecision })}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-900 pb-1.5">
            <span className="text-zinc-500">External Ask Leg:</span>
            <span className="text-white font-bold">${arbitrage.downPrice.toLocaleString(undefined, { minimumFractionDigits: pricePrecision })}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-900 pb-1.5">
            <span className="text-zinc-500">Calculated Spread:</span>
            <span className="text-orange-500 font-bold">${(arbitrage.upPrice - arbitrage.downPrice).toFixed(pricePrecision)}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-900 pb-1.5">
            <span className="text-zinc-500">Base Trading Fee:</span>
            <span className="text-zinc-400">${arbitrage.tradingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Net Estimated Margin:</span>
            <span className="text-green-500 font-bold">+${arbitrage.netEdge.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#151515] p-3 rounded border border-zinc-800 flex items-center justify-between">
        <span className="text-[10px] text-zinc-500 uppercase font-mono">Arbitrage Status</span>
        <span className="text-xs font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20">
          {arbitrage.status} SIGNAL
        </span>
      </div>
    </div>
  );
}
