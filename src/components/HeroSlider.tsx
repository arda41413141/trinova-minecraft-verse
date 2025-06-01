
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop&q=80",
    title: "Farex Network Minecraft Dünyasına Hoşgeldin",
    description: "Heyecan verici maceralar, rekabetçi oyun modları ve arkadaşlıklar için doğru adres!",
    cta: "Hemen Başla"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop&q=80",
    title: "Survival Dünyası",
    description: "Zorlu hayatta kalma mücadelesine katıl, kendi imparatorluğunu kur ve en iyi ol!",
    cta: "Keşfet"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1920&h=1080&fit=crop&q=80",
    title: "Skyblock Maceraları",
    description: "Küçük bir adada başla, imkansızı başar! Skyblock modunda becerilerini test et.",
    cta: "Oynamaya Başla"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Hypixel-style background with new Farex Network logo */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style={{ backgroundImage: `url('/lovable-uploads/b3f46091-45de-462d-8513-5a1cef05e6d0.png')` }}>
      </div>
      
      {/* Hypixel-style gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-hypixel-dark-primary/80 via-hypixel-dark-secondary/60 to-hypixel-dark-primary/90 z-10"></div>
      
      {/* Hypixel particles effect */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="animate-hypixel-float absolute top-20 left-10 w-4 h-4 bg-hypixel-orange rounded-full blur-sm"></div>
        <div className="animate-hypixel-float absolute top-40 right-20 w-3 h-3 bg-hypixel-aqua rounded-full blur-sm" style={{ animationDelay: '1s' }}></div>
        <div className="animate-hypixel-float absolute bottom-32 left-1/4 w-2 h-2 bg-hypixel-gold rounded-full blur-sm" style={{ animationDelay: '2s' }}></div>
        <div className="animate-hypixel-float absolute top-1/3 right-1/3 w-5 h-5 bg-hypixel-orange/50 rounded-full blur-md" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Slider Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-hypixel text-4xl md:text-5xl lg:text-6xl text-white mb-6 animate-hypixel-float hypixel-title">
              {slides[currentSlide].title}
            </h1>
            <p className="text-hypixel-aqua text-lg md:text-xl mb-8 font-medium">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="hypixel-btn text-black font-bold">
                <span className="btn-content">{slides[currentSlide].cta}</span>
              </Button>
              <Button className="hypixel-btn bg-gradient-to-r from-hypixel-aqua to-hypixel-blue text-black font-bold" variant="outline">
                <span className="btn-content">Discord'a Katıl</span>
              </Button>
            </div>
            
            <div className="mt-16 flex justify-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? "bg-hypixel-orange shadow-lg shadow-hypixel-orange/50 animate-hypixel-glow" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Hypixel-style Navigation Arrows */}
        <button 
          className="absolute left-6 top-1/2 -translate-y-1/2 hypixel-card p-3 rounded-full text-hypixel-orange hover:text-hypixel-gold transition-all duration-300 hover:scale-110 z-30 border border-hypixel-orange/30"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          className="absolute right-6 top-1/2 -translate-y-1/2 hypixel-card p-3 rounded-full text-hypixel-orange hover:text-hypixel-gold transition-all duration-300 hover:scale-110 z-30 border border-hypixel-orange/30"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      
      {/* Hypixel-style decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-hypixel-orange via-hypixel-gold to-hypixel-orange z-20"></div>
    </div>
  );
};

export default HeroSlider;
