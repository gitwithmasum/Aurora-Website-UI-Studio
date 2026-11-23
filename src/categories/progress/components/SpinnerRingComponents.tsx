import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import { Loader2, RefreshCw, Zap, Compass, RotateCw } from 'lucide-react';

// 1. Loading Spinner Simulator
export const LoadingSpinnerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [speed, setSpeed] = useState<'normal' | 'fast'>('normal');

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none">
      <div className="relative inline-flex items-center justify-center mb-6">
        {/* Outer Laser Arc */}
        <div
          className={`w-20 h-20 rounded-full border-2 border-transparent animate-spin`}
          style={{
            borderTopColor: customizations.primaryColor,
            borderRightColor: `${customizations.primaryColor}80`,
            animationDuration: speed === 'fast' ? '0.6s' : '1.2s',
            filter: `drop-shadow(0 0 10px ${customizations.primaryColor})`,
          }}
        />

        {/* Counter-rotating Inner Arc */}
        <div
          className="w-12 h-12 rounded-full border-2 border-transparent absolute animate-spin"
          style={{
            borderBottomColor: '#CCD0CF',
            borderLeftColor: '#4A5C6A',
            animationDirection: 'reverse',
            animationDuration: speed === 'fast' ? '0.9s' : '1.8s',
          }}
        />

        {/* Center glowing core point */}
        <div 
          className="w-3 h-3 rounded-full absolute shadow-glow-cyan animate-pulse"
          style={{ backgroundColor: customizations.primaryColor }}
        />
      </div>

      <h4 className="text-sm font-bold text-white font-mono uppercase mb-1">
        SYNCHRONIZING NEURAL CORE
      </h4>
      <p className="text-xs text-slate-400 mb-4 font-mono">
        Sub-atomic vortex lock // Active {variantId.toUpperCase()}
      </p>

      <button
        onClick={() => {
          sound.playBlip(1300);
          setSpeed(speed === 'normal' ? 'fast' : 'normal');
        }}
        className="px-3 py-1 rounded-lg text-[10px] font-mono border border-white/10 text-slate-400 hover:text-white"
      >
        TOGGLE VELOCITY: {speed.toUpperCase()}
      </button>
    </div>
  );
};

// 2. Circular Progress Simulator
export const CircularProgressSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [percent, setPercent] = useState(78);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none">
      <div className="relative inline-flex items-center justify-center mb-5">
        <svg className="w-28 h-28 transform -rotate-90">
          {/* Background Track */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#253745"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Glowing Progress Arc */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke={customizations.primaryColor}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${customizations.primaryColor})`,
            }}
          />
        </svg>

        {/* Centered Readout */}
        <div className="absolute flex flex-col items-center">
          <span className="text-xl font-extrabold font-mono text-white">
            {percent}%
          </span>
          <span className="text-[9px] font-mono text-slate-400">TELEMETRY</span>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {[25, 50, 78, 100].map((p) => (
          <button
            key={p}
            onClick={() => {
              sound.playBlip(1000 + p * 8);
              setPercent(p);
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
              percent === p
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            {p}%
          </button>
        ))}
      </div>
    </div>
  );
};

// 11. Animated Dots Simulator
export const AnimatedDotsSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none">
      <div className="p-4 rounded-xl bg-[#11212DE6] border border-white/10 flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-slate-300">Awaiting Subsystem Response</span>
        
        {/* Animated 3 Dots Cluster */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full animate-bounce"
              style={{
                backgroundColor: customizations.primaryColor,
                animationDelay: `${i * 0.16}s`,
                boxShadow: `0 0 8px ${customizations.primaryColor}`,
              }}
            />
          ))}
        </div>
      </div>

      <span className="text-[10px] font-mono text-slate-500">
        Continuous wave ping protocol active
      </span>
    </div>
  );
};

// 12. Progress Ring Simulator
export const ProgressRingSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [val, setVal] = useState(64);

  return (
    <div className="w-full max-w-sm mx-auto p-4 text-center">
      <div 
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border flex items-center justify-between"
      >
        <div className="text-left">
          <h4 className="text-xs font-bold text-white font-mono">BATTERY VOLTAGE FLUX</h4>
          <p className="text-[10px] text-slate-400 font-mono">Orbital Solar Collector</p>
        </div>

        {/* Compact Ring */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="18" stroke="#253745" strokeWidth="3" fill="transparent" />
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke={customizations.primaryColor}
              strokeWidth="3"
              strokeDasharray={113}
              strokeDashoffset={113 - (val / 100) * 113}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-[10px] font-bold font-mono text-white">{val}%</span>
        </div>
      </div>
    </div>
  );
};

// 14. Indeterminate Loader Simulator
export const IndeterminateLoaderSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none">
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-xs font-mono text-slate-300">
          <span>COMPILING SHADERS...</span>
          <span className="text-cyan-400 animate-pulse">PROCESSING</span>
        </div>

        {/* Indeterminate Scanning Bar */}
        <div className="w-full h-1.5 bg-[#06141B] rounded-full overflow-hidden border border-white/10 relative">
          <div
            className="h-full rounded-full w-1/3 absolute animate-indeterminate-slide"
            style={{
              background: `linear-gradient(90deg, transparent, ${customizations.primaryColor}, transparent)`,
              boxShadow: `0 0 15px ${customizations.primaryColor}`,
            }}
          />
        </div>
      </div>

      <span className="text-[10px] font-mono text-slate-500">
        Non-computable quantum duration
      </span>
    </div>
  );
};
