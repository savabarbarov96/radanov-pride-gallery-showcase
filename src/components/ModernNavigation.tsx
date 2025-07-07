import { useState } from "react";
import { Button } from "@/components/ui/button";

const ModernNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Modern Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-playfair text-xl font-bold text-modern-dark tracking-tight">
              radanov pride
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-modern-dark hover:text-muted-foreground transition-colors text-sm font-medium">
              Начало
            </a>
            <a href="#about" className="text-modern-dark hover:text-muted-foreground transition-colors text-sm font-medium">
              За нас
            </a>
            <a href="#models" className="text-modern-dark hover:text-muted-foreground transition-colors text-sm font-medium">
              Модели
            </a>
            <a href="#contact" className="text-modern-dark hover:text-muted-foreground transition-colors text-sm font-medium">
              Контакти
            </a>
            <Button variant="modern" size="sm" className="ml-4">
              Свържете се
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-modern-dark hover:text-muted-foreground focus:outline-none"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              <a href="#home" className="block px-3 py-2 text-modern-dark hover:text-muted-foreground transition-colors text-sm">
                Начало
              </a>
              <a href="#about" className="block px-3 py-2 text-modern-dark hover:text-muted-foreground transition-colors text-sm">
                За нас
              </a>
              <a href="#models" className="block px-3 py-2 text-modern-dark hover:text-muted-foreground transition-colors text-sm">
                Модели
              </a>
              <a href="#contact" className="block px-3 py-2 text-modern-dark hover:text-muted-foreground transition-colors text-sm">
                Контакти
              </a>
              <div className="px-3 py-2">
                <Button variant="modern" size="sm" className="w-full">
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

export default ModernNavigation;