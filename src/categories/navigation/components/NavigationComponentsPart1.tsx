import React, { useState } from 'react';
import { 
  Home, 
  Layers, 
  Cpu, 
  Terminal, 
  Settings, 
  Folder, 
  Database, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  Compass, 
  Menu, 
  X, 
  Sparkles, 
  Zap, 
  Plus, 
  Bookmark, 
  Activity, 
  Globe, 
  Key, 
  Users, 
  ArrowRight,
  Code2,
  FileCode,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { CustomizationSettings } from '../../../types/studio';
import { getComponentStyles, getInteractionStateClasses } from '../../../utils/styleHelper';
import { sound } from '../../../utils/soundEngine';

interface NavProps {
  settings: CustomizationSettings;
  variantId: string;
}

// 9. NAVBAR
export const NavbarComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeItem, setActiveItem] = useState('Workspace');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [launched, setLaunched] = useState(false);
  const styles = getComponentStyles(settings);
  const stateClass = getInteractionStateClasses(settings.activeState);

  const navItems = ['Workspace', 'Pipelines', 'Analytics', 'Integrations', 'Documentation'];

  return (
    <div className={`w-full max-w-4xl relative ${stateClass}`}>
      <nav 
        className="flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 border border-white/15 bg-[#070b1a]/80 backdrop-blur-3xl shadow-[0_10px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] relative z-20 overflow-hidden"
      >
        {/* Cosmic Galaxy Atmosphere & Top Specular Hairline */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.2)_0%,_rgba(6,182,212,0.1)_50%,_transparent_80%)] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

        {/* Brand identity */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div 
            className="w-8 h-8 rounded-[12px] flex items-center justify-center font-bold text-xs p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.4)]"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)' }}
          >
            <div className="w-full h-full rounded-[11px] bg-[#070b1a]/70 backdrop-blur-md flex items-center justify-center text-white">
              <Compass className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <span className="font-extrabold text-sm tracking-wide text-white font-sans">STRATA // GALAXY</span>
        </div>

        {/* Desktop Links: iOS-Style Floating Glass Segmented Control */}
        <div className="hidden md:flex items-center gap-1 bg-black/35 p-1 rounded-full border border-white/10 shadow-inner backdrop-blur-xl relative z-10">
          {navItems.map((item) => {
            const isActive = activeItem === item;
            return (
              <button
                key={item}
                onClick={() => {
                  sound.playBlip(1200);
                  setActiveItem(item);
                }}
                className={`px-3.5 py-1 rounded-full text-xs transition-all font-sans ${
                  isActive 
                    ? 'bg-white/20 text-white font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] backdrop-blur-md' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Action Button: iOS Glass Capsule */}
        <div className="hidden md:flex items-center gap-3 relative z-10">
          <button 
            onClick={() => {
              sound.playConfirm();
              setLaunched(!launched);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-md transition-all hover:scale-105 active:scale-95 ${
              launched 
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]'
            }`}
          >
            {launched ? 'CORE ACTIVE ✓' : 'Launch Core'}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => {
            sound.playHover();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white relative z-10"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 rounded-[24px] bg-[#070b1a]/95 border border-white/15 shadow-2xl backdrop-blur-3xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  sound.playBlip(1200);
                  setActiveItem(item);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 rounded-full text-xs font-medium ${
                  activeItem === item 
                    ? 'bg-white/15 text-white font-semibold shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              sound.playConfirm();
              setLaunched(!launched);
            }}
            className={`w-full mt-3 py-2 rounded-full text-xs font-semibold text-white shadow-md transition-all ${
              launched 
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500'
            }`}
          >
            {launched ? 'CORE ACTIVE ✓' : 'Launch Core'}
          </button>
        </div>
      )}
    </div>
  );
};

