// components/SettingsView.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';
import { useState } from 'react';
import { ShieldCheck, Cpu, RefreshCw } from 'lucide-react';

export default function SettingsView() {
  const store = useTradingStore();
  const [selectedProvider, setSelectedProvider] = useState<typeof store.activeProvider>('binance');
  const [testing, setTesting] = useState(false);

  const config = store.providerConfigs[selectedProvider];

  const handleConfigChange = (field: string, value: any) => {
    store.saveProviderConfig(selectedProvider, { [field]: value });
  };

  const executeConnectionTest = async () => {
    setTesting(true);
    await store.testConnection(selectedProvider);
    setTesting(false);
  };

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-6 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-[#1a1a1a] pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Multi-Provider Settings Engine</h2>
          <p className="text-xs text-zinc-500">Configure parameters, network keys and secrets for secure transaction routing.</p>
        </div>
        <Cpu className="w-5 h-5 text-orange-500" />
      </div>

      <div className="flex space-x-2 border-b border-zinc-900 pb-4">
        {(['binance', 'polymarket', 'bingx'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProvider(p)}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all rounded ${
              selectedProvider === p
                ? 'bg-orange-500 text-black font-black'
                : 'bg-[#151515] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1.5">API Access Key</label>
            <input
              type="text"
              value={config.apiKey}
              onChange={(e) => handleConfigChange('apiKey', e.target.value)}
              className="w-full bg-[#090909] border border-zinc-800 text-xs font-mono rounded p-2 text-white focus:outline-none focus:border-orange-500"
              placeholder="0x... or standard API client string"
            />
          </div>

          <div>
            <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1.5">API Passphrase (if required)</label>
            <input
              type="password"
              value={config.apiSecret}
              onChange={(e) => handleConfigChange('apiSecret', e.target.value)}
              className="w-full bg-[#090909] border border-zinc-800 text-xs font-mono rounded p-2 text-white focus:outline-none focus:border-orange-500"
              placeholder="Secret bytes"
            />
          </div>

          {selectedProvider === 'polymarket' && (
            <div>
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1.5">Web3 Wallet Address</label>
              <input
                type="text"
                value={config.walletAddress || ''}
                onChange={(e) => handleConfigChange('walletAddress', e.target.value)}
                className="w-full bg-[#090909] border border-zinc-800 text-xs font-mono rounded p-2 text-white focus:outline-none focus:border-orange-500"
                placeholder="0x..."
              />
            </div>
          )}
        </div>

        <div className="space-y-4 bg-[#151515] p-4 rounded border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase text-zinc-300 pb-2 border-b border-zinc-900 mb-3">
              <span>Execution Sandbox</span>
              <ShieldCheck className="w-4 h-4 text-orange-500" />
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] font-mono text-zinc-400">Sandbox Testnet Mode</span>
                <input
                  type="checkbox"
                  checked={config.isTestnet}
                  onChange={(e) => handleConfigChange('isTestnet', e.target.checked)}
                  className="rounded border-zinc-800 text-orange-500 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] font-mono text-zinc-400">Futures Leverage Routing</span>
                <input
                  type="checkbox"
                  checked={config.isFutures}
                  onChange={(e) => handleConfigChange('isFutures', e.target.checked)}
                  className="rounded border-zinc-800 text-orange-500 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
            <span className="text-[10px] text-zinc-500 font-mono">
              Status: {config.isConnected ? '🟢 Connection Verified' : '🔴 Unauthenticated'}
            </span>
            <button
              onClick={executeConnectionTest}
              disabled={testing}
              className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-black text-xs font-bold py-1.5 px-3 rounded uppercase transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
