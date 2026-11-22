import React, { useState } from 'react';
import { 
  Home, 
  Layers, 
  Cpu, 
  Terminal, 
  Settings, 
  Folder, 
  Database, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  Compass, 
  Menu, 
  X, 
  Sparkles, 
  Zap, 
  Plus, 
  Bookmark, 
  Activity, 
  Globe, 
  Key, 
  Users, 
  ArrowRight,
  Code2,
  FileCode,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { CustomizationSettings } from '../../../types/studio';
import { getComponentStyles, getInteractionStateClasses } from '../../../utils/styleHelper';

interface NavProps {
  settings: CustomizationSettings;
  variantId: string;
}

// 9. NAVBAR
export const NavbarComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeItem, setActiveItem] = useState('Workspace');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const styles = getComponentStyles(settings);
  const stateClass = getInteractionStateClasses(settings.activeState);

  const navItems = ['Workspace', 'Pipelines', 'Analytics', 'Integrations', 'Documentation'];

  return (
    <div className={`w-full max-w-4xl relative ${stateClass}`}>
      <nav 
        style={styles.container}
        className="flex items-center justify-between border shadow-xl relative z-20"
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: settings.primaryColor, color: '#000' }}
          >
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-wide">STRATA</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeItem === item;
            return (
              <button
                key={item}
                onClick={() => setActiveItem(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive ? 'font-semibold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                }`}
                style={isActive ? {
                  backgroundColor: `${settings.primaryColor}20`,
                  color: settings.primaryColor,
                  border: `1px solid ${settings.primaryColor}40`
                } : undefined}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black transition-transform active:scale-95"
            style={{ backgroundColor: settings.primaryColor }}
          >
            New Project
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg bg-white/5 border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 rounded-xl bg-slate-900 border border-white/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveItem(item);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                  activeItem === item ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'opacity-70'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button 
            className="w-full mt-3 py-2 rounded-lg text-xs font-semibold text-black"
            style={{ backgroundColor: settings.primaryColor }}
          >
            New Project
          </button>
        </div>
      )}
    </div>
  );
};

// 10. SIDEBAR NAVIGATION
export const SidebarNavigationComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeTab, setActiveTab] = useState('clusters');
  const [clustersOpen, setClustersOpen] = useState(true);
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full max-w-xs">
      <aside 
        style={styles.container}
        className="w-64 border rounded-2xl shadow-2xl flex flex-col p-3 transition-all"
      >
        {/* Workspace Brand */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
              style={{ backgroundColor: settings.primaryColor, color: '#000' }}
            >
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs">SYNAPSE AI</div>
              <div className="text-[10px] opacity-60">Enterprise Cloud</div>
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">PRO</span>
        </div>

        {/* Navigation Tree */}
        <div className="flex-1 space-y-1 text-xs">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all ${
              activeTab === 'overview' ? 'bg-cyan-500/15 text-cyan-300 font-semibold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4" />
              <span>Overview</span>
            </div>
          </button>

          {/* Accordion Group */}
          <div>
            <button 
              onClick={() => setClustersOpen(!clustersOpen)}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Clusters</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${clustersOpen ? 'rotate-180' : ''}`} />
            </button>

            {clustersOpen && (
              <div className="pl-6 pr-1 py-1 space-y-1">
                {[
                  { id: 'us-east-edge', name: 'US-East Node Alpha', count: 18 },
                  { id: 'eu-central', name: 'EU-Frankfurt Quantum', count: 6 },
                  { id: 'ap-tokyo', name: 'AP-Tokyo Gateway', count: 42 },
                ].map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setActiveTab(node.id)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[11px] ${
                      activeTab === node.id 
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <span className="truncate">{node.name}</span>
                    <span className="text-[10px] opacity-50 font-mono">{node.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setActiveTab('pipelines')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all ${
              activeTab === 'pipelines' ? 'bg-cyan-500/15 text-cyan-300 font-semibold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Pipelines</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-400">3</span>
          </button>

          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all ${
              activeTab === 'security' ? 'bg-cyan-500/15 text-cyan-300 font-semibold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Security Vault</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('terminal')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all ${
              activeTab === 'terminal' ? 'bg-cyan-500/15 text-cyan-300 font-semibold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4" />
              <span>Cloud Shell</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </button>
        </div>

        {/* Pinned User Footer */}
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-[11px] text-white">
              JD
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-[11px]">Jane Doe</div>
              <div className="text-[9px] opacity-60">Architect</div>
            </div>
          </div>
          <button className="p-1.5 rounded hover:bg-white/10 opacity-70 hover:opacity-100">
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </div>
  );
};

// 11. BOTTOM NAVIGATION BAR
export const BottomNavigationBarComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeItem, setActiveItem] = useState('home');
  const styles = getComponentStyles(settings);

  const items = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'create', label: 'Create', icon: Plus, isAction: true },
    { id: 'bookmarks', label: 'Saved', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: Users },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div 
        style={styles.container}
        className="w-full border rounded-2xl shadow-2xl flex items-center justify-around py-2 px-3 backdrop-blur-xl"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className="relative -top-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
                style={{ 
                  backgroundColor: settings.primaryColor,
                  color: '#000',
                  boxShadow: `0 0 20px ${settings.primaryColor}80`
                }}
              >
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'scale-105' : 'opacity-60 hover:opacity-90'
              }`}
            >
              <div 
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-3 font-mono">Mobile viewport dock with elevated action trigger</span>
    </div>
  );
};

