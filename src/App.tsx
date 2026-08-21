import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import CareGuide from "./pages/CareGuide";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";
import BreedingCats from "./pages/BreedingCats";
import AvailableKittens from "./pages/AvailableKittens";
import PastLitters from "./pages/PastLitters";
import Shows from "./pages/Shows";
import HealthCare from "./pages/HealthCare";
import { LocationBasedTheme } from "@/hooks/useTheme";
import { Helmet } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";

// Lazy load admin components to reduce initial bundle size
const Admin = lazy(() => import("./pages/Admin"));

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
          <Route path="/breeding-cats" element={<BreedingCats />} />
          <Route path="/available-kittens" element={<AvailableKittens />} />
          <Route path="/past-litters" element={<PastLitters />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/health-care" element={<HealthCare />} />
          <Route path="/admin" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading admin panel...</p>
              </div>
            </div>}>
              <Admin />
            </Suspense>
          } />
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
