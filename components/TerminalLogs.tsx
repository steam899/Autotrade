// components/TerminalLogs.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';
import { useEffect, useRef } from 'react';

export default function TerminalLogs() {
  const { logs } = useTradingStore();
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 h-[250px] flex flex-col justify-between font-mono">
      <div className="border-b border-[#1a1a1a] pb-2 mb-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Live Audit Core</h3>
        </div>
        <span className="text-[10px] text-zinc-500">System streams active</span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[160px] space-y-1 text-[11px] pr-2 scrollbar-thin">
        {logs.slice().reverse().map((log, idx) => {
          const colorMap = {
            SUCCESS: 'text-green-500',
            INFO: 'text-zinc-400',
            WARN: 'text-yellow-500',
            ERROR: 'text-red-500'
          };
          
          return (
            <div key={idx} className="flex space-x-2 leading-relaxed">
              <span className="text-zinc-600">[{log.timestamp}]</span>
              <span className={`text-[10px] font-bold tracking-tight px-1 rounded ${
                log.category === 'RISK' ? 'bg-red-950/20 text-red-400' :
                log.category === 'AI' ? 'bg-blue-950/20 text-blue-400' : 'bg-zinc-900 text-zinc-400'
              }`}>
                {log.category}
              </span>
              <span className={colorMap[log.level]}>{log.message}</span>
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
