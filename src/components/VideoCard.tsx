import { Play, Clock, CalendarDays } from "lucide-react";

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    duration: string;
    reason: string;
    uploadedAt: string;
    thumbnail: string;
  };
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: VideoCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col bg-card rounded-lg border border-border overflow-hidden transition-all hover:shadow-md hover:border-primary/20 text-left"
    >
      {/* Thumbnail / GIF area */}
      <div className={`relative w-full h-36 ${video.thumbnail} flex items-center justify-center`}>
        <div className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
          <Play className="w-4 h-4 text-foreground ml-0.5" />
        </div>
        <span className="absolute bottom-2 right-2 text-[11px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      <div className="px-3 py-3 flex flex-col gap-1.5">
        <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {video.title}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
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
      </div>
    </button>
  );
};

export default VideoCard;
