import { MarketData } from '../types/types';

export const getMockMarketData = (marketId: string): MarketData => {

  return {
    marketId: marketId,
    lastPrice: "25.50",
    volume24h: "1500000",
    highVolatility: true
  };
};