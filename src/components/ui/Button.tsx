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
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.97] relative overflow-hidden group';
    
    const variants = {
      primary: 'text-white shadow-lg focus:ring-primary-400 bg-gradient-to-r from-primary-500 via-indigo-500 to-fuchsia-500 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:shadow-xl hover:scale-[1.02] active:shadow-md',
      secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500 shadow-sm hover:shadow-md hover:scale-[1.01]',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:to-gray-50 focus:ring-primary-500 shadow-sm hover:shadow-md hover:border-gray-400 hover:scale-[1.01]',
      ghost: 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 focus:ring-gray-500 hover:shadow-sm hover:scale-[1.01]',
    } as const;
    
    const sizes = {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2.5 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
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