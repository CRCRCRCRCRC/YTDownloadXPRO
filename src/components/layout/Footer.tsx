import React from 'react';

const SOCIAL_LINKS = [
  { href: 'https://github.com/your-username/ytdownload-xpro', label: 'GitHub', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" /></svg>
  ) },
  // 可加入更多社群
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950/90 border-t border-white/10 mt-auto backdrop-blur-md shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 text-center md:text-left">
          {/* 品牌與版權 */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <div className="w-7 h-7 bg-gradient-to-br from-primary-700 to-fuchsia-700 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9.5 15.568V8.432L15.5 12l-6 3.568z" /></svg>
              </div>
              <span className="font-bold text-primary-200 text-lg">YTDownloadXPRO</span>
            </div>
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} YTDownloadXPRO. 保留所有權利。</p>
          </div>
          {/* 聯絡與社群 */}
          <div className="space-y-2">
            <div className="flex justify-center md:justify-end gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary-200 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
            <div className="text-xs text-gray-400">
              聯絡信箱：<a href="mailto:support@ytdownloadxpro.com" className="underline hover:text-primary-300">support@ytdownloadxpro.com</a>
            </div>
          </div>
          {/* 隱私政策等連結 */}
          <div className="space-y-2">
            <div className="flex justify-center md:justify-end gap-4">
              <a href="/privacy" className="text-xs text-gray-400 hover:text-primary-200 underline transition-colors">隱私政策</a>
              <a href="/terms" className="text-xs text-gray-400 hover:text-primary-200 underline transition-colors">服務條款</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };