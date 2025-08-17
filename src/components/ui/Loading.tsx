import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  className,
  text 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('animate-spin rounded-full border-4 border-gray-200 border-t-red-600', sizeClasses[size])}></div>
      {text && (
        <p className="mt-3 text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  );
};

// 全屏載入組件
export const FullScreenLoading: React.FC<{ text?: string }> = ({ text = '載入中...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-700 text-lg font-medium">{text}</p>
      </div>
    </div>
  );
};

// 脈衝載入動畫
export const PulseLoading: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex space-x-2', className)}>
      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
};