import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Home, 
  Folder, 
  FileCode, 
  Copy, 
  Check, 
  Search, 
  Command, 
  Terminal, 
  Sparkles, 
  Settings, 
  Compass, 
  Activity, 
  Database, 
  ChevronLeft, 
  ArrowRight,
  Monitor,
  Code
} from 'lucide-react';
import { CustomizationSettings } from '../../../types/studio';
import { getComponentStyles } from '../../../utils/styleHelper';

interface NavProps {
  settings: CustomizationSettings;
  variantId: string;
}

// 16. HAMBURGER MENU
export const HamburgerMenuComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all border border-white/15 bg-white/5 hover:bg-white/10 active:scale-95 shadow-xl"
        style={{
          borderColor: isOpen ? settings.primaryColor : undefined,
          boxShadow: isOpen ? `0 0 20px ${settings.primaryColor}50` : undefined,
        }}
        aria-label="Toggle Navigation"
      >
        <span 
          className={`w-6 h-0.5 rounded-full transition-all duration-300 origin-center ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
          style={{ backgroundColor: isOpen ? settings.primaryColor : '#ffffff' }}
        />
        <span 
          className={`w-6 h-0.5 rounded-full transition-all duration-200 ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: '#ffffff' }}
        />
        <span 
          className={`w-6 h-0.5 rounded-full transition-all duration-300 origin-center ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
          style={{ backgroundColor: isOpen ? settings.primaryColor : '#ffffff' }}
        />
      </button>

      <span className="text-xs font-mono opacity-60">
        Status: {isOpen ? 'OPEN (CLICK TO COLLAPSE)' : 'COLLAPSED (CLICK TO EXPAND)'}
      </span>
    </div>
  );
};

// 17. NAVIGATION DRAWER
export const NavigationDrawerComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full max-w-xl h-80 relative border border-white/10 rounded-2xl overflow-hidden bg-slate-950 flex shadow-2xl">
      {/* Main simulated screen content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-cyan-400">HOST VIEWPORT CANVAS</span>
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15"
            >
              {drawerOpen ? 'Dismiss Drawer' : 'Trigger Drawer'}
            </button>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The navigation drawer smoothly slides into the viewport with configurable backdrop blur, depth scrim, and gesture dismissing.
          </p>
        </div>
        <div className="text-[11px] opacity-40 font-mono">Simulated mobile viewport frame (360x320)</div>
      </div>

      {/* Sliding Drawer Container */}
      {drawerOpen && (
        <div className="absolute inset-0 z-20 flex animate-in fade-in duration-300">
          {/* Dimmed backdrop */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Body */}
          <div 
            style={styles.container}
            className="w-64 h-full border-l shadow-2xl flex flex-col justify-between p-4 animate-in slide-in-from-right duration-300"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <span className="font-bold text-xs tracking-wide">QUICK DRAWER</span>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1 text-xs">
                {['Overview', 'Deployments', 'Security Vault', 'Audit Logs', 'Documentation'].map((item, i) => (
                  <button
                    key={item}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                      i === 0 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'hover:bg-white/5 opacity-80'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs">
              <button 
                className="w-full py-2 rounded-lg text-xs font-semibold text-black"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 18. BREADCRUMB NAVIGATION
export const BreadcrumbNavigationComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [copied, setCopied] = useState(false);
  const path = 'nexus-cloud / us-east-1 / kubernetes-cluster / pod-neural-04';

  const handleCopy = () => {
    navigator.clipboard?.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <nav 
        className="flex items-center gap-2 p-2 px-4 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md text-xs shadow-lg"
      >
        <div className="flex items-center gap-1.5 opacity-70 hover:opacity-100 cursor-pointer">
          <Home className="w-3.5 h-3.5 text-cyan-400" />
          <span>Root</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />

        <div className="flex items-center gap-1.5 opacity-70 hover:opacity-100 cursor-pointer">
          <Folder className="w-3.5 h-3.5 text-indigo-400" />
          <span>us-east-1</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />

        <div className="flex items-center gap-1.5 opacity-70 hover:opacity-100 cursor-pointer">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>k8s-cluster</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />

        <div 
          className="flex items-center gap-1.5 font-bold px-2 py-0.5 rounded-md"
          style={{ backgroundColor: `${settings.primaryColor}20`, color: settings.primaryColor }}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>pod-neural-04</span>
        </div>

        <div className="h-4 w-[1px] bg-white/15 ml-2" />

        <button
          onClick={handleCopy}
          className="p-1 rounded-md hover:bg-white/10 opacity-70 hover:opacity-100 ml-1"
          title="Copy path to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </nav>
      {copied && (
        <span className="text-[11px] text-emerald-400 mt-2 font-mono">Copied path to clipboard!</span>
      )}
    </div>
  );
};

// 19. TAB NAVIGATION
export const TabNavigationComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeTab, setActiveTab] = useState('telemetry');
  const styles = getComponentStyles(settings);

  const tabs = [
    { id: 'telemetry', label: 'Telemetry Stream', count: 99 },
    { id: 'nodes', label: 'Nodes & Clusters', count: 14 },
    { id: 'security', label: 'Zero-Trust Shield' },
    { id: 'billing', label: 'Quantum Usage' },
  ];

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <div 
        style={styles.container}
        className="w-full border rounded-xl shadow-xl p-1.5 flex items-center justify-between"
      >
        <div className="flex items-center gap-1 w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  isActive ? 'font-semibold shadow' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                }`}
                style={isActive ? {
                  backgroundColor: settings.primaryColor,
                  color: '#000000',
                  boxShadow: `0 0 16px ${settings.primaryColor}50`,
                } : undefined}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span 
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-4 w-full border border-white/10 rounded-xl bg-slate-900/60 text-xs">
        <span className="opacity-60">Active View Pane: </span>
        <span className="font-semibold text-cyan-400 uppercase tracking-wider font-mono">{activeTab}</span>
      </div>
    </div>
  );
};

