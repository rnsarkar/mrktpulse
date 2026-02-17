interface ThoughtLeadershipCardProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

const ThoughtLeadershipCard = ({ title, subtitle, onClick }: ThoughtLeadershipCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col bg-card rounded-lg border border-border overflow-hidden transition-all hover:shadow-md hover:border-primary/20 text-left"
    >
      <div className="w-full h-40 bg-card-thumb" />
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </button>
  );
};

export default ThoughtLeadershipCard;
