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
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full px-6 py-5 text-base border rounded-2xl transition-all duration-300',
            'placeholder:text-gray-400 placeholder:font-light',
            'focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50',
            'hover:shadow-lg hover:shadow-blue-500/10',
            error
              ? 'border-red-500/50 bg-red-950/30 text-red-200 placeholder:text-red-400'
              : 'border-white/20 bg-gradient-to-r from-slate-800/60 via-gray-800/60 to-slate-800/60 text-gray-100 hover:border-white/30 focus:from-slate-700/80 focus:via-gray-700/80 focus:to-slate-700/80',
            props.disabled && 'opacity-50 cursor-not-allowed bg-gray-800/40',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-error-400"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-gray-400"
          >
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