import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  ChevronDown,
  Check,
  X,
  Search,
  Sliders,
  Sparkles,
} from 'lucide-react';

// 8. Select Dropdown Simulator
export const SelectDropdownSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Quantum Hyperion Engine');

  const options = [
    'Quantum Hyperion Engine',
    'Sub-atomic Relay Matrix',
    'Tachyon Field Modulator',
    'Zero-G Cryo Compressor',
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        ACTIVE_PROPULSION_CORE
      </label>

      <div className="relative">
        <button
          onClick={() => {
            sound.playHover();
            setIsOpen(!isOpen);
          }}
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: isOpen ? customizations.primaryColor : '#253745',
            borderWidth: `${customizations.borderWidth || 1}px`,
            boxShadow: isOpen ? `0 0 15px -3px ${customizations.primaryColor}50` : 'none',
          }}
          className="w-full px-4 py-2.5 text-xs border flex items-center justify-between text-left text-white font-mono transition-all"
        >
          <span className="truncate">{selected}</span>
          <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            style={{
              borderRadius: `${customizations.borderRadius}px`,
              backgroundColor: '#11212DF8',
              borderColor: `${customizations.primaryColor}60`,
              boxShadow: `0 15px 30px -8px ${customizations.primaryColor}50`,
            }}
            className="absolute top-full left-0 right-0 mt-2 p-1 border z-30 space-y-0.5 backdrop-blur-md"
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  sound.playConfirm();
                  setSelected(opt);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-mono cursor-pointer flex items-center justify-between transition-colors ${
                  selected === opt
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{opt}</span>
                {selected === opt && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 9. Multi Select Simulator
export const MultiSelectSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [selected, setSelected] = useState<string[]>(['TypeScript', 'Rust WASM']);

  const allTags = ['TypeScript', 'Rust WASM', 'Tailwind', 'GraphQL', 'Next.js'];

  const toggleTag = (t: string) => {
    sound.playBlip(1200);
    if (selected.includes(t)) {
      setSelected(selected.filter((item) => item !== t));
    } else {
      setSelected([...selected, t]);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        SUBSYSTEM_CAPABILITIES
      </label>

      {/* Selected Tags Box */}
      <div 
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#06141BE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-2 border flex flex-wrap gap-1.5 min-h-[44px] items-center"
      >
        {selected.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold"
            style={{
              backgroundColor: `${customizations.primaryColor}25`,
              color: customizations.primaryColor,
              border: `1px solid ${customizations.primaryColor}50`,
            }}
          >
            <span>{tag}</span>
            <X 
              className="w-3 h-3 cursor-pointer hover:text-white" 
              onClick={() => toggleTag(tag)}
            />
          </span>
        ))}
        {selected.length === 0 && (
          <span className="text-xs text-slate-500 font-mono pl-2">Select capabilities below...</span>
        )}
      </div>

      {/* Tag Pool */}
      <div className="flex flex-wrap gap-1 pt-1">
        {allTags.map((t) => {
          const isSel = selected.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${
                isSel
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              + {t}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 10. Checkbox Simulator
export const CheckboxSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [checked, setChecked] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        onClick={() => {
          sound.playConfirm();
          setChecked(!checked);
        }}
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: checked ? customizations.primaryColor : '#253745',
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border flex items-start gap-3 cursor-pointer select-none transition-all group"
      >
        <div 
          className="w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all mt-0.5"
          style={{
            backgroundColor: checked ? customizations.primaryColor : '#06141B',
            borderColor: checked ? customizations.primaryColor : '#4A5C6A',
            boxShadow: checked ? `0 0 10px ${customizations.primaryColor}` : 'none',
          }}
        >
          {checked && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
        </div>

        <div>
          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
            Enable Neural Overdrive Mesh
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
            Allows subatomic packets to route through adjacent peer nodes during peak bandwidth surges.
          </p>
        </div>
      </div>
    </div>
  );
};

// 11. Radio Button Simulator
export const RadioButtonSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [tier, setTier] = useState<'standard' | 'quantum'>('quantum');

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold mb-2">
        EXECUTION_ENVIRONMENT
      </label>

      {[
        { id: 'standard', title: 'Sub-orbital Sandbox', desc: 'Isolated test environment with standard compute.' },
        { id: 'quantum', title: 'Orbital Mainnet Core', desc: 'Live production node with zero latency SLA.' },
      ].map((opt) => {
        const isSel = tier === opt.id;
        return (
          <div
            key={opt.id}
            onClick={() => {
              sound.playConfirm();
              setTier(opt.id as any);
            }}
            style={{
              borderRadius: `${customizations.borderRadius}px`,
              backgroundColor: isSel ? '#11212DF5' : '#06141BE6',
              borderColor: isSel ? customizations.primaryColor : '#253745',
              borderWidth: `${customizations.borderWidth || 1}px`,
            }}
            className="p-3 border flex items-center gap-3 cursor-pointer select-none transition-all"
          >
            <div 
              className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
              style={{
                borderColor: isSel ? customizations.primaryColor : '#4A5C6A',
                boxShadow: isSel ? `0 0 8px ${customizations.primaryColor}` : 'none',
              }}
            >
              {isSel && (
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: customizations.primaryColor }}
                />
              )}
            </div>

            <div>
              <div className="text-xs font-bold text-white">{opt.title}</div>
              <div className="text-[10px] text-slate-400">{opt.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 12. Toggle Switch Simulator
export const ToggleSwitchSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [active, setActive] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div 
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: '#253745',
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border flex items-center justify-between select-none"
      >
        <div>
          <h4 className="text-xs font-bold text-white">Atmospheric Bloom</h4>
          <p className="text-[11px] text-slate-400">Post-process HDR volumetric lighting</p>
        </div>

        <button
          onClick={() => {
            sound.playBlip(1300);
            setActive(!active);
          }}
          className="relative w-12 h-6 rounded-full transition-colors duration-300 p-0.5 border"
          style={{
            backgroundColor: active ? customizations.primaryColor : '#06141B',
            borderColor: active ? customizations.primaryColor : '#4A5C6A',
            boxShadow: active ? `0 0 15px -2px ${customizations.primaryColor}80` : 'none',
          }}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
              active ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

// 13. Range Slider Simulator
export const RangeSliderSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [value, setValue] = useState(72);

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-3">
      <div className="flex justify-between text-xs font-mono">
        <label className="text-slate-300 font-semibold">PARTICLE_DENSITY_FLUX</label>
        <span style={{ color: customizations.primaryColor }} className="font-bold">{value}%</span>
      </div>

      <div className="relative flex items-center py-2">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
          className="w-full h-1.5 bg-black/60 rounded-full appearance-none cursor-pointer accent-cyan-400"
          style={{
            accentColor: customizations.primaryColor,
          }}
        />
      </div>

      <div className="flex justify-between text-[10px] font-mono text-slate-500">
        <span>0.0 TERAFLOPS</span>
        <span>50.0 TF</span>
        <span>100.0 TF (PEAK)</span>
      </div>
    </div>
  );
};

// 20. Searchable Select Simulator
export const SearchableSelectSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('US-East (Virginia)');
  const [isOpen, setIsOpen] = useState(false);

  const zones = [
    'US-East (Virginia)',
    'US-West (Oregon)',
    'EU-Central (Frankfurt)',
    'AP-South (Tokyo)',
    'SA-East (São Paulo)',
  ];

  const filtered = zones.filter((z) => z.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        TARGET_AVAILABILITY_ZONE
      </label>

      <div className="relative">
        <button
          onClick={() => {
            sound.playHover();
            setIsOpen(!isOpen);
          }}
          style={{
            borderRadius: `${customizations.borderRadius}px`,
            backgroundColor: '#06141BE6',
            borderColor: isOpen ? customizations.primaryColor : '#253745',
            borderWidth: `${customizations.borderWidth || 1}px`,
          }}
          className="w-full px-4 py-2.5 text-xs border flex items-center justify-between text-left text-white font-mono"
        >
          <span>{selected}</span>
          <Search className="w-4 h-4 text-cyan-400" />
        </button>

        {isOpen && (
          <div
            style={{
              borderRadius: `${customizations.borderRadius}px`,
              backgroundColor: '#11212DF8',
              borderColor: `${customizations.primaryColor}60`,
            }}
            className="absolute top-full left-0 right-0 mt-2 p-2 border z-30 space-y-2 backdrop-blur-md"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter zones..."
              className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-white outline-none focus:border-cyan-400"
              autoFocus
            />

            <div className="max-h-36 overflow-y-auto space-y-0.5">
              {filtered.map((z) => (
                <div
                  key={z}
                  onClick={() => {
                    sound.playConfirm();
                    setSelected(z);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono cursor-pointer flex items-center justify-between ${
                    selected === z ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{z}</span>
                  {selected === z && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
