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
          <Input
            type="url"
            value={url}
            onChange={handleInputChange}
            placeholder="在此貼上 YouTube 影片網址"
            error={error || undefined}
            disabled={isLoading}
            className="text-base sm:text-lg py-3 sm:py-4 px-4 sm:px-6 text-center transition-all duration-300 focus:scale-105"
            aria-label="YouTube 影片網址輸入框"
            aria-describedby="url-input-help"
            autoComplete="url"
          />
          
          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            disabled={!url.trim() || isLoading}
            className="w-full sm:w-auto mx-auto block px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold min-h-[44px]"
          >
            {isLoading ? '檢查中...' : '檢查'}
          </Button>
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