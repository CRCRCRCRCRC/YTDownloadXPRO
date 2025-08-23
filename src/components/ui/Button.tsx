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
    const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-400 hover:scale-102 active:scale-98',
      secondary: 'bg-gray-700 text-gray-100 shadow-md hover:bg-gray-600 focus:ring-gray-500 hover:scale-102 active:scale-98',
      outline: 'border-2 border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800/60 focus:ring-blue-400',
      ghost: 'text-gray-300 hover:bg-gray-700/60 focus:ring-gray-400',
      gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white shadow-xl hover:shadow-2xl focus:ring-purple-400 hover:scale-102 active:scale-98 animate-gradient bg-size-200 bg-pos-0 hover:bg-pos-100',
    } as const;
    
    const sizes = {
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-2.5 text-base rounded-lg',
      lg: 'px-4 py-3 text-lg rounded-lg',
      xl: 'px-5 py-3 text-xl rounded-lg',
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
        {/* 內容層 */}
        <span className="relative z-10 flex items-center gap-2">
          {loading && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          <span>{children}</span>
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };