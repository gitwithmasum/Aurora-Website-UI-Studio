import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateProgressCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';

interface ${compPascal}Props {
  progress?: number;
  label?: string;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  progress = 68,
  label = "${component.name}",
}) => {
  return (
    <div className="w-full max-w-sm mx-auto space-y-2 font-mono select-none">
      <div className="flex justify-between text-xs">
        <span className="text-slate-300 font-bold">{label}</span>
        <span style={{ color: '${settings.primaryColor}' }} className="font-extrabold">{progress}%</span>
      </div>

      <div 
        className="w-full h-2 bg-[#06141B] rounded-full overflow-hidden border p-0.5"
        style={{ borderColor: '${settings.primaryColor}40' }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: \`\${progress}%\`,
            backgroundColor: '${settings.primaryColor}',
            boxShadow: '0 0 10px ${settings.primaryColor}',
          }}
        />
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div class="w-full max-w-sm mx-auto space-y-2 font-mono">
  <div class="flex justify-between text-xs">
    <span class="text-slate-300 font-bold">${component.name}</span>
    <span class="text-cyan-400 font-bold">68%</span>
  </div>
  <div class="w-full h-2 bg-[#06141B] rounded-full overflow-hidden border border-cyan-500/40">
    <div 
      class="h-full rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]"
      style="width: 68%;"
    ></div>
  </div>
</div>
`;

  const htmlCode = `<!-- ${component.name} Progress -->
<div class="aurora-progress-container aurora-${component.id}">
  <div class="aurora-progress-label">${component.name}</div>
  <div class="aurora-progress-track">
    <div class="aurora-progress-bar" style="width: 68%;"></div>
  </div>
</div>
`;

  const cssCode = `/* ${component.name} Progress Styling */
.aurora-${component.id} {
  width: 100%;
  font-family: 'JetBrains Mono', monospace;
}

.aurora-${component.id} .aurora-progress-track {
  width: 100%;
  height: 8px;
  background-color: #06141B;
  border-radius: ${settings.borderRadius}px;
  border: 1px solid ${settings.primaryColor}40;
  overflow: hidden;
}

.aurora-${component.id} .aurora-progress-bar {
  height: 100%;
  background-color: ${settings.primaryColor};
  box-shadow: 0 0 10px ${settings.primaryColor};
  transition: width 0.3s ease;
}
`;

  return {
    react: reactCode,
    tailwind: tailwindCode,
    html: htmlCode,
    css: cssCode,
  };
};
