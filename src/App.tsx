import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Order from "./pages/Order";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <div style={{ backgroundColor: '#FEFDFB', minHeight: '100vh' }}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={(() => {
          const basePath = import.meta.env.VITE_BASE_PATH || import.meta.env.BASE_URL || '';
          return basePath.replace(/\/$/, '');
        })()}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/commander" element={<Order />} />
            <Route path="/merci" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;
