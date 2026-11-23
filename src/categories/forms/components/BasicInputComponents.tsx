import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Search,
  Plus,
  Minus,
  Phone,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

// 1. Text Input Simulator
export const TextInputSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [val, setVal] = useState('Quantum Nexus');
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <label className="text-slate-300 font-semibold">COGNITIVE_NODE_LABEL</label>
        <span className="text-[10px] text-cyan-400">// REQUIRED</span>
      </div>

      <div className="relative">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => {
            sound.playHover();
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          placeholder="Enter node identifier..."
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: focused ? customizations.primaryColor : '#253745',
            borderWidth: `${customizations.borderWidth || 1}px`,
            boxShadow: focused ? `0 0 15px -3px ${customizations.primaryColor}60` : 'none',
            color: customizations.textColor || '#CCD0CF',
          }}
          className="w-full px-4 py-2.5 text-xs outline-none transition-all border font-mono placeholder:text-slate-600"
        />

        {val && (
          <button
            onClick={() => {
              sound.playBlip(1100);
              setVal('');
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <p className="text-[10px] font-mono text-slate-500">
        Active template: {variantId.toUpperCase()} • Monospace telemetry enabled
      </p>
    </div>
  );
};

// 2. Email Input Simulator
export const EmailInputSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [email, setEmail] = useState('operative@aurora.io');
  const isValid = email.includes('@') && email.includes('.');

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        COMMUNICATION_RELAY
      </label>

      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <Mail className="w-4 h-4" style={{ color: email ? customizations.primaryColor : undefined }} />
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@domain.com"
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: isValid ? customizations.primaryColor : '#253745',
            borderWidth: `${customizations.borderWidth || 1}px`,
            color: '#CCD0CF',
          }}
          className="w-full pl-10 pr-10 py-2.5 text-xs outline-none transition-all border font-mono"
        />

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {isValid ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-500/60" />
          )}
        </div>
      </div>

      <div className="flex justify-between text-[10px] font-mono">
        <span className={isValid ? 'text-emerald-400' : 'text-slate-500'}>
          {isValid ? 'VALID RECIPIENT ADDRESS' : 'INVALID SYNTAX'}
        </span>
        <span className="text-slate-500">SSL-256</span>
      </div>
    </div>
  );
};

// 3. Password Input Simulator
export const PasswordInputSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [pass, setPass] = useState('QuantumHyperion2026!');
  const [show, setShow] = useState(false);

  const getStrength = (p: string) => {
    let s = 0;
    if (p.length >= 8) s += 25;
    if (/[A-Z]/.test(p)) s += 25;
    if (/[0-9]/.test(p)) s += 25;
    if (/[^A-Za-z0-9]/.test(p)) s += 25;
    return s;
  };
  const strength = getStrength(pass);

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        ENCRYPTED_PASSPHRASE
      </label>

      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <Lock className="w-4 h-4" />
        </div>

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
          className="w-full pl-10 pr-10 py-2.5 text-xs outline-none transition-all border font-mono tracking-wider"
        />

        <button
          type="button"
          onClick={() => {
            sound.playHover();
            setShow(!show);
          }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-slate-400">ENTROPY STRENGTH</span>
          <span style={{ color: strength >= 75 ? '#10b981' : customizations.primaryColor }}>
            {strength}% SECURE
          </span>
        </div>
        <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${strength}%`,
              backgroundColor: strength >= 75 ? '#10b981' : customizations.primaryColor,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// 4. Search Input Simulator
export const SearchInputSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [query, setQuery] = useState('');

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <Search className="w-4 h-4" style={{ color: query ? customizations.primaryColor : undefined }} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query blueprints, telemetry, nodes..."
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: query ? customizations.primaryColor : '#253745',
            borderWidth: `${customizations.borderWidth || 1}px`,
            color: '#CCD0CF',
          }}
          className="w-full pl-10 pr-14 py-2.5 text-xs outline-none transition-all border font-mono"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-slate-400 border border-white/5">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>PRESS ENTER TO EXECUTE</span>
        <span className="text-cyan-400">FUZZY INDEX ONLINE</span>
      </div>
    </div>
  );
};

// 5. Number Input Simulator
export const NumberInputSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [val, setVal] = useState(144);

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        FREQUENCY_CLOCK_MHZ
      </label>

      <div 
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#06141BE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="flex items-center border overflow-hidden"
      >
        <button
          onClick={() => {
            sound.playBlip(1000);
            setVal((v) => Math.max(1, v - 10));
          }}
          className="p-3 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="flex-1 text-center font-mono font-bold text-sm text-white">
          <span>{val}</span>
          <span className="text-[10px] text-cyan-400 ml-1.5 font-normal">MHz</span>
        </div>

        <button
          onClick={() => {
            sound.playBlip(1300);
            setVal((v) => v + 10);
          }}
          className="p-3 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-between text-[10px] font-mono text-slate-500">
        <span>MIN: 10 MHz</span>
        <span>MAX: 999 MHz</span>
      </div>
    </div>
  );
};

// 6. Phone Input Simulator
export const PhoneInputSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [phone, setPhone] = useState('555-0199-420');

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        ORBITAL_COMMS_FREQUENCY
      </label>

      <div className="flex gap-2">
        <div 
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: '#253745',
            borderWidth: `${customizations.borderWidth || 1}px`,
          }}
          className="flex items-center px-3 border text-xs font-mono text-slate-300"
        >
          <span>🛰️ +1</span>
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              borderRadius: `${customizations.borderRadius}px`,
              backgroundColor: '#06141BE6',
              borderColor: `${customizations.primaryColor}50`,
              borderWidth: `${customizations.borderWidth || 1}px`,
              color: '#CCD0CF',
            }}
            className="w-full px-4 py-2.5 text-xs outline-none transition-all border font-mono"
          />
        </div>
      </div>
    </div>
  );
};

// 7. Textarea Simulator
export const TextareaSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [text, setText] = useState('Direct telemetry initialization payload for orbital sector 4.');

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <label className="text-slate-300 font-semibold">DIRECTIVE_MANIFEST</label>
        <span className="text-[10px] text-slate-500">{text.length} / 250 CHARS</span>
      </div>

      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type transmission manifest here..."
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#06141BE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          color: '#CCD0CF',
        }}
        className="w-full p-3 text-xs outline-none transition-all border font-mono resize-none leading-relaxed"
      />

      <div className="flex justify-between text-[10px] font-mono text-slate-500">
        <span>AUTO-PERSIST: ACTIVE</span>
        <span className="text-cyan-400">MARKDOWN SUPPORTED</span>
      </div>
    </div>
  );
};
