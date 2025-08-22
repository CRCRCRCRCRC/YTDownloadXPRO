import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className,
  size = 'md',
  variant = 'primary',
  showPercentage = false,
  label,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-700 via-indigo-800 to-fuchsia-700',
    success: 'bg-gradient-to-r from-green-600 to-green-400',
    warning: 'bg-gradient-to-r from-yellow-600 to-yellow-400',
    error: 'bg-gradient-to-r from-red-700 to-red-500',
  };
  
  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-3">
          {label && (
            <span className="text-sm font-medium text-gray-300">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-400 font-light">{Math.round(clampedValue)}%</span>
          )}
        </div>
      )}

      {/* 進度條容器 */}
      <div className="relative">
        {/* 背景軌道 */}
        <div
          className={cn(
            'w-full bg-gradient-to-r from-slate-600/60 via-gray-600/60 to-slate-600/60 rounded-full overflow-hidden backdrop-blur-sm border border-white/20',
            sizes[size]
          )}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || `進度 ${Math.round(clampedValue)}%`}
        >
          {/* 進度條 */}
          <div
            className={cn(
              'h-full transition-all duration-700 ease-out rounded-full shadow-lg relative overflow-hidden',
              variants[variant]
            )}
            style={{ width: `${clampedValue}%` }}
          >
            {/* 動態光澤效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* 脈動效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          </div>
        </div>

        {/* 進度指示器 */}
        {clampedValue > 0 && clampedValue < 100 && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-out"
            style={{ left: `${clampedValue}%` }}
          >
            <div className="w-3 h-3 bg-white rounded-full shadow-lg animate-pulse border-2 border-gray-800" />
          </div>
        )}
      </div>
    </div>
  );
};

export { ProgressBar };
export type { ProgressBarProps };