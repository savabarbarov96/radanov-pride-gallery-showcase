import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useActiveSection, useScrollPosition } from "@/hooks/useScrollAnimation";

const ModernNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(['home', 'models', 'tiktok', 'contact']);
  const { scrollY } = useScrollPosition();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  }, []);

  const navBg = scrollY > 50 ? 'bg-background/98' : 'bg-background/95';
  const navShadow = scrollY > 50 ? 'shadow-lg' : '';
  
  // Calculate scroll progress
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = Math.min((scrollY / documentHeight) * 100, 100);

  return (
    <nav className={`${navBg} ${navShadow} backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 relative`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/radanov-pride-logo.png" 
              alt="Radanov Pride Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`transition-colors text-sm font-medium ${
                activeSection === 'home' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Начало
            </button>
            <button 
              onClick={() => scrollToSection('models')}
              className={`transition-colors text-sm font-medium ${
                activeSection === 'models' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Модели
            </button>
            <button 
              onClick={() => scrollToSection('tiktok')}
              className={`transition-colors text-sm font-medium ${
                activeSection === 'tiktok' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              TikTok
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`transition-colors text-sm font-medium ${
                activeSection === 'contact' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Контакт
            </button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-card border-border text-foreground hover:bg-muted"
              onClick={() => {
                // This will be connected to Facebook chat
                console.log('Opening Facebook chat...');
              }}
            >
              Чат
            </Button>
            <Button variant="outline" size="sm" className="ml-4 bg-card border-border text-foreground hover:bg-muted">
              Вход
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-muted-foreground focus:outline-none"
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
              <button 
                onClick={() => scrollToSection('home')}
                className={`block px-3 py-2 transition-colors text-sm w-full text-left ${
                  activeSection === 'home' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Начало
              </button>
              <button 
                onClick={() => scrollToSection('models')}
                className={`block px-3 py-2 transition-colors text-sm w-full text-left ${
                  activeSection === 'models' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Модели
              </button>
              <button 
                onClick={() => scrollToSection('tiktok')}
                className={`block px-3 py-2 transition-colors text-sm w-full text-left ${
                  activeSection === 'tiktok' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                TikTok
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`block px-3 py-2 transition-colors text-sm w-full text-left ${
                  activeSection === 'contact' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Контакт
              </button>
              <div className="px-3 py-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mb-2 bg-white border-gray-300 text-foreground hover:bg-gray-50"
                  onClick={() => {
                    // This will be connected to Facebook chat
                    console.log('Opening Facebook chat...');
                  }}
                >
                  Чат
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-white border-gray-300 text-foreground hover:bg-gray-50">
                  Вход
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200">
        <div 
          className="h-full bg-black transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
};

export default ModernNavigation;