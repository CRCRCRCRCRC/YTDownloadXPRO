import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-shimmer',
        className
      )}
      {...props}
    />
  );
};

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            'h-4',
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
};

interface VideoResultSkeletonProps {
  className?: string;
}

const VideoResultSkeleton: React.FC<VideoResultSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* 標題骨架 */}
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-32 mx-auto" />
        <Skeleton className="h-1 w-16 mx-auto" />
      </div>

      {/* 內容骨架 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 縮圖骨架 */}
        <div className="lg:col-span-1">
          <Skeleton className="aspect-video rounded-lg" />
        </div>

        {/* 資訊骨架 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          
          <Skeleton className="h-8 w-48" />
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-8 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-12 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QualitySelectorSkeletonProps {
  className?: string;
}

const QualitySelectorSkeleton: React.FC<QualitySelectorSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* 標題骨架 */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* 畫質選項骨架 */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-4 h-4 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="w-5 h-5" />
          </div>
        ))}
      </div>

      {/* 下載按鈕骨架 */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
    </div>
  );
};

export { Skeleton, SkeletonText, VideoResultSkeleton, QualitySelectorSkeleton };