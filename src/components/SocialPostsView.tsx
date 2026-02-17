import { useState, useEffect } from "react";
import { ArrowLeft, Linkedin, Twitter, Share2, ThumbsUp, MessageCircle, Repeat2, Heart, Bookmark, MoreHorizontal, Loader2, Sparkles, Send, ChevronDown, Shield, ShieldCheck, ShieldAlert, Activity, ChevronUp, Check, Zap, CheckCircle2, Rocket } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

interface ResonanceResult {
  postId: number;
  score: "high" | "medium" | "low";
  strengths: string[];
  improvements: string[];
}

const industries = ["Technology", "Healthcare", "Financial Services", "Manufacturing", "Retail & E-Commerce", "Media & Entertainment", "Energy & Utilities", "Education"];

const rolesByIndustry: Record<string, string[]> = {
  "Technology": ["CTO", "CMO", "CSO", "VP of Product", "VP of Growth Marketing", "Director of Security", "VP of Engineering"],
  "Healthcare": ["CTO", "CMO", "CSO", "VP of Product", "VP of Growth Marketing", "Director of Security", "Chief Medical Officer"],
  "Financial Services": ["CTO", "CMO", "CSO", "VP of Product", "VP of Growth Marketing", "Director of Security", "Chief Risk Officer"],
  "Manufacturing": ["CTO", "CMO", "CSO", "VP of Product", "VP of Growth Marketing", "Director of Security", "VP of Operations"],
  "Retail & E-Commerce": ["CTO", "CMO", "CSO", "VP of Product", "VP of Growth Marketing", "Director of Security", "VP of Merchandising"],
  "Media & Entertainment": ["CTO", "CMO", "CSO", "VP of Product", "VP of Growth Marketing", "Director of Security", "VP of Content"],
  "Energy & Utilities": ["CTO", "CMO", "CSO", "VP of Product", "VP of Growth Marketing", "Director of Security", "VP of Sustainability"],
  "Education": ["CTO", "CMO", "CSO", "VP of Product", "VP of Growth Marketing", "Director of Security", "Dean of Programs"],
};

const mockResonanceResults: ResonanceResult[] = [
  { postId: 1, score: "high", strengths: ["Strong data-driven narrative resonates with enterprise leaders", "Clear ROI messaging aligns with C-suite priorities"], improvements: ["Consider adding industry-specific benchmarks"] },
  { postId: 2, score: "high", strengths: ["Panel credibility establishes authority", "Contrarian take grabs attention"], improvements: ["CTA could be more specific about registration value"] },
  { postId: 3, score: "medium", strengths: ["Vulnerability angle is authentic", "Short-form content aligns with trends"], improvements: ["'Got it wrong' framing may not resonate with risk-averse leaders", "Add what was learned for a stronger payoff"] },
  { postId: 4, score: "high", strengths: ["Listicle format is scannable", "Each stat challenges assumptions"], improvements: ["Add source attribution for statistics"] },
  { postId: 5, score: "high", strengths: ["Direct cost-saving hook is compelling", "Proof-based messaging reduces skepticism"], improvements: ["'Shop now' CTA doesn't match B2B tone—consider 'Learn more'"] },
  { postId: 6, score: "medium", strengths: ["Live demo social proof is powerful"], improvements: ["'Shocked' language may feel clickbaity to executives", "Needs more specificity"] },
  { postId: 7, score: "low", strengths: ["Healthcare AI is timely and relevant"], improvements: ["23% claim needs citation", "Copy lacks specificity", "CTA is generic"] },
  { postId: 8, score: "medium", strengths: ["Authentic behind-the-scenes builds affinity"], improvements: ["Lacks clear business takeaway", "May not drive engagement from leadership"] },
  { postId: 9, score: "high", strengths: ["Conversational X-native tone", "Viral content hook drives curiosity"], improvements: ["Coffee intro may confuse AI/tech audience"] },
  { postId: 10, score: "medium", strengths: ["Contrarian take is attention-grabbing"], improvements: ["Needs a solution or next step", "Attribution stat needs a source"] },
  { postId: 11, score: "high", strengths: ["Concise, punchy format perfect for X", "Concrete metric (5x) adds credibility"], improvements: ["Add what the CMO learned for stronger narrative"] },
  { postId: 12, score: "low", strengths: ["Data-driven content is valuable"], improvements: ["Stats without sources will be challenged", "'30 seconds' contradicts long-form positioning", "Needs a stronger hook"] },
];

const mockPosts: SocialPost[] = [
  { id: 1, platform: "linkedin", format: "1:1", headline: "Ten ways to improve customer productivity and see results", body: "We reduced content production costs by 60% with AI. Here's exactly how.\n\nMost companies are spending more on content, not less. We went the other direction.\n\nBy implementing AI-driven content analysis across our video library, we found the 'aha moments' that audiences actually care about.", cta: "Learn more", hashtags: ["#AI", "#ContentStrategy", "#ThoughtLeadership"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif", brandName: "Your Brand", followerCount: "12,847 followers", brandAlignment: "high" },
  { id: 2, platform: "linkedin", format: "16:9", headline: "Experience the power of enterprise AI. Join us at this year's global conference.", body: "I said this on a panel last week and the room went silent.\n\nBut here's the truth: last-touch attribution is lying to you about what's actually driving revenue.\n\nOur data shows that thought leadership content influences 78% of enterprise buying decisions.", cta: "Register", hashtags: ["#B2BMarketing", "#Attribution", "#DataDriven"], gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif", brandName: "Techcore AI", followerCount: "8,234 followers", brandAlignment: "high" },
  { id: 3, platform: "linkedin", format: "9:16", headline: "Our CMO admitted we got it completely wrong. Here's what happened next.", body: "Vulnerability builds trust.\n\nWhen our CMO went on camera and said 'We got it completely wrong' — our engagement rate 5x'd overnight.\n\nThis 19-second clip generated more leads than our entire Q2 campaign.", cta: "Watch the Full Interview", hashtags: ["#Leadership", "#Authenticity", "#CMO"], gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif", brandName: "Your Brand", followerCount: "12,847 followers", brandAlignment: "medium" },
  { id: 4, platform: "linkedin", format: "1:1", headline: "3 market insights that contradicted everything we assumed", body: "We ran the numbers on Q3 and the data told a completely different story.\n\n1️⃣ Remote workers are MORE productive (not less) — by 23%\n2️⃣ Enterprise buyers trust video over whitepapers 4:1\n3️⃣ The best-performing content is under 30 seconds", cta: "Get the Full Report", hashtags: ["#MarketInsights", "#DataDriven", "#B2B"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif", brandName: "Your Brand", followerCount: "12,847 followers", brandAlignment: "high" },
  { id: 5, platform: "meta", format: "9:16", headline: "60% cost reduction. One AI tool. Here's the proof.", body: "Stop overspending on content that doesn't convert.\n\nThis CEO just revealed how AI helped them find the exact moments that drive engagement — and cut everything else.", cta: "Shop now", hashtags: ["#AI", "#ContentMarketing", "#Innovation"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif", brandName: "laleurbeauty", followerCount: "", brandAlignment: "high" },
  { id: 6, platform: "meta", format: "1:1", headline: "This live demo shocked the entire audience", body: "When the dashboard revealed what users were ACTUALLY doing — the room gasped.\n\nSometimes the data tells a story nobody expected.", cta: "Shop now", hashtags: ["#DataAnalytics", "#ProductDemo", "#Tech"], gifUrl: "https://media.giphy.com/media/3oKIPnAiaMCJ8rJ1wQ/giphy.gif", brandName: "laleurbeauty", followerCount: "", brandAlignment: "medium" },
  { id: 7, platform: "meta", format: "16:9", headline: "AI diagnostics outperformed humans by 23%. Here's the clip.", body: "This healthcare executive dropped a stat that changes everything.\n\nAI isn't just matching human performance — it's exceeding it.", cta: "Learn More", hashtags: ["#Healthcare", "#AI", "#Innovation"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif", brandName: "laleurbeauty", followerCount: "", brandAlignment: "low" },
  { id: 8, platform: "meta", format: "9:16", headline: "Behind the scenes: Watch a team hit their biggest milestone", body: "Raw, unfiltered joy.\n\nNo script. No polish. Just a team celebrating something real.\n\nThis 15-second clip is a reminder of why we do what we do.", cta: "Follow for More", hashtags: ["#BehindTheScenes", "#TeamCulture", "#Startup"], gifUrl: "https://media.giphy.com/media/3o7btNhMBytxAM6YBa/giphy.gif", brandName: "laleurbeauty", followerCount: "", brandAlignment: "high" },
  { id: 9, platform: "x", format: "16:9", headline: "", body: "☕ Love coffee? We've partnered with local coffee bean roasters to bring you the best flavors in San Francisco.\n\nThis CEO's keynote clip on AI cost reduction is going viral — 60% savings, 3x engagement.\n\nThe clip that started it all 👇", cta: "", hashtags: ["#AI", "#ContentStrategy"], gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif", brandName: "The Barista Bar", followerCount: "@BaristaBar", brandAlignment: "high" },
  { id: 10, platform: "x", format: "1:1", headline: "", body: "Hot take: Last-touch attribution is lying to you.\n\n78% of enterprise buying decisions are influenced by thought leadership.\n\nBut your attribution model gives it 0% credit.\n\nThis panelist called it 'fundamentally broken' — and nobody disagreed.", cta: "", hashtags: ["#Marketing", "#Attribution"], gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif", brandName: "Your Brand", followerCount: "@YourBrand", brandAlignment: "medium" },
  { id: 11, platform: "x", format: "9:16", headline: "", body: "A CMO said 'we got it completely wrong' on camera.\n\nEngagement 5x'd.\n\nVulnerability > perfection.\n\nThis 19-second clip outperformed their entire Q2 campaign.", cta: "", hashtags: ["#Leadership", "#Marketing"], gifUrl: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif", brandName: "Your Brand", followerCount: "@YourBrand", brandAlignment: "high" },
  { id: 12, platform: "x", format: "1:1", headline: "", body: "3 stats from Q3 that contradicted everything we assumed:\n\n1. Remote workers are 23% MORE productive\n2. Enterprise buyers trust video 4:1 over whitepapers\n3. Best-performing content is under 30 seconds\n\nThe data doesn't lie 📊", cta: "", hashtags: ["#Data", "#Trends"], gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif", brandName: "Your Brand", followerCount: "@YourBrand", brandAlignment: "low" },
];

const alignmentConfig = {
  high: { label: "High", icon: ShieldCheck, className: "bg-emerald-500/90 text-white", detailColor: "text-emerald-500", description: "Strong brand alignment", details: ["Visual identity matches brand guidelines", "Messaging tone is consistent with brand voice", "CTA aligns with campaign objectives", "Audience targeting matches brand persona"] },
  medium: { label: "Medium", icon: Shield, className: "bg-amber-500/90 text-white", detailColor: "text-amber-500", description: "Moderate brand alignment", details: ["Some messaging deviates from brand guidelines", "Visual elements could be more on-brand", "CTA may need refinement for target audience", "Consider adjusting tone for better consistency"] },
  low: { label: "Low", icon: ShieldAlert, className: "bg-red-500/90 text-white", detailColor: "text-destructive", description: "Weak brand alignment", details: ["Messaging significantly deviates from brand voice", "Visual assets need brand review", "CTA does not match campaign goals", "Audience targeting may be misaligned", "Recommend full creative revision before publishing"] },
};

const resonanceConfig = {
  high: { label: "Strong", color: "bg-emerald-500/90 text-white" },
  medium: { label: "Mixed", color: "bg-amber-500/90 text-white" },
  low: { label: "Weak", color: "bg-red-500/90 text-white" },
};

const BrandAlignmentModal = ({ open, onClose, post }: { open: boolean; onClose: () => void; post: SocialPost }) => {
  const config = alignmentConfig[post.brandAlignment];
  const AlignIcon = config.icon;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlignIcon className={`w-5 h-5 ${config.detailColor}`} />
            Brand Alignment Score
          </DialogTitle>
          <DialogDescription>
            Brand consistency analysis for this {post.platform === "meta" ? "META" : post.platform === "x" ? "X" : "LinkedIn"} {post.format} post
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Score:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className}`}>{config.label} Alignment</span>
          </div>
          <p className="text-sm text-muted-foreground">{config.description}</p>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Assessment Details</h4>
            <ul className="space-y-1.5">
              {config.details.map((d, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${post.brandAlignment === "high" ? "bg-emerald-500" : post.brandAlignment === "medium" ? "bg-amber-500" : "bg-destructive"}`} />{d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ResonanceFeedbackModal = ({ open, onClose, result, post }: { open: boolean; onClose: () => void; result: ResonanceResult; post: SocialPost }) => {
  const config = resonanceConfig[result.score];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Resonance Analysis
          </DialogTitle>
          <DialogDescription>
            AI audience prediction for this {post.platform === "meta" ? "META" : post.platform === "x" ? "X" : "LinkedIn"} {post.format} post
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Prediction:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.color}`}>{config.label} Resonance</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" /> What's Working
            </h4>
            <ul className="space-y-1.5">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />{s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> Needs Improvement
            </h4>
            <ul className="space-y-1.5">
              {result.improvements.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PostMockup = ({ post, resonance, onResonanceClick, onBrandClick, isSelected, onSelect, isPublished }: { post: SocialPost; resonance?: ResonanceResult; onResonanceClick?: () => void; onBrandClick?: () => void; isSelected?: boolean; onSelect?: () => void; isPublished?: boolean }) => {
  const align = alignmentConfig[post.brandAlignment];
  const AlignIcon = align.icon;
  const res = resonance ? resonanceConfig[resonance.score] : null;

  const BadgesRow = () => (
    <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
      {res && (
        <button onClick={onResonanceClick} className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${res.color} hover:opacity-80 transition-opacity cursor-pointer`}>
          <Activity className="w-3 h-3" />{res.label}
        </button>
      )}
      <button onClick={onBrandClick} className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${align.className} hover:opacity-80 transition-opacity cursor-pointer`}>
        <AlignIcon className="w-3 h-3" />{align.label}
      </button>
    </div>
  );

  const SelectOverlay = () => (
    <div className="absolute top-2 left-2 z-10">
      <button
        onClick={onSelect}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/40 bg-card/80 hover:border-primary/60"}`}
      >
        {isSelected && <Check className="w-3.5 h-3.5" />}
      </button>
    </div>
  );

  const PublishedBanner = () => isPublished ? (
    <div className="absolute bottom-0 left-0 right-0 z-10 bg-emerald-500/90 text-white text-[10px] font-semibold flex items-center justify-center gap-1 py-1">
      <CheckCircle2 className="w-3 h-3" /> Published
    </div>
  ) : null;

  if (post.platform === "linkedin") {
    return (
      <div className={`bg-card rounded-xl border overflow-hidden hover:shadow-md transition-all relative ${isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"} ${isPublished ? "opacity-80" : ""}`}>
        <SelectOverlay />
        <BadgesRow />
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(210,80%,96%)] flex items-center justify-center"><Linkedin className="w-5 h-5 text-[hsl(210,80%,45%)]" /></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5"><p className="text-sm font-semibold text-card-foreground truncate">{post.brandName}</p><span className="text-[10px] text-muted-foreground">• Following</span></div>
            <p className="text-[10px] text-muted-foreground">{post.followerCount}</p>
            <p className="text-[10px] text-muted-foreground">Promoted</p>
          </div>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="px-4 pb-3">
          <p className="text-xs text-card-foreground whitespace-pre-line leading-relaxed line-clamp-4">{post.body}</p>
          {post.hashtags.length > 0 && <p className="text-xs text-[hsl(210,80%,45%)] mt-1.5">{post.hashtags.join(" ")}</p>}
        </div>
        <div className={`w-full ${post.format === "9:16" ? "aspect-[9/16] max-h-[400px]" : post.format === "1:1" ? "aspect-square max-h-[300px]" : "aspect-video max-h-[220px]"} bg-muted overflow-hidden relative`}>
          <img src={post.gifUrl} alt={post.headline} className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-2 left-10 text-[10px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">{post.format}</span>
          <PublishedBanner />
        </div>
        <div className="px-4 py-2.5 border-t border-border flex items-center justify-between">
          <p className="text-xs font-medium text-card-foreground line-clamp-1">{post.headline}</p>
          {post.cta && <button className="px-3 py-1.5 rounded-full border border-primary text-primary text-[11px] font-semibold hover:bg-primary/5 transition-colors whitespace-nowrap">{post.cta}</button>}
        </div>
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
  }

  if (post.platform === "meta") {
    const isReel = post.format === "9:16";
    return (
      <div className={`bg-card rounded-xl border overflow-hidden hover:shadow-md transition-all relative ${isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"} ${isPublished ? "opacity-80" : ""}`}>
        <SelectOverlay />
        <BadgesRow />
        <div className="px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-card flex items-center justify-center"><span className="text-[9px] font-bold text-card-foreground">B</span></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1"><p className="text-xs font-semibold text-card-foreground">{post.brandName}</p></div>
            <p className="text-[10px] text-muted-foreground">Sponsored</p>
          </div>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className={`w-full ${isReel ? "aspect-[9/16] max-h-[420px]" : post.format === "1:1" ? "aspect-square max-h-[300px]" : "aspect-video max-h-[220px]"} bg-muted overflow-hidden relative`}>
          <img src={post.gifUrl} alt={post.headline} className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-2 left-10 text-[10px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">{post.format}</span>
          {isReel && <div className="absolute bottom-3 left-3 right-3"><p className="text-xs text-white font-medium drop-shadow-lg line-clamp-2">{post.body}</p></div>}
          <PublishedBanner />
        </div>
        {post.cta && <div className="px-3 py-2 border-t border-border"><button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">{post.cta}</button></div>}
        <div className="px-3 py-2 border-t border-border flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-3"><Heart className="w-4 h-4" /><MessageCircle className="w-4 h-4" /><Send className="w-4 h-4" /></div>
          <Bookmark className="w-4 h-4" />
        </div>
        {!isReel && <div className="px-3 pb-2.5"><p className="text-[11px] text-card-foreground"><span className="font-semibold">{post.brandName}</span> <span className="text-muted-foreground line-clamp-2">{post.body}</span></p>{post.hashtags.length > 0 && <p className="text-[10px] text-[hsl(210,80%,50%)] mt-0.5">{post.hashtags.join(" ")}</p>}</div>}
      </div>
    );
  }

  // X/Twitter
  return (
    <div className={`bg-card rounded-xl border overflow-hidden hover:shadow-md transition-all relative ${isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"} ${isPublished ? "opacity-80" : ""}`}>
      <SelectOverlay />
      <BadgesRow />
      <div className="px-4 py-3 flex items-start gap-2.5">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><span className="text-xs font-bold text-foreground">B</span></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-card-foreground">{post.brandName}</p>
            <svg className="w-4 h-4 text-[hsl(210,80%,50%)]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" /></svg>
          </div>
          <p className="text-[11px] text-muted-foreground">{post.followerCount}</p>
          <p className="text-xs text-card-foreground whitespace-pre-line leading-relaxed mt-1.5">{post.body}</p>
          {post.hashtags.length > 0 && <p className="text-xs text-[hsl(210,80%,50%)] mt-1">{post.hashtags.join(" ")}</p>}
          <div className={`w-full mt-2.5 rounded-xl overflow-hidden ${post.format === "9:16" ? "aspect-[9/16] max-h-[380px]" : post.format === "1:1" ? "aspect-square max-h-[280px]" : "aspect-video max-h-[200px]"} bg-muted relative`}>
            <img src={post.gifUrl} alt="Post media" className="w-full h-full object-cover" loading="lazy" />
            <span className="absolute bottom-2 right-2 text-[10px] font-medium bg-foreground/70 text-background px-1.5 py-0.5 rounded">{post.format}</span>
            <PublishedBanner />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5">Promoted</p>
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

const IndustryRoleSelector = ({ selectedIndustries, setSelectedIndustries, selectedRoles, setSelectedRoles }: {
  selectedIndustries: string[];
  setSelectedIndustries: (v: string[]) => void;
  selectedRoles: Record<string, string[]>;
  setSelectedRoles: (v: Record<string, string[]>) => void;
}) => {
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
      const newRoles = { ...selectedRoles };
      delete newRoles[industry];
      setSelectedRoles(newRoles);
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
      setSelectedRoles({ ...selectedRoles, [industry]: [...(rolesByIndustry[industry] || [])] });
    }
  };

  const toggleRole = (industry: string, role: string) => {
    const current = selectedRoles[industry] || [];
    if (current.includes(role)) {
      setSelectedRoles({ ...selectedRoles, [industry]: current.filter((r) => r !== role) });
    } else {
      setSelectedRoles({ ...selectedRoles, [industry]: [...current, role] });
    }
  };

  return (
    <div className="space-y-2 max-h-[340px] overflow-auto pr-1">
      {industries.map((industry) => {
        const isSelected = selectedIndustries.includes(industry);
        const isExpanded = expandedIndustry === industry;
        const roles = rolesByIndustry[industry] || [];
        const activeRoles = selectedRoles[industry] || [];
        return (
          <div key={industry} className="border border-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 hover:bg-accent/50 transition-colors">
              <Checkbox checked={isSelected} onCheckedChange={() => toggleIndustry(industry)} className="h-4 w-4" />
              <button className="flex-1 text-left text-sm font-medium text-foreground" onClick={() => { if (!isSelected) toggleIndustry(industry); setExpandedIndustry(isExpanded ? null : industry); }}>
                {industry}
              </button>
              {isSelected && (
                <>
                  <span className="text-[10px] text-muted-foreground">{activeRoles.length}/{roles.length}</span>
                  <button onClick={() => setExpandedIndustry(isExpanded ? null : industry)}>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                  </button>
                </>
              )}
            </div>
            {isSelected && isExpanded && (
              <div className="px-3 pb-2.5 grid grid-cols-2 gap-1.5">
                {roles.map((role) => (
                  <label key={role} className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    <Checkbox checked={activeRoles.includes(role)} onCheckedChange={() => toggleRole(industry, role)} className="h-3.5 w-3.5" />
                    {role}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
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

  const [resonanceModalOpen, setResonanceModalOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string[]>>({});
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [resonanceResults, setResonanceResults] = useState<ResonanceResult[]>([]);
  const [feedbackPost, setFeedbackPost] = useState<{ post: SocialPost; result: ResonanceResult } | null>(null);
  const [brandFeedbackPost, setBrandFeedbackPost] = useState<SocialPost | null>(null);

  // Activate/Publish state
  const [selectedPostIds, setSelectedPostIds] = useState<Set<number>>(new Set());
  const [publishedPostIds, setPublishedPostIds] = useState<Set<number>>(new Set());
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setGenerating(false), 500); return 100; }
        return p + 1.2;
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const runSimulation = () => {
    setResonanceModalOpen(false);
    setSimulationRunning(true);
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress((p) => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => { setResonanceResults(mockResonanceResults); setSimulationRunning(false); }, 400); return 100; }
        return p + 0.8;
      });
    }, 80);
  };

  const togglePostSelection = (postId: number) => {
    if (publishedPostIds.has(postId)) return;
    setSelectedPostIds(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const handleActivate = () => {
    setConfirmModalOpen(true);
  };

  const confirmPublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishedPostIds(prev => {
        const next = new Set(prev);
        selectedPostIds.forEach(id => next.add(id));
        return next;
      });
      setSelectedPostIds(new Set());
      setPublishing(false);
      setConfirmModalOpen(false);
    }, 1500);
  };

  const filtered = activeTab === "all" ? mockPosts : mockPosts.filter((p) => p.platform === activeTab);
  const totalSelectedRoles = Object.values(selectedRoles).reduce((sum, r) => sum + r.length, 0);
  const selectedPostsForConfirm = mockPosts.filter(p => selectedPostIds.has(p.id));

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
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"><Sparkles className="w-8 h-8 text-primary animate-pulse" /></div>
          <Loader2 className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-spin" />
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-lg font-semibold text-foreground mb-1">Generating social posts & ads</h2>
          <p className="text-sm text-muted-foreground">Crafting platform-optimized content for LinkedIn, META & X…</p>
          <p className="text-xs text-muted-foreground/70 mt-2">This may take a while as we're generating multiple ad variations.</p>
        </div>
        <div className="w-64 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">{progress < 33 ? "Analyzing clip narratives…" : progress < 66 ? "Generating platform-specific content…" : "Finalizing ad creatives…"}</p>
      </div>
    );
  }

  if (simulationRunning) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"><Activity className="w-8 h-8 text-primary animate-pulse" /></div>
          <Loader2 className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-spin" />
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-lg font-semibold text-foreground mb-1">Running Resonance Simulation</h2>
          <p className="text-sm text-muted-foreground">Testing your ads against an AI audience of {totalSelectedRoles} leadership personas across {selectedIndustries.length} {selectedIndustries.length === 1 ? "industry" : "industries"}…</p>
          <p className="text-xs text-muted-foreground/70 mt-2">Predicting engagement, click-through rates, and message resonance.</p>
        </div>
        <div className="w-64 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${simProgress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">{simProgress < 25 ? "Building audience personas…" : simProgress < 50 ? "Simulating content exposure…" : simProgress < 75 ? "Analyzing resonance signals…" : "Compiling prediction report…"}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto flex flex-col">
      <div className="px-8 py-6 flex-1">
        {/* Header with Resonance button & Activate button */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-semibold text-foreground">Generated Social Content</h2>
          </div>
          <div className="flex items-center gap-2">
            {selectedPostIds.size > 0 && (
              <Button onClick={handleActivate} size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                <Rocket className="w-4 h-4" />
                Activate ({selectedPostIds.size})
              </Button>
            )}
            <button
              onClick={() => setResonanceModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all"
            >
              <Activity className="w-4 h-4" />
              Resonance Prediction
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-10">
          {mockPosts.length} posts and ads generated for <span className="font-medium text-foreground">{projectName}</span> across LinkedIn, META & X.
          {resonanceResults.length > 0 && <span className="ml-1 text-primary font-medium">• Resonance scores applied</span>}
          {publishedPostIds.size > 0 && <span className="ml-1 text-emerald-500 font-medium">• {publishedPostIds.size} published</span>}
        </p>

        <div className="flex items-center gap-1 mb-6 ml-10 bg-muted rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

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
                    {posts.map((post) => {
                      const res = resonanceResults.find((r) => r.postId === post.id);
                      return (
                        <PostMockup
                          key={post.id}
                          post={post}
                          resonance={res}
                          onResonanceClick={() => res && setFeedbackPost({ post, result: res })}
                          onBrandClick={() => setBrandFeedbackPost(post)}
                          isSelected={selectedPostIds.has(post.id)}
                          onSelect={() => togglePostSelection(post.id)}
                          isPublished={publishedPostIds.has(post.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-10">
            {filtered.map((post) => {
              const res = resonanceResults.find((r) => r.postId === post.id);
              return (
                <PostMockup
                  key={post.id}
                  post={post}
                  resonance={res}
                  onResonanceClick={() => res && setFeedbackPost({ post, result: res })}
                  onBrandClick={() => setBrandFeedbackPost(post)}
                  isSelected={selectedPostIds.has(post.id)}
                  onSelect={() => togglePostSelection(post.id)}
                  isPublished={publishedPostIds.has(post.id)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Resonance Prediction Modal */}
      <Dialog open={resonanceModalOpen} onOpenChange={setResonanceModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Resonance Prediction</DialogTitle>
            <DialogDescription>Select target industries and leadership roles to simulate how your content will resonate with AI audience personas.</DialogDescription>
          </DialogHeader>
          <IndustryRoleSelector selectedIndustries={selectedIndustries} setSelectedIndustries={setSelectedIndustries} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
          {selectedIndustries.length > 0 && (
            <p className="text-xs text-muted-foreground">{selectedIndustries.length} {selectedIndustries.length === 1 ? "industry" : "industries"} selected • {totalSelectedRoles} leadership roles</p>
          )}
          <Button onClick={runSimulation} disabled={selectedIndustries.length === 0 || totalSelectedRoles === 0} className="w-full gap-2">
            <Sparkles className="w-4 h-4" /> Run Simulation
          </Button>
        </DialogContent>
      </Dialog>

      {/* Resonance Feedback Modal */}
      {feedbackPost && <ResonanceFeedbackModal open={!!feedbackPost} onClose={() => setFeedbackPost(null)} result={feedbackPost.result} post={feedbackPost.post} />}

      {/* Brand Alignment Modal */}
      {brandFeedbackPost && <BrandAlignmentModal open={!!brandFeedbackPost} onClose={() => setBrandFeedbackPost(null)} post={brandFeedbackPost} />}

      {/* Activate Confirmation Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={(v) => !publishing && setConfirmModalOpen(v)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-emerald-500" />
              Activate Posts
            </DialogTitle>
            <DialogDescription>
              You're about to publish {selectedPostsForConfirm.length} post{selectedPostsForConfirm.length > 1 ? "s" : ""} to their respective platforms.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-[200px] overflow-auto">
            {selectedPostsForConfirm.map(post => (
              <div key={post.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 border border-border">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  {post.platform === "linkedin" && <Linkedin className="w-4 h-4 text-[hsl(210,80%,45%)]" />}
                  {post.platform === "meta" && <Share2 className="w-4 h-4 text-[hsl(210,80%,50%)]" />}
                  {post.platform === "x" && <Twitter className="w-4 h-4 text-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{post.headline || post.body.slice(0, 60) + "..."}</p>
                  <p className="text-[10px] text-muted-foreground">{platformConfig[post.platform].label} • {post.format}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)} disabled={publishing} className="flex-1">
              Cancel
            </Button>
            <Button onClick={confirmPublish} disabled={publishing} className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              {publishing ? "Publishing..." : "Confirm & Publish"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialPostsView;
