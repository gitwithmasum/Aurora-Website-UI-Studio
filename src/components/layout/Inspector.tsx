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
  ChevronUp,
  ChevronRight,
  Layers,
  Shield,
  Zap,
  Eye,
  Trash2,
  Plus
} from 'lucide-react';
import { THEME_PRESETS, ATMOSPHERIC_PALETTES, AtmosphericPalette } from '../../data/themePresets';
import { ThemePreset, InteractionState } from '../../types/studio';
import { FUTURISTIC_SAMPLES, SampleArchetype } from '../shared/FuturisticSampleBar';
import { sound } from '../../utils/soundEngine';

interface InspectorProps {
  onOpenSavePreset?: () => void;
}

export const Inspector: React.FC<InspectorProps> = ({ onOpenSavePreset }) => {
  const { 
    activeComponent, 
    activeVariantId, 
    setActiveVariantId,
    customTemplates,
    activeCustomTemplateId,
    setActiveCustomTemplateId,
    applyCustomTemplate,
    deleteCustomTemplate,
    setIsTemplateInjectorOpen,
    customizations, 
    updateCustomizations, 
    applyTheme, 
    resetCustomizations,
    isInspectorOpen,
    setIsInspectorOpen,
    savePreset,
    hudMode,
    setHudMode,
    crtEnabled,
    setCrtEnabled
  } = useStudio();

  const [activeSection, setActiveSection] = useState<'samples' | 'variants' | 'theme' | 'dimensions' | 'effects' | 'typography' | 'states'>('samples');
  const [selectedSampleId, setSelectedSampleId] = useState<string>('aurora-midnight-steel');
  const [showArranger, setShowArranger] = useState<boolean>(true);
  const [copiedConfig, setCopiedConfig] = useState(false);

  if (!isInspectorOpen) return null;

  const handleApplySample = (sample: SampleArchetype) => {
    sound.playConfirm();
    setSelectedSampleId(sample.id);
    applyTheme(sample.themeId);
    
    updateCustomizations({
      primaryColor: sample.primaryColor,
      accentColor: sample.accentColor,
      bgColor: sample.bgColor,
      borderRadius: sample.borderRadius,
      borderWidth: sample.borderWidth,
      blurIntensity: sample.blurIntensity,
      shadowStyle: sample.shadowStyle
    });

    if (sample.hudReticle) {
      setHudMode('tactical');
    } else {
      setHudMode('standard');
    }
    if (sample.crtEffect !== undefined) {
      setCrtEnabled(sample.crtEffect);
    }
  };

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
      {/* Mobile Dimmed Backdrop */}
      <div 
        className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => {
          sound.playHover();
          setIsInspectorOpen(false);
        }}
      />

      <aside className="fixed md:static inset-y-0 right-0 z-50 md:z-20 w-80 xl:w-88 max-w-[88vw] my-0 md:my-2.5 md:mr-2.5 h-full md:h-[calc(100%-1.25rem)] rounded-none md:rounded-[28px] border-l md:border border-white/[0.12] bg-[#070b1a]/85 backdrop-blur-3xl flex flex-col select-none shrink-0 font-sans shadow-2xl md:shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden relative transition-all duration-300">
        {/* Cosmic Galaxy Atmosphere & Ambient Nebula Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18)_0%,_rgba(168,85,247,0.1)_40%,_transparent_75%)] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-56 h-56 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

        {/* 1. iOS-Inspired Galaxy Inspector Header */}
        <div className="p-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-9 h-9 rounded-[13px] p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.35)] ring-1 ring-white/20 transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)' }}
              >
                <div className="w-full h-full rounded-[12px] bg-[#070b1a]/70 backdrop-blur-md flex items-center justify-center font-bold text-white">
                  <Sliders className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs tracking-tight text-white font-sans uppercase">
                    Customization Inspector
                  </span>
                </div>
                <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                  <span className="text-slate-400 font-semibold">LIVE CONTROLLER</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playHover();
                setIsInspectorOpen(false);
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all shadow-sm active:scale-95"
              title="Close Inspector (Cmd+I)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. iOS Segmented Sub-Tabs */}
        <div className="px-3 py-2 border-b border-white/[0.08] bg-black/25 backdrop-blur-xl relative z-10">
          <div className="flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-0.5">
            {[
              { id: 'samples', label: 'Archetypes', icon: Sparkles },
              { id: 'variants', label: 'Variants', icon: Layers },
              { id: 'theme', label: 'Colors', icon: Palette },
              { id: 'effects', label: 'Effects', icon: Zap },
              { id: 'dimensions', label: 'Spacing', icon: Maximize },
              { id: 'typography', label: 'Type', icon: Type },
              { id: 'states', label: 'States', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playHover();
                    setActiveSection(tab.id as any);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans transition-all shrink-0 ${
                    isActive 
                      ? 'bg-white/20 text-white font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] backdrop-blur-md border border-white/25 ring-1 ring-cyan-400/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Controls Content Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-300 relative z-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* 0. FUTURISTIC SAMPLES ARSENAL (ARCHETYPES) SECTION */}
        {activeSection === 'samples' && (
          <div className="space-y-4">
            {/* Section Header Card */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-inner relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SAMPLES ARSENAL</span>
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold">
                  6 ARCHETYPES
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug font-sans">
                Click any archetype to adapt live studio atmosphere, lighting & decals:
              </p>
            </div>

            {/* Archetype Cards Stack */}
            <div className="space-y-2.5">
              {FUTURISTIC_SAMPLES.map((sample) => {
                const isSelected = selectedSampleId === sample.id || customizations.theme === sample.themeId;
                return (
                  <div
                    key={sample.id}
                    onClick={() => handleApplySample(sample)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group backdrop-blur-2xl ${
                      isSelected
                        ? 'border-cyan-400/80 bg-gradient-to-br from-cyan-500/15 via-white/[0.06] to-indigo-500/15 shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] shadow-sm'
                    }`}
                  >
                    {/* Lateral Spotlight Glow Flare Preview */}
                    <div 
                      className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none"
                      style={{ backgroundColor: sample.flareColor }}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase border shadow-sm"
                          style={{
                            backgroundColor: `${sample.primaryColor}20`,
                            color: sample.primaryColor,
                            borderColor: `${sample.primaryColor}50`
                          }}
                        >
                          {sample.badge}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[9px] font-mono text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/40">
                            <Check className="w-2.5 h-2.5" /> ACTIVE
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-xs text-white tracking-tight line-clamp-1 mb-0.5">
                        {sample.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mb-2.5 font-mono">
                        {sample.tagline}
                      </p>

                      {/* 6-Color Palette Mini Capsule Swatch */}
                      <div className="flex items-center gap-1 p-1 rounded-full bg-black/40 border border-white/10 mb-2.5 shadow-inner">
                        {sample.colors.map((hex, i) => (
                          <div
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              sound.playBlip(1600);
                              navigator.clipboard?.writeText(hex);
                              updateCustomizations({ primaryColor: hex });
                            }}
                            className="flex-1 h-3 rounded-full transition-transform hover:scale-125 cursor-pointer shadow-sm"
                            style={{ backgroundColor: hex }}
                            title={`Click to copy & apply ${hex} as primary`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
                      <span className="group-hover:text-cyan-300 transition-colors">
                        {isSelected ? 'Ready to Arrange' : 'Click to Load'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Arrange & Customize Fine-Tuning Drawer / Box */}
            <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-sm space-y-3">
              <div 
                onClick={() => {
                  sound.playBlip(1200);
                  setShowArranger(!showArranger);
                }}
                className="flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Arrange & Customize</span>
                </div>
                <button className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                  {showArranger ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showArranger && (
                <div className="space-y-3 pt-2.5 border-t border-white/10 text-xs font-mono animate-in slide-in-from-top-1">
                  {/* 1. Shadow & Flare Glow */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5 text-[10px]">
                      <span className="text-slate-400 font-sans">SHADOW & FLARE GLOW</span>
                      <span className="text-cyan-300 font-bold uppercase">{customizations.shadowStyle}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {(['none', 'soft', 'glow', 'neon', 'dramatic'] as const).map((style) => (
                        <button
                          key={style}
                          onClick={() => updateCustomizations({ shadowStyle: style })}
                          className={`py-1 rounded-full text-[9px] border capitalize transition-all ${
                            customizations.shadowStyle === style
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-sm'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Glass Blur */}
                  <div>
                    <div className="flex items-center justify-between mb-1 text-[10px]">
                      <span className="text-slate-400 font-sans">GLASS BLUR</span>
                      <span className="text-cyan-300 font-bold">{customizations.blurIntensity}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={customizations.blurIntensity}
                      onChange={(e) => updateCustomizations({ blurIntensity: Number(e.target.value) })}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  {/* 3. Corner Radius Geometry */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5 text-[10px]">
                      <span className="text-slate-400 font-sans">CORNER GEOMETRY</span>
                      <span className="text-cyan-300 font-bold">{customizations.borderRadius}px</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { label: 'HUD Sharp', val: 0 },
                        { label: 'Cyber', val: 8 },
                        { label: 'Soft', val: 16 },
                        { label: 'Pill', val: 32 }
                      ].map((rad) => (
                        <button
                          key={rad.label}
                          onClick={() => updateCustomizations({ borderRadius: rad.val })}
                          className={`py-1 rounded-full text-[9px] border transition-all ${
                            customizations.borderRadius === rad.val
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-sm'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {rad.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. HUD Reticle Decal Toggle */}
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">HUD RETICLE DECAL</span>
                      <span className="text-[9px] text-cyan-300 font-mono">
                        {hudMode === 'tactical' ? 'BRACKETS ACTIVE' : 'CLEAN VIEW'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        sound.playScan();
                        setHudMode(hudMode === 'tactical' ? 'standard' : 'tactical');
                      }}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                        hudMode === 'tactical'
                          ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-sm'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {hudMode === 'tactical' ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  {/* 5. CRT Monitor Effect Toggle */}
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">CRT SCANLINE EFFECT</span>
                      <span className="text-[9px] text-cyan-300 font-mono">
                        {crtEnabled ? 'SCANLINES ACTIVE' : 'OFF'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        sound.playScan();
                        setCrtEnabled(!crtEnabled);
                      }}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                        crtEnabled
                          ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-sm'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {crtEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* 1. VARIANTS SECTION */}
        {activeSection === 'variants' && (() => {
          const componentCustomTemplates = customTemplates.filter(
            (t) => t.componentId === activeComponent.id
          );

          return (
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold font-sans">
                  Design Variations ({activeComponent.variations.length})
                </label>
                <div className="space-y-2">
                  {activeComponent.variations.map((v) => {
                    const isSelected = !activeCustomTemplateId && activeVariantId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => {
                          sound.playBlip(1200);
                          setActiveVariantId(v.id);
                          setActiveCustomTemplateId(null);
                        }}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all backdrop-blur-xl ${
                          isSelected 
                            ? 'bg-gradient-to-br from-cyan-500/20 via-white/[0.06] to-indigo-500/20 border-cyan-400/80 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50' 
                            : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-white">{v.name}</span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />}
                        </div>
                        <p className="text-[11px] opacity-70 mt-1 leading-snug">
                          {v.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Blueprints for this Component */}
              {componentCustomTemplates.length > 0 && (
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block font-bold flex items-center gap-1.5 font-sans">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Custom Blueprints ({componentCustomTemplates.length})</span>
                    </label>
                    <button 
                      onClick={() => setIsTemplateInjectorOpen(true)}
                      className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/25"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>New</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {componentCustomTemplates.map((tmpl) => {
                      const isSelected = activeCustomTemplateId === tmpl.id;
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() => applyCustomTemplate(tmpl)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all backdrop-blur-xl ${
                            isSelected 
                              ? 'bg-gradient-to-br from-cyan-500/20 via-white/[0.06] to-teal-500/20 border-cyan-400/80 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50' 
                              : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-xs text-white">{tmpl.name}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-400/30">
                                BLUEPRINT
                              </span>
                            </div>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />}
                          </div>
                          <p className="text-[11px] opacity-70 mt-1 leading-snug">
                            {tmpl.description}
                          </p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-400">
                            <span>{tmpl.createdAt}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCustomTemplate(tmpl.id);
                              }}
                              className="hover:text-rose-400 text-slate-500 transition-colors p-1"
                              title="Delete Blueprint"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-inner">
                <span className="font-semibold text-white block mb-1">Component Information</span>
                <p className="text-[11px] opacity-70 leading-relaxed mb-2 font-sans">
                  {activeComponent.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeComponent.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/10 text-[9px] font-mono text-cyan-300 border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* 2. THEME & COLORS SECTION */}
        {activeSection === 'theme' && (
          <div className="space-y-5">
            {/* Quick Archetype Showcase Jump */}
            <div 
              onClick={() => {
                sound.playHover();
                setActiveSection('samples');
              }}
              className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-white/[0.04] to-indigo-500/15 border border-cyan-400/30 hover:border-cyan-400 cursor-pointer transition-all flex items-center justify-between group shadow-sm backdrop-blur-xl"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-sans font-bold text-white">6 Futuristic Archetypes Arsenal</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Curated Atmospheric Color Palettes (Inspired by @uiuxaadi showcases) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5 font-sans">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Atmospheric Palettes</span>
                </label>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold">
                  VOLUMETRIC
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2.5 leading-tight font-sans">
                Curated glow harmonies with lateral spotlights and capsule pill aesthetics:
              </p>

              <div className="space-y-2">
                {ATMOSPHERIC_PALETTES.map((pal) => {
                  const isCurrent = customizations.theme === pal.themeId;
                  return (
                    <div
                      key={pal.id}
                      onClick={() => applyTheme(pal.themeId)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all backdrop-blur-xl ${
                        isCurrent
                          ? 'border-cyan-400/80 bg-gradient-to-br from-cyan-500/20 via-white/[0.05] to-indigo-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-xs text-white">{pal.name}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>

                      {/* Stacked Color Pill Preview (matching the reference images) */}
                      <div className="flex items-center gap-1 h-6 rounded-full overflow-hidden p-1 bg-black/40 border border-white/10 shadow-inner">
                        {pal.colors.map((hex) => (
                          <div
                            key={hex}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard?.writeText(hex);
                              updateCustomizations({ primaryColor: hex });
                            }}
                            className="flex-1 h-full rounded-full transition-transform hover:scale-110 relative group shadow-sm"
                            style={{ backgroundColor: hex }}
                            title={`Click to copy: ${hex}`}
                          >
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/90 text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30 shadow-lg">
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
            <div className="pt-3 border-t border-white/10">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold font-sans">
                All Presets ({Object.keys(THEME_PRESETS).length})
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(THEME_PRESETS).map((tKey) => {
                  const preset = THEME_PRESETS[tKey as ThemePreset];
                  const isCurrent = customizations.theme === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => {
                        sound.playScan();
                        applyTheme(tKey as ThemePreset);
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all backdrop-blur-xl ${
                        isCurrent 
                          ? 'bg-gradient-to-br from-cyan-500/20 via-white/[0.05] to-indigo-500/20 border-cyan-400/80 text-cyan-200 font-semibold shadow-sm' 
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full border border-white/20 shrink-0 shadow-sm" 
                          style={{ backgroundColor: preset.settings.primaryColor }}
                        />
                        <span className="text-xs truncate font-sans">{preset.badge}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fine Color Calibration Card */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-sm space-y-4">
              {/* Primary Color Picker */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                    Primary Accent Color
                  </label>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30">
                    {customizations.primaryColor}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {primaryColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateCustomizations({ primaryColor: color })}
                      className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 shadow-sm ${
                        customizations.primaryColor === color 
                          ? 'scale-125 border-white ring-2 ring-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.6)]' 
                          : 'border-white/10'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <label className="w-7 h-7 rounded-full border border-white/20 p-0.5 cursor-pointer bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all ml-1 shadow-sm">
                    <input 
                      type="color"
                      value={customizations.primaryColor}
                      onChange={(e) => updateCustomizations({ primaryColor: e.target.value })}
                      className="opacity-0 w-0 h-0 absolute pointer-events-none"
                    />
                    <div 
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: customizations.primaryColor }}
                    />
                  </label>
                </div>
              </div>

              {/* Accent Glow Color */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                    Secondary Glow Color
                  </label>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30">
                    {customizations.accentColor}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-xl border border-white/20 shadow-sm shrink-0" 
                    style={{ backgroundColor: customizations.accentColor }} 
                  />
                  <input 
                    type="color"
                    value={customizations.accentColor}
                    onChange={(e) => updateCustomizations({ accentColor: e.target.value })}
                    className="flex-1 h-8 rounded-xl bg-white/5 border border-white/10 cursor-pointer p-1"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                    Surface Background
                  </label>
                  <span className="text-[10px] font-mono text-slate-300">{customizations.bgColor}</span>
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
                      className={`py-1.5 px-2 rounded-xl border text-[11px] font-sans truncate transition-all ${
                        customizations.bgColor === bg.val 
                          ? 'border-cyan-400/80 bg-cyan-500/20 text-cyan-200 font-semibold shadow-sm ring-1 ring-cyan-400/40' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. DIMENSIONS & SPACING SECTION */}
        {activeSection === 'dimensions' && (
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-sm space-y-4">
            {/* Border Radius Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                  Border Radius
                </label>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30">
                  {customizations.borderRadius}px
                </span>
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
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                  Border Width
                </label>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30">
                  {customizations.borderWidth}px
                </span>
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
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                  Vertical Padding (Y)
                </label>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30">
                  {customizations.paddingY}px
                </span>
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
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                  Horizontal Padding (X)
                </label>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30">
                  {customizations.paddingX}px
                </span>
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
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                  Item Gap
                </label>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30">
                  {customizations.gap}px
                </span>
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
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-sm space-y-4">
            {/* Shadow Styles */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold font-sans">
                Drop Shadow & Glow Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['none', 'soft', 'glow', 'dramatic', 'neon'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateCustomizations({ shadowStyle: s })}
                    className={`py-2 px-3 rounded-xl border text-xs capitalize transition-all font-sans ${
                      customizations.shadowStyle === s
                        ? 'bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border-cyan-400/80 text-cyan-200 font-semibold shadow-sm ring-1 ring-cyan-400/40'
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Blur Intensity Slider */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-sans">
                  Backdrop Blur Filter
                </label>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30">
                  {customizations.blurIntensity}px
                </span>
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
            <div className="pt-3 border-t border-white/10">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold font-sans">
                Border Pattern
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['solid', 'dashed', 'none'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => updateCustomizations({ borderStyle: style })}
                    className={`py-1.5 rounded-xl border text-xs capitalize transition-all font-sans ${
                      customizations.borderStyle === style
                        ? 'border-cyan-400/80 bg-cyan-500/20 text-cyan-200 font-semibold shadow-sm ring-1 ring-cyan-400/40'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
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
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-sm space-y-4">
            {/* Font Size */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold font-sans">
                Font Size
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['xs', 'sm', 'base', 'lg'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateCustomizations({ fontSize: size })}
                    className={`py-1.5 rounded-xl border text-xs uppercase font-mono transition-all ${
                      customizations.fontSize === size
                        ? 'border-cyan-400/80 bg-cyan-500/20 text-cyan-200 font-semibold shadow-sm ring-1 ring-cyan-400/40'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Weight */}
            <div className="pt-3 border-t border-white/10">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold font-sans">
                Font Weight
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['normal', 'medium', 'semibold', 'bold'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => updateCustomizations({ fontWeight: w })}
                    className={`py-1.5 rounded-xl border text-xs capitalize transition-all font-sans ${
                      customizations.fontWeight === w
                        ? 'border-cyan-400/80 bg-cyan-500/20 text-cyan-200 font-semibold shadow-sm ring-1 ring-cyan-400/40'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Letter Spacing */}
            <div className="pt-3 border-t border-white/10">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold font-sans">
                Letter Spacing
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['tight', 'normal', 'wide'] as const).map((ls) => (
                  <button
                    key={ls}
                    onClick={() => updateCustomizations({ letterSpacing: ls })}
                    className={`py-1.5 rounded-xl border text-xs capitalize transition-all font-sans ${
                      customizations.letterSpacing === ls
                        ? 'border-cyan-400/80 bg-cyan-500/20 text-cyan-200 font-semibold shadow-sm ring-1 ring-cyan-400/40'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
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
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-sm space-y-3">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-bold font-sans">
                Force Interaction State
              </label>
              <p className="text-[11px] opacity-70 mb-3 leading-snug font-sans">
                Simulate how this component renders across various functional browser states:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {interactionStates.map((st) => {
                  const isActive = customizations.activeState === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => updateCustomizations({ activeState: st.id })}
                      className={`p-2.5 rounded-2xl border text-left text-xs capitalize transition-all font-sans backdrop-blur-xl ${
                        isActive 
                          ? 'bg-gradient-to-br from-cyan-500/20 via-white/[0.05] to-indigo-500/20 border-cyan-400/80 text-cyan-200 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40' 
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{st.label}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. iOS-Inspired Frosted Glass Footer Actions */}
      <div className="p-3.5 border-t border-white/[0.08] bg-[#070b1a]/85 backdrop-blur-3xl space-y-2 relative z-10 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        {onOpenSavePreset && (
          <button
            onClick={() => {
              sound.playConfirm();
              onOpenSavePreset();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/25 via-indigo-500/20 to-purple-500/25 hover:from-cyan-500/35 hover:to-indigo-500/35 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(6,182,212,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all active:scale-[0.98]"
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-300" />
            <span>Save as Custom Preset</span>
          </button>
        )}

        <button
          onClick={handleCopyConfig}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-all shadow-sm active:scale-[0.98]"
        >
          {copiedConfig ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Configuration Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>Copy Configuration (JSON)</span>
            </>
          )}
        </button>

        <button
          onClick={resetCustomizations}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-full text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>
      </div>
    </aside>
    </>
  );
};
