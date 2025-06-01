
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Wallet, ArrowUpRight, ArrowDownRight, ShoppingCart, Lock, Star, Coins, TrendingUp } from "lucide-react";

interface BalanceTransaction {
  id: string;
  amount: number;
  type: "purchase" | "usage";
  description: string;
  date: Date;
}

const BalancePage = () => {
  const { balance, addBalance } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<BalanceTransaction[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Load transaction history from localStorage
  useEffect(() => {
    const storedTransactions = localStorage.getItem("trinova_balance_transactions");
    if (storedTransactions) {
      try {
        const parsedTransactions = JSON.parse(storedTransactions);
        // Convert date strings back to Date objects
        const formattedTransactions = parsedTransactions.map((tx: any) => ({
          ...tx,
          date: new Date(tx.date)
        }));
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error("Error parsing balance transactions:", error);
      }
    }
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 pt-32 text-center">
        <div className="hypixel-card max-w-md mx-auto p-8 rounded-xl">
          <Lock size={64} className="mx-auto text-hypixel-orange mb-4 animate-hypixel-glow" />
          <h1 className="text-2xl font-bold mb-4 font-hypixel hypixel-title">Erişim Engellendi</h1>
          <p className="text-muted-foreground mb-6">
            Bakiye sayfasına erişmek için giriş yapmalısınız.
          </p>
          <Button onClick={() => navigate("/")} className="hypixel-btn">
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      {/* Hypixel-style header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 font-hypixel hypixel-title animate-hypixel-float">
          Farex Network
        </h1>
        <p className="text-xl text-hypixel-aqua mb-2">Bakiye Yönetimi</p>
        <div className="flex justify-center items-center gap-2 text-hypixel-gold">
          <Star size={16} className="animate-pulse" />
          <span className="text-sm">Premium Deneyim</span>
          <Star size={16} className="animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Hypixel-style Balance Card */}
        <div className="lg:col-span-1">
          <Card className="hypixel-card overflow-hidden border-hypixel-orange/30 animate-hypixel-glow">
            <div className="bg-gradient-to-br from-hypixel-orange/20 to-hypixel-gold/10 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-hypixel-orange font-hypixel font-semibold">Mevcut Bakiye</h2>
                <Wallet size={24} className="text-hypixel-orange animate-pulse" />
              </div>
              <div className="text-4xl font-bold text-white flex items-center font-hypixel mb-2">
                <Coins className="mr-3 text-hypixel-gold animate-spin" size={32} />
                <span className="hypixel-title">{balance || 0}</span>
                <Badge variant="outline" className="ml-2 text-xs border-hypixel-gold/50 text-hypixel-gold bg-hypixel-gold/10">
                  Farex Coin
                </Badge>
              </div>
              <div className="flex items-center text-hypixel-aqua text-sm">
                <TrendingUp size={14} className="mr-1" />
                <span>Premium Hesap Aktif</span>
              </div>
            </div>
            <CardContent className="pt-4 flex flex-col gap-3">
              <Button 
                onClick={() => navigate("/shop?tab=balance")} 
                className="hypixel-btn w-full text-black font-semibold"
              >
                <ShoppingCart size={16} className="mr-2" />
                Bakiye Yükle
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Hypixel-style Transaction History */}
        <div className="lg:col-span-2">
          <Card className="hypixel-card h-full border-hypixel-orange/20">
            <CardHeader className="border-b border-hypixel-orange/20">
              <CardTitle className="font-hypixel text-hypixel-orange flex items-center gap-2">
                <ArrowUpRight size={20} />
                İşlem Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="hypixel-card max-w-sm mx-auto p-6 rounded-lg">
                    <Coins size={48} className="mx-auto text-hypixel-orange mb-4 animate-hypixel-float" />
                    <p className="text-muted-foreground mb-4">Henüz hiç bakiye işlemi bulunmuyor</p>
                    <Button 
                      onClick={() => navigate("/shop?tab=balance")}
                      className="hypixel-btn text-black"
                    >
                      İlk Bakiye Yüklemenizi Yapın
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="hypixel-card p-4 rounded-lg border-hypixel-orange/10 hover:border-hypixel-orange/30 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            tx.type === "purchase" 
                              ? "bg-hypixel-green/20 text-hypixel-green border border-hypixel-green/30" 
                              : "bg-hypixel-red/20 text-hypixel-red border border-hypixel-red/30"
                          }`}>
                            {tx.type === "purchase" ? (
                              <ArrowUpRight size={20} />
                            ) : (
                              <ArrowDownRight size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium font-hypixel text-white">{tx.description}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                          </div>
                        </div>
                        <div className={`font-bold font-hypixel text-lg ${
                          tx.type === "purchase" ? "text-hypixel-green" : "text-hypixel-red"
                        }`}>
                          {tx.type === "purchase" ? "+" : "-"}{tx.amount}
                          <span className="text-hypixel-gold ml-1">FC</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hypixel-style stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hypixel-card border-hypixel-blue/30 p-6 text-center">
          <div className="text-hypixel-blue text-2xl font-bold mb-2">{transactions.filter(t => t.type === "purchase").length}</div>
          <div className="text-sm text-muted-foreground">Toplam Yükleme</div>
        </Card>
        <Card className="hypixel-card border-hypixel-purple/30 p-6 text-center">
          <div className="text-hypixel-purple text-2xl font-bold mb-2">{transactions.filter(t => t.type === "usage").length}</div>
          <div className="text-sm text-muted-foreground">Toplam Harcama</div>
        </Card>
        <Card className="hypixel-card border-hypixel-aqua/30 p-6 text-center">
          <div className="text-hypixel-aqua text-2xl font-bold mb-2">
            {transactions.reduce((sum, t) => sum + (t.type === "purchase" ? t.amount : 0), 0)}
          </div>
          <div className="text-sm text-muted-foreground">Toplam Yüklenen</div>
        </Card>
      </div>
    </div>
  );
};

export default BalancePage;
