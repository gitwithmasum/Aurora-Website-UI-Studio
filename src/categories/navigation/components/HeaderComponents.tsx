import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown, 
  Sparkles, 
  Terminal, 
  ArrowUpRight, 
  X, 
  Filter, 
  Grid, 
  List, 
  GitBranch, 
  Calendar, 
  Command,
  Shield,
  Layers,
  Activity,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { CustomizationSettings } from '../../../types/studio';
import { getComponentStyles, getInteractionStateClasses } from '../../../utils/styleHelper';

interface HeaderProps {
  settings: CustomizationSettings;
  variantId: string;
}

// 1. TOP NAVIGATION BAR
export const TopNavigationBar: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [activeLink, setActiveLink] = useState('Overview');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const styles = getComponentStyles(settings);
  const stateClass = getInteractionStateClasses(settings.activeState);

  const links = ['Overview', 'Telemetry', 'Deployments', 'Security', 'Settings'];

  return (
    <div className={`w-full relative transition-all ${stateClass}`}>
      <header 
        style={styles.container}
        className="flex items-center justify-between border select-none transition-all"
      >
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-inner"
            style={{ 
              background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})`,
              boxShadow: `0 0 16px ${settings.primaryColor}50`
            }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight">NEXUS</span>
              <span 
                className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase tracking-wider"
                style={{ 
                  backgroundColor: `${settings.primaryColor}20`,
                  color: settings.primaryColor,
                  border: `1px solid ${settings.primaryColor}40`
                }}
              >
                v4.8
              </span>
            </div>
            {variantId !== 'compact' && (
              <span className="text-[11px] opacity-60 block leading-tight">Quantum Core System</span>
            )}
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = activeLink === link;
            return (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                className={`relative px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isActive 
                    ? 'font-semibold' 
                    : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                }`}
                style={isActive ? {
                  color: settings.primaryColor,
                  backgroundColor: `${settings.primaryColor}15`,
                  border: `1px solid ${settings.primaryColor}30`,
                } : undefined}
              >
                {link}
                {isActive && (
                  <span 
                    className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full"
                    style={{ backgroundColor: settings.primaryColor, boxShadow: `0 0 8px ${settings.primaryColor}` }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 text-xs opacity-80 hover:opacity-100 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 text-[10px] rounded bg-white/10 font-mono">⌘K</kbd>
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-11 w-72 p-2 rounded-xl bg-slate-900 border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <input 
                  type="text" 
                  placeholder="Query modules, telemetry..." 
                  autoFocus
                  className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <div className="mt-2 text-[11px] opacity-60 px-2 py-1">Quick actions:</div>
                <div className="space-y-1">
                  <div className="px-2 py-1.5 rounded hover:bg-white/10 text-xs flex justify-between cursor-pointer">
                    <span>Deploy to Production</span>
                    <span className="text-[10px] opacity-50">Enter</span>
                  </div>
                  <div className="px-2 py-1.5 rounded hover:bg-white/10 text-xs flex justify-between cursor-pointer">
                    <span>Cluster Health Check</span>
                    <span className="text-[10px] opacity-50">⌥H</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              className="relative p-2 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 opacity-80 hover:opacity-100 transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-black"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-11 w-80 p-3 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-white/15 shadow-2xl z-50">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-semibold">System Telemetry Feed</span>
                  <span className="text-[10px] text-cyan-400 cursor-pointer">Clear all</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-800/40">
                    <div className="font-medium text-cyan-300">Cluster Node 03 Rebalanced</div>
                    <div className="text-[11px] opacity-70">Latency dropped by 14ms across US-East.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="font-medium">SSL Certificate Auto-renewed</div>
                    <div className="text-[11px] opacity-70">Valid through 2028-11-23.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ring-1 ring-white/20"
              style={{ backgroundColor: `${settings.accentColor}30`, color: settings.accentColor }}
            >
              DR
            </div>
            <div className="hidden lg:block text-left text-xs">
              <div className="font-semibold leading-tight">Dr. Vance</div>
              <div className="text-[10px] opacity-60">Admin Level 5</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

// 2. STICKY HEADER
export const StickyHeader: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [scrollY, setScrollY] = useState(0);
  const isScrolled = scrollY > 60;
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl border border-white/10 rounded-2xl overflow-hidden bg-slate-950 shadow-2xl">
        {/* Interactive Scroll Simulation Canvas */}
        <div 
          onScroll={(e) => setScrollY((e.target as HTMLDivElement).scrollTop)}
          className="h-80 overflow-y-auto relative scroll-smooth bg-grid-pattern"
        >
          {/* Sticky Header Node */}
          <div 
            className={`sticky top-0 z-30 transition-all duration-300 ${
              isScrolled 
                ? 'py-2 px-4 shadow-xl backdrop-blur-xl border-b border-cyan-500/30' 
                : 'py-4 px-6'
            }`}
            style={{
              backgroundColor: isScrolled ? `${settings.bgColor}e6` : settings.bgColor,
              borderColor: isScrolled ? settings.primaryColor : settings.borderColor,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className={`rounded-lg flex items-center justify-center transition-all ${
                    isScrolled ? 'w-7 h-7' : 'w-9 h-9'
                  }`}
                  style={{ backgroundColor: settings.primaryColor, color: '#000' }}
                >
                  <Activity className={isScrolled ? 'w-4 h-4' : 'w-5 h-5'} />
                </div>
                <div>
                  <span className={`font-bold transition-all ${isScrolled ? 'text-sm' : 'text-base'}`}>
                    HYPERDRIVE STICKY
                  </span>
                  {!isScrolled && (
                    <span className="block text-[11px] opacity-60">Scroll down inside frame to test shrink & frost</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="text-cyan-400">Scroll: {scrollY}px</span>
                <span className={`px-2 py-1 rounded text-[10px] font-mono ${
                  isScrolled ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/10 text-white/70'
                }`}>
                  {isScrolled ? 'PINNED & SHRUNK' : 'RESTING STATE'}
                </span>
                <button 
                  className="px-3 py-1 rounded-md text-xs font-semibold text-black"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Launch
                </button>
              </div>
            </div>
          </div>

          {/* Dummy Scrollable Content */}
          <div className="p-6 space-y-6 text-slate-400 text-sm">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <h4 className="text-white font-semibold mb-2">Simulated Scroll Canvas</h4>
              <p className="text-xs leading-relaxed">
                Scroll this container to observe how the header pins to the ceiling of the frame, activates its frosted backdrop blur filter, reduces height by 25%, and reveals a subtle glowing laser boundary along its underside.
              </p>
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex justify-between items-center text-xs text-white mb-2 font-mono">
                  <span>TELEMETRY STREAM CHUNK #{i + 1}</span>
                  <span className="text-emerald-400">ONLINE</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500/60" style={{ width: `${(i + 2) * 14}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. TRANSPARENT HEADER
