
import { Users, Clock, Award, Sword } from "lucide-react";

const ServerStats = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Sunucu İstatistikleri</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Users className="w-8 h-8 text-minecraft-primary" />}
            title="Oyuncular"
            value="10,000+"
            description="Kayıtlı oyuncu"
          />
          <StatCard 
            icon={<Clock className="w-8 h-8 text-minecraft-primary" />}
            title="Aktif"
            value="24/7"
            description="Kesintisiz sunucu"
          />
          <StatCard 
            icon={<Award className="w-8 h-8 text-minecraft-primary" />}
            title="Ödüller"
            value="250+"
            description="Haftalık ödül"
          />
          <StatCard 
            icon={<Sword className="w-8 h-8 text-minecraft-primary" />}
            title="Özel Eklentiler"
            value="30+"
            description="Benzersiz özellikler"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, description }: { 
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) => {
  return (
    <div className="glass-card p-6 text-center hover:border-minecraft-primary/30 transition-all duration-300 hover:translate-y-[-5px]">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
      <p className="text-minecraft-primary text-3xl font-minecraft mb-1">{value}</p>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
};

export default ServerStats;
