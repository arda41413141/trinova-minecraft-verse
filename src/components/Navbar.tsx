
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
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

  return (
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
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="minecraft-btn"
              onClick={() => window.open("https://discord.gg/trinovastudios", "_blank")}
            >
              <span className="btn-content">Discord'a Katıl</span>
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            
            <Button 
              className="minecraft-btn mt-6 w-4/5"
              onClick={() => {
                window.open("https://discord.gg/trinovastudios", "_blank");
                closeMobileMenu();
              }}
            >
              <span className="btn-content">Discord'a Katıl</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
