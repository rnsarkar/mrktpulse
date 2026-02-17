import { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Pencil } from "lucide-react";

interface PromptViewProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
}

const suggestions = [
  "Write a thought leadership article about AI in healthcare",
  "Create a LinkedIn post about industry trends",
  "Draft an executive summary for quarterly results",
  "Generate a keynote speech outline on innovation",
];

const PromptView = ({ projectName, onProjectNameChange }: PromptViewProps) => {
  const [prompt, setPrompt] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
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
              className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
            />
            <button
              disabled={!prompt.trim()}
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
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
    </div>
  );
};

export default PromptView;
