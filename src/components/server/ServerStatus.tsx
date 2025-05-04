
import React from "react";
import { Users, Wifi, Clock } from "lucide-react";

interface ServerStatusItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass?: string;
}

const ServerStatusItem = ({ label, value, icon, colorClass = "text-green-400" }: ServerStatusItemProps) => (
  <div className="flex items-center gap-3 bg-black/20 px-4 py-3 rounded-lg">
    <div className={`${colorClass}`}>{icon}</div>
    <div>
      <p className="text-xs text-white/60">{label}</p>
      <p className={`font-medium ${colorClass}`}>{value}</p>
    </div>
  </div>
);

const ServerStatus = () => {
  // In a real app, these would come from an API
  const onlineCount = 217;
  const serverStatus = "Çevrimiçi";
  const uptime = "99.8%";

  return (
    <div className="glass-card p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
        <h3 className="font-minecraft text-lg text-minecraft-primary">Sunucu Durumu</h3>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-green-400 text-sm">Aktif</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ServerStatusItem 
          label="Aktif Oyuncular" 
          value={onlineCount} 
          icon={<Users size={18} />} 
        />
        <ServerStatusItem 
          label="Sunucu Durumu" 
          value={serverStatus} 
          icon={<Wifi size={18} />} 
        />
        <ServerStatusItem 
          label="Çalışma Süresi" 
          value={uptime} 
          icon={<Clock size={18} />} 
          colorClass="text-yellow-400"
        />
      </div>
      
      <div className="mt-4 pt-2 border-t border-white/10 text-center">
        <p className="text-sm text-white/60">play.trinovastudios.com</p>
      </div>
    </div>
  );
};

export default ServerStatus;
