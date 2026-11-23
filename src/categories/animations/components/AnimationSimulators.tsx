import React, { useState, useRef, useEffect } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { Sparkles, Magnet, Activity, Move, Zap, Play, RotateCcw, Eye } from 'lucide-react';
import { sound } from '../../../utils/soundEngine';

export const MagneticTiltSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setCoords({ x: Math.round(x), y: Math.round(y) });
    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    sound.playHover();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    sound.playConfirm();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-xl select-none font-mono">
      {/* 3D Tilt Wrapper */}
      <div
        style={{ perspective: 1000 }}
        className="w-full flex justify-center py-4"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.04 : 1})`,
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: `${customizations.surfaceColor || '#11212D'}F5`,
            borderColor: isHovered ? customizations.primaryColor : `${customizations.primaryColor}55`,
            borderWidth: `${customizations.borderWidth || 1}px`,
            boxShadow: isHovered
              ? `0 20px 40px -15px ${customizations.primaryColor}40, 0 0 25px ${customizations.primaryColor}30`
              : '0 10px 25px -10px rgba(0,0,0,0.5)',
          }}
          className="relative w-80 h-96 p-6 border cursor-pointer flex flex-col justify-between overflow-hidden backdrop-blur-md"
        >
          {/* Glare Reflection Layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6) 0%, transparent 60%)`,
            }}
          />

          {/* Card Header */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white tracking-widest">HOLOGRAM POD</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
              {variantId.toUpperCase()}
            </span>
          </div>

          {/* Central Holographic Emblem */}
          <div className="flex flex-col items-center justify-center my-auto z-10 space-y-3">
            <div
              className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center relative group"
              style={{
                borderColor: customizations.primaryColor,
                backgroundColor: `${customizations.primaryColor}15`,
                boxShadow: `0 0 20px ${customizations.primaryColor}30`,
              }}
            >
              <Zap className="w-10 h-10 text-cyan-300" />
              <div className="absolute inset-0 rounded-2xl border border-cyan-400/40 animate-ping pointer-events-none opacity-40" />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white tracking-wider">KINETIC 3D TILT</div>
              <div className="text-[10px] text-slate-400">Mouse Proximity Gyroscope</div>
            </div>
          </div>

          {/* Card Footer Telemetry */}
          <div className="z-10 border-t border-slate-700/60 pt-3 flex justify-between items-center text-[10px] text-slate-400">
            <div>
              ROT: X:{rotate.x.toFixed(1)}&deg; Y:{rotate.y.toFixed(1)}&deg;
            </div>
            <div className="text-cyan-400 font-bold">CLICK TO PULSE</div>
          </div>
        </div>
      </div>

      {/* Control Info Pill */}
      <div className="mt-4 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/80 text-xs text-slate-400 flex items-center gap-2">
        <Magnet className="w-3.5 h-3.5 text-cyan-400" />
        <span>Hover cursor around card center to test 3D perspective warp.</span>
      </div>
    </div>
  );
};

export const MicroInteractionTriggerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isStaggerActive, setIsStaggerActive] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const handleRippleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sound.playConfirm();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const triggerStagger = () => {
    sound.playBlip();
    setIsStaggerActive(false);
    setTimeout(() => {
      setIsStaggerActive(true);
      setPulseCount(c => c + 1);
    }, 50);
  };

  useEffect(() => {
    setIsStaggerActive(true);
  }, []);

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-xl relative overflow-hidden backdrop-blur-md space-y-6"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      <div className="flex justify-between items-center pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Micro-Interaction Array</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
          {variantId.toUpperCase()}
        </span>
      </div>

      {/* Ripple Effect Button */}
      <div className="space-y-2">
        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">01. Dynamic Ripple Trigger</div>
        <button
          onClick={handleRippleClick}
          className="relative overflow-hidden w-full py-3.5 rounded-lg border border-cyan-400/50 bg-cyan-950/40 text-cyan-300 font-bold text-xs uppercase tracking-widest hover:border-cyan-300 transition-colors shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Zap className="w-4 h-4" />
          <span>Click to Generate Laser Shockwave</span>
          {ripples.map(r => (
            <span
              key={r.id}
              className="absolute w-8 h-8 rounded-full bg-cyan-400/50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ping"
              style={{ left: r.x, top: r.y, transformOrigin: 'center' }}
            />
          ))}
        </button>
      </div>

      {/* Stagger Sequence Cascade */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">
          <span>02. Cascade Stagger Animation</span>
          <button
            onClick={triggerStagger}
            className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-white"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RE-TRIGGER</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map(idx => (
            <div
              key={`${idx}-${pulseCount}`}
              style={{
                animationDelay: `${idx * 80}ms`,
                borderColor: `${customizations.primaryColor}55`,
              }}
              className={`p-3 rounded-lg border bg-slate-900/80 text-center transition-all ${isStaggerActive ? 'animate-fade-in translate-y-0 opacity-100' : 'opacity-0 translate-y-3'}`}
            >
              <div className="text-xs font-bold text-white">0{idx}</div>
              <div className="text-[9px] text-cyan-400 mt-1">NODE</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
