
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ChevronRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4">
      <div className="glass-card p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle size={64} className="text-minecraft-primary" />
        </div>
        <h1 className="font-minecraft text-4xl text-minecraft-primary mb-4">404</h1>
        <h2 className="text-xl text-white mb-6">Sayfa Bulunamadı</h2>
        <p className="text-white/70 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönün ve keşfetmeye devam edin.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button className="minecraft-btn">
              <span className="btn-content flex items-center gap-2">
                <Home size={16} />
                Ana Sayfaya Dön
              </span>
            </Button>
          </Link>
          <Link to="/server">
            <Button variant="outline" className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10">
              <span className="flex items-center gap-2">
                Sunucu Bilgisi
                <ChevronRight size={16} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
