import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  Sparkles, 
  ChevronRight, 
  Check, 
  Layers, 
  Sliders, 
  Zap, 
  Radio, 
  ShieldCheck, 
  Palette, 
  Maximize2,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { ATMOSPHERIC_PALETTES, THEME_PRESETS } from '../../data/themePresets';
import { ThemePreset } from '../../types/studio';
import { sound } from '../../utils/soundEngine';

export interface SampleArchetype {
  id: string;
  themeId: ThemePreset;
  title: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  flareColor: string;
  borderRadius: number;
  borderWidth: number;
  blurIntensity: number;
  shadowStyle: 'none' | 'soft' | 'glow' | 'dramatic' | 'neon';
  pillShape: boolean;
  hudReticle: boolean;
  crtEffect: boolean;
  badge: string;
  colors: string[];
}

export const FUTURISTIC_SAMPLES: SampleArchetype[] = [
  {
    id: 'visionos-nebula',
    themeId: 'electric-violet',
    title: 'VisionOS Nebula Capsule',
    tagline: 'Liquid Violet · Spatial Glass · Lateral Flares',
    primaryColor: '#9D71E8',
    accentColor: '#6A2FC8',
    bgColor: '#0B0720',
    flareColor: 'rgba(157, 113, 232, 0.85)',
    borderRadius: 24,
    borderWidth: 1,
    blurIntensity: 24,
    shadowStyle: 'glow',
    pillShape: true,
    hudReticle: false,
    crtEffect: false,
    badge: 'SPATIAL',
    colors: ['#0B0720', '#25134D', '#6A2FC8', '#9D71E8', '#D1B8FF', '#F2E9FF']
  },
  {
    id: 'cyberpunk-velvet',
    themeId: 'crimson-velvet',
    title: 'Cyberpunk Velvet Rose',
    tagline: 'Burgundy Obsidian · Hot Pink Lasers · High Voltage',
    primaryColor: '#FF69B4',
    accentColor: '#E24366',
    bgColor: '#800021',
    flareColor: 'rgba(255, 105, 180, 0.85)',
    borderRadius: 18,
    borderWidth: 1,
    blurIntensity: 20,
    shadowStyle: 'neon',
    pillShape: true,
    hudReticle: true,
    crtEffect: false,
    badge: 'NEON HUD',
    colors: ['#800021', '#881144', '#E24366', '#C24366', '#FF69B4', '#FFE4D8']
  },
  {
    id: 'jarvis-ocean',
    themeId: 'deep-ocean',
    title: 'JARVIS Bioluminescent HUD',
    tagline: 'Abyssal Teal · Cyan Telemetry · Tactical Reticles',
    primaryColor: '#0F969C',
    accentColor: '#6DA5C0',
    bgColor: '#05161A',
    flareColor: 'rgba(15, 150, 156, 0.85)',
    borderRadius: 12,
    borderWidth: 1,
    blurIntensity: 18,
    shadowStyle: 'glow',
    pillShape: false,
    hudReticle: true,
    crtEffect: true,
    badge: 'TACTICAL',
    colors: ['#05161A', '#072E33', '#0C7075', '#0F969C', '#6DA5C0', '#294D61']
  },
  {
    id: 'obsidian-gold',
    themeId: 'black-gold',
    title: 'Obsidian Gold Monolith',
    tagline: 'Champagne Gold · Stealth Carbon · Pure Luxury',
    primaryColor: '#EAB308',
    accentColor: '#F59E0B',
    bgColor: '#0A0A0C',
    flareColor: 'rgba(234, 179, 8, 0.75)',
    borderRadius: 14,
    borderWidth: 1,
    blurIntensity: 16,
    shadowStyle: 'dramatic',
    pillShape: false,
    hudReticle: false,
    crtEffect: false,
    badge: 'LUXURY',
    colors: ['#0A0A0C', '#1A1810', '#78550B', '#EAB308', '#F59E0B', '#FEF08A']
  },
  {
    id: 'cyber-deck-matrix',
    themeId: 'cyberpunk',
    title: 'Cyber-Deck Matrix Terminal',
    tagline: 'Phosphor Emerald · Monospaced Telemetry · CRT Grid',
    primaryColor: '#10B981',
    accentColor: '#059669',
    bgColor: '#02120B',
    flareColor: 'rgba(16, 185, 129, 0.85)',
    borderRadius: 6,
    borderWidth: 1,
    blurIntensity: 12,
    shadowStyle: 'neon',
    pillShape: false,
    hudReticle: true,
    crtEffect: true,
    badge: 'TERMINAL',
    colors: ['#02120B', '#064E3B', '#059669', '#10B981', '#34D399', '#D1FAE5']
  },
  {
    id: 'celestial-opal',
    themeId: 'opal-frost',
    title: 'Celestial Opal Spatial Glass',
    tagline: 'Frost White · Ethereal Arctic Glass · Soft Ambient',
    primaryColor: '#BDD7D8',
    accentColor: '#D5E5E5',
    bgColor: '#0C1318',
    flareColor: 'rgba(189, 215, 216, 0.8)',
    borderRadius: 22,
    borderWidth: 1,
    blurIntensity: 26,
    shadowStyle: 'soft',
    pillShape: true,
    hudReticle: false,
    crtEffect: false,
    badge: 'ETHEREAL',
    colors: ['#0C1318', '#1A2933', '#5D6B6B', '#BDD7D8', '#D5E5E5', '#F7CBCA']
  }
];

