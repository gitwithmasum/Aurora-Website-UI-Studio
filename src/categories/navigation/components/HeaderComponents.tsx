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
  ExternalLink,
  Check,
  Copy,
  Zap,
  CheckCircle2,
  Lock,
  LogOut,
  Sliders
} from 'lucide-react';
import { CustomizationSettings } from '../../../types/studio';
import { getComponentStyles, getInteractionStateClasses } from '../../../utils/styleHelper';
import { sound } from '../../../utils/soundEngine';

interface HeaderProps {
  settings: CustomizationSettings;
  variantId: string;
}

// 1. TOP NAVIGATION BAR
export const TopNavigationBar: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [activeLink, setActiveLink] = useState('Overview');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [profileOpen, setProfileOpen] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);
  const stateClass = getInteractionStateClasses(settings.activeState);

  const links = ['Overview', 'Telemetry', 'Deployments', 'Security', 'Settings'];

  const toggleSearch = () => {
    sound.playHover();
    setSearchOpen(!searchOpen);
    setNotifOpen(false);
    setProfileOpen(false);
  };

  const toggleNotif = () => {
    sound.playBlip(1200);
    setNotifOpen(!notifOpen);
    setSearchOpen(false);
    setProfileOpen(false);
    if (unreadCount > 0) setUnreadCount(0);
  };

  const toggleProfile = () => {
    sound.playBlip(1400);
    setProfileOpen(!profileOpen);
    setSearchOpen(false);
    setNotifOpen(false);
  };

  // Shared Floating Interactive Popovers for all TopNavigationBar templates
  const renderInteractiveModals = () => (
    <>
      {/* 1. Global Interactive Search Modal */}
      {searchOpen && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 max-w-md w-[92%] p-3.5 rounded-2xl bg-[#070b1a]/95 backdrop-blur-3xl border border-cyan-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.25)] z-50 animate-in fade-in zoom-in-95 font-sans">
          <div className="flex items-center gap-2 px-3 py-2 bg-black/60 rounded-xl border border-white/10">
            <Search className="w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Quantum Island matrix, telemetry, nodes..."
              autoFocus
              className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none font-mono"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400 font-mono">ESC</kbd>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold px-2 block">Quick Navigation Targets</span>
            {links.map((link) => (
              <button
                key={link}
                onClick={() => {
                  sound.playConfirm();
                  setActiveLink(link);
                  setSearchOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span>Navigate to {link}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Global Interactive System Telemetry Feed */}
      {notifOpen && (
        <div className="absolute top-14 right-4 sm:right-8 max-w-sm w-[90%] p-3.5 rounded-2xl bg-[#070b1a]/95 backdrop-blur-3xl border border-cyan-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.25)] z-50 animate-in fade-in zoom-in-95 font-sans">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">System Telemetry Feed</span>
            </div>
            <button 
              onClick={() => {
                sound.playBlip(1000);
                setUnreadCount(0);
              }}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="mt-2.5 space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
              <div className="font-semibold text-cyan-300 flex items-center justify-between">
                <span>Optical Bridge Rebalanced</span>
                <span className="text-[9px] text-emerald-400 font-mono">JUST NOW</span>
              </div>
              <div className="text-[10px] text-slate-300 mt-1 font-mono">Zero packet latency across US-East cluster nodes.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
              <div className="font-semibold text-purple-300 flex items-center justify-between">
                <span>Quantum Shield Active</span>
                <span className="text-[9px] text-purple-400 font-mono">2M AGO</span>
              </div>
              <div className="text-[10px] text-slate-300 mt-1 font-mono">Core integrity holding steady at 99.8%.</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Global Interactive Operator Profile Dropdown */}
      {profileOpen && (
        <div className="absolute top-14 right-4 sm:right-6 max-w-xs w-[85%] p-4 rounded-2xl bg-[#070b1a]/95 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in-95 font-sans">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
              DR
            </div>
            <div>
              <div className="font-bold text-xs text-white">Dr. Vance</div>
              <div className="text-[10px] text-cyan-300 font-mono">Chief Systems Architect</div>
            </div>
          </div>
          <div className="py-2.5 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-[11px] text-slate-300 px-2 py-1 bg-white/5 rounded-lg">
              <span>STATUS:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ONLINE
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300 px-2 py-1 bg-white/5 rounded-lg">
              <span>CLEARANCE:</span>
              <span className="text-cyan-300 font-bold">LEVEL 5 (APEX)</span>
            </div>
            <button
              onClick={() => {
                sound.playConfirm();
                navigator.clipboard?.writeText('#0X-889F-VANCE');
                setCopiedProfile(true);
                setTimeout(() => setCopiedProfile(false), 2000);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
            >
              <span>{copiedProfile ? 'Copied to Clipboard!' : 'Copy Operator Key'}</span>
              <Check className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      )}
    </>
  );

  // ==========================================
  // TEMPLATE 1: FLOATING GLASS ISLAND (glass-island)
  // Ultra-luxurious detached frosted pill island with specular sheen, deep backdrop blur, and neon aura
  // ==========================================
  if (variantId === 'glass-island') {
    return (
      <div className={`w-full py-4 flex items-center justify-center relative transition-all ${stateClass}`}>
        {/* Ambient Underglow Orbs */}
        <div 
          className="absolute w-72 h-16 rounded-full blur-3xl opacity-30 pointer-events-none -top-2"
          style={{ background: `linear-gradient(90deg, ${settings.primaryColor}, ${settings.accentColor})` }}
        />

        <header 
          className="w-full max-w-4xl relative rounded-full backdrop-blur-3xl border shadow-2xl select-none transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(0, 242, 254, 0.04) 50%, rgba(255, 255, 255, 0.05) 100%)',
            borderColor: `${settings.primaryColor}50`,
            boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px ${settings.primaryColor}30, inset 0 1px 1px rgba(255, 255, 255, 0.3)`
          }}
        >
          {/* Specular Top Rim Highlight */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Left: Holographic Island Brand */}
          <div className="flex items-center gap-3">
            <div 
              onClick={toggleProfile}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg relative group cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})`,
                boxShadow: `0 0 18px ${settings.primaryColor}70`
              }}
              title="Click to view Operator Profile"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="absolute -inset-1 rounded-full border border-white/30 animate-pulse pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-xs sm:text-sm text-white">NEXUS</span>
                <span 
                  className="text-[9px] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase"
                  style={{ backgroundColor: `${settings.primaryColor}20`, color: settings.primaryColor, border: `1px solid ${settings.primaryColor}40` }}
                >
                  ISLAND
                </span>
              </div>
            </div>
          </div>

          {/* Center: Frosted Glass Floating Nav Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10 backdrop-blur-md">
            {links.map((link) => {
              const isActive = activeLink === link;
              return (
                <button
                  key={link}
                  onClick={() => {
                    sound.playBlip(1400);
                    setActiveLink(link);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 relative ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${settings.primaryColor}40, ${settings.accentColor}30)`,
                    border: `1px solid ${settings.primaryColor}70`,
                    boxShadow: `0 0 16px ${settings.primaryColor}40`
                  } : undefined}
                >
                  {link}
                </button>
              );
            })}
          </nav>

          {/* Right: Frosted Circular Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 transition-all shadow-inner"
              title="Quick Search"
            >
              <Search className="w-3.5 h-3.5" style={{ color: settings.primaryColor }} />
            </button>

            <button
              onClick={toggleNotif}
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 transition-all shadow-inner"
              title="Notifications Feed"
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadCount > 0 && (
                <span 
                  className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-black animate-pulse"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            <div 
              onClick={toggleProfile}
              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border border-white/30 ml-1 cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: `${settings.accentColor}30`, color: settings.accentColor }}
              title="Click to view Operator Profile"
            >
              DR
            </div>
          </div>
        </header>

        {renderInteractiveModals()}
      </div>
    );
  }

  // ==========================================
  // TEMPLATE 2: TRI-POD BENTO GLASS (holographic-capsule)
  // Modular 3-pod detached floating bento layout with frosted glass depth and cyber aesthetics
  // ==========================================
  if (variantId === 'holographic-capsule') {
    return (
      <div className={`w-full py-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 relative transition-all ${stateClass}`}>
        {/* Pod 1: Brand Pod */}
        <div 
          onClick={toggleProfile}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-2xl border shadow-xl transition-all cursor-pointer hover:border-cyan-400/60"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 20, 27, 0.85) 0%, rgba(17, 33, 45, 0.75) 100%)',
            borderColor: `${settings.primaryColor}50`,
            boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${settings.primaryColor}20, inset 0 1px 1px rgba(255,255,255,0.15)`
          }}
          title="Click to view Operator Profile"
        >
          <div 
            className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-inner"
            style={{ 
              background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})`,
              boxShadow: `0 0 15px ${settings.primaryColor}60`
            }}
          >
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs tracking-wider text-white">NEXUS // BENTO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-[10px] font-mono text-cyan-300 opacity-80 block">CLUSTER POD 01</span>
          </div>
        </div>

        {/* Pod 2: Navigation Bento Island */}
        <nav 
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl backdrop-blur-3xl border shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          {links.map((link) => {
            const isActive = activeLink === link;
            return (
              <button
                key={link}
                onClick={() => {
                  sound.playBlip(1400);
                  setActiveLink(link);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'text-white shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${settings.primaryColor}35, ${settings.accentColor}25)`,
                  border: `1px solid ${settings.primaryColor}70`,
                  boxShadow: `0 0 15px ${settings.primaryColor}35`
                } : undefined}
              >
                {link}
              </button>
            );
          })}
        </nav>

        {/* Pod 3: Actions & Controls Capsule */}
        <div 
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-2xl border shadow-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 20, 27, 0.85) 0%, rgba(17, 33, 45, 0.75) 100%)',
            borderColor: `${settings.primaryColor}50`,
            boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.15)`
          }}
        >
          <button
            onClick={toggleSearch}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all"
            title="Search Matrix (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <kbd className="text-[9px] px-1 py-0.2 rounded bg-white/10 font-mono text-slate-400">⌘K</kbd>
          </button>

          <button
            onClick={toggleNotif}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 relative text-slate-300 hover:text-white"
            title="Notifications Feed"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1 right-1 shadow-glow-cyan" />
            )}
          </button>

          <div 
            onClick={toggleProfile}
            className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs border border-white/20 cursor-pointer hover:scale-105 transition-transform"
            style={{ backgroundColor: `${settings.primaryColor}30`, color: settings.primaryColor }}
            title="Click to view Operator Profile"
          >
            VX
          </div>
        </div>

        {renderInteractiveModals()}
      </div>
    );
  }

  // ==========================================
  // TEMPLATE 3: LIQUID AURORA GLASS (liquid-glass)
  // Multi-layer spatial glass with dynamic ambient light refraction and holographic sheen
  // ==========================================
  if (variantId === 'liquid-glass') {
    return (
      <div className={`w-full relative transition-all ${stateClass}`}>
        {/* Dynamic Refractive Background Glow Layer */}
        <div className="absolute inset-0 -z-10 flex items-center justify-around blur-2xl opacity-40 pointer-events-none">
          <div className="w-48 h-12 rounded-full bg-cyan-500 animate-pulse" />
          <div className="w-48 h-12 rounded-full bg-purple-500 animate-pulse delay-300" />
          <div className="w-48 h-12 rounded-full bg-blue-500 animate-pulse delay-700" />
        </div>

        <header 
          className="w-full relative rounded-3xl backdrop-blur-3xl border shadow-2xl p-3.5 sm:p-4 select-none flex items-center justify-between overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 33, 45, 0.65) 0%, rgba(6, 20, 27, 0.75) 50%, rgba(37, 55, 69, 0.6) 100%)',
            borderColor: `${settings.primaryColor}60`,
            boxShadow: `0 20px 45px rgba(0, 0, 0, 0.7), 0 0 35px ${settings.primaryColor}25, inset 0 1px 1px rgba(255, 255, 255, 0.3)`
          }}
        >
          {/* Top Specular Sheen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent pointer-events-none" />

          {/* Left: Liquid Brand Orb */}
          <div 
            onClick={toggleProfile}
            className="flex items-center gap-3 cursor-pointer group"
            title="Click to view Operator Profile"
          >
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})`,
                boxShadow: `0 0 25px ${settings.primaryColor}80`
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
              <div className="absolute inset-0 bg-white/20 opacity-40 blur-xs" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-widest text-white">AURORA</span>
                <span 
                  className="text-[9px] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider"
                  style={{
                    backgroundColor: `${settings.primaryColor}25`,
                    color: settings.primaryColor,
                    border: `1px solid ${settings.primaryColor}50`,
                    boxShadow: `0 0 10px ${settings.primaryColor}30`
                  }}
                >
                  LIQUID GLASS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block">Multi-Layer Refractive Matrix</span>
            </div>
          </div>

          {/* Center: Translucent Floating Links */}
          <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
            {links.map((link) => {
              const isActive = activeLink === link;
              return (
                <button
                  key={link}
                  onClick={() => {
                    sound.playBlip(1400);
                    setActiveLink(link);
                  }}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${settings.primaryColor}40, ${settings.accentColor}30)`,
                    border: `1px solid ${settings.primaryColor}70`,
                    boxShadow: `0 0 16px ${settings.primaryColor}40`
                  } : undefined}
                >
                  {link}
                </button>
              );
            })}
          </nav>

          {/* Right: Liquid Glass Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-xs text-slate-200 transition-all backdrop-blur-md"
              title="Search Matrix (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-mono text-[11px]">Search Matrix</span>
              <kbd className="text-[9px] px-1 py-0.2 rounded bg-white/10 font-mono text-slate-400">⌘K</kbd>
            </button>

            <button
              onClick={toggleNotif}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 relative text-slate-200 transition-all"
              title="Notifications Feed"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5 shadow-glow-cyan" />
              )}
            </button>
          </div>
        </header>

        {renderInteractiveModals()}
      </div>
    );
  }

  // ==========================================
  // TEMPLATE 4: DENSE QUANTUM TELEMETRY (compact)
  // Streamlined high-density tactical header with live cluster metrics
  // ==========================================
  if (variantId === 'compact') {
    return (
      <div className={`w-full relative transition-all ${stateClass}`}>
        <header 
          className="w-full rounded-xl backdrop-blur-2xl border select-none transition-all px-4 py-2 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 20, 27, 0.9) 0%, rgba(17, 33, 45, 0.85) 100%)',
            borderColor: `${settings.primaryColor}40`,
            boxShadow: `0 10px 25px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15)`
          }}
        >
          {/* Left: Compact Brand + Telemetry Link */}
          <div 
            onClick={toggleProfile}
            className="flex items-center gap-3 cursor-pointer group"
            title="Click to view Operator Profile"
          >
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white shadow-md group-hover:scale-105 transition-transform"
              style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})` }}
            >
              N
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-white">NEXUS // DENSE-01</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                12MS
              </span>
            </div>
          </div>

          {/* Center: Monospace Segmented Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
            {links.map((link, idx) => {
              const isActive = activeLink === link;
              return (
                <button
                  key={link}
                  onClick={() => {
                    sound.playBlip(1400);
                    setActiveLink(link);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  0{idx + 1}. {link.toUpperCase()}
                </button>
              );
            })}
          </nav>

          {/* Right: Security Telemetry Badge */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <div className="hidden sm:flex items-center gap-1 text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>SHIELD: 100%</span>
            </div>
            <button 
              onClick={toggleSearch}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={toggleNotif}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {renderInteractiveModals()}
      </div>
    );
  }

  // ==========================================
  // TEMPLATE 5: CYBER HUD DECK (standard / default)
  // Command center header with cyber-brackets, telemetry nodes, and holographic glass glow
  // ==========================================
  return (
    <div className={`w-full relative transition-all ${stateClass}`}>
      <header 
        className="w-full relative rounded-2xl backdrop-blur-2xl border select-none transition-all p-3 sm:p-4 flex items-center justify-between overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 20, 27, 0.8) 0%, rgba(17, 33, 45, 0.75) 50%, rgba(10, 22, 34, 0.85) 100%)',
          borderColor: `${settings.primaryColor}50`,
          boxShadow: `0 15px 40px rgba(0, 0, 0, 0.65), 0 0 25px ${settings.primaryColor}20, inset 0 1px 1px rgba(255, 255, 255, 0.2)`
        }}
      >
        {/* Holographic Top Laser Accent Line */}
        <div 
          className="absolute top-0 inset-x-8 h-[1px] pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${settings.primaryColor}, transparent)` }}
        />

        {/* Tactical Cyber HUD Brackets */}
        <div className="absolute top-1.5 left-2 text-cyan-400/60 font-mono text-[9px] pointer-events-none select-none">┌</div>
        <div className="absolute top-1.5 right-2 text-cyan-400/60 font-mono text-[9px] pointer-events-none select-none">┐</div>
        <div className="absolute bottom-1.5 left-2 text-cyan-400/60 font-mono text-[9px] pointer-events-none select-none">└</div>
        <div className="absolute bottom-1.5 right-2 text-cyan-400/60 font-mono text-[9px] pointer-events-none select-none">┘</div>

        {/* Left: Brand Identity with Holographic Badge */}
        <div 
          onClick={toggleProfile}
          className="flex items-center gap-3 cursor-pointer group"
          title="Click to view Operator Profile"
        >
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-xl relative overflow-hidden group-hover:scale-105 transition-transform"
            style={{ 
              background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})`,
              boxShadow: `0 0 20px ${settings.primaryColor}70`
            }}
          >
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute inset-0 bg-white/20 opacity-30 pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-sm text-white">NEXUS // HUD</span>
              <span 
                className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider flex items-center gap-1"
                style={{ 
                  backgroundColor: `${settings.primaryColor}20`,
                  color: settings.primaryColor,
                  border: `1px solid ${settings.primaryColor}50`
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>v4.8 OPTICAL</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight block">Quantum Command Interface</span>
          </div>
        </div>

        {/* Center: Frosted Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-black/45 p-1 rounded-xl border border-white/10 backdrop-blur-md">
          {links.map((link) => {
            const isActive = activeLink === link;
            return (
              <button
                key={link}
                onClick={() => {
                  sound.playBlip(1400);
                  setActiveLink(link);
                }}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive 
                    ? 'text-white shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${settings.primaryColor}35, ${settings.accentColor}25)`,
                  border: `1px solid ${settings.primaryColor}60`,
                  boxShadow: `0 0 15px ${settings.primaryColor}35`
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

        {/* Right: Futuristic Controls & Telemetry */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button
              onClick={toggleSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15 hover:border-white/25 bg-white/5 text-xs text-slate-200 transition-all shadow-inner"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5" style={{ color: settings.primaryColor }} />
              <span className="hidden sm:inline font-mono text-[11px]">Search...</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 text-[9px] rounded bg-white/10 font-mono text-slate-400">⌘K</kbd>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={toggleNotif}
              className="relative p-2 rounded-xl border border-white/15 hover:border-white/25 bg-white/5 text-slate-200 transition-all"
              title="Notifications Feed"
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
          </div>

          <div 
            onClick={toggleProfile}
            className="flex items-center gap-2 pl-2 border-l border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
            title="Click to view Operator Profile"
          >
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ring-1 ring-white/30"
              style={{ backgroundColor: `${settings.accentColor}30`, color: settings.accentColor }}
            >
              DR
            </div>
            <div className="hidden lg:block text-left text-xs font-mono">
              <div className="font-semibold leading-tight text-white">Dr. Vance</div>
              <div className="text-[9px] text-cyan-400">ONLINE // LVL 5</div>
            </div>
          </div>
        </div>
      </header>

      {renderInteractiveModals()}
    </div>
  );
};

// 2. STICKY HEADER
export const StickyHeader: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [scrollY, setScrollY] = useState(0);
  const [launched, setLaunched] = useState(false);
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
                  onClick={() => {
                    sound.playConfirm();
                    setLaunched(true);
                    setTimeout(() => setLaunched(false), 3000);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    launched 
                      ? 'bg-emerald-400 text-black shadow-[0_0_15px_#34d399]' 
                      : 'text-black'
                  }`}
                  style={{ backgroundColor: launched ? '#34d399' : settings.primaryColor }}
                >
                  {launched ? 'HYPERDRIVE ACTIVE ✓' : 'Launch'}
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
  const [connected, setConnected] = useState(false);
  const [activeNav, setActiveNav] = useState('Ecosystem');

  const navItems = ['Ecosystem', 'Hardware', 'Enterprise', 'Docs'];

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
            {navItems.map((item) => (
              <span 
                key={item}
                onClick={() => {
                  sound.playBlip(1400);
                  setActiveNav(item);
                }}
                className={`cursor-pointer transition-all drop-shadow ${
                  activeNav === item ? 'text-cyan-400 font-bold border-b border-cyan-400 pb-0.5' : 'hover:text-cyan-300 opacity-80 hover:opacity-100'
                }`}
              >
                {item}
              </span>
            ))}
          </nav>

          <button 
            onClick={() => {
              sound.playConfirm();
              setConnected(!connected);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all ${
              connected 
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_#34d399]' 
                : 'border-white/20 text-white hover:border-cyan-400'
            }`}
            style={{ backgroundColor: connected ? undefined : `${settings.primaryColor}20` }}
          >
            {connected ? 'NODE LINKED ✓' : 'Connect Node'}
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
                onClick={() => {
                  sound.playScan();
                  setBackdrop(b);
                }}
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
  const [activeItem, setActiveItem] = useState('Studio');
  const [upgraded, setUpgraded] = useState(false);
  const styles = getComponentStyles(settings);

  const navItems = ['Studio', 'Components', 'Tokens', 'Documentation'];

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
          {navItems.map((item) => (
            <span
              key={item}
              onClick={() => {
                sound.playBlip(1400);
                setActiveItem(item);
              }}
              className={`cursor-pointer transition-all ${
                activeItem === item ? 'font-semibold text-cyan-400' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {item}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              sound.playBlip(1200);
              alert('Opening Secure Quantum Sign-In Portal...');
            }}
            className="px-3 py-1 rounded-md text-xs font-medium border border-white/10 hover:border-white/20 text-slate-200"
          >
            Sign In
          </button>
          <button 
            onClick={() => {
              sound.playConfirm();
              setUpgraded(!upgraded);
            }}
            className="px-3 py-1 rounded-md text-xs font-semibold text-black transition-all"
            style={{ backgroundColor: upgraded ? '#34d399' : settings.primaryColor }}
          >
            {upgraded ? 'PRO ACTIVATED ✓' : 'Upgrade'}
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
  const [activeMinimal, setActiveMinimal] = useState('01. INDEX');
  const styles = getComponentStyles(settings);

  const items = ['01. INDEX', '02. DOSSIER', '03. ARCHIVE', '04. DISPATCH'];

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
          {items.map((item) => (
            <span 
              key={item}
              onClick={() => {
                sound.playBlip(1400);
                setActiveMinimal(item);
              }}
              className={`hover:underline cursor-pointer transition-colors ${
                activeMinimal === item ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="font-mono text-xs">
          <span className="px-2 py-1 border border-white/20 rounded-none text-[10px] text-emerald-400">
            SYS: OK
          </span>
        </div>
      </header>
    </div>
  );
};

// 6. SPLIT HEADER
export const SplitHeader: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [activeCluster, setActiveCluster] = useState('Projects');
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'live'>('idle');

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
          {['Projects', 'Clusters', 'Nodes'].map((tab) => (
            <span
              key={tab}
              onClick={() => {
                sound.playBlip(1400);
                setActiveCluster(tab);
              }}
              className={`cursor-pointer transition-colors ${
                activeCluster === tab ? 'text-cyan-400 font-bold' : 'hover:text-cyan-400'
              }`}
            >
              {tab}
            </span>
          ))}
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
          onClick={() => {
            sound.playConfirm();
            setDeployStatus('deploying');
            setTimeout(() => setDeployStatus('live'), 1500);
            setTimeout(() => setDeployStatus('idle'), 4000);
          }}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            deployStatus === 'live'
              ? 'bg-emerald-400 text-black'
              : deployStatus === 'deploying'
              ? 'bg-amber-400 text-black animate-pulse'
              : 'text-black'
          }`}
          style={{ backgroundColor: deployStatus === 'idle' ? settings.primaryColor : undefined }}
        >
          {deployStatus === 'deploying' ? 'Deploying...' : deployStatus === 'live' ? 'Live on Edge ✓' : 'Quick Deploy'}
        </button>
      </div>
    </div>
  );
};

// 7. ANNOUNCEMENT BAR
export const AnnouncementBar: React.FC<HeaderProps> = ({ settings, variantId }) => {
  const [dismissed, setDismissed] = useState(false);
  const [claimed, setClaimed] = useState(false);

  if (dismissed) {
    return (
      <div className="p-4 rounded-xl border border-dashed border-white/10 text-center">
        <span className="text-xs opacity-60">Announcement bar dismissed. </span>
        <button 
          onClick={() => {
            sound.playScan();
            setDismissed(false);
          }}
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
          <button 
            onClick={() => {
              sound.playConfirm();
              setClaimed(true);
            }}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline shrink-0"
          >
            {claimed ? 'Access Granted ✓' : 'Claim Quantum Access'} <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <button 
          onClick={() => {
            sound.playHover();
            setDismissed(true);
          }}
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
  const [activeFilter, setActiveFilter] = useState('All Services');
  const [filterOpen, setFilterOpen] = useState(false);
  const styles = getComponentStyles(settings);

  const filters = ['All Services', 'APIs', 'Workers', 'Edge DB'];

  return (
    <div className="w-full max-w-4xl relative">
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
              onChange={(e) => {
                sound.playBlip(1200);
                setBranch(e.target.value);
              }}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="main" className="bg-slate-900 text-white">main</option>
              <option value="develop" className="bg-slate-900 text-white">develop</option>
              <option value="feat/quantum-router" className="bg-slate-900 text-white">feat/quantum-router</option>
            </select>
          </div>
          <span className="text-xs opacity-60">12 Deployments active</span>
        </div>

        {/* Center: Filter Pills with Working Active State */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-xs">
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => {
                  sound.playBlip(1300);
                  setActiveFilter(f);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  isActive 
                    ? 'bg-cyan-500/25 text-cyan-300 font-semibold border border-cyan-400/40 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Right: View switcher & Filter Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10">
            <button 
              onClick={() => {
                sound.playBlip(1200);
                setView('grid');
              }}
              className={`p-1 rounded transition-colors ${view === 'grid' ? 'bg-white/15 text-cyan-400' : 'opacity-50 hover:opacity-100'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => {
                sound.playBlip(1200);
                setView('list');
              }}
              className={`p-1 rounded transition-colors ${view === 'list' ? 'bg-white/15 text-cyan-400' : 'opacity-50 hover:opacity-100'}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <button 
            onClick={() => {
              sound.playScan();
              setFilterOpen(!filterOpen);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition-colors ${
              filterOpen ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Dropdown Popover */}
      {filterOpen && (
        <div className="absolute right-4 top-14 w-56 p-3 rounded-xl bg-[#070b1a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50 text-xs font-mono animate-in fade-in zoom-in-95">
          <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Filter By Status</span>
          <div className="space-y-1">
            {['Active Only', 'Failed Pipelines', 'Deploying', 'Staged Nodes'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  sound.playConfirm();
                  setFilterOpen(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
