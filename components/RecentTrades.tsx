// components/RecentTrades.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';

export default function RecentTrades() {
  const { recentTrades, activeProvider } = useTradingStore();

  const isPolymarket = activeProvider === 'polymarket';
  const pricePrecision = isPolymarket ? 4 : 2;

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 h-[320px] flex flex-col justify-between col-span-1 md:col-span-2">
      <div>
        <div className="border-b border-[#1a1a1a] pb-2 mb-2 flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Transaction Ledger</h3>
          <span className="text-[10px] text-zinc-500 font-mono">Last 10 executions</span>
        </div>

        <div className="overflow-y-auto max-h-[220px] scrollbar-thin pr-1">
          <table className="w-full text-left font-mono text-[11px] border-collapse">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-900 text-[10px] uppercase">
                <th className="pb-1.5">Timestamp</th>
                <th className="pb-1.5">Symbol</th>
                <th className="pb-1.5">Vector</th>
                <th className="pb-1.5">Fill Price</th>
                <th className="pb-1.5">Exit Price</th>
                <th className="pb-1.5 text-right">PnL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40">
              {recentTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-[#151515]/80">
                  <td className="py-2 text-zinc-400">{trade.time}</td>
                  <td className="py-2 text-zinc-200">{trade.market}</td>
                  <td className="py-2">
                    <span className={`px-1 rounded text-[10px] ${
                      trade.direction === 'LONG' || trade.direction === 'UP'
                        ? 'bg-green-950/30 text-green-500'
                        : 'bg-red-950/30 text-red-500'
                    }`}>
                      {trade.direction}
                    </span>
                  </td>
                  <td className="py-2 text-zinc-300">
                    ${trade.entry.toLocaleString(undefined, { minimumFractionDigits: pricePrecision })}
                  </td>
                  <td className="py-2 text-zinc-500">
                    {trade.exit ? `$${trade.exit.toLocaleString(undefined, { minimumFractionDigits: pricePrecision })}` : 'N/A'}
                  </td>
                  <td className={`py-2 text-right font-bold ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
