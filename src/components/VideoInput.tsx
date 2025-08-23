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
    <div className="w-full max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* 超級現代化輸入區域 */}
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
            {/* 超級現代化輸入框容器 */}
            <div className="flex-1 relative group">
              {/* 輸入框發光背景 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Input
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="貼上 YouTube 影片網址，開始下載旅程..."
                error={error || undefined}
                disabled={isLoading}
                className="relative text-lg lg:text-xl py-4 lg:py-5 px-6 lg:px-8 text-left rounded-2xl w-full bg-slate-800/80 border-2 border-purple-500/30 focus:border-purple-400/60 backdrop-blur-xl transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20 font-light placeholder:text-gray-400/60"
                aria-label="YouTube 影片網址輸入框"
                aria-describedby="url-input-help"
                autoComplete="url"
              />
              
              {/* 輸入框裝飾元素 */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
              <div className="absolute left-4 bottom-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
            </div>

            {/* 超級現代化按鈕容器 */}
            <div className="mt-6 lg:mt-0">
              <Button
                type="submit"
                size="xl"
                variant="gradient"
                loading={isLoading}
                disabled={!url.trim() || isLoading}
                className="w-full lg:inline-flex lg:w-auto px-8 lg:px-10 py-4 lg:py-5 text-lg font-bold h-auto min-h-[56px] lg:min-h-[64px] rounded-2xl whitespace-nowrap justify-center transform-gpu"
              >
                <span className="flex items-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>檢查中...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>開始檢查</span>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* 現代化輔助說明 */}
        <div className="text-center px-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/60 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-80" />
            <p id="url-input-help" className="text-base lg:text-lg text-gray-300 font-light">
              支援單一影片下載，提供多種畫質選擇
            </p>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </form>
    </div>
  );
};

export { VideoInput };