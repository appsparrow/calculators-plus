
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MortgageCalculator from "./pages/MortgageCalculator";
import AutoLoanCalculator from "./pages/AutoLoanCalculator";
import CreditCardCalculator from "./pages/CreditCardCalculator";
import CalorieCalculator from "./pages/CalorieCalculator";
import DebtPayoffCalculator from "./pages/DebtPayoffCalculator";
import GpaCalculator from "./pages/GpaCalculator";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
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
          <Route path="/mortgage" element={<MortgageCalculator />} />
          <Route path="/auto-loan" element={<AutoLoanCalculator />} />
          <Route path="/credit-card" element={<CreditCardCalculator />} />
          <Route path="/calorie" element={<CalorieCalculator />} />
          <Route path="/debt-payoff" element={<DebtPayoffCalculator />} />
          <Route path="/gpa" element={<GpaCalculator />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
