
import ServerConnectionCard from "@/components/server/ServerConnectionCard";
import GameModeTabs from "@/components/server/GameModeTabs";
import ServerRules from "@/components/server/ServerRules";
import { useSearchParams } from "react-router-dom";

const ServerPage = () => {
  const [searchParams] = useSearchParams();
  const defaultGameMode = searchParams.get("mode") || "smp";
  
  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-minecraft text-4xl text-minecraft-primary mb-4">Sunucu Bilgileri</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            TrinovaStudios Minecraft sunucusuna nasıl bağlanacağınızı, oyun modlarımızı ve sunucumuzda sizi nelerin beklediğini öğrenin.
          </p>
        </div>
        
        {/* Server Connection */}
        <ServerConnectionCard />
        
        {/* Game Modes */}
        <h2 className="section-title">Oyun Modları</h2>
        <GameModeTabs defaultValue={defaultGameMode} />
        
        {/* Server Rules */}
        <ServerRules />
      </div>
    </div>
  );
};

export default ServerPage;
