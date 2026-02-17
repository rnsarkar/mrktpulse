import { useState, useEffect } from "react";
import { Loader2, Sparkles } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import VideoPlayerDialog from "@/components/VideoPlayerDialog";

const mockVideos = [
  { id: 1, title: "CEO Keynote: Future of AI in Enterprise", duration: "12:34", reason: "High engagement metrics and strong alignment with thought leadership themes", uploadedAt: "2 days ago", thumbnail: "bg-gradient-to-r from-primary/20 to-primary/5" },
  { id: 2, title: "Customer Success Story: Global Rollout", duration: "8:21", reason: "Showcases measurable ROI and executive-level insights", uploadedAt: "5 days ago", thumbnail: "bg-gradient-to-r from-blue-500/20 to-blue-500/5" },
  { id: 3, title: "Panel Discussion: Data-Driven Marketing", duration: "22:15", reason: "Features industry leaders discussing emerging trends", uploadedAt: "1 week ago", thumbnail: "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5" },
  { id: 4, title: "Product Deep Dive: Analytics Platform", duration: "15:48", reason: "Demonstrates technical depth ideal for expert audience", uploadedAt: "3 days ago", thumbnail: "bg-gradient-to-r from-violet-500/20 to-violet-500/5" },
  { id: 5, title: "Webinar: Content Strategy for 2025", duration: "34:10", reason: "Comprehensive strategy discussion with actionable takeaways", uploadedAt: "1 day ago", thumbnail: "bg-gradient-to-r from-amber-500/20 to-amber-500/5" },
  { id: 6, title: "Interview: CMO on Brand Evolution", duration: "18:45", reason: "Personal narrative drives strong audience connection", uploadedAt: "4 days ago", thumbnail: "bg-gradient-to-r from-rose-500/20 to-rose-500/5" },
  { id: 7, title: "Workshop: Building Executive Presence", duration: "41:22", reason: "Highly relevant to thought leadership positioning", uploadedAt: "6 days ago", thumbnail: "bg-gradient-to-r from-cyan-500/20 to-cyan-500/5" },
  { id: 8, title: "Fireside Chat: Innovation in Healthcare", duration: "26:33", reason: "Trending topic with high search volume", uploadedAt: "2 days ago", thumbnail: "bg-gradient-to-r from-teal-500/20 to-teal-500/5" },
  { id: 9, title: "Town Hall: Q3 Results & Vision", duration: "45:00", reason: "Contains key metrics and forward-looking statements", uploadedAt: "1 week ago", thumbnail: "bg-gradient-to-r from-orange-500/20 to-orange-500/5" },
  { id: 10, title: "Tutorial: Leveraging AI for Content", duration: "11:56", reason: "Step-by-step format ideal for educational content", uploadedAt: "3 days ago", thumbnail: "bg-gradient-to-r from-indigo-500/20 to-indigo-500/5" },
  { id: 11, title: "Conference Talk: The Future of Work", duration: "19:08", reason: "Addresses a top-of-mind topic for C-suite executives", uploadedAt: "5 days ago", thumbnail: "bg-gradient-to-r from-pink-500/20 to-pink-500/5" },
  { id: 12, title: "Behind the Scenes: Product Launch", duration: "7:45", reason: "Authentic storytelling that humanises the brand", uploadedAt: "2 days ago", thumbnail: "bg-gradient-to-r from-lime-500/20 to-lime-500/5" },
  { id: 13, title: "Expert Series: Cybersecurity Trends", duration: "28:17", reason: "Positions the brand as a trusted authority", uploadedAt: "4 days ago", thumbnail: "bg-gradient-to-r from-red-500/20 to-red-500/5" },
  { id: 14, title: "Roundtable: Sustainable Business", duration: "33:50", reason: "ESG content gaining traction with enterprise audiences", uploadedAt: "6 days ago", thumbnail: "bg-gradient-to-r from-green-500/20 to-green-500/5" },
  { id: 15, title: "Demo Day: New Platform Features", duration: "14:22", reason: "High reuse potential across sales and marketing", uploadedAt: "1 day ago", thumbnail: "bg-gradient-to-r from-sky-500/20 to-sky-500/5" },
  { id: 16, title: "Leadership Podcast: Growth Mindset", duration: "38:55", reason: "Long-form content ideal for multi-format repurposing", uploadedAt: "3 days ago", thumbnail: "bg-gradient-to-r from-fuchsia-500/20 to-fuchsia-500/5" },
  { id: 17, title: "Quick Take: Market Analysis Q3", duration: "5:12", reason: "Concise, data-heavy content for social distribution", uploadedAt: "1 week ago", thumbnail: "bg-gradient-to-r from-yellow-500/20 to-yellow-500/5" },
  { id: 18, title: "Client Testimonial: Enterprise Transformation", duration: "9:44", reason: "Social proof with executive endorsement", uploadedAt: "5 days ago", thumbnail: "bg-gradient-to-r from-purple-500/20 to-purple-500/5" },
];

interface ScanningViewProps {
  projectName: string;
}

const ScanningView = ({ projectName }: ScanningViewProps) => {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<typeof mockVideos[0] | null>(null);

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
            Finding the aha moments across your content library…
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
    <div className="flex-1 overflow-auto px-8 py-6">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          {mockVideos.length} Videos Identified
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        We found these high-impact moments from your content library for <span className="font-medium text-foreground">{projectName}</span>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayerDialog video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
};

export default ScanningView;
