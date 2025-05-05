
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { User, ShoppingBag, LogOut, Crown, MessageSquare } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { TicketList } from '@/components/tickets/TicketList';
import { CreateTicketForm } from '@/components/tickets/CreateTicketForm';

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number; }[];
  total: number;
  status: 'completed' | 'processing' | 'cancelled';
}

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { purchasedItems, vipStatus } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('account');
  const isMobile = useIsMobile();

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Profilim</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-2xl mx-auto bg-minecraft-dark mb-6">
          <TabsTrigger value="account" className="flex gap-2 w-full">
            <User size={16} />
            Hesap
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex gap-2 w-full">
            <ShoppingBag size={16} />
            Siparişler
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex gap-2 w-full">
            <MessageSquare size={16} />
            Destek
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="font-minecraft text-minecraft-primary flex items-center gap-2">
                    <User size={20} />
                    Hesap Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-minecraft-primary/20 border-2 border-minecraft-primary flex items-center justify-center">
                      <User size={36} className="text-minecraft-primary" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-muted-foreground">Kullanıcı Adı</h3>
                    <p className="text-lg break-words">{user.username}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-muted-foreground">E-posta</h3>
                    <p className="text-lg break-words">{user.email}</p>
                  </div>

                  {vipStatus && (
                    <div className="mt-4 bg-yellow-500/20 p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <Crown size={20} className="text-yellow-400" />
                        <h3 className="font-medium text-yellow-400">VIP Durumu</h3>
                      </div>
                      <p className="text-lg mt-1 text-white">{vipStatus}</p>
                    </div>
                  )}
                  
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
              <Card className="glass-card h-full">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="font-minecraft text-minecraft-primary flex items-center gap-2">
                    <Crown size={20} />
                    Satın Aldığım Ürünler
                  </CardTitle>
                  <CardDescription>
                    Satın aldığınız ürünlerin listesi
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {purchasedItems.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">Henüz satın aldığınız ürün bulunmuyor</p>
                      <Link to="/shop" className="text-minecraft-primary hover:underline mt-2 inline-block">
                        Mağazaya Git
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/10">
                      {purchasedItems.map((item, index) => (
                        <div key={index} className="py-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Satın Alma: {formatDate(item.purchaseDate)}
                            </p>
                            {item.expiryDate && (
                              <p className="text-sm text-yellow-400">
                                Son Kullanma: {formatDate(item.expiryDate)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
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
            <CardContent className={isMobile ? "p-3" : ""}>
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
                      <div className={`flex ${isMobile ? "flex-col" : "justify-between"} mb-2`}>
                        <div className="mb-2">
                          <span className="font-medium">Sipariş #{order.id}</span>
                          <span className="text-sm text-muted-foreground ml-2">{order.date}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                          order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-red-500/20 text-red-400'
                        } ${isMobile ? "self-start inline-block" : ""}`}>
                          {order.status === 'completed' ? 'Tamamlandı' : 
                          order.status === 'processing' ? 'İşleniyor' : 
                          'İptal Edildi'}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3 overflow-x-auto">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <div className="break-words">
                              {item.name} x{item.quantity}
                            </div>
                            <div className="whitespace-nowrap ml-2">{item.price.toFixed(2)} ₺</div>
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
        </TabsContent>

        <TabsContent value="tickets">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CreateTicketForm />
            </div>
            <div className="lg:col-span-2">
              <TicketList />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
