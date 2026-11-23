import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  X,
  RotateCcw,
  Wifi,
  Activity,
  Layers,
  Sparkles,
  Radio,
  Clock,
  ArrowRight,
  Inbox,
} from 'lucide-react';

export const ToastNotificationSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => {
          sound.playConfirm();
          setVisible(true);
        }}
        className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-black"
        style={{ backgroundColor: customizations.primaryColor }}
      >
        [TRIGGER TOAST BEACON]
      </button>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 15px 35px -5px ${customizations.primaryColor}30`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-4 select-none"
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: '#06141B',
              borderColor: `${customizations.primaryColor}50`,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: customizations.primaryColor }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <h4 className="text-xs font-bold text-white font-mono">Neural Cache Synchronized</h4>
              <button
                onClick={() => {
                  sound.playHover();
                  setVisible(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug mb-3">
              1,420 state changes distributed across 42 orbital availability zones.
            </p>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="text-cyan-400 font-bold">DISPATCH #882</span>
              <span>JUST NOW</span>
            </div>
          </div>
        </div>

        {/* Decay timer progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
          <div
            className="h-full bg-cyan-400 animate-pulse"
            style={{ width: '65%', backgroundColor: customizations.primaryColor }}
          />
        </div>
      </div>
    </div>
  );
};

export const SnackbarSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [undone, setUndone] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#06141BF8',
          borderColor: `${customizations.primaryColor}60`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 10px 25px -5px ${customizations.primaryColor}40`,
        }}
        className="p-3 px-4 border flex items-center justify-between font-mono text-xs"
      >
        <span className="text-slate-300">
          {undone ? 'Action reversed.' : 'Node #842 archived to cold vault.'}
        </span>

        <button
          onClick={() => {
            sound.playConfirm();
            setUndone(!undone);
          }}
          className="text-cyan-400 font-bold hover:underline ml-3 shrink-0 flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{undone ? 'REDO' : 'UNDO'}</span>
        </button>
      </div>
    </div>
  );
};

export const SuccessMessageSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#061f18',
          borderColor: '#10b981',
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: '0 0 20px -5px rgba(16, 185, 129, 0.4)',
        }}
        className="p-4 border flex items-center gap-3 font-mono text-xs select-none"
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <div className="flex-1">
          <div className="font-bold text-emerald-300">Transaction Confirmed</div>
          <div className="text-[10px] text-emerald-400/80">Payload block #0x82f...a1 verified on chain.</div>
        </div>
      </div>
    </div>
  );
};

export const ErrorMessageSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#1f0d11',
          borderColor: '#ef4444',
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: '0 0 20px -5px rgba(239, 68, 68, 0.4)',
        }}
        className="p-4 border flex items-center gap-3 font-mono text-xs select-none"
      >
        <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
        <div className="flex-1">
          <div className="font-bold text-rose-300">Checksum Validation Failed</div>
          <div className="text-[10px] text-rose-400/80">Parity signature mismatch in sector 4. Transmission aborted.</div>
        </div>
      </div>
    </div>
  );
};

export const WarningMessageSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#241a06',
          borderColor: '#f59e0b',
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: '0 0 20px -5px rgba(245, 158, 11, 0.4)',
        }}
        className="p-4 border flex items-center gap-3 font-mono text-xs select-none"
      >
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        <div className="flex-1">
          <div className="font-bold text-amber-300">High Thermal Variance</div>
          <div className="text-[10px] text-amber-400/80">Quantum core running at 92% capacity. Throttling active.</div>
        </div>
      </div>
    </div>
  );
};

