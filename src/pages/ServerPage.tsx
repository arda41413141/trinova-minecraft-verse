import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Server, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ServerPage = () => {
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
            <Button variant="outline" className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10">
              Discord'a Katıl
            </Button>
          </div>
        </div>
        
        {/* Game Modes */}
        <h2 className="section-title">Oyun Modları</h2>
        
        <Tabs defaultValue="smp" className="mb-10">
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
                    <Server size={16} className="text-minecraft-primary" />
                    Vanilla Minecraft deneyimi
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Arkadaş grupları ve klanlar
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Ticaret sistemi
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Düzenli etkinlikler
                  </li>
                </ul>
                <Button className="minecraft-btn">
                  <span className="btn-content">Şimdi Oyna: /server smp</span>
                </Button>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden">
                <img 
                  src="https://via.placeholder.com/600x400?text=SMP+Mode" 
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
                    <Server size={16} className="text-minecraft-primary" />
                    End kristalleri ve TNT ile PvP
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Özel kit ve eşya sistemleri
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Sıralama sistemi ve ödüller
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Haftalık turnuvalar
                  </li>
                </ul>
                <Button className="minecraft-btn">
                  <span className="btn-content">Şimdi Oyna: /server cpvp</span>
                </Button>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden">
                <img 
                  src="https://via.placeholder.com/600x400?text=CPVP+Mode" 
                  alt="CPVP Mode" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Server Rules */}
        <div className="glass-card p-6 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-minecraft-primary w-6 h-6" />
            <h2 className="font-minecraft text-2xl text-white">Sunucu Kuralları</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-minecraft-primary text-lg mb-3">Genel Kurallar</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex gap-2">
                  <span className="text-minecraft-primary font-bold">1.</span>
                  <p>Diğer oyunculara saygılı ol. Hakaret, taciz ve nefret söylemi kesinlikle yasaktır.</p>
                </li>
                <li className="flex gap-2">
                  <span className="text-minecraft-primary font-bold">2.</span>
                  <p>Hile, mod veya oyun açıklarını kullanmak yasaktır. Fair-play ilkelerine uygun oyna.</p>
                </li>
                <li className="flex gap-2">
                  <span className="text-minecraft-primary font-bold">3.</span>
                  <p>Spam yapmak, reklam paylaşmak ve sunucu sohbetini gereksiz meşgul etmek yasaktır.</p>
                </li>
                <li className="flex gap-2">
                  <span className="text-minecraft-primary font-bold">4.</span>
                  <p>Oyun içi ekonomiyi bozmaya çalışmak, dolandırıcılık yapmak yasaktır.</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-minecraft-primary text-lg mb-3">Oyun İçi Kurallar</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex gap-2">
                  <span className="text-minecraft-primary font-bold">1.</span>
                  <p>Diğer oyuncuların yapılarına izinsiz müdahalede bulunmak, griefing yasaktır.</p>
                </li>
                <li className="flex gap-2">
                  <span className="text-minecraft-primary font-bold">2.</span>
                  <p>Sunucu performansını etkileyecek büyüklükte otomatik farmlar inşa etmeyin.</p>
                </li>
                <li className="flex gap-2">
                  <span className="text-minecraft-primary font-bold">3.</span>
                  <p>Uygunsuz veya saldırgan yapılar inşa etmek yasaktır.</p>
                </li>
                <li className="flex gap-2">
                  <span className="text-minecraft-primary font-bold">4.</span>
                  <p>Her oyun moduna özel ek kurallar olabilir, lütfen bunlara uyun.</p>
                </li>
              </ul>
            </div>
          </div>
          
          <p className="text-white/50 text-sm mt-6">
            Kurallara uymayan oyunculara uyarı, geçici yasak veya kalıcı ban gibi cezalar uygulanabilir. 
            Kurallara saygı göstererek hep birlikte daha iyi bir oyun deneyimi yaratalım!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerPage;
