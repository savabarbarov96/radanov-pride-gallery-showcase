import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLocation } from "react-router-dom";
import { useSocialMediaSettings } from "@/services/convexSiteSettingsService";
import { Share2, X } from "lucide-react";

const SocialSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const socialSettings = useSocialMediaSettings();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleThemeToggle = () => {
    // Don't allow theme toggle on admin routes
    if (isAdminRoute) {
      return;
    }
    toggleTheme();
  };

  // Get URLs from settings or use fallback defaults
  const facebookUrl = socialSettings?.facebook_url || 'https://www.facebook.com/profile.php?id=61561853557367';
  const tiktokUrl = socialSettings?.tiktok_url || 'https://www.tiktok.com/@radanovpridemainecoon?is_from_webapp=1&sender_device=pc';
  const instagramUrl = socialSettings?.instagram_url;

  const SocialLinks = ({ mobile = false }) => (
    <>
      {/* Facebook Link */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${mobile ? 'w-10 h-10' : 'w-12 h-12'} bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors group hover:scale-110 transform duration-200`}
      >
        <svg
          className={mobile ? "w-5 h-5" : "w-6 h-6"}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* Instagram Link - Only show if URL is configured */}
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`block ${mobile ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white hover:from-purple-700 hover:to-pink-700 transition-colors group hover:scale-110 transform duration-200`}
        >
          <svg
            className={mobile ? "w-5 h-5" : "w-6 h-6"}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      )}

      {/* TikTok Link */}
      <a
        href={tiktokUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${mobile ? 'w-10 h-10' : 'w-12 h-12'} bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors group hover:scale-110 transform duration-200`}
      >
        <svg
          className={mobile ? "w-5 h-5" : "w-6 h-6"}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.15 20.1a6.34 6.34 0 0 0 10.86-4.43V7.93a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.19-.36z"/>
        </svg>
      </a>

      {/* WhatsApp Link */}
      <a
        href="https://wa.me/359888519001"
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${mobile ? 'w-10 h-10' : 'w-12 h-12'} bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors group hover:scale-110 transform duration-200`}
      >
        <svg
          className={mobile ? "w-5 h-5" : "w-6 h-6"}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.586z"/>
        </svg>
      </a>

      {/* Theme Toggle - Hidden on admin pages */}
      {!isAdminRoute && (
        <button
          onClick={handleThemeToggle}
          className={`block ${mobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group hover:scale-110 transform duration-200`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg
              className={mobile ? "w-4 h-4" : "w-5 h-5"}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
          ) : (
            <svg
              className={mobile ? "w-4 h-4" : "w-5 h-5"}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
          )}
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Desktop/Tablet Sidebar (hidden on mobile) */}
      <div className="hidden lg:block fixed left-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 hover:scale-105">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 space-y-4">
          <SocialLinks />
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-4 z-40">
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-3 space-y-3 animate-in slide-in-from-bottom-2 duration-200">
            <SocialLinks mobile={true} />
          </div>
        )}
        
        {/* FAB Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 active:scale-95"
          aria-label={isExpanded ? "Close social menu" : "Open social menu"}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <Share2 className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
};

export default SocialSidebar;