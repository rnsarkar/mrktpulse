import { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Pencil, Cloud, HardDrive } from "lucide-react";
import { AttachButton, ConnectSourceDialog } from "@/components/ConnectSource";

interface PromptViewProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onGenerate: () => void;
}

const suggestions = [
  "Write a thought leadership article about AI in healthcare",
  "Create a LinkedIn post about industry trends",
  "Draft an executive summary for quarterly results",
  "Generate a keynote speech outline on innovation",
];

const PromptView = ({ projectName, onProjectNameChange, onGenerate }: PromptViewProps) => {
  const [prompt, setPrompt] = useState("Analyze our content library and identify the most impactful video moments for thought leadership. Focus on executive insights, industry trends, and customer success stories that can be repurposed across LinkedIn, blog posts, and keynote presentations.");
  const [isEditingName, setIsEditingName] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [editValue, setEditValue] = useState(projectName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingName]);

  const commitRename = () => {
    const trimmed = editValue.trim();
    if (trimmed) onProjectNameChange(trimmed);
    else setEditValue(projectName);
    setIsEditingName(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="px-8 pt-6 pb-1">
        <p className="text-sm text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Projects</span>
          <span className="mx-1">/</span>
          {isEditingName ? (
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={commitRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitRename();
                if (e.key === "Escape") { setEditValue(projectName); setIsEditingName(false); }
              }}
              className="inline bg-transparent border-b border-primary/40 text-sm text-foreground outline-none px-0.5"
            />
          ) : (
            <button
              onClick={() => { setEditValue(projectName); setIsEditingName(true); }}
              className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
            >
              {projectName}
              <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
            </button>
          )}
        </p>
        <h1 className="text-2xl font-semibold text-foreground mt-1">
          Thought Leadership Content
        </h1>
      </div>

      {/* Centered prompt area */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              What would you like to create?
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Describe your thought leadership content and we'll generate it for you.
          </p>

          {/* Prompt input */}
          <div className="relative mb-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you'd like to generate..."
              rows={5}
              className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 pb-12 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AttachButton
                  onUploadClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.multiple = true;
                    input.click();
                  }}
                  onConnectClick={() => setConnectOpen(true)}
                />
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-accent text-muted-foreground px-2 py-1 rounded-md border border-border">
                  <Cloud className="w-3 h-3" /> Google Drive
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-accent text-muted-foreground px-2 py-1 rounded-md border border-border">
                  <HardDrive className="w-3 h-3" /> S3 Bucket
                </span>
              </div>
              <button
                disabled={!prompt.trim()}
                onClick={onGenerate}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                Generate
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Suggestions
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="text-left text-xs text-muted-foreground bg-card hover:bg-card-hover hover:text-foreground rounded-lg px-3 py-2.5 transition-colors border border-border hover:border-primary/20"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ConnectSourceDialog open={connectOpen} onClose={() => setConnectOpen(false)} />
    </div>
  );
};

export default PromptView;
