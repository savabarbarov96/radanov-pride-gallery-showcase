import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-playfair text-2xl font-bold text-luxury-brown">
              Radanov Pride
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
                Начало
              </a>
              <a href="#about" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
                За нас
              </a>
              <a href="#cats" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
                Наши котки
              </a>
              <a href="#gallery" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
                Галерия
              </a>
              <a href="#contact" className="text-foreground hover:text-luxury-gold transition-colors font-medium">
                Контакти
              </a>
            </div>
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button variant="luxury" size="lg">
              Свържете се
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-luxury-gold focus:outline-none focus:text-luxury-gold"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-luxury-gold transition-colors">
                Начало
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-luxury-gold transition-colors">
                За нас
              </a>
              <a href="#cats" className="block px-3 py-2 text-foreground hover:text-luxury-gold transition-colors">
                Наши котки
              </a>
              <a href="#gallery" className="block px-3 py-2 text-foreground hover:text-luxury-gold transition-colors">
                Галерия
              </a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-luxury-gold transition-colors">
                Контакти
              </a>
              <div className="px-3 py-2">
                <Button variant="luxury" size="sm" className="w-full">
                  Свържете се
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;