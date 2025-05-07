
import React from "react";
import { Button } from "@/components/ui/button";
import { WheelSegment } from "./types";
import { cn } from "@/lib/utils";

interface WinnerDisplayProps {
  winner: WheelSegment | null;
  showWinnerAnimation: boolean;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner, showWinnerAnimation }) => {
  if (!winner) return null;
  
  return (
    <div className={cn(
      "mt-4 p-6 border rounded-md transition-all duration-500 transform",
      showWinnerAnimation 
        ? "scale-105 bg-gradient-to-b from-black/80 to-black/70 border-purple-500/50 shadow-lg shadow-purple-500/20" 
        : "border-minecraft-primary/30 bg-black/30"
    )}>
      <h3 className={cn(
        "text-xl font-minecraft mb-3",
        showWinnerAnimation ? "bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 text-transparent bg-clip-text" : "text-minecraft-primary"
      )}>
        Tebrikler!
      </h3>
      <p className="text-white mb-4">{winner.description}</p>
      <div className="flex justify-center">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transform transition-transform duration-500",
          "bg-gradient-to-br from-purple-600 to-purple-900 border-2 border-white/20",
          showWinnerAnimation && "animate-pulse-gentle scale-110"
        )}>
          {winner.icon}
        </div>
      </div>
      
      {showWinnerAnimation && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            className="border-purple-400/50 text-purple-400 hover:bg-purple-500/20"
            onClick={() => {
              if (winner.id === "vipBasic") {
                window.location.href = "/shop";
              }
            }}
          >
            {winner.id === "vipBasic" ? "VIP Paketimi Göster" : "Harika!"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WinnerDisplay;
