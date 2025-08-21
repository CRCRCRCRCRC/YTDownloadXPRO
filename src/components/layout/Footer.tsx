import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950/90 border-t border-white/10 mt-auto backdrop-blur-md shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          {/* 法律聲明 */}
          <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <p>
              請僅在遵守原平台與當地法規的前提下使用本服務。
            </p>
            <p>
              請尊重內容創作者的權利，僅作個人、合規的使用。
            </p>
          </div>
          
          {/* 版權資訊 */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} YTDownloadXPRO. 保留所有權利。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };