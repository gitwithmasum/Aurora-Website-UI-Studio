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
  const stateClass = getInteractionStateClasses(settings.activeState);

  const links = ['Overview', 'Telemetry', 'Deployments', 'Security', 'Settings'];

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
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg relative group cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})`,
                boxShadow: `0 0 18px ${settings.primaryColor}70`
              }}
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
                  onClick={() => setActiveLink(link)}
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
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 transition-all shadow-inner"
              title="Quick Search"
            >
              <Search className="w-3.5 h-3.5" style={{ color: settings.primaryColor }} />
            </button>

            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 transition-all shadow-inner"
              title="Notifications"
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
              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border border-white/30 ml-1 cursor-pointer"
              style={{ backgroundColor: `${settings.accentColor}30`, color: settings.accentColor }}
            >
              DR
            </div>
          </div>
        </header>

        {/* Search Modal Dropdown */}
        {searchOpen && (
          <div className="absolute top-20 max-w-md w-full p-3 rounded-2xl bg-[#06141B]/95 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl z-50 animate-in fade-in zoom-in-95">
            <input 
              type="text" 
              placeholder="Search Quantum Island matrix..." 
              autoFocus
              className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        )}
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
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-2xl border shadow-xl transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 20, 27, 0.85) 0%, rgba(17, 33, 45, 0.75) 100%)',
            borderColor: `${settings.primaryColor}50`,
            boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${settings.primaryColor}20, inset 0 1px 1px rgba(255,255,255,0.15)`
          }}
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
                onClick={() => setActiveLink(link)}
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
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <kbd className="text-[9px] px-1 py-0.2 rounded bg-white/10 font-mono text-slate-400">⌘K</kbd>
          </button>

          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 relative text-slate-300 hover:text-white"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1 right-1 shadow-glow-cyan" />
          </button>

          <div 
            className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs border border-white/20"
            style={{ backgroundColor: `${settings.primaryColor}30`, color: settings.primaryColor }}
          >
            VX
          </div>
        </div>
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
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-2xl relative overflow-hidden"
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
                  onClick={() => setActiveLink(link)}
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
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-xs text-slate-200 transition-all backdrop-blur-md"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-mono text-[11px]">Search Matrix</span>
              <kbd className="text-[9px] px-1 py-0.2 rounded bg-white/10 font-mono text-slate-400">⌘K</kbd>
            </button>

            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 relative text-slate-200 transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5 shadow-glow-cyan" />
            </button>
          </div>
        </header>
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
          <div className="flex items-center gap-3">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white shadow-md"
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
                  onClick={() => setActiveLink(link)}
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
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>
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
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-xl relative overflow-hidden"
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
                onClick={() => setActiveLink(link)}
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
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15 hover:border-white/25 bg-white/5 text-xs text-slate-200 transition-all shadow-inner"
            >
              <Search className="w-3.5 h-3.5" style={{ color: settings.primaryColor }} />
              <span className="hidden sm:inline font-mono text-[11px]">Search...</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 text-[9px] rounded bg-white/10 font-mono text-slate-400">⌘K</kbd>
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-11 w-72 p-2.5 rounded-2xl bg-[#06141B]/95 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl z-50 animate-in fade-in zoom-in-95 font-mono">
                <input 
                  type="text" 
                  placeholder="Query HUD modules..." 
                  autoFocus
                  className="w-full px-3 py-1.5 bg-black/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              className="relative p-2 rounded-xl border border-white/15 hover:border-white/25 bg-white/5 text-slate-200 transition-all"
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
              <div className="absolute right-0 top-11 w-80 p-3 rounded-2xl bg-[#06141B]/95 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl z-50 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-semibold text-white">System Telemetry Feed</span>
                  <span className="text-[10px] text-cyan-400 cursor-pointer">Clear</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                    <div className="font-semibold text-cyan-300">Optical Bridge Rebalanced</div>
                    <div className="text-[10px] text-slate-400">Zero packet latency across US-East cluster.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
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
