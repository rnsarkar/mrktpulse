import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import ThoughtLeadershipCard from "@/components/ThoughtLeadershipCard";
import PromptDialog from "@/components/PromptDialog";

const cards = [
  { title: "Industry Insights Report", subtitle: "1 day ago" },
  { title: "LinkedIn Thought Piece", subtitle: "1 day ago" },
  { title: "Executive Blog Post", subtitle: "2 days ago" },
  { title: "Quarterly Trends Analysis", subtitle: "3 days ago" },
  { title: "Innovation Whitepaper", subtitle: "5 days ago" },
];

const Index = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [promptOpen, setPromptOpen] = useState(false);

  return (
    <div className="flex h-screen bg-canvas">
      <AppSidebar activeItem={activeItem} onItemClick={setActiveItem} />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Breadcrumb */}
        <div className="px-8 pt-6 pb-1">
          <p className="text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Projects</span>
            <span className="mx-1">/</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Untitled Project</span>
            <span className="mx-1">/</span>
          </p>
          <h1 className="text-2xl font-semibold text-foreground mt-1">
            Thought Leadership
          </h1>
        </div>

        {/* Cards grid */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cards.map((card) => (
              <ThoughtLeadershipCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                onClick={() => setPromptOpen(true)}
              />
            ))}
          </div>
        </div>
      </main>

      <PromptDialog open={promptOpen} onClose={() => setPromptOpen(false)} />
    </div>
  );
};

export default Index;
