import type { Metadata, Viewport } from "next";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.vercel.app';

export const metadata: Metadata = {
  title: {
    default: "YTDownloadXPRO - YouTube 影片下載工具",
    template: "%s | YTDownloadXPRO"
  },
  description: "簡潔、高效的 YouTube 影片下載服務，支援多種畫質選擇，操作直覺零干擾。免費線上工具，無需註冊，支援 4K 高畫質下載。",
  keywords: ["YouTube", "下載", "影片", "MP4", "轉換", "4K", "高畫質", "免費", "線上工具"],
  authors: [{ name: "YTDownloadXPRO Team" }],
  creator: "YTDownloadXPRO",
  publisher: "YTDownloadXPRO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: baseUrl,
    title: 'YTDownloadXPRO - YouTube 影片下載工具',
    description: '簡潔、高效的 YouTube 影片下載服務，支援多種畫質選擇，操作直覺零干擾。',
    siteName: 'YTDownloadXPRO',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'YTDownloadXPRO - YouTube 影片下載工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YTDownloadXPRO - YouTube 影片下載工具',
    description: '簡潔、高效的 YouTube 影片下載服務，支援多種畫質選擇，操作直覺零干擾。',
    images: [`${baseUrl}/og-image.png`],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: baseUrl,
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
      </head>
      <body className="antialiased min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <ToastProvider>
          {children}
        </ToastProvider>
        
        {/* 結構化資料 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "YTDownloadXPRO",
              "description": "簡潔、高效的 YouTube 影片下載服務",
              "url": baseUrl,
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "YTDownloadXPRO Team"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
