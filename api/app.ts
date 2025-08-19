/**
 * This is a API server
 */

// 必須在所有其他 import 之前載入 Vercel 補丁
import './vercel-patch.js';

import express, { type Request, type Response, type NextFunction }  from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import videoRoutes from './routes/video.js';

// for esm mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load env
dotenv.config();


const app: express.Application = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/video', videoRoutes);

/**
 * health
 */
app.use('/api/health', (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({
    success: true,
    message: 'ok'
  });
});

/**
 * Serve built frontend (SPA) from dist
 */
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// SPA fallback: for non-API routes, serve index.html
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'));
});


/**
 * error handler middleware
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body
  });
  
  // 根據錯誤類型提供更具體的回應
  let statusCode = 500;
  let errorMessage = 'Server internal error';
  
  if (error.message.includes('YouTube') || error.message.includes('機器人')) {
    statusCode = 503;
    errorMessage = error.message;
  } else if (error.message.includes('Invalid') || error.message.includes('無效')) {
    statusCode = 400;
    errorMessage = error.message;
  }
  
  res.status(statusCode).json({
    success: false,
    error: errorMessage
  });
});

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'API not found'
  });
});

export default app;