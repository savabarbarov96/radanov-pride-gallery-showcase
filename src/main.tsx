import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConvexProvider } from 'convex/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from 'react-helmet-async';
import convex from './lib/convex.ts'
import { AdminAuthProvider } from './hooks/useAdminAuth.tsx'
import { ThemeProvider } from './hooks/useTheme.tsx'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ConvexProvider client={convex}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <ThemeProvider>
                <AdminAuthProvider>
                  <App />
                </AdminAuthProvider>
              </ThemeProvider>
            </TooltipProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ConvexProvider>
    </HelmetProvider>
  </StrictMode>,
)
