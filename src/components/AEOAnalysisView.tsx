import { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  ArrowRight,
  BarChart3,
  Eye,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Info,
  ChevronDown,
} from "lucide-react";

interface AEOAnalysisViewProps {
  onStartWorkflow: (topic: string) => void;
}

interface TopicRanking {
  rank: number;
  topic: string;
  url?: string;
}

interface Recommendation {
  id: string;
  type: "ad" | "post" | "blog";
  channel: string;
  topic: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

const defaultQuery = "enterprise AI security";

const mockMetrics: Record<string, { visibility: number; visibilityChange: number; sentiment: number; sentimentChange: number; llmScores: { name: string; icon: string; score: number }[]; topicRankings: TopicRanking[]; aviLow: number; aviLowChange: number; aviMedium: number; aviMediumChange: number; aviHigh: number; aviHighChange: number; aviSummary: string; recommendations: Recommendation[] }> = {
  default: {
    visibility: 86.2,
    visibilityChange: 1.8,
    sentiment: 64.7,
    sentimentChange: -1.7,
    llmScores: [
      { name: "Gemini", icon: "🔵", score: 96.1 },
      { name: "Perplexity", icon: "🟣", score: 94.2 },
      { name: "ChatGPT", icon: "🟢", score: 93.9 },
    ],
    topicRankings: [
      { rank: 1, topic: "Best AI security platforms" },
      { rank: 2, topic: "Top enterprise threat detection" },
      { rank: 3, topic: "AI vs traditional security" },
      { rank: 4, topic: "Best zero-trust solutions" },
      { rank: 5, topic: "Enterprise SIEM comparison" },
      { rank: 6, topic: "Best cloud security tools" },
    ],
    aviLow: 135,
    aviLowChange: 5,
    aviMedium: 101,
    aviMediumChange: 11,
    aviHigh: 237,
    aviHighChange: 40,
    aviSummary: "Your brand's overall AI Visibility Impact is High.",
    recommendations: [
      {
        id: "r1",
        type: "ad",
        channel: "LinkedIn",
        topic: "Zero-trust AI security for enterprise",
        title: "Sponsored Ad: Zero-Trust AI",
        description: "High-performing topic among CISOs. Create a LinkedIn sponsored ad highlighting your zero-trust capabilities.",
        priority: "high",
      },
      {
        id: "r2",
        type: "post",
        channel: "X (Twitter)",
        topic: "AI threat detection benchmarks",
        title: "Thread: Detection Benchmarks",
        description: "Trending topic with strong engagement. Publish a data-driven thread comparing detection rates.",
        priority: "high",
      },
      {
        id: "r3",
        type: "blog",
        channel: "Blog / SEO",
        topic: "Enterprise SIEM vs AI-native platforms",
        title: "Blog: SIEM Comparison Guide",
        description: "High search volume keyword. Create an in-depth comparison blog post to capture organic traffic.",
        priority: "medium",
      },
      {
        id: "r4",
        type: "ad",
        channel: "Meta",
        topic: "Cloud security automation",
        title: "Meta Ad: Cloud Security",
        description: "Rising interest among DevOps leaders. Create a visually engaging Meta ad for cloud security automation.",
        priority: "medium",
      },
      {
        id: "r5",
        type: "post",
        channel: "LinkedIn",
        topic: "AI compliance and governance",
        title: "Post: Compliance Insights",
        description: "Thought leadership opportunity. Share executive insights on AI governance frameworks.",
        priority: "low",
      },
    ],
  },
};

const getMetrics = (_query: string) => mockMetrics.default;

const typeColors: Record<string, string> = {
  ad: "bg-primary/10 text-primary",
  post: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  blog: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

const priorityColors: Record<string, string> = {
  high: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  low: "bg-muted text-muted-foreground border-border",
};

const AEOAnalysisView = ({ onStartWorkflow }: AEOAnalysisViewProps) => {
  const [searchQuery, setSearchQuery] = useState(defaultQuery);
  const [activeQuery, setActiveQuery] = useState(defaultQuery);
  const [selectedLLM, setSelectedLLM] = useState("ChatGPT");
  const [selectedAviLLM, setSelectedAviLLM] = useState("Gemini");
  const [isLoading, setIsLoading] = useState(true);

  const metrics = getMetrics(activeQuery);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, [activeQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) setActiveQuery(searchQuery.trim());
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="px-8 pt-6 pb-4">
        <p className="text-sm text-muted-foreground mb-1">
          <span>AEO Analysis</span>
          <span className="mx-1">/</span>
          <span className="text-foreground">Dashboard</span>
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          AI Engine Optimization
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Displaying data from 12:00AM EST today
        </p>
      </div>

      {/* Search bar + filters */}
      <div className="px-8 pb-6 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[300px] max-w-lg bg-card border border-border rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search any topic or brand..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Analyze
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-card border border-border rounded-md text-xs font-medium">
            📅 Apr – May
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-card border border-border rounded-md text-xs font-medium">
            Monthly <ChevronDown className="w-3 h-3" />
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-card border border-border rounded-md text-xs font-medium">
            🔵 3 LLMs <ChevronDown className="w-3 h-3" />
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-10 h-10 text-primary animate-pulse mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Analyzing "{activeQuery}" across AI engines...
            </p>
          </div>
        </div>
      ) : (
        <div className="px-8 pb-10 space-y-6">
          {/* Top metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Brand Visibility */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Eye className="w-3.5 h-3.5" />
                  Brand Visibility
                  <Info className="w-3 h-3 opacity-50" />
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground">{metrics.visibility}</p>
              <span className={`inline-flex items-center gap-1 text-xs font-medium mt-1 ${metrics.visibilityChange >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                {metrics.visibilityChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(metrics.visibilityChange)}%
              </span>
              <div className="mt-3 h-12 flex items-end gap-0.5">
                {[40, 55, 45, 65, 60, 70, 55, 75, 80, 72, 85, 86].map((v, i) => (
                  <div key={i} className="flex-1 bg-emerald-500/20 rounded-sm" style={{ height: `${v}%` }} />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Displaying data from all time</p>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Current Sentiment Analysis
                  <Info className="w-3 h-3 opacity-50" />
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground">{metrics.sentiment}</p>
              <span className={`inline-flex items-center gap-1 text-xs font-medium mt-1 ${metrics.sentimentChange >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                {metrics.sentimentChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(metrics.sentimentChange)}%
              </span>
              <div className="mt-3 h-12 flex items-end gap-0.5">
                {[60, 50, 55, 45, 50, 40, 55, 48, 52, 58, 62, 65].map((v, i) => (
                  <div key={i} className="flex-1 bg-destructive/20 rounded-sm" style={{ height: `${v}%` }} />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Displaying data from all time</p>
            </div>

            {/* Brand Visibility Score (LLM table) */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Brand Visibility Score
                  <Info className="w-3 h-3 opacity-50" />
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground">
                    <th className="text-left font-medium pb-2 w-8">#</th>
                    <th className="text-left font-medium pb-2">LLM</th>
                    <th className="text-right font-medium pb-2">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.llmScores.map((llm, i) => (
                    <tr key={llm.name} className="border-t border-border">
                      <td className="py-2.5 text-muted-foreground">{i + 1}</td>
                      <td className="py-2.5 font-medium text-foreground">
                        <span className="mr-1.5">{llm.icon}</span>
                        {llm.name}
                      </td>
                      <td className="py-2.5 text-right font-semibold text-foreground">{llm.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Optimization section */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">AI Optimization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Topic Ranking */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Sparkles className="w-3.5 h-3.5" />
                    Topic Ranking
                    <Info className="w-3 h-3 opacity-50" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-card border border-border rounded-md">
                    🟢 {selectedLLM} <ChevronDown className="w-2.5 h-2.5" />
                  </span>
                </div>
                <ul className="space-y-0">
                  {metrics.topicRankings.map((item) => (
                    <li
                      key={item.rank}
                      className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 text-sm"
                    >
                      <span className="text-muted-foreground w-5 text-right">{item.rank}</span>
                      <span className="text-foreground font-medium flex-1">{item.topic}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* AVI Assessment */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    ⚠️ AI Visibility Impact (AVI) Assessment
                    <Info className="w-3 h-3 opacity-50" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-card border border-border rounded-md">
                    🔵 {selectedAviLLM} <ChevronDown className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                    <p className="text-[10px] font-medium text-destructive mb-1">Low AVI</p>
                    <p className="text-2xl font-bold text-foreground">
                      {metrics.aviLow}
                      <span className="text-xs font-medium text-destructive ml-1">+{metrics.aviLowChange}</span>
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
                    <p className="text-[10px] font-medium text-amber-500 mb-1">Medium AVI</p>
                    <p className="text-2xl font-bold text-foreground">
                      {metrics.aviMedium}
                      <span className="text-xs font-medium text-amber-500 ml-1">+{metrics.aviMediumChange}</span>
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
                    <p className="text-[10px] font-medium text-emerald-500 mb-1">High AVI</p>
                    <p className="text-2xl font-bold text-foreground">
                      {metrics.aviHigh}
                      <span className="text-xs font-medium text-emerald-500 ml-1">+{metrics.aviHighChange}</span>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{metrics.aviSummary}</p>
                <button className="px-4 py-2 bg-secondary text-foreground text-sm font-medium rounded-lg hover:bg-accent transition-colors">
                  Optimization Hub
                </button>
              </div>
            </div>
          </div>

          {/* Content Recommendations */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Content Recommendations</h2>
            <p className="text-sm text-muted-foreground mb-4">
              AI-suggested content to create based on your AEO analysis for "{activeQuery}"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-card border border-border rounded-xl p-5 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${typeColors[rec.type]}`}>
                      {rec.type}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                      {rec.channel}
                    </span>
                    <span className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full border ${priorityColors[rec.priority]}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{rec.title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-foreground/70">Topic:</span> {rec.topic}
                  </p>
                  <p className="text-xs text-muted-foreground flex-1 mb-4">{rec.description}</p>
                  <button
                    onClick={() => onStartWorkflow(rec.topic)}
                    className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AEOAnalysisView;
