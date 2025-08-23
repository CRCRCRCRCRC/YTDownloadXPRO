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
            {/* 現代化輸入框容器 */}
            <div className="flex-1">
              <Input
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="貼上 YouTube 影片網址"
                error={error || undefined}
                disabled={isLoading}
                className="text-lg lg:text-xl py-4 lg:py-5 px-6 lg:px-8 text-left rounded-2xl w-full bg-slate-800/80 border-2 border-white/20 focus:border-purple-400/60 backdrop-blur-xl transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20 font-light placeholder:text-gray-400/60"
                aria-label="YouTube 影片網址輸入框"
                aria-describedby="url-input-help"
                autoComplete="url"
              />
            </div>

            {/* 現代化按鈕容器 */}
            <div className="mt-6 lg:mt-0">
              <Button
                type="submit"
                size="lg"
                variant="primary"
                loading={isLoading}
                disabled={!url.trim() || isLoading}
                className="w-full lg:inline-flex lg:w-auto px-8 lg:px-10 py-4 lg:py-5 text-lg font-semibold h-auto min-h-[56px] lg:min-h-[64px] rounded-xl whitespace-nowrap justify-center"
              >
                <span className="flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>檢查中...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>檢查</span>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* 簡潔輔助說明 */}
        <div className="text-center px-8">
          <p id="url-input-help" className="text-base lg:text-lg text-gray-400 font-light">
            支援單一影片下載，提供多種畫質選擇
          </p>
        </div>
      </form>
    </div>
  );
};

export { VideoInput };