
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import ProcessCard from "./ProcessCard";

const ApplicationProcess = () => {
  return (
    <>
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
    </>
  );
};

export default ApplicationProcess;
