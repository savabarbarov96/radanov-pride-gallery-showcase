import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state when image source changes so we can animate new loads
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setShouldLoad(true);
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

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
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted/20",
        aspectRatio ? "w-full" : undefined,
        wrapperClassName
      )}
      style={computedStyle}
    >
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

      {shouldLoad && src ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          {...imgProps}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
