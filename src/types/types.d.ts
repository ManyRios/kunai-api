export interface MarketData {
    marketId: string;
    lastPrice: string;
    volume24h: string;
    highVolatility: boolean;
}

export interface PremiumMarket extends MarketData {
    signal: string;
    sentiment: string;
}