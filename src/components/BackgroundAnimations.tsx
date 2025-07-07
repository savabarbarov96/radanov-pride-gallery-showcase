import React from 'react';

const BackgroundAnimations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-slate-200 rounded-full animate-background-float opacity-20"></div>
      <div className="absolute top-1/4 right-20 w-6 h-6 bg-slate-300 rounded-full animate-float opacity-25" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-slate-100 rounded-full animate-background-float opacity-15" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-slate-200 rounded-full animate-float opacity-20" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-10 left-1/2 w-4 h-4 bg-slate-300 rounded-full animate-background-float opacity-18" style={{ animationDelay: '4s' }}></div>
      
      {/* Paw print shapes */}
      <div className="absolute top-1/3 left-1/6 opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
        </svg>
      </div>
      
      <div className="absolute top-2/3 right-1/4 opacity-10 animate-background-float" style={{ animationDelay: '1.5s' }}>
        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/3 left-2/3 opacity-10 animate-float" style={{ animationDelay: '2.5s' }}>
        <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.5 10.5c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm15 0c1.104 0 2-1.12 2-2.5s-.896-2.5-2-2.5-2 1.12-2 2.5.896 2.5 2 2.5zm-12.5 7c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm10 0c1.381 0 2.5-1.12 2.5-2.5s-1.119-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.119 2.5 2.5 2.5zm-5-1c2.485 0 7-1.567 7-4.5 0-1.657-2.239-3-5-3s-5 1.343-5 3c0 2.933 4.515 4.5 7 4.5z"/>
        </svg>
      </div>
      
      {/* Additional floating elements */}
      <div className="absolute top-3/4 left-10 w-2 h-2 bg-slate-400 rounded-full animate-background-float opacity-22" style={{ animationDelay: '3.5s' }}></div>
      <div className="absolute top-1/6 right-10 w-3 h-3 bg-slate-200 rounded-full animate-float opacity-25" style={{ animationDelay: '4.5s' }}></div>
      <div className="absolute bottom-1/6 left-1/3 w-4 h-4 bg-slate-100 rounded-full animate-background-float opacity-18" style={{ animationDelay: '5s' }}></div>
      
      {/* Gradient overlays for sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/3 via-transparent to-slate-100/3 animate-gradient-x"></div>
    </div>
  );
};

export default BackgroundAnimations;