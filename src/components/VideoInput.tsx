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
            {/* 輸入框容器 - 正常設計 */}
            <div className="flex-1">
              <Input
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="在此貼上 YouTube 影片網址"
                error={error || undefined}
                disabled={isLoading}
                className="text-lg py-3 px-5 text-left rounded-lg w-full bg-slate-700/60 border border-white/40 focus:border-blue-400/80"
                aria-label="YouTube 影片網址輸入框"
                aria-describedby="url-input-help"
                autoComplete="url"
              />
            </div>

            {/* 按鈕容器 - 根據文字比例設計 */}
            <div className="mt-4 sm:mt-0">
              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                disabled={!url.trim() || isLoading}
                className="w-full sm:inline-flex sm:w-auto px-6 py-3 text-base font-semibold h-auto min-h-[48px] rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors duration-200 whitespace-nowrap justify-center"
              >
                <span className="flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>檢查中...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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