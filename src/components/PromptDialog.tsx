import { useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";

interface PromptDialogProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = [
  "Write a thought leadership article about AI in healthcare",
  "Create a LinkedIn post about industry trends",
  "Draft an executive summary for quarterly results",
  "Generate a keynote speech outline on innovation",
];

const PromptDialog = ({ open, onClose }: PromptDialogProps) => {
  const [prompt, setPrompt] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-card-foreground">
              Thought Leadership
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="px-6 text-sm text-muted-foreground mb-4">
          What would you like to create?
        </p>

        {/* Prompt input */}
        <div className="px-6 pb-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you'd like to generate..."
              rows={4}
              className="w-full resize-none rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
            <button
              disabled={!prompt.trim()}
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="px-6 pb-5">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Suggestions
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="text-left text-xs text-muted-foreground bg-accent hover:bg-accent/80 hover:text-card-foreground rounded-lg px-3 py-2.5 transition-colors border border-transparent hover:border-border"
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

export default PromptDialog;
