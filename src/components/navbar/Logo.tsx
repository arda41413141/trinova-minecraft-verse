
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/c3df9da0-3d20-4eaa-aabe-ef30af5b3a62.png" 
        alt="Farex Network Logo" 
        className="w-10 h-10 animate-pulse-gentle"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/placeholder.svg";
        }}
      />
      <span className="font-farex text-minecraft-primary text-xl hidden sm:block font-bold">
        Farex Network
      </span>
    </Link>
  );
};

export default Logo;
