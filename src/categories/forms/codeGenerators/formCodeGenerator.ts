import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateFormCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React, { useState } from 'react';

interface ${compPascal}Props {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  label = "${component.name}",
  placeholder = "Enter ${component.name.toLowerCase()}...",
  value: initialValue = "",
  onChange,
}) => {
  const [val, setVal] = useState(initialValue);
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full space-y-1.5 font-mono select-none">
      <div className="flex justify-between text-xs">
        <label className="text-slate-300 font-semibold">{label}</label>
        <span className="text-[10px] text-cyan-400">// ${variantId.toUpperCase()}</span>
      </div>

      <div className="relative">
        <input
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            onChange?.(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 text-xs outline-none transition-all border font-mono"
          style={{
            borderRadius: '${settings.borderRadius}px',
            backgroundColor: '${settings.surfaceColor || '#11212D'}E6',
            borderColor: focused ? '${settings.primaryColor}' : '#253745',
            borderWidth: '${settings.borderWidth || 1}px',
            boxShadow: focused ? '0 0 15px -3px ${settings.primaryColor}60' : 'none',
            color: '${settings.textColor || '#CCD0CF'}',
            backdropFilter: 'blur(${settings.blurIntensity}px)',
          }}
        />
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div class="w-full space-y-1.5 font-mono">
  <label class="block text-xs font-semibold text-slate-300">${component.name}</label>
  <input 
    type="text"
    placeholder="${component.name}..."
    class="w-full px-4 py-2.5 text-xs outline-none transition-all border font-mono"
    style="border-radius: ${settings.borderRadius}px; background-color: ${settings.surfaceColor || '#11212D'}E6; border-color: ${settings.primaryColor}50; border-width: ${settings.borderWidth || 1}px; color: ${settings.textColor || '#CCD0CF'};"
  />
</div>
`;

  const htmlCode = `<!-- ${component.name} Field -->
<div class="aurora-form-group">
  <label class="aurora-label">${component.name}</label>
  <input class="aurora-input aurora-${component.id}" placeholder="${component.name}..." />
</div>
`;

  const cssCode = `/* ${component.name} Input Styling */
.aurora-${component.id} {
  width: 100%;
  padding: 0.625rem 1rem;
  border-radius: ${settings.borderRadius}px;
  background-color: ${settings.surfaceColor || '#11212D'}E6;
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}50;
  color: ${settings.textColor || '#CCD0CF'};
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.aurora-${component.id}:focus {
  outline: none;
  border-color: ${settings.primaryColor};
  box-shadow: 0 0 15px -3px ${settings.primaryColor}60;
}
`;

  return {
    react: reactCode,
    tailwind: tailwindCode,
    html: htmlCode,
    css: cssCode,
  };
};
