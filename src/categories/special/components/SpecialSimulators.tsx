import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import {
  Terminal,
  Shield,
  Zap,
  Activity,
  Crosshair,
  Radio,
  Send,
  Code,
  CheckCircle,
  Plus,
  Compass,
  Cpu,
} from 'lucide-react';
import { sound } from '../../../utils/soundEngine';

export const CyberpunkHUDSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [shieldLevel, setShieldLevel] = useState(94);
  const [radarLocked, setRadarLocked] = useState(false);
  const [alertMode, setAlertMode] = useState(false);

  const toggleRadar = () => {
    sound.playConfirm();
    setRadarLocked(!radarLocked);
  };

  const toggleAlert = () => {
    sound.playBlip();
    setAlertMode(!alertMode);
  };

  return (
    <div
      className="p-6 font-mono select-none w-full max-w-2xl relative overflow-hidden backdrop-blur-md transition-colors duration-500"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: alertMode ? '#1A0B10F5' : `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: alertMode ? '#FF3366' : `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
        boxShadow: alertMode ? '0 0 30px rgba(255, 51, 102, 0.25)' : 'none',
      }}
    >
      {/* HUD Header Bar with Chamfered Corners */}
      <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
        <div className="flex items-center gap-2">
          <Crosshair className={`w-4 h-4 ${alertMode ? 'text-red-400 animate-spin' : 'text-cyan-400'}`} />
          <span className="text-xs font-bold text-white tracking-widest uppercase">
            {alertMode ? 'ALERT: ANOMALY DETECTED' : 'CYBERPUNK HUD COCKPIT'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAlert}
            className={`text-[9px] px-2 py-0.5 rounded border transition-colors ${alertMode ? 'border-red-400 bg-red-950/60 text-red-300' : 'border-slate-700 text-slate-400 hover:text-white'}`}
          >
            {alertMode ? 'DISARM ALERT' : 'TEST ALERT'}
          </button>
          <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
            {variantId.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main HUD Display: Radar + Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Radar Viewport */}
        <div
          onClick={toggleRadar}
          className="relative h-56 rounded-xl border border-cyan-500/30 bg-slate-950 flex items-center justify-center cursor-pointer overflow-hidden group shadow-inner"
        >
          {/* Concentric Radar Rings */}
          <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20 pointer-events-none" />
          <div className="absolute w-28 h-28 rounded-full border border-cyan-500/30 pointer-events-none" />
          <div className="absolute w-12 h-12 rounded-full border border-cyan-500/40 pointer-events-none" />

          {/* Crosshairs */}
          <div className="absolute inset-x-0 h-px bg-cyan-500/30 pointer-events-none" />
          <div className="absolute inset-y-0 w-px bg-cyan-500/30 pointer-events-none" />

          {/* Sweeper Beam */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none animate-spin origin-center" style={{ animationDuration: '4s' }} />

          {/* Target Blip */}
          <div
            className={`absolute w-3 h-3 rounded-full border-2 transition-all ${radarLocked ? 'border-red-400 bg-red-500 shadow-lg shadow-red-500/80 scale-125' : 'border-cyan-400 bg-cyan-500/60 shadow-lg shadow-cyan-400/60'}`}
            style={{ top: '35%', left: '60%' }}
          />

          <div className="absolute bottom-2 left-3 text-[9px] text-cyan-400/80">
            RADAR: {radarLocked ? 'TARGET ACQUIRED [LOCKED]' : 'SEARCHING SPECTRUM...'}
          </div>
        </div>

        {/* Telemetry Readouts */}
        <div className="space-y-3 flex flex-col justify-between">
          {/* Shield Gauge */}
          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-cyan-400" /> SHIELD INTEGRITY</span>
              <span className="text-cyan-400 font-bold">{shieldLevel}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500"
                style={{ width: `${shieldLevel}%` }}
              />
            </div>
          </div>

          {/* Reactor Biomarkers */}
          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Sub-System Avionics</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-[10px] text-slate-500">VELOCITY</div>
                <div className="font-bold text-white">Mach 4.2</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">CORE FREQ</div>
                <div className="font-bold text-white">4.8 GHz</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">QUANTUM LINK</div>
                <div className="font-bold text-emerald-400">ONLINE</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">THERMALS</div>
                <div className="font-bold text-cyan-300">38&deg;C NORMAL</div>
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <button
            onClick={() => {
              sound.playConfirm();
              setShieldLevel(prev => (prev < 90 ? 100 : 72));
            }}
            className="w-full py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>CYCLE DEFLECTOR CHARGE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const TerminalShellSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [cmd, setCmd] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'AURORA_OS v2.4.0 (x86_64-pc-aurora-matrix)' },
    { type: 'sys', text: 'Type "help" or "status" or "deploy" for live diagnostics.' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmd.trim()) return;

    sound.playConfirm();
    const input = cmd.trim().toLowerCase();
    const newItems = [{ type: 'user', text: `$ ${cmd}` }];

    if (input === 'help') {
      newItems.push({ type: 'res', text: 'Available commands: help, status, deploy, clear, matrix' });
    } else if (input === 'status') {
      newItems.push({ type: 'res', text: 'NODES: 307 LIVE · CLUSTERS: 16 · HEALTH: 100% NOMINAL' });
    } else if (input === 'deploy') {
      newItems.push({ type: 'res', text: 'BUILDING COMPONENT PAYLOAD... DEPLOYED TO EDGE IN 14ms.' });
    } else if (input === 'clear') {
      setHistory([]);
      setCmd('');
      return;
    } else {
      newItems.push({ type: 'res', text: `Command not recognized: "${cmd}". Type "help" for catalog.` });
    }

    setHistory(prev => [...prev, ...newItems]);
    setCmd('');
  };

  return (
    <div
      className="p-5 font-mono select-none w-full max-w-xl rounded-xl border border-slate-700 bg-slate-950 text-slate-200 shadow-2xl relative overflow-hidden"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
      }}
    >
      {/* Top Window Bezel */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-slate-400 font-bold text-[11px]">aurora@terminal:~</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
          {variantId.toUpperCase()}
        </span>
      </div>

      {/* Terminal History */}
      <div className="my-3 space-y-1 text-xs max-h-48 overflow-y-auto">
        {history.map((h, i) => (
          <div
            key={i}
            className={`${h.type === 'user' ? 'text-cyan-300 font-bold' : h.type === 'sys' ? 'text-slate-400' : 'text-emerald-400'}`}
          >
            {h.text}
          </div>
        ))}
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-800">
        <span className="text-cyan-400 font-bold text-xs">&gt;</span>
        <input
          type="text"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-slate-600"
        />
        <button type="submit" className="text-cyan-400 hover:text-white">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
