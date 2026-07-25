// components/Sidebar.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';
import { 
  LayoutDashboard, 
  Terminal, 
  Settings, 
  Pause, 
  Play 
} from 'lucide-react';

export default function Sidebar() {
  const { activeView, setView, botStatus, toggleBotStatus, activeProvider } = useTradingStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'logs', label: 'Logs & Audit', icon: Terminal },
    { id: 'settings', label: 'API Configuration', icon: Settings }
  ] as const;

  return (
    <aside className="w-64 bg-[#101010] border-r border-[#1a1a1a] flex flex-col justify-between">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-[#1a1a1a]">
          <span className="text-sm font-black tracking-widest text-orange-500 uppercase">
            ALPHA.PRO // ENGINE
          </span>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-orange-500/10 text-orange-500 border-l-2 border-orange-500' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#1a1a1a]">
        <div className="mb-4 rounded bg-[#090909] p-3 border border-[#222]">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase font-mono">
            <span>Core Engine</span>
            <span className={botStatus === 'ACTIVE' ? 'text-green-500' : 'text-yellow-500'}>
              ● {botStatus}
            </span>
          </div>
          <div className="mt-1 text-xs font-bold text-zinc-300">
            {activeProvider.toUpperCase()} FEED
          </div>
        </div>

        <button
          onClick={toggleBotStatus}
          className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded text-xs font-bold uppercase transition-all ${
            botStatus === 'ACTIVE'
              ? 'bg-red-950/20 text-red-500 border border-red-500/30 hover:bg-red-500/10'
              : 'bg-green-950/20 text-green-500 border border-green-500/30 hover:bg-green-500/10'
          }`}
        >
          {botStatus === 'ACTIVE' ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Halt Autopilot</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 mr-1" />
              <span>Engage Autopilot</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
