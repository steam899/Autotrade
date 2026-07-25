// store/useTradingStore.ts
import { create } from 'zustand';
import { 
  TradingProvider, 
  TradingMode, 
  ProviderConfig, 
  MarketData, 
  AIProbabilityOutput,
  ArbitrageOpportunity,
  InventoryMetrics,
  PositionDetails,
  RiskMetrics,
  OrderBook,
  ExecutedTrade,
  LogEntry,
  ExecutionState
} from '../types/trading';

interface TradingState {
  activeView: 'dashboard' | 'logs' | 'settings';
  activeProvider: TradingProvider;
  tradingMode: TradingMode;
  botStatus: 'ACTIVE' | 'PAUSED' | 'IDLE';
  latency: number;
  cpuUsage: number;
  memoryUsage: number;
  wsConnected: boolean;
  balance: number;
  dailyPnL: number;
  totalPnL: number;
  winRate: number;
  tradesToday: number;
  providerConfigs: Record<TradingProvider, ProviderConfig>;
  marketData: MarketData;
  aiProbability: AIProbabilityOutput;
  arbitrage: ArbitrageOpportunity;
  inventory: InventoryMetrics;
  position: PositionDetails;
  riskMetrics: RiskMetrics;
  executionState: ExecutionState;
  executionTimeline: Array<{ state: ExecutionState; timestamp: string }>;
  orderBook: OrderBook;
  recentTrades: ExecutedTrade[];
  logs: LogEntry[];
  setView: (view: 'dashboard' | 'logs' | 'settings') => void;
  setProvider: (provider: TradingProvider) => void;
  setTradingMode: (mode: TradingMode) => void;
  toggleBotStatus: () => void;
  updateMarketPrice: (price: number) => void;
  updateMetricsTick: (tickData: Partial<TradingState>) => void;
  addLog: (category: LogEntry['category'], level: LogEntry['level'], message: string) => void;
  saveProviderConfig: (provider: TradingProvider, config: Partial<ProviderConfig>) => void;
  testConnection: (provider: TradingProvider) => Promise<boolean>;
  triggerManualExecution: (direction: 'UP' | 'DOWN' | 'LONG' | 'SHORT', size: number) => void;
}

const initialMarketData = (symbol: string): MarketData => ({
  symbol,
  price: symbol === 'BTC/USDT' ? 96420 : symbol === 'POLY/USDT' ? 0.4215 : 96380,
  volume: 1420500,
  liquidity: 50000000,
  bid: 96419,
  ask: 96421,
  spread: 2,
  timeRemaining: 1845,
  status: 'OPEN',
  volatility: 12.4,
  momentum: 0.85,
  ema: 96350,
  vwap: 96395,
  atr: 120,
  rsi: 58.4,
  history: Array.from({ length: 30 }, (_, i) => ({
    time: `${14 + Math.floor(i/10)}:${(i * 2) % 60}`,
    price: 96000 + i * 20 + Math.random() * 50,
    volume: 1000 + Math.random() * 500
  }))
});

const defaultConfigs: Record<TradingProvider, ProviderConfig> = {
  polymarket: {
    apiKey: '0x3a19b...f41e',
    apiSecret: '••••••••••••••••••••••••••••••••',
    walletAddress: '0x1234...abcd',
    network: 'Polygon',
    isTestnet: false,
    isFutures: false,
    isConnected: true
  },
  binance: {
    apiKey: 'bin_api_key_4a91z',
    apiSecret: '••••••••••••••••••••••••••••••••',
    isTestnet: true,
    isFutures: true,
    isConnected: true
  },
  bingx: {
    apiKey: 'bing_api_key_99ffx',
    apiSecret: '••••••••••••••••••••••••••••••••',
    isTestnet: false,
    isFutures: false,
    isConnected: false
  }
};

