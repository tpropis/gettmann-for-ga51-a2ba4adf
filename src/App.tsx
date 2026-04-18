import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
const DistrictMap = lazy(() => import("./pages/DistrictMap"));
const CommunityCouncil = lazy(() => import("./pages/CommunityCouncil"));
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/map"
            element={
              <Suspense
                fallback={
                  <div className="min-h-screen bg-campaign-light flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 border-4 border-campaign-navy/20 border-t-campaign-navy rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm text-campaign-navy/60 font-medium">Loading Map…</p>
                    </div>
                  </div>
                }
              >
                <DistrictMap />
              </Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
