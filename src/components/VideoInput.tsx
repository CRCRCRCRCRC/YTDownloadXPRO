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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 主要輸入區域 */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <div className="flex-1">
              <Input
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="在此貼上 YouTube 影片網址"
                error={error || undefined}
                disabled={isLoading}
                className="text-lg sm:text-xl py-4 sm:py-5 px-5 sm:px-6 text-center sm:text-left transition-all duration-300 focus:scale-105 rounded-2xl w-full"
                aria-label="YouTube 影片網址輸入框"
                aria-describedby="url-input-help"
                autoComplete="url"
              />
            </div>
            <div className="mt-3 sm:mt-0">
              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                disabled={!url.trim() || isLoading}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 text-lg sm:text-xl font-semibold min-h-[52px] rounded-2xl"
              >
                {isLoading ? '檢查中...' : '檢查'}
              </Button>
            </div>
          </div>
        </div>

        {/* 輔助說明 */}
        <div className="text-center px-4">
          <p id="url-input-help" className="text-xs sm:text-sm text-gray-500">
            目前僅支援單一影片，不支援播放清單
          </p>
        </div>
      </form>
    </div>
  );
};

export { VideoInput };