// 20. COMMAND MENU
export const CommandMenuComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const commands = [
    { id: 'deploy', label: 'Deploy Neural Node to Edge', cat: 'Navigation', icon: Sparkles, hotkey: '⌘D' },
    { id: 'switch-cluster', label: 'Switch to EU-Frankfurt Quantum Hub', cat: 'Clusters', icon: Database, hotkey: '⌘2' },
    { id: 'audit-log', label: 'Open Realtime Audit Telemetry', cat: 'Security', icon: Terminal, hotkey: '⌘L' },
    { id: 'kill-pod', label: 'Force Evacuate Stalled Worker Pods', cat: 'Maintenance', icon: Activity, hotkey: '⇧⌘K' },
    { id: 'settings', label: 'Open Studio Preference Matrix', cat: 'System', icon: Settings, hotkey: '⌘,' },
  ];

  const filtered = commands.filter((c) => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.cat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-xl">
      <div className="w-full rounded-2xl border border-white/20 bg-slate-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-4 h-4 text-cyan-400" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search documentation..."
            className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-white/40"
            autoFocus
          />
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono opacity-60">ESC</kbd>
        </div>

        {/* Command list */}
        <div className="p-2 max-h-60 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs opacity-50">No commands matching "{query}"</div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIdx;
              return (
                <div
                  key={cmd.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 opacity-70" />
                    <span>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] opacity-40 font-mono">{cmd.cat}</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono opacity-70">
                      {cmd.hotkey}
                    </kbd>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] opacity-60 font-mono">
          <span>Navigate with arrows</span>
          <span>Execute with ↵ Enter</span>
        </div>
      </div>
    </div>
  );
};

// 21. DOCK NAVIGATION
export const DockNavigationComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const apps = [
    { name: 'Dashboard', icon: Compass },
    { name: 'Telemetry', icon: Activity },
    { name: 'Neural Code', icon: Terminal },
    { name: 'Database', icon: Database },
    { name: 'Security Vault', icon: Sparkles },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-full flex flex-col items-center py-6">
      <div 
        className="flex items-end gap-3 px-5 py-3 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-2xl"
        style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)' }}
      >
        {apps.map((app, idx) => {
          const Icon = app.icon;
          const isHovered = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;
          const isActive = activeIdx === idx;

          let scale = 'scale-100';
          if (isHovered) scale = 'scale-125 -translate-y-2';
          else if (isNeighbor) scale = 'scale-110 -translate-y-1';

          return (
            <div key={app.name} className="relative group flex flex-col items-center">
              {/* Tooltip */}
              <div className="absolute -top-10 px-2 py-1 rounded-md bg-black/80 border border-white/15 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {app.name}
              </div>

              {/* Icon Capsule */}
              <button
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(idx)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border ${scale}`}
                style={{
                  background: isActive ? `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})` : 'rgba(255, 255, 255, 0.08)',
                  borderColor: isActive ? settings.primaryColor : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: isActive ? `0 0 20px ${settings.primaryColor}80` : undefined,
                  color: isActive ? '#000000' : '#ffffff',
                }}
              >
                <Icon className="w-5 h-5" />
              </button>

              {/* Active Dot */}
              <div 
                className={`w-1 h-1 rounded-full mt-1.5 transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundColor: settings.primaryColor }}
              />
            </div>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-4 font-mono">macOS style magnetic icon dock with dynamic scaling</span>
    </div>
  );
};

// 22. PAGINATION BAR
export const PaginationBarComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 18;

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      <div 
        className="flex items-center gap-1.5 p-1.5 rounded-xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-lg"
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1 px-2">
          {[1, 2, 3, 4, 5].map((page) => {
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive ? 'text-black font-bold shadow' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                }`}
                style={isActive ? {
                  backgroundColor: settings.primaryColor,
                  boxShadow: `0 0 12px ${settings.primaryColor}60`
                } : undefined}
              >
                {page}
              </button>
            );
          })}
          <span className="text-xs opacity-50 px-1 font-mono">...</span>
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`w-8 h-8 rounded-lg text-xs font-mono font-medium ${
              currentPage === totalPages ? 'bg-cyan-500 text-black' : 'opacity-70 hover:opacity-100'
            }`}
          >
            {totalPages}
          </button>
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs flex items-center gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 text-xs opacity-60 font-mono">
        Showing page {currentPage} of {totalPages} (240 total entries)
      </div>
    </div>
  );
};
