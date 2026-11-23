import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import { Loader2, Sparkles, Check, Play } from 'lucide-react';

// 4. Skeleton Loader Simulator
export const SkeletonLoaderSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: '#253745',
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border space-y-4 animate-pulse select-none"
      >
        {/* Avatar skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-700/50" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-slate-700/60 rounded w-3/4" />
            <div className="h-2.5 bg-slate-700/40 rounded w-1/2" />
          </div>
        </div>

        {/* Content body skeleton */}
        <div className="space-y-2 pt-2">
          <div className="h-2.5 bg-slate-700/50 rounded w-full" />
          <div className="h-2.5 bg-slate-700/50 rounded w-5/6" />
          <div className="h-2.5 bg-slate-700/40 rounded w-2/3" />
        </div>

        {/* Action skeleton */}
        <div className="h-8 bg-slate-700/40 rounded-xl w-full" />
      </div>
    </div>
  );
};

// 5. Shimmer Effect Simulator
export const ShimmerEffectSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: '#253745',
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-6 border relative overflow-hidden select-none"
      >
        {/* Diagonal Shimmer Sweep */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />

        <div className="space-y-3">
          <div className="h-4 bg-slate-700/50 rounded w-1/2" />
          <div className="h-3 bg-slate-700/40 rounded w-full" />
          <div className="h-3 bg-slate-700/40 rounded w-4/5" />
          <div className="h-10 bg-slate-700/30 rounded-xl w-full mt-4" />
        </div>
      </div>
    </div>
  );
};

// 6. Page Loading Screen Simulator
export const PageLoadingScreenSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none">
      <div 
        className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border mb-4 animate-pulse"
        style={{
          backgroundColor: '#06141B',
          borderColor: `${customizations.primaryColor}80`,
          boxShadow: `0 0 25px -3px ${customizations.primaryColor}50`,
        }}
      >
        <Sparkles className="w-8 h-8" style={{ color: customizations.primaryColor }} />
      </div>

      <h3 className="text-sm font-bold text-white font-mono uppercase mb-1">
        AURORA STUDIO BOOTING...
      </h3>
      <p className="text-xs text-slate-400 font-mono mb-4">
        Initializing 133 neural components
      </p>

      <div className="w-48 mx-auto h-1 bg-black/60 rounded-full overflow-hidden border border-white/10">
        <div
          className="h-full rounded-full animate-pulse"
          style={{
            width: '88%',
            backgroundColor: customizations.primaryColor,
          }}
        />
      </div>
    </div>
  );
};

// 7. Button Loading State Simulator
export const ButtonLoadingStateSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none space-y-4">
      <button
        onClick={() => {
          sound.playConfirm();
          setIsLoading(!isLoading);
        }}
        disabled={isLoading}
        className="w-full py-3 px-6 rounded-xl text-xs font-mono font-bold tracking-wide transition-all flex items-center justify-center gap-2 border"
        style={{
          backgroundColor: isLoading ? '#06141B' : customizations.primaryColor,
          color: isLoading ? customizations.primaryColor : '#06141B',
          borderColor: customizations.primaryColor,
          boxShadow: `0 0 20px -5px ${customizations.primaryColor}50`,
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>SYNCHRONIZING REPOSITORY...</span>
          </>
        ) : (
          <span>DEPLOY ARCHITECTURE</span>
        )}
      </button>

      <button
        onClick={() => {
          sound.playBlip(1200);
          setIsLoading(!isLoading);
        }}
        className="text-[10px] font-mono text-slate-400 hover:text-white underline"
      >
        [TOGGLE BUTTON STATE: {isLoading ? 'SIMULATE FINISHED' : 'SIMULATE LOADING'}]
      </button>
    </div>
  );
};
