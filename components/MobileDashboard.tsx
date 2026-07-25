// components/MobileDashboard.tsx
'use client';

import { useState } from 'react';
import LiveChart from './LiveChart';
import AIProbability from './AIProbability';
import RiskDashboard from './RiskDashboard';
import OrderBook from './OrderBook';
import ArbitrageScanner from './ArbitrageScanner';
import InventoryManager from './InventoryManager';
import ExecutionEngine from './ExecutionEngine';
import RecentTrades from './RecentTrades';

type MobileTab = 'chart' | 'orderbook' | 'ai' | 'execution';

export default function MobileDashboard() {
  const [activeTab, setActiveTab] = useState<MobileTab>('chart');

  const tabs: { id: MobileTab; label: string }[] = [
    { id: 'chart', label: 'Chart' },
    { id: 'orderbook', label: 'Book & Arb' },
    { id: 'ai', label: 'AI Score' },
    { id: 'execution', label: 'Execution' }
  ];

  return (
    <div className="space-y-4 md:hidden pb-20">
      {/* Pengawal Tab Mudah Alih */}
      <div className="flex bg-[#101010] p-1 rounded border border-[#1a1a1a] overflow-x-auto scrollbar-none sticky top-16 z-40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-center py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all whitespace-nowrap px-3 ${
              activeTab === tab.id
                ? 'bg-orange-500 text-black font-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Kandungan Tab Dinamik */}
      <div className="space-y-4">
        {activeTab === 'chart' && (
          <div className="space-y-4 animate-fade-in">
            <LiveChart />
            <InventoryManager />
          </div>
        )}

        {activeTab === 'orderbook' && (
          <div className="grid grid-cols-1 gap-4 animate-fade-in">
            <OrderBook />
            <ArbitrageScanner />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 gap-4 animate-fade-in">
            <AIProbability />
            <RiskDashboard />
          </div>
        )}

        {activeTab === 'execution' && (
          <div className="space-y-4 animate-fade-in">
            <ExecutionEngine />
            <RecentTrades />
          </div>
        )}
      </div>
    </div>
  );
}
