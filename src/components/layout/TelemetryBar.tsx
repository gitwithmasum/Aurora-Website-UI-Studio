import React, { useState, useEffect } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  Volume2, 
  VolumeX, 
  Tv, 
  Crosshair, 
  Cpu, 
  Activity, 
  Radio, 
  Sparkles, 
  Terminal,
  Maximize2
} from 'lucide-react';
import { sound } from '../../utils/soundEngine';

export const TelemetryBar: React.FC = () => {
  const { 
    soundEnabled, 
    setSoundEnabled, 
    crtEnabled, 
    setCrtEnabled, 
    hudMode, 
    setHudMode,
    setIsTemplateInjectorOpen,
    activeComponent,
    customTemplates
  } = useStudio();

  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(1.4);

  // Simulated live telemetry jitter
  useEffect(() => {
    const timer = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
      setLatency(Number((1.2 + Math.random() * 0.4).toFixed(1)));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 border-t border-[#253745]/60 bg-[#06141B] px-4 flex items-center justify-between text-[10px] font-mono select-none z-30 shrink-0">
      {/* Left: Telemetry Data Stream */}
      <div className="flex items-center gap-4 text-slate-400">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold">AURORA KERNEL v4.12</span>
        </div>

        <span className="opacity-30">|</span>

        <div className="hidden sm:flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>FPS: {fps}</span>
          <span className="opacity-50">({latency}ms)</span>
        </div>

        <span className="opacity-30 hidden sm:inline">|</span>

        <div className="hidden md:flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-indigo-400" />
          <span>TELEMETRY: LINKED</span>
        </div>

        <span className="opacity-30 hidden md:inline">|</span>

        <div className="hidden lg:flex items-center gap-1.5 text-amber-400">
          <Cpu className="w-3 h-3" />
          <span>VAULT: {customTemplates.length} BLUEPRINTS</span>
        </div>
      </div>

      {/* Right: Tactical Sci-Fi Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Launch Template Injector */}
        <button
          onClick={() => {
            sound.playScan();
            setIsTemplateInjectorOpen(true);
          }}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span className="font-bold uppercase tracking-wider">Inject Blueprint</span>
        </button>

        {/* Tactical HUD Reticle Mode */}
        <button
          onClick={() => setHudMode(hudMode === 'tactical' ? 'standard' : 'tactical')}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
            hudMode === 'tactical' 
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle Cyberpunk HUD Reticle Corners"
        >
          <Crosshair className="w-3 h-3" />
          <span className="hidden xl:inline">HUD</span>
        </button>

        {/* CRT Scanline Toggle */}
        <button
          onClick={() => setCrtEnabled(!crtEnabled)}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
            crtEnabled 
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle Retro-Futuristic CRT Scanline Overlay"
        >
          <Tv className="w-3 h-3" />
          <span className="hidden xl:inline">CRT</span>
        </button>

        {/* Audio Engine Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors ${
            soundEnabled 
              ? 'text-cyan-400 hover:text-cyan-300' 
              : 'text-slate-600 hover:text-slate-400'
          }`}
          title={soundEnabled ? 'Mute Web Audio UI Frequencies' : 'Unmute Web Audio UI Frequencies'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <div className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse" />
                <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse delay-75" />
                <span className="w-0.5 h-1 bg-cyan-400 animate-pulse delay-150" />
              </div>
            </>
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
