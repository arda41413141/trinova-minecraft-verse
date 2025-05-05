
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
  navLinks: { name: string; path: string }[];
};

const MobileMenu = ({ isOpen, onClose, onLogin, onRegister, navLinks }: MobileMenuProps) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 top-16 bg-minecraft-darker/95 backdrop-blur-lg z-40">
      <div className="flex flex-col items-center pt-10 gap-4 max-h-[calc(100vh-4rem)] overflow-y-auto pb-20">
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
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
        
        {isAuthenticated ? (
          <>
            <Link 
              to="/profile" 
              className="px-5 py-3 w-4/5 text-center rounded-md text-base font-medium text-minecraft-primary bg-white/5"
              onClick={onClose}
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
                onClose();
                onLogin();
              }}
            >
              <span className="btn-content">Giriş Yap</span>
            </Button>
            <Button 
              variant="outline"
              className="w-4/5"
              onClick={() => {
                onClose();
                onRegister();
              }}
            >
              Kayıt Ol
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
