import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  User,
  Shield,
  Activity,
  ShoppingBag,
  Star,
  Check,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Sliders,
  Bell,
  AlertTriangle,
  Info,
  X,
  ExternalLink,
  ChevronRight,
  Server,
} from 'lucide-react';

// 1. Profile Card Simulator
export const ProfileCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isFollowing, setIsFollowing] = useState(false);
  const [statusOnline, setStatusOnline] = useState(true);

  const getCardStyle = () => ({
    borderRadius: `${customizations.borderRadius}px`,
    backgroundColor: `${customizations.surfaceColor || '#11212D'}E6`,
    borderColor: `${customizations.primaryColor}50`,
    borderWidth: `${customizations.borderWidth || 1}px`,
    boxShadow: `0 10px 30px -10px ${customizations.primaryColor}30`,
    backdropFilter: `blur(${customizations.blurIntensity}px)`,
  });

  return (
    <div className="w-full max-w-sm mx-auto p-1 transition-all duration-300">
      <div 
        style={getCardStyle()} 
        className="relative overflow-hidden border p-6 transition-all group"
      >
        {/* Top telemetry & badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span 
              onClick={() => {
                sound.playBlip(1200);
                setStatusOnline(!statusOnline);
              }}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                statusOnline ? 'bg-emerald-400 shadow-glow-emerald animate-pulse' : 'bg-slate-500'
              }`}
              title="Click to toggle status"
            />
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              {statusOnline ? 'OPERATIVE // ONLINE' : 'OPERATIVE // OFFLINE'}
            </span>
          </div>
          <span 
            className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
            style={{ 
              borderColor: `${customizations.primaryColor}40`,
              color: customizations.primaryColor,
              backgroundColor: `${customizations.primaryColor}15`
            }}
          >
            {variantId === 'hud-matrix' ? 'HUD-V4' : 'CLASS-A'}
          </span>
        </div>

        {/* Avatar & Ident */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center border p-1"
              style={{
                borderColor: `${customizations.primaryColor}80`,
                boxShadow: `0 0 15px -3px ${customizations.primaryColor}50`,
                background: `linear-gradient(135deg, ${customizations.primaryColor}20, #06141B)`
              }}
            >
              <User className="w-8 h-8" style={{ color: customizations.primaryColor }} />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#06141B] border border-cyan-500/40">
              <Shield className="w-3 h-3 text-cyan-400" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-1.5">
              <span>Commander Vance</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">@aurora.sentinel</p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
              <span>Cyber Architect</span>
              <span>•</span>
              <span className="text-cyan-400">LVL 84</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div 
          className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl border mb-5"
          style={{ 
            backgroundColor: '#06141B80',
            borderColor: `${customizations.primaryColor}20` 
          }}
        >
          <div className="text-center">
            <div className="text-xs font-mono font-bold text-white">1,420</div>
            <div className="text-[10px] text-slate-400">Nodes</div>
          </div>
          <div className="text-center border-x border-white/5">
            <div className="text-xs font-mono font-bold" style={{ color: customizations.primaryColor }}>99.8%</div>
            <div className="text-[10px] text-slate-400">Sync</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-mono font-bold text-white">48.2k</div>
            <div className="text-[10px] text-slate-400">Tokens</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            sound.playConfirm();
            setIsFollowing(!isFollowing);
          }}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2"
          style={{
            backgroundColor: isFollowing ? 'transparent' : customizations.primaryColor,
            color: isFollowing ? customizations.primaryColor : '#06141B',
            border: `1px solid ${customizations.primaryColor}`,
            boxShadow: !isFollowing ? `0 0 15px -3px ${customizations.primaryColor}60` : 'none',
          }}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>{isFollowing ? 'CONNECTED // LINKED' : 'ESTABLISH NEURAL LINK'}</span>
        </button>
      </div>
    </div>
  );
};

