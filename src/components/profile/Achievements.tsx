
import React from "react";
import { Award, Shield, Sword, Pickaxe, Gem, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AchievementProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  isCompleted: boolean;
}

const Achievement = ({ name, description, icon, progress, isCompleted }: AchievementProps) => (
  <div className={`glass-card p-4 ${isCompleted ? 'border-yellow-500/40' : 'border-white/10'}`}>
    <div className="flex gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-yellow-500/20' : 'bg-white/5'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h3 className={`font-medium ${isCompleted ? 'text-yellow-400' : 'text-white'}`}>{name}</h3>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded">
            {isCompleted ? 'Tamamlandı' : `%${Math.round(progress)}`}
          </span>
        </div>
        <p className="text-sm text-white/70 mb-2">{description}</p>
        <Progress value={progress} className="h-1.5" />
      </div>
    </div>
  </div>
);

const Achievements = () => {
  const achievements = [
    {
      name: "Maden Ustası",
      description: "100 elmas madeni çıkart",
      icon: <Pickaxe size={24} className="text-cyan-400" />,
      progress: 100,
      isCompleted: true
    },
    {
      name: "PvP Şampiyonu",
      description: "50 oyuncu öldür",
      icon: <Sword size={24} className="text-red-400" />,
      progress: 72,
      isCompleted: false
    },
    {
      name: "Kale Savunucusu",
      description: "10 klan savaşı kazan",
      icon: <Shield size={24} className="text-blue-400" />,
      progress: 40,
      isCompleted: false
    },
    {
      name: "Değerli Koleksiyoncu",
      description: "Tüm nadir eşyaları topla",
      icon: <Gem size={24} className="text-purple-400" />,
      progress: 25,
      isCompleted: false
    },
    {
      name: "Veteran Oyuncu",
      description: "Sunucuda 100 saat geçir",
      icon: <Clock size={24} className="text-green-400" />,
      progress: 90,
      isCompleted: false
    },
    {
      name: "Elit Rütbe",
      description: "VIP rütbesine yüksel",
      icon: <Award size={24} className="text-yellow-400" />,
      progress: 100,
      isCompleted: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="font-minecraft text-2xl text-minecraft-primary mb-6">Başarımlarım</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <Achievement key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
