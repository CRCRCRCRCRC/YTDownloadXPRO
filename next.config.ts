import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 優化生產環境配置
  experimental: {
    optimizePackageImports: ['@/components', '@/lib', '@/hooks'],
  },
  
  // 圖片優化配置 - 針對 YouTube 縮圖
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com', 'i1.ytimg.com', 'i2.ytimg.com', 'i3.ytimg.com', 'i4.ytimg.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 壓縮配置
  compress: true,
  
  // 輸出配置
  output: 'standalone',
  
  // 環境變數配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // 頭部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
