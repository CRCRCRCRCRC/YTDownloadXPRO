'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { DownloadStatus } from '@/types';

interface DownloadProgressProps {
  progress: number;
  status: DownloadStatus;
  filename?: string;
  downloadUrl?: string;
  onReset: () => void;
  className?: string;
}

const DownloadProgress: React.FC<DownloadProgressProps> = ({
  progress,
  status,
  filename,
  downloadUrl,
  onReset,
  className,
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'preparing':
        return '正在準備…';
      case 'processing':
        return `正在處理影片（${Math.round(progress)}%）`;
      case 'packaging':
        return '正在打包…';
      case 'completed':
        return '完成！您的 MP4 已就緒';
      default:
        return '處理中…';
    }
  };

  const getStatusIcon = () => {
    if (status === 'completed') {
      return (
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-success-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    }

    return (
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-primary-600 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  };

  const handleDownload = () => {
    if (downloadUrl && filename) {
      // 創建隱藏的下載連結
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // 觸發下載
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* 狀態圖示 */}
          <div className="flex justify-center">
            {getStatusIcon()}
          </div>

          {/* 狀態文字 */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              {getStatusText()}
            </h2>
            {filename && (
              <p className="text-gray-600 text-sm">
                檔案名稱：{filename}
              </p>
            )}
          </div>

          {/* 進度條 */}
          {status !== 'completed' && (
            <div className="max-w-md mx-auto">
              <ProgressBar
                value={progress}
                showPercentage={status === 'processing'}
                variant="primary"
                size="lg"
              />
            </div>
          )}

          {/* 動作按鈕 */}
          <div className="space-y-3">
            {status === 'completed' && downloadUrl ? (
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  size="lg"
                  className="w-full sm:w-auto px-8"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  立即下載
                </Button>
                <div>
                  <Button
                    onClick={onReset}
                    variant="ghost"
                    size="md"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    回到首頁
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                請稍候，正在處理您的請求...
              </div>
            )}
          </div>

          {/* 提示訊息 */}
          {status === 'completed' && (
            <div className="bg-success-50 border border-success-200 rounded-lg p-4 text-left">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-success-400 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-success-800">
                  <p className="font-medium mb-1">下載準備完成</p>
                  <p>
                    點擊「立即下載」按鈕開始下載您的 MP4 檔案。
                    如果下載沒有自動開始，請檢查瀏覽器的下載設定。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { DownloadProgress };