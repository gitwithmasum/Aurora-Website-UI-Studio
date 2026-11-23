import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  ChevronRight, 
  Flame, 
  CornerDownRight, 
  Compass,
  Cpu,
  Layers
} from 'lucide-react';

// Common button wrapper props
interface ButtonProps {
  variantId: string;
}

// 1. Primary Button Simulator
export const PrimaryButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    sound.playConfirm();
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  const isHud = variantId === 'tactical-hud';
  const isSolid = variantId === 'solid-glow';

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={handleClick}
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className={`relative inline-flex items-center justify-center gap-2.5 font-semibold text-sm transition-all duration-200 select-none cursor-pointer ${
          clicked ? 'scale-95' : hovered ? 'scale-[1.02]' : 'scale-100'
        } ${isHud ? 'cyber-chamfer px-7 py-3' : 'px-6 py-3'}`}
        style={{
          borderRadius: isHud ? '4px' : `${customizations.borderRadius}px`,
          backgroundColor: isSolid 
            ? customizations.primaryColor 
            : `${customizations.primaryColor}18`,
          color: isSolid ? '#06141B' : customizations.textColor,
          border: `${customizations.borderWidth || 1}px solid ${customizations.primaryColor}80`,
          boxShadow: hovered 
            ? `0 0 25px -2px ${customizations.primaryColor}90, 0 10px 20px -5px rgba(0,0,0,0.5)` 
            : `0 0 15px -4px ${customizations.primaryColor}50`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
      >
        {/* Glow Halo */}
        <span 
          className="absolute inset-0 rounded-inherit opacity-40 blur-md pointer-events-none transition-opacity"
          style={{ backgroundColor: customizations.primaryColor }}
        />

        <Sparkles className="w-4 h-4 relative z-10" />
        <span className="relative z-10 tracking-wide font-medium">INITIALIZE SYSTEM</span>
        <ArrowRight className={`w-4 h-4 relative z-10 transition-transform ${hovered ? 'translate-x-1' : ''}`} />
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · CLICK TO TRIGGER CONFIRM HAPTIC
      </span>
    </div>
  );
};

// 2. Secondary Button Simulator
export const SecondaryButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    sound.playBlip(1300);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const isOutline = variantId === 'outline-subtle';
  const isCapsule = variantId === 'glass-capsule';

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={handleClick}
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className={`relative inline-flex items-center justify-center gap-2 px-6 py-2.5 font-medium text-xs transition-all duration-200 select-none cursor-pointer ${
          clicked ? 'scale-95' : hovered ? 'scale-[1.02]' : 'scale-100'
        }`}
        style={{
          borderRadius: isCapsule ? '9999px' : `${customizations.borderRadius}px`,
          backgroundColor: isOutline ? 'transparent' : `${customizations.accentColor}25`,
          color: customizations.textColor,
          border: `1px solid ${hovered ? customizations.primaryColor : `${customizations.accentColor}60`}`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
          boxShadow: hovered ? `0 0 15px -3px ${customizations.accentColor}60` : 'none',
        }}
      >
        <Shield className="w-3.5 h-3.5 opacity-80" />
        <span>SECONDARY PROTOCOL</span>
        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · REFINED LOW-SURFACE DEPTH
      </span>
    </div>
  );
};

// 3. Tertiary Button Simulator
export const TertiaryButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    sound.playBlip(1500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={handleClick}
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="group relative inline-flex items-center gap-1.5 py-1 px-3 text-xs font-mono transition-all text-slate-400 hover:text-white"
      >
        {variantId === 'bracket-tag' ? (
          <>
            <span className="text-cyan-400 opacity-60 group-hover:opacity-100">[</span>
            <span className="tracking-wider">VIEW ARCHIVE</span>
            <span className="text-cyan-400 opacity-60 group-hover:opacity-100">]</span>
          </>
        ) : (
          <>
            <span>Explore Telemetry Specs</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-cyan-400" />
            <span 
              className={`absolute bottom-0 left-3 right-3 h-[1px] transition-all ${
                hovered ? 'bg-cyan-400 opacity-100' : 'bg-transparent opacity-0'
              }`}
            />
          </>
        )}
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · MINIMALIST INLINE DISCLOSURE
      </span>
    </div>
  );
};

