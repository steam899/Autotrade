// app/page.tsx
'use client';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardView from '../components/DashboardView';
import SettingsView from '../components/SettingsView';
import TerminalLogs from '../components/TerminalLogs';
import { useTradingStore } from '../store/useTradingStore';
import { useWebsocketSim } from '../hooks/useWebsocketSim';

export default function RootTradingConsole() {
  const { activeView } = useTradingStore();
  
  useWebsocketSim();

  return (
    <div className="flex h-screen overflow-hidden bg-[#090909]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'logs' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="border-b border-[#1a1a1a] pb-4">
                <h1 className="text-lg font-bold text-white uppercase tracking-wider">Live Audit Logs</h1>
                <p className="text-xs text-zinc-500">Comprehensive real-time telemetry from AI predictions, risk valuations, and venue connections.</p>
              </div>
              <TerminalLogs />
            </div>
          )}
          {activeView === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