export const TransparentHeader: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [backdrop, setBackdrop] = useState<'neon-grid' | 'space' | 'gradient'>('neon-grid');

  return (
    <div className="w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
      {/* Dynamic Immersive Background Backdrop */}
      <div 
        className={`h-72 w-full relative transition-all duration-500 flex flex-col justify-between ${
          backdrop === 'neon-grid' ? 'bg-grid-pattern bg-[#050811]' :
          backdrop === 'space' ? 'bg-radial-glow bg-[#030712]' : 'bg-cyberpunk-mesh bg-[#080d1a]'
        }`}
      >
        {/* Transparent Header Node */}
        <header 
          className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-[2px]"
          style={{
            background: variantId === 'gradient-tint' 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' 
              : 'transparent',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center text-cyan-400">
              <Command className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-wider text-sm text-white drop-shadow-md">
              AEROKINETIC
            </span>
          </div>

          <nav className="flex items-center gap-6 text-xs font-medium text-slate-200">
            <span className="hover:text-cyan-400 cursor-pointer drop-shadow">Ecosystem</span>
            <span className="hover:text-cyan-400 cursor-pointer drop-shadow">Hardware</span>
            <span className="hover:text-cyan-400 cursor-pointer drop-shadow">Enterprise</span>
            <span className="hover:text-cyan-400 cursor-pointer drop-shadow">Docs</span>
          </nav>

          <button 
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 text-white hover:border-cyan-400 transition-all"
            style={{ backgroundColor: `${settings.primaryColor}20` }}
          >
            Connect Node
          </button>
        </header>

        {/* Hero Section Content in frame */}
        <div className="p-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3">
            HERO OVERLAY INTEGRATION
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Zero-Opacity Immersive Canvas</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto mt-2">
            Seamlessly hovers over rich 3D graphics, hero animations, and dynamic media without heavy container bounds.
          </p>
        </div>

        {/* Backdrop Switcher Controls */}
        <div className="px-6 py-3 bg-black/60 backdrop-blur-md flex items-center justify-between text-xs border-t border-white/10">
          <span className="opacity-70">Simulate Hero Backdrop:</span>
          <div className="flex gap-2">
            {(['neon-grid', 'space', 'gradient'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBackdrop(b)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase ${
                  backdrop === b ? 'bg-cyan-500 text-black font-bold' : 'bg-white/10 text-white'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. FLOATING HEADER
export const FloatingHeader: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full flex flex-col items-center py-6">
      <div 
        style={styles.container}
        className="max-w-3xl w-full flex items-center justify-between border shadow-2xl transition-all"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: settings.primaryColor, color: '#000' }}
          >
            FL
          </div>
          <span className="font-bold text-sm tracking-wide">PULSE ISLAND</span>
        </div>

        <nav className="flex items-center gap-4 text-xs">
          <span className="font-semibold text-cyan-400">Studio</span>
          <span className="opacity-70 hover:opacity-100 cursor-pointer">Components</span>
          <span className="opacity-70 hover:opacity-100 cursor-pointer">Tokens</span>
          <span className="opacity-70 hover:opacity-100 cursor-pointer">Documentation</span>
        </nav>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-md text-xs font-medium border border-white/10 hover:border-white/20">
            Sign In
          </button>
          <button 
            className="px-3 py-1 rounded-md text-xs font-semibold text-black"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Upgrade
          </button>
        </div>
      </div>
      <div className="mt-4 text-xs opacity-50 font-mono">
        Detached capsule floating 24px above viewport plane
      </div>
    </div>
  );
};

// 5. MINIMAL HEADER
export const MinimalHeader: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full max-w-3xl">
      <header 
        style={{
          ...styles.container,
          borderRadius: variantId === 'mono-clean' ? '0px' : styles.container.borderRadius,
        }}
        className="w-full flex items-center justify-between border-b transition-all py-3 px-6"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest font-bold">
            ARCHETYPE / 01
          </span>
          <span className="h-3 w-[1px] bg-white/20" />
          <span className="text-[11px] font-mono opacity-50">ZURICH // 2026</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <span className="hover:underline cursor-pointer">01. INDEX</span>
          <span className="hover:underline cursor-pointer">02. DOSSIER</span>
          <span className="hover:underline cursor-pointer">03. ARCHIVE</span>
          <span className="hover:underline cursor-pointer">04. DISPATCH</span>
        </div>

        <div className="font-mono text-xs">
          <span className="px-2 py-1 border border-white/20 rounded-none text-[10px]">
            SYS: OK
          </span>
        </div>
      </header>
    </div>
  );
};

// 6. SPLIT HEADER
export const SplitHeader: React.FC<HeaderProps> = ({ settings, variantId }) => {
  return (
    <div className="w-full max-w-4xl flex items-center justify-between gap-4 py-4 px-2">
      {/* Left Cluster */}
      <div 
        className="flex items-center gap-4 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg"
        style={{ backgroundColor: settings.bgColor }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: settings.primaryColor, color: '#000' }}
          >
            SP
          </div>
          <span className="font-bold text-xs">QUANTUM / LEFT</span>
        </div>
        <div className="h-4 w-[1px] bg-white/15" />
        <div className="flex gap-3 text-xs opacity-80">
          <span className="hover:text-cyan-400 cursor-pointer">Projects</span>
          <span className="hover:text-cyan-400 cursor-pointer">Clusters</span>
          <span className="hover:text-cyan-400 cursor-pointer">Nodes</span>
        </div>
      </div>

      {/* Middle Laser Bridge (for laser-bridge variation) */}
      {variantId === 'bridge-split' && (
        <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/40 via-blue-500/20 to-cyan-500/40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[9px] font-mono bg-black border border-cyan-500/30 text-cyan-400">
            SYNC
          </div>
        </div>
      )}

      {/* Right Cluster */}
      <div 
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg"
        style={{ backgroundColor: settings.bgColor }}
      >
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CONNECTED</span>
        </div>
        <button 
          className="px-3 py-1 rounded-lg text-xs font-semibold text-black"
          style={{ backgroundColor: settings.primaryColor }}
        >
          Quick Deploy
        </button>
      </div>
    </div>
  );
};

// 7. ANNOUNCEMENT BAR
export const AnnouncementBar: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="p-4 rounded-xl border border-dashed border-white/10 text-center">
        <span className="text-xs opacity-60">Announcement bar dismissed. </span>
        <button 
          onClick={() => setDismissed(false)}
          className="text-xs text-cyan-400 underline font-medium ml-2"
        >
          Restore Banner
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <div 
        className="w-full px-4 py-2.5 rounded-xl flex items-center justify-between border shadow-lg transition-all"
        style={{
          background: variantId === 'neon-ticker' 
            ? `linear-gradient(90deg, ${settings.bgColor}, ${settings.primaryColor}20, ${settings.bgColor})` 
            : settings.bgColor,
          borderColor: `${settings.primaryColor}40`,
        }}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <span 
            className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider shrink-0"
            style={{ backgroundColor: settings.primaryColor, color: '#000' }}
          >
            RELEASE 4.12
          </span>
          <span className="text-xs font-medium truncate">
            🚀 Autonomous Neural Routing is now in Public Preview for all clusters.
          </span>
          <a 
            href="#changelog" 
            onClick={(e) => e.preventDefault()}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline shrink-0"
          >
            Read Changelog <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <button 
          onClick={() => setDismissed(true)}
          className="p-1 rounded-md hover:bg-white/10 opacity-70 hover:opacity-100 transition-all shrink-0 ml-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// 8. SECONDARY HEADER
export const SecondaryHeader: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [branch, setBranch] = useState('main');
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full max-w-4xl">
      <div 
        style={styles.container}
        className="flex items-center justify-between border shadow-md transition-all py-2.5 px-4"
      >
        {/* Left: Branch & Context */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <select 
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="main" className="bg-slate-900 text-white">main</option>
              <option value="develop" className="bg-slate-900 text-white">develop</option>
              <option value="feat/quantum-router" className="bg-slate-900 text-white">feat/quantum-router</option>
            </select>
          </div>
          <span className="text-xs opacity-60">12 Deployments active</span>
        </div>

        {/* Center: Filter Pills */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-xs">
          {['All Services', 'APIs', 'Workers', 'Edge DB'].map((f, i) => (
            <button
              key={f}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                i === 0 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Right: View switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10">
            <button 
              onClick={() => setView('grid')}
              className={`p-1 rounded ${view === 'grid' ? 'bg-white/15 text-cyan-400' : 'opacity-50'}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1 rounded ${view === 'list' ? 'bg-white/15 text-cyan-400' : 'opacity-50'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs border border-white/10">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
