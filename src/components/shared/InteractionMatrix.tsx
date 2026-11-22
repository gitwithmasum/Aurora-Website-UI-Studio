import React from 'react';
import { useStudio } from '../../context/StudioContext';
import { InteractionState } from '../../types/studio';
import { NavigationRenderer } from '../../categories/navigation/NavigationRenderer';

export const InteractionMatrix: React.FC = () => {
  const { activeComponent, customizations, updateCustomizations, setActiveTab } = useStudio();

  const states: { id: InteractionState; title: string; desc: string }[] = [
    { id: 'default', title: 'Default State', desc: 'Standard resting visual appearance.' },
    { id: 'hover', title: 'Hover State', desc: 'Cursor hover with scale and illumination.' },
    { id: 'active', title: 'Active / Pressed State', desc: 'Active pointer engagement.' },
    { id: 'focus', title: 'Focus State', desc: 'Keyboard focus ring indicator.' },
    { id: 'disabled', title: 'Disabled State', desc: 'Non-interactive grayed-out presentation.' },
    { id: 'loading', title: 'Loading State', desc: 'Telemetry pulse and skeleton mode.' },
    { id: 'selected', title: 'Selected State', desc: 'High-contrast active selection.' },
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto space-y-6">
      <div className="pb-4 border-b border-white/10">
        <h3 className="font-bold text-base text-white">{activeComponent.name} — Functional State Matrix</h3>
        <p className="text-xs text-slate-400 mt-1">
          Inspect how this component reacts to user events, focus traversal, disabled states, and network loading pulses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {states.map((st) => (
          <div 
            key={st.id}
            className="p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between shadow-lg"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div>
                <span className="font-bold text-xs text-white uppercase tracking-wider">{st.title}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">{st.desc}</p>
              </div>
              <button
                onClick={() => {
                  updateCustomizations({ activeState: st.id });
                  setActiveTab('preview');
                }}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
              >
                Simulate in Canvas
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-center min-h-[120px]">
              <div className="w-full flex items-center justify-center">
                <NavigationRenderer />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
