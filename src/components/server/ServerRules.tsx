
import { Shield } from "lucide-react";

const ServerRules = () => {
  return (
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
  );
};

export default ServerRules;
