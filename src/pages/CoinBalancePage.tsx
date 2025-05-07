
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Coins, ArrowUpRight, ArrowDownRight, ShoppingCart } from "lucide-react";

interface CoinTransaction {
  id: string;
  amount: number;
  type: "purchase" | "usage";
  description: string;
  date: Date;
}

const CoinBalancePage = () => {
  const { coinBalance, addCoins } = useCart();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<CoinTransaction[]>([]);

  // Load transaction history from localStorage
  useEffect(() => {
    const storedTransactions = localStorage.getItem("trinova_coin_transactions");
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
        console.error("Error parsing coin transactions:", error);
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

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Coin Bakiyem</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Coin Balance Card */}
        <div className="lg:col-span-1">
          <Card className="glass-card border-yellow-500/30 overflow-hidden">
            <div className="bg-gradient-to-b from-yellow-600/20 to-amber-500/10 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-yellow-400">Coin Bakiyeniz</h2>
                <Coins size={24} className="text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white flex items-center">
                <span className="mr-2">{coinBalance || 0}</span>
                <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-400">Coin</Badge>
              </div>
            </div>
            <CardContent className="pt-4 flex flex-col gap-3">
              <Button 
                onClick={() => navigate("/shop?tab=coins")} 
                className="bg-yellow-600 hover:bg-yellow-700 text-white w-full"
              >
                <ShoppingCart size={16} className="mr-2" />
                Coin Satın Al
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <Card className="glass-card h-full">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="font-minecraft text-minecraft-primary">
                İşlem Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">Henüz hiç coin işlemi bulunmuyor</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/shop?tab=coins")}
                    className="mt-2"
                  >
                    Coin Satın Al
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between pb-3 border-b border-white/10 last:border-0">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          tx.type === "purchase" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {tx.type === "purchase" ? (
                            <ArrowUpRight size={18} />
                          ) : (
                            <ArrowDownRight size={18} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{tx.description}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                        </div>
                      </div>
                      <div className={`font-medium ${
                        tx.type === "purchase" ? "text-green-400" : "text-amber-400"
                      }`}>
                        {tx.type === "purchase" ? "+" : "-"}{tx.amount} Coin
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoinBalancePage;
