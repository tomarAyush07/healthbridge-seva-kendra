import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

// pages...
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Schemes from "./pages/Schemes";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Research from "./pages/Research";
import AIChat from "@/pages/AIChat";
import AccountDashboard from "@/pages/AccountDashboard";
import HealthAssessment from "@/pages/HealthAssessment";

import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/research" element={<Research />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/ai-chat" element={<AIChat />} />
                <Route path="/account-dashboard" element={<AccountDashboard />} />
                <Route path="/health-assessment" element={<HealthAssessment />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
