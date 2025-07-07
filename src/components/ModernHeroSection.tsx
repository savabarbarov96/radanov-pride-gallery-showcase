import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cats-modern.jpg";

const ModernHeroSection = () => {
  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-playfair text-5xl lg:text-6xl xl:text-7xl font-light text-modern-dark leading-tight">
                unleash
                <span className="block border-l-4 border-modern-dark pl-6 ml-0 font-normal">
                  luxury runways
                </span>
                <span className="block text-4xl lg:text-5xl xl:text-6xl mt-4 font-light text-muted-foreground">
                  of maine coons
                </span>
              </h1>
            </div>
            
            <Button 
              variant="modern" 
              size="lg" 
              className="px-8 py-4 text-base font-medium rounded-none"
            >
              Generate My Cat Experience
            </Button>
          </div>

          {/* Hero Images */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Main hero image container */}
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Elegant Maine Coon cats"
                  className="w-full max-w-md rounded-xl shadow-modern"
                />
              </div>
              
              {/* Floating badge/label */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-hover">
                <div className="w-16 h-16 border-2 border-modern-dark rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-20">
          <p className="text-sm text-muted-foreground tracking-wide uppercase">
            from muse to masterpiece
          </p>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;