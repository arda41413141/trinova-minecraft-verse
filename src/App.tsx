
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServerPage from "./pages/ServerPage";
import ShopPage from "./pages/ShopPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";
import { TicketsProvider } from "./hooks/use-tickets";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <TicketsProvider>
              <Toaster />
              <Sonner position="top-right" />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/server" element={<ServerPage />} />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/leaderboard" element={<LeaderboardPage />} />
                      <Route path="/team" element={<TeamPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </TicketsProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