// 2. Product Card Simulator
export const ProductCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [inCart, setInCart] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1 transition-all">
      <div 
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: `${customizations.surfaceColor || '#11212D'}E6`,
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 12px 32px -10px ${customizations.primaryColor}30`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-5 group"
      >
        {/* Product Visual Area */}
        <div 
          className="relative h-44 rounded-xl mb-4 overflow-hidden flex items-center justify-center border"
          style={{ 
            backgroundColor: '#06141B',
            borderColor: `${customizations.primaryColor}30` 
          }}
        >
          {/* Subtle Cyber Grids */}
          <div className="absolute inset-0 bg-[radial-gradient(#253745_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

          {/* Glowing Product Artifact */}
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `radial-gradient(circle, ${customizations.primaryColor}30, #06141B)`,
              borderColor: `${customizations.primaryColor}60`,
              boxShadow: `0 0 25px -5px ${customizations.primaryColor}60`,
            }}
          >
            <Zap className="w-10 h-10" style={{ color: customizations.primaryColor }} />
          </div>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5">
            <span 
              className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${customizations.primaryColor}20`,
                color: customizations.primaryColor,
                border: `1px solid ${customizations.primaryColor}50`
              }}
            >
              {variantId === 'floating-pod' ? 'POD-GEN' : 'CYBER DROP'}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playHover();
              setLiked(!liked);
            }}
            className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-cyan-400 transition-all text-slate-400 hover:text-white"
          >
            <Star className={`w-3.5 h-3.5 ${liked ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Product Meta */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">AEROSPACE HARDWARE</span>
            <div className="flex items-center gap-1 text-[11px] text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>4.9</span>
            </div>
          </div>
          <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
            Quantum Hyperion Reactor Core
          </h3>
          <p className="text-xs text-slate-400 line-clamp-1">
            Zero-point field containment cell with titanium heat sinks and sub-light emitters.
          </p>
        </div>

        {/* Price and Cart Action */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div>
            <div className="text-[10px] text-slate-400 line-through">$3,499</div>
            <div className="text-base font-bold font-mono text-white">$2,890</div>
          </div>

          <button
            onClick={() => {
              sound.playConfirm();
              setInCart(!inCart);
            }}
            className="py-2 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2"
            style={{
              backgroundColor: inCart ? '#10b981' : customizations.primaryColor,
              color: inCart ? '#ffffff' : '#06141B',
              boxShadow: `0 0 15px -3px ${inCart ? '#10b981' : customizations.primaryColor}60`,
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{inCart ? 'IN HANGAR' : 'ACQUIRE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Pricing Card Simulator
export const PricingCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [annual, setAnnual] = useState(true);

  const perks = [
    'Unlimited Neural Compute Nodes',
    'Real-time HUD Telemetry Engine',
    'Zero-latency Sub-atomic Webhooks',
    'Enterprise Quantum Security Level 4',
    '24/7 Dedicated Operative Support',
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-1 transition-all">
      <div 
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: `${customizations.surfaceColor || '#11212D'}F2`,
          borderColor: `${customizations.primaryColor}60`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 15px 35px -10px ${customizations.primaryColor}40`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-6 group"
      >
        {/* Popular Flag */}
        <div className="flex items-center justify-between mb-4">
          <span 
            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border"
            style={{
              backgroundColor: `${customizations.primaryColor}20`,
              color: customizations.primaryColor,
              borderColor: `${customizations.primaryColor}50`
            }}
          >
            FLAGSHIP TIER
          </span>

          {/* Frequency Toggle */}
          <button
            onClick={() => {
              sound.playBlip(1300);
              setAnnual(!annual);
            }}
            className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-black/40 border border-white/10"
          >
            {annual ? 'ANNUAL (-20%)' : 'MONTHLY'}
          </button>
        </div>

        {/* Tier Title */}
        <h3 className="text-lg font-extrabold text-white">Quantum Enterprise</h3>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Dedicated high-throughput orbital infrastructure for scaling systems.
        </p>

        {/* Pricing Display */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="text-3xl font-extrabold font-mono text-white">
            ${annual ? '149' : '189'}
          </span>
          <span className="text-xs text-slate-400 font-mono">/ node / month</span>
        </div>

        {/* Perks list */}
        <div className="space-y-2.5 mb-6">
          {perks.map((perk, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${customizations.primaryColor}25` }}
              >
                <Check className="w-2.5 h-2.5" style={{ color: customizations.primaryColor }} />
              </div>
              <span className="truncate">{perk}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => sound.playConfirm()}
          className="w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2"
          style={{
            backgroundColor: customizations.primaryColor,
            color: '#06141B',
            boxShadow: `0 0 20px -3px ${customizations.primaryColor}60`,
          }}
        >
          <span>DEPLOY ARCHITECTURE</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 4. Feature Card Simulator
export const FeatureCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: `${customizations.surfaceColor || '#11212D'}E6`,
          borderColor: hovered ? customizations.primaryColor : `${customizations.primaryColor}30`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: hovered ? `0 12px 30px -8px ${customizations.primaryColor}40` : 'none',
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-6 transition-all duration-300"
      >
        {/* Cyber Brackets */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-500/40">⎡</div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-500/40">⎤</div>
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-cyan-500/40">⎣</div>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-500/40">⎦</div>

        {/* Feature Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center border mb-5 transition-transform duration-300"
          style={{
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            backgroundColor: '#06141B',
            borderColor: `${customizations.primaryColor}60`,
            boxShadow: `0 0 15px -3px ${customizations.primaryColor}40`,
          }}
        >
          <Zap className="w-6 h-6" style={{ color: customizations.primaryColor }} />
        </div>

        <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300">
          Sub-atomic Telemetry Bus
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Direct microsecond data synchronization with distributed web assembly nodes across 40 global edge availability sectors.
        </p>

        <div className="flex items-center gap-2 text-xs font-mono" style={{ color: customizations.primaryColor }}>
          <span>EXPLORE SPECIFICATION</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

// 5. Statistics Card Simulator
export const StatisticsCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [metric, setMetric] = useState(48291);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: `${customizations.surfaceColor || '#11212D'}E6`,
          borderColor: `${customizations.primaryColor}40`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-5 group"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400 font-medium">Global Throughput</span>
          <span 
            className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          >
            <TrendingUp className="w-3 h-3" />
            <span>+28.4%</span>
          </span>
        </div>

        {/* Counter Display */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {metric.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 font-mono">req/sec</span>
        </div>

        {/* Animated mini sparkline bars */}
        <div className="flex items-end gap-1.5 h-12 pt-2 border-t border-white/5">
          {[35, 60, 45, 80, 65, 90, 75, 100, 85, 95].map((h, i) => (
            <div
              key={i}
              onClick={() => {
                sound.playBlip(1200 + i * 50);
                setMetric((m) => m + (i % 2 === 0 ? 120 : -80));
              }}
              style={{
                height: `${h}%`,
                backgroundColor: i === 9 ? customizations.primaryColor : `${customizations.primaryColor}40`,
              }}
              className="flex-1 rounded-t transition-all hover:opacity-100 cursor-pointer"
              title={`Step ${i}: ${h}% capacity`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 6. Dashboard Card Simulator
export const DashboardCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [activeTab, setActiveTab] = useState<'stream' | 'diagnostics'>('stream');

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: `${customizations.surfaceColor || '#11212D'}F2`,
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-5 group"
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4" style={{ color: customizations.primaryColor }} />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              ORBITAL-04 // NODE
            </h4>
          </div>

          <div className="flex items-center bg-black/40 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
            <button
              onClick={() => {
                sound.playHover();
                setActiveTab('stream');
              }}
              className={`px-2 py-0.5 rounded ${activeTab === 'stream' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              LOGS
            </button>
            <button
              onClick={() => {
                sound.playHover();
                setActiveTab('diagnostics');
              }}
              className={`px-2 py-0.5 rounded ${activeTab === 'diagnostics' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              DIAG
            </button>
          </div>
        </div>

        {/* Content Stream */}
        <div className="space-y-2 mb-4 font-mono text-[11px]">
          {activeTab === 'stream' ? (
            <>
              <div className="p-2 rounded bg-[#06141B] text-slate-300 border border-white/5 flex items-center justify-between">
                <span>[SYNC] Quantum state locked</span>
                <span className="text-cyan-400">0.04ms</span>
              </div>
              <div className="p-2 rounded bg-[#06141B] text-slate-300 border border-white/5 flex items-center justify-between">
                <span>[ROUTING] Mesh tunnel #849</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
            </>
          ) : (
            <div className="space-y-1.5 p-2 rounded bg-[#06141B] text-slate-400 border border-white/5">
              <div className="flex justify-between">
                <span>Core Temperature:</span>
                <span className="text-white">312.4 K</span>
              </div>
              <div className="flex justify-between">
                <span>Memory Allocation:</span>
                <span className="text-cyan-400">1.82 / 64 GB</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
          <span>STATION ID: US-WEST-4</span>
          <span className="text-emerald-400 font-bold">HEALTH: NOMINAL</span>
        </div>
      </div>
    </div>
  );
};

// 7. Notification Card Simulator
export const NotificationCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="w-full max-w-sm mx-auto text-center p-6 border border-dashed border-white/10 rounded-2xl">
        <p className="text-xs text-slate-400 mb-2 font-mono">Notification dismissed from telemetry feed.</p>
        <button
          onClick={() => {
            sound.playConfirm();
            setDismissed(false);
          }}
          className="text-xs font-mono text-cyan-400 hover:underline"
        >
          [RESTORE FEED NOTIFICATION]
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: `${customizations.surfaceColor || '#11212D'}F2`,
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 10px 25px -8px ${customizations.primaryColor}30`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-4 group"
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
            style={{ 
              backgroundColor: '#06141B',
              borderColor: `${customizations.primaryColor}40`
            }}
          >
            <Bell className="w-4 h-4" style={{ color: customizations.primaryColor }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <h4 className="text-xs font-bold text-white truncate">Security Perimeter Re-armed</h4>
              <button
                onClick={() => {
                  sound.playHover();
                  setDismissed(true);
                }}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug mb-3">
              Sector 7 orbital shields have completed electromagnetic stabilization. All sensors online.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => sound.playConfirm()}
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg"
                style={{
                  backgroundColor: customizations.primaryColor,
                  color: '#06141B',
                }}
              >
                ACKNOWLEDGE
              </button>
              <span className="text-[10px] font-mono text-slate-500">2 MIN AGO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
