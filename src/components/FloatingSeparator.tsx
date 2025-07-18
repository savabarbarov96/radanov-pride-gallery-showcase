import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FloatingSeparatorProps {
  text?: string;
  showText?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'dots' | 'lines' | 'circles';
}

const FloatingSeparator = ({ 
  text = "от вдъхновение до шедьовър", 
  showText = true,
  className = "",
  size = 'medium',
  variant = 'dots'
}: FloatingSeparatorProps) => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  const sizeClasses = {
    small: 'py-8',
    medium: 'py-12',
    large: 'py-16'
  };

  const dotSizes = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  const renderSeparator = () => {
    switch (variant) {
      case 'circles':
        return (
          <div className="flex items-center justify-center space-x-4">
            <div className={`${dotSizes[size]} rounded-full bg-muted-foreground/30 animate-float`} 
                 style={{ animationDelay: '0s' }} />
            <div className={`${dotSizes[size]} rounded-full bg-muted-foreground/50 animate-float`} 
                 style={{ animationDelay: '0.5s' }} />
            <div className={`${dotSizes[size]} rounded-full bg-muted-foreground/70 animate-float`} 
                 style={{ animationDelay: '1s' }} />
            <div className={`${dotSizes[size]} rounded-full bg-muted-foreground/50 animate-float`} 
                 style={{ animationDelay: '1.5s' }} />
            <div className={`${dotSizes[size]} rounded-full bg-muted-foreground/30 animate-float`} 
                 style={{ animationDelay: '2s' }} />
          </div>
        );
      
      case 'lines':
        return (
          <div className="flex items-center justify-center space-x-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent animate-pulse" 
                 style={{ animationDelay: '0s' }} />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent animate-pulse" 
                 style={{ animationDelay: '0.5s' }} />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent animate-pulse" 
                 style={{ animationDelay: '1s' }} />
          </div>
        );
      
      case 'dots':
      default:
        return (
          <div className="flex items-center justify-center space-x-3">
            <div className={`${dotSizes[size]} bg-muted-foreground/40 transform rotate-45 animate-float`} 
                 style={{ animationDelay: '0s' }} />
            <div className={`${dotSizes[size]} bg-muted-foreground/60 transform rotate-45 animate-float`} 
                 style={{ animationDelay: '0.3s' }} />
            <div className={`${dotSizes[size]} bg-muted-foreground/80 transform rotate-45 animate-float`} 
                 style={{ animationDelay: '0.6s' }} />
            <div className={`${dotSizes[size]} bg-muted-foreground/60 transform rotate-45 animate-float`} 
                 style={{ animationDelay: '0.9s' }} />
            <div className={`${dotSizes[size]} bg-muted-foreground/40 transform rotate-45 animate-float`} 
                 style={{ animationDelay: '1.2s' }} />
          </div>
        );
    }
  };

  return (
    <div 
      ref={elementRef}
      className={`text-center ${sizeClasses[size]} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {showText && (
        <p className="text-sm text-muted-foreground tracking-wide uppercase mb-6 animate-fade-in">
          {text}
        </p>
      )}
      
      <div className="relative">
        {renderSeparator()}
        
        {/* Decorative floating elements */}
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
          <div className="w-1 h-1 bg-muted-foreground/20 rounded-full animate-float" 
               style={{ animationDelay: '2s', animationDuration: '4s' }} />
        </div>
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
          <div className="w-1 h-1 bg-muted-foreground/20 rounded-full animate-float" 
               style={{ animationDelay: '3s', animationDuration: '4s' }} />
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 opacity-30 blur-sm">
          {renderSeparator()}
        </div>
      </div>
    </div>
  );
};

export default FloatingSeparator; 