// 10. SIDEBAR NAVIGATION
export const SidebarNavigationComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [clustersOpen, setClustersOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  if (variantId === 'icon-rail') {
    return (
      <div className="w-full flex justify-center py-4 relative">
        <aside className="w-16 rounded-[28px] bg-[#070b1a]/85 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] p-3 flex flex-col items-center justify-between h-96 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.2)_0%,_transparent_70%)] pointer-events-none" />
          
          <div className="flex flex-col items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-[14px] p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)' }}>
              <div className="w-full h-full rounded-[13px] bg-[#070b1a]/80 flex items-center justify-center text-cyan-300">
                <Cpu className="w-5 h-5" />
              </div>
            </div>

            <div className="w-8 h-[1px] bg-white/10 my-1" />

            {[
              { id: 'overview', icon: Home, label: 'Overview' },
              { id: 'clusters', icon: Database, label: 'Clusters' },
              { id: 'pipelines', icon: Layers, label: 'Pipelines' },
              { id: 'security', icon: ShieldCheck, label: 'Security' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playBlip(1200);
                    setActiveTab(item.id);
                  }}
                  title={item.label}
                  className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-[0_0_12px_rgba(6,182,212,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-cyan-400/50' 
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          <div className="relative z-10">
            <button 
              onClick={() => {
                sound.playBlip(1300);
                setUserOpen(!userOpen);
              }}
              title="Jane Doe (Lead Architect)"
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              JD
            </button>
          </div>
        </aside>

        {/* Icon Rail User Popover */}
        {userOpen && (
          <div className="absolute left-1/2 ml-10 bottom-6 w-52 p-3 rounded-2xl bg-[#070b1a]/95 border border-white/20 shadow-2xl backdrop-blur-2xl z-50 text-xs animate-in fade-in zoom-in-95">
            <div className="font-bold text-white">Jane Doe</div>
            <div className="text-[10px] text-cyan-400 font-mono">Lead Galaxy Architect</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              STATUS: ONLINE
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs flex justify-center relative">
      <aside 
        className="w-72 rounded-[28px] bg-[#070b1a]/85 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col p-4 transition-all relative overflow-hidden"
      >
        {/* Cosmic Galaxy Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.2)_0%,_rgba(168,85,247,0.12)_40%,_transparent_75%)] pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-purple-600/15 blur-2xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

        {/* Workspace Brand: iOS Squircle Icon & Title */}
        <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-[13px] p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)' }}
            >
              <div className="w-full h-full rounded-[12px] bg-[#070b1a]/70 backdrop-blur-md flex items-center justify-center text-white">
                <Cpu className="w-4 h-4 text-cyan-300" />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-xs text-white font-sans tracking-wide">SYNAPSE GALAXY</div>
              <div className="text-[10px] text-cyan-300/80 font-mono">Enterprise iOS Core</div>
            </div>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 font-mono border border-white/15 font-bold">
            PRO
          </span>
        </div>

        {/* Navigation Tree: iOS-Style Rounded Pills */}
        <div className="flex-1 space-y-1.5 text-xs relative z-10">
          <button 
            onClick={() => {
              sound.playBlip(1200);
              setActiveTab('overview');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[14px] transition-all ${
              activeTab === 'overview' 
                ? 'bg-white/15 text-white font-semibold backdrop-blur-md border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] ring-1 ring-cyan-400/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Overview</span>
            </div>
            {activeTab === 'overview' && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
            )}
          </button>

          {/* Accordion Group */}
          <div className="space-y-1">
            <button 
              onClick={() => {
                sound.playHover();
                setClustersOpen(!clustersOpen);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[14px] text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-purple-400" />
                <span>Galaxy Clusters</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform text-slate-400 ${clustersOpen ? 'rotate-180' : ''}`} />
            </button>

            {clustersOpen && (
              <div className="pl-6 pr-1 py-1 space-y-1 border-l border-white/10 ml-3">
                {[
                  { id: 'us-east-edge', name: 'US-East Nebula 01', count: 18 },
                  { id: 'eu-central', name: 'EU-Frankfurt Pulsar', count: 6 },
                  { id: 'ap-tokyo', name: 'AP-Tokyo Orbital', count: 42 },
                ].map((node) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      sound.playBlip(1200);
                      setActiveTab(node.id);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-full text-[11px] transition-all ${
                      activeTab === node.id 
                        ? 'bg-white/20 text-white font-semibold shadow-sm' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{node.name}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">{node.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              sound.playBlip(1200);
              setActiveTab('pipelines');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[14px] transition-all ${
              activeTab === 'pipelines' 
                ? 'bg-white/15 text-white font-semibold backdrop-blur-md border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] ring-1 ring-cyan-400/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Pipelines</span>
            </div>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-500/25 text-cyan-300 font-mono font-bold">3</span>
          </button>

          <button 
            onClick={() => {
              sound.playBlip(1200);
              setActiveTab('security');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[14px] transition-all ${
              activeTab === 'security' 
                ? 'bg-white/15 text-white font-semibold backdrop-blur-md border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] ring-1 ring-cyan-400/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security Vault</span>
            </div>
          </button>

          <button 
            onClick={() => {
              sound.playBlip(1200);
              setActiveTab('terminal');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[14px] transition-all ${
              activeTab === 'terminal' 
                ? 'bg-white/15 text-white font-semibold backdrop-blur-md border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] ring-1 ring-cyan-400/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Galaxy Shell</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          </button>
        </div>

        {/* Pinned User Footer: iOS Rounded Glass User Card */}
        <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
          <button 
            onClick={() => {
              sound.playBlip(1300);
              setUserOpen(!userOpen);
              setSettingsOpen(false);
            }}
            className="flex items-center gap-2.5 text-left p-1 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
              JD
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-xs text-white">Jane Doe</div>
              <div className="text-[10px] text-cyan-300/80">Galaxy Architect</div>
            </div>
          </button>
          <button 
            onClick={() => {
              sound.playHover();
              setSettingsOpen(!settingsOpen);
              setUserOpen(false);
            }}
            className={`p-1.5 rounded-full transition-colors ${
              settingsOpen ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
            title="Cluster Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Settings Card */}
        {settingsOpen && (
          <div className="absolute bottom-16 right-4 left-4 p-3 rounded-2xl bg-[#070b1a]/95 border border-cyan-400/40 shadow-2xl backdrop-blur-3xl z-50 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-cyan-300">Cluster Settings</span>
              <button onClick={() => setSettingsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-2 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between py-1 text-slate-300">
                <span>Autonomous Scaling</span>
                <span className="text-emerald-400 font-mono font-bold">ENABLED</span>
              </div>
              <div className="flex items-center justify-between py-1 text-slate-300">
                <span>Quantum Enclave</span>
                <span className="text-cyan-400 font-mono font-bold">L3 SECURE</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive User Profile Card */}
        {userOpen && (
          <div className="absolute bottom-16 left-4 right-4 p-3.5 rounded-2xl bg-[#070b1a]/95 border border-indigo-400/40 shadow-2xl backdrop-blur-3xl z-50 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white">Operator Session</span>
              <button onClick={() => setUserOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-2 space-y-1 text-[11px]">
              <div className="text-white font-medium">Jane Doe // UID: 0x98A1</div>
              <div className="text-slate-400 text-[10px]">jane.doe@nexus.synapse</div>
              <div className="text-emerald-400 font-mono text-[10px] mt-1">● Biometric Lock: Active</div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

// 11. BOTTOM NAVIGATION BAR
export const BottomNavigationBarComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeItem, setActiveItem] = useState('home');
  const [createOpen, setCreateOpen] = useState(false);
  const styles = getComponentStyles(settings);

  const items = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'create', label: 'Create', icon: Plus, isAction: true },
    { id: 'bookmarks', label: 'Saved', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: Users },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center relative">
      <div 
        style={styles.container}
        className="w-full border rounded-2xl shadow-2xl flex items-center justify-around py-2 px-3 backdrop-blur-xl"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playScan();
                  setCreateOpen(!createOpen);
                }}
                title="Create Quick Action"
                className="relative -top-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 hover:scale-105"
                style={{ 
                  backgroundColor: settings.primaryColor,
                  color: '#000',
                  boxShadow: `0 0 20px ${settings.primaryColor}80`
                }}
              >
                <Plus className={`w-6 h-6 stroke-[2.5] transition-transform ${createOpen ? 'rotate-45' : ''}`} />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playBlip(1200);
                setActiveItem(item.id);
                setCreateOpen(false);
              }}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'scale-105' : 'opacity-60 hover:opacity-90'
              }`}
            >
              <div 
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Action Sheet */}
      {createOpen && (
        <div className="absolute bottom-20 w-64 p-3 rounded-2xl bg-[#070b1a]/95 border border-cyan-400/50 shadow-2xl backdrop-blur-3xl z-50 text-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 pb-1.5 border-b border-white/10 mb-2">
            Instant Deployment
          </div>
          <div className="space-y-1">
            {['Deploy Quantum Node', 'Generate Security Token', 'Initialize Pipeline'].map((action) => (
              <button
                key={action}
                onClick={() => {
                  sound.playConfirm();
                  setCreateOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      <span className="text-[11px] opacity-50 mt-3 font-mono">Mobile viewport dock with elevated action trigger</span>
    </div>
  );
};

// 12. FLOATING NAVIGATION
export const FloatingNavigationComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [active, setActive] = useState('Dashboard');
  const styles = getComponentStyles(settings);

  const pills = ['Dashboard', 'Telemetry', 'Deploy', 'Logs', 'Vault'];

  return (
    <div className="w-full max-w-xl flex flex-col items-center py-4">
      <div 
        style={styles.container}
        className="flex items-center gap-1.5 p-1.5 rounded-full border shadow-2xl backdrop-blur-2xl"
      >
        {pills.map((p) => {
          const isActive = active === p;
          return (
            <button
              key={p}
              onClick={() => {
                sound.playBlip(1200);
                setActive(p);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                isActive 
                  ? 'text-black font-semibold shadow-md' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              style={isActive ? {
                backgroundColor: settings.primaryColor,
                boxShadow: `0 0 16px ${settings.primaryColor}60`
              } : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>
      <span className="text-[11px] opacity-50 mt-4 font-mono">Independent floating capsule island</span>
    </div>
  );
};

// 13. GLASS NAVIGATION BAR
export const GlassNavigationBarComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [activeTab, setActiveTab] = useState('Design');
  const [inspected, setInspected] = useState(false);

  return (
    <div className="w-full max-w-3xl relative p-6 rounded-2xl bg-cyberpunk-mesh border border-white/10 shadow-2xl overflow-hidden">
      <div 
        className="w-full px-6 py-3.5 rounded-2xl flex items-center justify-between border border-white/20 shadow-glass backdrop-blur-2xl transition-all"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-white drop-shadow">PRISM GLASS</span>
        </div>

        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/10">
          {['Design', 'Motion', 'Tokens', 'Components'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                sound.playBlip(1200);
                setActiveTab(tab);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-white/20 text-white font-semibold backdrop-blur-sm shadow' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button 
          onClick={() => {
            sound.playConfirm();
            setInspected(!inspected);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            inspected 
              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
              : 'border border-white/25 hover:border-cyan-400 bg-white/10 text-white backdrop-blur-md'
          }`}
        >
          {inspected ? 'NODE 0x9F ACTIVE ✓' : 'Inspect Node'}
        </button>
      </div>
    </div>
  );
};

// 14. MEGA MENU
export const MegaMenuComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full max-w-4xl relative">
      {/* Trigger Bar */}
      <div 
        style={styles.container}
        className="w-full flex items-center justify-between border rounded-xl shadow-lg py-3 px-6 mb-3"
      >
        <div className="flex items-center gap-6">
          <span className="font-bold text-sm tracking-wide">ENTERPRISE CLOUD</span>
          <div className="flex items-center gap-4 text-xs font-medium">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              <span>Platform Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <span className="opacity-70 hover:opacity-100 cursor-pointer">Pricing</span>
            <span className="opacity-70 hover:opacity-100 cursor-pointer">Security</span>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/20"
        >
          {isOpen ? 'Close Mega Menu' : 'Open Mega Menu'}
        </button>
      </div>

      {/* Expanded Mega Menu Panel */}
      {isOpen && (
        <div 
          className="w-full p-6 rounded-2xl border border-white/15 bg-slate-900/95 backdrop-blur-2xl shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95"
        >
          {/* Column 1: Compute & AI */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Compute & Neural Engine</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="text-xs font-semibold text-white">Quantum Pods v4</div>
                <div className="text-[11px] opacity-60">Sub-millisecond serverless compute clusters.</div>
              </div>
              <div className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="text-xs font-semibold text-white">Neural Inference Mesh</div>
                <div className="text-[11px] opacity-60">Edge model deployment with 128 TPU endpoints.</div>
              </div>
            </div>
          </div>

          {/* Column 2: Storage & Realtime */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-2">
              <Database className="w-3.5 h-3.5" />
              <span>Storage & State</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="text-xs font-semibold text-white">Atomic State Database</div>
                <div className="text-[11px] opacity-60">Globally synchronized CRDT data fabric.</div>
              </div>
              <div className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="text-xs font-semibold text-white">Telemetry Lake</div>
                <div className="text-[11px] opacity-60">Petabyte-scale analytical event queries.</div>
              </div>
            </div>
          </div>

          {/* Column 3: Featured Release */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                NEW RELEASE
              </span>
              <h4 className="text-sm font-bold text-white mt-2">Zero-Trust Mesh 2.0</h4>
              <p className="text-xs opacity-70 mt-1">
                WireGuard-accelerated encrypted tunnels connecting cross-cloud multi-region environments.
              </p>
            </div>
            <a 
              href="#learn" 
              onClick={(e) => e.preventDefault()}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              Explore Whitepaper <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// 15. DROPDOWN MENU
export const DropdownMenuComponent: React.FC<NavProps> = ({ settings, variantId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const styles = getComponentStyles(settings);

  const actions = [
    { id: 'fork', label: 'Fork Repository', shortcut: '⌘F', icon: FileCode },
    { id: 'settings', label: 'Engine Settings', shortcut: '⌘,', icon: Sliders },
    { id: 'export', label: 'Export Artifact', shortcut: '⇧⌘E', icon: ExternalLink },
    { id: 'delete', label: 'Purge Cluster', shortcut: '⌫', icon: X, danger: true },
  ];

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-2 mb-3 shadow"
      >
        <span>Cluster Options</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          style={styles.container}
          className="w-64 border rounded-xl shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95"
        >
          <div className="px-2 py-1 text-[10px] font-mono uppercase opacity-50 tracking-wider">
            Workspace Actions
          </div>
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={() => {
                  setSelectedAction(act.label);
                  setTimeout(() => setSelectedAction(null), 1500);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  act.danger 
                    ? 'text-rose-400 hover:bg-rose-500/20' 
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  <span>{act.label}</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono opacity-60">
                  {act.shortcut}
                </kbd>
              </button>
            );
          })}
        </div>
      )}

      {selectedAction && (
        <div className="mt-3 text-xs text-cyan-400 font-mono animate-pulse">
          Executed: {selectedAction}
        </div>
      )}
    </div>
  );
};
