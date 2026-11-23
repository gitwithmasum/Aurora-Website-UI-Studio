import React, { useState, useRef } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  Sparkles,
  Layers,
  Compass,
  Eye,
  RotateCw,
  Key,
  ShieldCheck,
  Cpu,
  MoveUpRight,
  Maximize2,
} from 'lucide-react';

// 8. Glass Card Simulator
export const GlassCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [elevated, setElevated] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        onMouseEnter={() => setElevated(true)}
        onMouseLeave={() => setElevated(false)}
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: variantId === 'smoked-glass' ? 'rgba(6, 20, 27, 0.75)' : 'rgba(17, 33, 45, 0.45)',
          borderColor: elevated ? `${customizations.primaryColor}80` : 'rgba(255, 255, 255, 0.12)',
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: elevated 
            ? `0 20px 40px -15px ${customizations.primaryColor}40, inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)`
            : '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
          backdropFilter: `blur(${Math.max(16, customizations.blurIntensity * 1.5)}px)`,
        }}
        className="relative overflow-hidden border p-6 transition-all duration-300"
      >
        {/* Specular Highlight Sheen */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5" style={{ color: customizations.primaryColor }} />
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10 uppercase">
            LIQUID GLASS
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-2">Liquid Glassmorphism</h3>
        <p className="text-xs text-slate-300/80 leading-relaxed mb-5">
          Dynamic sub-surface scattering with multi-pass real-time background refraction and edge light caustics.
        </p>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Refraction Index</span>
          <span className="text-cyan-300 font-bold">1.52 η</span>
        </div>
      </div>
    </div>
  );
};

// 9. Gradient Card Simulator
export const GradientCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [glowIntensity, setGlowIntensity] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div 
        onMouseEnter={() => setGlowIntensity(true)}
        onMouseLeave={() => setGlowIntensity(false)}
        className="relative p-[1.5px] rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          background: glowIntensity
            ? `linear-gradient(135deg, ${customizations.primaryColor}, #800021, #0c7075, ${customizations.primaryColor})`
            : `linear-gradient(135deg, ${customizations.primaryColor}80, #253745, #0c707550)`,
          boxShadow: glowIntensity ? `0 0 30px -5px ${customizations.primaryColor}80` : 'none',
        }}
      >
        <div
          style={{
            borderRadius: `${Math.max(4, customizations.borderRadius - 2)}px`,
            backgroundColor: '#06141B',
            backdropFilter: `blur(${customizations.blurIntensity}px)`,
          }}
          className="p-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              CHROMATIC BORDER // MATRIX
            </span>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <h3 className="text-base font-extrabold text-white mb-2">Conic Gradient Shield</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-5">
            Perimeter light-pipe emission powered by dual linear phase gradients with zero frame overhead.
          </p>

          <button
            onClick={() => sound.playConfirm()}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all flex items-center justify-center gap-2 border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-500/20"
          >
            <span>INITIALIZE SPECTRUM</span>
            <MoveUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 10. Floating Card Simulator
export const FloatingCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [lifted, setLifted] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center">
      <div
        onMouseEnter={() => {
          sound.playHover();
          setLifted(true);
        }}
        onMouseLeave={() => setLifted(false)}
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: lifted ? customizations.primaryColor : '#253745',
          borderWidth: `${customizations.borderWidth || 1}px`,
          transform: lifted ? 'translateY(-12px) scale(1.02)' : 'translateY(0px) scale(1)',
          boxShadow: lifted
            ? `0 25px 50px -12px ${customizations.primaryColor}50, 0 10px 20px -5px #00000080`
            : '0 8px 16px -4px rgba(0,0,0,0.4)',
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative w-full overflow-hidden border p-6 transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-[#06141B] border border-cyan-500/30">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">
            {lifted ? 'ALTITUDE: +120m' : 'DOCKED // ZERO-G'}
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-1.5">Anti-Gravity Levitation Pod</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Multi-layer spatial depth simulation using progressive CSS shadow dispersal and spring kinematics.
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
          <span>MASS: 0.0 KG</span>
          <span className="text-cyan-300">HOVER TO LIFT</span>
        </div>
      </div>
    </div>
  );
};