export const useTradingStore = create<TradingState>((set, get) => ({
  activeView: 'dashboard',
  activeProvider: 'binance',
  tradingMode: 'paper',
  botStatus: 'ACTIVE',
  latency: 14,
  cpuUsage: 8.5,
  memoryUsage: 142,
  wsConnected: true,
  balance: 125430.80,
  dailyPnL: 1420.50,
  totalPnL: 25430.80,
  winRate: 0.684,
  tradesToday: 42,
  providerConfigs: defaultConfigs,
  marketData: initialMarketData('BTC/USDT'),
  aiProbability: {
    upProbability: 64,
    downProbability: 36,
    confidenceScore: 82,
    suggestedDirection: 'UP',
    riskLevel: 'LOW',
    suggestedPositionSize: 12.5,
    expectedValue: 1.84,
    edgeScore: 78
  },
  arbitrage: {
    upPrice: 96425,
    downPrice: 96415,
    combinedPrice: 96420,
    expectedValue: 4.2,
    tradingFee: 1.1,
    netEdge: 3.1,
    status: 'GOOD'
  },
  inventory: {
    upInventory: 14200,
    downInventory: 11000,
    pairInventory: 25200,
    directionalPosition: 3200,
    averageCost: 96410,
    marketValue: 153000,
    unrealizedPnL: 420,
    realizedPnL: 2150,
    exposure: 24.3
  },
  position: {
    currentPosition: 1.25,
    direction: 'LONG',
    averageEntry: 96250,
    currentPrice: 96420,
    risk: 1.4,
    exposure: 120525,
    targetInventory: 1.5,
    stopLoss: 95400,
    takeProfit: 98000
  },
  riskMetrics: {
    currentExposure: 120525,
    maxExposure: 500000,
    dailyLoss: 350,
    maxDrawdown: 1450,
    positionLimits: 2.5,
    confidence: 82,
    tradeFrequency: 12,
    capitalAllocation: 25
  },
  executionState: 'idle',
  executionTimeline: [{ state: 'idle', timestamp: new Date().toLocaleTimeString() }],
  orderBook: {
    bids: [
      { price: 96419, size: 0.45, total: 0.45 },
      { price: 96418, size: 1.22, total: 1.67 },
      { price: 96417, size: 0.85, total: 2.52 },
      { price: 96415, size: 3.12, total: 5.64 },
      { price: 96412, size: 2.44, total: 8.08 }
    ],
    asks: [
      { price: 96421, size: 0.62, total: 0.62 },
      { price: 96422, size: 1.15, total: 1.77 },
      { price: 96425, size: 0.94, total: 2.71 },
      { price: 96428, size: 4.02, total: 6.73 },
      { price: 96430, size: 1.95, total: 8.68 }
    ],
    spread: 2
  },
  recentTrades: [
    { id: '1', time: '14:32:05', market: 'BTC/USDT', direction: 'LONG', entry: 96110, exit: 96320, pnl: 210, duration: '12m', status: 'COMPLETED' },
    { id: '2', time: '14:21:40', market: 'BTC/USDT', direction: 'SHORT', entry: 96400, exit: 96310, pnl: 90, duration: '4m', status: 'COMPLETED' },
    { id: '3', time: '13:55:12', market: 'POLY/USDT', direction: 'UP', entry: 0.4120, exit: 0.4205, pnl: 850, duration: '1h 12m', status: 'COMPLETED' },
    { id: '4', time: '13:02:11', market: 'BTC/USDT', direction: 'LONG', entry: 95950, exit: 96150, pnl: 200, duration: '45m', status: 'COMPLETED' }
  ],
  logs: [
    { timestamp: '14:35:01', category: 'SYSTEM', level: 'SUCCESS', message: 'Engine Initialization complete. All metrics OK.' },
    { timestamp: '14:35:05', category: 'MARKET', level: 'INFO', message: 'Websocket connected to Binance depth-stream @ 100ms interval' },
    { timestamp: '14:35:10', category: 'AI', level: 'INFO', message: 'AI Engine calculated probability shift: UP (64.0%) with 82% confidence' },
    { timestamp: '14:35:15', category: 'RISK', level: 'INFO', message: 'Risk exposure bounds checked. Current: 24.3%. All thresholds green.' }
  ],

  setView: (view) => set({ activeView: view }),
  setProvider: (provider) => {
    const symbol = provider === 'polymarket' ? 'POLY/USDT' : 'BTC/USDT';
    set({ 
      activeProvider: provider, 
      marketData: initialMarketData(symbol),
      wsConnected: provider !== 'bingx'
    });
    get().addLog('SYSTEM', 'INFO', `Switched trading provider adapter to [${provider.toUpperCase()}]`);
  },
  setTradingMode: (mode) => {
    set({ tradingMode: mode });
    get().addLog('SYSTEM', 'WARN', `Trading execution environment set to [${mode.toUpperCase()}]`);
  },
  toggleBotStatus: () => {
    const nextStatus = get().botStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    set({ botStatus: nextStatus });
    get().addLog('SYSTEM', nextStatus === 'ACTIVE' ? 'SUCCESS' : 'WARN', `Trading bot operations [${nextStatus}]`);
  },
  updateMarketPrice: (price) => {
    set((state) => {
      const historyCopy = [...state.marketData.history.slice(1), { time: new Date().toLocaleTimeString().slice(-8), price, volume: 1000 + Math.random() * 500 }];
      return {
        marketData: {
          ...state.marketData,
          price,
          bid: price - (Math.random() * 2),
          ask: price + (Math.random() * 2),
          spread: state.marketData.ask - state.marketData.bid,
          history: historyCopy
        }
      };
    });
  },
  updateMetricsTick: (tickData) => set((state) => ({ ...state, ...tickData })),
  addLog: (category, level, message) => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      category,
      level,
      message
    };
    set((state) => ({ logs: [newLog, ...state.logs.slice(0, 99)] }));
  },
  saveProviderConfig: (provider, config) => {
    set((state) => ({
      providerConfigs: {
        ...state.providerConfigs,
        [provider]: { ...state.providerConfigs[provider], ...config }
      }
    }));
    get().addLog('SYSTEM', 'SUCCESS', `Updated configuration metrics for ${provider.toUpperCase()}`);
  },
  testConnection: async (provider) => {
    get().addLog('SYSTEM', 'INFO', `Initiating test ping handshake to ${provider.toUpperCase()} API endpoint...`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const isSuccess = provider !== 'bingx' || get().providerConfigs.bingx.apiKey.length > 15;
    if (isSuccess) {
      set((state) => ({
        providerConfigs: {
          ...state.providerConfigs,
          [provider]: { ...state.providerConfigs[provider], isConnected: true }
        }
      }));
      get().addLog('SYSTEM', 'SUCCESS', `${provider.toUpperCase()} verification handshake completed successfully. Latency: 22ms.`);
      return true;
    } else {
      get().addLog('SYSTEM', 'ERROR', `${provider.toUpperCase()} auth failed. Invalid signature, key or missing parameters.`);
      return false;
    }
  },
  triggerManualExecution: (direction, size) => {
    const timestamp = new Date().toLocaleTimeString();
    get().addLog('EXECUTION', 'INFO', `Manual execution order triggered: ${direction} ${size} units.`);
    set({ 
      executionState: 'monitoring',
      executionTimeline: [{ state: 'monitoring', timestamp }]
    });

    const steps: ExecutionState[] = ['preparing', 'submitting', 'waiting_fill', 'filled'];
    steps.forEach((step, index) => {
      setTimeout(() => {
        const stepTime = new Date().toLocaleTimeString();
        set((state) => ({
          executionState: step,
          executionTimeline: [...state.executionTimeline, { state: step, timestamp: stepTime }],
          ...(step === 'filled' ? {
            balance: state.balance - (direction === 'SHORT' || direction === 'DOWN' ? -250 : 250),
            dailyPnL: state.dailyPnL + (Math.random() > 0.4 ? 120 : -80),
            tradesToday: state.tradesToday + 1,
            recentTrades: [
              {
                id: Math.random().toString(),
                time: stepTime,
                market: get().marketData.symbol,
                direction,
                entry: get().marketData.price,
                exit: null,
                pnl: 0,
                duration: 'ACTIVE',
                status: 'ACTIVE'
              },
              ...state.recentTrades
            ]
          } : {})
        }));
        const logMap: Record<ExecutionState, LogEntry['level']> = {
          idle: 'INFO', monitoring: 'INFO', preparing: 'INFO',
          submitting: 'INFO', waiting_fill: 'INFO', filled: 'SUCCESS',
          cancelled: 'WARN', rejected: 'ERROR', error: 'ERROR'
        };
        get().addLog('EXECUTION', logMap[step], `Order status transition -> ${step.toUpperCase()}`);
      }, (index + 1) * 800);
    });
  }
}));
