import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import ThoughtLeadershipCard from "@/components/ThoughtLeadershipCard";
import PromptView from "@/components/PromptView";
import ScanningView from "@/components/ScanningView";

const Index = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [view, setView] = useState<"home" | "prompt" | "scanning">("home");
  const [projectName, setProjectName] = useState("Untitled Project");

  return (
    <div className="flex h-screen bg-canvas">
      <AppSidebar activeItem={activeItem} onItemClick={(item) => {
        setActiveItem(item);
        if (item === "home") setView("home");
      }} />

      <main className="flex-1 overflow-auto flex flex-col">
        {view === "home" && (
          <div className="px-8 py-10">
            <h1 className="text-2xl font-semibold text-foreground mb-6">Home</h1>
            <div className="max-w-xs">
              <ThoughtLeadershipCard
                title="Thought Leadership Content"
                subtitle="Create AI-powered content"
                onClick={() => {
                  setView("prompt");
                  setActiveItem("projects");
                }}
              />
            </div>
          </div>
        )}

        {view === "prompt" && (
          <PromptView
            projectName={projectName}
            onProjectNameChange={setProjectName}
            onGenerate={() => setView("scanning")}
          />
        )}

        {view === "scanning" && (
          <div className="flex flex-col h-full">
            <div className="px-8 pt-6 pb-1">
              <p className="text-sm text-muted-foreground">
                <span className="hover:text-foreground cursor-pointer transition-colors">Projects</span>
                <span className="mx-1">/</span>
                <span className="text-foreground">{projectName}</span>
              </p>
              <h1 className="text-2xl font-semibold text-foreground mt-1">
                Thought Leadership Content
              </h1>
            </div>
            <ScanningView projectName={projectName} onBack={() => setView("prompt")} onNext={(ids) => { console.log("Selected videos:", ids); }} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
