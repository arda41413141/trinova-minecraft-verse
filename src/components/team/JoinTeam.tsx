
import { Star, Sparkles, ShieldCheck } from "lucide-react";
import TeamRequirements from "./TeamRequirements";

const JoinTeam = () => {
  return (
    <div className="glass-card p-8 mb-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-minecraft-primary/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-purple-600/20 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles size={20} className="text-yellow-400" />
          <h2 className="font-minecraft text-2xl text-white">Ekibimize Katıl!</h2>
          <Sparkles size={20} className="text-yellow-400" />
        </div>
        
        <div className="text-center mb-6">
          <p className="text-white/80 max-w-xl mx-auto text-sm">
            TrinovaStudios ekibimizin parçası olmak ve Minecraft topluluğumuzu geliştirmek ister misiniz? 
            Aşağıdaki gereksinimlere bakın ve bize katılmak için başvurun!
          </p>
        </div>
        
        <TeamRequirements />
        
        <div className="mt-6 text-center">
          <button className="minecraft-btn group">
            <span className="btn-content flex items-center gap-2">
              <ShieldCheck size={18} />
              <span>Şimdi Başvur</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
