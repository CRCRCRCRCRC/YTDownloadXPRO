'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { QualityOption } from '@/types';

interface QualitySelectorProps {
  availableQualities: QualityOption[];
  maxQuality: string;
  onQualitySelect: (quality: QualityOption) => void;
  onDownload: (selectedQuality: QualityOption) => void;
  loading?: boolean;
  className?: string;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({
  availableQualities,
  maxQuality,
  onQualitySelect,
  onDownload,
  loading = false,
  className,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<QualityOption | null>(null);

  // 預設選擇最高畫質
  useEffect(() => {
    if (availableQualities.length > 0 && !selectedQuality) {
      const defaultQuality = availableQualities.find(q => q.resolution === maxQuality) || availableQualities[0];
      setSelectedQuality(defaultQuality);
      onQualitySelect(defaultQuality);
    }
  }, [availableQualities, maxQuality, selectedQuality, onQualitySelect]);

  const handleQualityChange = (quality: QualityOption) => {
    setSelectedQuality(quality);
    onQualitySelect(quality);
  };

  const handleDownload = () => {
    if (selectedQuality) {
      onDownload(selectedQuality);
    }
  };

  if (availableQualities.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">沒有可用的畫質選項</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold text-primary-200">可用畫質</h3>
        <p className="text-sm text-gray-400">選擇您想要的影片畫質</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 畫質選項列表 */}
        <div className="space-y-3">
          {availableQualities.map((quality, index) => (
            <label
              key={`${quality.resolution}-${index}`}
              className={`
                flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 transform hover:scale-102 hover:shadow-md
                ${selectedQuality?.resolution === quality.resolution
                  ? 'border-primary-500 bg-primary-900/30 shadow-md scale-102'
                  : 'border-white/10 hover:border-white/20 hover:bg-gray-900/60'
                }
                ${loading ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="quality"
                  value={quality.resolution}
                  checked={selectedQuality?.resolution === quality.resolution}
                  onChange={() => handleQualityChange(quality)}
                  disabled={loading}
                  className="w-4 h-4 text-primary-400 bg-gray-900 border-gray-700 focus:ring-primary-500"
                  aria-describedby={`quality-${quality.resolution}-description`}
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-primary-200">
                      {quality.resolution}
                    </span>
                    {quality.resolution === maxQuality && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-900/50 text-primary-200 border border-primary-700/60">
                        最高畫質
                      </span>
                    )}
                  </div>
                  <div
                    id={`quality-${quality.resolution}-description`}
                    className="text-sm text-gray-400"
                  >
                    檔案大小：約 {quality.fileSize} • 格式：{quality.format.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* 畫質圖示 */}
              <div className="flex items-center">
                <svg
                  className={`w-5 h-5 ${
                    selectedQuality?.resolution === quality.resolution
                      ? 'text-primary-400'
                      : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 9a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </label>
          ))}
        </div>

        {/* 下載按鈕 */}
        <div className="pt-4 border-t border-white/10">
          <Button
            onClick={handleDownload}
            disabled={!selectedQuality || loading}
            loading={loading}
            size="lg"
            className="w-full"
          >
            {loading ? '準備下載中...' : '下載 MP4'}
          </Button>
          
          {selectedQuality && (
            <p className="mt-2 text-sm text-gray-400 text-center">
              將下載 {selectedQuality.resolution} 畫質，檔案大小約 {selectedQuality.fileSize}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { QualitySelector };