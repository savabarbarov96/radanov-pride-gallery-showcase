import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LazyImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
  wrapperClassName?: string;
  placeholderClassName?: string;
  wrapperStyle?: CSSProperties;
  aspectRatio?: number;
  forceLoad?: boolean;
};

const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  placeholderClassName,
  wrapperStyle,
  aspectRatio,
  forceLoad = false,
  onLoad,
  onError,
  ...imgProps
}: LazyImageProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(forceLoad);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state when image source changes so we can animate new loads
    setIsLoaded(false);
    setHasError(false);
    if (forceLoad) {
      setShouldLoad(true);
    }
  }, [src, forceLoad]);

  useEffect(() => {
    if (forceLoad) {
      setShouldLoad(true);
      return;
    }

    if (typeof window === "undefined") {
      setShouldLoad(true);
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    // Check if element is already in viewport (important for mobile/small screens)
    const checkInitialVisibility = () => {
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;

      // Check if element is in viewport with some margin
      // Note: We don't strictly require height/width > 0 because on mobile,
      // the layout might not be complete during initial render
      const isInViewport = (
        rect.top < windowHeight + 200 &&
        rect.bottom > -200 &&
        rect.left < windowWidth &&
        rect.right > 0
      );

      // If element is in viewport OR if it exists but dimensions aren't ready yet
      // (common on mobile during initial page load), mark it for loading
      const hasDimensions = rect.height > 0 && rect.width > 0;

      if (isInViewport && hasDimensions) {
        setShouldLoad(true);
        return true;
      }

      // Fallback: if element is in DOM and potentially visible but dimensions not ready,
      // still consider it visible (mobile fix)
      if (isInViewport) {
        setShouldLoad(true);
        return true;
      }

      return false;
    };

    // If already visible, don't set up observer
    if (checkInitialVisibility()) {
      return;
    }

    // Fallback timeout in case observer never fires (mobile edge cases)
    // Reduced timeout for faster loading on mobile
    const fallbackTimeout = setTimeout(() => {
      setShouldLoad(true);
    }, 500);

    // Check if IntersectionObserver is available
    if (!window.IntersectionObserver) {
      clearTimeout(fallbackTimeout);
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimeout);
            setShouldLoad(true);
            if (node) {
              observer.unobserve(node);
            }
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
      clearTimeout(fallbackTimeout);
      if (node) {
        observer.unobserve(node);
      }
      observer.disconnect();
    };
  }, [forceLoad]);

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
          loading={forceLoad ? "eager" : undefined}
          decoding={forceLoad ? "auto" : undefined}
          fetchPriority={forceLoad ? "high" : undefined}
          onLoad={handleLoad}
          onError={handleError}
          {...imgProps}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
