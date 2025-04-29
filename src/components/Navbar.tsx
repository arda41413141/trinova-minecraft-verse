
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthDialog from "./auth/AuthDialog";
import { useIsMobile } from "@/hooks/use-mobile";

// Import our new sub-components
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import UserMenu from "./navbar/UserMenu";
import CartButton from "./navbar/CartButton";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogView, setAuthDialogView] = useState<"login" | "register">("login");
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Sunucu", path: "/server" },
    { name: "Mağaza", path: "/shop" },
    { name: "Sıralama", path: "/leaderboard" },
    { name: "Ekip", path: "/team" },
    { name: "İletişim", path: "/contact" },
  ];
  
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const openLoginDialog = () => {
    setAuthDialogView("login");
    setAuthDialogOpen(true);
  };

  const openRegisterDialog = () => {
    setAuthDialogView("register");
    setAuthDialogOpen(true);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
          isScrolled ? "bg-minecraft-dark/95 backdrop-blur-lg shadow-lg shadow-purple-900/20" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo />
            
            {/* Desktop Menu */}
            <NavLinks links={navLinks} />
            
            {/* User Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Shopping Cart */}
              <CartButton />
              
              {/* User Menu */}
              <UserMenu 
                onLogin={openLoginDialog}
                onRegister={openRegisterDialog}
              />
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Shopping Cart Mobile */}
              <CartButton />
              
              <button 
                className="text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={mobileMenuOpen}
          onClose={closeMobileMenu}
          onLogin={openLoginDialog}
          onRegister={openRegisterDialog}
          navLinks={navLinks}
        />
      </header>
      
      {/* Auth Dialog */}
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        defaultView={authDialogView} 
      />
    </>
  );
};

export default Navbar;
