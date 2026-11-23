import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  X,
  ChevronUp,
  Search,
  Command,
  Sliders,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

// 6. Bottom Sheet Simulator
export const BottomSheetSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 -10px 30px -5px ${customizations.primaryColor}30`,
        }}
        className="p-5 border"
      >
        {/* Grab Handle */}
        <div 
          onClick={() => {
            sound.playHover();
            setExpanded(!expanded);
          }}
          className="w-12 h-1.5 rounded-full bg-slate-500 mx-auto mb-4 cursor-pointer hover:bg-cyan-400 transition-colors" 
        />

        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-white font-mono uppercase">
            QUICK DOCK TELEMETRY
          </h4>
          <span className="text-[10px] font-mono text-cyan-400">SNAP: 50%</span>
        </div>

        {expanded ? (
          <div className="space-y-2 mb-4 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-[#06141B] border border-white/5 flex items-center justify-between text-slate-300">
              <span>Orbital Trajectory</span>
              <span className="text-cyan-400 font-bold">28,000 KM/H</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#06141B] border border-white/5 flex items-center justify-between text-slate-300">
              <span>Coolant Temperature</span>
              <span className="text-emerald-400 font-bold">NOMINAL</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 mb-2">Tap handle to expand full telemetry dock.</p>
        )}

        <button
          onClick={() => sound.playConfirm()}
          className="w-full py-2 rounded-xl text-xs font-mono font-bold text-black"
          style={{ backgroundColor: customizations.primaryColor }}
        >
          EXECUTE PROTOCOL
        </button>
      </div>
    </div>
  );
};

// 7. Side Drawer Simulator
export const SideDrawerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `10px 0 30px -5px ${customizations.primaryColor}30`,
        }}
        className="p-5 border"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white font-mono uppercase">OFF-CANVAS FLANK</span>
          </div>
          <button
            onClick={() => {
              sound.playHover();
              setOpen(!open);
            }}
            className="p-1 rounded hover:bg-white/10 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5 mb-5 text-xs font-mono">
          {['Diagnostics Console', 'Security Matrix', 'Sensor Arrays', 'Neural Sync Engine'].map((item, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-[#06141B] hover:bg-white/5 border border-white/5 cursor-pointer text-slate-300 hover:text-white transition-colors"
            >
              // {item}
            </div>
          ))}
        </div>

        <div className="text-[10px] font-mono text-slate-500 text-center">
          DOCK: RIGHT_FLANK // SNAP POINT 380PX
        </div>
      </div>
    </div>
  );
};

// 14. Command Palette Simulator
export const CommandPaletteOverlaySimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [query, setQuery] = useState('');

  const commands = [
    { title: 'Re-sync Neural Grid', cat: 'Navigation' },
    { title: 'Purge Telemetry Buffer', cat: 'System' },
    { title: 'Export Figma Tokens', cat: 'Developer' },
    { title: 'Switch Flagship Theme', cat: 'Aesthetics' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}60`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 20px 45px -10px ${customizations.primaryColor}40`,
        }}
        className="p-4 border"
      >
        <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-3">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to..."
            className="w-full bg-transparent text-xs text-white outline-none font-mono placeholder:text-slate-500"
          />
          <kbd className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-slate-400">
            ESC
          </kbd>
        </div>

        <div className="space-y-1 text-xs font-mono">
          {commands.map((cmd, idx) => (
            <div
              key={idx}
              onClick={() => sound.playConfirm()}
              className="p-2 rounded-lg hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>{cmd.title}</span>
              <span className="text-[10px] text-slate-500 font-normal">{cmd.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
