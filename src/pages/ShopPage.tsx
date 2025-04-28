
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Star, ChevronRight, Gift, CreditCard } from "lucide-react";

const ShopPage = () => {
  const { toast } = useToast();

  const addToCart = (productName: string) => {
    toast({
      title: "Sepete Eklendi!",
      description: `${productName} sepete eklendi.`,
    });
  };

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-minecraft text-4xl text-minecraft-primary mb-4">Mağaza</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Oyun deneyimini geliştirmek, karakterini özelleştirmek ve sunucumuza destek olmak için mağazamızdan alışveriş yap!
          </p>
        </div>

        {/* Featured Products */}
        <h2 className="section-title">Öne Çıkan Ürünler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeaturedProduct 
            title="VIP Üyelik"
            price="49.99 ₺"
            originalPrice="69.99 ₺"
            image="/images/vip.jpg"
            discount="-30%"
            onAddToCart={() => addToCart("VIP Üyelik")}
            features={[
              "Özel /fly komutu",
              "Sınırsız ev noktası",
              "Renkli sohbet erişimi",
              "VIP isim etiketi"
            ]}
          />
          <FeaturedProduct 
            title="MVP Üyelik"
            price="99.99 ₺"
            originalPrice="149.99 ₺"
            image="/images/mvp.jpg"
            discount="-33%"
            onAddToCart={() => addToCart("MVP Üyelik")}
            features={[
              "Tüm VIP özellikleri",
              "Özel partikül efektleri",
              "Birden fazla /nick hakkı",
              "MVP isim etiketi",
              "/ptime komutu"
            ]}
          />
          <FeaturedProduct 
            title="Ejderha Seti"
            price="149.99 ₺"
            originalPrice="199.99 ₺"
            image="/images/dragonset.jpg"
            discount="-25%"
            onAddToCart={() => addToCart("Ejderha Seti")}
            features={[
              "Efsanevi zırh seti",
              "Güçlendirilmiş silahlar",
              "Özel ejderha evcil hayvanı",
              "Ejderha görünümlü kanat kozmetiği"
            ]}
          />
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="ranks" className="mb-10">
          <TabsList className="bg-minecraft-dark grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="ranks" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">Rütbeler</TabsTrigger>
            <TabsTrigger value="cosmetics" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">Kozmetikler</TabsTrigger>
            <TabsTrigger value="crates" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">Sandıklar</TabsTrigger>
            <TabsTrigger value="boosters" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">Güçlendiriciler</TabsTrigger>
            <TabsTrigger value="bundles" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white">Paketler</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ranks">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard 
                title="VIP Rank"
                price="49.99 ₺"
                image="/images/vip.jpg"
                onAddToCart={() => addToCart("VIP Rank")}
                features={[
                  "Özel /fly komutu",
                  "Sınırsız ev noktası",
                  "Renkli sohbet erişimi",
                  "VIP isim etiketi",
                  "30 gün süre"
                ]}
              />
              <ProductCard 
                title="VIP+ Rank"
                price="79.99 ₺"
                image="/images/vip-plus.jpg"
                onAddToCart={() => addToCart("VIP+ Rank")}
                features={[
                  "Tüm VIP özellikleri",
                  "Özel kozmetik menüsü",
                  "3 farklı pet seçeneği",
                  "Genişletilmiş /pv erişimi",
                  "45 gün süre"
                ]}
              />
              <ProductCard 
                title="MVP Rank"
                price="99.99 ₺"
                image="/images/mvp.jpg"
                onAddToCart={() => addToCart("MVP Rank")}
                features={[
                  "Tüm VIP+ özellikleri",
                  "Özel partikül efektleri",
                  "Birden fazla /nick hakkı",
                  "/ptime komutu",
                  "60 gün süre"
                ]}
              />
              <ProductCard 
                title="MVP+ Rank"
                price="149.99 ₺"
                image="/images/mvp-plus.jpg"
                onAddToCart={() => addToCart("MVP+ Rank")}
                features={[
                  "Tüm MVP özellikleri",
                  "Özel kanat kozmetikleri",
                  "Gelişmiş klan özellikleri",
                  "Daha fazla arkadaş ekleme hakkı",
                  "90 gün süre"
                ]}
              />
              <ProductCard 
                title="LEGEND Rank"
                price="249.99 ₺"
                image="/images/legend.jpg"
                onAddToCart={() => addToCart("LEGEND Rank")}
                features={[
                  "Tüm MVP+ özellikleri",
                  "Efsanevi kozmetikler",
                  "VIP sunucu erişimi",
                  "Özel efektler ve yetenekler",
                  "120 gün süre"
                ]}
              />
              <ProductCard 
                title="IMMORTAL Rank"
                price="349.99 ₺"
                image="/images/immortal.jpg"
                onAddToCart={() => addToCart("IMMORTAL Rank")}
                features={[
                  "Tüm LEGEND özellikleri",
                  "Sunucu yeniden başlatma mesajları",
                  "Sınırsız kozmetik erişimi",
                  "Özel komutlar ve yetkiler",
                  "Süresiz erişim"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="cosmetics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard 
                title="Kanat Paketi"
                price="39.99 ₺"
                image="/images/wings.jpg"
                onAddToCart={() => addToCart("Kanat Paketi")}
                features={[
                  "10 farklı kanat stili",
                  "Özelleştirilebilir renkler",
                  "Animasyonlu efektler",
                  "Sunucu genelinde geçerli"
                ]}
              />
              <ProductCard 
                title="Partikül Efektleri"
                price="29.99 ₺"
                image="/images/particles.jpg"
                onAddToCart={() => addToCart("Partikül Efektleri")}
                features={[
                  "15 farklı partikül efekti",
                  "Hareket ve durağan efektler",
                  "Renkli kombinasyonlar",
                  "Görünmezlik ayarları"
                ]}
              />
              <ProductCard 
                title="Özel Evcil Hayvanlar"
                price="59.99 ₺"
                image="/images/pets.jpg"
                onAddToCart={() => addToCart("Özel Evcil Hayvanlar")}
                features={[
                  "8 nadir evcil hayvan",
                  "Geliştirebilir yetenekler",
                  "Özelleştirilebilir isimler",
                  "Depolama ve çağırma sistemi"
                ]}
              />
              <ProductCard 
                title="Kafa Koleksiyonu"
                price="19.99 ₺"
                image="/images/heads.jpg"
                onAddToCart={() => addToCart("Kafa Koleksiyonu")}
                features={[
                  "100+ dekoratif kafa",
                  "Nadir ve efsanevi seçenekler",
                  "Yapı projeleri için mükemmel",
                  "Sınırsız kullanım hakkı"
                ]}
              />
              <ProductCard 
                title="Kılıç Görünümleri"
                price="24.99 ₺"
                image="/images/swords.jpg"
                onAddToCart={() => addToCart("Kılıç Görünümleri")}
                features={[
                  "12 eşsiz kılıç görünümü",
                  "Öldürme efektleri",
                  "Parlama ve animasyon",
                  "Tüm oyun modlarında kullanılabilir"
                ]}
              />
              <ProductCard 
                title="Sohbet Efektleri"
                price="14.99 ₺"
                image="/images/chat.jpg"
                onAddToCart={() => addToCart("Sohbet Efektleri")}
                features={[
                  "Renkli sohbet mesajları",
                  "Özel semboller ve emojiler",
                  "Özelleştirilebilir yazı stilleri",
                  "Dikkat çekici giriş mesajları"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="crates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard 
                title="Hazine Sandığı"
                price="19.99 ₺"
                image="/images/treasure-crate.jpg"
                onAddToCart={() => addToCart("Hazine Sandığı")}
                features={[
                  "Nadir kozmetikler",
                  "Değerli oyun içi eşyalar",
                  "Para ödülleri",
                  "5 sandık anahtarı içerir"
                ]}
              />
              <ProductCard 
                title="Savaşçı Sandığı"
                price="29.99 ₺"
                image="/images/warrior-crate.jpg"
                onAddToCart={() => addToCart("Savaşçı Sandığı")}
                features={[
                  "Güçlendirilmiş silahlar",
                  "Nadir zırh parçaları",
                  "Savaş kozmetikleri",
                  "3 sandık anahtarı içerir"
                ]}
              />
              <ProductCard 
                title="Efsanevi Sandık"
                price="49.99 ₺"
                image="/images/legendary-crate.jpg"
                onAddToCart={() => addToCart("Efsanevi Sandık")}
                features={[
                  "Efsanevi kozmetikler",
                  "Özel komut erişimleri",
                  "Nadir evcil hayvanlar",
                  "2 sandık anahtarı içerir"
                ]}
              />
              <ProductCard 
                title="Gizemli Sandık"
                price="39.99 ₺"
                image="/images/mystery-crate.jpg"
                onAddToCart={() => addToCart("Gizemli Sandık")}
                features={[
                  "Sürpriz ödüller",
                  "Şans bazlı içerik",
                  "Eşsiz kozmetikler",
                  "3 sandık anahtarı içerir"
                ]}
              />
              <ProductCard 
                title="Mevsimlik Sandık"
                price="34.99 ₺"
                image="/images/seasonal-crate.jpg"
                onAddToCart={() => addToCart("Mevsimlik Sandık")}
                features={[
                  "Sınırlı zamanlı içerik",
                  "Mevsime özel kozmetikler",
                  "Özel etkinlik eşyaları",
                  "4 sandık anahtarı içerir"
                ]}
              />
              <ProductCard 
                title="Anahtar Paketi"
                price="14.99 ₺"
                image="/images/keys.jpg"
                onAddToCart={() => addToCart("Anahtar Paketi")}
                features={[
                  "10 sandık anahtarı",
                  "Tüm sandık türleriyle uyumlu",
                  "Bonus şans artışı",
                  "30 gün geçerlilik"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="boosters">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard 
                title="Deneyim Hızlandırıcı"
                price="19.99 ₺"
                image="/images/xp-booster.jpg"
                onAddToCart={() => addToCart("Deneyim Hızlandırıcı")}
                features={[
                  "2x deneyim kazancı",
                  "Tüm oyunculara etki eder",
                  "2 saat süreyle aktif",
                  "Tüm oyun modlarında geçerli"
                ]}
              />
              <ProductCard 
                title="Para Hızlandırıcı"
                price="24.99 ₺"
                image="/images/money-booster.jpg"
                onAddToCart={() => addToCart("Para Hızlandırıcı")}
                features={[
                  "2x para kazancı",
                  "Tüm oyunculara etki eder",
                  "2 saat süreyle aktif",
                  "Ekonomi sistemli modlarda geçerli"
                ]}
              />
              <ProductCard 
                title="Ganimet Hızlandırıcı"
                price="29.99 ₺"
                image="/images/loot-booster.jpg"
                onAddToCart={() => addToCart("Ganimet Hızlandırıcı")}
                features={[
                  "Daha iyi eşya düşme şansı",
                  "Nadir eşya oranı artışı",
                  "2 saat süreyle aktif",
                  "PvE modlarda geçerli"
                ]}
              />
              <ProductCard 
                title="Uçuş Hızlandırıcı"
                price="14.99 ₺"
                image="/images/fly-booster.jpg"
                onAddToCart={() => addToCart("Uçuş Hızlandırıcı")}
                features={[
                  "Geçici uçuş yeteneği",
                  "Kişisel kullanım",
                  "4 saat süreyle aktif",
                  "Survival modunda geçerli"
                ]}
              />
              <ProductCard 
                title="Ekip Hızlandırıcı Paketi"
                price="59.99 ₺"
                image="/images/team-booster.jpg"
                onAddToCart={() => addToCart("Ekip Hızlandırıcı Paketi")}
                features={[
                  "3x Deneyim Hızlandırıcı",
                  "3x Para Hızlandırıcı",
                  "3x Ganimet Hızlandırıcı",
                  "Klan üyeleriyle paylaşılabilir"
                ]}
              />
              <ProductCard 
                title="VIP Hızlandırıcı"
                price="39.99 ₺"
                image="/images/vip-booster.jpg"
                onAddToCart={() => addToCart("VIP Hızlandırıcı")}
                features={[
                  "Tüm hızlandırıcılar bir arada",
                  "3x bonus etki",
                  "3 saat süreyle aktif",
                  "Tüm oyun modlarında geçerli"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="bundles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductCard 
                title="Başlangıç Paketi"
                price="79.99 ₺"
                image="/images/starter-bundle.jpg"
                onAddToCart={() => addToCart("Başlangıç Paketi")}
                features={[
                  "30 günlük VIP Rank",
                  "5000 sunucu parası",
                  "Başlangıç eşya seti",
                  "5 sandık anahtarı",
                  "1x Deneyim Hızlandırıcı"
                ]}
                isLarge={true}
              />
              <ProductCard 
                title="Macera Paketi"
                price="129.99 ₺"
                image="/images/adventure-bundle.jpg"
                onAddToCart={() => addToCart("Macera Paketi")}
                features={[
                  "30 günlük MVP Rank",
                  "10000 sunucu parası",
                  "3 nadir evcil hayvan",
                  "Özel kılıç ve zırh seti",
                  "10 sandık anahtarı",
                  "2x tüm hızlandırıcılardan"
                ]}
                isLarge={true}
              />
              <ProductCard 
                title="Koleksiyoner Paketi"
                price="159.99 ₺"
                image="/images/collector-bundle.jpg"
                onAddToCart={() => addToCart("Koleksiyoner Paketi")}
                features={[
                  "Tüm kozmetik koleksiyonları",
                  "Özel kafa seti",
                  "Nadir evcil hayvanlar",
                  "Tüm kanat stilleri",
                  "Özel partikül efektleri",
                  "Sınırlı sayıda mevcut!"
                ]}
                isLarge={true}
              />
              <ProductCard 
                title="Ultimate Paket"
                price="299.99 ₺"
                image="/images/ultimate-bundle.jpg"
                onAddToCart={() => addToCart("Ultimate Paket")}
                features={[
                  "60 günlük LEGEND Rank",
                  "30000 sunucu parası",
                  "Tüm kozmetik koleksiyonları",
                  "Efsanevi silah ve zırh seti",
                  "20 sandık anahtarı",
                  "5x tüm hızlandırıcılardan",
                  "VIP Discord rolü"
                ]}
                isLarge={true}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Payment Info */}
        <div className="glass-card p-6 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-minecraft-primary w-6 h-6" />
            <h2 className="font-minecraft text-2xl text-white">Ödeme Bilgileri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-minecraft-primary text-lg mb-3">Ödeme Yöntemleri</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-minecraft-primary" />
                  <span>Kredi/Banka Kartı (Visa, Mastercard, Troy)</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-minecraft-primary" />
                  <span>Havale/EFT</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-minecraft-primary" />
                  <span>Mobil Ödeme</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-minecraft-primary" />
                  <span>PayPal</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-minecraft-primary" />
                  <span>Papara</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-minecraft-primary text-lg mb-3">Nasıl Kullanırım?</h3>
              <ol className="space-y-3 text-white/70 list-decimal list-inside">
                <li>Ürünü sepete ekle ve ödeme adımına geç</li>
                <li>Minecraft kullanıcı adını doğru bir şekilde gir</li>
                <li>Ödeme yöntemini seç ve ödemeyi tamamla</li>
                <li>Ürün anında hesabına tanımlanacaktır</li>
                <li>Oyuna girerek yeni satın aldığın özelliklerin keyfini çıkar!</li>
              </ol>
              
              <div className="mt-6 p-3 bg-minecraft-primary/20 rounded-lg border border-minecraft-primary/30">
                <p className="text-white/90 text-sm flex items-center gap-2">
                  <Gift size={16} className="text-minecraft-primary" />
                  Arkadaşına hediye göndermek için ödeme sırasında "Hediye Gönder" seçeneğini işaretle!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProduct = ({ 
  title, 
  price, 
  originalPrice,
  image, 
  discount, 
  features,
  onAddToCart 
}: {
  title: string;
  price: string;
  originalPrice: string;
  image: string;
  discount: string;
  features: string[];
  onAddToCart: () => void;
}) => {
  return (
    <div className="relative glass-card overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-3 right-3 bg-minecraft-primary text-white text-xs font-bold py-1 px-2 rounded-md">
          {discount}
        </div>
      )}
      
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={image || "https://via.placeholder.com/400x200?text=" + title}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="font-minecraft text-xl text-minecraft-primary mb-2">{title}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-white font-bold text-lg">{price}</span>
          {originalPrice && (
            <span className="text-white/50 text-sm line-through">{originalPrice}</span>
          )}
        </div>
        
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-white/70 text-sm flex items-center gap-2">
              <Star size={14} className="text-minecraft-primary flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onAddToCart}
          className="w-full minecraft-btn"
        >
          <span className="btn-content flex items-center justify-center gap-2">
            <ShoppingCart size={16} /> Sepete Ekle
          </span>
        </Button>
      </div>
    </div>
  );
};

const ProductCard = ({ 
  title, 
  price, 
  image, 
  features,
  isLarge = false,
  onAddToCart 
}: {
  title: string;
  price: string;
  image: string;
  features: string[];
  isLarge?: boolean;
  onAddToCart: () => void;
}) => {
  return (
    <div className={`glass-card overflow-hidden group transition-all duration-300 hover:translate-y-[-5px] ${isLarge ? 'col-span-1' : ''}`}>
      {/* Image */}
      <div className="h-40 overflow-hidden">
        <img 
          src={image || "https://via.placeholder.com/400x200?text=" + title}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-minecraft text-lg text-minecraft-primary mb-2">{title}</h3>
        <span className="text-white font-bold mb-3 block">{price}</span>
        
        <ul className="mb-4 space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-white/70 text-sm flex items-start gap-2">
              <Star size={12} className="text-minecraft-primary flex-shrink-0 mt-1" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onAddToCart}
          className="w-full minecraft-btn"
          size="sm"
        >
          <span className="btn-content flex items-center justify-center gap-2">
            <ShoppingCart size={14} /> Sepete Ekle
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ShopPage;
