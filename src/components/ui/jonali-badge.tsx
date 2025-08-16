import React from 'react';
import { cn } from '@/lib/utils';

interface JonaliBadgeProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'minimal' | 'ribbon';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  text?: string;
}

const JonaliBadge: React.FC<JonaliBadgeProps> = ({ 
  className, 
  animated = true, 
  size = 'md',
  variant = 'default',
  position = 'top-right',
  text = 'Jonali'
}) => {
  const baseClasses = "inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-300";
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };
  
  const variantClasses = {
    default: "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg hover:shadow-xl hover:scale-105",
    outline: "border-2 border-pink-400 text-pink-600 bg-pink-50 hover:bg-pink-100",
    minimal: "bg-pink-100 text-pink-700 hover:bg-pink-200"
  };
  
  const animationClasses = animated ? "animate-pulse hover:animate-none" : "";
  
  if (variant === 'ribbon') {
    // Corner ribbon rendering
    const rotationClass = position === 'top-right' || position === 'bottom-left' ? 'rotate-45' : '-rotate-45';
    const anchorClasses = {
      'top-right': 'top-3 right-[-28px] sm:right-[-32px]',
      'top-left': 'top-3 left-[-28px] sm:left-[-32px]',
      'bottom-right': 'bottom-3 right-[-28px] sm:right-[-32px]',
      'bottom-left': 'bottom-3 left-[-28px] sm:left-[-32px]'
    } as const;
    const widthClasses = {
      sm: 'w-32',
      md: 'w-36',
      lg: 'w-40'
    } as const;
    return (
      <div className={cn('pointer-events-none select-none absolute z-20', anchorClasses[position], className)}>
        <div className={cn(
          'relative text-white font-semibold uppercase tracking-wider text-[10px] sm:text-xs py-1 text-center',
          'bg-gradient-to-r from-rose-600 to-pink-500 shadow-[0_4px_10px_rgba(244,63,94,0.5)]',
          'transform',
          rotationClass,
          widthClasses[size]
        )}>
          {text}
          {/* Left notch */}
          <span className="absolute left-0 top-full -mt-[1px] w-0 h-0 border-t-4 border-t-pink-700 border-l-4 border-l-transparent" />
          {/* Right notch */}
          <span className="absolute right-0 top-full -mt-[1px] w-0 h-0 border-t-4 border-t-pink-700 border-r-4 border-r-transparent" />
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      animationClasses,
      className
    )}>
      <span className="text-pink-200">💕</span>
      <span className="font-semibold tracking-wide">
        JonaliMaineCoon
      </span>
      {animated && (
        <span className="animate-ping text-pink-200 text-xs">✨</span>
      )}
    </div>
  );
};

export default JonaliBadge;