export const FuturisticSampleBar: React.FC = () => {
  const { 
    customizations, 
    updateCustomizations, 
    applyTheme, 
    setHudMode, 
    hudMode,
    setCrtEnabled,
    crtEnabled 
  } = useStudio();

  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('visionos-nebula');
  const [showArranger, setShowArranger] = useState(false);

  const activeSample = FUTURISTIC_SAMPLES.find(s => s.id === selectedSampleId) || FUTURISTIC_SAMPLES[0];

  const handleApplySample = (sample: SampleArchetype) => {
    sound.playConfirm();
    setSelectedSampleId(sample.id);
    applyTheme(sample.themeId);
    
    // Apply granular customizer values
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

  return (
    <div className="border-b border-cyan-500/20 bg-[#050811]/95 backdrop-blur-xl relative z-20 select-none">
      {/* Top Header Strip with Telemetry & Toggle */}
      <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[11px] font-bold text-white tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>FUTURISTIC SAMPLES ARSENAL</span>
          </span>
          <span className="hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            6 READY-TO-USE ARCHETYPES
          </span>
          <span className="hidden md:inline-block text-[9px] font-mono text-slate-500">
            // CLICK ANY SAMPLE TO ADAPT LIVE STUDIO
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playBlip(1200);
              setShowArranger(!showArranger);
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold flex items-center gap-1.5 border transition-all ${
              showArranger 
                ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-glow-cyan' 
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Sliders className="w-3 h-3 text-cyan-400" />
            <span>Arrange & Customize</span>
          </button>

          <button
            onClick={() => {
              sound.playHover();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
            title={isExpanded ? 'Collapse Samples Bar' : 'Expand Samples Bar'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Samples Cards Carousel */}
      {isExpanded && (
        <div className="p-3 overflow-x-auto scrollbar-none flex items-stretch gap-3">
          {FUTURISTIC_SAMPLES.map((sample) => {
            const isSelected = selectedSampleId === sample.id || customizations.theme === sample.themeId;
            return (
              <div
                key={sample.id}
                onClick={() => handleApplySample(sample)}
                className={`min-w-[240px] max-w-[260px] p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden group shrink-0 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-glow-cyan ring-1 ring-cyan-400/50'
                    : 'border-white/10 bg-slate-950/70 hover:border-cyan-500/40 hover:bg-slate-900/80'
                }`}
              >
                {/* Lateral Spotlight Glow Preview inside Card */}
                <div 
                  className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none"
                  style={{ backgroundColor: sample.flareColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase border"
                      style={{
                        backgroundColor: `${sample.primaryColor}20`,
                        color: sample.primaryColor,
                        borderColor: `${sample.primaryColor}50`
                      }}
                    >
                      {sample.badge}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[9px] font-mono text-cyan-300 font-bold bg-cyan-500/20 px-1.5 py-0.2 rounded border border-cyan-400/40">
                        <Check className="w-2.5 h-2.5" /> ACTIVE
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-xs text-white tracking-tight line-clamp-1 mb-0.5">
                    {sample.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mb-2 font-mono">
                    {sample.tagline}
                  </p>

                  {/* 6-Color Palette Mini Capsule Swatch */}
                  <div className="flex items-center gap-0.5 p-1 rounded-lg bg-black/60 border border-white/10 mb-2">
                    {sample.colors.map((hex, i) => (
                      <div
                        key={i}
                        className="flex-1 h-3.5 rounded-sm transition-transform hover:scale-125"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                  <span className="group-hover:text-cyan-300 transition-colors">
                    {isSelected ? 'Ready to Arrange' : 'Click to Load'}
                  </span>
                  <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Arranger Sub-Drawer: Instant Fine-Tuning Controls */}
      {showArranger && (
        <div className="p-4 border-t border-cyan-500/30 bg-[#04060c] animate-in slide-in-from-top-2">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {/* 1. Volumetric Lateral Flare & Shadow Style Control */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                  <span className="text-slate-400">SHADOW & FLARE GLOW</span>
                  <span className="text-cyan-300 font-bold uppercase">{customizations.shadowStyle}</span>
                </div>
                <div className="flex items-center gap-1">
                  {(['none', 'soft', 'glow', 'neon', 'dramatic'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateCustomizations({ shadowStyle: style })}
                      className={`flex-1 py-1 rounded text-[9px] font-mono border capitalize transition-all ${
                        customizations.shadowStyle === style
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                          : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Glassmorphism Blur */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                  <span className="text-slate-400">GLASS BLUR</span>
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
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                  <span className="text-slate-400">CORNER GEOMETRY</span>
                  <span className="text-cyan-300 font-bold">{customizations.borderRadius}px</span>
                </div>
                <div className="flex items-center gap-1">
                  {[
                    { label: 'HUD Sharp', val: 0 },
                    { label: 'Cyber', val: 8 },
                    { label: 'Soft', val: 16 },
                    { label: 'Pill', val: 32 }
                  ].map((rad) => (
                    <button
                      key={rad.label}
                      onClick={() => updateCustomizations({ borderRadius: rad.val })}
                      className={`flex-1 py-1 rounded text-[9px] font-mono border transition-all ${
                        customizations.borderRadius === rad.val
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                          : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {rad.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Telemetry & Reticles Toggle */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">HUD RETICLE DECAL</span>
                  <span className="text-[9px] font-mono text-cyan-300">
                    {hudMode === 'tactical' ? 'BRACKETS ACTIVE' : 'CLEAN VIEW'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    sound.playScan();
                    setHudMode(hudMode === 'tactical' ? 'standard' : 'tactical');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-all ${
                    hudMode === 'tactical'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-cyan'
                      : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {hudMode === 'tactical' ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Quick 1-Click Color Harmonizer */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 shrink-0">
              <span className="text-[10px] font-mono text-slate-400 font-bold block">
                PALETTE SWATCHES:
              </span>
              <div className="flex items-center gap-1">
                {activeSample.colors.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => {
                      sound.playBlip(1600);
                      navigator.clipboard?.writeText(hex);
                      updateCustomizations({ primaryColor: hex });
                    }}
                    className="w-6 h-6 rounded-md border border-white/20 transition-transform hover:scale-125 hover:border-white shadow"
                    style={{ backgroundColor: hex }}
                    title={`Apply ${hex} as primary color`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};