
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Coins, Clock, Plus, BarChart } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useAuth } from "@/context/auth";

const BalancePage = () => {
  const { balance, transactions } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mx-auto py-32 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2"
        onClick={() => navigate("/profile")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Geri Dön
      </Button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bakiye İşlemleri</h1>
        <Button onClick={() => navigate("/shop?tab=balance")}>
          <Plus className="mr-2 h-4 w-4" />
          Bakiye Yükle
        </Button>
      </div>

      {/* Current Balance */}
      <div className="bg-minecraft-darker rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg text-muted-foreground">Mevcut Bakiye</h2>
            <div className="flex items-center gap-2 mt-1">
              <Coins className="h-6 w-6 text-yellow-400" />
              <span className="text-3xl font-bold">{balance} TL</span>
            </div>
          </div>
          <Button onClick={() => navigate("/shop?tab=balance")}>
            Yükle
          </Button>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">İşlem Geçmişi</h2>
        </div>
        
        {transactions.length === 0 ? (
          <div className="bg-minecraft-darker rounded-lg p-8 text-center">
            <p className="text-muted-foreground">Henüz bir işlem geçmişiniz bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="bg-minecraft-darker rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4">İşlem</th>
                    <th className="text-left p-4">Miktar</th>
                    <th className="text-left p-4">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {transaction.type === "purchase" ? (
                            <Plus className="h-4 w-4 text-green-400" />
                          ) : (
                            <Coins className="h-4 w-4 text-yellow-400" />
                          )}
                          <span>{transaction.description}</span>
                        </div>
                      </td>
                      <td className={`p-4 ${transaction.type === "purchase" ? "text-green-400" : "text-red-400"}`}>
                        {transaction.type === "purchase" ? "+" : "-"}
                        {transaction.amount} TL
                      </td>
                      <td className="p-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{format(transaction.date, "dd MMMM yyyy HH:mm", { locale: tr })}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalancePage;
