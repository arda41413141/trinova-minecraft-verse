
import React, { useRef } from "react";
import { Gift } from "lucide-react";
import { WheelSegment } from "./types";
import { cn } from "@/lib/utils";

interface WheelDisplayProps {
  wheelSegments: WheelSegment[];
  rotation: number;
  isSpinning: boolean;
  showAnimation: boolean;
}

const WheelDisplay: React.FC<WheelDisplayProps> = ({ 
  wheelSegments, 
  rotation, 
  isSpinning,
  showAnimation
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const segmentAngle = 360 / wheelSegments.length;
  
  return (
    <div className="relative w-80 h-80 mb-10">
      {/* Animated glowing ring */}
      <div className={cn(
        "absolute inset-[-8px] rounded-full transition-all duration-1000",
        "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500",
        isSpinning ? "animate-spin opacity-70" : "opacity-30"
      )} style={{filter: "blur(8px)"}}></div>
      
      {/* Elite border around wheel */}
      <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 z-10"></div>
      
      {/* Pointer/Ticker at the top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-20">
        <div className={cn(
          "w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg",
          "border-2 border-white rotate-45 transform translate-y-1/2",
          isSpinning ? "animate-wheel-tick" : ""
        )}></div>
      </div>
      
      {/* Spinning Wheel */}
      <div 
        ref={wheelRef}
        className={cn(
          "wheel-container w-full h-full rounded-full overflow-hidden relative z-10",
          "border-4 border-white/20 shadow-[0_0_15px_rgba(139,92,246,0.5)]",
          isSpinning ? "spinning" : ""
        )}
        style={{
          transform: `rotate(${rotation}deg)`, 
          transition: isSpinning ? 'transform 6s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none',
          background: 'radial-gradient(circle at center, #1A1F2C 0%, #13151A 100%)'
        }}
      >
        {wheelSegments.map((segment, index) => {
          const startAngle = index * segmentAngle;
          return (
            <div 
              key={segment.id}
              className="absolute w-full h-full origin-bottom-right"
              style={{
                clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(Math.PI * startAngle / 180)}% ${50 + 50 * Math.sin(Math.PI * startAngle / 180)}%, ${50 + 50 * Math.cos(Math.PI * (startAngle + segmentAngle) / 180)}% ${50 + 50 * Math.sin(Math.PI * (startAngle + segmentAngle) / 180)}%, 50% 50%)`,
                transform: `rotate(${index * segmentAngle}deg)`,
                background: segment.gradient,
                boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              <div 
                className="absolute text-white font-bold text-sm w-full h-full flex items-center justify-center"
                style={{ transform: `rotate(${segmentAngle / 2}deg) translateY(-70px)` }}
              >
                <div className="transform -rotate-90 flex flex-col items-center">
                  <div className="bg-black/40 p-2 rounded-full mb-1 backdrop-blur-sm">
                    {segment.icon}
                  </div>
                  <span className="mt-1 text-xs font-bold text-white drop-shadow-lg">
                    {segment.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Center decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-600 to-purple-900 border-2 border-white/40">
          <Gift size={28} className="text-white" />
        </div>
      </div>
      
      {/* Animated particles during spin */}
      {showAnimation && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `sparkle ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WheelDisplay;
