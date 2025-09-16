import { useState, useEffect, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModernNavigation from "@/components/ModernNavigation";
import ModernHeroSection from "@/components/ModernHeroSection";
import FeaturedModelsSection from "@/components/FeaturedModelsSection";
import CatGallery from "@/components/ui/cat-gallery";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import ContactModal from "@/components/ContactModal";
import CatCarePopup from "@/components/CatCarePopup";
import BackgroundAnimations from "@/components/BackgroundAnimations";

// Lazy load TikTok section since it's below the fold
const TikTokSection = lazy(() => import("@/components/TikTokSection"));

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showCatCarePopup, setShowCatCarePopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Show cat care popup after 3 seconds
    const timer = setTimeout(() => {
      setShowCatCarePopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (!state?.scrollTo) {
      return;
    }

    const section = state.scrollTo;
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    navigate(location.pathname, { replace: true, state: {} });
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimations />
      <div className="relative z-10">
        <ModernNavigation />
      <div id="home">
        <ModernHeroSection />
      </div>
      <div id="models">
        <FeaturedModelsSection />
      </div>
      <div id="gallery">
        <CatGallery />
      </div>
      <div id="tiktok">
        <Suspense fallback={
          <div className="bg-black py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading TikTok videos...</p>
            </div>
          </div>
        }>
          <TikTokSection />
        </Suspense>
      </div>
      <div id="contact">
        <Footer />
      </div>
      
      {/* Sticky Social Sidebar */}
      <SocialSidebar />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      {/* Cat Care Responsibility Popup */}
      {showCatCarePopup && (
        <CatCarePopup 
          onClose={() => setShowCatCarePopup(false)}
        />
      )}
      </div>
    </div>
  );
};

export default Index;
