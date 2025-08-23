import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu overflow-hidden group';
    
    const variants = {
      primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-400 hover:scale-105 active:scale-95 transition-all duration-300',
      secondary: 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 shadow-md hover:shadow-lg focus:ring-gray-500 hover:scale-105 active:scale-95 transition-all duration-300',
      outline: 'border-2 border-purple-500/30 bg-transparent text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/60 focus:ring-purple-400 hover:scale-105 active:scale-95 transition-all duration-300',
      ghost: 'bg-transparent text-purple-300 hover:bg-purple-500/10 focus:ring-purple-400 hover:scale-105 active:scale-95 transition-all duration-300',
      gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white shadow-xl hover:shadow-2xl focus:ring-purple-400 hover:scale-105 active:scale-95 transition-all duration-300 animate-gradient bg-size-200 bg-pos-0 hover:bg-pos-100',
    } as const;
    
    const sizes = {
      sm: 'px-4 py-2.5 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-xl',
      xl: 'px-10 py-5 text-xl rounded-2xl',
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
        {/* 超級發光效果層 */}
        {(variant === 'primary' || variant === 'gradient') && (
          <span 
            aria-hidden 
            className="absolute inset-0 rounded-inherit bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-60 group-active:opacity-30"
          />
        )}
        
        {/* 波紋效果背景 */}
        {(variant === 'primary' || variant === 'gradient') && (
          <span 
            aria-hidden 
            className="absolute inset-0 rounded-inherit bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 transform -translate-x-full transition-all duration-700 group-hover:translate-x-full group-hover:opacity-30"
          />
        )}
        
        {/* 內容發光層 */}
        <span className="absolute inset-0 rounded-inherit bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
        
        {/* 內容層 */}
        <span className="relative z-10 flex items-center gap-3">
          {loading && (
            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          <span className="font-medium">{children}</span>
          
          {/* 懸浮圖標 */}
          {!loading && (variant === 'primary' || variant === 'gradient') && (
            <svg 
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };