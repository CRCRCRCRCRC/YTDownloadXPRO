import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'text-white shadow-md focus:ring-blue-400 bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
      secondary: 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500 shadow-sm hover:shadow-md transition-colors duration-200',
      outline: 'border border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800/60 focus:ring-blue-400 transition-colors duration-200',
      ghost: 'text-gray-300 hover:bg-gray-700/60 focus:ring-gray-400 transition-colors duration-200',
    } as const;
    
    const sizes = {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2.5 text-base rounded-lg',
      lg: 'px-4 py-3 text-base rounded-lg',
    } as const;

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          loading && 'cursor-wait hover:scale-100 active:scale-100 bg-pos-0',
          (disabled || loading) && 'hover:scale-100 active:scale-100 hover:shadow-none hover:bg-pos-0',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {/* 發光效果層 */}
        {variant === 'primary' && (
          <span 
            aria-hidden 
            className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary-400 via-indigo-400 to-fuchsia-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
          />
        )}
        
        {/* 按鈕波紋效果背景 */}
        {variant === 'primary' && (
          <span 
            aria-hidden 
            className="absolute inset-0 rounded-inherit bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 transform -translate-x-full transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
          />
        )}
        
        {/* 內容層 */}
        <span className="relative z-10 flex items-center gap-2">
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-1.5 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
          )}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };