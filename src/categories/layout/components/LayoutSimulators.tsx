import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import {
  Layout,
  Columns,
  Grid,
  Maximize2,
  ChevronRight,
  Sparkles,
  Terminal,
  Activity,
  Layers,
  ArrowRight,
  Code,
  Eye,
} from 'lucide-react';
import { sound } from '../../../utils/soundEngine';

export const BentoLayoutSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [activeTile, setActiveTile] = useState<number | null>(null);

  const tiles = [
    {
      id: 1,
      col: 'col-span-2 row-span-2',
      title: 'ORBITAL ENGINE V4',
      badge: 'PRIMARY CORE',
      desc: 'Real-time raytraced rendering pipeline powering autonomous interface components.',
      icon: Sparkles,
      color: 'from-cyan-950/60 to-slate-900',
    },
    {
      id: 2,
      col: 'col-span-1 row-span-1',
      title: 'DATA FEED',
      badge: '99.98%',
      desc: 'Synchronized telemetry streams.',
      icon: Activity,
      color: 'from-blue-950/40 to-slate-900',
    },
    {
      id: 3,
      col: 'col-span-1 row-span-1',
      title: 'TERMINAL',
      badge: 'BASH',
      desc: 'CLI interface hooks.',
      icon: Terminal,
      color: 'from-slate-900 to-black',
    },
    {
      id: 4,
      col: 'col-span-2 row-span-1',
      title: 'LAYER ARCHITECTURE',
      badge: 'MODULAR',
      desc: 'Dynamic layout nodes assemble seamlessly with microsecond re-renders.',
      icon: Layers,
      color: 'from-teal-950/50 to-slate-900',
    },
  ];

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-3xl relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Bento Matrix Layout</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
          {variantId.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          const isSelected = activeTile === tile.id;
          return (
            <div
              key={tile.id}
              onClick={() => {
                sound.playConfirm();
                setActiveTile(isSelected ? null : tile.id);
              }}
              style={{
                borderColor: isSelected ? customizations.primaryColor : `${customizations.primaryColor}40`,
                boxShadow: isSelected ? `0 0 15px ${customizations.primaryColor}40` : 'none',
              }}
              className={`${tile.col} p-4 rounded-xl border bg-gradient-to-br ${tile.color} hover:border-cyan-400 cursor-pointer transition-all duration-300 flex flex-col justify-between group`}
            >
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-lg border border-slate-700 bg-black/40 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 border border-slate-700 text-cyan-300">
                  {tile.badge}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tile.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {tile.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SplitLayoutSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [activePane, setActivePane] = useState<'left' | 'right'>('left');

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-3xl relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
        <div className="flex items-center gap-2">
          <Columns className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Dual Split Screen Partition</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
          {variantId.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Pane: Code / Input */}
        <div
          onClick={() => { sound.playBlip(); setActivePane('left'); }}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${activePane === 'left' ? 'border-cyan-400 bg-slate-900/90 shadow-lg shadow-cyan-500/10' : 'border-slate-800 bg-slate-950/60 opacity-80'}`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5"><Code className="w-3.5 h-3.5 text-cyan-400" /> SCHEMA SOURCE</span>
            <span className="text-[9px] text-cyan-400">PANE_A</span>
          </div>
          <div className="text-[11px] font-mono text-cyan-300/80 space-y-1">
            <div>&lt;<span className="text-cyan-400">AuroraPod</span>&gt;</div>
            <div className="pl-4 text-slate-400">&lt;<span className="text-pink-400">Telemetry</span> status="NOMINAL" /&gt;</div>
            <div className="pl-4 text-slate-400">&lt;<span className="text-teal-400">MatrixGrid</span> columns=&#123;12&#125; /&gt;</div>
            <div>&lt;/<span className="text-cyan-400">AuroraPod</span>&gt;</div>
          </div>
        </div>

        {/* Right Pane: Live View */}
        <div
          onClick={() => { sound.playBlip(); setActivePane('right'); }}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${activePane === 'right' ? 'border-cyan-400 bg-slate-900/90 shadow-lg shadow-cyan-500/10' : 'border-slate-800 bg-slate-950/60 opacity-80'}`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-cyan-400" /> RENDERED VIEWPORT</span>
            <span className="text-[9px] text-cyan-400">PANE_B</span>
          </div>
          <div className="h-24 rounded-lg bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/20 flex flex-col items-center justify-center p-2 text-center">
            <div className="text-xs font-bold text-white">INTERACTIVE STAGE</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Click panes to toggle active viewport focus.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
