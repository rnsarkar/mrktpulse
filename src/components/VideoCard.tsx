import { Play, Clock, CalendarDays, Check } from "lucide-react";

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    duration: string;
    reason: string;
    uploadedAt: string;
    gifUrl: string;
  };
  selected: boolean;
  selectionDisabled: boolean;
  onSelect: () => void;
  onClick: () => void;
}

const VideoCard = ({ video, selected, selectionDisabled, onSelect, onClick }: VideoCardProps) => {
  return (
    <div
      className={`group flex flex-col bg-card rounded-lg border overflow-hidden transition-all hover:shadow-md text-left ${
        selected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/20"
      }`}
    >
      {/* Thumbnail / GIF area */}
      <div className="relative w-full h-36 bg-muted overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          src={video.gifUrl}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
            <Play className="w-4 h-4 text-foreground ml-0.5" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 text-[11px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      <div className="px-3 py-3 flex flex-col gap-1.5 flex-1">
        <p
          className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug cursor-pointer"
          onClick={onClick}
        >
          {video.title}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {video.reason}
        </p>
        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            {video.uploadedAt}
          </span>
        </div>

        {/* Select button */}
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
          {selected ? (
            <>
              <Check className="w-3 h-3" />
              Selected
            </>
          ) : (
            "Select"
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
