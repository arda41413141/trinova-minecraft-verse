
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
        
        <Tabs defaultValue="survival" className="mb-10">
          <TabsList className="bg-minecraft-dark grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="survival" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">Survival</TabsTrigger>
            <TabsTrigger value="skyblock" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">SkyBlock</TabsTrigger>
            <TabsTrigger value="bedwars" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">BedWars</TabsTrigger>
            <TabsTrigger value="creative" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">Creative</TabsTrigger>
          </TabsList>
          
          <TabsContent value="survival" className="glass-card p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="font-minecraft text-xl text-minecraft-primary mb-3">Survival Dünyası</h3>
                <p className="text-white/80 mb-4">
                  Gerçek bir hayatta kalma deneyimi için tasarlanmış dünyamızda kendi imparatorluğunu kurabilir, 
                  diğer oyuncularla işbirliği yapabilir ve sunucumuzun ekonomisinde yer alabilirsin.
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    McMMO eklentisi ile özelleştirilmiş yetenekler
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Oyuncu ekonomisi ve mağazalar
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Klan sistemleri ve arazi koruma
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Özel eşyalar ve büyü sistemleri
                  </li>
                </ul>
                <Button className="minecraft-btn">
                  <span className="btn-content">Şimdi Oyna: /server survival</span>
                </Button>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden">
                <img 
                  src="https://via.placeholder.com/600x400?text=Survival+Mode" 
                  alt="Survival Mode" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skyblock" className="glass-card p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="font-minecraft text-xl text-minecraft-primary mb-3">SkyBlock Adası</h3>
                <p className="text-white/80 mb-4">
                  Gökyüzünde küçük bir adada başlayarak, kendi cennetini inşa et. Zorlu görevleri tamamla, 
                  adanı geliştir ve sıralamalarda yükselerek ödüller kazan.
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Özel ada iyileştirmeleri ve genişletmeler
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Ada seviye sistemi ve rekabetçi sıralama
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Özel görevler ve ödül sistemleri
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Ada ziyaretleri ve sosyal etkileşimler
                  </li>
                </ul>
                <Button className="minecraft-btn">
                  <span className="btn-content">Şimdi Oyna: /server skyblock</span>
                </Button>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden">
                <img 
                  src="https://via.placeholder.com/600x400?text=SkyBlock+Mode" 
                  alt="SkyBlock Mode" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bedwars" className="glass-card p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="font-minecraft text-xl text-minecraft-primary mb-3">BedWars Savaşları</h3>
                <p className="text-white/80 mb-4">
                  Heyecan verici takım savaşlarında yatağını koru ve rakiplerinin yataklarını yok et! 
                  Stratejik düşün, kaynaklarını akıllıca kullan ve takım arkadaşlarınla zafere ulaş.
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Solo, Duo, 3v3 ve 4v4 modları
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Özel yükseltmeler ve eşya mağazaları
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Tematik haritalar ve oyun güncellemeleri
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Haftalık turnuvalar ve ödüller
                  </li>
                </ul>
                <Button className="minecraft-btn">
                  <span className="btn-content">Şimdi Oyna: /server bedwars</span>
                </Button>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden">
                <img 
                  src="https://via.placeholder.com/600x400?text=BedWars+Mode" 
                  alt="BedWars Mode" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="creative" className="glass-card p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="font-minecraft text-xl text-minecraft-primary mb-3">Creative Dünyası</h3>
                <p className="text-white/80 mb-4">
                  Hayal gücünü serbest bırak ve sınırsız kaynaklarla yaratıcılığını konuştur! 
                  Kendi parselini al, muhteşem yapılar inşa et ve diğer oyuncuların yaratımlarını keşfet.
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Ücretsiz ve Premium parseller
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    WorldEdit ve VoxelSniper desteği
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Haftalık yapı yarışmaları
                  </li>
                  <li className="flex items-center gap-2">
                    <Server size={16} className="text-minecraft-primary" />
                    Özel dekoratif kafalar ve bloklar
                  </li>
                </ul>
                <Button className="minecraft-btn">
                  <span className="btn-content">Şimdi Oyna: /server creative</span>
                </Button>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden">
                <img 
                  src="https://via.placeholder.com/600x400?text=Creative+Mode" 
                  alt="Creative Mode" 
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