// 12. FLOATING NAVIGATION
export const FloatingNavigationComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [active, setActive] = useState('Dashboard');
  const styles = getComponentStyles(settings);

  const pills = ['Dashboard', 'Telemetry', 'Deploy', 'Logs', 'Vault'];

  return (
    <div className="w-full max-w-xl flex flex-col items-center py-4">
      <div 
        style={styles.container}
        className="flex items-center gap-1.5 p-1.5 rounded-full border shadow-2xl backdrop-blur-2xl"
      >
        {pills.map((p) => {
          const isActive = active === p;
          return (
            <button
              key={p}
              onClick={() => setActive(p)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                isActive 
                  ? 'text-black font-semibold shadow-md' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              style={isActive ? {
                backgroundColor: settings.primaryColor,
                boxShadow: `0 0 16px ${settings.primaryColor}60`
              } : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-4 font-mono">Independent floating capsule island</span>
    </div>
  );
};

// 13. GLASS NAVIGATION BAR
export const GlassNavigationBarComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeTab, setActiveTab] = useState('Design');

  return (
    <div className="w-full max-w-3xl relative p-6 rounded-2xl bg-cyberpunk-mesh border border-white/10 shadow-2xl overflow-hidden">
      <div 
        className="w-full px-6 py-3.5 rounded-2xl flex items-center justify-between border border-white/20 shadow-glass backdrop-blur-2xl transition-all"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-white drop-shadow">PRISM GLASS</span>
        </div>

        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/10">
          {['Design', 'Motion', 'Tokens', 'Components'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-white/20 text-white font-semibold backdrop-blur-sm shadow' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button 
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white border border-white/25 hover:border-cyan-400 bg-white/10 backdrop-blur-md transition-all"
        >
          Inspect Node
        </button>
      </div>
    </div>
  );
};

// 14. MEGA MENU
export const MegaMenuComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full max-w-4xl relative">
      {/* Trigger Bar */}
      <div 
        style={styles.container}
        className="w-full flex items-center justify-between border rounded-xl shadow-lg py-3 px-6 mb-3"
      >
        <div className="flex items-center gap-6">
          <span className="font-bold text-sm tracking-wide">ENTERPRISE CLOUD</span>
          <div className="flex items-center gap-4 text-xs font-medium">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              <span>Platform Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <span className="opacity-70 hover:opacity-100 cursor-pointer">Pricing</span>
            <span className="opacity-70 hover:opacity-100 cursor-pointer">Security</span>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/20"
        >
          {isOpen ? 'Close Mega Menu' : 'Open Mega Menu'}
        </button>
      </div>

      {/* Expanded Mega Menu Panel */}
      {isOpen && (
        <div 
          className="w-full p-6 rounded-2xl border border-white/15 bg-slate-900/95 backdrop-blur-2xl shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95"
        >
          {/* Column 1: Compute & AI */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Compute & Neural Engine</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="text-xs font-semibold text-white">Quantum Pods v4</div>
                <div className="text-[11px] opacity-60">Sub-millisecond serverless compute clusters.</div>
              </div>
              <div className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="text-xs font-semibold text-white">Neural Inference Mesh</div>
                <div className="text-[11px] opacity-60">Edge model deployment with 128 TPU endpoints.</div>
              </div>
            </div>
          </div>

          {/* Column 2: Storage & Realtime */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-2">
              <Database className="w-3.5 h-3.5" />
              <span>Storage & State</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="text-xs font-semibold text-white">Atomic State Database</div>
                <div className="text-[11px] opacity-60">Globally synchronized CRDT data fabric.</div>
              </div>
              <div className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="text-xs font-semibold text-white">Telemetry Lake</div>
                <div className="text-[11px] opacity-60">Petabyte-scale analytical event queries.</div>
              </div>
            </div>
          </div>

          {/* Column 3: Featured Release */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                NEW RELEASE
              </span>
              <h4 className="text-sm font-bold text-white mt-2">Zero-Trust Mesh 2.0</h4>
              <p className="text-xs opacity-70 mt-1">
                WireGuard-accelerated encrypted tunnels connecting cross-cloud multi-region environments.
              </p>
            </div>
            <a 
              href="#learn" 
              onClick={(e) => e.preventDefault()}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              Explore Whitepaper <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// 15. DROPDOWN MENU
export const DropdownMenuComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const styles = getComponentStyles(settings);

  const actions = [
    { id: 'fork', label: 'Fork Repository', shortcut: '⌘F', icon: FileCode },
    { id: 'settings', label: 'Engine Settings', shortcut: '⌘,', icon: Sliders },
    { id: 'export', label: 'Export Artifact', shortcut: '⇧⌘E', icon: ExternalLink },
    { id: 'delete', label: 'Purge Cluster', shortcut: '⌫', icon: X, danger: true },
  ];

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-2 mb-3 shadow"
      >
        <span>Cluster Options</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          style={styles.container}
          className="w-64 border rounded-xl shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95"
        >
          <div className="px-2 py-1 text-[10px] font-mono uppercase opacity-50 tracking-wider">
            Workspace Actions
          </div>
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={() => {
                  setSelectedAction(act.label);
                  setTimeout(() => setSelectedAction(null), 1500);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  act.danger 
                    ? 'text-rose-400 hover:bg-rose-500/20' 
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  <span>{act.label}</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono opacity-60">
                  {act.shortcut}
                </kbd>
              </button>
            );
          })}
        </div>
      )}

      {selectedAction && (
        <div className="mt-3 text-xs text-cyan-400 font-mono animate-pulse">
          Executed: {selectedAction}
        </div>
      )}
    </div>
  );
};
