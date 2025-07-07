import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CatCarePopupProps {
  onClose: () => void;
}

const CatCarePopup = ({ onClose }: CatCarePopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Show popup with animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Stagger content animation
      setTimeout(() => setContentVisible(true), 200);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative max-w-2xl w-full bg-[#F5F4F0] rounded-2xl shadow-2xl transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        style={{
          animation: isVisible ? 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10 group"
        >
          <X className="w-6 h-6 text-gray-600 group-hover:text-black transition-colors" />
        </button>

        {/* Content */}
        <div className="p-8 lg:p-12">
          {/* Header with Cat Paw Icons */}
          <div 
            className={`text-center mb-8 transition-all duration-700 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="flex justify-center items-center mb-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mx-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
                </svg>
              </div>
              <h2 className="font-playfair text-3xl lg:text-4xl font-light text-black">
                Важна информация
              </h2>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mx-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 uppercase tracking-wide">
              За грижата към Мейн Куун котките
            </p>
          </div>

          {/* Main Content */}
          <div 
            className={`space-y-6 transition-all duration-700 delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-black">
              <h3 className="font-semibold text-lg text-black mb-3">
                🐱 Грижата към котка изисква отговорност
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мейн Куун котките са прекрасни спътници, но изискват сериозна отговорност. 
                Преди да вземете решение, моля обмислете следното:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Финансови разходи:</strong> Храна, ветеринарни грижи, принадлежности - над 1000 лв. годишно
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Време и внимание:</strong> Ежедневни грижи, четкане, игра и социализация
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Дългосрочен ангажимент:</strong> Мейн Куун котките живеят 12-15 години
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Простор и условия:</strong> Достатъчно място, безопасна среда
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <p className="text-center text-gray-700 font-medium mb-4">
                💝 Котката не е подарък или импулсивно решение
              </p>
              <p className="text-center text-sm text-gray-600">
                Ако сте готови за отговорния ангажимент, ние ще бъдем щастливи да ви помогнем 
                да намерите перфектния спътник за вашето семейство.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-700 delay-400 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <Button 
              onClick={handleClose}
              className="flex-1 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Разбирам отговорността
            </Button>
            <Button 
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              Искам повече информация
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCarePopup;