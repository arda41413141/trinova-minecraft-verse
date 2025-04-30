
interface RequirementCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const RequirementCard = ({ icon, title, description }: RequirementCardProps) => {
  return (
    <div className="flex gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-minecraft-primary/30 hover:bg-white/8 transition-all duration-300">
      <div className="flex-shrink-0 mt-1 text-minecraft-primary">{icon}</div>
      <div>
        <h4 className="text-white text-sm font-medium mb-1">{title}</h4>
        <p className="text-white/60 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default RequirementCard;
