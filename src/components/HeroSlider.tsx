
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
      {/* Background overlay with dragon silhouette */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
           style={{ backgroundImage: `url('/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png')` }}>
      </div>
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-minecraft z-10"></div>
      
      {/* Slider Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-minecraft text-4xl md:text-5xl lg:text-6xl text-white mb-6 animate-float">
              {slides[currentSlide].title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="minecraft-btn">
                <span className="btn-content">{slides[currentSlide].cta}</span>
              </Button>
              <Button className="minecraft-btn" variant="outline">
                <span className="btn-content">Discord'a Katıl</span>
              </Button>
            </div>
            
            <div className="mt-16 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-minecraft-primary" : "bg-white/30"
                  } transition-all duration-300`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm p-2 rounded-full text-white hover:bg-minecraft-primary/50 transition-colors z-30"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm p-2 rounded-full text-white hover:bg-minecraft-primary/50 transition-colors z-30"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Minecraft-like pixel border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[url('/images/minecraft-border.png')] bg-repeat-x z-20"></div>
    </div>
  );
};

export default HeroSlider;
