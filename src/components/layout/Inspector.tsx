import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  Sliders, 
  Palette, 
  Maximize, 
  Sparkles, 
  Type, 
  Activity, 
  Copy, 
  Check, 
  RotateCcw, 
  Bookmark, 
  X,
  ChevronDown,
  Layers,
  Shield,
  Zap,
  Eye
} from 'lucide-react';
import { THEME_PRESETS, ATMOSPHERIC_PALETTES, AtmosphericPalette } from '../../data/themePresets';
import { ThemePreset, InteractionState } from '../../types/studio';
import { sound } from '../../utils/soundEngine';

export const Inspector: React.FC = () => {
  const { 
    activeComponent, 
    activeVariantId, 
    setActiveVariantId,
    customizations, 
    updateCustomizations, 
    applyTheme, 
    resetCustomizations,
    isInspectorOpen,
    setIsInspectorOpen,
    savePreset
  } = useStudio();

  const [activeSection, setActiveSection] = useState<'variants' | 'theme' | 'dimensions' | 'effects' | 'typography' | 'states'>('variants');
  const [copiedConfig, setCopiedConfig] = useState(false);

  if (!isInspectorOpen) return null;

  const handleCopyConfig = () => {
    navigator.clipboard?.writeText(JSON.stringify(customizations, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const primaryColors = ['#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#10b981', '#eab308', '#ffffff'];

  const interactionStates: { id: InteractionState; label: string }[] = [
    { id: 'default', label: 'Default' },
    { id: 'hover', label: 'Hover' },
    { id: 'active', label: 'Active' },
    { id: 'focus', label: 'Focus' },
    { id: 'pressed', label: 'Pressed' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'loading', label: 'Loading' },
    { id: 'selected', label: 'Selected' },
  ];

  return (
    <>
      {/* Backdrop on screens < 2xl when Inspector is open */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 2xl:hidden transition-opacity"
        onClick={() => {
          sound.playHover();
          setIsInspectorOpen(false);
        }}
      />

      <aside className="fixed 2xl:static inset-y-0 right-0 z-50 2xl:z-20 w-80 max-w-[90vw] h-full border-l border-[#253745]/60 bg-[#06141B] flex flex-col shrink-0 select-none shadow-2xl 2xl:shadow-none transition-transform duration-300">
      {/* Inspector Header */}
      <div className="p-4 border-b border-[#253745]/60 bg-[#11212D]/90 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-xs uppercase tracking-wider text-white">
            Customization Inspector
          </span>
        </div>
        <button
          onClick={() => setIsInspectorOpen(false)}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          title="Close Inspector (Cmd+I)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-3 p-1.5 gap-1 border-b border-white/5 bg-slate-950/40 text-[11px] font-medium text-slate-400">
        {[
          { id: 'variants', label: 'Variants', icon: Sparkles },
          { id: 'theme', label: 'Colors', icon: Palette },
          { id: 'dimensions', label: 'Spacing', icon: Maximize },
          { id: 'effects', label: 'Effects', icon: Zap },
          { id: 'typography', label: 'Type', icon: Type },
          { id: 'states', label: 'States', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40' 
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Controls Content Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-300">
        {/* 1. VARIANTS SECTION */}
        {activeSection === 'variants' && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Design Variations ({activeComponent.variations.length})
              </label>
              <div className="space-y-2">
                {activeComponent.variations.map((v) => {
                  const isSelected = activeVariantId === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setActiveVariantId(v.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-cyan-950/30 border-cyan-400 text-white shadow-glow-cyan' 
                          : 'bg-white/5 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-white">{v.name}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan" />}
                      </div>
                      <p className="text-[11px] opacity-70 mt-1 leading-snug">
                        {v.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="font-semibold text-white block mb-1">Component Information</span>
              <p className="text-[11px] opacity-70 leading-relaxed mb-2">
                {activeComponent.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {activeComponent.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-cyan-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. THEME & COLORS SECTION */}
        {activeSection === 'theme' && (
          <div className="space-y-5">
            {/* Curated Atmospheric Color Palettes (Inspired by @uiuxaadi showcases) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Atmospheric Palettes</span>
                </label>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                  VOLUMETRIC
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2 leading-tight">
                Curated glow harmonies with lateral spotlights and capsule pill aesthetics:
              </p>

              <div className="space-y-2">
                {ATMOSPHERIC_PALETTES.map((pal) => {
                  const isCurrent = customizations.theme === pal.themeId;
                  return (
                    <div
                      key={pal.id}
                      onClick={() => applyTheme(pal.themeId)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-cyan-400 bg-cyan-950/30 shadow-glow-cyan'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-xs text-white">{pal.name}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>

                      {/* Stacked Color Pill Preview (matching the reference images) */}
                      <div className="flex items-center gap-1 h-6 rounded-lg overflow-hidden p-0.5 bg-black/40 border border-white/10">
                        {pal.colors.map((hex) => (
                          <div
                            key={hex}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard?.writeText(hex);
                              updateCustomizations({ primaryColor: hex });
                            }}
                            className="flex-1 h-full rounded transition-transform hover:scale-110 relative group"
                            style={{ backgroundColor: hex }}
                            title={`Click to copy: ${hex}`}
                          >
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30">
                              {hex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Standard Theme Presets Grid */}
            <div className="pt-2 border-t border-white/10">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                All Presets ({Object.keys(THEME_PRESETS).length})
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(THEME_PRESETS).map((tKey) => {
                  const preset = THEME_PRESETS[tKey as ThemePreset];
                  const isCurrent = customizations.theme === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => applyTheme(tKey as ThemePreset)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        isCurrent 
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-glow-cyan' 
                          : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full border border-white/20 shrink-0" 
                          style={{ backgroundColor: preset.settings.primaryColor }}
                        />
                        <span className="text-xs truncate">{preset.badge}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Color Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Primary Accent Color
                </label>
                <span className="text-[10px] font-mono text-cyan-300">{customizations.primaryColor}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {primaryColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateCustomizations({ primaryColor: color })}
                    className={`w-6 h-6 rounded-full border transition-transform ${
                      customizations.primaryColor === color ? 'scale-125 border-white shadow' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input 
                  type="color"
                  value={customizations.primaryColor}
                  onChange={(e) => updateCustomizations({ primaryColor: e.target.value })}
                  className="w-7 h-7 rounded-lg bg-transparent cursor-pointer ml-1"
                />
              </div>
            </div>

            {/* Accent Glow Color */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Secondary Glow Color
                </label>
                <span className="text-[10px] font-mono text-cyan-300">{customizations.accentColor}</span>
              </div>
              <input 
                type="color"
                value={customizations.accentColor}
                onChange={(e) => updateCustomizations({ accentColor: e.target.value })}
                className="w-full h-8 rounded-lg bg-white/5 border border-white/10 cursor-pointer p-1"
              />
            </div>

            {/* Background Color */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Surface Background
                </label>
                <span className="text-[10px] font-mono">{customizations.bgColor}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Obsidian', val: '#080c14' },
                  { label: 'Navy', val: '#0f172a' },
                  { label: 'Pitch Black', val: '#000000' },
                  { label: 'Deep Glass', val: 'rgba(15, 23, 42, 0.65)' },
                  { label: 'Pure Frost', val: 'rgba(255, 255, 255, 0.08)' },
                  { label: 'White', val: '#ffffff' },
                ].map((bg) => (
                  <button
                    key={bg.label}
                    onClick={() => updateCustomizations({ bgColor: bg.val })}
                    className={`py-1.5 px-2 rounded-lg border text-[11px] truncate transition-colors ${
                      customizations.bgColor === bg.val ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' : 'border-white/5 bg-white/5'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. DIMENSIONS & SPACING SECTION */}
        {activeSection === 'dimensions' && (
          <div className="space-y-4">
            {/* Border Radius Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Border Radius
                </label>
                <span className="text-[10px] font-mono text-cyan-300">{customizations.borderRadius}px</span>
              </div>
              <input 
                type="range"
                min="0"
                max="32"
                value={customizations.borderRadius}
                onChange={(e) => updateCustomizations({ borderRadius: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Border Width Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Border Width
                </label>
                <span className="text-[10px] font-mono text-cyan-300">{customizations.borderWidth}px</span>
              </div>
              <input 
                type="range"
                min="0"
                max="4"
                value={customizations.borderWidth}
                onChange={(e) => updateCustomizations({ borderWidth: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Padding Y Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Vertical Padding (Y)
                </label>
                <span className="text-[10px] font-mono text-cyan-300">{customizations.paddingY}px</span>
              </div>
              <input 
                type="range"
                min="4"
                max="28"
                value={customizations.paddingY}
                onChange={(e) => updateCustomizations({ paddingY: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Padding X Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Horizontal Padding (X)
                </label>
                <span className="text-[10px] font-mono text-cyan-300">{customizations.paddingX}px</span>
              </div>
              <input 
                type="range"
                min="8"
                max="48"
                value={customizations.paddingX}
                onChange={(e) => updateCustomizations({ paddingX: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Gap Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Item Gap
                </label>
                <span className="text-[10px] font-mono text-cyan-300">{customizations.gap}px</span>
              </div>
              <input 
                type="range"
                min="4"
                max="32"
                value={customizations.gap}
                onChange={(e) => updateCustomizations({ gap: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* 4. EFFECTS & BLUR SECTION */}
        {activeSection === 'effects' && (
          <div className="space-y-4">
            {/* Shadow Styles */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Drop Shadow & Glow Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['none', 'soft', 'glow', 'dramatic', 'neon'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateCustomizations({ shadowStyle: s })}
                    className={`py-2 px-3 rounded-xl border text-xs capitalize transition-all ${
                      customizations.shadowStyle === s
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                        : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Blur Intensity Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Backdrop Blur Filter
                </label>
                <span className="text-[10px] font-mono text-cyan-300">{customizations.blurIntensity}px</span>
              </div>
              <input 
                type="range"
                min="0"
                max="32"
                value={customizations.blurIntensity}
                onChange={(e) => updateCustomizations({ blurIntensity: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Border Style */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Border Pattern
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['solid', 'dashed', 'none'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => updateCustomizations({ borderStyle: style })}
                    className={`py-1.5 rounded-lg border text-xs capitalize transition-all ${
                      customizations.borderStyle === style
                        ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 font-semibold'
                        : 'border-white/5 bg-white/5'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. TYPOGRAPHY & ICONS SECTION */}
        {activeSection === 'typography' && (
          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Font Size
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['xs', 'sm', 'base', 'lg'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateCustomizations({ fontSize: size })}
                    className={`py-1.5 rounded-lg border text-xs uppercase font-mono transition-all ${
                      customizations.fontSize === size
                        ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 font-semibold'
                        : 'border-white/5 bg-white/5'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Weight */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Font Weight
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['normal', 'medium', 'semibold', 'bold'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => updateCustomizations({ fontWeight: w })}
                    className={`py-1.5 rounded-lg border text-xs capitalize transition-all ${
                      customizations.fontWeight === w
                        ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 font-semibold'
                        : 'border-white/5 bg-white/5'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Letter Spacing */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Letter Spacing
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['tight', 'normal', 'wide'] as const).map((ls) => (
                  <button
                    key={ls}
                    onClick={() => updateCustomizations({ letterSpacing: ls })}
                    className={`py-1.5 rounded-lg border text-xs capitalize transition-all ${
                      customizations.letterSpacing === ls
                        ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 font-semibold'
                        : 'border-white/5 bg-white/5'
                    }`}
                  >
                    {ls}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. INTERACTION STATES SIMULATOR SECTION */}
        {activeSection === 'states' && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Force Interaction State
              </label>
              <p className="text-[11px] opacity-70 mb-3 leading-snug">
                Simulate how this component renders across various functional browser states:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {interactionStates.map((st) => {
                  const isActive = customizations.activeState === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => updateCustomizations({ activeState: st.id })}
                      className={`p-2 rounded-xl border text-left text-xs capitalize transition-all ${
                        isActive 
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-glow-cyan' 
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{st.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-white/10 bg-black/40 space-y-2">
        <button
          onClick={handleCopyConfig}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
        >
          {copiedConfig ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Configuration Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>Copy Configuration (JSON)</span>
            </>
          )}
        </button>

        <button
          onClick={resetCustomizations}
          className="w-full flex items-center justify-center gap-2 py-1.5 rounded-xl text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>
    </aside>
  </>
);
};
