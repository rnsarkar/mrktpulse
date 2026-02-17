import { useState, useEffect } from "react";
import { Loader2, Zap, ArrowLeft, Check } from "lucide-react";
import ClipCard from "@/components/ClipCard";
import ClipPlayerDialog from "@/components/ClipPlayerDialog";
import type { Clip } from "@/components/ClipCard";

const mockClips: Clip[] = [
  { id: 1, title: "CEO reveals 60% cost reduction with AI", clipDuration: "0:22", fullDuration: "12:34", startTime: "4:10", endTime: "4:32", reason: "The CEO drops a stat that makes the audience audibly react — '60% reduction in content production costs.' This kind of concrete, surprising data point is the #1 driver of LinkedIn virality. Perfect hook for a short-form clip.", sourceVideo: "CEO Keynote: Future of AI in Enterprise", gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" },
  { id: 2, title: "Customer VP's 'before & after' moment", clipDuration: "0:18", fullDuration: "8:21", startTime: "3:10", endTime: "3:28", reason: "Unscripted authenticity gold — the VP pauses, looks at the camera, and says 'I didn't believe it would work.' This vulnerability followed by a transformation story is the exact emotional arc that drives shares.", sourceVideo: "Customer Success Story: Global Rollout", gifUrl: "https://media.giphy.com/media/l0HlNQ03J5JxX2rGM/giphy.gif" },
  { id: 3, title: "Panelist challenges attribution models", clipDuration: "0:26", fullDuration: "22:15", startTime: "11:35", endTime: "12:01", reason: "A heated, genuine disagreement between experts on camera — 'That model is fundamentally broken.' Contrarian takes generate 3x more engagement than consensus views. This clip is engineered for debate in the comments.", sourceVideo: "Panel Discussion: Data-Driven Marketing", gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" },
  { id: 4, title: "Live demo reveals hidden user behavior", clipDuration: "0:20", fullDuration: "15:48", startTime: "7:25", endTime: "7:45", reason: "The dashboard reveals a pattern nobody expected — users are doing the opposite of what was assumed. This 'data doesn't lie' moment positions your brand as genuinely data-driven, not just claiming to be.", sourceVideo: "Product Deep Dive: Analytics Platform", gifUrl: "https://media.giphy.com/media/3oKIPnAiaMCJ8rJ1wQ/giphy.gif" },
  { id: 5, title: "Proprietary ROI framework unveiled", clipDuration: "0:24", fullDuration: "34:10", startTime: "18:00", endTime: "18:24", reason: "First-mover advantage content — this framework hasn't been published anywhere. Presenting proprietary methodology positions you as an innovator, not a follower. Ideal for a carousel or thread breakdown.", sourceVideo: "Webinar: Content Strategy for 2025", gifUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" },
  { id: 6, title: "CMO admits past failures candidly", clipDuration: "0:19", fullDuration: "18:45", startTime: "9:15", endTime: "9:34", reason: "Raw vulnerability from a C-suite exec: 'We got it completely wrong.' Admission of failure followed by lesson learned creates trust-building content that outperforms polished corporate messaging by 5x.", sourceVideo: "Interview: CMO on Brand Evolution", gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" },
  { id: 7, title: "Live coaching transformation moment", clipDuration: "0:28", fullDuration: "41:22", startTime: "23:00", endTime: "23:28", reason: "A visible before-and-after transformation in real time. The participant's confidence shifts visibly on camera — this kind of tangible proof of concept is the most compelling format for short-form educational content.", sourceVideo: "Workshop: Building Executive Presence", gifUrl: "https://media.giphy.com/media/3o7btNhMBytxAM6YBa/giphy.gif" },
  { id: 8, title: "AI outperforms humans by 23%", clipDuration: "0:16", fullDuration: "26:33", startTime: "14:45", endTime: "15:01", reason: "A jaw-dropping stat delivered with perfect timing: 'AI diagnostics outperformed human accuracy by 23%.' Single-stat clips with clear visuals are the highest-performing format on X/Twitter.", sourceVideo: "Fireside Chat: Innovation in Healthcare", gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif" },
  { id: 9, title: "CEO's unscripted market prediction", clipDuration: "0:25", fullDuration: "45:00", startTime: "38:10", endTime: "38:35", reason: "Exclusive forward-looking content from a CEO in an unguarded Q&A moment. This hasn't been published elsewhere — exclusivity drives urgency and premium positioning.", sourceVideo: "Town Hall: Q3 Results & Vision", gifUrl: "https://media.giphy.com/media/3oKIPsx2VAYAgEHC12/giphy.gif" },
  { id: 10, title: "8-hour weekly time savings demo", clipDuration: "0:21", fullDuration: "11:56", startTime: "5:25", endTime: "5:46", reason: "Quantifiable value proposition in action: the workflow saves 8 hours per week. When viewers can calculate personal ROI in their head, click-through rates increase dramatically.", sourceVideo: "Tutorial: Leveraging AI for Content", gifUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" },
  { id: 11, title: "Bold contrarian remote work prediction", clipDuration: "0:23", fullDuration: "19:08", startTime: "12:10", endTime: "12:33", reason: "Speaker makes a prediction that contradicts mainstream thinking, backed by proprietary research data. Contrarian + data-backed = the formula for viral professional content.", sourceVideo: "Conference Talk: The Future of Work", gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" },
  { id: 12, title: "Team's genuine milestone reaction", clipDuration: "0:15", fullDuration: "7:45", startTime: "2:25", endTime: "2:40", reason: "Authentic, unscripted joy captured on camera. This raw emotion humanizes the brand in a way polished content never can. Behind-the-scenes clips average 2.5x higher engagement than produced content.", sourceVideo: "Behind the Scenes: Product Launch", gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" },
  { id: 13, title: "CISO shares undisclosed incident timeline", clipDuration: "0:27", fullDuration: "28:17", startTime: "16:40", endTime: "17:07", reason: "Exclusive insider knowledge — a real incident response timeline not shared publicly. This scarcity of information drives authority and positions the brand as a trusted insider source.", sourceVideo: "Expert Series: Cybersecurity Trends", gifUrl: "https://media.giphy.com/media/l0HlNQ03J5JxX2rGM/giphy.gif" },
  { id: 14, title: "Fortune 500 execs agree on surprise ESG play", clipDuration: "0:24", fullDuration: "33:50", startTime: "20:55", endTime: "21:19", reason: "Multi-voice consensus from recognizable brands creates powerful social proof. When three independent leaders agree on an unexpected strategy, it becomes a quotable, shareable moment.", sourceVideo: "Roundtable: Sustainable Business", gifUrl: "https://media.giphy.com/media/3oKIPnAiaMCJ8rJ1wQ/giphy.gif" },
  { id: 15, title: "Audience 'wow' reaction to feature reveal", clipDuration: "0:18", fullDuration: "14:22", startTime: "8:35", endTime: "8:53", reason: "Social proof captured in real-time — the audience's audible gasp creates an irresistible hook. Viewer curiosity ('what did they see?') drives click-through on every platform.", sourceVideo: "Demo Day: New Platform Features", gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" },
  { id: 16, title: "Failure reframed as strategic learning", clipDuration: "0:30", fullDuration: "38:55", startTime: "24:10", endTime: "24:40", reason: "A narratively complete 30-second segment with a clear arc: problem → insight → transformation. Self-contained storytelling in under 30 seconds is the most repurposable format across all platforms.", sourceVideo: "Leadership Podcast: Growth Mindset", gifUrl: "https://media.giphy.com/media/3o7btNhMBytxAM6YBa/giphy.gif" },
  { id: 17, title: "Three counter-intuitive market insights", clipDuration: "0:22", fullDuration: "5:12", startTime: "1:30", endTime: "1:52", reason: "High-density insight delivery — three surprising data points in rapid succession. The 'rapid-fire value' format performs exceptionally well as it rewards the viewer's time investment immediately.", sourceVideo: "Quick Take: Market Analysis Q3", gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif" },
  { id: 18, title: "CTO's emotional 'changed everything' moment", clipDuration: "0:20", fullDuration: "9:44", startTime: "5:50", endTime: "6:10", reason: "The emotional turning point where the CTO's voice audibly shifts — 'That's when we realized it changed everything.' Emotional peaks are the most shareable content type across all social platforms.", sourceVideo: "Client Testimonial: Enterprise Transformation", gifUrl: "https://media.giphy.com/media/3oKIPsx2VAYAgEHC12/giphy.gif" },
];

interface ClipAnalysisViewProps {
  projectName: string;
  onBack: () => void;
  onNext: (selectedClipIds: number[]) => void;
}

const ClipAnalysisView = ({ projectName, onBack, onNext }: ClipAnalysisViewProps) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [clips, setClips] = useState<Clip[]>(mockClips);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setAnalyzing(false), 400);
          return 100;
        }
        return p + 1.5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const handleClipConfirm = (updatedClip: Clip) => {
    setClips((prev) => prev.map((c) => (c.id === updatedClip.id ? updatedClip : c)));
    setSelectedClip(null);
  };

  if (analyzing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Zap className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <Loader2 className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-spin" />
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Analyzing videos for viral potential
          </h2>
          <p className="text-sm text-muted-foreground">
            Finding the clips with the strongest hooks, aha moments, and viral triggers…
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            This may take a while as we're deep-analyzing each frame, transcript, and audience reaction pattern.
          </p>
        </div>
        <div className="w-64 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">
          {Math.min(Math.round((progress / 100) * 4), 4)} of 4 videos analyzed
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto flex flex-col">
      <div className="px-8 py-6 flex-1">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={onBack} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            {clips.length} Viral Clips Identified
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-1 ml-10">
          We found these high-impact hook moments from your selected videos for <span className="font-medium text-foreground">{projectName}</span>.
        </p>
        <p className="text-xs text-muted-foreground mb-6 ml-10">
          Select up to 4 clips to generate social content. <span className="font-medium text-foreground">{selectedIds.length}/4 selected</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {clips.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              selected={selectedIds.includes(clip.id)}
              onSelect={() => toggleSelect(clip.id)}
              onClick={() => setSelectedClip(clip)}
              selectionDisabled={!selectedIds.includes(clip.id) && selectedIds.length >= 4}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-card border-t border-border px-8 py-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {selectedIds.length === 0 ? "Select clips to continue" : `${selectedIds.length} clip${selectedIds.length > 1 ? "s" : ""} selected`}
        </p>
        <button
          disabled={selectedIds.length === 0}
          onClick={() => onNext(selectedIds)}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Next
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>

      {selectedClip && (
        <ClipPlayerDialog clip={selectedClip} onClose={() => setSelectedClip(null)} onConfirm={handleClipConfirm} />
      )}
    </div>
  );
};

export default ClipAnalysisView;
