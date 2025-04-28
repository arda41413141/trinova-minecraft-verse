
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Discord } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-minecraft-dark pt-12 pb-6 border-t border-minecraft-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png" 
                alt="TrinovaStudios Logo" 
                className="w-10 h-10"
              />
              <span className="font-minecraft text-minecraft-primary text-xl">
                TrinovaStudios
              </span>
            </Link>
            <p className="text-white/70 mb-4 text-sm">
              TrinovaStudios, en iyi Minecraft deneyimini sunan, oyuncuların keyif alacağı bir topluluktur.
            </p>
            <div className="flex gap-4">
              <a href="https://discord.gg/trinovastudios" target="_blank" rel="noopener noreferrer" 
                 className="text-white/60 hover:text-minecraft-primary transition-colors">
                <Discord size={20} />
              </a>
              <a href="https://twitter.com/trinovastudios" target="_blank" rel="noopener noreferrer" 
                 className="text-white/60 hover:text-minecraft-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/trinovastudios" target="_blank" rel="noopener noreferrer" 
                 className="text-white/60 hover:text-minecraft-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/trinovastudios" target="_blank" rel="noopener noreferrer" 
                 className="text-white/60 hover:text-minecraft-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-minecraft text-white mb-4 text-lg">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-minecraft-primary transition-colors text-sm">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/server" className="text-white/70 hover:text-minecraft-primary transition-colors text-sm">
                  Sunucu Bilgisi
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-white/70 hover:text-minecraft-primary transition-colors text-sm">
                  Mağaza
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-white/70 hover:text-minecraft-primary transition-colors text-sm">
                  Sıralama
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Helpful Links */}
          <div>
            <h3 className="font-minecraft text-white mb-4 text-lg">Yardımcı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/team" className="text-white/70 hover:text-minecraft-primary transition-colors text-sm">
                  Ekibimiz
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-minecraft-primary transition-colors text-sm">
                  İletişim
                </Link>
              </li>
              <li>
                <a href="/kurallar" className="text-white/70 hover:text-minecraft-primary transition-colors text-sm">
                  Sunucu Kuralları
                </a>
              </li>
              <li>
                <a href="/gizlilik" className="text-white/70 hover:text-minecraft-primary transition-colors text-sm">
                  Gizlilik Politikası
                </a>
              </li>
            </ul>
          </div>
          
          {/* Server Status */}
          <div>
            <h3 className="font-minecraft text-white mb-4 text-lg">Sunucu Durumu</h3>
            <div className="bg-minecraft-darker p-4 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Sunucu:</span>
                <span className="text-green-400 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  Çevrimiçi
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Oyuncular:</span>
                <span className="text-white text-sm">127/500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">IP Adresi:</span>
                <span className="text-minecraft-primary text-sm font-medium">play.trinovastudios.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} TrinovaStudios. Tüm hakları saklıdır.
          </p>
          <p className="text-white/30 text-xs mt-2">
            Minecraft, Mojang AB'nin tescilli markasıdır. Bu site Mojang ile ilişkili değildir.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
