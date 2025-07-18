import { useState, useEffect } from "react";
import ModernNavigation from "@/components/ModernNavigation";
import ModernHeroSection from "@/components/ModernHeroSection";
import FeaturedModelsSection from "@/components/FeaturedModelsSection";
import TikTokSection from "@/components/TikTokSection";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import ContactModal from "@/components/ContactModal";
import CatCarePopup from "@/components/CatCarePopup";
import BackgroundAnimations from "@/components/BackgroundAnimations";
import FloatingSeparator from "@/components/FloatingSeparator";

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showCatCarePopup, setShowCatCarePopup] = useState(false);

  useEffect(() => {
    // Show cat care popup after 3 seconds
    const timer = setTimeout(() => {
      setShowCatCarePopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimations />
      <div className="relative z-10">
        <ModernNavigation />
      <div id="home">
        <ModernHeroSection />
      </div>
      
      {/* Floating separator between sections */}
      <FloatingSeparator 
        showText={false}
        size="small"
        variant="lines"
        className="my-8"
      />
      
      <div id="models">
        <FeaturedModelsSection />
      </div>
      
      {/* Floating separator between sections */}
      <FloatingSeparator 
        showText={false}
        size="medium"
        variant="dots"
        className="my-12"
      />
      
      <div id="tiktok">
        <TikTokSection />
      </div>
      
      {/* Floating separator between sections */}
      <FloatingSeparator 
        showText={false}
        size="small"
        variant="circles"
        className="my-8"
      />
      
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
