import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl bg-gradient-to-br from-slate-800/80 via-gray-800/80 to-slate-700/80',
          'hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 transform-gpu group',
          'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-purple-500/10 before:to-cyan-500/10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
          'after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-white/5 after:to-transparent after:opacity-0 after:transition-opacity after:duration-700 hover:after:opacity-100',
          className
        )}
        {...props}
      >
        {/* 內容陰影層 */}
        <div className="relative rounded-2xl">
          {children}
        </div>
        
        {/* 浮動光點效果 */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60 group-hover:opacity-80" />
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float opacity-50 group-hover:opacity-70" style={{ animationDelay: '1s' }} />
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative px-8 py-6 border-b border-white/10 bg-gradient-to-b from-slate-800/60 to-slate-700/50 backdrop-blur-xl',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/10 before:to-cyan-500/10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
          className
        )}
        {...props}
      >
        {/* 裝飾性元素 */}
        <div className="absolute top-4 right-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative px-8 py-6',
          'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent',
          className
        )}
        {...props}
      >
        {/* 裝飾性背景紋理 */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMykiLz4KPC9zdmc+')] bg-repeat" style={{ backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative px-8 py-6 border-t border-white/10 bg-gradient-to-t from-slate-800/60 to-slate-700/50 backdrop-blur-xl rounded-b-2xl',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/10 before:to-cyan-500/10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
          className
        )}
        {...props}
      >
        {/* 裝飾性元素 */}
        <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps };