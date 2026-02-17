import { useState } from "react";
import { Plus, Upload, X, HardDrive, Cloud, Film, FolderOpen } from "lucide-react";

interface ConnectSourceDialogProps {
  open: boolean;
  onClose: () => void;
}

const sources = [
  { id: "upload", label: "Upload Briefs", description: "Upload brief files from your computer", icon: Upload },
  { id: "google-drive", label: "Google Drive", description: "Connect your Google Drive account", icon: Cloud },
  { id: "onedrive", label: "OneDrive", description: "Connect your Microsoft OneDrive", icon: FolderOpen },
  { id: "frame-io", label: "Frame.io", description: "Connect your Frame.io workspace", icon: Film },
  { id: "s3", label: "Amazon S3", description: "Connect an S3 bucket", icon: HardDrive },
];

const ConnectSourceDialog = ({ open, onClose }: ConnectSourceDialogProps) => {
  const [connecting, setConnecting] = useState<string | null>(null);

  if (!open) return null;

  const handleConnect = (sourceId: string) => {
    setConnecting(sourceId);
    // Simulate connection — in production this would trigger OAuth or file picker
    setTimeout(() => {
      setConnecting(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <h2 className="text-lg font-semibold text-card-foreground">
            Connect a Source
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="px-6 text-sm text-muted-foreground mb-4">
          Connect to your enterprise content repository.
        </p>

        <div className="px-6 pb-6 space-y-2">
          {sources.map((source) => (
            <button
              key={source.id}
              onClick={() => handleConnect(source.id)}
              disabled={connecting !== null}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-border bg-accent/30 hover:bg-accent hover:border-primary/20 transition-all text-left group disabled:opacity-60"
            >
              <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                <source.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">
                  {source.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {source.description}
                </p>
              </div>
              {connecting === source.id && (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ConnectSourceDialog };

interface AttachButtonProps {
  onUploadClick: () => void;
  onConnectClick: () => void;
}

const AttachButton = ({ onUploadClick, onConnectClick }: AttachButtonProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        title="Attach files or connect source"
      >
        <Plus className="w-5 h-5" />
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
          <div className="absolute bottom-full left-0 mb-2 z-20 w-52 bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
            <button
              onClick={() => { setMenuOpen(false); onUploadClick(); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-card-foreground hover:bg-accent transition-colors"
            >
              <Upload className="w-4 h-4 text-muted-foreground" />
              Upload Briefs
            </button>
            <div className="h-px bg-border" />
            <button
              onClick={() => { setMenuOpen(false); onConnectClick(); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-card-foreground hover:bg-accent transition-colors"
            >
              <Cloud className="w-4 h-4 text-muted-foreground" />
              Connect Source
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export { AttachButton };
