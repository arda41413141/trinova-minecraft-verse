
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, Gamepad2 } from "lucide-react";

type GameModeTabsProps = {
  defaultValue?: string;
};

const GameModeTabs = ({ defaultValue = "smp" }: GameModeTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="mb-10">
      <TabsList className="bg-minecraft-dark grid grid-cols-2 mb-6">
        <TabsTrigger value="smp" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">SMP</TabsTrigger>
        <TabsTrigger value="cpvp" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">CPVP</TabsTrigger>
      </TabsList>
      
      <TabsContent value="smp" className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h3 className="font-minecraft text-xl text-minecraft-primary mb-3">SMP (Survival MultiPlayer)</h3>
            <p className="text-white/80 mb-4">
              Arkadaşlarınla birlikte hayatta kalmaya çalış, doğal minecraft deneyimi ile evler ve şehirler inşa et. 
              Yeni bölgeleri keşfet ve diğer oyuncularla maceraya atıl!
            </p>
            <ul className="space-y-2 text-white/70 mb-4">
              <li className="flex items-center gap-2">
                <Gamepad2 size={16} className="text-minecraft-primary" />
                Vanilla Minecraft deneyimi
              </li>
              <li className="flex items-center gap-2">
                <Users size={16} className="text-minecraft-primary" />
                Arkadaş grupları ve klanlar
              </li>
              <li className="flex items-center gap-2">
                <Gamepad2 size={16} className="text-minecraft-primary" />
                Ticaret sistemi
              </li>
              <li className="flex items-center gap-2">
                <Users size={16} className="text-minecraft-primary" />
                Düzenli etkinlikler
              </li>
            </ul>
            <Button className="minecraft-btn">
              <span className="btn-content">Şimdi Oyna: /server smp</span>
            </Button>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden">
            <img 
              src="/images/smp-mode.webp" 
              alt="SMP Mode" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="cpvp" className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h3 className="font-minecraft text-xl text-minecraft-primary mb-3">CPVP (Crystal PvP)</h3>
            <p className="text-white/80 mb-4">
              End kristalleriyle dolu heyecan verici PvP deneyimi! Stratejik savaşlar ve yoğun mücadeleler ile 
              rakiplerini alt et ve sunucunun en iyi savaşçısı ol.
            </p>
            <ul className="space-y-2 text-white/70 mb-4">
              <li className="flex items-center gap-2">
                <Gamepad2 size={16} className="text-minecraft-primary" />
                End kristalleri ve TNT ile PvP
              </li>
              <li className="flex items-center gap-2">
                <Users size={16} className="text-minecraft-primary" />
                Özel kit ve eşya sistemleri
              </li>
              <li className="flex items-center gap-2">
                <Gamepad2 size={16} className="text-minecraft-primary" />
                Sıralama sistemi ve ödüller
              </li>
              <li className="flex items-center gap-2">
                <Users size={16} className="text-minecraft-primary" />
                Haftalık turnuvalar
              </li>
            </ul>
            <Button className="minecraft-btn">
              <span className="btn-content">Şimdi Oyna: /server cpvp</span>
            </Button>
          </div>
          <div className="md:w-1/2 rounded-lg overflow-hidden">
            <img 
              src="/images/cpvp-mode.webp" 
              alt="CPVP Mode" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GameModeTabs;
