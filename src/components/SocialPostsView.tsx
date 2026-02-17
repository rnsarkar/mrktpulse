import { useState, useEffect } from "react";
import { ArrowLeft, Linkedin, Twitter, Share2, ThumbsUp, MessageCircle, Repeat2, Heart, Bookmark, MoreHorizontal, Loader2, Sparkles, Send, Globe, ChevronDown, Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface SocialPost {
  id: number;
  platform: "linkedin" | "meta" | "x";
  format: "9:16" | "16:9" | "1:1";
  headline: string;
  body: string;
  cta: string;
  hashtags: string[];
  gifUrl: string;
  brandName: string;
  followerCount: string;
  brandAlignment: "low" | "medium" | "high";
}

const mockPosts: SocialPost[] = [
  // LinkedIn
  { id: 1, platform: "linkedin", format: "1:1", headline: "Ten ways to improve customer productivity and see results", body: "We reduced content production costs by 60% with AI. Here's exactly how.\n\nMost companies are spending more on content, not less. We went the other direction.\n\nBy implementing AI-driven content analysis across our video library, we found the 'aha moments' that audiences actually care about.", cta: "Learn more", hashtags: ["#AI", "#ContentStrategy", "#ThoughtLeadership"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif", brandName: "Your Brand", followerCount: "12,847 followers", brandAlignment: "high" },
  { id: 2, platform: "linkedin", format: "16:9", headline: "Experience the power of enterprise AI. Join us at this year's global conference.", body: "I said this on a panel last week and the room went silent.\n\nBut here's the truth: last-touch attribution is lying to you about what's actually driving revenue.\n\nOur data shows that thought leadership content influences 78% of enterprise buying decisions.", cta: "Register", hashtags: ["#B2BMarketing", "#Attribution", "#DataDriven"], gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif", brandName: "Techcore AI", followerCount: "8,234 followers", brandAlignment: "high" },
  { id: 3, platform: "linkedin", format: "9:16", headline: "Our CMO admitted we got it completely wrong. Here's what happened next.", body: "Vulnerability builds trust.\n\nWhen our CMO went on camera and said 'We got it completely wrong' — our engagement rate 5x'd overnight.\n\nThis 19-second clip generated more leads than our entire Q2 campaign.", cta: "Watch the Full Interview", hashtags: ["#Leadership", "#Authenticity", "#CMO"], gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif", brandName: "Your Brand", followerCount: "12,847 followers", brandAlignment: "medium" },
  { id: 4, platform: "linkedin", format: "1:1", headline: "3 market insights that contradicted everything we assumed", body: "We ran the numbers on Q3 and the data told a completely different story.\n\n1️⃣ Remote workers are MORE productive (not less) — by 23%\n2️⃣ Enterprise buyers trust video over whitepapers 4:1\n3️⃣ The best-performing content is under 30 seconds", cta: "Get the Full Report", hashtags: ["#MarketInsights", "#DataDriven", "#B2B"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif", brandName: "Your Brand", followerCount: "12,847 followers", brandAlignment: "high" },

  // Meta
  { id: 5, platform: "meta", format: "9:16", headline: "60% cost reduction. One AI tool. Here's the proof.", body: "Stop overspending on content that doesn't convert.\n\nThis CEO just revealed how AI helped them find the exact moments that drive engagement — and cut everything else.", cta: "Shop now", hashtags: ["#AI", "#ContentMarketing", "#Innovation"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif", brandName: "laleurbeauty", followerCount: "", brandAlignment: "high" },
  { id: 6, platform: "meta", format: "1:1", headline: "This live demo shocked the entire audience", body: "When the dashboard revealed what users were ACTUALLY doing — the room gasped.\n\nSometimes the data tells a story nobody expected.", cta: "Shop now", hashtags: ["#DataAnalytics", "#ProductDemo", "#Tech"], gifUrl: "https://media.giphy.com/media/3oKIPnAiaMCJ8rJ1wQ/giphy.gif", brandName: "laleurbeauty", followerCount: "", brandAlignment: "medium" },
  { id: 7, platform: "meta", format: "16:9", headline: "AI diagnostics outperformed humans by 23%. Here's the clip.", body: "This healthcare executive dropped a stat that changes everything.\n\nAI isn't just matching human performance — it's exceeding it.", cta: "Learn More", hashtags: ["#Healthcare", "#AI", "#Innovation"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif", brandName: "laleurbeauty", followerCount: "", brandAlignment: "low" },
  { id: 8, platform: "meta", format: "9:16", headline: "Behind the scenes: Watch a team hit their biggest milestone", body: "Raw, unfiltered joy.\n\nNo script. No polish. Just a team celebrating something real.\n\nThis 15-second clip is a reminder of why we do what we do.", cta: "Follow for More", hashtags: ["#BehindTheScenes", "#TeamCulture", "#Startup"], gifUrl: "https://media.giphy.com/media/3o7btNhMBytxAM6YBa/giphy.gif", brandName: "laleurbeauty", followerCount: "", brandAlignment: "high" },

  // X
  { id: 9, platform: "x", format: "16:9", headline: "", body: "☕ Love coffee? We've partnered with local coffee bean roasters to bring you the best flavors in San Francisco.\n\nThis CEO's keynote clip on AI cost reduction is going viral — 60% savings, 3x engagement.\n\nThe clip that started it all 👇", cta: "", hashtags: ["#AI", "#ContentStrategy"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif", brandName: "The Barista Bar", followerCount: "@BaristaBar", brandAlignment: "high" },
  { id: 10, platform: "x", format: "1:1", headline: "", body: "Hot take: Last-touch attribution is lying to you.\n\n78% of enterprise buying decisions are influenced by thought leadership.\n\nBut your attribution model gives it 0% credit.\n\nThis panelist called it 'fundamentally broken' — and nobody disagreed.", cta: "", hashtags: ["#Marketing", "#Attribution"], gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif", brandName: "Your Brand", followerCount: "@YourBrand", brandAlignment: "medium" },
  { id: 11, platform: "x", format: "9:16", headline: "", body: "A CMO said 'we got it completely wrong' on camera.\n\nEngagement 5x'd.\n\nVulnerability > perfection.\n\nThis 19-second clip outperformed their entire Q2 campaign.", cta: "", hashtags: ["#Leadership", "#Marketing"], gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif", brandName: "Your Brand", followerCount: "@YourBrand", brandAlignment: "high" },
  { id: 12, platform: "x", format: "1:1", headline: "", body: "3 stats from Q3 that contradicted everything we assumed:\n\n1. Remote workers are 23% MORE productive\n2. Enterprise buyers trust video 4:1 over whitepapers\n3. Best-performing content is under 30 seconds\n\nThe data doesn't lie 📊", cta: "", hashtags: ["#Data", "#Trends"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif", brandName: "Your Brand", followerCount: "@YourBrand", brandAlignment: "low" },
];

const formatLabel: Record<string, string> = { "9:16": "Story / Reel", "16:9": "Landscape", "1:1": "Square" };

const alignmentConfig = {
  high: { label: "High", icon: ShieldCheck, className: "bg-emerald-500/90 text-white" },
  medium: { label: "Medium", icon: Shield, className: "bg-amber-500/90 text-white" },
  low: { label: "Low", icon: ShieldAlert, className: "bg-red-500/90 text-white" },
};

/* ─── LinkedIn Ad Mockup ─── */
const LinkedInPostMockup = ({ post }: { post: SocialPost }) => {
  const align = alignmentConfig[post.brandAlignment];
  const AlignIcon = align.icon;
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow relative">
      {/* Brand Alignment Badge */}
      <div className={`absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${align.className}`}>
        <AlignIcon className="w-3 h-3" />
        {align.label}
      </div>

      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[hsl(210,80%,96%)] flex items-center justify-center">
          <Linkedin className="w-5 h-5 text-[hsl(210,80%,45%)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-card-foreground truncate">{post.brandName}</p>
            <span className="text-[10px] text-muted-foreground">• Following</span>
          </div>
          <p className="text-[10px] text-muted-foreground">{post.followerCount}</p>
          <p className="text-[10px] text-muted-foreground">Promoted</p>
        </div>
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Body text */}
      <div className="px-4 pb-3">
        <p className="text-xs text-card-foreground whitespace-pre-line leading-relaxed line-clamp-4">{post.body}</p>
        {post.hashtags.length > 0 && (
          <p className="text-xs text-[hsl(210,80%,45%)] mt-1.5">{post.hashtags.join(" ")}</p>
        )}
      </div>

      {/* Media */}
      <div className={`w-full ${post.format === "9:16" ? "aspect-[9/16] max-h-[400px]" : post.format === "1:1" ? "aspect-square max-h-[300px]" : "aspect-video max-h-[220px]"} bg-muted overflow-hidden relative`}>
        <img src={post.gifUrl} alt={post.headline} className="w-full h-full object-cover" loading="lazy" />
        <span className="absolute top-2 left-2 text-[10px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">
          {post.format}
        </span>
      </div>

      {/* CTA bar */}
      <div className="px-4 py-2.5 border-t border-border flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-card-foreground line-clamp-1">{post.headline}</p>
        </div>
        {post.cta && (
          <button className="px-3 py-1.5 rounded-full border border-primary text-primary text-[11px] font-semibold hover:bg-primary/5 transition-colors whitespace-nowrap">
            {post.cta}
          </button>
        )}
      </div>

      {/* Engagement */}
      <div className="px-4 py-2 border-t border-border flex items-center justify-between text-muted-foreground">
        <span className="text-[10px]">2 Likes</span>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1 text-[11px]"><ThumbsUp className="w-3.5 h-3.5" /> Like</span>
          <span className="flex items-center gap-1 text-[11px]"><MessageCircle className="w-3.5 h-3.5" /> Comment</span>
          <span className="flex items-center gap-1 text-[11px]"><Share2 className="w-3.5 h-3.5" /> Share</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Meta / Instagram Ad Mockup ─── */
const MetaPostMockup = ({ post }: { post: SocialPost }) => {
  const align = alignmentConfig[post.brandAlignment];
  const AlignIcon = align.icon;
  const isReel = post.format === "9:16";

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow relative">
      {/* Brand Alignment Badge */}
      <div className={`absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${align.className}`}>
        <AlignIcon className="w-3 h-3" />
        {align.label}
      </div>

      {/* Header */}
      <div className="px-3 py-2.5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-card flex items-center justify-center">
            <span className="text-[9px] font-bold text-card-foreground">B</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-xs font-semibold text-card-foreground">{post.brandName}</p>
            {!isReel && <span className="text-[10px] text-muted-foreground">and partner</span>}
          </div>
          <p className="text-[10px] text-muted-foreground">Sponsored</p>
        </div>
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Media */}
      <div className={`w-full ${isReel ? "aspect-[9/16] max-h-[420px]" : post.format === "1:1" ? "aspect-square max-h-[300px]" : "aspect-video max-h-[220px]"} bg-muted overflow-hidden relative`}>
        <img src={post.gifUrl} alt={post.headline} className="w-full h-full object-cover" loading="lazy" />
        <span className="absolute top-2 left-2 text-[10px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">
          {post.format}
        </span>
        {isReel && (
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-xs text-white font-medium drop-shadow-lg line-clamp-2">{post.body}</p>
          </div>
        )}
      </div>

      {/* CTA Button */}
      {post.cta && (
        <div className="px-3 py-2 border-t border-border">
          <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
            {post.cta}
          </button>
        </div>
      )}

      {/* Engagement */}
      <div className="px-3 py-2 border-t border-border flex items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-3">
          <Heart className="w-4 h-4" />
          <MessageCircle className="w-4 h-4" />
          <Send className="w-4 h-4" />
        </div>
        <Bookmark className="w-4 h-4" />
      </div>

      {/* Caption */}
      {!isReel && (
        <div className="px-3 pb-2.5">
          <p className="text-[11px] text-card-foreground">
            <span className="font-semibold">{post.brandName}</span>{" "}
            <span className="text-muted-foreground line-clamp-2">{post.body}</span>
          </p>
          {post.hashtags.length > 0 && (
            <p className="text-[10px] text-[hsl(210,80%,50%)] mt-0.5">{post.hashtags.join(" ")}</p>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── X / Twitter Ad Mockup ─── */
const XPostMockup = ({ post }: { post: SocialPost }) => {
  const align = alignmentConfig[post.brandAlignment];
  const AlignIcon = align.icon;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow relative">
      {/* Brand Alignment Badge */}
      <div className={`absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${align.className}`}>
        <AlignIcon className="w-3 h-3" />
        {align.label}
      </div>

      {/* Header */}
      <div className="px-4 py-3 flex items-start gap-2.5">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-foreground">B</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-card-foreground">{post.brandName}</p>
            <svg className="w-4 h-4 text-[hsl(210,80%,50%)]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" /></svg>
          </div>
          <p className="text-[11px] text-muted-foreground">{post.followerCount}</p>

          {/* Tweet body */}
          <p className="text-xs text-card-foreground whitespace-pre-line leading-relaxed mt-1.5">{post.body}</p>
          {post.hashtags.length > 0 && (
            <p className="text-xs text-[hsl(210,80%,50%)] mt-1">{post.hashtags.join(" ")}</p>
          )}

          {/* Media */}
          <div className={`w-full mt-2.5 rounded-xl overflow-hidden ${post.format === "9:16" ? "aspect-[9/16] max-h-[380px]" : post.format === "1:1" ? "aspect-square max-h-[280px]" : "aspect-video max-h-[200px]"} bg-muted relative`}>
            <img src={post.gifUrl} alt="Post media" className="w-full h-full object-cover" loading="lazy" />
            <span className="absolute bottom-2 right-2 text-[10px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">
              {post.format}
            </span>
          </div>

          <p className="text-[10px] text-muted-foreground mt-1.5">Promoted</p>

          {/* Engagement */}
          <div className="flex items-center gap-5 mt-2 text-muted-foreground">
            <span className="flex items-center gap-1 text-[11px]"><MessageCircle className="w-3.5 h-3.5" /> 24</span>
            <span className="flex items-center gap-1 text-[11px]"><Repeat2 className="w-3.5 h-3.5" /> 148</span>
            <span className="flex items-center gap-1 text-[11px]"><Heart className="w-3.5 h-3.5" /> 892</span>
            <span className="flex items-center gap-1 text-[11px]"><Bookmark className="w-3.5 h-3.5" /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostMockup = ({ post }: { post: SocialPost }) => {
  if (post.platform === "linkedin") return <LinkedInPostMockup post={post} />;
  if (post.platform === "meta") return <MetaPostMockup post={post} />;
  return <XPostMockup post={post} />;
};

interface SocialPostsViewProps {
  projectName: string;
  onBack: () => void;
}

const platformConfig = {
  linkedin: { label: "LinkedIn", icon: Linkedin, color: "text-[hsl(210,80%,45%)]" },
  meta: { label: "META", icon: Share2, color: "text-[hsl(210,80%,50%)]" },
  x: { label: "X", icon: Twitter, color: "text-foreground" },
};

const SocialPostsView = ({ projectName, onBack }: SocialPostsViewProps) => {
  const [generating, setGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "linkedin" | "meta" | "x">("all");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setGenerating(false), 500);
          return 100;
        }
        return p + 1.2;
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const filtered = activeTab === "all" ? mockPosts : mockPosts.filter((p) => p.platform === activeTab);

  const tabs: { key: typeof activeTab; label: string; count: number }[] = [
    { key: "all", label: "All Platforms", count: mockPosts.length },
    { key: "linkedin", label: "LinkedIn", count: mockPosts.filter((p) => p.platform === "linkedin").length },
    { key: "meta", label: "META", count: mockPosts.filter((p) => p.platform === "meta").length },
    { key: "x", label: "X", count: mockPosts.filter((p) => p.platform === "x").length },
  ];

  if (generating) {
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
            Generating social posts & ads
          </h2>
          <p className="text-sm text-muted-foreground">
            Crafting platform-optimized content for LinkedIn, META & X with tailored headlines, CTAs, and formats…
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            This may take a while as we're generating multiple ad variations across platforms and aspect ratios.
          </p>
        </div>
        <div className="w-64 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">
          {progress < 33 ? "Analyzing clip narratives…" : progress < 66 ? "Generating platform-specific content…" : "Finalizing ad creatives…"}
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
          <h2 className="text-lg font-semibold text-foreground">
            Generated Social Content
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-10">
          {mockPosts.length} posts and ads generated for <span className="font-medium text-foreground">{projectName}</span> across LinkedIn, META & X.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 ml-10 bg-muted rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Platform sections */}
        {activeTab === "all" ? (
          <>
            {(["linkedin", "meta", "x"] as const).map((platform) => {
              const posts = mockPosts.filter((p) => p.platform === platform);
              const config = platformConfig[platform];
              return (
                <div key={platform} className="mb-10 ml-10">
                  <div className="flex items-center gap-2 mb-4">
                    <config.icon className={`w-5 h-5 ${config.color}`} />
                    <h3 className="text-base font-semibold text-foreground">{config.label}</h3>
                    <span className="text-xs text-muted-foreground">({posts.length} posts)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {posts.map((post) => <PostMockup key={post.id} post={post} />)}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-10">
            {filtered.map((post) => <PostMockup key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialPostsView;
