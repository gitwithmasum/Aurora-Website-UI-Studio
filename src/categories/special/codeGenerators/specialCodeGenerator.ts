import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateSpecialCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';
import { Crosshair, Shield } from 'lucide-react';

interface ${compPascal}Props {
  label?: string;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  label = "${component.name}",
}) => {
  return (
    <div
      className="p-6 border font-mono select-none relative overflow-hidden"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}60',
        borderWidth: '${settings.borderWidth || 1}px',
        color: '${settings.textColor || '#CCD0CF'}',
        boxShadow: '0 0 20px ${settings.primaryColor}20',
      }}
    >
      <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase text-white">{label}</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
          ${variantId.toUpperCase()}
        </span>
      </div>

      <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
        <div className="text-cyan-400 font-bold">&gt; HUD AVIONICS ONLINE</div>
        <div className="text-slate-400">STATUS: ALL PROTOCOLS SYNCHRONIZED</div>
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-6 border font-mono select-none relative bg-[#11212DF8] border-cyan-500/40 rounded-lg text-slate-200 shadow-lg shadow-cyan-500/10"
>
  <div class="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
    <span class="text-xs font-bold uppercase text-white">${component.name}</span>
    <span class="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
      ${variantId.toUpperCase()}
    </span>
  </div>
  <div class="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs">
    <div class="text-cyan-400 font-bold">&gt; PROTOCOL ENGAGED</div>
  </div>
</div>
`;

  const htmlCode = `<div class="aurora-special-hud" data-variant="${variantId}">
  <div class="hud-top">
    <span>${component.name}</span>
    <span class="hud-badge">${variantId.toUpperCase()}</span>
  </div>
  <div class="hud-terminal">
    &gt; SYSTEM ACTIVATED
  </div>
</div>
`;

  const cssCode = `.aurora-special-hud {
  padding: 1.5rem;
  font-family: monospace;
  background: ${settings.surfaceColor || '#11212D'};
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}60;
  border-radius: ${settings.borderRadius}px;
  color: ${settings.textColor || '#CCD0CF'};
  box-shadow: 0 0 25px ${settings.primaryColor}20;
}
.hud-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.hud-terminal {
  background: #06141B;
  padding: 1rem;
  border-radius: 6px;
  color: ${settings.primaryColor};
}
`;

  return { react: reactCode, tailwind: tailwindCode, html: htmlCode, css: cssCode };
};
