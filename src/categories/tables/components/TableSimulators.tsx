import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  Table as TableIcon,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  GripVertical,
  Check,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Download,
} from 'lucide-react';

export const BasicTableSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  const rows = [
    { id: 'NOD-01', name: 'Quantum Core', status: 'Active', latency: '12ms' },
    { id: 'NOD-02', name: 'Sub-atomic Bus', status: 'Syncing', latency: '24ms' },
    { id: 'NOD-03', name: 'Neural Memory', status: 'Active', latency: '18ms' },
    { id: 'NOD-04', name: 'Relay Satellite', status: 'Idle', latency: '48ms' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border select-none overflow-hidden"
      >
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-[10px]">
              <th className="pb-2">NODE</th>
              <th className="pb-2">NAME</th>
              <th className="pb-2">STATUS</th>
              <th className="pb-2 text-right">LATENCY</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 text-slate-200">
                <td className="py-2 text-cyan-400">{r.id}</td>
                <td className="py-2 font-bold">{r.name}</td>
                <td className="py-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    r.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="py-2 text-right text-slate-400">{r.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdvancedDataTableSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [query, setQuery] = useState('');

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-3"
      >
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter data grid..."
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500 text-xs"
          />
          <button className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">
            EXPORT
          </button>
        </div>

        <BasicTableSimulator variantId={variantId} />
      </div>
    </div>
  );
};

export const SortableTableSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const [sortAsc, setSortAsc] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2 px-2">
        <span>CLICK HEADER TO SORT</span>
        <button
          onClick={() => {
            sound.playHover();
            setSortAsc(!sortAsc);
          }}
          className="text-cyan-400 flex items-center gap-1 font-bold"
        >
          <span>SORT: {sortAsc ? 'ASC ⬆' : 'DESC ⬇'}</span>
        </button>
      </div>
      <BasicTableSimulator variantId={variantId} />
    </div>
  );
};

export const PaginationSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [page, setPage] = useState(2);

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center gap-2 font-mono text-xs select-none">
      <button
        onClick={() => {
          sound.playBlip(1000);
          setPage((p) => Math.max(1, p - 1));
        }}
        className="p-2 rounded-lg bg-[#11212D] border border-white/10 text-slate-300 hover:text-white"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {[1, 2, 3, 4, 5].map((p) => (
        <button
          key={p}
          onClick={() => {
            sound.playBlip(1200 + p * 40);
            setPage(p);
          }}
          className={`w-8 h-8 rounded-lg font-bold border transition-all ${
            page === p
              ? 'text-black shadow-glow-cyan'
              : 'bg-[#11212D] border-white/10 text-slate-300 hover:text-white'
          }`}
          style={{
            backgroundColor: page === p ? customizations.primaryColor : undefined,
            borderColor: page === p ? customizations.primaryColor : undefined,
          }}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => {
          sound.playBlip(1200);
          setPage((p) => Math.min(5, p + 1));
        }}
        className="p-2 rounded-lg bg-[#11212D] border border-white/10 text-slate-300 hover:text-white"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export const SelectableRowTableSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [selected, setSelected] = useState<number[]>([1]);

  const toggle = (idx: number) => {
    sound.playConfirm();
    if (selected.includes(idx)) setSelected(selected.filter((i) => i !== idx));
    else setSelected([...selected, idx]);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-2 select-none"
      >
        <div className="flex justify-between items-center text-slate-400 text-[10px] pb-1 border-b border-white/10">
          <span>SELECTED: {selected.length} OF 3</span>
          <span className="text-cyan-400">CLICK ROW TO TOGGLE</span>
        </div>

        {[
          { name: 'Cluster Alpha', loc: 'US-East' },
          { name: 'Cluster Beta', loc: 'EU-Central' },
          { name: 'Cluster Gamma', loc: 'AP-South' },
        ].map((r, i) => {
          const isSel = selected.includes(i);
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                isSel
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-glow-cyan'
                  : 'border-white/5 bg-[#06141B] text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                    isSel ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-500'
                  }`}
                >
                  {isSel && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>{r.name}</span>
              </div>
              <span className="text-[10px] text-slate-400">{r.loc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BulkActionBarSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-4 select-none font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#06141BF8',
          borderColor: customizations.primaryColor,
          borderWidth: '1px',
          boxShadow: `0 0 20px -3px ${customizations.primaryColor}60`,
        }}
        className="p-3 px-4 border flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold text-white">4 ROWS SELECTED</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => sound.playConfirm()}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-200"
          >
            EXPORT
          </button>
          <button
            onClick={() => sound.playBlip(500)}
            className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export const DragDropListSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [items, setItems] = useState(['1. Auth Service', '2. Telemetry Dispatch', '3. State Synchronizer']);

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-2 select-none"
      >
        <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
          DRAG & DROP REORDERABLE LIST
        </span>
        {items.map((it, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg bg-[#06141B] border border-white/5 hover:border-cyan-400/50 flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-200 transition-colors"
          >
            <GripVertical className="w-4 h-4 text-slate-500" />
            <span>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
