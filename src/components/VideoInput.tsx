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
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* 主要輸入區域 - 加大設計 */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            {/* 輸入框容器 - 加大 */}
            <div className="flex-1 relative group">
              {/* 輸入框背景光暈 */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

              <Input
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="在此貼上 YouTube 影片網址"
                error={error || undefined}
                disabled={isLoading}
                className="relative text-xl sm:text-2xl py-6 sm:py-8 px-8 sm:px-10 text-center sm:text-left transition-all duration-500 focus:scale-[1.02] hover:scale-[1.01] rounded-3xl w-full bg-gradient-to-r from-slate-600/60 via-gray-600/60 to-slate-600/60 border border-white/40 focus:border-blue-400/70 backdrop-blur-sm shadow-xl hover:shadow-2xl focus:shadow-3xl"
                aria-label="YouTube 影片網址輸入框"
                aria-describedby="url-input-help"
                autoComplete="url"
              />
            </div>

            {/* 按鈕容器 - 加大 */}
            <div className="mt-6 sm:mt-0 relative group">
              {/* 按鈕光暈效果 */}
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-pink-500/25 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow" />

              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                disabled={!url.trim() || isLoading}
                className="relative w-full sm:w-auto px-12 sm:px-16 py-6 text-xl sm:text-2xl font-semibold min-h-[70px] rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 shadow-xl hover:shadow-3xl transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-xl">檢查中...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-xl">檢查</span>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* 輔助說明 - 簡化 */}
        <div className="text-center px-8">
          <p id="url-input-help" className="text-base text-gray-300 font-light">
            目前僅支援單一影片，不支援播放清單
          </p>
        </div>
      </form>
    </div>
  );
};

export { VideoInput };