import { Play, Clock, Scissors, Check } from "lucide-react";

export interface Clip {
  id: number;
  title: string;
  clipDuration: string;
  fullDuration: string;
  startTime: string;
  endTime: string;
  reason: string;
  sourceVideo: string;
  gifUrl: string;
}

interface ClipCardProps {
  clip: Clip;
  selected: boolean;
  selectionDisabled: boolean;
  onSelect: () => void;
  onClick: () => void;
}

const ClipCard = ({ clip, selected, selectionDisabled, onSelect, onClick }: ClipCardProps) => {
  return (
    <div
      className={`group flex flex-col bg-card rounded-lg border overflow-hidden transition-all hover:shadow-md text-left ${
        selected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/20"
      }`}
    >
      <div className="relative w-full h-36 bg-muted overflow-hidden cursor-pointer" onClick={onClick}>
        <img src={clip.gifUrl} alt={clip.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
            <Play className="w-4 h-4 text-foreground ml-0.5" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 text-[11px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">
          {clip.clipDuration}
        </span>
        <span className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-medium bg-primary/90 text-primary-foreground px-1.5 py-0.5 rounded">
          <Scissors className="w-3 h-3" />
          Clip
        </span>
      </div>

      <div className="px-3 py-3 flex flex-col gap-1.5 flex-1">
        <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug cursor-pointer" onClick={onClick}>
          {clip.title}
        </p>
        <p className="text-[11px] text-muted-foreground">
          From: <span className="text-foreground/70">{clip.sourceVideo}</span>
        </p>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {clip.reason}
        </p>
        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {clip.startTime} – {clip.endTime}
          </span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          disabled={selectionDisabled}
          className={`mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
            selected
              ? "bg-primary text-primary-foreground"
              : selectionDisabled
              ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
              : "bg-accent text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
          }`}
        >
          {selected ? (<><Check className="w-3 h-3" />Selected</>) : "Select"}
        </button>
      </div>
    </div>
  );
};

export default ClipCard;
