import { useState } from 'react';

interface CatImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

const CatImageWithFallback = ({ src, alt, className = '', fallbackClassName = '' }: CatImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${className} ${fallbackClassName}`}>
        {/* Cat silhouette SVG */}
        <svg
          className="w-1/2 h-1/2 text-gray-400 opacity-60"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24l1.41-1.41C8.54 14.2 8 13.15 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.15-.54 2.2-1.17 2.83l1.41 1.41C17.33 15.16 18 13.66 18 12c0-3.31-2.69-6-6-6z"/>
          <circle cx="9" cy="10" r="1"/>
          <circle cx="15" cy="10" r="1"/>
          <path d="M12 15.5c-1.38 0-2.5-1.12-2.5-2.5h1c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h1c0 1.38-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <span className="text-xs text-gray-500 bg-white bg-opacity-80 px-2 py-1 rounded">
            Няма снимка
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default CatImageWithFallback;