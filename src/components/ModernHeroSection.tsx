import { Button } from "@/components/ui/button";
import ContainerTextFlipDemo from "@/components/ui/container-text-flip-demo";
import featuredCat1 from "@/assets/featured-cat-1.jpg";
import featuredCat2 from "@/assets/featured-cat-2.jpg";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";
import istockCat from '@/assets/istockphoto-1092493548-612x612.jpg';
import modelCat1 from '@/assets/model-cat-1.jpg';
import modelCat2 from '@/assets/model-cat-2.jpg';
import modelCat3 from '@/assets/model-cat-3.jpg';

const ModernHeroSection = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);
  const { elementRef: textRef, isVisible: textVisible } = useScrollAnimation(0.3);
  const { elementRef: photosRef, isVisible: photosVisible } = useScrollAnimation(0.1);
  const { elementRef: parallaxRef, offset: parallaxOffset } = useParallax(0.3);

  return (
    <section className="min-h-[85vh] flex items-center justify-center py-10 md:py-20 bg-background relative overflow-hidden">
      <div ref={heroRef} className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <div 
            ref={textRef} 
            className={`space-y-6 md:space-y-8 text-center lg:text-left transition-all duration-1000 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-4 md:space-y-6">
              <div className="font-playfair text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground leading-tight">
                <div className="animate-fade-in-left">
                  <ContainerTextFlipDemo />
                </div>
                <span className="block border-l-4 border-foreground pl-4 md:pl-6 ml-0 font-normal mt-3 md:mt-4 animate-fade-in-left animate-delay-200">
                  Мейн Куун
                </span>
                <span className="block text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-3 md:mt-4 font-light text-muted-foreground animate-fade-in-left animate-delay-300">
                  котки
                </span>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <Button 
                className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors animate-fade-in-up animate-delay-400"
              >
                Позвъни за информация.
              </Button>
            </div>
          </div>

          {/* Polaroid Photos */}
          <div 
            ref={photosRef}
            className={`relative flex justify-center mt-8 lg:mt-0 transition-all duration-1000 ${
              photosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div 
              ref={parallaxRef}
              className="relative parallax-slow scale-75 md:scale-90 lg:scale-100"
              style={{
                transform: `translateY(${parallaxOffset * 0.2}px)`,
              }}
            >
              {/* Decorative polaroids - hidden on mobile */}
              <div className="hidden md:block absolute -top-10 -left-24 bg-card p-4 shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300 animate-float-gentle z-10">
                <img 
                  src={modelCat1} 
                  alt="SILLY1"
                  className="w-40 h-40 object-cover"
                />
                <div className="mt-2 text-center">
                  <h3 className="font-bold text-base text-foreground">BUBBLE</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">SILLY CAT</p>
                </div>
              </div>
              <div className="hidden lg:block absolute top-32 -right-32 bg-card p-4 shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300 animate-float-reverse z-10">
                <img 
                  src={modelCat2} 
                  alt="SILLY2"
                  className="w-44 h-44 object-cover"
                />
                <div className="mt-2 text-center">
                  <h3 className="font-bold text-base text-foreground">ZIGGY</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">SILLY CAT</p>
                </div>
              </div>
              <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 bg-card p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 animate-float-gentle z-10">
                <img 
                  src={modelCat3} 
                  alt="SILLY3"
                  className="w-36 h-36 object-cover"
                />
                <div className="mt-2 text-center">
                  <h3 className="font-bold text-base text-foreground">MOMO</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">SILLY CAT</p>
                </div>
              </div>
              {/* Main polaroids - responsive sizing */}
              <div className="relative bg-card p-3 md:p-4 shadow-lg transform hover:rotate-0 transition-transform duration-300 animate-scale-in animate-delay-300 animate-float-gentle z-20">
                <img 
                  src={featuredCat1} 
                  alt="OLIVIA"
                  className="w-48 h-48 md:w-60 md:h-60 object-cover"
                />
                <div className="mt-3 md:mt-4 text-center">
                  <h3 className="font-bold text-base md:text-lg text-foreground">OLIVIA</h3>
                  <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">CHAT NOIR ELEGANCE</p>
                </div>
              </div>
              <div className="absolute top-6 md:top-8 left-16 md:left-20 bg-card p-3 md:p-4 shadow-lg transform hover:rotate-0 transition-transform duration-300 animate-scale-in animate-delay-500 animate-float-reverse z-20">
                <img 
                  src={featuredCat2} 
                  alt="MIA"
                  className="w-48 h-48 md:w-60 md:h-60 object-cover"
                />
                <div className="mt-3 md:mt-4 text-center">
                  <h3 className="font-bold text-base md:text-lg text-foreground">MIA</h3>
                  <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">NOIR</p>
                </div>
              </div>
              {/* Circular timer badge */}
              <div className="absolute -bottom-3 md:-bottom-4 -right-3 md:-right-4 bg-card rounded-full p-4 md:p-6 shadow-lg animate-float z-30">
                <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-foreground rounded-full flex items-center justify-center relative overflow-hidden">
                  {/* Floating Cat Image */}
                  <img src={istockCat} alt="Котка" className="w-16 h-16 md:w-24 md:h-24 object-contain animate-float" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div 
          className={`text-center mt-20 transition-all duration-1000 delay-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <p className="text-sm text-muted-foreground tracking-wide uppercase">
            от вдъхновение до шедьовър
          </p>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;