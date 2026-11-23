import React, { useState, useEffect } from 'react';
import { useStudio, ALL_COMPONENTS } from '../../context/StudioContext';
import { 
  Search, 
  Sparkles, 
  Layers, 
  Settings, 
  Palette, 
  X, 
  Command,
  ArrowRight
} from 'lucide-react';
import { THEME_PRESETS } from '../../data/themePresets';
import { ThemePreset } from '../../types/studio';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    setActiveComponent, 
    applyTheme,
    resetCustomizations,
    setIsInspectorOpen,
    setIsSidebarOpen
  } = useStudio();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  // Filter commands and components across ALL 307 studio components
  const matchingComponents = ALL_COMPONENTS.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || 
           c.subcategory.toLowerCase().includes(query.toLowerCase()) ||
           c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-white/20 bg-slate-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-4 h-4 text-cyan-400" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a component, action, or theme preset..."
            className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-white/40"
            autoFocus
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-4 text-xs">
          {/* Quick Studio Actions */}
          <div>
            <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-500 font-bold">
              Studio Actions
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  resetCustomizations();
                  setIsCommandPaletteOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Reset Component to Default Configuration</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono opacity-60">Reset</kbd>
              </button>

              <button
                onClick={() => {
                  setIsInspectorOpen(true);
                  setIsCommandPaletteOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-blue-400" />
                  <span>Open Customization Inspector Pane</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono opacity-60">⌘I</kbd>
              </button>
            </div>
          </div>

          {/* Preset Theme Switchers */}
          <div>
            <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-500 font-bold">
              Switch Theme Preset
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(THEME_PRESETS) as ThemePreset[]).map((tKey) => (
                <button
                  key={tKey}
                  onClick={() => {
                    applyTheme(tKey);
                    setIsCommandPaletteOpen(false);
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white text-left border border-white/5"
                >
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="capitalize">{THEME_PRESETS[tKey].name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Matching Navigation Components */}
          <div>
            <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-500 font-bold">
              Navigation & Header Components ({matchingComponents.length})
            </div>
            <div className="space-y-0.5">
              {matchingComponents.slice(0, 10).map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => {
                    setActiveComponent(comp);
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="font-medium">{comp.name}</span>
                  </div>
                  <span className="text-[10px] opacity-50 font-mono capitalize">
                    {comp.subcategory}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-black/50 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Press ESC to close</span>
          <span>Click to select</span>
        </div>
      </div>
    </div>
  );
};
