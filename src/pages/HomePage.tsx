
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/HeroSlider";
import ServerStats from "@/components/ServerStats";
import FeatureCard from "@/components/FeatureCard";
import { Gamepad2, Users, ShoppingCart, Shield, MessageSquare, BarChart3 } from "lucide-react";

const HomePage = () => {
  return (
    <div className="pt-16">
      <HeroSlider />
      
      {/* IP Banner */}
      <div className="bg-minecraft-primary py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-white text-xl font-minecraft">Hemen Katıl!</h2>
            <p className="text-white/80">Sunucu IP: play.trinovastudios.com</p>
          </div>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            IP'yi Kopyala
          </Button>
        </div>
      </div>
      
      <ServerStats />
      
      {/* Features Section */}
      <section className="py-12 bg-minecraft-dark">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Sunucumuzdaki Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title="Özel Oyun Modları"
              description="Survival, SkyBlock, SkyWars, BedWars ve daha fazlasını içeren çeşitli oyun modları."
              icon={<Gamepad2 className="text-minecraft-primary w-6 h-6" />}
            />
            <FeatureCard 
              title="Aktif Topluluk"
              description="Her zaman oyun arkadaşı bulabileceğiniz canlı ve dostane bir topluluk."
              icon={<Users className="text-minecraft-primary w-6 h-6" />}
            />
            <FeatureCard 
              title="Zengin Mağaza"
              description="Karakterini ve oyun deneyimini geliştirebileceğin özel ürünler."
              icon={<ShoppingCart className="text-minecraft-primary w-6 h-6" />}
            />
            <FeatureCard 
              title="Adaletli Oyun"
              description="Anti-hile sistemlerimiz ve aktif moderatörlerimiz ile adil bir oyun ortamı."
              icon={<Shield className="text-minecraft-primary w-6 h-6" />}
            />
            <FeatureCard 
              title="Discord Entegrasyonu"
              description="Discord ve Minecraft hesaplarını bağlayarak özel avantajlar elde et."
              icon={<MessageSquare className="text-minecraft-primary w-6 h-6" />}
            />
            <FeatureCard 
              title="İstatistikler ve Sıralamalar"
              description="Kendi ilerlemeni takip et ve lider tablolarında yerini al."
              icon={<BarChart3 className="text-minecraft-primary w-6 h-6" />}
            />
          </div>
        </div>
      </section>
      
      {/* Game Modes Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Oyun Modları</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GameModeCard 
              title="Survival" 
              description="Hayatta kalma mücadelesi, ekonomi sistemi ve büyüleyici dünyalar."
              image="/images/survival.jpg"
              link="/server?mode=survival"
            />
            <GameModeCard 
              title="SkyBlock" 
              description="Küçük bir adadan imparatorluk kur ve adaları keşfet."
              image="/images/skyblock.jpg"
              link="/server?mode=skyblock"
            />
            <GameModeCard 
              title="BedWars" 
              description="Yatağını koru, rakiplerini yok et! Heyecan verici takım savaşları."
              image="/images/bedwars.jpg"
              link="/server?mode=bedwars"
            />
          </div>
          
          <div className="text-center mt-10">
            <Link to="/server">
              <Button className="minecraft-btn">
                <span className="btn-content">Tüm Oyun Modlarını Gör</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Discord Banner */}
      <section className="py-16 bg-gradient-purple relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="font-minecraft text-3xl text-white mb-6">Discord Topluluğumuza Katıl</h2>
            <p className="text-white/80 text-lg mb-6">
              Güncellemelerden haberdar ol, etkinliklere katıl ve toplulukla etkileşime geç!
            </p>
            <Button className="minecraft-btn" 
                    onClick={() => window.open("https://discord.gg/trinovastudios", "_blank")}>
              <span className="btn-content">Discord'a Katıl</span>
            </Button>
          </div>
        </div>
        {/* Discord Icon Background */}
        <div className="absolute -right-20 -top-20 opacity-10">
          <svg width="300" height="300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
          </svg>
        </div>
      </section>
    </div>
  );
};

const GameModeCard = ({ 
  title, 
  description, 
  image, 
  link 
}: {
  title: string;
  description: string;
  image: string;
  link: string;
}) => {
  return (
    <Link to={link} className="block">
      <div className="relative h-80 rounded-lg overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image || "https://via.placeholder.com/500x300?text=" + title})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-minecraft text-xl text-minecraft-primary mb-2">{title}</h3>
          <p className="text-white/80 text-sm mb-4">{description}</p>
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
            Keşfet
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default HomePage;
