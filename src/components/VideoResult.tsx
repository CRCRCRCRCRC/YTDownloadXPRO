import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import type { VideoData } from '@/types';

interface VideoResultProps {
  videoData: VideoData;
  className?: string;
}

const VideoResult: React.FC<VideoResultProps> = ({ videoData, className }) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* 檢查完成標題 */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              檢查完成
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>

          {/* 影片資訊區域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 影片縮圖 */}
            <div className="lg:col-span-1">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={videoData.thumbnail}
                  alt={`${videoData.title} 的縮圖`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                {/* 時長標籤 */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                  {videoData.duration}
                </div>
              </div>
            </div>

            {/* 影片詳細資訊 */}
            <div className="lg:col-span-2 space-y-4">
              {/* 影片標題 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-2">
                  {videoData.title}
                </h3>
                <p className="text-gray-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {videoData.uploader}
                </p>
              </div>

              {/* 最高畫質標章 */}
              <div className="flex items-center space-x-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  <svg
                    className="w-4 h-4 mr-1"
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
                  偵測到最高畫質：{videoData.maxQuality}
                </div>
              </div>

              {/* 影片統計資訊 */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">
                    {videoData.availableQualities.length}
                  </div>
                  <div className="text-sm text-gray-500">可用畫質</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">
                    {videoData.duration}
                  </div>
                  <div className="text-sm text-gray-500">影片長度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { VideoResult };