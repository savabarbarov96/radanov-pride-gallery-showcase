import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TrailElement {
  id: number;
  x: number;
  y: number;
  age: number;
  maxAge: number;
  rotation: number;
}

const BackgroundAnimations = () => {
  const [trailElements, setTrailElements] = useState<TrailElement[]>([]);
  const lastSpawn = useRef(0);
  const animationFrame = useRef<number>();
  const nextId = useRef(0);

  // Mouse move handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawn.current < 100) return; // Throttle to every 100ms
    
    lastSpawn.current = now;
    const newElement: TrailElement = {
      id: nextId.current++,
      x: e.clientX,
      y: e.clientY,
      age: 0,
      maxAge: 1500, // 1.5 seconds lifespan
      rotation: Math.random() * 30 - 15, // Random rotation between -15 and 15 degrees
    };

    setTrailElements(prev => {
      const updated = [...prev, newElement];
      // Limit to 15 elements for performance
      return updated.length > 15 ? updated.slice(-15) : updated;
    });
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    setTrailElements(prev => 
      prev
        .map(element => ({ ...element, age: element.age + 16 })) // ~60fps
        .filter(element => element.age < element.maxAge)
    );
    animationFrame.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation loop
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      // Cleanup
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [handleMouseMove, animate]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Enhanced floating geometric shapes - more visible */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-amber-200 rounded-full animate-background-float opacity-40 shadow-lg"></div>
      <div className="absolute top-1/4 right-20 w-6 h-6 bg-orange-200 rounded-full animate-float opacity-45 shadow-lg" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-amber-100 rounded-full animate-background-float opacity-35 shadow-md" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-orange-300 rounded-full animate-float opacity-40 shadow-lg" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-10 left-1/2 w-4 h-4 bg-amber-200 rounded-full animate-background-float opacity-38 shadow-md" style={{ animationDelay: '4s' }}></div>
      
      {/* Enhanced paw print shapes - more visible */}
      <div className="absolute top-1/3 left-1/6 opacity-30 animate-float drop-shadow-md" style={{ animationDelay: '0.5s' }}>
        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
        </svg>
      </div>
      
      <div className="absolute top-2/3 right-1/4 opacity-30 animate-background-float drop-shadow-md" style={{ animationDelay: '1.5s' }}>
        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/3 left-2/3 opacity-30 animate-float drop-shadow-md" style={{ animationDelay: '2.5s' }}>
        <svg className="w-10 h-10 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
        </svg>
      </div>
      
      {/* Additional floating elements - enhanced visibility */}
      <div className="absolute top-3/4 left-10 w-2 h-2 bg-orange-400 rounded-full animate-background-float opacity-42 shadow-sm" style={{ animationDelay: '3.5s' }}></div>
      <div className="absolute top-1/6 right-10 w-3 h-3 bg-amber-300 rounded-full animate-float opacity-45 shadow-md" style={{ animationDelay: '4.5s' }}></div>
      <div className="absolute bottom-1/6 left-1/3 w-4 h-4 bg-orange-200 rounded-full animate-background-float opacity-38 shadow-lg" style={{ animationDelay: '5s' }}></div>
      
      {/* Cat trail elements */}
      {trailElements.map((element) => {
        const opacity = Math.max(0, 1 - (element.age / element.maxAge));
        const scale = Math.max(0.3, 1 - (element.age / element.maxAge) * 0.7);
        
        return (
          <div
            key={element.id}
            className="absolute pointer-events-none"
            style={{
              left: element.x - 8, // Center the 16px icon
              top: element.y - 8,
              opacity,
              transform: `scale(${scale}) rotate(${element.rotation}deg)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            }}
          >
            <svg
              className="w-4 h-4 text-amber-600 drop-shadow-sm"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{
                filter: `drop-shadow(0 0 2px rgba(251, 191, 36, ${opacity * 0.5}))`,
              }}
            >
              <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
            </svg>
          </div>
        );
      })}
      
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/5 via-transparent to-orange-50/5 animate-gradient-x backdrop-blur-[0.5px]"></div>
    </div>
  );
};

export default BackgroundAnimations;