// components/InventoryManager.tsx
'use client';

import { useTradingStore } from '../store/useTradingStore';

export default function InventoryManager() {
  const { inventory } = useTradingStore();

  return (
    <div className="bg-[#101010] border border-[#1a1a1a] rounded p-4 h-[340px] flex flex-col justify-between">
      <div>
        <div className="border-b border-[#1a1a1a] pb-2 mb-2">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Inventory Allocation</h3>
          <p className="text-[10px] text-zinc-500">Risk profiles and underlying balances</p>
        </div>

        <div className="grid grid-cols-2 gap-2 font-mono text-[11px] my-2">
          <div className="bg-[#151515] p-2 rounded border border-zinc-900">
            <span className="text-[9px] text-zinc-500 block">UP-LEG BAL</span>
            <span className="text-white font-bold">{inventory.upInventory.toLocaleString()} USDC</span>
          </div>
          <div className="bg-[#151515] p-2 rounded border border-zinc-900">
            <span className="text-[9px] text-zinc-500 block">DOWN-LEG BAL</span>
            <span className="text-white font-bold">{inventory.downInventory.toLocaleString()} USDC</span>
          </div>
          <div className="bg-[#151515] p-2 rounded border border-zinc-900">
            <span className="text-[9px] text-zinc-500 block">MIDMARKET COST</span>
            <span className="text-white font-bold">${inventory.averageCost}</span>
          </div>
          <div className="bg-[#151515] p-2 rounded border border-zinc-900">
            <span className="text-[9px] text-zinc-500 block">UNREALIZED PNL</span>
            <span className="text-green-400 font-bold">+${inventory.unrealizedPnL}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1 font-mono text-[10px] border-t border-[#1a1a1a] pt-2">
        <div className="flex justify-between">
          <span className="text-zinc-500">Directional skew:</span>
          <span className="text-orange-500 font-bold">+{inventory.directionalPosition} contracts</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Leverage bounds:</span>
          <span className="text-zinc-300">1.8x / 5.0x max</span>
        </div>
      </div>
    </div>
  );
}
