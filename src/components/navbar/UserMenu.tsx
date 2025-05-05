
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { User, ChevronDown, Crown } from "lucide-react";

type UserMenuProps = {
  onLogin: () => void;
  onRegister: () => void;
};

const UserMenu = ({ onLogin, onRegister }: UserMenuProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { vipStatus } = useCart();

  const handleLogout = async () => {
    await logout();
  };

  return isAuthenticated ? (
    <div className="relative group">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 text-white hover:text-minecraft-primary"
      >
        {vipStatus ? (
          <Crown size={18} className="text-yellow-400" />
        ) : (
          <User size={18} />
        )}
        <span className="max-w-[100px] truncate">{user?.username}</span>
        <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
      </Button>
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-minecraft-dark border border-minecraft-primary/20 z-50">
        <div className="py-1">
          <Link 
            to="/profile" 
            className="block px-4 py-2 text-sm text-white hover:bg-minecraft-primary/20"
          >
            Profilim
          </Link>
          <Link 
            to="/profile?tab=orders" 
            className="block px-4 py-2 text-sm text-white hover:bg-minecraft-primary/20"
          >
            Siparişlerim
          </Link>
          <Link 
            to="/profile?tab=tickets" 
            className="block px-4 py-2 text-sm text-white hover:bg-minecraft-primary/20"
          >
            Destek Taleplerim
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
        onClick={onLogin}
      >
        Giriş Yap
      </Button>
      <Button 
        className="minecraft-btn"
        onClick={onRegister}
      >
        <span className="btn-content">Kayıt Ol</span>
      </Button>
    </div>
  );
};

export default UserMenu;
