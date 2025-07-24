import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useDisplayedCats, CatData } from "@/services/convexCatService";
import PedigreeModal from "./PedigreeModal";
import SocialContactModal from "./SocialContactModal";
import EnhancedImageGallery from "./ui/enhanced-image-gallery";
import CatTikTokVideos from "./CatTikTokVideos";
import { useTikTokVideosByCat } from "@/services/convexTikTokService";

const FeaturedModelsSection = () => {
  const [selectedCat, setSelectedCat] = useState<CatData | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPedigreeOpen, setIsPedigreeOpen] = useState(false);
  const [pedigreeCat, setPedigreeCat] = useState<CatData | null>(null);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialCat, setSocialCat] = useState<CatData | null>(null);
  const [isEnhancedGalleryOpen, setIsEnhancedGalleryOpen] = useState(false);
  const [enhancedGalleryImages, setEnhancedGalleryImages] = useState<string[]>([]);
  const [enhancedGalleryTitle, setEnhancedGalleryTitle] = useState("");
  const featuredCats = useDisplayedCats();
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.1);
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation(0.1);
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);

  const openGallery = (cat: CatData) => {
    setSelectedCat(cat);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedCat(null);
  };

  const openPedigree = (cat: CatData) => {
    setPedigreeCat(cat);
    setIsPedigreeOpen(true);
  };

  const closePedigree = () => {
    setIsPedigreeOpen(false);
    setPedigreeCat(null);
  };

  const openSocialModal = (cat: CatData) => {
    setSocialCat(cat);
    setIsSocialModalOpen(true);
  };

  const closeSocialModal = () => {
    setIsSocialModalOpen(false);
    setSocialCat(null);
  };

  const openEnhancedGallery = (images: string[], title: string) => {
    setEnhancedGalleryImages(images);
    setEnhancedGalleryTitle(title);
    setIsEnhancedGalleryOpen(true);
  };

  const closeEnhancedGallery = () => {
    setIsEnhancedGalleryOpen(false);
    setEnhancedGalleryImages([]);
    setEnhancedGalleryTitle("");
  };

  // Always show the section structure, even when loading
  // This prevents the disappearing issue
  const isLoading = featuredCats === undefined;
  const isEmpty = featuredCats !== undefined && featuredCats !== null && featuredCats.length === 0;


  return (
    <>
      <section ref={sectionRef} className="py-20 bg-background mb-24">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-24 transition-all duration-1000 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-px bg-muted-foreground/30"></div>
              <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
              <div className="w-12 h-px bg-muted-foreground/30"></div>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-light text-foreground">
              Нашите избрани модели
            </h2>
          </div>

          {/* Content Area */}
          <div 
            ref={gridRef}
            className={`max-w-6xl mx-auto transition-all duration-1000 ${
              gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {isLoading && (
              <div className="text-center">
                <p className="text-muted-foreground">Зареждане на котките...</p>
              </div>
            )}
            
            {isEmpty && (
              <div className="text-center">
                <p className="text-muted-foreground">Няма налични котки в момента</p>
              </div>
            )}
            
            {!isLoading && !isEmpty && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCats.map((cat, index) => (
              <Card 
                key={cat._id} 
                className={`group overflow-hidden bg-card shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-0 ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                onClick={() => openGallery(cat)}
                style={{
                  transitionDelay: gridVisible ? `${index * 0.1}s` : '0s'
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Dark overlay with name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="font-bold text-xl mb-1">{cat.name}</h3>
                      <p className="text-sm uppercase tracking-wide text-gray-300">{cat.subtitle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 text-center space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Избери този модел
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-muted text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPedigree(cat);
                    }}
                  >
                    Виж родословие
                  </Button>
                </div>
              </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && selectedCat && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-modern-dark">
                  {selectedCat.name}
                </h3>
                <p className="text-muted-foreground uppercase tracking-wide text-sm">
                  {selectedCat.subtitle}
                </p>
              </div>
              <Button 
                variant="minimal" 
                size="sm" 
                onClick={closeGallery}
                className="rounded-full w-10 h-10 p-0 text-amber-500 hover:text-amber-600 hover:bg-amber-50 border border-amber-300 hover:border-amber-400"
              >
                ×
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Gallery */}
                <div className="space-y-4">
                  <img 
                    src={selectedCat.image} 
                    alt={selectedCat.name}
                    className="w-full rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      const allImages = [selectedCat.image, ...selectedCat.gallery];
                      openEnhancedGallery(allImages, `${selectedCat.name} - Галерия`);
                    }}
                  />
                  
                  {/* Thumbnail Gallery */}
                  {selectedCat.gallery.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Още снимки ({selectedCat.gallery.length})
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const allImages = [selectedCat.image, ...selectedCat.gallery];
                            openEnhancedGallery(allImages, `${selectedCat.name} - Галерия`);
                          }}
                        >
                          Виж всички
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedCat.gallery.slice(0, 6).map((img, index) => (
                          <img 
                            key={index}
                            src={img} 
                            alt={`${selectedCat.name} ${index + 2}`}
                            className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => {
                              const allImages = [selectedCat.image, ...selectedCat.gallery];
                              openEnhancedGallery(allImages, `${selectedCat.name} - Галерия`);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TikTok Videos Section */}
                  <CatTikTokVideos catId={selectedCat._id} catName={selectedCat.name} />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    {selectedCat.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Възраст</span>
                      <span className="font-medium">{selectedCat.age}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Цвят</span>
                      <span className="font-medium">{selectedCat.color}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Статус</span>
                      <span className={`font-medium ${selectedCat.status === "Достъпен" ? "text-green-600" : "text-orange-600"}`}>
                        {selectedCat.status}
                      </span>
                    </div>
                    {selectedCat.registrationNumber && (
                      <div className="flex justify-between border-b border-border pb-2">
                        <span className="text-muted-foreground">Регистрационен номер</span>
                        <span className="font-medium">{selectedCat.registrationNumber}</span>
                      </div>
                    )}
                    {selectedCat.freeText && (
                      <div className="border-b border-border pb-2">
                        <span className="text-muted-foreground block mb-1">Допълнителна информация</span>
                        <span className="font-medium">{selectedCat.freeText}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button 
                      variant="modern" 
                      className="w-full"
                      onClick={() => openSocialModal(selectedCat)}
                    >
                      Заявете сега
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600"
                      onClick={() => openPedigree(selectedCat)}
                    >
                      Повече информация
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pedigree Modal */}
      {isPedigreeOpen && pedigreeCat && (
        <PedigreeModal
          cat={pedigreeCat}
          isOpen={isPedigreeOpen}
          onClose={closePedigree}
        />
      )}

      {/* Social Contact Modal */}
      {isSocialModalOpen && socialCat && (
        <SocialContactModal
          cat={socialCat}
          isOpen={isSocialModalOpen}
          onClose={closeSocialModal}
        />
      )}

      {/* Enhanced Image Gallery */}
      <EnhancedImageGallery
        images={enhancedGalleryImages}
        isOpen={isEnhancedGalleryOpen}
        onClose={closeEnhancedGallery}
        title={enhancedGalleryTitle}
      />
    </>
  );
};

export default FeaturedModelsSection;