import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDisplayedCatsByCategory, useCatById, CatSummary, Id } from "@/services/convexCatService";
import PedigreeModal from "./PedigreeModal";
import SocialContactModal from "./SocialContactModal";
import EnhancedImageGallery from "./ui/enhanced-image-gallery";
import CatTikTokVideos from "./CatTikTokVideos";
import { useTikTokVideosByCat } from "@/services/convexTikTokService";
import CatStatusTag from "./ui/cat-status-tag";
import JonaliBadge from "./ui/jonali-badge";
import { useLanguage } from "@/hooks/useLanguage";
import LazyImage from "@/components/ui/lazy-image";

type CategoryFilter = 'all' | 'kitten';
type StatusFilter = 'all' | 'available' | 'unavailable';

const FeaturedModelsSection = () => {
  const { t } = useLanguage();
  
  const categoryLabels = {
    all: t('featuredModels.categories.all'),
    kitten: t('featuredModels.categories.kitten')
  };
  const statusLabels = {
    all: t('featuredModels.statusFilters.all'),
    available: t('featuredModels.statusFilters.available'),
    unavailable: t('featuredModels.statusFilters.unavailable')
  };
  const [selectedCatId, setSelectedCatId] = useState<Id<"cats"> | null>(null);
  const [selectedCatSummary, setSelectedCatSummary] = useState<CatSummary | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPedigreeOpen, setIsPedigreeOpen] = useState(false);
  const [pedigreeCat, setPedigreeCat] = useState<CatSummary | null>(null);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialCat, setSocialCat] = useState<CatSummary | null>(null);
  const [isEnhancedGalleryOpen, setIsEnhancedGalleryOpen] = useState(false);
  const [enhancedGalleryImages, setEnhancedGalleryImages] = useState<string[]>([]);
  const [enhancedGalleryTitle, setEnhancedGalleryTitle] = useState("");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const featuredCats = useDisplayedCatsByCategory('all');
  const selectedCat = useCatById(selectedCatId ?? undefined);
  const catForDisplay = selectedCat ?? selectedCatSummary;
  const isSelectedCatLoading = selectedCatId !== null && selectedCat === undefined;
  const galleryImages = selectedCat?.gallery ?? [];

  // Accept data entered in Bulgarian by checking known kitten keywords
  const getCategoryMatch = (cat: CatSummary, filter: CategoryFilter) => {
    if (filter === 'all') {
      return true;
    }

    const categorySource = `${cat.category || ''} ${cat.subtitle || ''}`.toLowerCase();
    const kittenKeywords = ['kitten', 'котен', 'коте', 'котенце', 'котенца'];

    if (filter === 'kitten') {
      return kittenKeywords.some((keyword) => categorySource.includes(keyword));
    }

    return true;
  };

  const getAvailabilityFromStatus = (status?: string): StatusFilter => {
    if (!status) {
      return 'all';
    }

    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '');

    const unavailableKeywords = [
      'недостъп',
      'недстъп',
      'недст',
      'неналич',
      'нееналич',
      'резерв',
      'occupied',
      'unavailable',
      'notavailable',
      'sold',
      'comingsoon'
    ];

    if (unavailableKeywords.some((keyword) => normalizedStatus.includes(keyword))) {
      return 'unavailable';
    }

    const availableKeywords = [
      'налич',
      'достъп',
      'available',
      'open'
    ];

    if (availableKeywords.some((keyword) => normalizedStatus.includes(keyword))) {
      return 'available';
    }

    return 'all';
  };

  const filteredCats = featuredCats
    ?.filter((cat) => getCategoryMatch(cat, activeFilter))
    ?.filter((cat) => {
      if (statusFilter === 'all') {
        return true;
      }

      const availability = getAvailabilityFromStatus(cat.status);
      return availability === statusFilter;
    });

  const openGallery = (cat: CatSummary) => {
    setSelectedCatSummary(cat);
    setSelectedCatId(cat._id);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedCatId(null);
    setSelectedCatSummary(null);
  };

  const openPedigree = (cat: CatSummary) => {
    setPedigreeCat(cat);
    setIsPedigreeOpen(true);
  };

  const closePedigree = () => {
    setIsPedigreeOpen(false);
    setPedigreeCat(null);
  };

  const openSocialModal = (cat: CatSummary) => {
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
  const isEmpty = !isLoading && (filteredCats?.length ?? 0) === 0;


  return (
    <>
      <section className="py-20 bg-background mb-24">
        <div className="container mx-auto px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl lg:text-5xl font-light text-foreground">
              {t('featuredModels.title')}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <div className="flex space-x-0 bg-muted/50 p-1 rounded-lg">
              {(Object.entries(categoryLabels) as [CategoryFilter, string][]).map(([category, label]) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeFilter === category
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex space-x-0 bg-muted/50 p-1 rounded-lg">
              {(Object.entries(statusLabels) as [StatusFilter, string][]).map(([filter, label]) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    statusFilter === filter
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-6xl mx-auto">
            {isLoading && (
              <div className="text-center">
                <p className="text-muted-foreground">{t('featuredModels.loading')}</p>
              </div>
            )}

            {isEmpty && (
              <div className="text-center">
                <p className="text-muted-foreground">{t('featuredModels.noAvailable')}</p>
              </div>
            )}

            {!isLoading && !isEmpty && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {filteredCats?.map((cat, index) => (
                  <div
                    key={cat._id}
                    className="group relative max-w-xs w-full"
                  >
                    {/* Main circular card */}
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => openGallery(cat)}
                    >
                      {/* Circular image container */}
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto">
                        {/* Status Tag - positioned at top center */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                          <CatStatusTag status={cat.status} />
                        </div>

                        {/* Jonali ribbon - corner */}
                        {cat.isJonaliMaineCoon && (
                          <JonaliBadge 
                            variant="ribbon" 
                            size="sm" 
                            position="top-right" 
                            text="Jonali Maine Coon" 
                            className="drop-shadow-lg"
                          />
                        )}

                        <div className="w-full h-full rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300 border-4 border-white relative">
                          <LazyImage
                            src={cat.image}
                            alt={cat.name}
                            wrapperClassName="h-full w-full rounded-full"
                            placeholderClassName="rounded-full"
                            aspectRatio={1}
                            className="group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Gradient overlay for text */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                          <div className="text-white text-center">
                            <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                            <p className="text-xs uppercase tracking-wide">{cat.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card content below the circle */}
                    <div className="mt-6 text-center space-y-3">
                      <div>
                        <h3 className="font-playfair text-xl font-semibold text-foreground mb-1">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-wide">{cat.subtitle}</p>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex flex-col gap-2 px-2 sm:px-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm"
                          onClick={() => openGallery(cat)}
                        >
                          {t('featuredModels.selectModel')}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full border-muted text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-xs sm:text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPedigree(cat);
                          }}
                        >
                          {t('featuredModels.viewPedigree')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && catForDisplay && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-modern-dark">
                  {catForDisplay.name}
                </h3>
                <p className="text-muted-foreground uppercase tracking-wide text-sm">
                  {catForDisplay.subtitle}
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
                  <div
                    className="relative w-full rounded-xl overflow-hidden transition-opacity cursor-pointer hover:opacity-90"
                    onClick={() => {
                      const allImages = selectedCat
                        ? [selectedCat.image, ...galleryImages]
                        : [catForDisplay.image];
                      openEnhancedGallery(allImages, `${catForDisplay.name} - ${t('featuredModels.galleryLabel')}`);
                    }}
                  >
                    <LazyImage
                      src={catForDisplay.image}
                      alt={catForDisplay.name}
                      wrapperClassName="w-full rounded-xl overflow-hidden"
                      placeholderClassName="rounded-xl"
                      aspectRatio={1}
                    />
                  </div>

                  {isSelectedCatLoading && (
                    <div className="grid grid-cols-3 gap-2" aria-hidden="true">
                      {[0, 1, 2].map((index) => (
                        <div key={index} className="h-20 rounded-lg bg-muted/40 animate-pulse" />
                      ))}
                    </div>
                  )}

                  {!isSelectedCatLoading && selectedCat && galleryImages.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {t('featuredModels.morePhotos')} ({galleryImages.length})
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const allImages = [selectedCat.image, ...galleryImages];
                            openEnhancedGallery(allImages, `${catForDisplay.name} - ${t('featuredModels.galleryLabel')}`);
                          }}
                        >
                          Виж всички
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {galleryImages.slice(0, 6).map((img, index) => (
                          <div
                            key={`${img}-${index}`}
                            className="relative h-20 overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => {
                              const allImages = [selectedCat.image, ...galleryImages];
                              openEnhancedGallery(allImages, `${catForDisplay.name} - ${t('featuredModels.galleryLabel')}`);
                            }}
                          >
                            <LazyImage
                              src={img}
                              alt={`${catForDisplay.name} ${index + 2}`}
                              wrapperClassName="h-full w-full rounded-lg"
                              placeholderClassName="rounded-lg"
                              aspectRatio={1}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <CatTikTokVideos catId={catForDisplay._id} catName={catForDisplay.name} />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    {catForDisplay.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Възраст</span>
                      <span className="font-medium">{catForDisplay.age}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Цвят</span>
                      <span className="font-medium">{catForDisplay.color}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Статус</span>
                      <span className={`font-medium ${catForDisplay.status === "Достъпен" ? "text-green-600" : "text-orange-600"}`}>
                        {catForDisplay.status}
                      </span>
                    </div>
                    {catForDisplay.registrationNumber && (
                      <div className="flex justify-between border-b border-border pb-2">
                        <span className="text-muted-foreground">Регистрационен номер</span>
                        <span className="font-medium">{catForDisplay.registrationNumber}</span>
                      </div>
                    )}
                    {catForDisplay.freeText && (
                      <div className="border-b border-border pb-2">
                        <span className="text-muted-foreground block mb-1">Допълнителна информация</span>
                        <span className="font-medium">{catForDisplay.freeText}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Only show request button if cat is available */}
                    {(catForDisplay.status === "Достъпен" || catForDisplay.status === "Налична") && (
                      <Button 
                        variant="modern" 
                        className="w-full"
                        onClick={() => openSocialModal(catForDisplay)}
                      >
                        Заявете сега
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600"
                      onClick={() => openPedigree(catForDisplay)}
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
