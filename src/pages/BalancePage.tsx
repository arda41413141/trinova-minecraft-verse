
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Wallet, ArrowUpRight, ArrowDownRight, ShoppingCart } from "lucide-react";

interface BalanceTransaction {
  id: string;
  amount: number;
  type: "purchase" | "usage";
  description: string;
  date: Date;
}

const BalancePage = () => {
  const { balance, addBalance } = useCart();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<BalanceTransaction[]>([]);

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

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Bakiyem</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Balance Card */}
        <div className="lg:col-span-1">
          <Card className="glass-card border-green-500/30 overflow-hidden">
            <div className="bg-gradient-to-b from-green-600/20 to-green-500/10 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-green-400">Bakiyeniz</h2>
                <Wallet size={24} className="text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white flex items-center">
                <span className="mr-2">{balance || 0}</span>
                <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">TL</Badge>
              </div>
            </div>
            <CardContent className="pt-4 flex flex-col gap-3">
              <Button 
                onClick={() => navigate("/shop?tab=balance")} 
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                <ShoppingCart size={16} className="mr-2" />
                Bakiye Yükle
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
                  <p className="text-muted-foreground mb-2">Henüz hiç bakiye işlemi bulunmuyor</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/shop?tab=balance")}
                    className="mt-2"
                  >
                    Bakiye Yükle
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
                        {tx.type === "purchase" ? "+" : "-"}{tx.amount} TL
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

export default BalancePage;
