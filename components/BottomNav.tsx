// components/BottomNav.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';
import { LayoutDashboard, Terminal, Settings } from 'lucide-react';

export default function BottomNav() {
  const { activeView, setView, botStatus } = useTradingStore();

  const navItems = [
    { id: 'dashboard', label: 'Trade', icon: LayoutDashboard },
    { id: 'logs', label: 'Logs', icon: Terminal },
    { id: 'settings', label: 'APIs', icon: Settings }
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#101010] border-t border-[#1a1a1a] flex items-center justify-around px-4 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center space-y-1 w-16 h-full transition-all ${
              isActive ? 'text-orange-500' : 'text-zinc-500'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.id === 'logs' && botStatus === 'ACTIVE' && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
