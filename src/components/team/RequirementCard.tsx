
interface RequirementCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const RequirementCard = ({ icon, title, description }: RequirementCardProps) => {
  return (
    <div className="flex gap-3 bg-white/5 p-3 rounded-lg">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="text-white text-sm font-medium mb-1">{title}</h4>
        <p className="text-white/60 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default RequirementCard;
