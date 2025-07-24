import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { LocationBasedTheme } from "@/hooks/useTheme";
import { Helmet } from 'react-helmet-async';

const App = () => (
  <>
    <Toaster />
    <Sonner />
    <Helmet>
      <title>Чистокръвни Мейн Куун Котки</title>
      <meta name="description" content="Чистокръвни Maine Coon котки от развъдник Radanov Pride. Красота, характер и здраве в едно!" />
    </Helmet>
    <LocationBasedTheme>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LocationBasedTheme>
  </>
);

export default App;
