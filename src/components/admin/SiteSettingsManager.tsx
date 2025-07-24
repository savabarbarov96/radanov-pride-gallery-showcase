import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  useSocialMediaSettings, 
  useUpdateSocialMediaSettings,
  useInitializeDefaultSettings 
} from '@/services/convexSiteSettingsService';

const SiteSettingsManager = () => {
  const socialSettings = useSocialMediaSettings();
  const updateSocialSettings = useUpdateSocialMediaSettings();
  const initializeDefaults = useInitializeDefaultSettings();

  const [socialForm, setSocialForm] = useState({
    facebook: '',
    instagram: '',
    tiktok: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load settings when they become available
  useEffect(() => {
    if (socialSettings) {
      setSocialForm({
        facebook: socialSettings.facebook_url || '',
        instagram: socialSettings.instagram_url || '',
        tiktok: socialSettings.tiktok_url || '',
      });
    }
  }, [socialSettings]);

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateSocialSettings({
        facebook: socialForm.facebook || undefined,
        instagram: socialForm.instagram || undefined,
        tiktok: socialForm.tiktok || undefined,
      });
      alert('Социалните мрежи са обновени успешно!');
    } catch (error) {
      console.error('Error updating social settings:', error);
      alert('Грешка при обновяването на настройките');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitializeDefaults = async () => {
    setIsLoading(true);
    try {
      await initializeDefaults();
      alert('Настройките по подразбиране са инициализирани!');
    } catch (error) {
      console.error('Error initializing defaults:', error);
      alert('Грешка при инициализирането на настройките');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <h2 className="font-playfair text-xl font-semibold">Настройки на сайта</h2>
        <Button
          onClick={handleInitializeDefaults}
          variant="outline"
          disabled={isLoading}
        >
          Инициализирай по подразбиране
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="social">Социални мрежи</TabsTrigger>
            <TabsTrigger value="contact">Контакти</TabsTrigger>
            <TabsTrigger value="content">Съдържание</TabsTrigger>
            <TabsTrigger value="features">Функции</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Социални мрежи</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Управлявайте глобалните връзки към социалните мрежи, които се използват в целия сайт.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSocialSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      type="url"
                      value={socialForm.facebook}
                      onChange={(e) => setSocialForm(prev => ({ ...prev, facebook: e.target.value }))}
                      placeholder="https://www.facebook.com/yourpage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      type="url"
                      value={socialForm.instagram}
                      onChange={(e) => setSocialForm(prev => ({ ...prev, instagram: e.target.value }))}
                      placeholder="https://instagram.com/yourusername"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tiktok">TikTok URL</Label>
                    <Input
                      id="tiktok"
                      type="url"  
                      value={socialForm.tiktok}
                      onChange={(e) => setSocialForm(prev => ({ ...prev, tiktok: e.target.value }))}
                      placeholder="https://www.tiktok.com/@yourusername"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Запазване...' : 'Запази настройките'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Контактна информация</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Управлявайте контактните данни на сайта.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Скоро ще бъде добавено...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Съдържание на сайта</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Редактирайте текстовете и съдържанието на сайта.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Скоро ще бъде добавено...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Функции на сайта</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Включвайте или изключвайте функции на сайта.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Скоро ще бъде добавено...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteSettingsManager;