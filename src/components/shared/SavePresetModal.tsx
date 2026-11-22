import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { X, Bookmark, Check, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SavePresetModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { activeComponent, customizations, savePreset, savedPresets, applyPreset, deletePreset } = useStudio();
  const [name, setName] = useState(`${activeComponent.name} - ${customizations.theme.toUpperCase()}`);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    savePreset(name.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/20 bg-slate-900/95 backdrop-blur-2xl shadow-2xl p-5 space-y-4 animate-in zoom-in-95"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-white">Save Design Preset</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              Preset Identifier Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
              placeholder="e.g. Cyberpunk Blue Header"
              autoFocus
            />
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="opacity-60">Target Component:</span>
              <span className="font-semibold text-white">{activeComponent.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Theme Preset:</span>
              <span className="font-mono text-cyan-300 uppercase">{customizations.theme}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Border Radius:</span>
              <span className="font-mono">{customizations.borderRadius}px</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-semibold text-xs text-black transition-all flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: customizations.primaryColor }}
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Preset Saved to Local Storage!</span>
              </>
            ) : (
              <span>Save Preset</span>
            )}
          </button>
        </form>

        {/* Saved presets list */}
        {savedPresets.length > 0 && (
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-2">
              Existing Saved Presets ({savedPresets.length})
            </span>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {savedPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 text-xs"
                >
                  <div 
                    onClick={() => {
                      applyPreset(preset);
                      onClose();
                    }}
                    className="cursor-pointer truncate flex-1"
                  >
                    <div className="font-semibold text-white hover:text-cyan-400">{preset.name}</div>
                    <div className="text-[10px] opacity-50 font-mono">{preset.createdAt}</div>
                  </div>
                  <button
                    onClick={() => deletePreset(preset.id)}
                    className="p-1 rounded hover:bg-rose-500/20 text-rose-400"
                    title="Delete Preset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
