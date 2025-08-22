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
            'w-full px-6 py-4 text-base border rounded-xl transition-all duration-300',
            'placeholder:text-gray-400 placeholder:font-light',
            'focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50',
            'hover:shadow-lg hover:shadow-blue-500/10',
            error
              ? 'border-red-500/50 bg-red-950/30 text-red-200 placeholder:text-red-400'
              : 'border-white/30 bg-gradient-to-r from-slate-600/50 via-gray-600/50 to-slate-600/50 text-gray-100 hover:border-white/40 focus:from-slate-500/60 focus:via-gray-500/60 focus:to-slate-500/60',
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