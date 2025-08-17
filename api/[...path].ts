/**
 * Vercel catch-all API route to forward any /api/* path to our Express app
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from './app.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Express app is a request handler (req, res)
  return (app as unknown as (req: any, res: any) => void)(req, res);
}

