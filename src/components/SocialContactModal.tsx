import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';
import { CatData } from '@/services/convexCatService';
import { useSocialMediaSettings } from '@/services/convexSiteSettingsService';

interface SocialContactModalProps {
  cat: CatData | null;
  isOpen: boolean;
  onClose: () => void;
}

const SocialContactModal = ({ cat, isOpen, onClose }: SocialContactModalProps) => {
  const socialSettings = useSocialMediaSettings();
  
  if (!isOpen || !cat) return null;

  // Use global social media settings
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: socialSettings?.facebook_url || 'https://www.facebook.com/profile.php?id=61561853557367',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: socialSettings?.instagram_url || 'https://instagram.com/radanovpride',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      url: socialSettings?.tiktok_url || 'https://www.tiktok.com/@radanovpridemainecoon',
      color: 'bg-black hover:bg-gray-800',
    },
  ].filter(platform => platform.url); // Only show platforms with URLs

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl max-w-md w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-playfair text-2xl font-semibold text-foreground">
            Свържете се с нас
          </h2>
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-full w-10 h-10 p-0 border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            ×
          </Button>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <p className="text-foreground text-lg mb-2">
            За да започнем процеса за <span className="font-semibold">{cat.name}</span>
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Изпратете ни съобщение с името на котката в някоя от тези социални платформи, за да започнем процеса
          </p>
        </div>

        {/* Social Media Buttons */}
        <div className="space-y-4">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <button
                key={platform.name}
                onClick={() => handleSocialClick(platform.url)}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${platform.color}`}
              >
                <IconComponent />
                <span>Свържете се чрез {platform.name}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 pt-4 border-t border-border">
          <p className="text-muted-foreground text-xs">
            Не забравяйте да споменете името на котката: <span className="font-medium text-foreground">{cat.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialContactModal;