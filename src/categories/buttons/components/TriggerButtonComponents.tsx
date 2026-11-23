import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import { 
  Plus, 
  Settings, 
  ChevronDown, 
  Check, 
  Loader2, 
  Power, 
  Share2, 
  Copy, 
  Zap, 
  Trash2, 
  Edit3, 
  ChevronUp,
  Cpu,
  Bookmark,
  Bell
} from 'lucide-react';

interface ButtonProps {
  variantId: string;
}

// 8. Icon Button Simulator
export const IconButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [clicked, setClicked] = useState(false);
  const [activeIcon, setActiveIcon] = useState('settings');

  const handleClick = (name: string) => {
    sound.playConfirm();
    setActiveIcon(name);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const isCircle = variantId === 'circular-beacon';
  const isHex = variantId === 'floating-hex';

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <div className="flex items-center gap-3">
        {[
          { id: 'settings', icon: Settings },
          { id: 'bell', icon: Bell },
          { id: 'zap', icon: Zap },
          { id: 'bookmark', icon: Bookmark },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = activeIcon === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`p-3 relative flex items-center justify-center transition-all cursor-pointer ${
                isCircle ? 'rounded-full' : isHex ? 'cyber-chamfer' : 'rounded-xl'
              } ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
              style={{
                backgroundColor: isSelected ? `${customizations.primaryColor}25` : 'rgba(255,255,255,0.05)',
                color: isSelected ? customizations.primaryColor : customizations.textColor,
                border: `1px solid ${isSelected ? customizations.primaryColor : 'rgba(255,255,255,0.1)'}`,
                boxShadow: isSelected ? `0 0 15px -2px ${customizations.primaryColor}60` : 'none',
              }}
            >
              <Icon className="w-4 h-4" />
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute top-1 right-1 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · SELECT ICON NODE TO INSPECT FOCUS STATE
      </span>
    </div>
  );
};

// 9. Floating Action Button (FAB) Simulator
export const FabButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    sound.playConfirm();
    setIsOpen(!isOpen);
  };

  const isExtended = variantId === 'extended-fab';

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 min-h-[220px]">
      <div className="relative flex flex-col items-center">
        {/* Expandable Speed-Dial Actions */}
        {isOpen && (
          <div className="flex flex-col items-center gap-2.5 mb-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
            {[
              { label: 'Edit Node', icon: Edit3 },
              { label: 'Share Link', icon: Share2 },
              { label: 'Clear Cache', icon: Trash2 },
            ].map((act, i) => {
              const Icon = act.icon;
              return (
                <button
                  key={i}
                  onClick={() => {
                    sound.playBlip(1600);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs shadow-lg hover:bg-cyan-950 transition-all cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono">{act.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Floating Trigger */}
        <button
          onClick={toggleOpen}
          className={`flex items-center justify-center gap-2 text-white shadow-2xl transition-all duration-300 cursor-pointer ${
            isExtended ? 'px-6 py-3 rounded-full' : 'w-13 h-13 rounded-full'
          } ${isOpen ? 'rotate-45' : ''}`}
          style={{
            backgroundColor: customizations.primaryColor,
            color: '#06141B',
            boxShadow: `0 10px 30px -5px ${customizations.primaryColor}80`,
          }}
        >
          <Plus className="w-5 h-5 font-bold" />
          {isExtended && !isOpen && (
            <span className="text-xs font-bold tracking-wide">NEW ACTION</span>
          )}
        </button>
      </div>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · CLICK TO TOGGLE RADIAL SPEED-DIAL
      </span>
    </div>
  );
};

// 10. Split Button Simulator
export const SplitButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusText, setStatusText] = useState('Publish Release');

  const handlePrimaryClick = () => {
    sound.playConfirm();
    setStatusText('Published!');
    setTimeout(() => setStatusText('Publish Release'), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 relative">
      <div className="relative inline-flex items-center rounded-xl overflow-visible border border-cyan-500/30 bg-[#0B151F] shadow-lg">
        {/* Primary Action Section */}
        <button
          onClick={handlePrimaryClick}
          className="px-4 py-2.5 text-xs font-semibold text-white hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>{statusText}</span>
        </button>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-white/10" />

        {/* Dropdown Chevron Trigger */}
        <button
          onClick={() => {
            sound.playBlip(1200);
            setDropdownOpen(!dropdownOpen);
          }}
          className="px-2.5 py-2.5 hover:bg-cyan-500/20 transition-colors text-slate-300 hover:text-white"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Popover */}
        {dropdownOpen && (
          <div className="absolute left-0 top-12 w-48 p-1 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-2xl z-40 animate-in fade-in zoom-in-95">
            {[
              'Publish Release',
              'Save as Draft',
              'Schedule Broadcast',
              'Export Quantum Spec'
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  sound.playScan();
                  setStatusText(opt);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · DUAL DISPATCH CONTROL INTERFACE
      </span>
    </div>
  );
};

// 11. Dropdown Button Simulator
export const DropdownButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Deployment Stage: Production');

  const options = [
    'Deployment Stage: Production',
    'Deployment Stage: Staging-01',
    'Deployment Stage: Edge Alpha',
    'Deployment Stage: Isolated Lab',
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 relative">
      <div className="relative">
        <button
          onClick={() => {
            sound.playBlip(1300);
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-all shadow-md cursor-pointer"
          style={{
            borderColor: isOpen ? customizations.primaryColor : 'rgba(255,255,255,0.1)',
            boxShadow: isOpen ? `0 0 15px -3px ${customizations.primaryColor}50` : 'none',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{selectedItem}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-11 w-64 p-1.5 rounded-xl bg-slate-900 border border-white/15 shadow-2xl z-40 animate-in fade-in zoom-in-95">
            {options.map((opt) => {
              const isSelected = selectedItem === opt;
              return (
                <button
                  key={opt}
                  onClick={() => {
                    sound.playConfirm();
                    setSelectedItem(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · SELECTIVE MENU CONTAINER
      </span>
    </div>
  );
};

// 12. Toggle Button Simulator
export const ToggleButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isOn, setIsOn] = useState(true);

  const handleToggle = () => {
    sound.playBlip(isOn ? 900 : 1600);
    setIsOn(!isOn);
  };

  const isPower = variantId === 'power-node';
  const isSegment = variantId === 'dual-pill-segment';

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      {isPower ? (
        <button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg"
          style={{
            backgroundColor: isOn ? `${customizations.primaryColor}20` : 'rgba(255,255,255,0.05)',
            border: `2px solid ${isOn ? customizations.primaryColor : 'rgba(255,255,255,0.2)'}`,
            boxShadow: isOn ? `0 0 25px -2px ${customizations.primaryColor}80` : 'none',
          }}
        >
          <Power className={`w-6 h-6 transition-colors ${isOn ? 'text-cyan-400' : 'text-slate-500'}`} />
        </button>
      ) : isSegment ? (
        <div className="flex items-center p-1 rounded-full bg-black/60 border border-white/10">
          <button
            onClick={() => { sound.playBlip(1200); setIsOn(true); }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              isOn ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan' : 'text-slate-500'
            }`}
          >
            ONLINE
          </button>
          <button
            onClick={() => { sound.playBlip(1000); setIsOn(false); }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              !isOn ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40 shadow-md' : 'text-slate-500'
            }`}
          >
            STANDBY
          </button>
        </div>
      ) : (
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border transition-all cursor-pointer ${
            isOn ? 'border-cyan-400 bg-cyan-950/40 shadow-glow-cyan text-cyan-300' : 'border-white/10 bg-white/5 text-slate-400'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOn ? 'bg-cyan-400 shadow-glow-cyan animate-pulse' : 'bg-slate-600'}`} />
          <span className="text-xs font-mono font-bold">{isOn ? 'STATE: ARMED' : 'STATE: DISARMED'}</span>
        </button>
      )}

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · CLICK TO TOGGLE STATE REACTION
      </span>
    </div>
  );
};

// 13. Loading Button Simulator
export const LoadingButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const triggerLoad = () => {
    if (loading || success) return;
    sound.playScan();
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setLoading(false);
          setSuccess(true);
          sound.playConfirm();
          setTimeout(() => setSuccess(false), 2500);
          return 100;
        }
        return p + 20;
      });
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={triggerLoad}
        disabled={loading}
        className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-white border border-cyan-500/40 transition-all cursor-pointer shadow-md min-w-[160px]"
        style={{
          backgroundColor: success ? 'rgba(16, 185, 129, 0.2)' : `${customizations.primaryColor}20`,
          borderColor: success ? '#10b981' : customizations.primaryColor,
        }}
      >
        {/* Progress track overlay */}
        {variantId === 'progress-track' && loading && (
          <span 
            className="absolute left-0 top-0 bottom-0 bg-cyan-500/30 transition-all duration-300 pointer-events-none"
            style={{ width: `${progress}%` }}
          />
        )}

        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span className="font-mono text-cyan-300">
              {variantId === 'progress-track' ? `${progress}% SYNCHING` : 'PROCESSING...'}
            </span>
          </>
        ) : success ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold">COMPLETED!</span>
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>DISPATCH PACKET</span>
          </>
        )}
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · CLICK TO SIMULATE ASYNC COMPILATION
      </span>
    </div>
  );
};

// 14. Expand / Collapse Button Simulator
export const ExpandCollapseButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    sound.playHover();
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4 w-full max-w-sm">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white transition-all cursor-pointer"
      >
        <span className="font-medium">System Telemetry Log</span>
        <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono">
          <span>{expanded ? 'COLLAPSE' : 'EXPAND'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Expanded Drawer Panel */}
      {expanded && (
        <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-[11px] font-mono text-slate-300 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between text-slate-400">
            <span>PACKET STATUS:</span>
            <span className="text-emerald-400">NORMAL_OK</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>BANDWIDTH:</span>
            <span className="text-cyan-300">12.4 GB/S</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>LATENCY:</span>
            <span className="text-cyan-300">0.82 MS</span>
          </div>
        </div>
      )}

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · INTERACTIVE DISCLOSURE TRIGGER
      </span>
    </div>
  );
};
