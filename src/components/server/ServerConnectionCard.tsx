
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ServerConnectionCard = () => {
  const { toast } = useToast();
  const [serverIP] = useState("play.trinovastudios.com");
  
  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    toast({
      title: "IP Kopyalandı!",
      description: "Sunucu IP adresi panoya kopyalandı.",
    });
  };

  return (
    <div className="glass-card p-6 mb-10">
      <h2 className="font-minecraft text-2xl text-white mb-4">Sunucuya Nasıl Katılırım?</h2>
      
      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
          <h3 className="text-minecraft-primary text-lg mb-2">1. Java Edisyonu</h3>
          <ol className="list-decimal list-inside space-y-2 text-white/70">
            <li>Minecraft Java Sürümünü başlat (1.8 - 1.20.4 desteklenir)</li>
            <li>Çoklu Oyuncu menüsüne gir</li>
            <li>Sunucu Ekle'ye tıkla</li>
            <li>Sunucu IP'sini gir: <span className="text-minecraft-primary font-medium">{serverIP}</span></li>
            <li>Bağlan ve oynamaya başla!</li>
          </ol>
        </div>
        
        <div className="flex-1 min-w-[300px]">
          <h3 className="text-minecraft-primary text-lg mb-2">2. Bedrock Edisyonu</h3>
          <ol className="list-decimal list-inside space-y-2 text-white/70">
            <li>Minecraft Bedrock Sürümünü başlat</li>
            <li>Oyna düğmesine ve ardından Sunucular sekmesine tıkla</li>
            <li>Sunucu Ekle'ye tıkla</li>
            <li>Sunucu IP: <span className="text-minecraft-primary font-medium">bedrock.trinovastudios.com</span></li>
            <li>Port: <span className="text-minecraft-primary font-medium">19132</span></li>
            <li>Bağlan ve oynamaya başla!</li>
          </ol>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button className="minecraft-btn" onClick={copyIP}>
          <span className="btn-content flex items-center gap-2">
            <Copy size={16} /> IP'yi Kopyala
          </span>
        </Button>
        <Button 
          variant="outline" 
          className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10"
          onClick={() => window.open("https://discord.gg/trinovastudios", "_blank")}
        >
          Discord'a Katıl
        </Button>
      </div>
    </div>
  );
};

export default ServerConnectionCard;
