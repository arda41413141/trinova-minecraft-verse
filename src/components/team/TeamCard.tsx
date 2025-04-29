
import React from "react";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  joinDate: string;
  discord: string;
  about: string;
}

interface TeamCardProps {
  member: TeamMember;
  icon: React.ReactNode;
}

const TeamCard = ({ member, icon }: TeamCardProps) => {
  return (
    <div className="glass-card p-5 hover:border-minecraft-primary/30 transition-all duration-300 hover:translate-y-[-5px]">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-24 h-24 rounded-lg border-2 border-white/10"
          />
          <div className="absolute -bottom-2 -right-2 bg-minecraft-dark rounded-full p-1.5">
            {icon}
          </div>
        </div>
        
        <h3 className="font-medium text-white mb-1">{member.name}</h3>
        <p className="text-minecraft-primary text-sm mb-3">{member.role}</p>
        
        <div className="w-12 h-0.5 bg-white/20 mb-3"></div>
        
        <p className="text-white/70 text-xs mb-1">Katılma: {member.joinDate}</p>
        <p className="text-white/70 text-xs mb-3">Discord: {member.discord}</p>
        
        <p className="text-white/60 text-xs">{member.about}</p>
      </div>
    </div>
  );
};

export default TeamCard;
