import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateTableCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';

interface ${compPascal}Props {
  title?: string;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  title = "${component.name}",
}) => {
  return (
    <div
      className="p-5 border font-mono text-xs select-none"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        color: '${settings.textColor || '#CCD0CF'}',
      }}
    >
      <div className="font-bold text-white uppercase mb-3">// {title}</div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 text-[10px]">
            <th className="pb-2">ITEM</th>
            <th className="pb-2">METRIC</th>
            <th className="pb-2 text-right">STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/5">
            <td className="py-2 text-cyan-400">Node Alpha</td>
            <td className="py-2">99.8%</td>
            <td className="py-2 text-right text-emerald-400">ONLINE</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-5 border font-mono text-xs"
  style="border-radius: ${settings.borderRadius}px; background-color: ${settings.surfaceColor || '#11212D'}F8; border-color: ${settings.primaryColor}50; border-width: ${settings.borderWidth || 1}px;"
>
  <span class="font-bold text-white uppercase block mb-3">${component.name}</span>
  <table class="w-full text-left">
    <tr class="border-b border-white/10 text-slate-400 text-[10px]"><th>ID</th><th>STATUS</th></tr>
    <tr><td class="py-2 text-cyan-400">01</td><td class="py-2 text-emerald-400">ONLINE</td></tr>
  </table>
</div>
`;

  const htmlCode = `<!-- ${component.name} Table -->
<div class="aurora-table-container aurora-${component.id}">
  <h4>${component.name}</h4>
  <table><tr><th>COL 1</th><th>COL 2</th></tr></table>
</div>
`;

  const cssCode = `/* ${component.name} Styling */
.aurora-${component.id} {
  padding: 1.25rem;
  border-radius: ${settings.borderRadius}px;
  background-color: ${settings.surfaceColor || '#11212D'}F8;
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}50;
  color: ${settings.textColor || '#CCD0CF'};
  font-family: 'JetBrains Mono', monospace;
}
`;

  return {
    react: reactCode,
    tailwind: tailwindCode,
    html: htmlCode,
    css: cssCode,
  };
};
