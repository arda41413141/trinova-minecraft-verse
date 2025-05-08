
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const ServerFAQ = () => {
  return (
    <div className="glass-card p-6 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="text-minecraft-primary w-6 h-6" />
        <h2 className="font-minecraft text-2xl text-white">Sıkça Sorulan Sorular</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-minecraft-primary">
            Sunucuya nasıl bağlanabilirim?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            Java Edition için <span className="text-minecraft-primary">play.trinovastudios.com</span> IP adresini, 
            Bedrock Edition için <span className="text-minecraft-primary">bedrock.trinovastudios.com</span> adresini 
            ve <span className="text-minecraft-primary">19132</span> portunu kullanabilirsiniz. Detaylı bilgi için 
            yukarıdaki bağlantı kartına bakabilirsiniz.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-minecraft-primary">
            Hangi Minecraft sürümleri destekleniyor?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            Sunucumuz Java Edition için 1.8 - 1.20.4 arası tüm sürümleri, Bedrock Edition için ise 
            en güncel sürümü desteklemektedir. En iyi performans için 1.19.4 veya 1.20.1 sürümünü 
            kullanmanızı öneriyoruz.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-minecraft-primary">
            Oyun modları arasında nasıl geçiş yapabilirim?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            Sunucuda farklı oyun modları arasında geçiş yapmak için <span className="text-minecraft-primary">/server [mod_adı]</span> 
            komutunu kullanabilirsiniz. Örneğin, SMP moduna geçmek için <span className="text-minecraft-primary">/server smp</span>, 
            CPVP moduna geçmek için <span className="text-minecraft-primary">/server cpvp</span> yazabilirsiniz.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-minecraft-primary">
            Sunucuda nasıl para/coin kazanabilirim?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            Sunucumuzda para kazanmanın birçok yolu var:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Günlük oynama ödülleri (<span className="text-minecraft-primary">/daily</span>)</li>
              <li>Sunucu için oy verme (<span className="text-minecraft-primary">/vote</span>)</li>
              <li>Etkinliklere katılma</li>
              <li>Oyun içi ekonomi sisteminde ticaret yapma</li>
              <li>Görevleri tamamlama (<span className="text-minecraft-primary">/quests</span>)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-minecraft-primary">
            Sunucuda VIP avantajları nelerdir?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            VIP üyeler aşağıdaki avantajlardan yararlanabilir:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Özel komutlar ve yetenekler</li>
              <li>Kozmetik eşyalar ve efektler</li>
              <li>Sunucu doluluğunda öncelikli giriş</li>
              <li>Özel chat renkleri ve prefiksler</li>
              <li>Haftalık bonus ödüller</li>
              <li>Özel VIP sunucu alanlarına erişim</li>
            </ul>
            VIP paketleri hakkında daha fazla bilgi için mağazamızı ziyaret edebilirsiniz.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-minecraft-primary">
            Sunucuda hile kullananlara nasıl şikayet edebilirim?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            Hile kullandığını düşündüğünüz oyuncuları <span className="text-minecraft-primary">/report [oyuncu] [sebep]</span> 
            komutu ile bildirebilir veya Discord sunucumuzdaki #şikayetler kanalına kanıtlarla birlikte rapor 
            edebilirsiniz. Moderatör ekibimiz en kısa sürede şikayetinizi inceleyecektir.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-7" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-minecraft-primary">
            Sunucuda nasıl arkadaş ekleyebilirim?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            Arkadaş sistemi için <span className="text-minecraft-primary">/friend add [oyuncu]</span> komutunu kullanabilirsiniz. 
            Diğer arkadaş komutlarına <span className="text-minecraft-primary">/friend help</span> yazarak ulaşabilirsiniz. 
            Ayrıca Discord sunucumuza katılarak diğer oyuncularla tanışabilirsiniz.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-8" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-minecraft-primary">
            Yeni güncellemeler ve etkinlikler hakkında nasıl haberdar olabilirim?
          </AccordionTrigger>
          <AccordionContent className="text-white/70">
            En güncel haberler ve etkinliklerden haberdar olmak için:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Discord sunucumuza katılın</li>
              <li>Web sitemizi düzenli olarak ziyaret edin</li>
              <li>Sosyal medya hesaplarımızı takip edin</li>
              <li>Oyun içinde <span className="text-minecraft-primary">/news</span> komutunu kullanın</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ServerFAQ;
