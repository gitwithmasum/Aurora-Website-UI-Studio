import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  HelpCircle,
  Info,
  ExternalLink,
  ShieldCheck,
  X,
  Maximize2,
  Download,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

// 8. Popover Simulator
export const PopoverOverlaySimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-4 text-center">
      <button
        onClick={() => {
          sound.playBlip(1200);
          setOpen(!open);
        }}
        className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-black mb-3"
        style={{ backgroundColor: customizations.primaryColor }}
      >
        {open ? 'DISMISS POPOVER' : 'TRIGGER POPOVER'}
      </button>

      {open && (
        <div
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#11212DF8',
            borderColor: `${customizations.primaryColor}50`,
            borderWidth: `${customizations.borderWidth || 1}px`,
            boxShadow: `0 15px 35px -5px ${customizations.primaryColor}30`,
          }}
          className="relative text-left p-4 border mt-2"
        >
          {/* Arrow Pointer */}
          <div 
            className="w-3 h-3 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2 border-t border-l"
            style={{
              backgroundColor: '#11212D',
              borderColor: `${customizations.primaryColor}50`,
            }}
          />

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white font-mono">Quantum Synapse</span>
            <span className="text-[10px] text-cyan-400 font-mono">v4.2</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Contextual details linked dynamically to trigger beacon with auto arrow placement.
          </p>
        </div>
      )}
    </div>
  );
};

// 9. Tooltip Simulator
export const TooltipOverlaySimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hovered, setHovered] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-8 text-center flex flex-col items-center">
      <div
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-block cursor-help"
      >
        <div className="px-4 py-2.5 rounded-xl bg-[#06141B] border border-white/10 text-xs font-mono text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Hover Over Sensor Node</span>
        </div>

        {hovered && (
          <div
            style={{
              borderRadius: `${Math.max(4, customizations.borderRadius / 2)}px`,
              backgroundColor: '#06141BF8',
              borderColor: customizations.primaryColor,
              borderWidth: '1px',
              boxShadow: `0 0 15px -3px ${customizations.primaryColor}60`,
            }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-[10px] font-mono whitespace-nowrap text-cyan-300 border z-30"
          >
            <span>SUB-ATOMIC HARMONIC: 1.482 THz</span>
            <div 
              className="w-2 h-2 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#06141B] border-r border-b"
              style={{ borderColor: customizations.primaryColor }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// 10. Hover Popup Simulator
export const HoverPopupSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
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
        className="p-4 border"
      >
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-black"
            style={{ backgroundColor: customizations.primaryColor }}
          >
            OP
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Operative Lyra</h4>
            <span className="text-[10px] font-mono text-emerald-400">● LIVE STATUS</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-300 leading-snug mb-3">
          Senior Quantum Telemetry Engineer overseeing orbital communications in sector 7.
        </p>

        <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-white/5">
          <span className="text-slate-500">CLEARANCE: LVL 5</span>
          <span className="text-cyan-400 font-bold">142 MISSIONS</span>
        </div>
      </div>
    </div>
  );
};

// 15. Contextual Popup Simulator
export const ContextualPopupSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
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
        className="p-2 border space-y-0.5 text-xs font-mono"
      >
        {[
          { label: 'Inspect Component Nodes', hotkey: '⌘I' },
          { label: 'Export React Architecture', hotkey: '⌘E' },
          { label: 'Duplicate Pipeline Spec', hotkey: '⌘D' },
          { label: 'Terminate Session Loop', hotkey: 'DEL' },
        ].map((act, idx) => (
          <div
            key={idx}
            onClick={() => sound.playConfirm()}
            className="px-3 py-2 rounded-lg hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>{act.label}</span>
            <span className="text-[10px] text-slate-500">{act.hotkey}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 11. Lightbox Simulator
export const LightboxOverlaySimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#06141BF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border"
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3 text-xs font-mono text-slate-400">
          <span>CINEMA LIGHTBOX // 01 of 08</span>
          <Maximize2 className="w-4 h-4 text-cyan-400" />
        </div>

        <div className="h-32 rounded-xl bg-gradient-to-tr from-cyan-950 via-[#11212D] to-indigo-950 flex items-center justify-center border border-white/10 mb-3">
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Resolution: 3840 x 2160 (4K)</span>
          <span className="text-cyan-400">DOWNLOAD ⬇</span>
        </div>
      </div>
    </div>
  );
};

// 12. Image Preview Modal Simulator
export const ImagePreviewModalSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
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
        className="p-4 border"
      >
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-white">
          <span className="font-bold">Holographic Schematic Preview</span>
          <Download className="w-4 h-4 text-cyan-400 cursor-pointer" />
        </div>

        <div className="h-32 rounded-lg bg-black/60 border border-white/5 flex items-center justify-center mb-3">
          <span className="text-xs font-mono text-cyan-400">[RENDER: ORBITAL_POD.GLTF]</span>
        </div>

        <p className="text-[11px] text-slate-400">
          WebGL mesh compiled with 48k polygons and custom PBR shaders.
        </p>
      </div>
    </div>
  );
};

// 16. Cookie Consent Popup Simulator
export const CookieConsentPopupSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border"
      >
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold text-white font-mono">TELEMETRY PRIVACY PROTOCOL</h4>
        </div>
        <p className="text-[11px] text-slate-300 leading-snug mb-4">
          We utilize essential telemetry beacons to maintain sub-millisecond synchronization across orbital edge nodes.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playConfirm();
              setAccepted(true);
            }}
            className="flex-1 py-1.5 rounded-lg text-xs font-mono font-bold text-black"
            style={{ backgroundColor: customizations.primaryColor }}
          >
            {accepted ? 'ACCEPTED' : 'ACCEPT ALL'}
          </button>
          <button
            onClick={() => sound.playHover()}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white border border-white/10"
          >
            MANAGE
          </button>
        </div>
      </div>
    </div>
  );
};

// 17. Exit Intent Popup Simulator
export const ExitIntentPopupSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: '#f59e0b80',
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border text-center"
      >
        <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-white mb-1 font-mono">
          ABORTING SESSION INTERCEPT
        </h3>
        <p className="text-xs text-slate-300 mb-4">
          Operative clearance will be cached for 15 minutes before quantum termination.
        </p>

        <button
          onClick={() => sound.playConfirm()}
          className="w-full py-2 rounded-xl text-xs font-mono font-bold text-black"
          style={{ backgroundColor: customizations.primaryColor }}
        >
          RESUME ACTIVE SESSION
        </button>
      </div>
    </div>
  );
};
