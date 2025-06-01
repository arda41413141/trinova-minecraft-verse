
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/HeroSlider";
import ServerStats from "@/components/ServerStats";
import FeatureCard from "@/components/FeatureCard";
import { Gamepad2, Users, ShoppingCart, Shield, MessageSquare, BarChart3, Crown, Star } from "lucide-react";
import GameModeTabs from "@/components/server/GameModeTabs";
import MinecraftNews from "@/components/home/MinecraftNews";

const HomePage = () => {
  return (
    <div className="pt-16">
      <HeroSlider />
      
      {/* Hypixel-style IP Banner */}
      <div className="bg-gradient-to-r from-hypixel-orange to-hypixel-gold py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-hypixel-float"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Crown className="text-black w-6 h-6" />
              <h2 className="text-black text-2xl font-hypixel font-bold">Hemen Katıl!</h2>
              <Crown className="text-black w-6 h-6" />
            </div>
            <p className="text-black/80 font-medium text-lg">Sunucu IP: <span className="font-bold">play.farexnetwork.com</span></p>
          </div>
          <Button className="bg-black text-hypixel-gold border-2 border-black hover:bg-hypixel-gold hover:text-black font-bold transition-all duration-300 hover:scale-105">
            IP'yi Kopyala
          </Button>
        </div>
      </div>
      
      <ServerStats />
      
      {/* Hypixel-style Features Section */}
      <section className="py-16 bg-gradient-to-br from-hypixel-dark-primary to-hypixel-dark-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="animate-hypixel-float absolute top-10 left-10 w-20 h-20 border-2 border-hypixel-orange rounded-lg"></div>
          <div className="animate-hypixel-float absolute bottom-20 right-20 w-16 h-16 border-2 border-hypixel-aqua rounded-lg" style={{ animationDelay: '1s' }}></div>
          <div className="animate-hypixel-float absolute top-1/2 left-1/4 w-12 h-12 border-2 border-hypixel-gold rounded-lg" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-hypixel hypixel-title">Sunucumuzdaki Özellikler</h2>
            <div className="flex justify-center items-center gap-2 text-hypixel-gold">
              <Star size={16} className="animate-pulse" />
              <span className="text-sm">Premium Deneyim</span>
              <Star size={16} className="animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Özel Oyun Modları"
              description="Survival, SkyBlock, SkyWars, BedWars ve daha fazlasını içeren çeşitli oyun modları."
              icon={<Gamepad2 className="text-hypixel-orange w-8 h-8" />}
            />
            <FeatureCard 
              title="Aktif Topluluk"
              description="Her zaman oyun arkadaşı bulabileceğiniz canlı ve dostane bir topluluk."
              icon={<Users className="text-hypixel-aqua w-8 h-8" />}
            />
            <FeatureCard 
              title="Zengin Mağaza"
              description="Karakterini ve oyun deneyimini geliştirebileceğin özel ürünler."
              icon={<ShoppingCart className="text-hypixel-gold w-8 h-8" />}
            />
            <FeatureCard 
              title="Adaletli Oyun"
              description="Anti-hile sistemlerimiz ve aktif moderatörlerimiz ile adil bir oyun ortamı."
              icon={<Shield className="text-hypixel-green w-8 h-8" />}
            />
            <FeatureCard 
              title="Discord Entegrasyonu"
              description="Discord ve Minecraft hesaplarını bağlayarak özel avantajlar elde et."
              icon={<MessageSquare className="text-hypixel-purple w-8 h-8" />}
            />
            <FeatureCard 
              title="İstatistikler ve Sıralamalar"
              description="Kendi ilerlemeni takip et ve lider tablolarında yerini al."
              icon={<BarChart3 className="text-hypixel-blue w-8 h-8" />}
            />
          </div>
        </div>
      </section>
      
      {/* Hypixel-style Game Modes Section */}
      <section className="py-16 bg-gradient-to-r from-hypixel-dark-secondary to-hypixel-dark-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-hypixel hypixel-title">Oyun Modları</h2>
            <p className="text-hypixel-aqua text-lg">En sevdiğin oyun modunu seç ve maceraya başla!</p>
          </div>
          <GameModeTabs defaultValue="smp" />
          
          <div className="text-center mt-12">
            <Link to="/server">
              <Button className="hypixel-btn text-black font-bold text-lg px-8 py-4">
                <span className="btn-content">Tüm Oyun Modlarını Gör</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <MinecraftNews />
      
      {/* Hypixel-style Discord Banner */}
      <section className="py-20 bg-gradient-to-br from-hypixel-purple via-hypixel-blue to-hypixel-aqua relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="animate-hypixel-float absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="animate-hypixel-float absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="hypixel-card p-12 rounded-2xl border border-white/20">
              <Crown className="w-16 h-16 mx-auto mb-6 text-hypixel-gold animate-hypixel-glow" />
              <h2 className="font-hypixel text-4xl text-white mb-6 hypixel-title">Discord Topluluğumuza Katıl</h2>
              <p className="text-white/90 text-xl mb-8 font-medium">
                Güncellemelerden haberdar ol, etkinliklere katıl ve toplulukla etkileşime geç!
              </p>
              <Button className="hypixel-btn text-black font-bold text-lg px-8 py-4 hover:scale-110 transition-transform duration-300" 
                      onClick={() => window.open("https://discord.gg/farexnetwork", "_blank")}>
                <span className="btn-content flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Discord'a Katıl
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