// 4. Ghost Button Simulator
export const GhostButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={() => sound.playBlip(1200)}
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium transition-all duration-200 select-none cursor-pointer"
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: hovered ? `${customizations.primaryColor}20` : 'transparent',
          color: hovered ? customizations.primaryColor : customizations.textColor,
          border: `1px solid ${hovered ? customizations.primaryColor : 'transparent'}`,
          boxShadow: hovered ? `0 0 20px -3px ${customizations.primaryColor}40` : 'none',
        }}
      >
        {variantId === 'pulsing-phantom' && (
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute -top-1 -right-1" />
        )}
        <Zap className="w-3.5 h-3.5" />
        <span>GHOST OVERLAY</span>
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · HOVER TO REVEAL BORDER ENVELOPE
      </span>
    </div>
  );
};

// 5. Outline Button Simulator
export const OutlineButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hovered, setHovered] = useState(false);

  const isDashed = variantId === 'dashed-tech';
  const isDouble = variantId === 'double-rim';

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={() => sound.playConfirm()}
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-mono font-semibold transition-all duration-200 select-none cursor-pointer"
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: hovered ? `${customizations.primaryColor}15` : 'transparent',
          color: customizations.primaryColor,
          border: `${customizations.borderWidth || 1}px ${isDashed ? 'dashed' : 'solid'} ${customizations.primaryColor}`,
          boxShadow: hovered ? `0 0 20px -2px ${customizations.primaryColor}60, inset 0 0 10px ${customizations.primaryColor}20` : 'none',
          outline: isDouble ? `1px solid ${customizations.primaryColor}40` : 'none',
          outlineOffset: '3px',
        }}
      >
        <CornerDownRight className="w-3.5 h-3.5" />
        <span className="tracking-wider">WIREFRAME_NODE</span>
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · LASER-ETCHED HARDWARE VECTOR
      </span>
    </div>
  );
};

// 6. Gradient Button Simulator
export const GradientButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hovered, setHovered] = useState(false);

  const gradients = {
    standard: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
    'cyber-sunset': 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f59e0b 100%)',
    'stealth-chrome': 'linear-gradient(135deg, #4A5C6A 0%, #9BA8AB 50%, #CCD0CF 100%)',
  };

  const currentGradient = gradients[variantId as keyof typeof gradients] || gradients.standard;

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={() => sound.playConfirm()}
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-bold text-white transition-all duration-300 select-none cursor-pointer overflow-hidden group shadow-lg"
        style={{
          borderRadius: `${customizations.borderRadius || 16}px`,
          backgroundImage: currentGradient,
          boxShadow: hovered 
            ? '0 10px 25px -5px rgba(6,182,212,0.5), 0 0 20px rgba(139,92,246,0.4)' 
            : '0 4px 15px -3px rgba(0,0,0,0.5)',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {/* Shimmer sweep effect */}
        <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:left-[200%] transition-all duration-700 pointer-events-none" />

        <Flame className="w-4 h-4 text-white drop-shadow" />
        <span className="tracking-wide drop-shadow-md">CHROMATIC SHIFT</span>
        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · DYNAMIC MULTI-STOP SPECULAR GRADIENT
      </span>
    </div>
  );
};

// 7. Glass Button Simulator
export const GlassButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={() => sound.playConfirm()}
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs font-medium text-white transition-all duration-300 select-none cursor-pointer overflow-hidden border"
        style={{
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: hovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)',
          backdropFilter: `blur(${Math.max(16, customizations.blurIntensity)}px)`,
          boxShadow: hovered 
            ? '0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)' 
            : '0 8px 25px -5px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
        }}
      >
        {/* Top-edge specular gleam */}
        <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        <Layers className="w-4 h-4 text-cyan-300" />
        <span className="tracking-wide">SPATIAL LIQUID GLASS</span>
        <ChevronRight className="w-3.5 h-3.5 opacity-70" />
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · FROSTED GLASS CAPSULE WITH SPECULAR LIGHT
      </span>
    </div>
  );
};
