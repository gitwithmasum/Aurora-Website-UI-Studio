import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateUserProfileCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';
import { User, Shield } from 'lucide-react';

interface ${compPascal}Props {
  name?: string;
  role?: string;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  name = "Operative",
  role = "Cyber Architect",
}) => {
  return (
    <div
      className="p-4 border font-mono select-none flex items-center gap-3"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        color: '${settings.textColor || '#CCD0CF'}',
      }}
    >
      <div 
        className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs"
        style={{ borderColor: '${settings.primaryColor}', color: '${settings.primaryColor}' }}
      >
        OP
      </div>
      <div>
        <div className="font-bold text-white text-xs">{name}</div>
        <div className="text-[10px] text-slate-400">{role}</div>
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-4 border font-mono select-none flex items-center gap-3"
  style="border-radius: ${settings.borderRadius}px; background-color: ${settings.surfaceColor || '#11212D'}F8; border-color: ${settings.primaryColor}50; border-width: ${settings.borderWidth || 1}px;"
>
  <div class="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-cyan-400">OP</div>
  <div>
    <span class="font-bold text-white text-xs block">${component.name}</span>
    <span class="text-[10px] text-slate-400">Cyber Level 4</span>
  </div>
</div>
`;

  const htmlCode = `<!-- ${component.name} Profile -->
<div class="aurora-profile aurora-${component.id}">
  <h4>${component.name}</h4>
</div>
`;

  const cssCode = `/* ${component.name} Profile Styling */
.aurora-${component.id} {
  padding: 1rem;
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
