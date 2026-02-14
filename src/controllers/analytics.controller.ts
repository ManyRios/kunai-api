import { Request, Response } from 'express';
import { getAnalyticsService } from '../services/analytics.service';

export const getAnalytics = (req: Request, res: Response) => {
  try {
    const analyticsData = getAnalyticsService();
    res.json(analyticsData);
  } catch (error) {
    res.status(500).json({ error: "Error, cannot get analytics please check your connection" });
  }
};