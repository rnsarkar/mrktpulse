import { X, Play, Pause } from "lucide-react";
import { useState } from "react";

interface VideoPlayerDialogProps {
  video: {
    id: number;
    title: string;
    duration: string;
    reason: string;
    uploadedAt: string;
    gifUrl: string;
  };
  onClose: () => void;
}

const mockTranscript = [
  { time: "00:00", text: "Welcome everyone, today we're going to talk about something that's been on the minds of every executive in our industry." },
  { time: "00:12", text: "The convergence of AI, data analytics, and content strategy is reshaping how enterprises communicate with their audiences." },
  { time: "00:28", text: "Let me share a few key insights from our latest research that I think will surprise you." },
  { time: "00:41", text: "First, 78% of enterprise buyers say thought leadership directly influences their purchasing decisions." },
  { time: "00:55", text: "Second, the most effective content is not product-focused—it's vision-focused. People want to know where the industry is heading." },
  { time: "01:10", text: "And third, authenticity matters more than production quality. Audiences can tell when content is genuine." },
  { time: "01:25", text: "So what does this mean for us? It means we need to fundamentally rethink our content strategy." },
  { time: "01:38", text: "We need to invest in people, not just platforms. The best thought leadership comes from real expertise." },
  { time: "01:52", text: "Let's dive into the specifics of how we can make this happen across our organization." },
  { time: "02:05", text: "I'll walk through three frameworks that have worked for our most successful campaigns." },
];

const VideoPlayerDialog = ({ video, onClose }: VideoPlayerDialogProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl mx-4 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-card-foreground">{video.title}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{video.duration} · Uploaded {video.uploadedAt}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Video Player */}
          <div className="flex-1 flex flex-col">
            <div className="relative w-full aspect-video bg-muted overflow-hidden flex items-center justify-center">
              <img src={video.gifUrl} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card/90 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-foreground" />
                ) : (
                  <Play className="w-6 h-6 text-foreground ml-0.5" />
                )}
              </button>
            </div>
            <div className="px-5 py-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Why this was selected</p>
              <p className="text-sm text-card-foreground">{video.reason}</p>
            </div>
          </div>

          {/* Transcript */}
          <div className="w-80 border-l border-border flex flex-col">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Transcript</p>
            </div>
            <div className="flex-1 overflow-auto px-4 py-3 space-y-3">
              {mockTranscript.map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-[11px] font-mono text-primary/70 whitespace-nowrap mt-0.5">{line.time}</span>
                  <p className="text-xs text-card-foreground leading-relaxed">{line.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerDialog;
