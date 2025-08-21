'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: '首頁' },
  { href: '/features', label: '功能亮點' },
  { href: '/guide', label: '教學' },
  { href: '/faq', label: 'FAQ' },
  { href: '/testimonials', label: '見證' },
  { href: '/status', label: '系統狀態' },
  { href: '/about', label: '關於我們' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-950/90 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo 與品牌名稱 */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl font-bold text-primary-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-1"
              aria-label="YTDownloadXPRO 首頁"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-700 to-fuchsia-700 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9.5 15.568V8.432L15.5 12l-6 3.568z" />
                </svg>
              </div>
              <span>YTDownloadXPRO</span>
            </Link>
          </div>

          {/* 桌面版導覽列 */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6" role="navigation" aria-label="主導航">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary-200 hover:text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1 min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 行動版選單按鈕 */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-800/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200 min-h-[44px] min-w-[44px]"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">開啟主選單</span>
            {!isMobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* 行動版選單 */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
        id="mobile-menu"
      >
        <nav className="px-2 pt-2 pb-3 space-y-1 bg-gray-950/90 border-t border-white/10" role="navigation" aria-label="行動版導航">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-3 text-base font-medium text-primary-200 hover:text-white hover:bg-primary-800/30 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px] flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export { Header };