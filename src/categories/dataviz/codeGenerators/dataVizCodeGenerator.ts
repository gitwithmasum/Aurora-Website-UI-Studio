import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateDataVizCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';
import { BarChart3 } from 'lucide-react';

interface ${compPascal}Props {
  data?: number[];
  label?: string;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  data = [40, 65, 80, 95, 75],
  label = "${component.name}",
}) => {
  return (
    <div
      className="p-5 border font-mono select-none"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4" style={{ color: '${settings.primaryColor}' }} />
        <h4 className="text-xs font-bold text-white uppercase">{label}</h4>
      </div>

      <div className="flex items-end gap-2 h-32 pt-2 border-b border-white/10 pb-2">
        {data.map((val, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-t transition-all"
            style={{
              height: \`\${val}%\`,
              backgroundColor: '${settings.primaryColor}',
              boxShadow: '0 0 10px ${settings.primaryColor}',
            }}
          />
        ))}
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-5 border font-mono select-none"
  style="border-radius: ${settings.borderRadius}px; background-color: ${settings.surfaceColor || '#11212D'}F8; border-color: ${settings.primaryColor}50; border-width: ${settings.borderWidth || 1}px;"
>
  <h4 class="text-xs font-bold text-white uppercase mb-3">${component.name}</h4>
  <div class="h-32 border-b border-white/10 flex items-end gap-2 pb-2">
    <div class="flex-1 bg-cyan-400 h-2/3 rounded-t"></div>
    <div class="flex-1 bg-cyan-400 h-full rounded-t"></div>
    <div class="flex-1 bg-cyan-400 h-1/2 rounded-t"></div>
  </div>
</div>
`;

  const htmlCode = `<!-- ${component.name} Visualization -->
<div class="aurora-viz aurora-${component.id}">
  <h4 class="aurora-viz-title">${component.name}</h4>
  <div class="aurora-viz-canvas"></div>
</div>
`;

  const cssCode = `/* ${component.name} Data Viz Styling */
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
