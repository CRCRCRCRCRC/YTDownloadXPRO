'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useVideoInput } from '@/hooks/useVideoInput';

interface VideoInputProps {
  onCheck: (url: string) => void;
  loading?: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({ onCheck, loading = false }) => {
  const {
    url,
    error,
    isLoading,
    setUrl,
    validateUrl,
    setLoading,
  } = useVideoInput();

  // 同步外部 loading 狀態
  React.useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      return;
    }

    const validation = validateUrl();
    
    if (validation.isValid) {
      onCheck(url.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 主要輸入區域 - 超級精美設計 */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            {/* 輸入框容器 */}
            <div className="flex-1 relative group">
              {/* 輸入框背景光暈 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

              <Input
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="在此貼上 YouTube 影片網址"
                error={error || undefined}
                disabled={isLoading}
                className="relative text-lg sm:text-xl py-5 sm:py-6 px-6 sm:px-8 text-center sm:text-left transition-all duration-500 focus:scale-[1.02] hover:scale-[1.01] rounded-2xl w-full bg-gradient-to-r from-slate-800/80 via-gray-800/80 to-slate-800/80 border border-white/20 focus:border-blue-400/50 backdrop-blur-sm shadow-lg hover:shadow-xl focus:shadow-2xl"
                aria-label="YouTube 影片網址輸入框"
                aria-describedby="url-input-help"
                autoComplete="url"
              />
            </div>

            {/* 按鈕容器 */}
            <div className="mt-4 sm:mt-0 relative group">
              {/* 按鈕光暈效果 */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow" />

              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                disabled={!url.trim() || isLoading}
                className="relative w-full sm:w-auto px-10 sm:px-12 py-5 text-lg sm:text-xl font-semibold min-h-[60px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      檢查中...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      檢查
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* 輔助說明 - 優雅的設計 */}
        <div className="text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
            <p id="url-input-help" className="text-sm text-gray-400 font-light">
              目前僅支援單一影片，不支援播放清單
            </p>
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
          </div>
        </div>
      </form>
    </div>
  );
};

export { VideoInput };