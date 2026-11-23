import React from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  X, 
  Sparkles, 
  Check, 
  Palette, 
  Sliders, 
  Eye, 
  Zap, 
  Maximize2, 
  Radio, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ATMOSPHERIC_PALETTES, THEME_PRESETS } from '../../data/themePresets';
import { sound } from '../../utils/soundEngine';
import { ThemePreset } from '../../types/studio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const StyleSamplesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { applyTheme, customizations, updateCustomizations, setHudMode, hudMode } = useStudio();

  if (!isOpen) return null;

  const styleSamples = [
    {
      id: 'electric-violet',
      themeId: 'electric-violet' as ThemePreset,
      title: '01. VisionOS Nebula Capsule',
      subtitle: 'Liquid Glass · Volumetric Violet Flares · Soft Pill Geometry',
      desc: 'Inspired by Spatial computing and @uiuxaadi luxury UI. High blur, glowing lavender beacons, and lateral spotlight dispersion.',
      primaryHex: '#9D71E8',
      accentHex: '#6A2FC8',
      bgHex: '#0B0720',
      textHex: '#F2E9FF',
      flare: 'rgba(157, 113, 232, 0.7)',
      tags: ['Spatial', 'Capsule', 'Nebula Glow'],
    },
    {
      id: 'crimson-velvet',
      themeId: 'crimson-velvet' as ThemePreset,
      title: '02. Cyberpunk Velvet Rose',
      subtitle: 'Burgundy Crimson · Hot Neon Glow · Champagne Highlights',
      desc: 'High-contrast luxury cyberpunk. Deep burgundy ground with high-voltage magenta lasers and soft ambient lighting.',
      primaryHex: '#FF69B4',
      accentHex: '#E24366',
      bgHex: '#800021',
      textHex: '#FFE4D8',
      flare: 'rgba(255, 105, 180, 0.7)',
      tags: ['Cyberpunk', 'Velvet', 'Hot Neon'],
    },
    {
      id: 'deep-ocean',
      themeId: 'deep-ocean' as ThemePreset,
      title: '03. JARVIS Bioluminescent HUD',
      subtitle: 'Deep Abyssal Teal · Cyan Telemetry · Tactical Brackets',
      desc: 'Command center telemetry aesthetics. Abyssal midnight teal with bioluminescent cyan light and holographic coordinate readouts.',
      primaryHex: '#0F969C',
      accentHex: '#6DA5C0',
      bgHex: '#05161A',
      textHex: '#E0F7FA',
      flare: 'rgba(15, 150, 156, 0.7)',
      tags: ['Telemetry', 'Bioluminescent', 'Tactical'],
    },
    {
      id: 'black-gold',
      themeId: 'black-gold' as ThemePreset,
      title: '04. Obsidian Gold Luxury Monolith',
      subtitle: 'Champagne Gold · Obsidian Black · Metallic Refinements',
      desc: 'Ultra-prestigious dark mode. Obsidian black backdrops with champagne gold laser borders and refined typographic tracking.',
      primaryHex: '#EAB308',
      accentHex: '#F59E0B',
      bgHex: '#0A0A0C',
      textHex: '#FEF08A',
      flare: 'rgba(234, 179, 8, 0.6)',
      tags: ['Luxury', 'Prestige', 'Obsidian Gold'],
    },
  ];

  const handleApply = (sample: typeof styleSamples[0]) => {
    sound.playConfirm();
    applyTheme(sample.themeId);
    setHudMode('tactical');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in select-none">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl rounded-2xl border border-cyan-500/40 bg-[#060a16] shadow-2xl p-6 flex flex-col max-h-[90vh] cyber-box animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white font-mono">FUTURISTIC STYLE & SAMPLE SHOWCASE</h3>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  INTERACTIVE SAMPLES
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Explore, test, and adopt complete futuristic visual styles inspired by high-end UI/UX art directions.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Style Samples Grid */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {styleSamples.map((s) => {
              const isCurrent = customizations.theme === s.themeId;
              return (
                <div
                  key={s.id}
                  onClick={() => handleApply(s)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden group ${
                    isCurrent
                      ? 'border-cyan-400 bg-cyan-950/30 shadow-glow-cyan'
                      : 'border-white/10 bg-slate-950/80 hover:border-cyan-500/50 hover:bg-slate-900/80'
                  }`}
                >
                  {/* Atmospheric flare background light inside card */}
                  <div 
                    className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none group-hover:opacity-60 transition-opacity"
                    style={{ backgroundColor: s.flare }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-white font-mono flex items-center gap-2">
                        <span>{s.title}</span>
                      </h4>
                      {isCurrent ? (
                        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          <Check className="w-3 h-3" /> ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100 group-hover:text-cyan-400">
                          Click to Apply
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-cyan-400 font-mono mb-2">
                      {s.subtitle}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {s.desc}
                    </p>

                    {/* Visual Capsule Swatch Bar */}
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-black/60 border border-white/10 mb-3">
                      {[s.bgHex, s.accentHex, s.primaryHex, s.textHex].map((hex, i) => (
                        <div 
                          key={i}
                          className="flex-1 h-6 rounded-lg flex items-center justify-center text-[9px] font-mono text-white/90 shadow font-bold"
                          style={{ backgroundColor: hex }}
                        >
                          <span className="mix-blend-difference drop-shadow">{hex}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {s.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-slate-400">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(s);
                    }}
                    className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-black font-mono shadow-md mt-2"
                    style={{ backgroundColor: s.primaryHex }}
                  >
                    <span>{isCurrent ? 'Style Currently Active' : 'Adopt This Style Sample'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
          <span>Click any sample to transform the entire studio immediately</span>
          <button 
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
