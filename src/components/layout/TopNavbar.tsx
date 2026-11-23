import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  Search, 
  Share2, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  ChevronDown
} from 'lucide-react';
import { THEME_PRESETS } from '../../data/themePresets';
import { ThemePreset } from '../../types/studio';
import { sound } from '../../utils/soundEngine';

interface TopNavbarProps {
  onOpenSavePreset: () => void;
  onOpenExport: () => void;
  onOpenStyleSamples: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenExport, onOpenStyleSamples }) => {
  const { 
    activeComponent, 
    activeTab, 
    setActiveTab,
    customizations, 
    applyTheme, 
    setIsCommandPaletteOpen,
    isInspectorOpen,
    setIsInspectorOpen,
  } = useStudio();

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  return (
    <header className="h-11 border-b border-[#253745]/30 bg-[#06141B]/95 backdrop-blur-md px-4 flex items-center justify-between z-20 shrink-0 select-none">
      {/* Left: Minimal Search & Clean Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Subtle Search Trigger */}
        <button
          onClick={() => {
            sound.playHover();
            setIsCommandPaletteOpen(true);
          }}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors font-mono"
          title="Search Components (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline text-xs text-slate-400">Search</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 rounded bg-white/5 text-[9px] text-slate-500 font-mono">
            ⌘K
          </kbd>
        </button>

        <span className="text-slate-700 hidden md:inline">/</span>

        {/* Minimal Breadcrumb */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
          <span className="text-slate-400 capitalize">{activeComponent.subcategory}</span>
          <span className="text-slate-700">/</span>
          <span className="text-[#CCD0CF] font-medium truncate max-w-[200px]">
            {activeComponent.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1 opacity-80" title="Operational" />
        </div>
      </div>

      {/* Center: Apple/Linear-Style Segmented View Switcher */}
      <div className="flex items-center bg-black/40 p-0.5 rounded-lg border border-white/5 text-xs">
        {[
          { id: 'preview', label: 'Simulator' },
          { id: 'code', label: 'Code' },
          { id: 'matrix', label: 'States' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playBlip(1200);
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1 rounded-md text-xs transition-all ${
                isActive
                  ? 'bg-[#253745]/80 text-[#CCD0CF] font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right: Clean, Uncluttered Actions */}
      <div className="flex items-center gap-1.5">
        {/* Minimal Theme Dropdown */}
        <div className="relative">
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-slate-300 hover:bg-white/5 transition-colors font-mono"
            title="Switch Theme"
          >
            <span 
              className="w-2 h-2 rounded-full ring-1 ring-white/20" 
              style={{ backgroundColor: customizations.primaryColor }}
            />
            <span className="capitalize hidden sm:inline text-xs text-slate-300">
              {customizations.theme}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {themeDropdownOpen && (
            <div className="absolute right-0 top-8 w-48 p-1 rounded-xl bg-[#0B151F] border border-[#253745] shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-slate-500">
                Themes & Palettes
              </div>
              <div className="max-h-60 overflow-y-auto space-y-0.5">
                {Object.keys(THEME_PRESETS).map((tKey) => {
                  const preset = THEME_PRESETS[tKey as ThemePreset];
                  const isCurrent = customizations.theme === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => {
                        sound.playScan();
                        applyTheme(tKey as ThemePreset);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        isCurrent 
                          ? 'bg-[#253745]/60 text-cyan-200 font-semibold' 
                          : 'hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: preset.settings.primaryColor }}
                        />
                        <span className="truncate">{preset.name}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Minimal Samples Button */}
        <button
          onClick={() => {
            sound.playScan();
            onOpenStyleSamples();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/20 transition-all font-mono"
          title="Futuristic Style Samples Showcase"
        >
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span className="hidden sm:inline text-xs">Samples</span>
        </button>

        {/* Clean Export Button */}
        <button
          onClick={() => {
            sound.playHover();
            onOpenExport();
          }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-mono"
          title="Export Component"
        >
          <Share2 className="w-3 h-3 text-slate-400" />
          <span className="text-xs">Export</span>
        </button>

        {/* Minimal Inspector Toggle */}
        <button
          onClick={() => {
            sound.playHover();
            setIsInspectorOpen(!isInspectorOpen);
          }}
          className={`p-1.5 rounded-md transition-colors ${
            isInspectorOpen
              ? 'bg-[#253745]/80 text-[#CCD0CF]' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Toggle Inspector (⌘I)"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};