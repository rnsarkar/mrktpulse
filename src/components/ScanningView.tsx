import { useState, useEffect } from "react";
import { Loader2, Sparkles, ArrowLeft, Check } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import VideoPlayerDialog from "@/components/VideoPlayerDialog";

const mockVideos = [
  { id: 1, title: "CEO Keynote: Future of AI in Enterprise", duration: "12:34", reason: "Contains a powerful 'aha moment' at 4:22 where the CEO reveals how AI reduced content production costs by 60% — a stat-driven insight perfect for LinkedIn thought leadership and executive blog posts.", uploadedAt: "2 days ago", gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" },
  { id: 2, title: "Customer Success Story: Global Rollout", duration: "8:21", reason: "The customer's VP of Marketing shares an unscripted moment at 3:15 describing their 'before and after' transformation — authentic storytelling that resonates with enterprise buyers evaluating similar solutions.", uploadedAt: "5 days ago", gifUrl: "https://media.giphy.com/media/l0HlNQ03J5JxX2rGM/giphy.gif" },
  { id: 3, title: "Panel Discussion: Data-Driven Marketing", duration: "22:15", reason: "At 11:40, a panelist challenges conventional wisdom about attribution models, sparking a debate that captures genuine expert disagreement — ideal for a provocative thought leadership article.", uploadedAt: "1 week ago", gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" },
  { id: 4, title: "Product Deep Dive: Analytics Platform", duration: "15:48", reason: "The live demo at 7:30 shows a real-time dashboard revealing unexpected customer behavior patterns — a technical insight that positions your brand as an analytics authority.", uploadedAt: "3 days ago", gifUrl: "https://media.giphy.com/media/3oKIPnAiaMCJ8rJ1wQ/giphy.gif" },
  { id: 5, title: "Webinar: Content Strategy for 2025", duration: "34:10", reason: "The presenter unveils a proprietary framework at 18:05 for measuring content ROI that no competitor has published — first-mover advantage for thought leadership positioning.", uploadedAt: "1 day ago", gifUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" },
  { id: 6, title: "Interview: CMO on Brand Evolution", duration: "18:45", reason: "An emotionally candid segment at 9:20 where the CMO admits past failures and shares lessons learned — vulnerability that builds trust and drives high engagement rates.", uploadedAt: "4 days ago", gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" },
  { id: 7, title: "Workshop: Building Executive Presence", duration: "41:22", reason: "Contains a live coaching exercise at 23:00 that transforms a participant's delivery in real-time — a compelling 'before and after' moment for short-form video content.", uploadedAt: "6 days ago", gifUrl: "https://media.giphy.com/media/3o7btNhMBytxAM6YBa/giphy.gif" },
  { id: 8, title: "Fireside Chat: Innovation in Healthcare", duration: "26:33", reason: "A healthcare executive reveals at 14:50 how AI diagnostics outperformed human accuracy by 23% — a surprising data point that could anchor a viral LinkedIn post.", uploadedAt: "2 days ago", gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif" },
  { id: 9, title: "Town Hall: Q3 Results & Vision", duration: "45:00", reason: "The CEO's unscripted Q&A at 38:00 contains forward-looking statements about market direction that haven't been published elsewhere — exclusive insight for premium content.", uploadedAt: "1 week ago", gifUrl: "https://media.giphy.com/media/3oKIPsx2VAYAgEHC12/giphy.gif" },
  { id: 10, title: "Tutorial: Leveraging AI for Content", duration: "11:56", reason: "A step-by-step demo at 5:30 shows a workflow that saves 8 hours per week — quantifiable value that drives both engagement and lead generation.", uploadedAt: "3 days ago", gifUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" },
  { id: 11, title: "Conference Talk: The Future of Work", duration: "19:08", reason: "The speaker makes a bold prediction at 12:15 about remote work trends backed by proprietary research — contrarian viewpoints generate 3x more shares on LinkedIn.", uploadedAt: "5 days ago", gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" },
  { id: 12, title: "Behind the Scenes: Product Launch", duration: "7:45", reason: "Raw footage at 2:30 captures the team's genuine reaction to hitting a milestone — authentic, unpolished moments that humanise the brand and build audience loyalty.", uploadedAt: "2 days ago", gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" },
  { id: 13, title: "Expert Series: Cybersecurity Trends", duration: "28:17", reason: "A CISO shares at 16:45 a real incident response timeline that hasn't been disclosed publicly — exclusive case study material for an authoritative whitepaper.", uploadedAt: "4 days ago", gifUrl: "https://media.giphy.com/media/l0HlNQ03J5JxX2rGM/giphy.gif" },
  { id: 14, title: "Roundtable: Sustainable Business", duration: "33:50", reason: "At 21:00, executives from three Fortune 500 companies agree on an unexpected ESG strategy — multi-voice consensus is highly persuasive for thought leadership content.", uploadedAt: "6 days ago", gifUrl: "https://media.giphy.com/media/3oKIPnAiaMCJ8rJ1wQ/giphy.gif" },
  { id: 15, title: "Demo Day: New Platform Features", duration: "14:22", reason: "The audience's audible reaction at 8:40 to a feature reveal creates a genuine 'wow moment' — social proof captured in real-time that can be clipped for maximum impact.", uploadedAt: "1 day ago", gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" },
  { id: 16, title: "Leadership Podcast: Growth Mindset", duration: "38:55", reason: "A candid 4-minute segment starting at 24:10 where the guest reframes failure as strategic learning — a narratively complete segment ideal for standalone repurposing.", uploadedAt: "3 days ago", gifUrl: "https://media.giphy.com/media/3o7btNhMBytxAM6YBa/giphy.gif" },
  { id: 17, title: "Quick Take: Market Analysis Q3", duration: "5:12", reason: "Packs three counter-intuitive market insights into under 6 minutes — the density and brevity make it perfect for a data-driven Twitter/X thread or infographic.", uploadedAt: "1 week ago", gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif" },
  { id: 18, title: "Client Testimonial: Enterprise Transformation", duration: "9:44", reason: "The client's CTO describes at 5:55 a specific moment when the team realised the platform 'changed everything' — emotional turning points are the most shareable content type.", uploadedAt: "5 days ago", gifUrl: "https://media.giphy.com/media/3oKIPsx2VAYAgEHC12/giphy.gif" },
];

interface ScanningViewProps {
  projectName: string;
  onBack: () => void;
  onNext: (selectedIds?: number[]) => void;
}

const ScanningView = ({ projectName, onBack, onNext }: ScanningViewProps) => {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<typeof mockVideos[0] | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setScanning(false), 400);
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  if (scanning) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <Loader2 className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-spin" />
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Scanning all your resources
          </h2>
          <p className="text-sm text-muted-foreground">
            Searching through all connected video repositories to find the aha moments…
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            This may take a while depending on the size of your content library.
          </p>
        </div>
        <div className="w-64 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{Math.min(Math.round(progress / 100 * 18), 18)} of 18 sources scanned</p>
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
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            {mockVideos.length} Videos Identified
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-1 ml-10">
          We found these high-impact moments from your content library for <span className="font-medium text-foreground">{projectName}</span>.
        </p>
        <p className="text-xs text-muted-foreground mb-6 ml-10">
          Select up to 4 videos to proceed. <span className="font-medium text-foreground">{selectedIds.length}/4 selected</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              selected={selectedIds.includes(video.id)}
              onSelect={() => toggleSelect(video.id)}
              onClick={() => setSelectedVideo(video)}
              selectionDisabled={!selectedIds.includes(video.id) && selectedIds.length >= 4}
            />
          ))}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 bg-card border-t border-border px-8 py-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {selectedIds.length === 0
            ? "Select videos to continue"
            : `${selectedIds.length} video${selectedIds.length > 1 ? "s" : ""} selected`}
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

      {selectedVideo && (
        <VideoPlayerDialog video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
};

export default ScanningView;
