import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  Compass, 
  Search, 
  Star, 
  Clock, 
  Bookmark, 
  Layers, 
  Sliders, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Boxes,
  Zap,
  Plus,
  Lock,
  Radio,
  Activity,
  Terminal,
  Shield,
  Palette
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { NAVIGATION_COMPONENTS } from '../../data/navigationComponents';
import { ATMOSPHERIC_PALETTES } from '../../data/themePresets';
import { sound } from '../../utils/soundEngine';
import { ThemePreset } from '../../types/studio';

export const Sidebar: React.FC = () => {
  const { 
    activeComponent, 
    setActiveComponent, 
    searchQuery, 
    setSearchQuery,
    favorites,
    toggleFavorite,
    isFavorite,
    customTemplates,
    activeFilter,
    setActiveFilter,
    isSidebarOpen,
    setIsSidebarOpen,
    setIsTemplateInjectorOpen,
    applyTheme,
    customizations
  } = useStudio();

  const [expandedSubcats, setExpandedSubcats] = useState<{ [key: string]: boolean }>({
    header: true,
    navigation: true,
    'profile-actions': true,
    effects: true,
  });

  const toggleSubcat = (subcat: string) => {
    sound.playHover();
    setExpandedSubcats((prev) => ({ ...prev, [subcat]: !prev[subcat] }));
  };

  // Filter components
  const filteredComponents = NAVIGATION_COMPONENTS.filter((comp) => {
    const matchesSearch = 
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'favorites') return favorites.includes(comp.id);
    if (activeFilter === 'header') return comp.subcategory === 'header';
    if (activeFilter === 'navigation') return comp.subcategory === 'navigation';
    if (activeFilter === 'profile-actions') return comp.subcategory === 'profile-actions';
    if (activeFilter === 'effects') return comp.subcategory === 'effects';

    return true;
  });

  const subcategories = [
    { id: 'header', label: 'Header Protocols', count: '08 NODES', fullCount: 8 },
    { id: 'navigation', label: 'Navigation Matrix', count: '14 NODES', fullCount: 14 },
    { id: 'profile-actions', label: 'Profile & Actions', count: '07 NODES', fullCount: 7 },
    { id: 'effects', label: 'Micro-FX / Physics', count: '07 NODES', fullCount: 7 },
  ];

  if (!isSidebarOpen) {
    return (
      <div className="h-full border-r border-cyan-500/20 bg-[#04060c] p-2 flex flex-col items-center justify-between z-30 select-none">
        <button
          onClick={() => {
            sound.playBlip(1200);
            setIsSidebarOpen(true);
          }}
          className="p-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all shadow-glow-cyan"
          title="Expand Studio Navigation (Cmd+B)"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
        <div className="writing-mode-vertical text-[10px] font-mono tracking-widest text-cyan-400/60 uppercase">
          AURORA // HUD
        </div>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-glow-cyan" />
      </div>
    );
  }

  return (
    <aside className="w-80 h-full border-r border-[#253745]/60 bg-[#06141B] flex flex-col select-none z-30 shrink-0 font-sans">
      {/* 1. Cybernetic Brand Header */}
      <div className="p-4 border-b border-[#253745]/60 bg-[#11212D]/90 relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-glow-cyan border"
                style={{
                  background: `linear-gradient(135deg, ${customizations.primaryColor}, ${customizations.accentColor})`,
                  borderColor: `${customizations.primaryColor}80`
                }}
              >
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white font-mono">AURORA UI STUDIO</span>
                <span 
                  className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${customizations.primaryColor}20`,
                    color: customizations.primaryColor,
                    border: `1px solid ${customizations.primaryColor}40`
                  }}
                >
                  PRO
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="text-cyan-400">SYS: #0X889F</span>
                <span>•</span>
                <span className="text-emerald-400">STATUS: ONLINE</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playHover();
              setIsSidebarOpen(false);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Collapse Sidebar (Cmd+B)"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Style Samples / Palette Bar */}
        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] font-mono uppercase text-slate-500 font-bold flex items-center gap-1">
            <Palette className="w-3 h-3 text-cyan-400" />
            <span>Styles:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {ATMOSPHERIC_PALETTES.map((pal) => {
              const isSelected = customizations.theme === pal.themeId;
              return (
                <button
                  key={pal.id}
                  onClick={() => {
                    sound.playScan();
                    applyTheme(pal.themeId as ThemePreset);
                  }}
                  className={`w-5 h-5 rounded-md border transition-all ${
                    isSelected ? 'scale-125 border-white shadow-lg ring-1 ring-cyan-400' : 'border-white/20 opacity-70 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: pal.primary }}
                  title={`${pal.name} (Click to apply atmospheric sample)`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Tactical Blueprint Arsenal Card */}
      <div className="p-3 pb-0">
        <div 
          onClick={() => {
            sound.playScan();
            setIsTemplateInjectorOpen(true);
          }}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all shadow-glow-cyan flex items-center justify-between group cyber-box"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <span>BLUEPRINT VAULT</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 font-mono text-cyan-300 border border-cyan-500/40">
                  {customTemplates.length}
                </span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono block">
                + Inject / Manage Blueprints
              </span>
            </div>
          </div>
          <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
            <Plus className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-90 transition-transform" />
          </div>
        </div>
      </div>

      {/* 3. Search Protocol Matrix */}
      <div className="p-3 border-b border-white/5">
        <div className="relative flex items-center">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="> QUERY_PROTOCOL_MATRIX (⌘K)"
            className="w-full pl-8 pr-7 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-cyan-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-0.5 rounded hover:bg-white/10 text-slate-400"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 mt-2.5 overflow-x-auto scrollbar-none pb-0.5">
          {[
            { id: 'all', label: 'ALL (36)' },
            { id: 'favorites', label: `★ FAV (${favorites.length})` },
            { id: 'header', label: 'HDR (8)' },
            { id: 'navigation', label: 'NAV (14)' },
            { id: 'profile-actions', label: 'ACT (7)' },
            { id: 'effects', label: 'FX (7)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playHover();
                setActiveFilter(tab.id as any);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Main Component Navigator */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Active Category 01 Quantum Card */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-black border border-cyan-500/40 cyber-box">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold font-mono text-cyan-300">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>CATEGORY 01 // LIVE</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              36 NODES
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1.5 leading-snug">
            Navigation & Header Systems Matrix
          </div>
          <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-cyan-400/80 bg-black/40 px-2 py-1 rounded border border-white/5">
            <span>CORE STATUS:</span>
            <span className="text-emerald-400">100% OPERATIONAL</span>
          </div>
        </div>

        {/* Component Subcategories */}
        {subcategories.map((subcat) => {
          const compsInSubcat = filteredComponents.filter(c => c.subcategory === subcat.id);
          if (compsInSubcat.length === 0 && activeFilter !== 'all') return null;

          const isExpanded = expandedSubcats[subcat.id] ?? true;

          return (
            <div key={subcat.id} className="space-y-1">
              <button
                onClick={() => toggleSubcat(subcat.id)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                  <span>{subcat.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] opacity-60 text-cyan-400">{subcat.count}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="space-y-1 pl-2 border-l border-cyan-500/20 ml-2">
                  {compsInSubcat.map((comp, idx) => {
                    const isActive = activeComponent.id === comp.id;
                    const isFav = isFavorite(comp.id);
                    const indexStr = (idx + 1).toString().padStart(2, '0');

                    return (
                      <div
                        key={comp.id}
                        onClick={() => {
                          sound.playBlip(1300);
                          setActiveComponent(comp);
                        }}
                        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400 shadow-glow-cyan cyber-box'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                            {indexStr}.
                          </span>
                          <span className="truncate">{comp.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow-cyan animate-pulse" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sound.playConfirm();
                              toggleFavorite(comp.id);
                            }}
                            className={`p-1 rounded hover:bg-white/10 ${
                              isFav ? 'text-amber-400' : 'text-slate-600 opacity-0 group-hover:opacity-100'
                            }`}
                            title={isFav ? 'Remove Favorite' : 'Add to Favorites'}
                          >
                            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* 5. Future Categories 02–16 (Encrypted Classified Pods) */}
        <div className="pt-4 border-t border-cyan-500/20 space-y-2">
          <div className="px-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold flex items-center justify-between">
            <span>CLASSIFIED PROTOCOLS (02–16)</span>
            <Lock className="w-3 h-3 text-slate-600" />
          </div>

          <div className="space-y-1">
            {CATEGORIES.slice(1).map((cat) => (
              <div
                key={cat.id}
                className="group flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-500 border border-dashed border-white/10 bg-white/[0.01] hover:bg-cyan-950/20 hover:border-cyan-500/30 transition-all font-mono"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-[10px] opacity-40 text-cyan-400">{cat.number}</span>
                  <span className="truncate group-hover:text-slate-300 transition-colors">{cat.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-black/60 text-slate-500 group-hover:text-cyan-400 uppercase border border-white/5 shrink-0">
                    LOCKED // LVL-2
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Footer Telemetry */}
      <div className="p-3 border-t border-cyan-500/20 bg-black/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>AURORA v1.0 ONLINE</span>
        </div>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-cyan-400">⌘K</kbd>
      </div>
    </aside>
  );
};
