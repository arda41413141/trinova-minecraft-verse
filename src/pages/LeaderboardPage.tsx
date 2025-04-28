
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Trophy, Medal, Award, Clock, BarChart3, Crown } from "lucide-react";

// Dummy data for leaderboards
const survivalPlayers = [
  { rank: 1, name: "DragonSlayer", level: 98, kills: 5243, playtime: "1423 saat" },
  { rank: 2, name: "Enderman_69", level: 95, kills: 4932, playtime: "1352 saat" },
  { rank: 3, name: "MythicCrafter", level: 92, kills: 4721, playtime: "1298 saat" },
  { rank: 4, name: "ShadowHunter", level: 90, kills: 4521, playtime: "1245 saat" },
  { rank: 5, name: "Blaze_Master", level: 87, kills: 4328, playtime: "1189 saat" },
  { rank: 6, name: "CraftLegend", level: 85, kills: 4102, playtime: "1143 saat" },
  { rank: 7, name: "DiamondKing", level: 83, kills: 3911, playtime: "1098 saat" },
  { rank: 8, name: "BlockBuster", level: 80, kills: 3765, playtime: "1052 saat" },
  { rank: 9, name: "PixelWarrior", level: 78, kills: 3622, playtime: "1027 saat" },
  { rank: 10, name: "RedstoneWiz", level: 76, kills: 3487, playtime: "986 saat" },
];

const skyblockPlayers = [
  { rank: 1, name: "IslandKing", level: 85, value: "15.2M", challenges: 412 },
  { rank: 2, name: "SkyMaster", level: 82, value: "14.8M", challenges: 398 },
  { rank: 3, name: "CloudWalker", level: 80, value: "14.1M", challenges: 387 },
  { rank: 4, name: "VoidBuilder", level: 78, value: "13.5M", challenges: 365 },
  { rank: 5, name: "AetherLord", level: 76, value: "12.9M", challenges: 352 },
  { rank: 6, name: "SolarFlare", level: 74, value: "12.4M", challenges: 340 },
  { rank: 7, name: "CosmicCrafter", level: 71, value: "11.8M", challenges: 332 },
  { rank: 8, name: "StarGazer", level: 69, value: "11.2M", challenges: 319 },
  { rank: 9, name: "NebulaKnight", level: 67, value: "10.7M", challenges: 305 },
  { rank: 10, name: "GalaxyQuest", level: 65, value: "10.3M", challenges: 298 },
];

const pvpPlayers = [
  { rank: 1, name: "BladeOfGlory", kills: 12453, deaths: 2134, kd: "5.84", wins: 1523 },
  { rank: 2, name: "ArrowStorm", kills: 11987, deaths: 2245, kd: "5.34", wins: 1487 },
  { rank: 3, name: "WarMachine", kills: 11432, deaths: 2356, kd: "4.85", wins: 1421 },
  { rank: 4, name: "DeathBringer", kills: 10876, deaths: 2487, kd: "4.37", wins: 1376 },
  { rank: 5, name: "ShadowAssassin", kills: 10321, deaths: 2532, kd: "4.08", wins: 1332 },
  { rank: 6, name: "EliteSniper", kills: 9876, deaths: 2598, kd: "3.80", wins: 1287 },
  { rank: 7, name: "VictoryHunter", kills: 9432, deaths: 2643, kd: "3.57", wins: 1232 },
  { rank: 8, name: "BattleMaster", kills: 9154, deaths: 2721, kd: "3.36", wins: 1198 },
  { rank: 9, name: "LegendaryFighter", kills: 8765, deaths: 2798, kd: "3.13", wins: 1143 },
  { rank: 10, name: "CombatKing", kills: 8421, deaths: 2876, kd: "2.93", wins: 1098 },
];

const LeaderboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-minecraft text-4xl text-minecraft-primary mb-4">Sıralama Tablosu</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            En iyi oyuncuların sıralamasını görüntüle, zirveye çıkmak için mücadele et ve adını en iyiler arasına yazdır!
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="glass-card p-4 mb-8 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              placeholder="Oyuncu ara..."
              className="w-full bg-minecraft-darker border border-white/10 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:border-minecraft-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="ml-4 minecraft-btn">
            <span className="btn-content">Ara</span>
          </Button>
        </div>
        
        {/* Top Players Showcase */}
        <div className="mb-10">
          <h2 className="section-title mb-8">Bu Ayın En İyi Oyuncuları</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 2nd Place */}
            <div className="glass-card p-6 text-center order-2 md:order-1 transform hover:scale-105 transition-transform duration-300">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center mx-auto">
                  <img
                    src="https://mc-heads.net/avatar/Enderman_69"
                    alt="2nd Place Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center border-2 border-minecraft-darker">
                  <Medal size={18} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-300 mb-1">Enderman_69</h3>
              <p className="text-minecraft-primary font-minecraft mb-2">2. Sıra</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white/5 rounded p-1">
                  <span className="block text-white/60">Seviye</span>
                  <span className="text-white">95</span>
                </div>
                <div className="bg-white/5 rounded p-1">
                  <span className="block text-white/60">Öldürme</span>
                  <span className="text-white">4,932</span>
                </div>
              </div>
            </div>
            
            {/* 1st Place */}
            <div className="glass-card p-6 text-center border border-minecraft-primary/30 order-1 md:order-2 transform hover:scale-105 transition-transform duration-300">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center mx-auto ring-4 ring-yellow-500/30">
                  <img
                    src="https://mc-heads.net/avatar/DragonSlayer"
                    alt="1st Place Avatar"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center border-2 border-minecraft-darker">
                  <Crown size={20} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">DragonSlayer</h3>
              <p className="text-minecraft-primary font-minecraft text-lg mb-3">1. Sıra</p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div className="bg-white/5 rounded p-2">
                  <span className="block text-white/60">Seviye</span>
                  <span className="text-white">98</span>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <span className="block text-white/60">Öldürme</span>
                  <span className="text-white">5,243</span>
                </div>
              </div>
              <div className="mt-1">
                <span className="bg-minecraft-primary/20 text-minecraft-primary text-xs py-1 px-2 rounded">
                  Kral #1 - 3 ay üst üste!
                </span>
              </div>
            </div>
            
            {/* 3rd Place */}
            <div className="glass-card p-6 text-center order-3 transform hover:scale-105 transition-transform duration-300">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-700 to-amber-500 flex items-center justify-center mx-auto">
                  <img
                    src="https://mc-heads.net/avatar/MythicCrafter"
                    alt="3rd Place Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-600 rounded-full w-8 h-8 flex items-center justify-center border-2 border-minecraft-darker">
                  <Award size={18} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-amber-200 mb-1">MythicCrafter</h3>
              <p className="text-minecraft-primary font-minecraft mb-2">3. Sıra</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white/5 rounded p-1">
                  <span className="block text-white/60">Seviye</span>
                  <span className="text-white">92</span>
                </div>
                <div className="bg-white/5 rounded p-1">
                  <span className="block text-white/60">Öldürme</span>
                  <span className="text-white">4,721</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Leaderboard Tabs */}
        <h2 className="section-title">Oyun Modları Sıralamaları</h2>
        
        <Tabs defaultValue="survival" className="mb-10">
          <TabsList className="bg-minecraft-dark grid grid-cols-1 sm:grid-cols-3 mb-6">
            <TabsTrigger value="survival" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">
              <Trophy size={16} className="mr-2" /> Survival
            </TabsTrigger>
            <TabsTrigger value="skyblock" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">
              <Clock size={16} className="mr-2" /> SkyBlock
            </TabsTrigger>
            <TabsTrigger value="pvp" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">
              <BarChart3 size={16} className="mr-2" /> PvP
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="survival">
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-minecraft-dark border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Sıra</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Oyuncu</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Seviye</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Öldürme</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Oynama Süresi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {survivalPlayers.map((player, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-minecraft-primary/10 transition-colors`}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {player.rank === 1 && (
                            <span className="inline-flex items-center justify-center bg-yellow-600/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-yellow-400" />
                            </span>
                          )}
                          {player.rank === 2 && (
                            <span className="inline-flex items-center justify-center bg-gray-500/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-gray-300" />
                            </span>
                          )}
                          {player.rank === 3 && (
                            <span className="inline-flex items-center justify-center bg-amber-700/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-amber-500" />
                            </span>
                          )}
                          {player.rank > 3 && (
                            <span className="text-white/70">{player.rank}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={`https://mc-heads.net/avatar/${player.name}`}
                              alt={player.name}
                              className="w-8 h-8 mr-3 rounded"
                            />
                            <span className="text-white">{player.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-minecraft-primary font-medium">{player.level}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">
                          {player.kills.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">
                          {player.playtime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-minecraft-dark/50 p-4 flex justify-between items-center">
                <span className="text-white/70 text-sm">Toplam Oyuncu: 2,543</span>
                <Button variant="outline" className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10">
                  Tümünü Görüntüle
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skyblock">
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-minecraft-dark border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Sıra</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Oyuncu</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Seviye</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Ada Değeri</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Görevler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skyblockPlayers.map((player, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-minecraft-primary/10 transition-colors`}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {player.rank === 1 && (
                            <span className="inline-flex items-center justify-center bg-yellow-600/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-yellow-400" />
                            </span>
                          )}
                          {player.rank === 2 && (
                            <span className="inline-flex items-center justify-center bg-gray-500/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-gray-300" />
                            </span>
                          )}
                          {player.rank === 3 && (
                            <span className="inline-flex items-center justify-center bg-amber-700/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-amber-500" />
                            </span>
                          )}
                          {player.rank > 3 && (
                            <span className="text-white/70">{player.rank}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={`https://mc-heads.net/avatar/${player.name}`}
                              alt={player.name}
                              className="w-8 h-8 mr-3 rounded"
                            />
                            <span className="text-white">{player.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-minecraft-primary font-medium">{player.level}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">
                          {player.value}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">
                          {player.challenges}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-minecraft-dark/50 p-4 flex justify-between items-center">
                <span className="text-white/70 text-sm">Toplam Oyuncu: 1,872</span>
                <Button variant="outline" className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10">
                  Tümünü Görüntüle
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pvp">
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-minecraft-dark border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Sıra</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Oyuncu</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Öldürmeler</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Ölümler</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">K/D</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Galibiyet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pvpPlayers.map((player, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-minecraft-primary/10 transition-colors`}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {player.rank === 1 && (
                            <span className="inline-flex items-center justify-center bg-yellow-600/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-yellow-400" />
                            </span>
                          )}
                          {player.rank === 2 && (
                            <span className="inline-flex items-center justify-center bg-gray-500/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-gray-300" />
                            </span>
                          )}
                          {player.rank === 3 && (
                            <span className="inline-flex items-center justify-center bg-amber-700/50 w-6 h-6 rounded-full">
                              <Trophy size={14} className="text-amber-500" />
                            </span>
                          )}
                          {player.rank > 3 && (
                            <span className="text-white/70">{player.rank}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={`https://mc-heads.net/avatar/${player.name}`}
                              alt={player.name}
                              className="w-8 h-8 mr-3 rounded"
                            />
                            <span className="text-white">{player.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-minecraft-primary font-medium">
                          {player.kills.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">
                          {player.deaths.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">
                          {player.kd}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">
                          {player.wins.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-minecraft-dark/50 p-4 flex justify-between items-center">
                <span className="text-white/70 text-sm">Toplam Oyuncu: 3,128</span>
                <Button variant="outline" className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10">
                  Tümünü Görüntüle
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Join Server CTA */}
        <div className="glass-card p-8 text-center">
          <h2 className="font-minecraft text-2xl text-white mb-4">Sıralamalarda Yerini Al!</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            En iyilerle rekabet et, yeteneklerini geliştir ve sunucumuzda adını duyur. Şimdi katıl ve sıralamalarda yükselmeye başla!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="minecraft-btn">
              <span className="btn-content">Şimdi Katıl</span>
            </Button>
            <Button variant="outline" className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10">
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
