import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateNotificationFeedbackCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';
import { Bell, Sparkles } from 'lucide-react';

interface ${compPascal}Props {
  title?: string;
  message?: string;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  title = "${component.name}",
  message = "${component.description.replace(/"/g, '\\"')}",
}) => {
  return (
    <div
      className="p-4 border font-mono text-xs select-none relative overflow-hidden"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        boxShadow: '0 10px 25px -5px ${settings.primaryColor}30',
        color: '${settings.textColor || '#CCD0CF'}',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4" style={{ color: '${settings.primaryColor}' }} />
        <span className="font-bold text-white uppercase">{title}</span>
      </div>
      <p className="text-[11px] text-slate-300 leading-snug">{message}</p>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-4 border font-mono text-xs select-none"
  style="border-radius: ${settings.borderRadius}px; background-color: ${settings.surfaceColor || '#11212D'}F8; border-color: ${settings.primaryColor}50; border-width: ${settings.borderWidth || 1}px;"
>
  <span class="font-bold text-white uppercase block mb-1">${component.name}</span>
  <p class="text-[11px] text-slate-300">${component.description}</p>
</div>
`;

  const htmlCode = `<!-- ${component.name} Feedback -->
<div class="aurora-feedback aurora-${component.id}">
  <h4 class="aurora-feedback-title">${component.name}</h4>
  <p class="aurora-feedback-desc">${component.description}</p>
</div>
`;

  const cssCode = `/* ${component.name} Feedback Styling */
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
