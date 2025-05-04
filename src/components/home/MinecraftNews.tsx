
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Yeni Güncellemeler Geldi!",
    content: "Bu haftaki güncellemelerle yeni silahlar ve öğeler eklendi.",
    date: "14.05.2025",
    category: "güncelleme"
  },
  {
    id: 2,
    title: "Haftalık Etkinlik: PvP Turnuvası",
    content: "Bu hafta sonu büyük PvP turnuvamıza katılın ve ödüller kazanın!",
    date: "17.05.2025",
    category: "etkinlik"
  },
  {
    id: 3,
    title: "VIP İndirimleri Başladı",
    content: "Sınırlı süre için tüm VIP paketlerinde %20 indirim fırsatını kaçırmayın.",
    date: "12.05.2025",
    category: "indirim"
  }
];

const MinecraftNews = () => {
  return (
    <div className="py-12 container mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-minecraft text-2xl text-minecraft-primary">
          Sunucu Haberleri
        </h2>
        <div className="flex items-center gap-2">
          <Bell className="text-minecraft-primary" size={18} />
          <span className="text-sm text-white/70">Son güncellemeler</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <Card key={news.id} className="glass-card-hover overflow-hidden border-minecraft-primary/20 transition-all">
            <CardHeader className="border-b border-white/5 pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="font-minecraft text-lg text-minecraft-primary">
                  {news.title}
                </CardTitle>
                <Badge variant="outline" className="bg-white/5">
                  {news.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-white/80 mb-4">{news.content}</p>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar size={14} />
                <span>{news.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MinecraftNews;
