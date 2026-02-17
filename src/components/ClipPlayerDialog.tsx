import { X, Play, Pause, Check } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import type { Clip } from "@/components/ClipCard";

interface ClipPlayerDialogProps {
  clip: Clip;
  onClose: () => void;
  onConfirm: (clip: Clip) => void;
}

const mockTranscript = [
  { time: "00:00", text: "This is one of the most powerful insights we've uncovered in our research this quarter." },
  { time: "00:05", text: "When we looked at the data, a clear pattern emerged that nobody had predicted." },
  { time: "00:11", text: "The engagement rates spiked by 340% when we introduced this specific format." },
  { time: "00:17", text: "And what's really interesting is why — it taps into a fundamental psychological trigger." },
  { time: "00:23", text: "People don't just want information. They want transformation. They want to feel changed." },
  { time: "00:29", text: "So when you frame your content this way, you're not selling — you're elevating." },
];

const parseTimeToSeconds = (t: string) => {
  const parts = t.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] * 60 + parts[1];
};

const formatSeconds = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const ClipPlayerDialog = ({ clip, onClose, onConfirm }: ClipPlayerDialogProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const fullDurationSec = parseTimeToSeconds(clip.fullDuration);
  const [range, setRange] = useState<[number, number]>([
    parseTimeToSeconds(clip.startTime),
    parseTimeToSeconds(clip.endTime),
  ]);

  const handleConfirm = () => {
    onConfirm({
      ...clip,
      startTime: formatSeconds(range[0]),
      endTime: formatSeconds(range[1]),
      clipDuration: formatSeconds(range[1] - range[0]),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="w-full max-w-5xl mx-4 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-card-foreground">{clip.title}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Clip: {formatSeconds(range[0])} – {formatSeconds(range[1])} · Full video: {clip.fullDuration}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md text-muted-foreground hover:bg-accent transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Video + Trim */}
          <div className="flex-1 flex flex-col">
            <div className="relative w-full aspect-video bg-muted overflow-hidden flex items-center justify-center">
              <img src={clip.gifUrl} alt={clip.title} className="absolute inset-0 w-full h-full object-cover" />
              {/* Dim overlay for non-selected portions */}
              <div className="absolute inset-0 flex">
                <div className="bg-foreground/40" style={{ width: `${(range[0] / fullDurationSec) * 100}%` }} />
                <div className="flex-1" />
                <div className="bg-foreground/40" style={{ width: `${((fullDurationSec - range[1]) / fullDurationSec) * 100}%` }} />
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative z-10 w-14 h-14 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card/90 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6 text-foreground" /> : <Play className="w-6 h-6 text-foreground ml-0.5" />}
              </button>
            </div>

            {/* Trim controls */}
            <div className="px-5 py-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Trim Clip</p>
                <p className="text-xs text-muted-foreground">
                  Duration: <span className="text-foreground font-medium">{formatSeconds(range[1] - range[0])}</span>
                </p>
              </div>
              <Slider
                min={0}
                max={fullDurationSec}
                step={1}
                value={range}
                onValueChange={(v) => setRange(v as [number, number])}
                className="w-full"
              />
              <div className="flex justify-between mt-1.5 text-[11px] text-muted-foreground">
                <span>{formatSeconds(range[0])}</span>
                <span>{formatSeconds(fullDurationSec)}</span>
              </div>
            </div>

            {/* Reasoning */}
            <div className="px-5 py-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Why this moment</p>
              <p className="text-sm text-card-foreground leading-relaxed">{clip.reason}</p>
            </div>
          </div>

          {/* Transcript */}
          <div className="w-72 border-l border-border flex flex-col">
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

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Check className="w-4 h-4" />
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClipPlayerDialog;
