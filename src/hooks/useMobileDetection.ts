import { useState, useEffect } from 'react';

interface MobileDetectionResult {
  isMobile: boolean;
  isTouchDevice: boolean;
  userAgent: string;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export const useMobileDetection = (): MobileDetectionResult => {
  const [detection, setDetection] = useState<MobileDetectionResult>({
    isMobile: false,
    isTouchDevice: false,
    userAgent: '',
    screenSize: 'desktop'
  });

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      
      // Check for mobile user agents
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUserAgent = mobileRegex.test(userAgent);
      
      // Check for touch device capability
      const isTouchDevice = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - for older browsers
        navigator.msMaxTouchPoints > 0
      );
      
      // Check screen size
      const screenWidth = window.innerWidth;
      let screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      
      if (screenWidth < 768) {
        screenSize = 'mobile';
      } else if (screenWidth < 1024) {
        screenSize = 'tablet';
      }
      
      // Consider device mobile if it has mobile user agent OR is touch device with small screen
      const isMobile = isMobileUserAgent || (isTouchDevice && screenWidth < 1024);
      
      setDetection({
        isMobile,
        isTouchDevice,
        userAgent,
        screenSize
      });
    };

    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return detection;
};