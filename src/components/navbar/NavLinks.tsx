
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  links: { name: string; path: string }[];
};

const NavLinks = ({ links }: NavLinksProps) => {
  const location = useLocation();
  
  return (
    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
      {links.map((link) => (
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
  );
};

export default NavLinks;
