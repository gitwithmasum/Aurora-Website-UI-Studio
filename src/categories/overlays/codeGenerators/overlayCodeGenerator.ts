import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateOverlayCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface ${compPascal}Props {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  isOpen = true,
  onClose,
  title = "${component.name}",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
      <div
        className="relative w-full max-w-md p-6 border shadow-2xl transition-all"
        style={{
          borderRadius: '${settings.borderRadius}px',
          backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
          borderColor: '${settings.primaryColor}60',
          borderWidth: '${settings.borderWidth || 1}px',
          boxShadow: '0 25px 50px -12px ${settings.primaryColor}40',
          backdropFilter: 'blur(${settings.blurIntensity}px)',
        }}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: '${settings.primaryColor}' }} />
            <h3 className="text-sm font-bold text-white font-mono uppercase">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-slate-300 leading-relaxed mb-6 font-mono">
          {children || "${component.description.replace(/"/g, '\\"')}"}
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-black"
            style={{ backgroundColor: '${settings.primaryColor}' }}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) Overlay -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
  <div 
    class="relative w-full max-w-md p-6 border shadow-2xl"
    style="border-radius: ${settings.borderRadius}px; background-color: ${settings.surfaceColor || '#11212D'}F8; border-color: ${settings.primaryColor}60; border-width: ${settings.borderWidth || 1}px;"
  >
    <h3 class="text-sm font-bold text-white font-mono uppercase mb-2">${component.name}</h3>
    <p class="text-xs text-slate-300 font-mono">${component.description}</p>
  </div>
</div>
`;

  const htmlCode = `<!-- ${component.name} Overlay Component -->
<div class="aurora-overlay-backdrop">
  <div class="aurora-dialog aurora-${component.id}">
    <h3 class="aurora-dialog-title">${component.name}</h3>
    <p class="aurora-dialog-body">${component.description}</p>
  </div>
</div>
`;

  const cssCode = `/* ${component.name} Overlay Styling */
.aurora-overlay-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(6, 20, 27, 0.8);
  backdrop-filter: blur(${settings.blurIntensity}px);
}

.aurora-${component.id} {
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
  border-radius: ${settings.borderRadius}px;
  background-color: ${settings.surfaceColor || '#11212D'}F8;
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}60;
  box-shadow: 0 25px 50px -12px ${settings.primaryColor}40;
  color: ${settings.textColor || '#CCD0CF'};
}
`;

  return {
    react: reactCode,
    tailwind: tailwindCode,
    html: htmlCode,
    css: cssCode,
  };
};
