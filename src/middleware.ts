import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 安全標頭
  const response = NextResponse.next();
  
  // 設定安全標頭
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // CSP 標頭
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
    "font-src 'self' fonts.gstatic.com",
    "img-src 'self' data: blob: *.youtube.com *.ytimg.com",
    "media-src 'self' blob:",
    "connect-src 'self' *.youtube.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  // 速率限制 (簡單實現)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  // 阻擋可疑的 User-Agent
  const suspiciousAgents = ['bot', 'crawler', 'spider', 'scraper'];
  const isSuspicious = suspiciousAgents.some(agent => 
    userAgent.toLowerCase().includes(agent)
  );
  
  if (isSuspicious && !userAgent.includes('Googlebot')) {
    return new NextResponse('Access Denied', { status: 403 });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * 匹配所有請求路徑除了:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};