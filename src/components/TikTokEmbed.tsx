import { useState } from 'react';

interface TikTokEmbedProps {
  url: string;
  className?: string;
}

const TikTokEmbed = ({ url, className = '' }: TikTokEmbedProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Extract video ID from TikTok URL
  const getTikTokEmbedUrl = (url: string) => {
    try {
      // Handle different TikTok URL formats
      const videoIdMatch = url.match(/video\/(\d+)/);
      if (videoIdMatch) {
        return `https://www.tiktok.com/embed/v2/${videoIdMatch[1]}`;
      }
      
      // Alternative format
      const alternativeMatch = url.match(/tiktok\.com\/.*?\/video\/(\d+)/);
      if (alternativeMatch) {
        return `https://www.tiktok.com/embed/v2/${alternativeMatch[1]}`;
      }
      
      return null;
    } catch (err) {
      console.error('Error parsing TikTok URL:', err);
      return null;
    }
  };

  const embedUrl = getTikTokEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 text-center ${className}`}>
        <p className="text-gray-600 text-sm">Невалиден TikTok URL</p>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Грешка при зареждане на TikTok видео</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Отвори в TikTok
            </a>
          </div>
        </div>
      )}
      
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        style={{ minHeight: '400px' }}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        title="TikTok Video"
      />
    </div>
  );
};

export default TikTokEmbed;