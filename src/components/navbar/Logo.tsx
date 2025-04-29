
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png" 
        alt="TrinovaStudios Logo" 
        className="w-10 h-10"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/placeholder.svg";
        }}
      />
      <span className="font-minecraft text-minecraft-primary text-xl hidden sm:block">
        TrinovaStudios
      </span>
    </Link>
  );
};

export default Logo;
