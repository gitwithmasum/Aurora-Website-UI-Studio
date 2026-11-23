import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  Link2,
  Globe,
  Check,
} from 'lucide-react';

// 21. Floating Label Input Simulator
export const FloatingLabelInputSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [val, setVal] = useState('Sector 7 Operative');
  const [focused, setFocused] = useState(false);

  const isFloating = focused || val.length > 0;

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div className="relative pt-3">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => {
            sound.playHover();
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: focused ? customizations.primaryColor : '#253745',
            borderWidth: `${customizations.borderWidth || 1}px`,
            boxShadow: focused ? `0 0 15px -3px ${customizations.primaryColor}60` : 'none',
            color: '#CCD0CF',
          }}
          className="w-full px-4 py-3 text-xs outline-none transition-all border font-mono"
        />

        {/* Floating Label */}
        <label
          className={`absolute left-3 transition-all duration-200 pointer-events-none font-mono ${
            isFloating
              ? '-top-0.5 text-[10px] px-1.5 rounded font-bold'
              : 'top-6 text-xs text-slate-500'
          }`}
          style={{
            backgroundColor: isFloating ? '#06141B' : 'transparent',
            color: isFloating ? customizations.primaryColor : undefined,
          }}
        >
          OPERATIONAL_HANDLE
        </label>
      </div>
    </div>
  );
};

// 22. Input with Icon Simulator
export const InputWithIconSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [url, setUrl] = useState('https://aurora.studio/quantum-api');

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        GATEWAY_ENDPOINT_URL
      </label>

      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <Globe className="w-4 h-4 text-cyan-400" />
        </div>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: `${customizations.primaryColor}50`,
            borderWidth: `${customizations.borderWidth || 1}px`,
            color: '#CCD0CF',
          }}
          className="w-full pl-10 pr-10 py-2.5 text-xs outline-none transition-all border font-mono"
        />

        <button
          onClick={() => {
            sound.playConfirm();
            navigator.clipboard?.writeText(url);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
          title="Copy URL"
        >
          <Link2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// 23. Password Visibility Toggle Simulator
export const PasswordVisibilityToggleSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [show, setShow] = useState(false);
  const [pass, setPass] = useState('Vortex_88_Cipher');

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        CIPHER_KEY
      </label>

      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: `${customizations.primaryColor}50`,
            borderWidth: `${customizations.borderWidth || 1}px`,
            color: '#CCD0CF',
          }}
          className="w-full px-4 pr-12 py-2.5 text-xs outline-none transition-all border font-mono tracking-widest"
        />

        <button
          onClick={() => {
            sound.playHover();
            setShow(!show);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-cyan-400 hover:text-cyan-300"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <div className="text-[10px] font-mono text-slate-500">
        Click eye to decrypt glyphs into plaintext.
      </div>
    </div>
  );
};

// 24. Form Validation Simulator
export const FormValidationSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [text, setText] = useState('Cyber2026!');

  const hasLength = text.length >= 8;
  const hasUpper = /[A-Z]/.test(text);
  const hasSymbol = /[^A-Za-z0-9]/.test(text);

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-3">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        COMPLIANCE_INPUT_VALIDATION
      </label>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#06141BE6',
          borderColor: hasLength && hasUpper && hasSymbol ? '#10b981' : '#f59e0b',
          borderWidth: `${customizations.borderWidth || 1}px`,
          color: '#CCD0CF',
        }}
        className="w-full px-4 py-2.5 text-xs outline-none transition-all border font-mono"
      />

      {/* Rules checklist */}
      <div className="space-y-1.5 text-xs font-mono">
        {[
          { label: 'Minimum 8 characters', met: hasLength },
          { label: 'Uppercase letter [A-Z]', met: hasUpper },
          { label: 'Special character symbol', met: hasSymbol },
        ].map((rule, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className={`w-3.5 h-3.5 rounded flex items-center justify-center ${
                rule.met ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-600'
              }`}
            >
              {rule.met ? <Check className="w-2.5 h-2.5" /> : '•'}
            </div>
            <span className={rule.met ? 'text-slate-200' : 'text-slate-500'}>
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 25. Input Error State Simulator
export const InputErrorStateSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [shake, setShake] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-rose-400 font-semibold">
        PARITY_CHECK_FAILED
      </label>

      <div className="relative">
        <input
          type="text"
          readOnly
          value="ERR_CHECKSUM_MISMATCH"
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#1f0d11',
            borderColor: '#ef4444',
            borderWidth: `${customizations.borderWidth || 1}px`,
            boxShadow: '0 0 15px -3px rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
          }}
          className={`w-full px-4 py-2.5 text-xs outline-none border font-mono ${
            shake ? 'animate-bounce' : ''
          }`}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500">
          <AlertOctagon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-400">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
        <span>Payload signature verification failed. Key revoked.</span>
      </div>
    </div>
  );
};

// 26. Input Success State Simulator
export const InputSuccessStateSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-emerald-400 font-semibold">
        CRYPTOGRAPHIC_HASH_VERIFIED
      </label>

      <div className="relative">
        <input
          type="text"
          readOnly
          value="SHA256: 0x9b42...e81c [OK]"
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#061f18',
            borderColor: '#10b981',
            borderWidth: `${customizations.borderWidth || 1}px`,
            boxShadow: '0 0 15px -3px rgba(16, 185, 129, 0.4)',
            color: '#6ee7b7',
          }}
          className="w-full px-4 py-2.5 text-xs outline-none border font-mono"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
        <Check className="w-3.5 h-3.5 shrink-0" />
        <span>Consensus reached across all validator nodes.</span>
      </div>
    </div>
  );
};
