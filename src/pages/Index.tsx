import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import ThoughtLeadershipCard from "@/components/ThoughtLeadershipCard";
import PromptView from "@/components/PromptView";

const Index = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [view, setView] = useState<"home" | "prompt">("home");
  const [projectName, setProjectName] = useState("Untitled Project");

  return (
    <div className="flex h-screen bg-canvas">
      <AppSidebar activeItem={activeItem} onItemClick={(item) => {
        setActiveItem(item);
        if (item === "home") setView("home");
      }} />

      <main className="flex-1 overflow-auto">
        {view === "home" && (
          <div className="px-8 py-10">
            <h1 className="text-2xl font-semibold text-foreground mb-6">Home</h1>
            <div className="max-w-xs">
              <ThoughtLeadershipCard
                title="Thought Leadership Content"
                subtitle="Create AI-powered content"
                onClick={() => setView("prompt")}
              />
            </div>
          </div>
        )}

        {view === "prompt" && (
          <PromptView
            projectName={projectName}
            onProjectNameChange={setProjectName}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
