// app/page.tsx
'use client';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardView from '../components/DashboardView';
import MobileDashboard from '../components/MobileDashboard';
import SettingsView from '../components/SettingsView';
import TerminalLogs from '../components/TerminalLogs';
import BottomNav from '../components/BottomNav';
import { useTradingStore } from '../store/useTradingStore';
import { useWebsocketSim } from '../hooks/useWebsocketSim';

export default function RootTradingConsole() {
  const { activeView } = useTradingStore();
  
  // Hidupkan aliran telemetri langsung
  useWebsocketSim();

  return (
    <div className="flex h-screen overflow-hidden bg-[#090909]">
      {/* Sidebar hanya dipaparkan pada komputer (skrin lebar) */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header atas yang melekat */}
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin pb-24 md:pb-6">
          {activeView === 'dashboard' && (
            <>
              {/* Paparan Desktop */}
              <div className="hidden md:block">
                <DashboardView />
              </div>
              
              {/* Paparan Telefon Mudah Alih */}
              <div className="block md:hidden">
                <MobileDashboard />
              </div>
            </>
          )}

          {activeView === 'logs' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="border-b border-[#1a1a1a] pb-4">
                <h1 className="text-sm md:text-lg font-bold text-white uppercase tracking-wider">Live Audit Logs</h1>
                <p className="text-[10px] md:text-xs text-zinc-500">Comprehensive real-time telemetry from AI predictions, risk valuations, and venue connections.</p>
              </div>
              <TerminalLogs />
            </div>
          )}

          {activeView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Navigasi bawah hanya dipaparkan pada skrin telefon mudah alih */}
      <BottomNav />
    </div>
  );
}
