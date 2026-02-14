import { Request, Response } from 'express';
import { getMockMarketData } from '../services/injective.service';
import { checkN1nj4Ownership } from '../utils/security';
import { PremiumMarket } from '../types/types';

export const getMarketData = (req: Request, res: Response) => {
    const { marketId } = req.params;
    if(marketId){
        const id = marketId as string
        res.json(getMockMarketData(id));
    }
    
};

export const getPremiumMarketData = (req: Request, res: Response) => {
    const { marketId } = req.params;
    
    const address = req.query.address as string;

    if (marketId) {
        const id = marketId as string
        
        if (!address || !address.startsWith("inj1abc")) {
            return res.status(403).json({ error: "Access denied", message: "N1NJ4 NFT required." });
        }

        const basicData = getMockMarketData(id);
        const premiumData: PremiumMarket = {
            ...basicData,
            signal: "High probability of an upward breakout",
            sentiment: "Bullish"
        };
        res.json(premiumData);
    }

};