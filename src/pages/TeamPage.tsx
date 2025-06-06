
import { founderTeam } from "@/data/teamData";
import FounderCard from "@/components/team/FounderCard";
import TeamMembers from "@/components/team/TeamMembers";
import JoinTeam from "@/components/team/JoinTeam";
import ApplicationProcess from "@/components/team/ApplicationProcess";

const TeamPage = () => {
  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-minecraft text-4xl text-minecraft-primary mb-4">Ekibimiz</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Farex Network'ün arkasındaki ekiple tanışın. Sunucumuzu harika kılmak için gece gündüz çalışan, 
            topluluk deneyiminizi en üst düzeye çıkarmaya adanmış özel ekibimiz.
          </p>
        </div>
        
        {/* Founders Team */}
        <h2 className="font-minecraft text-2xl text-minecraft-primary mb-6 text-center">Kurucular</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
          {founderTeam.map((member, index) => (
            <FounderCard key={index} member={member} />
          ))}
        </div>
        
        {/* Team Tabs */}
        <TeamMembers />
        
        {/* Join the Team */}
        <JoinTeam />
        
        {/* Staff Applications */}
        <div className="glass-card p-8 mb-10">
          <ApplicationProcess />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
