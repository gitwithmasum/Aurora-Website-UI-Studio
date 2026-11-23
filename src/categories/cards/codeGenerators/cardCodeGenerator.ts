import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateCardCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ${compPascal}Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  title = "${component.name}",
  description = "${component.description.replace(/"/g, '\\"')}",
  children,
}) => {
  return (
    <div
      className="relative overflow-hidden p-6 transition-all duration-300 border group select-none"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}E6',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        boxShadow: '0 12px 30px -10px ${settings.primaryColor}30',
        backdropFilter: 'blur(${settings.blurIntensity}px)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span 
          className="text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-bold"
          style={{
            borderColor: '${settings.primaryColor}40',
            color: '${settings.primaryColor}',
            backgroundColor: '${settings.primaryColor}15',
          }}
        >
          ${variantId.toUpperCase()}
        </span>
        <Sparkles className="w-4 h-4" style={{ color: '${settings.primaryColor}' }} />
      </div>

      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-300/80 leading-relaxed mb-5">{description}</p>

      {children}

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400">STATUS: NOMINAL</span>
        <button 
          className="flex items-center gap-1 font-bold transition-transform hover:translate-x-1"
          style={{ color: '${settings.primaryColor}' }}
        >
          <span>INTERACT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="relative overflow-hidden p-6 transition-all duration-300 border group"
  style="border-radius: ${settings.borderRadius}px; background-color: ${settings.surfaceColor || '#11212D'}E6; border-color: ${settings.primaryColor}50; border-width: ${settings.borderWidth || 1}px; box-shadow: 0 12px 30px -10px ${settings.primaryColor}30; backdrop-filter: blur(${settings.blurIntensity}px);"
>
  <div class="flex items-center justify-between mb-4">
    <span class="text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-bold text-cyan-400 border-cyan-500/40 bg-cyan-500/10">
      ${variantId.toUpperCase()}
    </span>
  </div>

  <h3 class="text-base font-bold text-white mb-2">${component.name}</h3>
  <p class="text-xs text-slate-300/80 leading-relaxed mb-5">
    ${component.description}
  </p>
</div>
`;

  const htmlCode = `<!-- ${component.name} HTML Container -->
<div class="aurora-card aurora-${component.id}">
  <div class="aurora-card-badge">${variantId.toUpperCase()}</div>
  <h3 class="aurora-card-title">${component.name}</h3>
  <p class="aurora-card-desc">${component.description}</p>
</div>
`;

  const cssCode = `/* ${component.name} Cyber Card Styling */
.aurora-${component.id} {
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  border-radius: ${settings.borderRadius}px;
  background-color: ${settings.surfaceColor || '#11212D'}E6;
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}50;
  box-shadow: 0 12px 30px -10px ${settings.primaryColor}30;
  backdrop-filter: blur(${settings.blurIntensity}px);
  color: ${settings.textColor};
  font-family: 'Inter', sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.aurora-${component.id}:hover {
  border-color: ${settings.primaryColor};
  box-shadow: 0 20px 40px -10px ${settings.primaryColor}50;
  transform: translateY(-2px);
}
`;

  return {
    react: reactCode,
    tailwind: tailwindCode,
    html: htmlCode,
    css: cssCode,
  };
};
