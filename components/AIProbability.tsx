// components/AIProbability.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';

export default function AIProbability() {
  const { aiProbability } = useTradingStore();

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 flex flex-col justify-between h-[350px]">
      <div className="border-b border-[#1a1a1a] pb-2">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">AI Probability Core</h3>
        <p className="text-[10px] text-zinc-500">Real-time direction predictive scoring</p>
      </div>

      <div className="flex justify-around items-center my-4">
        <div className="relative flex items-center justify-center w-28 h-28">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="56" cy="56" r="48" stroke="#1f2937" strokeWidth="6" fill="transparent" />
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="#22c55e"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={301.6}
              strokeDashoffset={301.6 - (301.6 * aiProbability.upProbability) / 100}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-2xl font-black text-white font-mono">{aiProbability.upProbability}%</span>
            <span className="block text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">UP Prob</span>
          </div>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between space-x-6">
            <span className="text-zinc-500">Vector Edge:</span>
            <span className="text-green-500 font-bold">+{aiProbability.expectedValue}%</span>
          </div>
          <div className="flex justify-between space-x-6">
            <span className="text-zinc-500">Suggested Bias:</span>
            <span className="text-white font-bold bg-zinc-900 px-1 rounded">{aiProbability.suggestedDirection}</span>
          </div>
          <div className="flex justify-between space-x-6">
            <span className="text-zinc-500">Confidence:</span>
            <span className="text-orange-500 font-bold">{aiProbability.confidenceScore}/100</span>
          </div>
          <div className="flex justify-between space-x-6">
            <span className="text-zinc-500">Position Cap:</span>
            <span className="text-zinc-300">{aiProbability.suggestedPositionSize}%</span>
          </div>
        </div>
      </div>

      <div className="bg-[#151515] p-2.5 border border-zinc-800 rounded">
        <div className="flex justify-between text-[10px] uppercase text-zinc-400 font-mono">
          <span>Signal Quality Status</span>
          <span className="text-green-400">OPTIMAL</span>
        </div>
        <div className="w-full bg-zinc-800 h-1 mt-1.5 rounded overflow-hidden">
          <div className="bg-orange-500 h-full" style={{ width: `${aiProbability.edgeScore}%` }} />
        </div>
      </div>
    </div>
  );
}
