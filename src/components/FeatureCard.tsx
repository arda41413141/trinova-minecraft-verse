
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 hover:border-minecraft-primary/30 transition-all duration-300",
      className
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 rounded-full bg-minecraft-primary/20 p-3">
          {icon}
        </div>
        <h3 className="text-white text-lg font-minecraft">{title}</h3>
      </div>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
