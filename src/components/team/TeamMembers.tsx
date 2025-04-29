
import { Shield, Code, HelpCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamCard from "./TeamCard";
import { modTeam, devTeam, helperTeam } from "@/data/teamData";

const TeamMembers = () => {
  return (
    <Tabs defaultValue="moderators" className="mb-10">
      <TabsList className="bg-minecraft-dark grid grid-cols-1 sm:grid-cols-3 mb-6">
        <TabsTrigger value="moderators" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">
          <Shield size={16} className="mr-2" /> Moderatörler
        </TabsTrigger>
        <TabsTrigger value="developers" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">
          <Code size={16} className="mr-2" /> Geliştiriciler
        </TabsTrigger>
        <TabsTrigger value="helpers" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">
          <HelpCircle size={16} className="mr-2" /> Yardımcılar
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="moderators">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modTeam.map((member, index) => (
            <TeamCard key={index} member={member} icon={<Shield size={16} className="text-blue-400" />} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="developers">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {devTeam.map((member, index) => (
            <TeamCard key={index} member={member} icon={<Code size={16} className="text-green-400" />} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="helpers">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helperTeam.map((member, index) => (
            <TeamCard key={index} member={member} icon={<HelpCircle size={16} className="text-yellow-400" />} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TeamMembers;
