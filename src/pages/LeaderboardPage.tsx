
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Trophy, Medal, Award, Clock, BarChart3, Crown, Gamepad2, Users } from "lucide-react";
import { MinecraftBadge } from "@/components/ui/minecraft-badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Dummy data for leaderboards
const smpPlayers = [
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

const cpvpPlayers = [
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

// Combine all players for search
const allPlayers = [
  ...smpPlayers.map(player => ({ ...player, mode: 'SMP' })),
  ...cpvpPlayers.map(player => ({ ...player, mode: 'CPVP' }))
];

// Player stats - extended data for the profile dialog
const playerStats = {
  "DragonSlayer": {
    joinDate: "15/03/2022",
    totalPlaytime: "1423 saat",
    achievements: ["Kral #1 - 3 ay üst üste!", "Ejderha Katili", "Elmas Avcısı"],
    rank: "MVP+",
    level: 98,
    kills: 5243,
    deaths: 1245,
    kd: "4.21",
    wins: 873,
    mode: "SMP"
  },
  "BladeOfGlory": {
    joinDate: "22/08/2022",
    totalPlaytime: "1654 saat",
    achievements: ["PvP Ustası", "Gladyatör", "Şampiyon"],
    rank: "MVP",
    level: 97,
    kills: 12453,
    deaths: 2134,
    kd: "5.84",
    wins: 1523,
    mode: "CPVP"
  }
};

type PlayerDialogProps = {
  playerName: string;
  isOpen: boolean;
  onClose: () => void;
};

const PlayerDialog = ({ playerName, isOpen, onClose }: PlayerDialogProps) => {
  // Get player data from our stats object, or use default values
  const player = playerStats[playerName] || {
    joinDate: "Bilinmiyor",
    totalPlaytime: "Bilinmiyor",
    achievements: [],
    rank: "Oyuncu",
    level: 0,
    kills: 0,
    deaths: 0,
    kd: "0",
    wins: 0,
    mode: "Bilinmiyor"
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass-card border-minecraft-primary/30 max-w-2xl">
        <DialogHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center">
            <img
              src={`https://mc-heads.net/avatar/${playerName}`}
              alt={playerName}
              className="w-16 h-16 mr-4 rounded-md border-2 border-white/20"
            />
            <div>
              <DialogTitle className="text-2xl font-minecraft text-minecraft-primary">{playerName}</DialogTitle>
              <div className="flex gap-2 mt-2">
                <MinecraftBadge variant="rank">{player.rank}</MinecraftBadge>
                <MinecraftBadge variant="mode">{player.mode}</MinecraftBadge>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold text-white">Genel İstatistikler</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Katılım Tarihi:</span>
                  <span className="text-white">{player.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Toplam Oynama Süresi:</span>
                  <span className="text-white">{player.totalPlaytime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Seviye:</span>
                  <span className="text-white font-bold text-minecraft-primary">{player.level}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold text-white">Savaş İstatistikleri</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Öldürme:</span>
                  <span className="text-white">{player.kills.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Ölüm:</span>
                  <span className="text-white">{player.deaths.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">K/D:</span>
                  <span className="text-white">{player.kd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Galibiyet:</span>
                  <span className="text-white">{player.wins.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="border-t border-white/10 pt-4">
          <h3 className="text-lg font-bold text-white mb-3">Başarımlar</h3>
          <div className="flex flex-wrap gap-2">
            {player.achievements && player.achievements.length > 0 ? (
              player.achievements.map((achievement, index) => (
                <MinecraftBadge key={index} variant="achievement">{achievement}</MinecraftBadge>
              ))
            ) : (
              <p className="text-white/50">Henüz başarım kazanılmamış.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const LeaderboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("smp");
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  
  // Search functionality
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    const foundPlayer = allPlayers.find(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (foundPlayer) {
      // Show player profile dialog
      setSelectedPlayer(foundPlayer.name);
      
      // Also switch to the appropriate tab
      setSelectedTab(foundPlayer.mode.toLowerCase());
    }
  };

  const handlePlayerClick = (playerName: string) => {
    setSelectedPlayer(playerName);
  };
  
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button className="ml-4 minecraft-btn" onClick={handleSearch}>
            <span className="btn-content">Ara</span>
          </Button>
        </div>
        
        {/* Player Dialog - Opens when a player is selected */}
        {selectedPlayer && (
          <PlayerDialog 
            playerName={selectedPlayer} 
            isOpen={!!selectedPlayer} 
            onClose={() => setSelectedPlayer(null)} 
          />
        )}
        
        {/* Top Players Showcase */}
        <div className="mb-10">
          <h2 className="section-title mb-8">Bu Ayın En İyi Oyuncuları</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 2nd Place */}
            <div 
              className="glass-card p-6 text-center order-2 md:order-1 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handlePlayerClick("Enderman_69")}
            >
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
              <MinecraftBadge variant="rank" className="mb-2">VIP</MinecraftBadge>
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
            <div 
              className="glass-card p-6 text-center border border-minecraft-primary/30 order-1 md:order-2 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handlePlayerClick("DragonSlayer")}
            >
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
              <MinecraftBadge variant="rank" size="lg" className="mb-2">MVP+</MinecraftBadge>
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
                <MinecraftBadge variant="achievement">Kral #1 - 3 ay üst üste!</MinecraftBadge>
              </div>
            </div>
            
            {/* 3rd Place */}
            <div 
              className="glass-card p-6 text-center order-3 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handlePlayerClick("MythicCrafter")}
            >
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
              <MinecraftBadge variant="rank" className="mb-2">VIP+</MinecraftBadge>
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
        
        <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="mb-10">
          <TabsList className="bg-minecraft-dark grid grid-cols-2 mb-6">
            <TabsTrigger value="smp" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">
              <Gamepad2 size={16} className="mr-2" /> SMP
            </TabsTrigger>
            <TabsTrigger value="cpvp" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">
              <BarChart3 size={16} className="mr-2" /> CPVP
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="smp">
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
                    {smpPlayers.map((player, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-minecraft-primary/10 transition-colors cursor-pointer`}
                        onClick={() => handlePlayerClick(player.name)}
                      >
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
          
          <TabsContent value="cpvp">
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
                    {cpvpPlayers.map((player, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-minecraft-primary/10 transition-colors cursor-pointer`}
                        onClick={() => handlePlayerClick(player.name)}
                      >
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
        
        {/* Join Server CTA - Updated button text as requested */}
        <div className="glass-card p-8 text-center">
          <h2 className="font-minecraft text-2xl text-white mb-4">Sıralamalarda Yerini Al!</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            En iyilerle rekabet et, yeteneklerini geliştir ve sunucumuzda adını duyur. Şimdi katıl ve sıralamalarda yükselmeye başla!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="minecraft-btn">
              <span className="btn-content">Kayıt Formu</span>
            </Button>
            <Button variant="outline" className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10">
              Sıralama Hakkında
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
