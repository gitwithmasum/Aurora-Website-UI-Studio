import React, { useState, useEffect } from 'react';
import { useStudio, ALL_COMPONENTS } from '../../context/StudioContext';
import { CATEGORIES } from '../../data/categories';
import { 
  X, 
  Sparkles, 
  Code2, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  Layers, 
  FileCode,
  Tag,
  Filter
} from 'lucide-react';

const getStarterSnippet = (catId: string, compName: string) => {
  const cleanName = compName.replace(/[^a-zA-Z0-9]/g, '');

  switch (catId) {
    case 'category-02':
      return `// Custom Futuristic Button Blueprint
export const Custom${cleanName} = () => {
  return (
    <button className="relative px-6 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all border border-cyan-300 shadow-glow-cyan flex items-center justify-center gap-2">
      <span>⚡</span>
      <span>${compName.toUpperCase()}</span>
    </button>
  );
};`;

    case 'category-03':
      return `// Custom Futuristic Card Blueprint
export const Custom${cleanName} = () => {
  return (
    <div className="p-6 rounded-2xl bg-[#11212D]/90 border border-cyan-500/40 shadow-2xl backdrop-blur-md text-white font-mono space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="text-cyan-400 font-bold">// ${compName.toUpperCase()}</span>
        <span className="text-[10px] text-emerald-400">● LIVE STATUS</span>
      </div>
      <h3 className="text-sm font-bold text-white">${compName}</h3>
      <p className="text-xs text-slate-400">Custom container architecture deployed with zero latency.</p>
    </div>
  );
};`;

    case 'category-04':
      return `// Custom Futuristic Form Field Blueprint
export const Custom${cleanName} = () => {
  return (
    <div className="w-full space-y-1.5 font-mono">
      <label className="text-xs font-bold text-slate-300 block">${compName.toUpperCase()}</label>
      <input 
        type="text" 
        placeholder="Enter ${compName.toLowerCase()} value..." 
        className="w-full px-4 py-2.5 rounded-xl bg-[#06141B] border border-cyan-500/40 text-xs text-cyan-300 outline-none focus:border-cyan-400 shadow-inner"
      />
    </div>
  );
};`;

    case 'category-05':
      return `// Custom Futuristic Modal Blueprint
export const Custom${cleanName} = () => {
  return (
    <div className="p-6 rounded-2xl bg-[#11212D]/95 border border-cyan-500/50 shadow-2xl backdrop-blur-lg max-w-md w-full font-mono text-white space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <h3 className="text-sm font-bold text-cyan-300">${compName.toUpperCase()}</h3>
        <span className="text-slate-400 cursor-pointer hover:text-white">✕</span>
      </div>
      <p className="text-xs text-slate-300">Synchronize sub-atomic telemetry nodes across edge clusters.</p>
      <button className="w-full py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs">
        CONFIRM OPERATION
      </button>
    </div>
  );
};`;

    case 'category-06':
      return `// Custom Futuristic Progress Blueprint
export const Custom${cleanName} = () => {
  return (
    <div className="w-full max-w-sm space-y-2 font-mono">
      <div className="flex justify-between text-xs text-slate-300 font-bold">
        <span>${compName.toUpperCase()}</span>
        <span className="text-cyan-400">78%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-[#06141B] border border-cyan-500/30 overflow-hidden">
        <div className="h-full rounded-full bg-cyan-400 shadow-glow-cyan w-[78%]" />
      </div>
    </div>
  );
};`;

    default:
      return `// Custom Futuristic Navigation Component
export const Custom${cleanName} = () => {
  return (
    <nav className="w-full p-4 rounded-2xl bg-[#06141B]/90 border border-cyan-500/40 shadow-glow-cyan flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-xs font-bold text-cyan-300">${compName.toUpperCase()}</span>
      </div>
      <div className="flex gap-4 text-xs font-medium text-slate-300">
        <a href="#link" className="hover:text-cyan-400">Node 01</a>
        <a href="#link" className="hover:text-cyan-400">Telemetry</a>
      </div>
    </nav>
  );
};`;
  }
};

