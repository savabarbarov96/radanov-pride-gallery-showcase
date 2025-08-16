import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CareGuide from "./pages/CareGuide";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { LocationBasedTheme } from "@/hooks/useTheme";
import { Helmet } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";

const AppContent = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Toaster />
      <Sonner />
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      <LocationBasedTheme>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/care-guide" element={<CareGuide />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocationBasedTheme>
    </>
  );
};

const App = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
