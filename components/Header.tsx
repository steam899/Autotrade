// components/Header.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';
import { TradingProvider } from '../types/trading';

export default function Header() {
  const store = useTradingStore();

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    store.setProvider(e.target.value as TradingProvider);
  };

  return (
    <header className="h-16 border-b border-[#1a1a1a] bg-[#101010]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-6">
        <div>
          <label className="block text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Active Provider</label>
          <select
            value={store.activeProvider}
            onChange={handleProviderChange}
            className="bg-[#090909] border border-zinc-800 text-xs font-bold rounded px-2.5 py-1 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="binance">Binance Spot/Futures</option>
            <option value="polymarket">Polymarket CLOB</option>
            <option value="bingx">BingX Exchange</option>
          </select>
        </div>

        <div className="h-8 w-[1px] bg-zinc-800" />

        <div className="flex items-center space-x-1">
          <label className="text-[9px] text-zinc-500 uppercase font-mono">Environment:</label>
          <button
            onClick={() => store.setTradingMode(store.tradingMode === 'live' ? 'paper' : 'live')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider transition-all ${
              store.tradingMode === 'live'
                ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
            }`}
          >
            {store.tradingMode} Trading
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-6 font-mono text-[11px]">
        <div>
          <div className="text-zinc-500 text-[9px] uppercase font-sans">Available Assets</div>
          <div className="text-white font-bold">${store.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div className="text-zinc-500 text-[9px] uppercase font-sans">Session P&L</div>
          <div className={`font-bold ${store.dailyPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {store.dailyPnL >= 0 ? '+' : ''}${store.dailyPnL.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-zinc-500 text-[9px] uppercase font-sans">Win Ratio</div>
          <div className="text-white font-bold">{(store.winRate * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-zinc-500 text-[9px] uppercase font-sans">Telemetry Ping</div>
          <div className="text-green-500 font-bold">{store.latency}ms</div>
        </div>
        <div>
          <div className="text-zinc-500 text-[9px] uppercase font-sans">Socket status</div>
          <div className={`font-bold ${store.wsConnected ? 'text-green-500' : 'text-red-500'}`}>
            ● {store.wsConnected ? 'LIVE' : 'DISC'}
          </div>
        </div>
      </div>
    </header>
  );
}
