import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateButtonCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ${compPascal}Props {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  label = "${component.name}",
  onClick,
  disabled = false,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 select-none"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.primaryColor}1A',
        color: '${settings.textColor}',
        border: '${settings.borderWidth || 1}px solid ${settings.primaryColor}80',
        boxShadow: hovered 
          ? '0 0 20px -2px ${settings.primaryColor}80' 
          : '0 0 10px -3px ${settings.primaryColor}40',
        backdropFilter: 'blur(${settings.blurIntensity}px)',
      }}
    >
      <Sparkles className="w-3.5 h-3.5" style={{ color: '${settings.primaryColor}' }} />
      <span>{label}</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<button 
  class="relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 text-xs font-semibold transition-all duration-200 cursor-pointer shadow-lg"
  style="border-radius: ${settings.borderRadius}px; background-color: ${settings.primaryColor}20; color: ${settings.textColor}; border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}80; box-shadow: 0 0 15px -3px ${settings.primaryColor}60;"
>
  <svg class="w-3.5 h-3.5" style="color: ${settings.primaryColor};" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
  <span>${component.name}</span>
</button>
`;

  const htmlCode = `<!-- ${component.name} Component HTML -->
<button class="aurora-button aurora-${component.id}">
  <span class="btn-icon">⚡</span>
  <span class="btn-text">${component.name}</span>
</button>
`;

  const cssCode = `/* Aurora ${component.name} Stylesheet */
.aurora-${component.id} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: ${settings.paddingY}px ${settings.paddingX}px;
  border-radius: ${settings.borderRadius}px;
  background-color: ${settings.primaryColor}20;
  color: ${settings.textColor};
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}80;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(${settings.blurIntensity}px);
  box-shadow: 0 0 15px -3px ${settings.primaryColor}50;
}

.aurora-${component.id}:hover {
  border-color: ${settings.primaryColor};
  box-shadow: 0 0 25px -2px ${settings.primaryColor}90;
  transform: translateY(-1px);
}

.aurora-${component.id}:active {
  transform: translateY(1px);
}
`;

  return {
    react: reactCode,
    tailwind: tailwindCode,
    html: htmlCode,
    css: cssCode,
  };
};
