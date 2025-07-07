import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-maine-coon.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Magnificent Maine Coon cat"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Maine Coon
          <span className="block text-luxury-gold">Radanov Pride</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 leading-relaxed font-crimson opacity-90">
          Елитен развъдник за породисти котки мейн кун в България
        </p>
        
        <p className="text-lg mb-10 opacity-80 max-w-2xl mx-auto">
          Изключителни родословни, качествено отглеждане и любов към породата от 2018 година.
          Нашите котки са здрави, социализирани и с международно признание.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="lg" className="text-lg px-8 py-4">
            Вижте нашите котки
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-luxury-brown">
            Свържете се с нас
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;