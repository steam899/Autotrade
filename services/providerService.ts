// services/providerService.ts
import { MarketData, ExecutedTrade, OrderBook } from '../types/trading';

export interface TradingProviderAdapter {
  providerName: string;
  fetchMarketData: (symbol: string) => Promise<MarketData>;
  fetchOrderBook: (symbol: string) => Promise<OrderBook>;
  submitOrder: (symbol: string, side: 'BUY' | 'SELL', qty: number) => Promise<boolean>;
  getTradeHistory: () => Promise<ExecutedTrade[]>;
}
