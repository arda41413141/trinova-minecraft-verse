
import React from "react";
import { cn } from "@/lib/utils";

interface MinecraftBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "rank" | "item" | "event" | "achievement";
  size?: "sm" | "default" | "lg";
  children: React.ReactNode;
}

const MinecraftBadge = ({ 
  variant = "default", 
  size = "default", 
  className, 
  children, 
  ...props 
}: MinecraftBadgeProps) => {
  
  const variantClasses = {
    default: "bg-minecraft-primary/20 text-minecraft-primary border-minecraft-primary/30",
    rank: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    item: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    event: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    achievement: "bg-green-500/20 text-green-400 border-green-500/30",
  };
  
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    default: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };
  
  return (
    <div
      className={cn(
        "inline-flex items-center font-minecraft rounded border backdrop-blur-sm",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { MinecraftBadge };
