import { Request, Response, NextFunction } from 'express';

const VALID_API_KEY = "kunai-secret-key-123";

export const authenticateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('X-API-KEY');
  if (apiKey !== VALID_API_KEY) {
    return res.status(401).json({ error: "Unauthorized", message: "Invalid API key." });
  }
  next();
};

export const checkN1nj4Ownership = (address: string) => {
  return address.startsWith("inj1abc");
};

export const requirePremium = async (req: Request, res: Response, next: NextFunction) => {
  const address = req.query.address as string;

  if (!address) {
    return res.status(400).json({ error: "Address parameter required" });
  }

  const isOwner = checkN1nj4Ownership(address);

  if (!isOwner) {
    return res.status(403).json({ 
      error: "Access Denied", 
      message: "You need to own the N1NJ4 NFT." 
    });
  }
  next();
};