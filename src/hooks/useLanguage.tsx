import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import bgTranslations from '@/translations/bg.json';
import enTranslations from '@/translations/en.json';

export type Language = 'bg' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  bg: bgTranslations,
  en: enTranslations,
};

// Helper function to get nested object value by string key
const getNestedValue = (obj: any, key: string): string => {
  return key.split('.').reduce((current, keyPart) => {
    return current && current[keyPart] ? current[keyPart] : undefined;
  }, obj);
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('bg');

  // Initialize language from localStorage or default to Bulgarian
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'bg' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    } else {
      // Always default to Bulgarian for new users
      setLanguageState('bg');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string | string[] => {
    const currentTranslations = translations[language];
    const bgTranslations = translations.bg;
    
    // Try to get translation in current language
    let translation = getNestedValue(currentTranslations, key);
    
    // Fallback to Bulgarian if not found
    if (!translation) {
      translation = getNestedValue(bgTranslations, key);
    }
    
    // Final fallback to the key itself
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};