// 11. Interactive Card Simulator (Spotlight / Mouse Tracker)
export const InteractiveCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 150, y: 150 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          sound.playHover();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: isHovered ? `${customizations.primaryColor}80` : '#253745',
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-6 transition-colors duration-200 cursor-crosshair select-none"
      >
        {/* Dynamic Spotlight Radial Flare following cursor */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{
              background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${customizations.primaryColor}35, transparent 80%)`,
            }}
          />
        )}

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
              RADIAL SPOTLIGHT ENGINE
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {Math.round(mousePos.x)}px, {Math.round(mousePos.y)}px
            </span>
          </div>

          <h3 className="text-base font-bold text-white mb-2">Interactive Cursor Spotlight</h3>
          <p className="text-xs text-slate-300/80 leading-relaxed mb-5">
            Hardware-accelerated coordinate reflection that tracks pointer vectors with dynamic lumen falloff.
          </p>

          <div className="p-3 rounded-xl bg-[#06141B] border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Luminance Beam</span>
            <span style={{ color: customizations.primaryColor }} className="font-bold">ACTIVE // 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 12. Hover Reveal Card Simulator
export const HoverRevealCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        onMouseEnter={() => {
          sound.playHover();
          setRevealed(true);
        }}
        onMouseLeave={() => setRevealed(false)}
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF0',
          borderColor: revealed ? customizations.primaryColor : '#253745',
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-6 transition-all duration-300 h-64 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase">CLASSIFIED DISPATCH</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-base font-extrabold text-white">Project Cyber Aegis</h3>
          <p className="text-xs text-slate-400 mt-1">
            Hover to unmask protected mission parameters and unlock decrypted communication channels.
          </p>
        </div>

        {/* Sliding Reveal Tray */}
        <div 
          className="p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between"
          style={{
            backgroundColor: '#06141B',
            borderColor: `${customizations.primaryColor}50`,
            transform: revealed ? 'translateY(0)' : 'translateY(16px)',
            opacity: revealed ? 1 : 0.6,
          }}
        >
          <div className="text-[11px] font-mono text-emerald-400 flex items-center justify-between mb-2">
            <span>KEY: AES-GCM-256</span>
            <span className="text-[10px] text-slate-400">DECRYPTED</span>
          </div>
          <button
            onClick={() => sound.playConfirm()}
            className="w-full py-2 rounded-lg text-xs font-mono font-bold transition-all text-black"
            style={{ backgroundColor: customizations.primaryColor }}
          >
            EXECUTE PAYLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

// 13. Flip Card Simulator
export const FlipCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1 h-64 [perspective:1000px]">
      <div
        onClick={() => {
          sound.playConfirm();
          setIsFlipped(!isFlipped);
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className="relative w-full h-full cursor-pointer"
      >
        {/* Front Face */}
        <div
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#11212DF2',
            borderColor: `${customizations.primaryColor}50`,
            borderWidth: `${customizations.borderWidth || 1}px`,
            backfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 p-6 border flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-cyan-400 uppercase">3D DUAL-FACED // FRONT</span>
              <RotateCw className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Cryptographic Vault Node</h3>
            <p className="text-xs text-slate-300/80 leading-relaxed">
              Standard operational telemetry visible. Click anywhere on card to flip and reveal secondary keys.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 pt-3 border-t border-white/10">
            <span>STATUS: SECURED</span>
            <span>CLICK TO FLIP ↻</span>
          </div>
        </div>

        {/* Back Face */}
        <div
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BF5',
            borderColor: customizations.primaryColor,
            borderWidth: `${customizations.borderWidth || 1}px`,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: `0 0 25px -5px ${customizations.primaryColor}50`,
          }}
          className="absolute inset-0 p-6 border flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">INTERNAL KEY VAULT // REAR</span>
              <Key className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2 font-mono">NODE_HASH: #0x92f...a17</h3>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Master Secret:</span>
                <span className="text-cyan-300">•••• •••• •••• 88B4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Signatures:</span>
                <span className="text-white">3 / 5 REQUIRED</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/10">
            <span className="text-emerald-400">ENCRYPTION ACTIVE</span>
            <span>CLICK TO RETURN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
