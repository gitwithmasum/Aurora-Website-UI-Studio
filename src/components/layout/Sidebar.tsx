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
  FileCode
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { NAVIGATION_COMPONENTS } from '../../data/navigationComponents';
import { sound } from '../../utils/soundEngine';

export const Sidebar: React.FC = () => {
  const { 
    activeComponent, 
    setActiveComponent, 
    searchQuery, 
    setSearchQuery,
    favorites,
    toggleFavorite,
    isFavorite,
    recentlyViewed,
    savedPresets,
    customTemplates,
    activeFilter,
    setActiveFilter,
    isSidebarOpen,
    setIsSidebarOpen,
    setIsTemplateInjectorOpen
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
    { id: 'header', label: 'Header Components', count: NAVIGATION_COMPONENTS.filter(c => c.subcategory === 'header').length },
    { id: 'navigation', label: 'Navigation Components', count: NAVIGATION_COMPONENTS.filter(c => c.subcategory === 'navigation').length },
    { id: 'profile-actions', label: 'Profile & Actions', count: NAVIGATION_COMPONENTS.filter(c => c.subcategory === 'profile-actions').length },
    { id: 'effects', label: 'Navigation Effects', count: NAVIGATION_COMPONENTS.filter(c => c.subcategory === 'effects').length },
  ];

  if (!isSidebarOpen) {
    return (
      <div className="h-full border-r border-cyan-500/15 bg-[#050811] p-2 flex flex-col items-center justify-between z-30 select-none">
        <button
          onClick={() => {
            sound.playBlip(1200);
            setIsSidebarOpen(true);
          }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10 transition-colors"
          title="Expand Studio Navigation (Cmd+B)"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
        <div className="writing-mode-vertical text-[10px] font-mono tracking-widest text-cyan-500/40 uppercase">
          AURORA // NAV
        </div>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-glow-cyan" />
      </div>
    );
  }

  return (
    <aside className="w-80 h-full border-r border-cyan-500/15 bg-[#050811] flex flex-col select-none z-30 shrink-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-glow-cyan">
            <Boxes className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">AURORA UI STUDIO</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">16 Categories • Futuristic HUD</span>
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

      {/* Blueprint Vault Quick Launcher Card */}
      <div className="p-3 pb-0">
        <div 
          onClick={() => {
            sound.playScan();
            setIsTemplateInjectorOpen(true);
          }}
          className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-indigo-950/40 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all shadow-glow-cyan flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Blueprint Arsenal</span>
                <span className="text-[9px] px-1 rounded bg-cyan-500/30 font-mono text-cyan-300">{customTemplates.length}</span>
              </div>
              <span className="text-[10px] text-cyan-400/80 font-mono block">Click to Inject / View Vault</span>
            </div>
          </div>
          <Plus className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform" />
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-white/5">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 36 components... (⌘K)"
            className="w-full pl-8 pr-7 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
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

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-1 mt-2.5 overflow-x-auto scrollbar-none pb-0.5">
          {[
            { id: 'all', label: 'All (36)' },
            { id: 'favorites', label: `★ Favs (${favorites.length})` },
            { id: 'header', label: 'Headers' },
            { id: 'navigation', label: 'Nav' },
            { id: 'profile-actions', label: 'Actions' },
            { id: 'effects', label: 'Effects' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Component Navigator */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Active Category 01 Banner */}
        <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-cyan-300">Category 01 — Navigation & Header</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
              36 LIVE
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-snug">
            36 components with live simulators, multi-templates, and custom code injector.
          </p>
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
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider"
              >
                <span>{subcat.label} ({compsInSubcat.length})</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {isExpanded && (
                <div className="space-y-0.5 pl-1">
                  {compsInSubcat.map((comp) => {
                    const isActive = activeComponent.id === comp.id;
                    const isFav = isFavorite(comp.id);

                    return (
                      <div
                        key={comp.id}
                        onClick={() => setActiveComponent(comp)}
                        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 font-semibold border border-cyan-500/40 shadow-glow-cyan'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span 
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isActive ? 'bg-cyan-400 shadow-glow-cyan' : 'bg-slate-600 group-hover:bg-cyan-400'
                            }`} 
                          />
                          <span className="truncate">{comp.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Favorite Star */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(comp.id);
                            }}
                            className={`p-1 rounded hover:bg-white/10 ${
                              isFav ? 'text-amber-400' : 'text-slate-500 opacity-0 group-hover:opacity-100'
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

        {/* Categories 02–16 Listing (Marked as Coming Soon) */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="px-2 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            FUTURE CATEGORIES (02–16)
          </div>

          <div className="space-y-1">
            {CATEGORIES.slice(1).map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-500 border border-dashed border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] font-mono opacity-60">{cat.number}</span>
                  <span className="truncate">{cat.name}</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 uppercase shrink-0">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>AURORA v1.0 ONLINE</span>
        </div>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">⌘K</kbd>
      </div>
    </aside>
  );
};
