/**
 * Vercel deploy entry handler, for serverless deployment, please don't modify this file
 */
// 確保 Vercel 補丁在所有模組載入之前執行
import './vercel-patch.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from './app.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}