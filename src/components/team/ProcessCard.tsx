
interface ProcessCardProps {
  number: string;
  title: string;
  description: string;
}

const ProcessCard = ({ number, title, description }: ProcessCardProps) => {
  return (
    <div className="text-center p-5 bg-white/5 rounded-lg border border-white/10 hover:border-minecraft-primary/30 transition-all">
      <div className="w-12 h-12 rounded-full bg-minecraft-primary/20 text-minecraft-primary font-bold flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
};

export default ProcessCard;
