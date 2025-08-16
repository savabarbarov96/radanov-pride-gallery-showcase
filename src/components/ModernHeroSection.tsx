import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContainerTextFlipDemo from "@/components/ui/container-text-flip-demo";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";
import SocialContactModal from "./SocialContactModal";
import { useLanguage } from "@/hooks/useLanguage";

// Using images from /public/cats/ directory
const heroImages = {
  // Main polaroids - front and center
  main1: "/cats/14fc2162-3763-4a37-8f97-eb7ac21c085d.jpg", // Аврора - elegant white
  main2: "/cats/ac9cd5e7-9503-4fb8-97c3-9b5a8c066e7f.jpg", // Аполон - golden cream
  
  // Decorative polaroids - background
  deco1: "/cats/1686e1a3-9356-4416-887d-62cf35aa68cf.jpg", // Максимус - dark tabby
  deco2: "/cats/311b6cf8-a6aa-4314-99a6-3d8be864aea5.jpg", // Титан - red tabby
  deco3: "/cats/83ba538a-d468-41b3-b667-c1b921e30a5f.jpg", // София - grey-white
};

const ModernHeroSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);
  const { elementRef: textRef, isVisible: textVisible } = useScrollAnimation(0.3);
  const { elementRef: photosRef, isVisible: photosVisible } = useScrollAnimation(0.1);
  const { elementRef: parallaxRef, offset: parallaxOffset } = useParallax(0.3);
  const { t } = useLanguage();

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
                  {t('hero.mainTitle')}
                </span>
                <span className="block text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-3 md:mt-4 font-light text-muted-foreground animate-fade-in-left animate-delay-300">
                  {t('hero.subtitle')}
                </span>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <Button 
                className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors animate-fade-in-up animate-delay-400"
                onClick={() => setIsContactModalOpen(true)}
              >
                {t('hero.ctaButton')}
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
                  src={heroImages.deco1} 
                  alt="МАКСИМУС"
                  className="w-40 h-40 object-cover"
                />
                <div className="mt-2 text-center">
                  <h3 className="font-bold text-base text-foreground">МАКСИМУС</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">БЛАГОРОДЕН ГОСПОДИН</p>
                </div>
              </div>
              <div className="hidden lg:block absolute top-32 -right-32 bg-card p-4 shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300 animate-float-reverse z-10">
                <img 
                  src={heroImages.deco2} 
                  alt="ТИТАН"
                  className="w-44 h-44 object-cover"
                />
                <div className="mt-2 text-center">
                  <h3 className="font-bold text-base text-foreground">ТИТАН</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">МОГЪЩ ВОИН</p>
                </div>
              </div>
              <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 bg-card p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 animate-float-gentle z-10">
                <img 
                  src={heroImages.deco3} 
                  alt="СОФИЯ"
                  className="w-36 h-36 object-cover"
                />
                <div className="mt-2 text-center">
                  <h3 className="font-bold text-base text-foreground">СОФИЯ</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">МЪДРАТА ПРИНЦЕСА</p>
                </div>
              </div>
              {/* Main polaroids - responsive sizing */}
              <div className="relative bg-card p-3 md:p-4 shadow-lg transform hover:rotate-0 transition-transform duration-300 animate-scale-in animate-delay-300 animate-float-gentle z-20">
                <img 
                  src={heroImages.main1} 
                  alt="АВРОРА"
                  className="w-48 h-48 md:w-60 md:h-60 object-cover"
                />
                <div className="mt-3 md:mt-4 text-center">
                  <h3 className="font-bold text-base md:text-lg text-foreground">АВРОРА</h3>
                  <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">ЕЛЕГАНТНА ПРИНЦЕСА</p>
                </div>
              </div>
              <div className="absolute top-6 md:top-8 left-16 md:left-20 bg-card p-3 md:p-4 shadow-lg transform hover:rotate-0 transition-transform duration-300 animate-scale-in animate-delay-500 animate-float-reverse z-20">
                <img 
                  src={heroImages.main2} 
                  alt="АПОЛОН"
                  className="w-48 h-48 md:w-60 md:h-60 object-cover"
                />
                <div className="mt-3 md:mt-4 text-center">
                  <h3 className="font-bold text-base md:text-lg text-foreground">АПОЛОН</h3>
                  <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">ЗЛАТНИЯТ ПРИНЦ</p>
                </div>
              </div>
              {/* Circular logo badge */}
              <div className="absolute -bottom-3 md:-bottom-4 -right-3 md:-right-4 bg-card rounded-full p-6 md:p-8 shadow-lg animate-float z-30">
                <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-foreground rounded-full flex items-center justify-center relative overflow-hidden">
                            {/* Floating Logo */}
          <img src="/radanov-pride-logo.png" alt="Radanov Pride Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain animate-float" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hanging Cat Animation */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="hanging-cat-animation">
            <div className="all-wrap">  
              <div className="all">
                <div className="yarn"></div>
                <div className="cat-wrap">    
                  <div className="cat">
                    <div className="cat-upper">
                      <div className="cat-leg"></div>
                      <div className="cat-leg"></div>
                      <div className="cat-head">
                        <div className="cat-ears">
                          <div className="cat-ear"></div>
                          <div className="cat-ear"></div>
                        </div>
                        <div className="cat-face">
                          <div className="cat-eyes"></div>
                          <div className="cat-mouth"></div>
                          <div className="cat-whiskers"></div>
                        </div>
                      </div>
                    </div>
                    <div className="cat-lower-wrap">
                      <div className="cat-lower">
                        <div className="cat-leg">
                          <div className="cat-leg">
                            <div className="cat-leg">
                              <div className="cat-leg">
                                <div className="cat-leg">
                                  <div className="cat-leg">
                                    <div className="cat-leg">
                                      <div className="cat-leg">
                                        <div className="cat-leg">
                                          <div className="cat-leg">
                                            <div className="cat-leg">
                                              <div className="cat-leg">
                                                <div className="cat-leg">
                                                  <div className="cat-leg">
                                                    <div className="cat-leg">
                                                      <div className="cat-leg">
                                                        <div className="cat-paw"></div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cat-leg">
                          <div className="cat-leg">
                            <div className="cat-leg">
                              <div className="cat-leg">
                                <div className="cat-leg">
                                  <div className="cat-leg">
                                    <div className="cat-leg">
                                      <div className="cat-leg">
                                        <div className="cat-leg">
                                          <div className="cat-leg">
                                            <div className="cat-leg">
                                              <div className="cat-leg">
                                                <div className="cat-leg">
                                                  <div className="cat-leg">
                                                    <div className="cat-leg">
                                                      <div className="cat-leg">
                                                        <div className="cat-paw"></div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cat-tail">
                          <div className="cat-tail">
                            <div className="cat-tail">
                              <div className="cat-tail">
                                <div className="cat-tail">
                                  <div className="cat-tail">
                                    <div className="cat-tail">
                                      <div className="cat-tail">
                                        <div className="cat-tail">
                                          <div className="cat-tail">
                                            <div className="cat-tail">
                                              <div className="cat-tail">
                                                <div className="cat-tail">
                                                  <div className="cat-tail">
                                                    <div className="cat-tail">
                                                      <div className="cat-tail -end"></div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom separator */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-px bg-muted-foreground/30"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
            <div className="w-12 h-px bg-muted-foreground/30"></div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <SocialContactModal
        cat={null}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};

export default ModernHeroSection;