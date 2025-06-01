
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative">
        <img 
          src="/lovable-uploads/c3df9da0-3d20-4eaa-aabe-ef30af5b3a62.png" 
          alt="Farex Network Logo" 
          className="w-10 h-10 animate-hypixel-float hypixel-glow group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-hypixel-orange/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="hidden sm:block">
        <span className="font-hypixel text-xl font-bold hypixel-title">
          Farex Network
        </span>
        <div className="text-xs text-hypixel-aqua -mt-1">
          Premium Minecraft Server
        </div>
      </div>
    </Link>
  );
};

export default Logo;