export const InfoMessageSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#0a1926',
          borderColor: customizations.primaryColor,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 0 20px -5px ${customizations.primaryColor}50`,
        }}
        className="p-4 border flex items-center gap-3 font-mono text-xs select-none"
      >
        <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        <div className="flex-1">
          <div className="font-bold text-cyan-300">Maintenance Window Scheduled</div>
          <div className="text-[10px] text-slate-300">Relay update at 04:00 UTC. Zero downtime anticipated.</div>
        </div>
      </div>
    </div>
  );
};

export const NotificationBadgeSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [count, setCount] = useState(5);

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none space-y-4">
      <div className="relative inline-block">
        <div className="w-12 h-12 rounded-2xl bg-[#11212D] border border-white/10 flex items-center justify-center text-slate-300">
          <Bell className="w-6 h-6" />
        </div>

        {count > 0 && (
          <span 
            className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-black border border-white/20 animate-pulse"
            style={{
              backgroundColor: customizations.primaryColor,
              boxShadow: `0 0 10px ${customizations.primaryColor}`,
            }}
          >
            {count}
          </span>
        )}
      </div>

      <div>
        <button
          onClick={() => {
            sound.playBlip(1200);
            setCount((c) => (c > 0 ? c - 1 : 5));
          }}
          className="text-xs font-mono text-cyan-400 hover:underline"
        >
          [DECREMENT BADGE: {count} UNREAD]
        </button>
      </div>
    </div>
  );
};

export const NotificationCenterSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [activeTab, setActiveTab] = useState<'all' | 'system'>('all');

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border space-y-3 font-mono text-xs"
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="font-bold text-white uppercase flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>ACTIVITY FEED</span>
          </span>
          <span className="text-[10px] text-cyan-400 font-bold">3 UNREAD</span>
        </div>

        <div className="space-y-1.5">
          {[
            { title: 'Perimeter Breached (Simulated)', time: '2m ago', level: 'warning' },
            { title: 'Core Firmware Patch 2.4.1', time: '14m ago', level: 'info' },
            { title: 'Orbital Sync Complete', time: '1h ago', level: 'success' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-[#06141B] border border-white/5 flex items-center justify-between hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  item.level === 'warning' ? 'bg-amber-400' : item.level === 'info' ? 'bg-cyan-400' : 'bg-emerald-400'
                }`} />
                <span className="text-slate-200">{item.title}</span>
              </div>
              <span className="text-[10px] text-slate-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NotificationDropdownSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-2 font-mono text-xs"
      >
        <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-white/10 pb-2">
          <span>NOTIFICATIONS (QUICK FLYOUT)</span>
          <span className="text-cyan-400 cursor-pointer hover:underline">MARK ALL READ</span>
        </div>

        <div className="p-2 rounded bg-[#06141B] text-slate-300">
          <div className="font-bold text-white mb-0.5">Quantum Key Rotated</div>
          <p className="text-[10px] text-slate-400">Master session key successfully re-seeded.</p>
        </div>
      </div>
    </div>
  );
};

export const AlertBannerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}60`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-3 px-4 border flex items-center justify-between text-xs font-mono select-none"
      >
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-white font-bold">SYSTEM BROADCAST:</span>
          <span className="text-slate-300">Sector 7 telemetry online.</span>
        </div>
        <button className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
};

export const InlineFeedbackSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-1.5 font-mono text-xs">
      <label className="text-slate-300 font-bold block">OPERATIVE_HANDLE</label>
      <input
        type="text"
        readOnly
        value="aurora_commander"
        className="w-full px-3 py-2 rounded-xl bg-[#06141B] border border-emerald-500/50 text-white outline-none"
      />
      <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Handle available and reserved in primary ledger.</span>
      </div>
    </div>
  );
};

export const StatusIndicatorSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center gap-3 font-mono text-xs">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11212D] border border-emerald-500/40 text-emerald-400 shadow-glow-emerald">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold">ALL SYSTEMS NOMINAL</span>
      </div>
    </div>
  );
};

export const PulseIndicatorSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-8 flex flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        <div 
          className="w-16 h-16 rounded-full border absolute animate-ping opacity-75"
          style={{ borderColor: customizations.primaryColor }}
        />
        <div 
          className="w-10 h-10 rounded-full border absolute animate-pulse opacity-90"
          style={{ borderColor: customizations.primaryColor }}
        />
        <div 
          className="w-4 h-4 rounded-full shadow-glow-cyan"
          style={{ backgroundColor: customizations.primaryColor }}
        />
      </div>
      <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">
        RADIAL HARMONIC FLUX
      </span>
    </div>
  );
};

export const LiveActivityIndicatorSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center">
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-rose-500/50 text-rose-400 font-mono text-xs shadow-lg">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        <span className="font-bold">REC // LIVE TELEMETRY</span>
        <span className="text-[10px] text-slate-400 ml-1">00:14:22</span>
      </div>
    </div>
  );
};

export const ConnectionStatusSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center font-mono text-xs">
      <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#11212D] border border-cyan-500/40 text-white">
        <Wifi className="w-4 h-4 text-cyan-400" />
        <div>
          <div className="font-bold">UPLINK CONNECTED</div>
          <div className="text-[10px] text-cyan-400">14 MS PING // 0% LOSS</div>
        </div>
      </div>
    </div>
  );
};

export const EmptyStateMessageSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none font-mono">
      <Inbox className="w-10 h-10 text-slate-500 mx-auto mb-3" />
      <h3 className="text-sm font-bold text-white mb-1">NO TELEMETRY DISPATCHES</h3>
      <p className="text-xs text-slate-400 mb-4">
        Zero active packets found in queue. All channels clear.
      </p>
      <button
        onClick={() => sound.playConfirm()}
        className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black"
        style={{ backgroundColor: customizations.primaryColor }}
      >
        REFRESH DISPATCH QUEUE
      </button>
    </div>
  );
};
