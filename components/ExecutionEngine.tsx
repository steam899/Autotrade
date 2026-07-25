// components/ExecutionEngine.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function ExecutionEngine() {
  const store = useTradingStore();
  const [orderSize, setOrderSize] = useState<number>(0.25);

  const steps: Array<typeof store.executionState> = [
    'monitoring',
    'preparing',
    'submitting',
    'waiting_fill',
    'filled'
  ];

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 h-[320px] flex flex-col justify-between col-span-1 md:col-span-1">
      <div>
        <div className="border-b border-[#1a1a1a] pb-2 mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Execution Pipeline</h3>
            <p className="text-[10px] text-zinc-500">Algorithmic routing status monitor</p>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 uppercase bg-[#151515] px-1.5 py-0.5 rounded border border-zinc-800">
            {store.executionState}
          </span>
        </div>

        <div className="flex justify-between items-center my-4 relative">
          <div className="absolute left-0 right-0 h-[1px] bg-zinc-800 z-0" />
          {steps.map((step, idx) => {
            const stepIndex = steps.indexOf(store.executionState);
            const isCompleted = steps.indexOf(step) <= stepIndex && store.executionState !== 'idle';
            const isActive = store.executionState === step;

            return (
              <div key={step} className="flex flex-col items-center z-10">
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono transition-all duration-300 ${
                    isActive 
                      ? 'bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.4)]' 
                      : isCompleted 
                        ? 'bg-green-500 text-black' 
                        : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-[8px] font-mono uppercase mt-1 text-zinc-500 max-w-[50px] text-center truncate">
                  {step.replace('_', ' ')}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Lot Size:</span>
            <input
              type="number"
              value={orderSize}
              onChange={(e) => setOrderSize(parseFloat(e.target.value) || 0.1)}
              step="0.05"
              className="bg-[#090909] border border-zinc-800 text-xs font-mono rounded px-2 py-1 w-20 text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              disabled={store.executionState !== 'idle'}
              onClick={() => store.triggerManualExecution('LONG', orderSize)}
              className="bg-green-950/20 text-green-500 hover:bg-green-500/10 border border-green-500/30 text-[10px] font-bold py-2 px-3 rounded uppercase transition-all disabled:opacity-30"
            >
              Force Buy (Ask)
            </button>
            <button
              disabled={store.executionState !== 'idle'}
              onClick={() => store.triggerManualExecution('SHORT', orderSize)}
              className="bg-red-950/20 text-red-500 hover:bg-red-500/10 border border-red-500/30 text-[10px] font-bold py-2 px-3 rounded uppercase transition-all disabled:opacity-30"
            >
              Force Sell (Bid)
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-t border-[#1a1a1a] pt-2">
        <span>Cycle latency: 45ms</span>
        <button 
          onClick={() => store.updateMetricsTick({ executionState: 'idle' })} 
          className="hover:text-orange-500 flex items-center space-x-1"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>Reset state</span>
        </button>
      </div>
    </div>
  );
}
