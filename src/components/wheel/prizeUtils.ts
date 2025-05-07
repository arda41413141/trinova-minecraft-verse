
import { toast } from "sonner";
import { WheelSegment } from "./types";
import confetti from 'canvas-confetti';

// Premium confetti effect
export const launchPremiumConfetti = () => {
  const duration = 4000;
  const animationEnd = Date.now() + duration;
  
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    
    const particleCount = 50 * (timeLeft / duration);
    
    // Gold and premium colored confetti
    confetti({
      particleCount: Math.floor(particleCount),
      spread: 70,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#FFD700', '#FFA500', '#F8F8FF', '#9b87f5', '#7E69AB'],
      shapes: ['circle', 'square'],
    });
    
    confetti({
      particleCount: Math.floor(particleCount),
      spread: 70,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#FFD700', '#FFA500', '#F8F8FF', '#9b87f5', '#7E69AB'],
      shapes: ['circle', 'square'],
    });
  }, 250);
};

// Regular confetti effect
export const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FFA500', '#F8F8FF', '#9b87f5', '#7E69AB'],
  });
};

// Handle the prize award
export const handlePrize = (segment: WheelSegment, addBalance: (amount: number) => void, addItem: (product: any, quantity: number) => void) => {
  switch(segment.id) {
    case "discount5":
    case "discount10":
    case "discount15":
      // Store discount code in localStorage
      const discountAmount = segment.id === "discount5" ? 5 : segment.id === "discount10" ? 10 : 15;
      localStorage.setItem("minecraft_discount", JSON.stringify({
        code: `DISCOUNT${discountAmount}`,
        amount: discountAmount,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      }));
      toast.success(`${segment.name} kazandınız! Bir sonraki alışverişinizde geçerli.`);
      break;
    case "balance100":
      addBalance(100);
      toast.success("100 TL bakiye kazandınız!");
      break;
    case "vipBasic":
      // Get first VIP product from products
      import("@/data/products").then(({ products }) => {
        const vipProduct = products.find(p => p.category === "rank");
        if (vipProduct) {
          addItem(vipProduct, 1);
          toast.success("VIP Paketi kazandınız! Sepetinize eklendi.");
        }
      });
      break;
    default:
      toast.info("Bir ödül kazandınız!");
  }
};

// Determine winner based on weighted chances
export const determineWinner = (wheelSegments: WheelSegment[]) => {
  // Calculate total chance weight
  const totalChance = wheelSegments.reduce((sum, segment) => sum + segment.chance, 0);
  
  // Randomly determine the winner based on weighted chances
  const randomValue = Math.random() * totalChance;
  let cumulativeChance = 0;
  
  let selectedSegment: WheelSegment | undefined;
  for (const segment of wheelSegments) {
    cumulativeChance += segment.chance;
    if (randomValue < cumulativeChance) {
      selectedSegment = segment;
      break;
    }
  }
  
  return selectedSegment || wheelSegments[0]; // Fallback to the first segment if no winner
};

// Play sound effects
export const playSounds = {
  spin: () => {
    const spinSound = new Audio('/sounds/wheel-spin.mp3');
    spinSound.volume = 0.3;
    spinSound.play().catch(e => console.warn("Failed to play spin sound", e));
  },
  celebrate: () => {
    const celebrationSound = new Audio('/sounds/celebration.mp3');
    celebrationSound.volume = 0.5;
    celebrationSound.play().catch(e => console.warn("Failed to play celebration sound", e));
  },
  win: () => {
    const winSound = new Audio('/sounds/win-sound.mp3');
    winSound.volume = 0.4;
    winSound.play().catch(e => console.warn("Failed to play win sound", e));
  }
};
