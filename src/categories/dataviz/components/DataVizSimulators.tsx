import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight,
  PieChart as PieIcon,
  Zap,
  Target,
  Award,
  Calendar,
} from 'lucide-react';

export const BarChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [activeBar, setActiveBar] = useState(4);

  const bars = [40, 65, 50, 85, 95, 75, 60, 90];

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border select-none"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>THROUGHPUT DISTRIBUTION</span>
          </span>
          <span className="text-[10px] text-cyan-400 font-bold">LIVE TELEMETRY</span>
        </div>

        {/* Bars Container */}
        <div className="flex items-end gap-2 h-36 pt-4 border-b border-white/10 pb-2">
          {bars.map((val, idx) => {
            const isSelected = activeBar === idx;
            return (
              <div
                key={idx}
                onClick={() => {
                  sound.playBlip(1100 + val * 5);
                  setActiveBar(idx);
                }}
                className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
              >
                <div
                  className="w-full rounded-t transition-all duration-300 relative"
                  style={{
                    height: `${val}%`,
                    backgroundColor: isSelected ? customizations.primaryColor : `${customizations.primaryColor}40`,
                    boxShadow: isSelected ? `0 0 15px ${customizations.primaryColor}` : 'none',
                  }}
                >
                  {isSelected && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] text-cyan-300 border border-cyan-400 whitespace-nowrap">
                      {val}%
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500">D{idx + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const LineChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border select-none space-y-3"
      >
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-white uppercase">FREQUENCY FLUX (GHZ)</span>
          <span className="text-[10px] text-emerald-400 font-bold">+18.4% NOMINAL</span>
        </div>

        {/* SVG Spline */}
        <div className="h-32 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={customizations.primaryColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor={customizations.primaryColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0,80 Q 50,20 100,50 T 200,30 T 300,10 L 300,100 L 0,100 Z"
              fill="url(#lineGrad)"
            />
            <path
              d="M 0,80 Q 50,20 100,50 T 200,30 T 300,10"
              fill="transparent"
              stroke={customizations.primaryColor}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 6px ${customizations.primaryColor})` }}
            />
            <circle cx="300" cy="10" r="4" fill="#ffffff" stroke={customizations.primaryColor} strokeWidth="2" />
          </svg>
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 pt-2 border-t border-white/5">
          <span>00:00 UTC</span>
          <span>12:00 UTC</span>
          <span>CURRENT</span>
        </div>
      </div>
    </div>
  );
};

export const PieChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border select-none flex items-center justify-between"
      >
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#253745" strokeWidth="5" />
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke={customizations.primaryColor}
              strokeWidth="5"
              strokeDasharray="60 40"
              strokeDashoffset="0"
              style={{ filter: `drop-shadow(0 0 5px ${customizations.primaryColor})` }}
            />
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke="#800021"
              strokeWidth="5"
              strokeDasharray="25 75"
              strokeDashoffset="-60"
            />
          </svg>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: customizations.primaryColor }} />
            <span className="text-white font-bold">Neural Core (60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#800021]" />
            <span className="text-slate-300">GPU Mesh (25%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span className="text-slate-400">Idle (15%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DonutChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border select-none flex items-center justify-between"
      >
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="14" fill="transparent" stroke="#253745" strokeWidth="4" />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke={customizations.primaryColor}
              strokeWidth="4"
              strokeDasharray="72 28"
              strokeDashoffset="0"
              style={{ filter: `drop-shadow(0 0 6px ${customizations.primaryColor})` }}
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-base font-bold text-white">72%</span>
            <span className="text-[8px] text-slate-400 block">SYNC</span>
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-white">ORBITAL CAPACITY</h4>
          <p className="text-[11px] text-slate-400">14.8 TB of 20 TB used</p>
          <span className="text-[10px] text-cyan-400 font-bold block pt-1">NOMINAL RETENTION</span>
        </div>
      </div>
    </div>
  );
};

export const AreaChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  return <LineChartSimulator variantId={variantId} />;
};

export const RadarChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-4 text-center font-mono select-none">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border"
      >
        <h4 className="text-xs font-bold text-white uppercase mb-3">TACTICAL RADAR SPECTRUM</h4>
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-white/10" />
          <div className="absolute inset-4 rounded-full border border-white/10" />
          <polygon
            points="72,12 125,50 110,120 34,120 18,50"
            fill={`${customizations.primaryColor}30`}
            stroke={customizations.primaryColor}
            strokeWidth="2"
            style={{ filter: `drop-shadow(0 0 8px ${customizations.primaryColor})` }}
          />
        </div>
        <div className="flex justify-around text-[10px] text-slate-400 mt-2">
          <span>CPU: 94</span>
          <span>GPU: 88</span>
          <span>RAM: 76</span>
          <span>NET: 99</span>
        </div>
      </div>
    </div>
  );
};

export const StatisticsWidgetSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border space-y-2 select-none"
      >
        <div className="flex justify-between text-xs text-slate-400">
          <span>GLOBAL INGRESS TRAFFIC</span>
          <span className="text-emerald-400 font-bold">+28.4%</span>
        </div>
        <div className="text-3xl font-extrabold text-white">48,291 <span className="text-xs text-cyan-400 font-normal">req/s</span></div>
        <div className="h-1.5 w-full bg-[#06141B] rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 w-3/4 shadow-glow-cyan" style={{ backgroundColor: customizations.primaryColor }} />
        </div>
      </div>
    </div>
  );
};

export const KpiCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase">MONTHLY REVENUE RUN-RATE</span>
          </div>
          <span className="text-[10px] text-slate-400">Q4 2026</span>
        </div>
        <div className="text-2xl font-bold text-white">$1,420,800 <span className="text-xs text-slate-500 font-normal">/ $1.5M TARGET</span></div>
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>PACING: 94.7%</span>
          <span className="text-emerald-400 font-bold">ON TRACK</span>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsPanelSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  return <StatisticsWidgetSimulator variantId={variantId} />;
};

export const DataTableVizSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-2 select-none"
      >
        <div className="flex justify-between pb-2 border-b border-white/10 text-slate-400 font-bold">
          <span>NODE</span>
          <span>LATENCY</span>
          <span>STATUS</span>
        </div>
        {[
          { node: 'US-EAST-1', lat: '12ms', st: 'NOMINAL' },
          { node: 'EU-WEST-4', lat: '34ms', st: 'NOMINAL' },
          { node: 'AP-SOUTH-1', lat: '82ms', st: 'DEGRADED' },
        ].map((r, i) => (
          <div key={i} className="flex justify-between items-center py-1 text-slate-200">
            <span>{r.node}</span>
            <span className="text-cyan-400">{r.lat}</span>
            <span className={r.st === 'NOMINAL' ? 'text-emerald-400' : 'text-amber-400'}>{r.st}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ActivityTimelineVizSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-2.5"
      >
        <span className="font-bold text-white uppercase block mb-1">AUDIT SEQUENCE</span>
        {['Kernel 4.2 Deployed', 'Database Shards Balanced', 'Sub-atomic Bus Active'].map((ev, i) => (
          <div key={i} className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="truncate">{ev}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HeatmapChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-2 select-none"
      >
        <span className="font-bold text-white uppercase block">CLUSTER MATRIX HEATMAP</span>
        <div className="grid grid-cols-6 gap-1.5 pt-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-6 rounded bg-[#06141B] border border-white/5 flex items-center justify-center text-[9px] hover:border-cyan-400 transition-colors"
              style={{
                backgroundColor: i % 3 === 0 ? `${customizations.primaryColor}60` : i % 2 === 0 ? `${customizations.primaryColor}25` : '#06141B',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CalendarHeatmapSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  return <HeatmapChartSimulator variantId={variantId} />;
};

export const LeaderboardWidgetSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-2"
      >
        <div className="flex items-center gap-1.5 font-bold text-amber-400">
          <Award className="w-4 h-4" />
          <span>TOP OPERATIVES</span>
        </div>
        {[
          { rank: '01', name: 'Cmdr. Vance', score: '9,480 XP' },
          { rank: '02', name: 'Agent Lyra', score: '8,920 XP' },
          { rank: '03', name: 'Dr. Rostova', score: '7,440 XP' },
        ].map((u) => (
          <div key={u.rank} className="flex justify-between items-center py-1 text-slate-200">
            <span className="text-cyan-400 font-bold">{u.rank}. {u.name}</span>
            <span className="text-white font-bold">{u.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GaugeChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-4 text-center font-mono select-none">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border space-y-2"
      >
        <span className="text-xs font-bold text-white uppercase block">VELOCITY TACHOMETER</span>
        <div className="relative w-32 h-16 mx-auto overflow-hidden">
          <div
            className="w-32 h-32 rounded-full border-8 border-t-cyan-400 border-r-cyan-400 border-b-transparent border-l-slate-700"
            style={{
              borderTopColor: customizations.primaryColor,
              borderRightColor: customizations.primaryColor,
              filter: `drop-shadow(0 0 8px ${customizations.primaryColor})`,
            }}
          />
        </div>
        <div className="text-xl font-extrabold text-white">840 <span className="text-xs text-cyan-400">MACH</span></div>
      </div>
    </div>
  );
};

export const SparklineChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  return <LineChartSimulator variantId={variantId} />;
};

export const ComparisonChartSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  return <BarChartSimulator variantId={variantId} />;
};
