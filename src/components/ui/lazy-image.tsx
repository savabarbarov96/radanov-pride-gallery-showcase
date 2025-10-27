import { useState } from "react";
import type { CSSProperties, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LazyImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
  wrapperClassName?: string;
  placeholderClassName?: string;
  wrapperStyle?: CSSProperties;
  aspectRatio?: number;
};

const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  placeholderClassName,
  wrapperStyle,
  aspectRatio,
  onLoad,
  onError,
  ...imgProps
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad: ImgHTMLAttributes<HTMLImageElement>["onLoad"] = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError: ImgHTMLAttributes<HTMLImageElement>["onError"] = (event) => {
    setHasError(true);
    onError?.(event);
  };

  const computedStyle: CSSProperties | undefined = aspectRatio
    ? {
        paddingBottom: `${100 / aspectRatio}%`,
        ...wrapperStyle,
      }
    : wrapperStyle;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/20",
        aspectRatio ? "w-full" : undefined,
        wrapperClassName
      )}
      style={computedStyle}
    >
      {/* Placeholder / Loading State */}
      {(!isLoaded || hasError) && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wide text-muted-foreground transition-opacity duration-300",
            hasError ? "bg-muted/40" : "animate-pulse bg-muted/40",
            isLoaded && !hasError ? "opacity-0" : "opacity-100",
            placeholderClassName
          )}
        >
          {hasError ? "Image unavailable" : null}
        </div>
      )}

      {/* Actual Image */}
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...imgProps}
        />
      )}
    </div>
  );
};

export default LazyImage;
