import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  Search, 
  Monitor, 
  Laptop, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  Bookmark, 
  Share2, 
  SlidersHorizontal, 
  Layers, 
  Code2, 
  FileText, 
  Grid, 
  Sparkles, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Check, 
  ChevronDown,
  Maximize2,
  Copy
} from 'lucide-react';
import { THEME_PRESETS } from '../../data/themePresets';
import { ThemePreset } from '../../types/studio';

interface TopNavbarProps {
  onOpenSavePreset: () => void;
  onOpenExport: () => void;
  onOpenStyleSamples: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenSavePreset, onOpenExport, onOpenStyleSamples }) => {
  const { 
    activeComponent, 
    activeTab, 
    setActiveTab,
    deviceMode, 
    setDeviceMode, 
    canvasBg, 
    setCanvasBg, 
    customizations, 
    applyTheme, 
    resetCustomizations,
    setIsCommandPaletteOpen,
    isInspectorOpen,
    setIsInspectorOpen,
    zoomLevel,
    setZoomLevel
  } = useStudio();

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [bgDropdownOpen, setBgDropdownOpen] = useState(false);

  const deviceModes = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
    { id: 'laptop', label: 'Laptop', icon: Laptop, width: '1024px' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px' },
  ];

  return (
    <header className="h-14 border-b border-white/10 bg-[#080c14] px-4 flex items-center justify-between z-20 shrink-0 select-none">
      {/* Left: Breadcrumb & Search trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-all"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Search studio...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white/10 text-[10px] font-mono text-slate-400">
            ⌘K
          </kbd>
        </button>

        <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

        <div className="hidden lg:flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-mono">01. Navigation</span>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-white truncate max-w-[160px]">
            {activeComponent.name}
          </span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            LIVE
          </span>
        </div>
      </div>

      {/* Center: Tabs & Device Selector */}
      <div className="flex items-center gap-2">
        {/* Workspace Tab Switcher */}
        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'preview' 
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'code' 
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Code</span>
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'matrix' 
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">States</span>
          </button>
        </div>

        {/* Viewport Device Mode Selector */}
        {activeTab === 'preview' && (
          <div className="hidden md:flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
            {deviceModes.map((dm) => {
              const Icon = dm.icon;
              const isActive = deviceMode === dm.id;
              return (
                <button
                  key={dm.id}
                  onClick={() => setDeviceMode(dm.id as any)}
                  className={`p-1.5 rounded-lg text-xs transition-all ${
                    isActive ? 'bg-white/15 text-cyan-400 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title={`${dm.label} (${dm.width})`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right: Theme, Canvas, Reset, Presets, Inspector toggle */}
      <div className="flex items-center gap-2">
        {/* Theme Preset Dropdown */}
        <div className="relative">
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: customizations.primaryColor }}
            />
            <span className="capitalize hidden sm:inline">{customizations.theme}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {themeDropdownOpen && (
            <div className="absolute right-0 top-10 w-52 p-1.5 rounded-xl bg-slate-900 border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-500">
                Preset Themes
              </div>
              {Object.keys(THEME_PRESETS).map((tKey) => {
                const preset = THEME_PRESETS[tKey as ThemePreset];
                const isCurrent = customizations.theme === tKey;
                return (
                  <button
                    key={tKey}
                    onClick={() => {
                      applyTheme(tKey as ThemePreset);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                      isCurrent ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <span>{preset.name}</span>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetCustomizations}
          className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
          title="Reset to component default"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Save Preset Button */}
        <button
          onClick={onOpenSavePreset}
          className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
          title="Save Design Preset"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>

        {/* Style Samples Showcase Button */}
        <button
          onClick={onOpenStyleSamples}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold shadow-glow-cyan font-mono"
          title="Explore Futuristic Visual Style Samples"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Samples</span>
        </button>

        {/* Export / Share Modal Button */}
        <button
          onClick={onOpenExport}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        {/* Inspector Toggle Button */}
        <button
          onClick={() => setIsInspectorOpen(!isInspectorOpen)}
          className={`p-1.5 rounded-xl border transition-all ${
            isInspectorOpen
              ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300' 
              : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
          }`}
          title="Toggle Customization Inspector (Cmd+I)"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