export const TemplateInjectorModal: React.FC = () => {
  const { 
    isTemplateInjectorOpen, 
    setIsTemplateInjectorOpen, 
    activeCategory,
    activeComponent,
    customizations,
    addCustomTemplate,
    customTemplates,
    applyCustomTemplate,
    deleteCustomTemplate
  } = useStudio();

  const [activeTab, setActiveTab] = useState<'create' | 'vault'>('create');
  
  // Category Selection
  const activeCatId = activeComponent.categoryId || activeCategory.id || 'category-01';
  const [selectedCatId, setSelectedCatId] = useState<string>(activeCatId);
  const [selectedCompId, setSelectedCompId] = useState<string>(activeComponent.id);
  const [templateName, setTemplateName] = useState<string>(`${activeComponent.name} Custom Blueprint`);
  const [description, setDescription] = useState<string>('Custom futuristic component template crafted in Aurora Studio.');
  const [codeSnippet, setCodeSnippet] = useState<string>(getStarterSnippet(activeCatId, activeComponent.name));
  const [tagsInput, setTagsInput] = useState<string>('Cyberpunk, Production, Futuristic');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [vaultFilterCategory, setVaultFilterCategory] = useState<string>('all');

  // Synchronize when modal opens
  useEffect(() => {
    if (isTemplateInjectorOpen) {
      const initialCatId = activeComponent.categoryId || activeCategory.id || 'category-01';
      setSelectedCatId(initialCatId);
      setSelectedCompId(activeComponent.id);
      setTemplateName(`${activeComponent.name} Custom Blueprint`);
      setCodeSnippet(getStarterSnippet(initialCatId, activeComponent.name));
    }
  }, [isTemplateInjectorOpen, activeComponent, activeCategory]);

  if (!isTemplateInjectorOpen) return null;

  // Active available categories (All 16 Categories)
  const availableCategories = CATEGORIES;

  // Components belonging to the currently selected category
  const availableComponents = ALL_COMPONENTS.filter(
    (c) => (c.categoryId || 'category-01') === selectedCatId
  );

  const handleCategoryChange = (newCatId: string) => {
    setSelectedCatId(newCatId);
    const compsInCat = ALL_COMPONENTS.filter(
      (c) => (c.categoryId || 'category-01') === newCatId
    );
    if (compsInCat.length > 0) {
      const firstComp = compsInCat[0];
      setSelectedCompId(firstComp.id);
      setTemplateName(`${firstComp.name} Custom Blueprint`);
      setCodeSnippet(getStarterSnippet(newCatId, firstComp.name));
    }
  };

  const handleComponentChange = (newCompId: string) => {
    setSelectedCompId(newCompId);
    const comp = ALL_COMPONENTS.find((c) => c.id === newCompId);
    if (comp) {
      setTemplateName(`${comp.name} Custom Blueprint`);
      setCodeSnippet(getStarterSnippet(selectedCatId, comp.name));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim()) return;

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const newTemplate = addCustomTemplate({
      name: templateName.trim(),
      categoryId: selectedCatId,
      componentId: selectedCompId,
      description: description.trim(),
      codeSnippet: codeSnippet.trim(),
      tags: tags.length ? tags : ['Custom', 'Futuristic'],
      settings: { ...customizations },
      isUserCreated: true,
    });

    // Immediately activate and simulate the injected template live
    applyCustomTemplate(newTemplate);

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsTemplateInjectorOpen(false);
    }, 700);
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

  // Filter templates in vault
  const filteredTemplates = customTemplates.filter((tmpl) => {
    if (vaultFilterCategory === 'all') return true;
    if (tmpl.categoryId) return tmpl.categoryId === vaultFilterCategory;
    const targetComp = ALL_COMPONENTS.find((c) => c.id === tmpl.componentId);
    return targetComp?.categoryId === vaultFilterCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-2xl border border-cyan-500/40 bg-[#06141B] shadow-2xl p-3 sm:p-6 flex flex-col max-h-[94vh] cyber-box animate-in zoom-in-95 text-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shadow-glow-cyan shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-xs sm:text-sm text-white font-mono tracking-wide truncate">
                  TEMPLATE ARCHITECT & BLUEPRINT VAULT
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shrink-0">
                  MULTI-CATEGORY
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">
                Select category and component to design, store, and inject bespoke futuristic templates.
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsTemplateInjectorOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 my-3 sm:my-4 border-b border-white/5 pb-2 shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'create' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Inject New Template</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'vault' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Blueprint Vault ({customTemplates.length})</span>
          </button>

          <div className="ml-auto">
            <button
              onClick={handleExportAll}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-slate-300 border border-white/10 transition-colors"
              title="Export all custom templates as a JSON backup bundle"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export All Blueprints</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-slate-300">
          {activeTab === 'create' ? (
            <form onSubmit={handleSave} className="space-y-4">
              {/* Row 1: Template Title, Category Selector, Component Selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Template Title */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-300 block mb-1 font-bold">
                    Template Title
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#11212D] border border-cyan-500/30 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono shadow-inner"
                    placeholder="e.g. BladeRunner HUD Navbar"
                    required
                  />
                </div>

                {/* 2. Target Category Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-cyan-400 block mb-1 font-bold flex items-center justify-between">
                    <span>Target Category</span>
                    <span className="text-[9px] text-slate-500 font-normal">STEP 1</span>
                  </label>
                  <select
                    value={selectedCatId}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#11212D] border border-cyan-500/40 text-xs text-cyan-300 font-mono font-semibold focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-[#11212D] text-white">
                        {cat.number}. {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Target Component Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-300 block mb-1 font-bold flex items-center justify-between">
                    <span>Target Component</span>
                    <span className="text-[9px] text-slate-500 font-normal">STEP 2</span>
                  </label>
                  <select
                    value={selectedCompId}
                    onChange={(e) => handleComponentChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#11212D] border border-cyan-500/30 text-xs text-white font-mono focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
                  >
                    {availableComponents.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#11212D] text-white">
                        {c.name} ({c.subcategory})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">
                  Description / Use Case
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#11212D] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  placeholder="e.g. Optimized for AI SaaS landings, high-density Web3 dashboards"
                />
              </div>

              {/* Code Snippet Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    Template Code Snippet (JSX / HTML / Tailwind)
                  </label>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Compiled for React & Web Browsers
                  </span>
                </div>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  rows={8}
                  className="w-full p-3 rounded-xl bg-[#06141B] font-mono text-xs text-cyan-300 border border-cyan-500/20 focus:outline-none focus:border-cyan-400 leading-relaxed select-text"
                  spellCheck={false}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#11212D] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  placeholder="Cyberpunk, HUD, Futuristic, SaaS"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold font-mono text-xs text-black transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
                style={{ backgroundColor: '#00e5ff' }}
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
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
              {/* Vault Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 border-b border-white/5">
                <span className="text-[10px] font-mono text-slate-500 uppercase mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-cyan-400" />
                  <span>FILTER:</span>
                </span>
                <button
                  onClick={() => setVaultFilterCategory('all')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    vaultFilterCategory === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-glow-cyan'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  ALL ({customTemplates.length})
                </button>
                {availableCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setVaultFilterCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-all ${
                      vaultFilterCategory === cat.id
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-glow-cyan'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.number}. {cat.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {filteredTemplates.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-mono text-xs">
                  No blueprints found in this category. Switch to "Inject New Template" to add one!
                </div>
              ) : (
                filteredTemplates.map((tmpl) => {
                  const targetComp = ALL_COMPONENTS.find((c) => c.id === tmpl.componentId);
                  const parentCat = CATEGORIES.find(
                    (cat) => cat.id === (tmpl.categoryId || targetComp?.categoryId)
                  );

                  return (
                    <div
                      key={tmpl.id}
                      className="p-4 rounded-xl bg-[#11212D]/80 border border-white/10 hover:border-cyan-500/50 transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{tmpl.name}</span>
                          {parentCat && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
                              {parentCat.number}. {parentCat.name.split(' ')[0].toUpperCase()}
                            </span>
                          )}
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
                            {targetComp?.name || tmpl.componentId}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{tmpl.createdAt}</span>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-snug">
                        {tmpl.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {tmpl.tags.map((t) => (
                          <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-black/40 font-mono text-cyan-400 border border-white/5">
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
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors border border-cyan-500/30"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Simulate This Template Live</span>
                        </button>

                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(tmpl.codeSnippet);
                            alert('Blueprint code copied to clipboard!');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors border border-white/10"
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
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
