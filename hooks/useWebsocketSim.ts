// hooks/useWebsocketSim.ts
'use client';

import { useEffect, useRef } from 'react';
import { useTradingStore } from '../store/useTradingStore';

export function useWebsocketSim() {
  const store = useTradingStore();
  const tickCounter = useRef(0);

  useEffect(() => {
    if (store.botStatus !== 'ACTIVE') return;

    const interval = setInterval(() => {
      tickCounter.current += 1;
      const currentPrice = store.marketData.price;
      const volatilityIndex = store.activeProvider === 'polymarket' ? 0.002 : 12;
      const priceDelta = (Math.random() - 0.495) * volatilityIndex;
      const nextPrice = Number((currentPrice + priceDelta).toFixed(store.activeProvider === 'polymarket' ? 4 : 2));
      
      store.updateMarketPrice(nextPrice);

      if (tickCounter.current % 3 === 0) {
        const newUp = Math.min(95, Math.max(5, Math.floor(store.aiProbability.upProbability + (Math.random() * 8 - 4))));
        const newDown = 100 - newUp;
        const edge = Number((Math.random() * 3.5).toFixed(2));
        
        store.updateMetricsTick({
          aiProbability: {
            ...store.aiProbability,
            upProbability: newUp,
            downProbability: newDown,
            confidenceScore: Math.floor(70 + Math.random() * 25),
            expectedValue: edge,
            suggestedDirection: newUp > 60 ? 'UP' : newDown > 60 ? 'DOWN' : 'NEUTRAL'
          }
        });
      }

      if (tickCounter.current % 4 === 0) {
        const bidPrice = nextPrice - 1;
        const askPrice = nextPrice + 1;
        store.updateMetricsTick({
          orderBook: {
            bids: [
              { price: bidPrice, size: Number((0.1 + Math.random() * 2).toFixed(2)), total: 0.5 },
              { price: bidPrice - 1, size: Number((0.5 + Math.random() * 3).toFixed(2)), total: 2.1 },
              { price: bidPrice - 3, size: Number((1.5 + Math.random() * 5).toFixed(2)), total: 5.4 }
            ],
            asks: [
              { price: askPrice, size: Number((0.1 + Math.random() * 2).toFixed(2)), total: 0.6 },
              { price: askPrice + 1, size: Number((0.5 + Math.random() * 3).toFixed(2)), total: 1.8 },
              { price: askPrice + 3, size: Number((1.5 + Math.random() * 5).toFixed(2)), total: 4.9 }
            ],
            spread: Number((askPrice - bidPrice).toFixed(2))
          }
        });
      }

      if (tickCounter.current % 12 === 0) {
        const pnlShift = (Math.random() - 0.45) * 45;
        store.updateMetricsTick({
          latency: Math.floor(10 + Math.random() * 15),
          cpuUsage: Number((5 + Math.random() * 8).toFixed(1)),
          dailyPnL: Number((store.dailyPnL + pnlShift).toFixed(2)),
          balance: Number((store.balance + pnlShift).toFixed(2))
        });

        if (Math.random() > 0.8) {
          store.addLog('MARKET', 'INFO', `Consensus execution levels processed across matching engines.`);
        }
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [store, store.botStatus, store.activeProvider]);
}
