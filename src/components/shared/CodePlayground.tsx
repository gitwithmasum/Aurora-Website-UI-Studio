import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { Copy, Check, Download, FileCode, Code, Layers, Sparkles } from 'lucide-react';
import { generateComponentCode } from '../../categories/navigation/codeGenerators/navigationCodeGenerator';
import { generateButtonCode } from '../../categories/buttons/codeGenerators/buttonCodeGenerator';

export const CodePlayground: React.FC = () => {
  const { activeComponent, activeVariantId, customizations } = useStudio();
  const [activeLang, setActiveLang] = useState<'react' | 'html' | 'css' | 'tailwind'>('react');
  const [copied, setCopied] = useState(false);

  const codeSnippets = activeComponent.categoryId === 'category-02'
    ? generateButtonCode(activeComponent, activeVariantId, customizations)
    : generateComponentCode(activeComponent, activeVariantId, customizations);
  const currentCode = codeSnippets[activeLang];

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extMap = {
      react: 'tsx',
      html: 'html',
      css: 'css',
      tailwind: 'html',
    };
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeComponent.id}.${extMap[activeLang]}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const lines = currentCode.split('\n');

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-6 select-text">
      {/* Code Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-white">{activeComponent.name} Code Export</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              DYNAMIC COMPILATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Realtime generated code reflecting active customizations, colors, and layout properties.
          </p>
        </div>

        {/* Language Tabs & Copy/Download */}
        <div className="flex items-center gap-2">
          {/* Format Tabs */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            {[
              { id: 'react', label: 'React JSX' },
              { id: 'tailwind', label: 'Tailwind' },
              { id: 'html', label: 'HTML5' },
              { id: 'css', label: 'CSS3' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLang(tab.id as any)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeLang === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all shadow"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
            title="Download snippet file"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="flex-1 rounded-2xl border border-white/10 bg-slate-950 overflow-hidden flex flex-col shadow-2xl">
        {/* Editor Tab Bar */}
        <div className="px-4 py-2 border-b border-white/10 bg-slate-900/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-white/70 font-semibold">
              {activeComponent.id}.{activeLang === 'react' ? 'tsx' : activeLang === 'css' ? 'css' : 'html'}
            </span>
          </div>
          <span className="text-[10px] opacity-60">UTF-8 • {lines.length} lines</span>
        </div>

        {/* Code Content with Line Numbers */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-300 flex">
          {/* Line Numbers */}
          <div className="select-none pr-4 text-right text-slate-600 font-mono text-[11px] shrink-0 border-r border-white/5">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Text */}
          <pre className="pl-4 flex-1 whitespace-pre overflow-x-auto text-[12px]">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
