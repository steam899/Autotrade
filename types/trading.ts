// types/trading.ts

export type TradingProvider = 'polymarket' | 'binance' | 'bingx';

export type TradingMode = 'live' | 'paper';

export type ExecutionState =
  | 'idle'
  | 'monitoring'
  | 'preparing'
  | 'submitting'
  | 'waiting_fill'
  | 'filled'
  | 'cancelled'
  | 'rejected'
  | 'error';

export interface ProviderConfig {
  apiKey: string;
  apiSecret: string;
  passphrase?: string;
  walletAddress?: string;
  network?: string;
  isTestnet: boolean;
  isFutures: boolean;
  isConnected: boolean;
}

export interface MarketData {
  symbol: string;
  price: number;
  volume: number;
  liquidity: number;
  bid: number;
  ask: number;
  spread: number;
  timeRemaining: number;
  status: 'OPEN' | 'CLOSED' | 'PAUSED';
  volatility: number;
  momentum: number;
  ema: number;
  vwap: number;
  atr: number;
  rsi: number;
  history: Array<{ time: string; price: number; volume: number }>;
}

export interface AIProbabilityOutput {
  upProbability: number;
  downProbability: number;
  confidenceScore: number;
  suggestedDirection: 'UP' | 'DOWN' | 'NEUTRAL';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  suggestedPositionSize: number;
  expectedValue: number;
  edgeScore: number;
}

export interface ArbitrageOpportunity {
  upPrice: number;
  downPrice: number;
  combinedPrice: number;
  expectedValue: number;
  tradingFee: number;
  netEdge: number;
  status: 'GOOD' | 'WAIT' | 'BAD';
}

export interface InventoryMetrics {
  upInventory: number;
  downInventory: number;
  pairInventory: number;
  directionalPosition: number;
  averageCost: number;
  marketValue: number;
  unrealizedPnL: number;
  realizedPnL: number;
  exposure: number;
}

export interface PositionDetails {
  currentPosition: number;
  direction: 'LONG' | 'SHORT' | 'FLAT';
  averageEntry: number;
  currentPrice: number;
  risk: number;
  exposure: number;
  targetInventory: number;
  stopLoss: number;
  takeProfit: number;
}

export interface RiskMetrics {
  currentExposure: number;
  maxExposure: number;
  dailyLoss: number;
  maxDrawdown: number;
  positionLimits: number;
  confidence: number;
  tradeFrequency: number;
  capitalAllocation: number;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
}

export interface ExecutedTrade {
  id: string;
  time: string;
  market: string;
  direction: 'UP' | 'DOWN' | 'LONG' | 'SHORT';
  entry: number;
  exit: number | null;
  pnl: number;
  duration: string;
  status: 'COMPLETED' | 'ACTIVE' | 'LIQUIDATED';
}

export interface LogEntry {
  timestamp: string;
  category: 'SYSTEM' | 'MARKET' | 'AI' | 'RISK' | 'EXECUTION' | 'PORTFOLIO';
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}