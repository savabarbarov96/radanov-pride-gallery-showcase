import { useLanguage } from '@/hooks/useLanguage';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-card border border-border rounded-md p-1">
      <button
        onClick={() => setLanguage('bg')}
        className={`flex items-center px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
          language === 'bg'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
        title="Български"
      >
        <span className="text-sm">🇧🇬</span>
      </button>
      
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
        title="English"
      >
        <span className="text-sm">🇬🇧</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;