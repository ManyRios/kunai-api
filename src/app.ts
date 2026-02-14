import express from 'express';
import marketRoutes from './routes/market.routes';
import analyticsRoutes from './routes/analytics.routes';
import { trackUsageService } from './services/analytics.service';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

//Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    trackUsageService(req.path);
    next();
});

//Routes
app.use('/api/v1/market', marketRoutes);
app.use('/api/v1/analytics/usage', analyticsRoutes);



export default app;