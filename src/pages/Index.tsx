import ModernNavigation from "@/components/ModernNavigation";
import ModernHeroSection from "@/components/ModernHeroSection";
import FeaturedModelsSection from "@/components/FeaturedModelsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModernNavigation />
      <ModernHeroSection />
      <FeaturedModelsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
