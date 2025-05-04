
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsUp, Star, Gift } from "lucide-react";

interface VoteSiteProps {
  name: string;
  icon: React.ReactNode;
  rewardDescription: string;
  url: string;
  cooldown?: string;
}

const VoteSite = ({ name, icon, rewardDescription, url, cooldown }: VoteSiteProps) => (
  <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-minecraft-primary/30">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-white">{name}</h3>
        <p className="text-sm text-white/70">{rewardDescription}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {cooldown && <span className="text-xs text-yellow-400 px-2 py-0.5 bg-yellow-400/10 rounded">{cooldown}</span>}
      <Button 
        className="minecraft-btn" 
        onClick={() => window.open(url, "_blank")}
      >
        <span className="btn-content">Oy Ver</span>
      </Button>
    </div>
  </div>
);

const ServerVote = () => {
  const voteSites = [
    {
      name: "MinecraftServerList",
      icon: <Star className="text-yellow-400" />,
      rewardDescription: "100 Coin + 1 Elmas Kılıç",
      url: "https://example.com/vote/1",
      cooldown: "12s kaldı"
    },
    {
      name: "TopMinecraftServers",
      icon: <ThumbsUp className="text-blue-400" />,
      rewardDescription: "150 Coin + Rastgele Eşya",
      url: "https://example.com/vote/2"
    },
    {
      name: "MinecraftMP",
      icon: <Heart className="text-red-400" />,
      rewardDescription: "200 Coin",
      url: "https://example.com/vote/3"
    },
    {
      name: "PlanetMinecraft",
      icon: <Gift className="text-green-400" />,
      rewardDescription: "250 Coin + Bonus Sandık",
      url: "https://example.com/vote/4"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-minecraft text-2xl text-minecraft-primary mb-2">Sunucumuza Oy Ver</h2>
          <p className="text-white/70">
            Her gün oy vererek özel ödüller kazanabilirsiniz. 
            Oy verdiğiniz her platform için farklı ödüller verilmektedir.
          </p>
        </div>
        
        <div className="space-y-4">
          {voteSites.map((site, index) => (
            <VoteSite key={index} {...site} />
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            24 saat içinde tüm platformlarda oy verirseniz ekstra 500 Coin kazanırsınız!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerVote;
