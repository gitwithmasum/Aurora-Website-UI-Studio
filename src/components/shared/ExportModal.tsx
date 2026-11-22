import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { X, Share2, Copy, Check, Download, Code } from 'lucide-react';
import { generateComponentCode } from '../../categories/navigation/codeGenerators/navigationCodeGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { activeComponent, activeVariantId, customizations } = useStudio();
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const codeData = generateComponentCode(activeComponent, activeVariantId, customizations);
  const jsonConfig = JSON.stringify({
    component: activeComponent.id,
    variant: activeVariantId,
    settings: customizations,
  }, null, 2);

  const handleCopy = (format: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([jsonConfig], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeComponent.id}-preset.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-white/20 bg-slate-900/95 backdrop-blur-2xl shadow-2xl p-5 space-y-4 animate-in zoom-in-95"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-white">Export & Share Component</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Export the configured component as ready-to-use source code, design token metadata, or JSON configuration:
        </p>

        <div className="space-y-3">
          {/* React JSX Snippet */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-white">React JSX (TypeScript)</div>
              <div className="text-[11px] opacity-60">Full modular React component code</div>
            </div>
            <button
              onClick={() => handleCopy('react', codeData.react)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold flex items-center gap-1.5 text-white"
            >
              {copiedFormat === 'react' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedFormat === 'react' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Tailwind Snippet */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-white">Tailwind CSS Template</div>
              <div className="text-[11px] opacity-60">HTML template with active Tailwind classes</div>
            </div>
            <button
              onClick={() => handleCopy('tailwind', codeData.tailwind)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold flex items-center gap-1.5 text-white"
            >
              {copiedFormat === 'tailwind' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedFormat === 'tailwind' ? 'Copied!' : 'Copy Markup'}</span>
            </button>
          </div>

          {/* JSON Preset */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-white">Studio JSON Specification</div>
              <div className="text-[11px] opacity-60">Full token and styling parameter matrix</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy('json', jsonConfig)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold flex items-center gap-1.5 text-white"
              >
                {copiedFormat === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedFormat === 'json' ? 'Copied!' : 'Copy JSON'}</span>
              </button>
              <button
                onClick={handleDownloadJSON}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white"
                title="Download JSON File"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <span className="text-[11px] font-mono text-cyan-400">
            AURORA UI STUDIO • Production Ready
          </span>
        </div>
      </div>
    </div>
  );
};
