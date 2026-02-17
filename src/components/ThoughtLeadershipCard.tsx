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
      <div className="w-full h-40 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/20 flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/>
          </svg>
        </div>
      </div>
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
