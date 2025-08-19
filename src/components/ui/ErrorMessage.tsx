import React from 'react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  variant?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = '發生錯誤',
  message,
  onRetry,
  onDismiss,
  className,
  variant = 'error',
}) => {
  const variants = {
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: 'text-red-400',
      button: 'text-red-600 hover:text-red-800',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: 'text-yellow-400',
      button: 'text-yellow-600 hover:text-yellow-800',
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'text-blue-400',
      button: 'text-blue-600 hover:text-blue-800',
    },
  };

  const getIcon = () => {
    switch (variant) {
      case 'error':
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'info':
        return (
          <svg
            className="w-5 h-5"
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
        );
    }
  };

  return (
    <div
      className={cn(
        'border rounded-lg p-4 animate-fade-in',
        variants[variant].container,
        className
      )}
      role="alert"
    >
      <div className="flex items-start">
        <div className={cn('flex-shrink-0 mr-3 mt-0.5', variants[variant].icon)}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm leading-relaxed">{message}</p>
          </div>
          
          {(onRetry || onDismiss) && (
            <div className="mt-4 flex space-x-4">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className={cn(
                    'text-sm font-medium underline transition-colors duration-200',
                    variants[variant].button
                  )}
                >
                  重試
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className={cn(
                    'text-sm font-medium underline transition-colors duration-200',
                    variants[variant].button
                  )}
                >
                  關閉
                </button>
              )}
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              'flex-shrink-0 ml-3 transition-colors duration-200',
              variants[variant].icon,
              'hover:opacity-75'
            )}
            aria-label="關閉錯誤訊息"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export { ErrorMessage };
export type { ErrorMessageProps };