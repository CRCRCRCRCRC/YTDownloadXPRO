import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT || 3001}`,
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[proxy] ${req.method} ${req.url} -> ${options.target}${proxyReq.path}`);
          });
        },
      }
    }
  }
})
