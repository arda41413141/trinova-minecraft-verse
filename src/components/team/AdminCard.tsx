
import { Shield } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  joinDate: string;
  discord: string;
  about: string;
}

interface AdminCardProps {
  member: TeamMember;
}

const AdminCard = ({ member }: AdminCardProps) => {
  return (
    <div className="glass-card p-6 hover:border-minecraft-primary/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative w-32 h-32 mx-auto md:mx-0">
            <div className="absolute inset-0 bg-gradient-to-br from-minecraft-primary to-purple-900 rounded-lg blur-lg opacity-60"></div>
            <img
              src={member.avatar}
              alt={member.name}
              className="relative w-full h-full object-cover rounded-lg border-4 border-minecraft-primary/30 z-10"
            />
            <div className="absolute -bottom-2 -right-2 bg-minecraft-primary rounded-full p-2 z-20">
              <Shield size={16} className="text-white" />
            </div>
          </div>
        </div>
        <div className="md:w-2/3 text-center md:text-left">
          <h3 className="font-minecraft text-xl text-minecraft-primary mb-1">{member.name}</h3>
          <p className="text-white font-medium mb-3">{member.role}</p>
          
          <div className="space-y-2 mb-4">
            <p className="text-white/70 text-sm flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2 h-2 bg-minecraft-primary rounded-full"></span>
              Katılma: {member.joinDate}
            </p>
            <p className="text-white/70 text-sm flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2 h-2 bg-minecraft-primary rounded-full"></span>
              Discord: {member.discord}
            </p>
          </div>
          
          <p className="text-white/80 text-sm">{member.about}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
