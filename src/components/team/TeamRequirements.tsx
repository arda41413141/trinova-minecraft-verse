
import React from "react";
import RequirementCard from "./RequirementCard";
import { Button } from "@/components/ui/button";
import { Lock, MessageCircle, Heart } from "lucide-react";

const TeamRequirements = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <p className="text-white/80 mb-4">
          TrinovaStudios'da topluluk odaklı ve tutkuluyuz. Sunucumuzu daha da geliştirmek için her zaman 
          yetenekli, adanmış ve topluluk odaklı yeni ekip üyeleri arıyoruz.
        </p>
        
        <h3 className="text-minecraft-primary text-lg font-medium mb-3">Açık Pozisyonlar:</h3>
        
        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2 text-white/80">
            <div className="text-minecraft-primary">★</div> Moderatör
          </li>
          <li className="flex items-center gap-2 text-white/80">
            <div className="text-minecraft-primary">★</div> Plugin Geliştirici
          </li>
          <li className="flex items-center gap-2 text-white/80">
            <div className="text-minecraft-primary">★</div> Yapı Ekibi Üyesi
          </li>
          <li className="flex items-center gap-2 text-white/80">
            <div className="text-minecraft-primary">★</div> İçerik Oluşturucu
          </li>
        </ul>
        
        <Button className="minecraft-btn">
          <span className="btn-content">Başvuru Yap</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-minecraft-primary text-lg font-medium mb-1">Aranan Nitelikler:</h3>
        
        <RequirementCard 
          icon={<Lock size={16} className="text-minecraft-primary" />}
          title="Aktif Olabilmek"
          description="Ekip üyelerinin düzenli olarak aktif olması ve sorumluluklarını yerine getirmesi beklenir."
        />
        
        <RequirementCard 
          icon={<MessageCircle size={16} className="text-minecraft-primary" />}
          title="İletişim Becerileri"
          description="Oyuncular ve diğer ekip üyeleriyle etkili iletişim kurabilmek önemlidir."
        />
        
        <RequirementCard 
          icon={<Lock size={16} className="text-minecraft-primary" />}
          title="Problem Çözme"
          description="Zorluklarla başa çıkabilme ve hızlı, etkili çözümler üretebilme yeteneği."
        />
        
        <RequirementCard 
          icon={<Heart size={16} className="text-minecraft-primary" />}
          title="Oyuna Tutku"
          description="Minecraft tutkusu ve topluluk odaklı düşünce yapısı gereklidir."
        />
      </div>
    </div>
  );
};

export default TeamRequirements;
