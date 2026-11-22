import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  X, 
  Sparkles, 
  Code2, 
  Palette, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Layers, 
  FileCode,
  Tag
} from 'lucide-react';
import { NAVIGATION_COMPONENTS } from '../../data/navigationComponents';

export const TemplateInjectorModal: React.FC = () => {
  const { 
    isTemplateInjectorOpen, 
    setIsTemplateInjectorOpen, 
    activeComponent,
    customizations,
    addCustomTemplate,
    customTemplates,
    applyCustomTemplate,
    deleteCustomTemplate
  } = useStudio();

  const [activeTab, setActiveTab] = useState<'create' | 'vault'>('create');
  const [templateName, setTemplateName] = useState(`${activeComponent.name} Custom Blueprint`);
  const [selectedCompId, setSelectedCompId] = useState(activeComponent.id);
  const [description, setDescription] = useState('Custom futuristic component template crafted in Aurora Studio.');
  const [codeSnippet, setCodeSnippet] = useState(`// Custom Futuristic Template
export const CustomFuturisticNavbar = () => {
  return (
    <nav className="w-full p-4 rounded-2xl bg-black/80 border border-cyan-500/40 shadow-glow-cyan flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-xs font-bold text-cyan-300">AURORA // BLUEPRINT</span>
      </div>
      <div className="flex gap-4 text-xs font-medium text-slate-300">
        <a href="#link" className="hover:text-cyan-400">Node 01</a>
        <a href="#link" className="hover:text-cyan-400">Telemetry</a>
        <a href="#link" className="hover:text-cyan-400">Security</a>
      </div>
    </nav>
  );
};`);
  const [tagsInput, setTagsInput] = useState('Cyberpunk, Production, Futuristic');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isTemplateInjectorOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    addCustomTemplate({
      name: templateName.trim(),
      componentId: selectedCompId,
      description: description.trim(),
      codeSnippet: codeSnippet.trim(),
      tags: tags.length ? tags : ['Custom', 'Futuristic'],
      settings: { ...customizations },
      isUserCreated: true,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('vault');
    }, 900);
  };

  const handleExportAll = () => {
    const blob = new Blob([JSON.stringify(customTemplates, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aurora-custom-templates-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in select-none">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl border border-cyan-500/30 bg-[#0a0f1d] shadow-2xl p-6 flex flex-col max-h-[90vh] cyber-box animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">TEMPLATE ARCHITECT & BLUEPRINT VAULT</h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  LIVE INJECTOR
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Design, store, and inject bespoke futuristic templates for future websites & apps.
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsTemplateInjectorOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center gap-2 my-4 border-b border-white/5 pb-2 shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'create' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Inject New Template</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'vault' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Blueprint Vault ({customTemplates.length})</span>
          </button>

          <div className="ml-auto">
            <button
              onClick={handleExportAll}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 border border-white/10"
              title="Export all custom templates as a JSON backup bundle"
            >
              <Download className="w-3 h-3 text-cyan-400" />
              <span>Export All Blueprints</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-slate-300">
          {activeTab === 'create' ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">
                    Template Title
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. BladeRunner HUD Navbar"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">
                    Target Component Category
                  </label>
                  <select
                    value={selectedCompId}
                    onChange={(e) => setSelectedCompId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {NAVIGATION_COMPONENTS.map((c) => (
                      <option key={c.id} value={c.id} className="bg-slate-900">
                        {c.name} ({c.subcategory})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">
                  Description / Use Case
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. Optimized for AI SaaS landings, high-density Web3 dashboards"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    Template Code Snippet (JSX / HTML / Tailwind)
                  </label>
                  <span className="text-[10px] font-mono text-cyan-400">Ready for Next.js / React / HTML</span>
                </div>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  rows={8}
                  className="w-full p-3 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 border border-white/15 focus:outline-none focus:border-cyan-400 leading-relaxed select-text"
                  spellCheck={false}
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Cyberpunk, HUD, Futuristic, SaaS"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-black transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
                style={{ backgroundColor: '#06b6d4' }}
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Template Injected into Vault!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Inject & Save Blueprint to Studio Vault</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              {customTemplates.length === 0 ? (
                <div className="py-8 text-center text-slate-500 font-mono text-xs">
                  No custom blueprints saved yet. Switch to "Inject New Template" to add one!
                </div>
              ) : (
                customTemplates.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    className="p-4 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/50 transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{tmpl.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {tmpl.componentId}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono opacity-50">{tmpl.createdAt}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">
                      {tmpl.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {tmpl.tags.map((t) => (
                        <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-white/5 font-mono text-slate-400">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/5 mt-1">
                      <button
                        onClick={() => {
                          applyCustomTemplate(tmpl);
                          setIsTemplateInjectorOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Simulate This Template Live</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(tmpl.codeSnippet);
                          alert('Blueprint code copied to clipboard!');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white flex items-center gap-1.5 transition-colors"
                      >
                        <FileCode className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </button>

                      {tmpl.isUserCreated && (
                        <button
                          onClick={() => deleteCustomTemplate(tmpl.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 ml-auto transition-colors"
                          title="Delete Template"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
