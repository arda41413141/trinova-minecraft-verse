
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import AuthDialog from "./auth/AuthDialog";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogView, setAuthDialogView] = useState<"login" | "register">("login");
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();
  
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

  const handleLogout = async () => {
    await logout();
    closeMobileMenu();
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
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png" 
                alt="TrinovaStudios Logo" 
                className="w-10 h-10"
              />
              <span className="font-minecraft text-minecraft-primary text-xl hidden sm:block">
                TrinovaStudios
              </span>
            </Link>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-minecraft-primary",
                    location.pathname === link.path 
                      ? "text-minecraft-primary bg-white/5" 
                      : "text-white/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            {/* User Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Shopping Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="text-white hover:text-minecraft-primary transition-colors" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-minecraft-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              
              {isAuthenticated ? (
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 text-white hover:text-minecraft-primary"
                  >
                    <User size={18} />
                    <span>{user?.username}</span>
                    <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-minecraft-dark border border-minecraft-primary/20">
                    <div className="py-1">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-white hover:bg-minecraft-primary/20"
                      >
                        Profilim
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block px-4 py-2 text-sm text-white hover:bg-minecraft-primary/20"
                      >
                        Siparişlerim
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-minecraft-primary/20"
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost"
                    className="text-white hover:text-minecraft-primary"
                    onClick={openLoginDialog}
                  >
                    Giriş Yap
                  </Button>
                  <Button 
                    className="minecraft-btn"
                    onClick={openRegisterDialog}
                  >
                    <span className="btn-content">Kayıt Ol</span>
                  </Button>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Shopping Cart Mobile */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="text-white hover:text-minecraft-primary transition-colors" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-minecraft-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              
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
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-minecraft-darker/95 backdrop-blur-lg z-40">
            <div className="flex flex-col items-center pt-10 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    "px-5 py-3 w-4/5 text-center rounded-md text-base font-medium transition-all",
                    location.pathname === link.path 
                      ? "text-minecraft-primary bg-white/5" 
                      : "text-white/80"
                  )}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="px-5 py-3 w-4/5 text-center rounded-md text-base font-medium text-minecraft-primary bg-white/5"
                    onClick={closeMobileMenu}
                  >
                    Profilim
                  </Link>
                  <Button 
                    className="minecraft-btn mt-4 w-4/5"
                    onClick={handleLogout}
                  >
                    <span className="btn-content">Çıkış Yap</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="minecraft-btn mt-4 w-4/5"
                    onClick={() => {
                      closeMobileMenu();
                      openLoginDialog();
                    }}
                  >
                    <span className="btn-content">Giriş Yap</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-4/5"
                    onClick={() => {
                      closeMobileMenu();
                      openRegisterDialog();
                    }}
                  >
                    Kayıt Ol
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
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
