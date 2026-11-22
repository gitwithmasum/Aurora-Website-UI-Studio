import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  Compass, 
  Zap, 
  Cpu, 
  ChevronRight, 
  Settings, 
  ShieldCheck, 
  Terminal, 
  Layout, 
  Sidebar as SidebarIcon,
  Flame,
  ArrowRight
} from 'lucide-react';
import { CustomizationSettings } from '../../../types/studio';
import { getComponentStyles } from '../../../utils/styleHelper';

interface EffectsProps {
  settings: CustomizationSettings;
  variantId: string;
}

// 30. ACTIVE MENU HIGHLIGHT
export const ActiveMenuHighlightComponent: React.FC<EffectsProps> = ({ settings, variantId }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const items = ['Overview', 'Telemetry', 'Deployments', 'Security', 'Settings'];

  return (
    <div className="w-full max-w-xl flex flex-col items-center py-4">
      <div 
        className="relative flex items-center p-1.5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl"
      >
        {items.map((item, idx) => {
          const isActive = selectedIdx === idx;
          const isHovered = hoveredIdx === idx;

          return (
            <button
              key={item}
              onClick={() => setSelectedIdx(idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative z-10 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive ? 'text-black font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item}

              {/* Active pill indicator */}
              {isActive && (
                <div 
                  className="absolute inset-0 rounded-xl -z-10 shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: settings.primaryColor,
                    boxShadow: `0 0 20px ${settings.primaryColor}80`,
                  }}
                />
              )}

              {/* Hover ghost highlight */}
              {isHovered && !isActive && (
                <div className="absolute inset-0 rounded-xl bg-white/10 -z-10 animate-in fade-in duration-200" />
              )}
            </button>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-4 font-mono">
        Fluid sliding highlight capsule tracking selection and hover coordinates
      </span>
    </div>
  );
};

// 31. ANIMATED UNDERLINE
export const AnimatedUnderlineComponent: React.FC<EffectsProps> = ({ settings, variantId }) => {
  const [selected, setSelected] = useState('Clusters');
  const items = ['Clusters', 'Virtual Networks', 'Security Policies', 'Edge Gateways'];

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-4">
      <div className="flex items-center gap-6 border-b border-white/10 px-4">
        {items.map((item) => {
          const isActive = selected === item;
          return (
            <button
              key={item}
              onClick={() => setSelected(item)}
              className={`relative py-3 text-xs font-medium transition-colors ${
                isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{item}</span>
              {isActive && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
                  style={{ 
                    backgroundColor: settings.primaryColor, 
                    boxShadow: `0 0 10px ${settings.primaryColor}` 
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-4 font-mono">
        Laser underline indicator dynamically locking to active tab geometry
      </span>
    </div>
  );
};

// 32. STRETCHY HIGHLIGHT
export const StretchyHighlightComponent: React.FC<EffectsProps> = ({ settings, variantId }) => {
  const [active, setActive] = useState(1);
  const [isStretching, setIsStretching] = useState(false);

  const items = ['Home', 'Analytics', 'System Pulse', 'Logs'];

  const handleClick = (idx: number) => {
    setIsStretching(true);
    setActive(idx);
    setTimeout(() => setIsStretching(false), 250);
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center py-4">
      <div className="flex items-center gap-2 p-2 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
        {items.map((item, idx) => {
          const isActive = active === idx;
          return (
            <button
              key={item}
              onClick={() => handleClick(idx)}
              className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive ? 'text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item}
              {isActive && (
                <div 
                  className={`absolute inset-0 rounded-xl -z-10 transition-all duration-300 ${
                    isStretching ? 'scale-x-125 scale-y-90' : 'scale-100'
                  }`}
                  style={{ 
                    backgroundColor: settings.primaryColor,
                    boxShadow: `0 0 15px ${settings.primaryColor}80`
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-4 font-mono">
        Spring elastic capsule elongates during motion and contracts on rest
      </span>
    </div>
  );
};

// 33. MAGNETIC NAVIGATION
export const MagneticNavigationComponent: React.FC<EffectsProps> = ({ settings, variantId }) => {
  const [offsets, setOffsets] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    setOffsets((prev) => ({ ...prev, [id]: { x: distanceX, y: distanceY } }));
  };

  const handleMouseLeave = (id: string) => {
    setOffsets((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  const buttons = [
    { id: 'btn1', label: 'Explore Core', icon: Compass },
    { id: 'btn2', label: 'Quantum Node', icon: Cpu },
    { id: 'btn3', label: 'Launch Pad', icon: Sparkles },
  ];

  return (
    <div className="w-full max-w-xl flex flex-col items-center py-6">
      <div className="flex items-center gap-4">
        {buttons.map((btn) => {
          const Icon = btn.icon;
          const offset = offsets[btn.id] || { x: 0, y: 0 };
          return (
            <button
              key={btn.id}
              onMouseMove={(e) => handleMouseMove(btn.id, e)}
              onMouseLeave={() => handleMouseLeave(btn.id)}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: offset.x === 0 && offset.y === 0 ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.05s ease-out',
                borderColor: Math.abs(offset.x) > 0 ? settings.primaryColor : 'rgba(255, 255, 255, 0.15)',
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border bg-slate-900/80 shadow-xl text-xs font-semibold text-white hover:shadow-cyan-500/20"
            >
              <Icon className="w-4 h-4 text-cyan-400" />
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-6 font-mono">
        Hover over items — buttons physically gravitate toward pointer with spring inertia
      </span>
    </div>
  );
};

// 34. HOVER REVEAL MENU
export const HoverRevealMenuComponent: React.FC<EffectsProps> = ({ settings, variantId }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>('infra');

  return (
    <div className="w-full max-w-xl flex flex-col items-center py-4">
      <div className="w-full p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center justify-around border-b border-white/10 pb-3">
          {[
            { id: 'infra', label: 'Infrastructure' },
            { id: 'security', label: 'Zero-Trust' },
            { id: 'ai', label: 'Neural Mesh' },
          ].map((cat) => (
            <button
              key={cat.id}
              onMouseEnter={() => setHoveredNode(cat.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                hoveredNode === cat.id ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Revealed Sub-menu drawer panel */}
        <div className="pt-3 min-h-[90px] flex items-center justify-center">
          {hoveredNode === 'infra' && (
            <div className="grid grid-cols-2 gap-3 w-full animate-in fade-in slide-in-from-top-1 text-xs">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/40 cursor-pointer">
                <div className="font-semibold text-white">Kubernetes Pods</div>
                <div className="text-[10px] opacity-60">Manage container autoscaling</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/40 cursor-pointer">
                <div className="font-semibold text-white">Edge CDN Points</div>
                <div className="text-[10px] opacity-60">Global low-latency caching</div>
              </div>
            </div>
          )}

          {hoveredNode === 'security' && (
            <div className="grid grid-cols-2 gap-3 w-full animate-in fade-in slide-in-from-top-1 text-xs">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/40 cursor-pointer">
                <div className="font-semibold text-white">mTLS Certificates</div>
                <div className="text-[10px] opacity-60">Cryptographic identity rotation</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/40 cursor-pointer">
                <div className="font-semibold text-white">Audit Log Vault</div>
                <div className="text-[10px] opacity-60">Immutable telemetry recording</div>
              </div>
            </div>
          )}

          {hoveredNode === 'ai' && (
            <div className="grid grid-cols-2 gap-3 w-full animate-in fade-in slide-in-from-top-1 text-xs">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/40 cursor-pointer">
                <div className="font-semibold text-white">Neural Accelerators</div>
                <div className="text-[10px] opacity-60">TPU v5 cluster provisioning</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/40 cursor-pointer">
                <div className="font-semibold text-white">Vector Knowledge Base</div>
                <div className="text-[10px] opacity-60">RAG similarity indexing</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="text-[11px] opacity-50 mt-4 font-mono">
        Directional hover trigger reveals contextual sub-actions without click requirement
      </span>
    </div>
  );
};

// 35. COLLAPSIBLE SIDEBAR
export const CollapsibleSidebarComponent: React.FC<EffectsProps> = ({ settings, variantId }) => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { label: 'Overview', icon: Layout },
    { label: 'Telemetry', icon: Zap },
    { label: 'Security', icon: ShieldCheck },
    { label: 'Terminal', icon: Terminal },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex items-start gap-4">
        {/* Animated Collapsible Sidebar */}
        <aside 
          className={`h-72 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl transition-all duration-300 flex flex-col justify-between p-3 ${
            collapsed ? 'w-16' : 'w-56'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
              {!collapsed && <span className="font-bold text-xs">RAIL SYSTEM</span>}
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="p-1.5 rounded-lg hover:bg-white/10 mx-auto text-cyan-400"
                title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                <SidebarIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl text-xs transition-colors ${
                      i === 0 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 mx-auto" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-center">
            <span className="text-[10px] font-mono opacity-50">
              {collapsed ? 'v4' : 'NEXUS v4.8'}
            </span>
          </div>
        </aside>

        {/* Dummy content adjacent to sidebar */}
        <div className="w-64 h-72 rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-xs text-slate-400 flex flex-col justify-between">
          <div>
            <div className="font-semibold text-white mb-2">Simulated Workspace Content</div>
            <p className="text-[11px] leading-relaxed">
              Toggle the sidebar rail using the toggle icon or simulated Cmd+B to watch smooth width reflow.
            </p>
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-full py-1.5 rounded-lg text-xs bg-white/10 hover:bg-white/15 text-white"
          >
            {collapsed ? 'Expand Rail' : 'Collapse to Icons'}
          </button>
        </div>
      </div>
    </div>
  );
};

// 36. NEON GLOWING TAB
export const NeonGlowingTabComponent: React.FC<EffectsProps> = ({ settings, variantId }) => {
  const [activeTab, setActiveTab] = useState('Quantum Core');

  const tabs = ['Quantum Core', 'Neural Pods', 'Dark Matter', 'Hyperdrive'];

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6">
      <div 
        className="flex items-center gap-2 p-2 rounded-2xl border border-white/10 bg-slate-950 shadow-2xl"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive ? 'text-cyan-200' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}

              {isActive && (
                <>
                  {/* Neon Glow backdrop */}
                  <div 
                    className="absolute inset-0 rounded-xl -z-10 animate-pulse"
                    style={{
                      backgroundColor: `${settings.primaryColor}25`,
                      border: `1px solid ${settings.primaryColor}`,
                      boxShadow: `0 0 25px ${settings.primaryColor}80, inset 0 0 10px ${settings.primaryColor}40`,
                    }}
                  />
                  {/* Glowing floor underline */}
                  <div 
                    className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full"
                    style={{ 
                      backgroundColor: settings.primaryColor,
                      boxShadow: `0 0 12px ${settings.primaryColor}`
                    }}
                  />
                </>
              )}
            </button>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-4 font-mono">
        Atmospheric neon bloom emitting intense photon halo around active tab
      </span>
    </div>
  );
};
