import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateLayoutCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';

interface ${compPascal}Props {
  children?: React.ReactNode;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({ children }) => {
  return (
    <div
      className="p-6 border font-mono select-none w-full"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        color: '${settings.textColor || '#CCD0CF'}',
      }}
    >
      <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
        <span className="text-xs font-bold uppercase text-white">${component.name}</span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
          ${variantId.toUpperCase()}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children || (
          <>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold text-white mb-1">PANE ALPHA</div>
              <div className="text-[10px] text-slate-400">Primary layout zone</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold text-white mb-1">PANE BETA</div>
              <div className="text-[10px] text-slate-400">Secondary contextual rail</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-6 border font-mono select-none w-full bg-[#11212DF8] border-cyan-500/30 rounded-lg text-slate-300"
>
  <div class="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
    <span class="text-xs font-bold uppercase text-white">${component.name}</span>
    <span class="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
      ${variantId.toUpperCase()}
    </span>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="p-4 rounded-lg bg-slate-900 border border-slate-800">Pane Alpha</div>
    <div class="p-4 rounded-lg bg-slate-900 border border-slate-800">Pane Beta</div>
  </div>
</div>
`;

  const htmlCode = `<div class="aurora-layout-container" data-variant="${variantId}">
  <div class="layout-header">
    <span>${component.name}</span>
    <span>${variantId.toUpperCase()}</span>
  </div>
  <div class="layout-grid">
    <div class="layout-card">Pane Alpha</div>
    <div class="layout-card">Pane Beta</div>
  </div>
</div>
`;

  const cssCode = `.aurora-layout-container {
  padding: 1.5rem;
  font-family: monospace;
  background: ${settings.surfaceColor || '#11212D'};
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}50;
  border-radius: ${settings.borderRadius}px;
  color: ${settings.textColor || '#CCD0CF'};
}
.layout-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
.layout-card {
  padding: 1rem;
  background: #0B1720;
  border: 1px solid #253745;
  border-radius: 6px;
}
`;

  return { react: reactCode, tailwind: tailwindCode, html: htmlCode, css: cssCode };
};
