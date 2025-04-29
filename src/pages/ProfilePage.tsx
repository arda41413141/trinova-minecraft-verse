
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, ShoppingBag, LogOut } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number; }[];
  total: number;
  status: 'completed' | 'processing' | 'cancelled';
}

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Bu sayfayı görüntülemek için giriş yapmalısınız');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Simulate fetching orders
    const demoOrders: Order[] = [
      {
        id: 'ORD-001',
        date: '2024-04-25',
        items: [
          { name: 'VIP Paketi', quantity: 1, price: 29.99 },
          { name: '100 Kredi', quantity: 2, price: 9.98 }
        ],
        total: 39.97,
        status: 'completed'
      },
      {
        id: 'ORD-002',
        date: '2024-04-20',
        items: [
          { name: 'Elmas Kılıç', quantity: 1, price: 9.99 }
        ],
        total: 9.99,
        status: 'completed'
      }
    ];
    
    setOrders(demoOrders);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return null; // Will be redirected by effect
  }

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Profilim</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-minecraft text-minecraft-primary">Hesap Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-minecraft-primary/20 border-2 border-minecraft-primary flex items-center justify-center">
                  <User size={48} className="text-minecraft-primary" />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-muted-foreground">Kullanıcı Adı</h3>
                <p className="text-lg">{user.username}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-muted-foreground">E-posta</h3>
                <p className="text-lg">{user.email}</p>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full flex justify-center items-center gap-2" onClick={handleLogout}>
                  <LogOut size={16} />
                  Çıkış Yap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="font-minecraft text-minecraft-primary flex items-center gap-2">
                <ShoppingBag size={20} />
                Son Siparişlerim
              </CardTitle>
              <CardDescription>
                Satın aldığınız ürünlerin listesi
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">Henüz herhangi bir siparişiniz bulunmuyor</p>
                  <Link to="/shop">
                    <Button className="minecraft-btn">
                      <span className="btn-content">Alışverişe Başla</span>
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {orders.map(order => (
                    <div key={order.id} className="py-4">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-medium">Sipariş #{order.id}</span>
                          <span className="text-sm text-muted-foreground ml-2">{order.date}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                          order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {order.status === 'completed' ? 'Tamamlandı' : 
                           order.status === 'processing' ? 'İşleniyor' : 
                           'İptal Edildi'}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <div>
                              {item.name} x{item.quantity}
                            </div>
                            <div>{item.price.toFixed(2)} ₺</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end font-medium">
                        Toplam: {order.total.toFixed(2)} ₺
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

export default ProfilePage;
