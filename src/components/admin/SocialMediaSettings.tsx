import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, Save } from 'lucide-react';
import { 
  useSocialMediaSettings, 
  useUpdateSocialMediaSettings 
} from '@/services/convexSiteSettingsService';

const SocialMediaSettings = () => {
  const socialSettings = useSocialMediaSettings();
  const updateSocialSettings = useUpdateSocialMediaSettings();
  
  const [formData, setFormData] = useState({
    facebook: '',
    instagram: '',
    tiktok: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load existing settings into form
  useEffect(() => {
    if (socialSettings) {
      setFormData({
        facebook: socialSettings.facebook_url || '',
        instagram: socialSettings.instagram_url || '',
        tiktok: socialSettings.tiktok_url || '',
      });
    }
  }, [socialSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      await updateSocialSettings({
        facebook: formData.facebook || undefined,
        instagram: formData.instagram || undefined,
        tiktok: formData.tiktok || undefined,
      });
      
      setSaveMessage('Настройките са запазени успешно!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving social media settings:', error);
      setSaveMessage('Грешка при запазването на настройките');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <h2 className="font-playfair text-xl font-semibold">Социални мрежи</h2>
        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className={`text-sm ${saveMessage.includes('Грешка') ? 'text-red-600' : 'text-green-600'}`}>
              {saveMessage}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 2c-5.621 0-10.211 4.443-10.5 10h3c.275-4.264 3.677-7.5 7.5-7.5 4.125 0 7.5 3.375 7.5 7.5 0 4.125-3.375 7.5-7.5 7.5-1.125 0-2.191-.25-3.141-.688l-1.406 2.438C10.125 21.688 11.742 22 13.5 22c5.621 0 10.5-4.379 10.5-10S19.121 2 13.5 2z"/>
                </svg>
              </div>
              Глобални настройки за социални мрежи
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Забележка:</strong> Тези настройки ще се използват в цялото уебсайт - в страничния панел, модалите за контакт и всички други места където се показват социални мрежи.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Facebook */}
              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook URL
                </Label>
                <Input
                  id="facebook"
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                  placeholder="https://www.facebook.com/profile.php?id=..."
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Пълен URL към Facebook страницата
                </p>
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram URL
                </Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="https://instagram.com/radanovpride"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Пълен URL към Instagram профила
                </p>
              </div>

              {/* TikTok */}
              <div className="space-y-2">
                <Label htmlFor="tiktok" className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  TikTok URL
                </Label>
                <Input
                  id="tiktok"
                  type="url"
                  value={formData.tiktok}
                  onChange={(e) => setFormData(prev => ({ ...prev, tiktok: e.target.value }))}
                  placeholder="https://www.tiktok.com/@radanovpridemainecoon"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Пълен URL към TikTok профила  
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 pt-4">
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Запазване...' : 'Запази настройки'}
                </Button>
              </div>
            </form>

            {/* Current Settings Preview */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3">Текущи настройки:</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Facebook:</strong> {formData.facebook || 'Не е настроен'}
                </div>
                <div>
                  <strong>Instagram:</strong> {formData.instagram || 'Не е настроен'}
                </div>
                <div>
                  <strong>TikTok:</strong> {formData.tiktok || 'Не е настроен'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialMediaSettings;