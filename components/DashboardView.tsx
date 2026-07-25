// components/DashboardView.tsx
'use client';

import LiveChart from './LiveChart';
import AIProbability from './AIProbability';
import RiskDashboard from './RiskDashboard';
import OrderBook from './OrderBook';
import ArbitrageScanner from './ArbitrageScanner';
import InventoryManager from './InventoryManager';
import ExecutionEngine from './ExecutionEngine';
import RecentTrades from './RecentTrades';
import TerminalLogs from './TerminalLogs';

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveChart />
        </div>
        <div>
          <AIProbability />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <RiskDashboard />
        </div>
        <div>
          <OrderBook />
        </div>
        <div>
          <ArbitrageScanner />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <InventoryManager />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ExecutionEngine />
          <RecentTrades />
        </div>
      </div>

      <div>
        <TerminalLogs />
      </div>
    </div>
  );
}
