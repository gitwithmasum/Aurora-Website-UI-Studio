import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  Search, 
  Share2, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Bookmark
} from 'lucide-react';
import { THEME_PRESETS } from '../../data/themePresets';
import { ThemePreset } from '../../types/studio';
import { sound } from '../../utils/soundEngine';

interface TopNavbarProps {
  onOpenSavePreset?: () => void;
  onOpenExport?: () => void;
  onOpenStyleSamples?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ 
  onOpenExport,
  onOpenSavePreset,
  onOpenStyleSamples
}) => {
  const { 
    activeComponent, 
    activeTab, 
    setActiveTab,
    customizations, 
    applyTheme, 
    setIsCommandPaletteOpen,
    isInspectorOpen,
    setIsInspectorOpen,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useStudio();

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  return (
    <header className="mx-2 sm:mx-3 mt-2 sm:mt-2.5 h-12 rounded-[22px] sm:rounded-[26px] bg-[#070b1a]/80 backdrop-blur-3xl border border-white/[0.12] px-3 sm:px-4 flex items-center justify-between z-20 shrink-0 select-none min-w-0 shadow-[0_10px_35px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden gap-2">
      {/* Cosmic Galaxy Atmosphere & Specular Top Hairline */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18)_0%,_rgba(6,182,212,0.08)_50%,_transparent_80%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Left: Sidebar Collapse/Expand Toggle + Search + Clean Breadcrumb */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 relative z-10">
        {/* iOS-Style Sidebar Toggle Button */}
        <button
          onClick={() => {
            sound.playBlip(1200);
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className={`p-2 rounded-full border transition-all shrink-0 shadow-sm ${
            isSidebarOpen 
              ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/15' 
              : 'bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
          }`}
          title={isSidebarOpen ? "Collapse Sidebar (Cmd+B)" : "Expand Sidebar (Cmd+B)"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-3.5 h-3.5" />
          ) : (
            <PanelLeftOpen className="w-3.5 h-3.5" />
          )}
        </button>

        {/* iOS-Style Search Trigger Icon Button */}
        <button
          onClick={() => {
            sound.playHover();
            setIsCommandPaletteOpen(true);
          }}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all shrink-0 shadow-sm"
          title="Search Components (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
        </button>

        {/* Clean Active Component Title */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 min-w-0 font-sans pl-1">
          <span className="text-white font-semibold truncate max-w-[180px] md:max-w-[240px] lg:max-w-[320px]">
            {activeComponent.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse shrink-0" title="Active" />
        </div>
      </div>

      {/* Center: iOS Liquid Glass Segmented View Switcher */}
      <div className="flex items-center bg-black/40 p-1 rounded-full border border-white/10 shadow-inner backdrop-blur-xl text-xs shrink-0 relative z-10">
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
              className={`px-3.5 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs transition-all ${
                isActive
                  ? 'bg-white/20 text-white font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] backdrop-blur-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right: iOS Rounded Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 relative z-10">
        {/* Minimal Theme Dropdown */}
        <div className="relative">
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all font-sans shadow-sm"
            title="Switch Theme"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full ring-1 ring-white/30 shadow-[0_0_6px_rgba(255,255,255,0.3)] shrink-0" 
              style={{ backgroundColor: customizations.primaryColor }}
            />
            <span className="capitalize hidden md:inline text-xs text-slate-200 font-medium">
              {customizations.theme}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
          </button>

          {themeDropdownOpen && (
            <div className="absolute right-0 top-11 w-52 p-2 rounded-[22px] bg-[#090e21]/95 border border-white/15 shadow-2xl backdrop-blur-3xl z-50 animate-in fade-in zoom-in-95">
              <div className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-slate-400">
                Themes & Palettes
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1 mt-1 pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full text-xs transition-colors ${
                        isCurrent 
                          ? 'bg-white/15 text-white font-semibold shadow-sm' 
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

        {/* iOS-Style Style Archetypes Button */}
        {onOpenStyleSamples && (
          <button
            onClick={() => {
              sound.playConfirm();
              onOpenStyleSamples();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-400/20 text-xs text-indigo-300 hover:text-indigo-200 transition-all font-sans shrink-0 shadow-sm"
            title="Futuristic Style Archetypes"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span className="hidden xl:inline text-xs font-medium">Styles</span>
          </button>
        )}

        {/* iOS-Style Save Preset Button */}
        {onOpenSavePreset && (
          <button
            onClick={() => {
              sound.playConfirm();
              onOpenSavePreset();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/25 text-xs text-cyan-300 hover:text-cyan-200 transition-all font-sans shrink-0 shadow-sm"
            title="Save Design Preset"
          >
            <Bookmark className="w-3 h-3 text-cyan-400" />
            <span className="hidden lg:inline text-xs font-medium">Preset</span>
          </button>
        )}

        {/* iOS-Style Clean Export Button */}
        <button
          onClick={() => {
            sound.playHover();
            onOpenExport?.();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all font-sans shrink-0 shadow-sm"
          title="Export Component"
        >
          <Share2 className="w-3 h-3 text-slate-300" />
          <span className="hidden sm:inline text-xs font-medium">Export</span>
        </button>

        {/* iOS-Style Inspector Toggle */}
        <button
          onClick={() => {
            sound.playHover();
            setIsInspectorOpen(!isInspectorOpen);
          }}
          className={`p-2 rounded-full border transition-all shrink-0 shadow-sm ${
            isInspectorOpen
              ? 'bg-white/20 border-white/30 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]' 
              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/15'
          }`}
          title="Toggle Inspector (⌘I)"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};