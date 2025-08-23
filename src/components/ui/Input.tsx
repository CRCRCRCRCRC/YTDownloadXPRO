import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-purple-300 mb-3"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {/* 輸入框發光背景 */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <input
            id={inputId}
            className={cn(
              'relative w-full px-6 py-4 text-base lg:text-lg border-2 rounded-2xl transition-all duration-300 backdrop-blur-xl',
              'placeholder:text-gray-400/60 placeholder:font-light',
              'focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400/60',
              error
                ? 'border-red-500/40 bg-red-950/40 text-red-200 placeholder:text-red-400/60 focus:shadow-lg focus:shadow-red-500/20'
                : 'border-purple-500/30 bg-gradient-to-r from-slate-800/80 via-gray-800/80 to-slate-800/80 text-gray-100 hover:border-purple-400/40 focus:from-slate-700/90 focus:via-gray-700/90 focus:to-slate-700/90 focus:shadow-lg focus:shadow-purple-500/20',
              props.disabled && 'opacity-50 cursor-not-allowed bg-gray-800/60 border-gray-600/30',
              'transform-gpu',
              className
            )}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          
          {/* 輸入框裝飾元素 */}
          {!error && !props.disabled && (
            <>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-60 group-hover:opacity-80" />
              <div className="absolute left-4 bottom-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50 group-hover:opacity-70" style={{ animationDelay: '1s' }} />
            </>
          )}
        </div>
        
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-3 text-sm text-red-400 font-medium flex items-center gap-2"
            role="alert"
          >
            <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-3 text-sm text-gray-400 font-light flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };