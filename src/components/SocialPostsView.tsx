import { useState } from "react";
import { ArrowLeft, Linkedin, Twitter, Share2, ThumbsUp, MessageCircle, Repeat2, Heart, Bookmark, MoreHorizontal } from "lucide-react";

interface SocialPost {
  id: number;
  platform: "linkedin" | "meta" | "x";
  format: "9:16" | "16:9" | "1:1";
  headline: string;
  body: string;
  cta: string;
  hashtags: string[];
  gifUrl: string;
}

const mockPosts: SocialPost[] = [
  // LinkedIn
  { id: 1, platform: "linkedin", format: "1:1", headline: "We reduced content production costs by 60% with AI. Here's exactly how.", body: "Most companies are spending more on content, not less.\n\nWe went the other direction.\n\nBy implementing AI-driven content analysis across our video library, we found the 'aha moments' that audiences actually care about — and stopped producing everything else.\n\nThe result? 60% cost reduction. 3x engagement increase.\n\nHere's the framework we used 👇", cta: "Download the Full Framework →", hashtags: ["#AI", "#ContentStrategy", "#ThoughtLeadership", "#Marketing"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" },
  { id: 2, platform: "linkedin", format: "16:9", headline: "The attribution model you're using is fundamentally broken.", body: "I said this on a panel last week and the room went silent.\n\nBut here's the truth: last-touch attribution is lying to you about what's actually driving revenue.\n\nOur data shows that thought leadership content influences 78% of enterprise buying decisions — but it almost never gets credit in traditional attribution models.\n\nTime to rethink how we measure content ROI.", cta: "Watch the Full Panel Discussion →", hashtags: ["#B2BMarketing", "#Attribution", "#DataDriven"], gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" },
  { id: 3, platform: "linkedin", format: "9:16", headline: "Our CMO admitted we got it completely wrong. Here's what happened next.", body: "Vulnerability builds trust.\n\nWhen our CMO went on camera and said 'We got it completely wrong' — our engagement rate 5x'd overnight.\n\nWhy? Because people are tired of perfection. They want real stories from real leaders.\n\nThis 19-second clip generated more leads than our entire Q2 campaign.", cta: "See the Full Interview →", hashtags: ["#Leadership", "#Authenticity", "#CMO"], gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" },
  { id: 4, platform: "linkedin", format: "1:1", headline: "3 market insights that contradicted everything we assumed", body: "We ran the numbers on Q3 and the data told a completely different story.\n\n1️⃣ Remote workers are MORE productive (not less) — by 23%\n2️⃣ Enterprise buyers trust video over whitepapers 4:1\n3️⃣ The best-performing content is under 30 seconds\n\nSometimes the data forces you to change your mind.", cta: "Get the Full Q3 Report →", hashtags: ["#MarketInsights", "#DataDriven", "#B2B"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif" },

  // Meta
  { id: 5, platform: "meta", format: "9:16", headline: "60% cost reduction. One AI tool. Here's the proof.", body: "Stop overspending on content that doesn't convert.\n\nThis CEO just revealed how AI helped them find the exact moments that drive engagement — and cut everything else.\n\nWatch the 22-second clip that's changing how enterprises think about content.", cta: "Learn More", hashtags: ["#AI", "#ContentMarketing", "#Innovation"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" },
  { id: 6, platform: "meta", format: "1:1", headline: "This live demo shocked the entire audience", body: "When the dashboard revealed what users were ACTUALLY doing — the room gasped.\n\nSometimes the data tells a story nobody expected. This 20-second clip captures the exact moment.", cta: "Watch Now", hashtags: ["#DataAnalytics", "#ProductDemo", "#Tech"], gifUrl: "https://media.giphy.com/media/3oKIPnAiaMCJ8rJ1wQ/giphy.gif" },
  { id: 7, platform: "meta", format: "16:9", headline: "AI diagnostics outperformed humans by 23%. Here's the clip.", body: "This healthcare executive dropped a stat that changes everything.\n\nAI isn't just matching human performance — it's exceeding it. And the implications for every industry are massive.", cta: "See the Full Discussion", hashtags: ["#Healthcare", "#AI", "#Innovation"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif" },
  { id: 8, platform: "meta", format: "9:16", headline: "Behind the scenes: Watch a team hit their biggest milestone", body: "Raw, unfiltered joy.\n\nNo script. No polish. Just a team celebrating something real.\n\nThis 15-second clip is a reminder of why we do what we do.", cta: "Follow for More BTS", hashtags: ["#BehindTheScenes", "#TeamCulture", "#Startup"], gifUrl: "https://media.giphy.com/media/3o7btNhMBytxAM6YBa/giphy.gif" },

  // X
  { id: 9, platform: "x", format: "16:9", headline: "\"We reduced content costs by 60%\" — This CEO's keynote clip is going viral", body: "AI found the 'aha moments' in their video library.\nThey stopped producing everything else.\nResult: 60% savings, 3x engagement.\n\nThe clip that started it all 👇", cta: "", hashtags: ["#AI", "#ContentStrategy"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" },
  { id: 10, platform: "x", format: "1:1", headline: "Hot take: Last-touch attribution is lying to you.", body: "78% of enterprise buying decisions are influenced by thought leadership.\n\nBut your attribution model gives it 0% credit.\n\nThis panelist called it 'fundamentally broken' — and nobody disagreed.\n\nClip:", cta: "", hashtags: ["#Marketing", "#Attribution"], gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" },
  { id: 11, platform: "x", format: "9:16", headline: "A CMO said 'we got it completely wrong' on camera. Engagement 5x'd.", body: "Vulnerability > perfection.\n\nThis 19-second clip outperformed their entire Q2 campaign.\n\nAuthenticity wins. Every time.", cta: "", hashtags: ["#Leadership", "#Marketing"], gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" },
  { id: 12, platform: "x", format: "1:1", headline: "3 stats from Q3 that contradicted everything we assumed:", body: "1. Remote workers are 23% MORE productive\n2. Enterprise buyers trust video 4:1 over whitepapers\n3. Best-performing content is under 30 seconds\n\nThe data doesn't lie 📊", cta: "", hashtags: ["#Data", "#Trends"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif" },
];

const platformConfig = {
  linkedin: { label: "LinkedIn", icon: Linkedin, color: "text-[hsl(210,80%,45%)]", bg: "bg-[hsl(210,80%,96%)]" },
  meta: { label: "META", icon: Share2, color: "text-[hsl(210,80%,50%)]", bg: "bg-[hsl(210,80%,96%)]" },
  x: { label: "X", icon: Twitter, color: "text-foreground", bg: "bg-muted" },
};

const formatLabel: Record<string, string> = { "9:16": "Story / Reel", "16:9": "Landscape", "1:1": "Square" };

const PostMockup = ({ post }: { post: SocialPost }) => {
  const aspectClass = post.format === "9:16" ? "aspect-[9/16] max-h-[420px]" : post.format === "1:1" ? "aspect-square max-h-[320px]" : "aspect-video max-h-[240px]";

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
      {/* Platform header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${platformConfig[post.platform].bg} flex items-center justify-center`}>
            {(() => { const Icon = platformConfig[post.platform].icon; return <Icon className={`w-4 h-4 ${platformConfig[post.platform].color}`} />; })()}
          </div>
          <div>
            <p className="text-xs font-semibold text-card-foreground">Your Brand</p>
            <p className="text-[10px] text-muted-foreground">Sponsored · {formatLabel[post.format]}</p>
          </div>
        </div>
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Post body */}
      <div className="px-4 py-3">
        <p className="text-sm font-semibold text-card-foreground mb-1.5">{post.headline}</p>
        <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed line-clamp-4">{post.body}</p>
        {post.hashtags.length > 0 && (
          <p className="text-xs text-primary mt-2">{post.hashtags.join(" ")}</p>
        )}
      </div>

      {/* Media */}
      <div className={`w-full ${aspectClass} bg-muted overflow-hidden relative`}>
        <img src={post.gifUrl} alt={post.headline} className="w-full h-full object-cover" loading="lazy" />
        <span className="absolute top-2 right-2 text-[10px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">
          {post.format}
        </span>
      </div>

      {/* CTA */}
      {post.cta && (
        <div className="px-4 py-2.5 border-t border-border">
          <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
            {post.cta}
          </button>
        </div>
      )}

      {/* Engagement mock */}
      <div className="px-4 py-2.5 border-t border-border flex items-center gap-4 text-muted-foreground">
        {post.platform === "linkedin" ? (
          <>
            <span className="flex items-center gap-1 text-[11px]"><ThumbsUp className="w-3.5 h-3.5" /> Like</span>
            <span className="flex items-center gap-1 text-[11px]"><MessageCircle className="w-3.5 h-3.5" /> Comment</span>
            <span className="flex items-center gap-1 text-[11px]"><Repeat2 className="w-3.5 h-3.5" /> Repost</span>
          </>
        ) : post.platform === "x" ? (
          <>
            <span className="flex items-center gap-1 text-[11px]"><MessageCircle className="w-3.5 h-3.5" /> 24</span>
            <span className="flex items-center gap-1 text-[11px]"><Repeat2 className="w-3.5 h-3.5" /> 148</span>
            <span className="flex items-center gap-1 text-[11px]"><Heart className="w-3.5 h-3.5" /> 892</span>
            <span className="flex items-center gap-1 text-[11px]"><Bookmark className="w-3.5 h-3.5" /></span>
          </>
        ) : (
          <>
            <span className="flex items-center gap-1 text-[11px]"><Heart className="w-3.5 h-3.5" /> 1.2K</span>
            <span className="flex items-center gap-1 text-[11px]"><MessageCircle className="w-3.5 h-3.5" /> 89</span>
            <span className="flex items-center gap-1 text-[11px]"><Share2 className="w-3.5 h-3.5" /> Share</span>
          </>
        )}
      </div>
    </div>
  );
};

interface SocialPostsViewProps {
  projectName: string;
  onBack: () => void;
}

const SocialPostsView = ({ projectName, onBack }: SocialPostsViewProps) => {
  const [activeTab, setActiveTab] = useState<"all" | "linkedin" | "meta" | "x">("all");

  const filtered = activeTab === "all" ? mockPosts : mockPosts.filter((p) => p.platform === activeTab);

  const tabs: { key: typeof activeTab; label: string; count: number }[] = [
    { key: "all", label: "All Platforms", count: mockPosts.length },
    { key: "linkedin", label: "LinkedIn", count: mockPosts.filter((p) => p.platform === "linkedin").length },
    { key: "meta", label: "META", count: mockPosts.filter((p) => p.platform === "meta").length },
    { key: "x", label: "X", count: mockPosts.filter((p) => p.platform === "x").length },
  ];

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
