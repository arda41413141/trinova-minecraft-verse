
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MessageSquare, MapPin, Phone, Send, AlertCircle, CheckCircle } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      toast({
        title: "Mesajınız Gönderildi!",
        description: "En kısa sürede size geri dönüş yapacağız.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };
  
  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-minecraft text-4xl text-minecraft-primary mb-4">İletişim</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya geri bildirimleriniz mi var? Bizimle iletişime geçin, 
            size yardımcı olmaktan memnuniyet duyarız!
          </p>
        </div>
        
        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="glass-card p-6">
            <h2 className="font-minecraft text-xl text-white mb-6">İletişim Bilgileri</h2>
            
            <div className="space-y-6">
              <ContactInfoItem 
                icon={<MessageSquare className="text-minecraft-primary" size={18} />}
                title="Discord"
                detail="discord.gg/trinovastudios"
              />
              
              <ContactInfoItem 
                icon={<Mail className="text-minecraft-primary" size={18} />}
                title="E-posta"
                detail="iletisim@trinovastudios.com"
              />
              
              <ContactInfoItem 
                icon={<MapPin className="text-minecraft-primary" size={18} />}
                title="Sunucu IP"
                detail="play.trinovastudios.com"
              />
              
              <ContactInfoItem 
                icon={<Phone className="text-minecraft-primary" size={18} />}
                title="Destek Saatleri"
                detail="10:00 - 22:00 (Haftaiçi)"
              />
            </div>
            
            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-2 text-white mb-2">
                <AlertCircle size={16} className="text-minecraft-primary" />
                <span className="font-medium">Hızlı Destek</span>
              </div>
              <p className="text-white/70 text-sm">
                Acil destek için Discord sunucumuzda #destek kanalını kullanabilirsiniz.
                Moderatörlerimiz size hızlıca yardımcı olacaktır.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2 glass-card p-6">
            <h2 className="font-minecraft text-xl text-white mb-6">Bize Mesaj Gönderin</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2 text-sm">İsim</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="İsminizi girin"
                    required
                    className="w-full bg-minecraft-darker border border-white/10 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-minecraft-primary"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2 text-sm">E-posta</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-posta adresinizi girin"
                    required
                    className="w-full bg-minecraft-darker border border-white/10 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-minecraft-primary"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white mb-2 text-sm">Konu</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full bg-minecraft-darker border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-minecraft-primary"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="" disabled>Konu seçin</option>
                  <option value="general">Genel Soru</option>
                  <option value="support">Teknik Destek</option>
                  <option value="bug">Hata Bildirimi</option>
                  <option value="suggestion">Öneri</option>
                  <option value="complaint">Şikayet</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2 text-sm">Mesaj</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Mesajınızı girin"
                  required
                  className="w-full bg-minecraft-darker border border-white/10 rounded-md px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-minecraft-primary resize-none"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-white/60 text-xs">
                  * Tüm alanların doldurulması zorunludur
                </p>
                <Button 
                  type="submit" 
                  className="minecraft-btn"
                  disabled={formStatus === 'submitting'}
                >
                  <span className="btn-content flex items-center gap-2">
                    {formStatus === 'submitting' ? (
                      <>Gönderiliyor...</>
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle size={16} />
                        Gönderildi
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Gönder
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="glass-card p-8 mb-10">
          <h2 className="font-minecraft text-2xl text-white mb-6 text-center">Sıkça Sorulan Sorular</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FAQItem 
              question="Sunucuya nasıl katılabilirim?"
              answer="Minecraft Java Edition 1.8 - 1.20.4 sürümlerinden biriyle 'play.trinovastudios.com' IP adresini kullanarak sunucumuza bağlanabilirsiniz. Bedrock Edition için 'bedrock.trinovastudios.com' adresini ve 19132 portunu kullanın."
            />
            
            <FAQItem 
              question="Sunucuda hangi oyun modları var?"
              answer="Sunucumuzda Survival, SkyBlock, BedWars, SkyWars, Creative ve daha birçok oyun modu bulunmaktadır. /server komutu ile bu modlar arasında geçiş yapabilirsiniz."
            />
            
            <FAQItem 
              question="Nasıl VIP olabilirim?"
              answer="VIP olmak için web sitemizdeki mağaza bölümünden VIP paketini satın alabilirsiniz. VIP üyelik ile birçok özel avantaja ve kozmetiğe erişebilirsiniz."
            />
            
            <FAQItem 
              question="Hile kullananlara nasıl şikayet edebilirim?"
              answer="Hile kullandığını düşündüğünüz oyuncuları /report komutu ile bildirebilir veya Discord sunucumuzdaki #şikayetler kanalına kanıtlarla birlikte rapor edebilirsiniz."
            />
            
            <FAQItem 
              question="Sunucuda nasıl para kazanabilirim?"
              answer="Ekonomi sistemi olan modlarda iş yapabilir, eşya satabilir, etkinliklere katılabilir ve günlük ödüller alabilirsiniz. /jobs komutu ile mevcut işleri görüntüleyebilirsiniz."
            />
            
            <FAQItem 
              question="Satın aldığım eşyaları nasıl kullanabilirim?"
              answer="Satın aldığınız kozmetik eşyalar oyun içinde /cosmetics menüsünden, yükseltmeler ve avantajlar ise ilgili komutlarla kullanılabilir. Tüm komutları görmek için /help komutunu kullanabilirsiniz."
            />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-white/70 mb-4">Daha fazla soru ve cevap için Discord sunucumuzu ziyaret edin.</p>
            <Button 
              variant="outline" 
              className="border-minecraft-primary/50 text-minecraft-primary hover:bg-minecraft-primary/10"
              onClick={() => window.open("https://discord.gg/trinovastudios", "_blank")}
            >
              Discord'a Katıl
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoItem = ({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-minecraft-primary/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white/60 text-sm">{title}</p>
        <p className="text-white">{detail}</p>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="p-4 bg-white/5 rounded-lg">
      <h3 className="flex items-center gap-2 text-white font-medium mb-2">
        <span className="w-1.5 h-1.5 bg-minecraft-primary rounded-full"></span>
        {question}
      </h3>
      <p className="text-white/70 text-sm">{answer}</p>
    </div>
  );
};

export default ContactPage;
