import { FolderOpen, MoreHorizontal, Clock, User } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  creator: string;
  lastModified: string;
  status: "active" | "draft" | "completed";
  postsCount: number;
}

const dummyProjects: Project[] = [
  {
    id: "1",
    name: "Q4 Brand Awareness Campaign",
    description: "Thought leadership content targeting enterprise CTOs across LinkedIn, META & X platforms.",
    creator: "Jonathan",
    lastModified: "2 hours ago",
    status: "active",
    postsCount: 12,
  },
  {
    id: "2",
    name: "Product Launch Series",
    description: "Multi-platform social campaign for the new AI analytics product launch.",
    creator: "Sarah K.",
    lastModified: "1 day ago",
    status: "completed",
    postsCount: 18,
  },
  {
    id: "3",
    name: "Industry Report Promotion",
    description: "Content promoting the annual State of Enterprise AI report across all channels.",
    creator: "Jonathan",
    lastModified: "3 days ago",
    status: "draft",
    postsCount: 8,
  },
  {
    id: "4",
    name: "Customer Success Stories",
    description: "Video clips and social posts featuring top customer testimonials and case studies.",
    creator: "Mike T.",
    lastModified: "1 week ago",
    status: "active",
    postsCount: 15,
  },
  {
    id: "5",
    name: "Webinar Repurposing",
    description: "Repurposed clips and posts from the Q3 executive webinar series.",
    creator: "Sarah K.",
    lastModified: "2 weeks ago",
    status: "completed",
    postsCount: 24,
  },
];

interface ProjectsViewProps {
  savedProject?: { name: string; postsCount: number } | null;
}

const statusConfig = {
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  draft: { label: "Draft", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  completed: { label: "Completed", className: "bg-primary/10 text-primary border-primary/20" },
};

const ProjectsView = ({ savedProject }: ProjectsViewProps) => {
  const allProjects: Project[] = [
    ...(savedProject
      ? [
          {
            id: "saved",
            name: savedProject.name,
            description: "Thought leadership content generated with AI-powered clip analysis and social post creation.",
            creator: "Jonathan",
            lastModified: "Just now",
            status: "active" as const,
            postsCount: savedProject.postsCount,
          },
        ]
      : []),
    ...dummyProjects,
  ];

  return (
    <div className="px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">{allProjects.length} projects</p>
        </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-card">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_140px_140px_120px_100px_40px] gap-4 px-5 py-3 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span>Project</span>
          <span>Creator</span>
          <span>Last Modified</span>
          <span>Status</span>
          <span>Posts</span>
          <span></span>
        </div>

        {/* Rows */}
        {allProjects.map((project) => {
          const status = statusConfig[project.status];
          return (
            <div
              key={project.id}
              className={`grid grid-cols-[1fr_140px_140px_120px_100px_40px] gap-4 px-5 py-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors items-center ${project.id === "saved" ? "bg-primary/5" : ""}`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{project.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                <span className="truncate">{project.creator}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span className="truncate">{project.lastModified}</span>
              </div>
              <div>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${status.className}`}>
                  {status.label}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">{project.postsCount} posts</div>
              <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsView;
