import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateAnimationCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React, { useState } from 'react';

interface ${compPascal}Props {
  children?: React.ReactNode;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-6 border font-mono select-none transition-all duration-300 relative cursor-pointer"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: isHovered ? '${settings.primaryColor}' : '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        color: '${settings.textColor || '#CCD0CF'}',
        transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'none',
        boxShadow: isHovered ? '0 10px 25px -5px ${settings.primaryColor}40' : 'none',
      }}
    >
      <div className="text-xs font-bold uppercase text-white mb-1">${component.name}</div>
      <div className="text-[10px] text-cyan-400">STATE: {isHovered ? 'ACTIVATED' : 'IDLE'}</div>
      {children}
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-6 border font-mono select-none transition-all duration-300 hover:scale-105 hover:-translate-y-1 bg-[#11212DF8] border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 rounded-lg text-slate-200 cursor-pointer"
>
  <div class="text-xs font-bold uppercase text-white mb-1">${component.name}</div>
  <div class="text-[10px] text-cyan-400">VARIANT: ${variantId.toUpperCase()}</div>
</div>
`;

  const htmlCode = `<div class="aurora-interactive-element" data-variant="${variantId}">
  <span class="element-title">${component.name}</span>
  <span class="element-badge">${variantId.toUpperCase()}</span>
</div>
`;

  const cssCode = `.aurora-interactive-element {
  padding: 1.5rem;
  font-family: monospace;
  background: ${settings.surfaceColor || '#11212D'};
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}50;
  border-radius: ${settings.borderRadius}px;
  color: ${settings.textColor || '#CCD0CF'};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}
.aurora-interactive-element:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: ${settings.primaryColor};
  box-shadow: 0 12px 28px -8px ${settings.primaryColor}50;
}
`;

  return { react: reactCode, tailwind: tailwindCode, html: htmlCode, css: cssCode };
};
