import { useState } from "react";
import {
  Home,
  FolderOpen,
  LayoutGrid,
  Users,
  Users2,
  Search,
  Settings,
  Bell,
  ChevronDown,
  BarChart3,
} from "lucide-react";

interface AppSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const mainNav = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "templates", label: "Templates", icon: LayoutGrid },
  { id: "brands", label: "Brands", icon: Users },
  { id: "aeo-analysis", label: "AEO Analysis", icon: BarChart3 },
  { id: "audiences", label: "Audiences", icon: Users2 },
];

const otherNav = [
  { id: "settings", label: "Settings", icon: Settings, hasChevron: true },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const AppSidebar = ({ activeItem, onItemClick }: AppSidebarProps) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <aside className="flex flex-col w-[260px] min-w-[260px] h-screen bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">T</span>
        </div>
        <span className="text-sidebar-primary font-semibold text-[15px] tracking-tight">
          Typeface Pulse
        </span>
      </div>

      {/* Search */}
      <div className="px-4 mb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-sidebar-accent border border-sidebar-border">
          <Search className="w-4 h-4 text-sidebar-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent text-sm text-sidebar-primary placeholder:text-sidebar-foreground outline-none w-full"
          />
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-0.5">
          {mainNav.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-active-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
                    }`}
                >
                  <item.icon
                    className={`w-[18px] h-[18px] ${
                      isActive ? "text-sidebar-active" : ""
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Other section */}
        <div className="mt-6">
          <span className="px-3 text-xs font-medium text-sidebar-foreground uppercase tracking-wider">
            Other
          </span>
          <ul className="mt-2 space-y-0.5">
            {otherNav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      activeItem === item.id
                        ? "bg-sidebar-accent text-sidebar-active-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
                    }`}
                >
                  <item.icon className="w-[18px] h-[18px]" />
                  <span>{item.label}</span>
                  {item.hasChevron && (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border px-4 py-3">
        <button className="flex items-center gap-3 w-full text-left">
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-primary truncate">
              Jonathan
            </p>
            <p className="text-xs text-sidebar-foreground truncate">
              Cecilié Marketing
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-sidebar-foreground" />
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
