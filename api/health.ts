import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from './app.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return (app as unknown as (req: any, res: any) => void)(req, res);
}

