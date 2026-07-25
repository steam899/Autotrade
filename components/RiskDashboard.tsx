// components/RiskDashboard.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';

export default function RiskDashboard() {
  const { riskMetrics } = useTradingStore();

  const usagePercent = Math.min(100, (riskMetrics.currentExposure / riskMetrics.maxExposure) * 100);

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 flex flex-col justify-between h-[350px]">
      <div className="border-b border-[#1a1a1a] pb-2">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Dynamic Risk Monitor</h3>
        <p className="text-[10px] text-zinc-500">Continuous risk framework valuation</p>
      </div>

      <div className="space-y-3.5 my-3">
        <div>
          <div className="flex justify-between text-[11px] font-mono mb-1.5">
            <span className="text-zinc-400">Exposure Capacity Used</span>
            <span className="text-zinc-300 font-bold">{usagePercent.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-900 rounded overflow-hidden border border-zinc-800">
            <div 
              className={`h-full transition-all duration-500 ${usagePercent > 80 ? 'bg-red-500' : 'bg-orange-500'}`} 
              style={{ width: `${usagePercent}%` }} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
          <div className="bg-[#151515] p-2 border border-zinc-800 rounded">
            <span className="text-zinc-500 text-[10px] block">Max Exposure Cap</span>
            <span className="text-white font-bold">${riskMetrics.maxExposure.toLocaleString()}</span>
          </div>
          <div className="bg-[#151515] p-2 border border-zinc-800 rounded">
            <span className="text-zinc-500 text-[10px] block">Daily Loss Accrued</span>
            <span className="text-red-400 font-bold">${riskMetrics.dailyLoss}</span>
          </div>
          <div className="bg-[#151515] p-2 border border-zinc-800 rounded">
            <span className="text-zinc-500 text-[10px] block">Max Allowable DD</span>
            <span className="text-zinc-300 font-bold">${riskMetrics.maxDrawdown}</span>
          </div>
          <div className="bg-[#151515] p-2 border border-zinc-800 rounded">
            <span className="text-zinc-500 text-[10px] block">Safe Position Bound</span>
            <span className="text-zinc-300 font-bold">{riskMetrics.positionLimits} BTC</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1a1a1a] pt-2.5 flex justify-between items-center text-[10px] font-mono">
        <span className="text-zinc-500">Telemetry Health Flag</span>
        <span className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">PASSED</span>
      </div>
    </div>
  );
}
