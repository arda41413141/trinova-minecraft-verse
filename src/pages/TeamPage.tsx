
import { Shield, Star, MessageCircle, Tool, Code, Heart, HelpCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dummy team data
const adminTeam = [
  {
    name: "DragonLord",
    role: "Kurucu & Sunucu Sahibi",
    avatar: "https://mc-heads.net/avatar/DragonLord",
    joinDate: "Ocak 2020",
    discord: "DragonLord#0001",
    about: "Trinova Studios'un kurucusu ve vizyoneri. Sunucunun genel yönetimi ve geleceğiyle ilgilenir."
  },
  {
    name: "NightWatcher",
    role: "Teknik Direktör",
    avatar: "https://mc-heads.net/avatar/NightWatcher",
    joinDate: "Şubat 2020",
    discord: "NightWatcher#1234",
    about: "Sunucu altyapısı, performans optimizasyonları ve teknik sorunlardan sorumlu."
  }
];

const modTeam = [
  {
    name: "PurpleWizard",
    role: "Moderasyon Yöneticisi",
    avatar: "https://mc-heads.net/avatar/PurpleWizard",
    joinDate: "Mart 2020",
    discord: "PurpleWizard#4321",
    about: "Moderatör ekibini koordine eder ve sunucudaki moderasyon politikalarını belirler."
  },
  {
    name: "ShadowHunter",
    role: "Baş Moderatör",
    avatar: "https://mc-heads.net/avatar/ShadowHunter",
    joinDate: "Nisan 2020",
    discord: "ShadowHunter#5678",
    about: "Kuralların uygulanması ve moderasyon ekibinin eğitiminden sorumludur."
  },
  {
    name: "SkyGuardian",
    role: "Moderatör",
    avatar: "https://mc-heads.net/avatar/SkyGuardian",
    joinDate: "Haziran 2020",
    discord: "SkyGuardian#8765",
    about: "Oyun içi düzeni sağlar, şikayetleri değerlendirir ve hile kullanımını önler."
  },
  {
    name: "EnderQueen",
    role: "Moderatör",
    avatar: "https://mc-heads.net/avatar/EnderQueen",
    joinDate: "Temmuz 2020",
    discord: "EnderQueen#2345",
    about: "Oyun içi etkinliklerin düzenlenmesi ve topluluk etkileşiminden sorumludur."
  }
];

const devTeam = [
  {
    name: "RedstoneGenius",
    role: "Baş Geliştirici",
    avatar: "https://mc-heads.net/avatar/RedstoneGenius",
    joinDate: "Mart 2020",
    discord: "RedstoneGenius#1122",
    about: "Özel eklentilerin geliştirilmesi ve sunucunun teknik altyapısından sorumlu."
  },
  {
    name: "CommandBlock",
    role: "Geliştirici",
    avatar: "https://mc-heads.net/avatar/CommandBlock",
    joinDate: "Mayıs 2020",
    discord: "CommandBlock#3344",
    about: "Komut bloklarıyla özel oyun mekanikleri ve etkileşimli dünyalar tasarlar."
  },
  {
    name: "PixelArchitect",
    role: "Yapı & Tasarım Lideri",
    avatar: "https://mc-heads.net/avatar/PixelArchitect",
    joinDate: "Nisan 2020",
    discord: "PixelArchitect#5566",
    about: "Haritaların, lobi alanlarının ve özel yapıların tasarımını yönetir."
  }
];

const helperTeam = [
  {
    name: "FriendlyGhost",
    role: "Yardımcı",
    avatar: "https://mc-heads.net/avatar/FriendlyGhost",
    joinDate: "Eylül 2020",
    discord: "FriendlyGhost#7788",
    about: "Yeni oyunculara yardım etmek ve rehberlik etmekle görevlidir."
  },
  {
    name: "MoonWalker",
    role: "Yardımcı",
    avatar: "https://mc-heads.net/avatar/MoonWalker",
    joinDate: "Ekim 2020",
    discord: "MoonWalker#9900",
    about: "Oyun içi sorular ve sorunlar için destek sağlar, etkinliklerde yardımcı olur."
  },
  {
    name: "StarDancer",
    role: "Yardımcı",
    avatar: "https://mc-heads.net/avatar/StarDancer",
    joinDate: "Kasım 2020",
    discord: "StarDancer#1010",
    about: "Discord topluluğu yönetimi ve sosyal medya etkileşimlerinde uzmanlaşmıştır."
  },
  {
    name: "CrystalArcher",
    role: "Yardımcı",
    avatar: "https://mc-heads.net/avatar/CrystalArcher",
    joinDate: "Aralık 2020",
    discord: "CrystalArcher#2020",
    about: "Oyun içi etkinliklerin organizasyonu ve oyuncu desteğinden sorumludur."
  }
];

const TeamPage = () => {
  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-minecraft text-4xl text-minecraft-primary mb-4">Ekibimiz</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            TrinovaStudios'un arkasındaki ekiple tanışın. Sunucumuzu harika kılmak için gece gündüz çalışan, 
            topluluk deneyiminizi en üst düzeye çıkarmaya adanmış özel ekibimiz.
          </p>
        </div>
        
        {/* Top Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {adminTeam.map((member, index) => (
            <AdminCard key={index} member={member} />
          ))}
        </div>
        
        {/* Team Tabs */}
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
        
        {/* Join the Team */}
        <div className="glass-card p-8 mb-10">
          <h2 className="font-minecraft text-2xl text-white mb-4 text-center">Ekibimize Katıl!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-white/80 mb-4">
                TrinovaStudios'da topluluk odaklı ve tutkuluyuz. Sunucumuzu daha da geliştirmek için her zaman 
                yetenekli, adanmış ve topluluk odaklı yeni ekip üyeleri arıyoruz.
              </p>
              
              <h3 className="text-minecraft-primary text-lg font-medium mb-3">Açık Pozisyonlar:</h3>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-white/80">
                  <Star size={14} className="text-minecraft-primary" /> Moderatör
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Star size={14} className="text-minecraft-primary" /> Plugin Geliştirici
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Star size={14} className="text-minecraft-primary" /> Yapı Ekibi Üyesi
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Star size={14} className="text-minecraft-primary" /> İçerik Oluşturucu
                </li>
              </ul>
              
              <Button className="minecraft-btn">
                <span className="btn-content">Başvuru Yap</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-minecraft-primary text-lg font-medium mb-1">Aranan Nitelikler:</h3>
              
              <RequirementCard 
                icon={<Clock size={16} className="text-minecraft-primary" />}
                title="Aktif Olabilmek"
                description="Ekip üyelerinin düzenli olarak aktif olması ve sorumluluklarını yerine getirmesi beklenir."
              />
              
              <RequirementCard 
                icon={<MessageCircle size={16} className="text-minecraft-primary" />}
                title="İletişim Becerileri"
                description="Oyuncular ve diğer ekip üyeleriyle etkili iletişim kurabilmek önemlidir."
              />
              
              <RequirementCard 
                icon={<Tool size={16} className="text-minecraft-primary" />}
                title="Problem Çözme"
                description="Zorluklarla başa çıkabilme ve hızlı, etkili çözümler üretebilme yeteneği."
              />
              
              <RequirementCard 
                icon={<Heart size={16} className="text-minecraft-primary" />}
                title="Oyuna Tutku"
                description="Minecraft tutkusu ve topluluk odaklı düşünce yapısı gereklidir."
              />
            </div>
          </div>
        </div>
        
        {/* Staff Applications */}
        <div className="glass-card p-8 mb-10">
          <h2 className="font-minecraft text-2xl text-white mb-6 text-center">Başvuru Süreci</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProcessCard 
              number="01"
              title="Başvuru Formu"
              description="Discord sunucumuzda #başvurular kanalındaki formu doldur ve gönder."
            />
            
            <ProcessCard 
              number="02"
              title="Mülakatlar"
              description="Ön değerlendirmeden geçen adaylarla Discord üzerinden mülakatlar gerçekleştirilir."
            />
            
            <ProcessCard 
              number="03"
              title="Deneme Süreci"
              description="Seçilen adaylar 2 haftalık bir staj döneminden sonra tam ekip üyesi olurlar."
            />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-white/60 mb-4 flex items-center justify-center gap-2">
              <AlertCircle size={16} /> Tüm başvurular detaylıca incelenir ve cevaplandırılır.
            </p>
            
            <Button className="minecraft-btn" 
                    onClick={() => window.open("https://discord.gg/trinovastudios", "_blank")}>
              <span className="btn-content">Discord'a Katıl & Başvur</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminCard = ({ member }: { member: any }) => {
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

const TeamCard = ({ member, icon }: { member: any; icon: React.ReactNode }) => {
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

const RequirementCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="flex gap-3 bg-white/5 p-3 rounded-lg">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="text-white text-sm font-medium mb-1">{title}</h4>
        <p className="text-white/60 text-xs">{description}</p>
      </div>
    </div>
  );
};

const ProcessCard = ({ number, title, description }: { number: string; title: string; description: string }) => {
  return (
    <div className="text-center p-5 bg-white/5 rounded-lg border border-white/10 hover:border-minecraft-primary/30 transition-all">
      <div className="w-12 h-12 rounded-full bg-minecraft-primary/20 text-minecraft-primary font-bold flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
};

export default TeamPage;
