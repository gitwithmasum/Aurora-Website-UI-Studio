import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  X,
  AlertTriangle,
  ShieldAlert,
  Lock,
  UserPlus,
  Maximize2,
  Minimize2,
  Check,
  ArrowRight,
  Fingerprint,
} from 'lucide-react';

// 1. Modal Dialog Simulator
export const ModalDialogSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <div className="text-center p-6">
        <button
          onClick={() => {
            sound.playConfirm();
            setOpen(true);
          }}
          className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-black"
          style={{ backgroundColor: customizations.primaryColor }}
        >
          [OPEN MODAL DIALOG]
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}60`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 25px 50px -12px ${customizations.primaryColor}40`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-6 select-none"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              ORBITAL MATRIX PROTOCOL
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playHover();
              setOpen(false);
            }}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Reconfiguring quantum relay routing will synchronize 42 orbital nodes. Telemetry buffers will flush automatically upon confirmation.
        </p>

        <div className="p-3 rounded-xl bg-[#06141B] border border-white/5 mb-6 text-xs font-mono text-slate-400">
          <div className="flex justify-between mb-1">
            <span>CLUSTER: HYPERION-7</span>
            <span className="text-cyan-400">READY</span>
          </div>
          <div className="flex justify-between">
            <span>PACKET TIMEOUT:</span>
            <span className="text-white">120 ms</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={() => {
              sound.playHover();
              setOpen(false);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5"
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              sound.playConfirm();
              setOpen(false);
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-black"
            style={{ backgroundColor: customizations.primaryColor }}
          >
            CONFIRM SYNC
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Confirmation Modal Simulator
export const ConfirmationModalSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: '#ef444480',
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: '0 20px 45px -10px rgba(239, 68, 68, 0.35)',
        }}
        className="relative overflow-hidden border p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Purge System Cache?</h3>
            <p className="text-xs text-rose-400 font-mono">CRITICAL_ACTION // IRREVERSIBLE</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          This will purge all local offline models, cached telemetry buffers, and ephemeral token sessions. You will need to re-authenticate with the neural core.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={() => sound.playHover()}
            className="px-3.5 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
          >
            ABORT
          </button>
          <button
            onClick={() => {
              sound.playConfirm();
              setConfirmed(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/40"
          >
            {confirmed ? 'PURGED' : 'PROCEED PURGE'}
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Alert Dialog Simulator
export const AlertDialogSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-md mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: '#f59e0b80',
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: '0 20px 40px -10px rgba(245, 158, 11, 0.3)',
        }}
        className="relative overflow-hidden border p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Atmospheric Flux Warning</h3>
            <p className="text-xs text-amber-400 font-mono">TELEMETRY DEVIATION // SECTOR 9</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          Quantum interference detected on primary comms array. Latency spike expected to exceed 450ms for the next 12 minutes.
        </p>

        <button
          onClick={() => sound.playConfirm()}
          className="w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-black"
        >
          ACKNOWLEDGE & MONITOR
        </button>
      </div>
    </div>
  );
};

// 4. Login Modal Simulator
export const LoginModalSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [email, setEmail] = useState('operative@aurora.dev');

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}60`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: `0 25px 50px -10px ${customizations.primaryColor}40`,
        }}
        className="relative overflow-hidden border p-6"
      >
        <div className="text-center mb-6">
          <div 
            className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center border mb-3"
            style={{
              backgroundColor: '#06141B',
              borderColor: `${customizations.primaryColor}60`,
            }}
          >
            <Fingerprint className="w-6 h-6" style={{ color: customizations.primaryColor }} />
          </div>
          <h3 className="text-base font-extrabold text-white">Operative Sign In</h3>
          <p className="text-xs text-slate-400 mt-0.5">Biometric Neural Authentication</p>
        </div>

        <div className="space-y-3 mb-6">
          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1">OPERATIVE_ID</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#06141B] border border-white/10 text-xs text-white font-mono outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1">PASSPHRASE</label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full px-3.5 py-2 rounded-xl bg-[#06141B] border border-white/10 text-xs text-white font-mono outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <button
          onClick={() => sound.playConfirm()}
          className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-black mb-3"
          style={{ backgroundColor: customizations.primaryColor }}
        >
          AUTHENTICATE SESSION
        </button>

        <div className="text-center text-[11px] text-slate-500 font-mono">
          Forgot cipher key? Contact Station Admin
        </div>
      </div>
    </div>
  );
};

// 5. Signup Modal Simulator
export const SignupModalSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
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
        className="relative overflow-hidden border p-6"
      >
        <div className="text-center mb-5">
          <div 
            className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center border mb-2 text-cyan-400"
            style={{
              backgroundColor: '#06141B',
              borderColor: `${customizations.primaryColor}60`,
            }}
          >
            <UserPlus className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Join Aurora Network</h3>
          <p className="text-[11px] text-slate-400">Commission new operative clearance</p>
        </div>

        <div className="space-y-3 mb-5">
          <input
            type="text"
            placeholder="Agent Full Name"
            className="w-full px-3.5 py-2 rounded-xl bg-[#06141B] border border-white/10 text-xs text-white font-mono outline-none focus:border-cyan-400"
          />
          <input
            type="email"
            placeholder="Comms Email"
            className="w-full px-3.5 py-2 rounded-xl bg-[#06141B] border border-white/10 text-xs text-white font-mono outline-none focus:border-cyan-400"
          />
          <input
            type="password"
            placeholder="Set Master Password"
            className="w-full px-3.5 py-2 rounded-xl bg-[#06141B] border border-white/10 text-xs text-white font-mono outline-none focus:border-cyan-400"
          />
        </div>

        <button
          onClick={() => sound.playConfirm()}
          className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-black"
          style={{ backgroundColor: customizations.primaryColor }}
        >
          COMMISSION AGENT
        </button>
      </div>
    </div>
  );
};

// 13. Fullscreen Overlay Simulator
export const FullscreenOverlaySimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [active, setActive] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1 text-center">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF0',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-6 border"
      >
        <Maximize2 className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
        <h3 className="text-sm font-bold text-white mb-1">Mission Control Overlay</h3>
        <p className="text-xs text-slate-400 mb-5">
          Engage full-screen immersive HUD curtain with live matrix indicators.
        </p>

        <button
          onClick={() => {
            sound.playConfirm();
            setActive(!active);
          }}
          className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-black"
          style={{ backgroundColor: customizations.primaryColor }}
        >
          {active ? 'DISENGAGE OVERLAY' : 'ENGAGE FULLSCREEN HUD'}
        </button>

        {active && (
          <div className="mt-4 p-3 rounded-lg bg-black/60 border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
            [IMMERSIVE VIEWPORT ACTIVE // ESC TO EXIT]
          </div>
        )}
      </div>
    </div>
  );
};
