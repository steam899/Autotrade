// components/LiveChart.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function LiveChart() {
  const { marketData, activeProvider } = useTradingStore();

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 h-[350px] flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
        <div className="flex items-baseline space-x-3">
          <h2 className="text-sm font-bold text-white tracking-tight">{marketData.symbol} Execution Chart</h2>
          <span className="text-xs text-zinc-500 font-mono">Spot feed index</span>
        </div>
        <div className="flex space-x-4 text-xs font-mono">
          <div>
            <span className="text-zinc-500">Price: </span>
            <span className="text-orange-500 font-bold">
              {marketData.price.toLocaleString(undefined, { minimumFractionDigits: activeProvider === 'polymarket' ? 4 : 2 })}
            </span>
          </div>
          <div>
            <span className="text-zinc-500">ATR: </span>
            <span className="text-zinc-300 font-medium">{marketData.atr}</span>
          </div>
          <div>
            <span className="text-zinc-500">RSI (14): </span>
            <span className="text-zinc-300 font-medium">{marketData.rsi.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="h-64 mt-4 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={marketData.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#444" fontSize={10} fontFamily="monospace" />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#444" 
              fontSize={10} 
              fontFamily="monospace"
              tickFormatter={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#151515', borderColor: '#222', fontSize: '11px', fontFamily: 'monospace' }}
              labelStyle={{ color: '#888' }}
              itemStyle={{ color: '#f97316' }}
            />
            <Area type="monotone" dataKey="price" stroke="#f97316" strokeWidth={1.5} fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
