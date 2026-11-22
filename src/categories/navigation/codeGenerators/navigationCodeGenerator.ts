import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export function generateComponentCode(
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) {
  const compNamePascal = component.name.replace(/[^a-zA-Z0-9]/g, '');
  const {
    primaryColor,
    accentColor,
    bgColor,
    textColor,
    borderRadius,
    borderWidth,
    borderColor,
    shadowStyle,
    blurIntensity,
    fontSize,
    paddingY,
    paddingX,
    gap,
  } = settings;

  // React JSX Preview
  const reactCode = `import React, { useState } from 'react';
import { Sparkles, Search, Bell, Command, ChevronDown } from 'lucide-react';

export const ${compNamePascal} = () => {
  const [activeItem, setActiveItem] = useState('Overview');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header 
      className="w-full flex items-center justify-between border shadow-xl transition-all"
      style={{
        backgroundColor: '${bgColor}',
        color: '${textColor}',
        borderRadius: '${borderRadius}px',
        borderWidth: '${borderWidth}px',
        borderColor: '${borderColor}',
        backdropFilter: 'blur(${blurIntensity}px)',
        padding: '${paddingY}px ${paddingX}px',
        gap: '${gap}px',
        boxShadow: '${shadowStyle === 'glow' ? `0 0 25px ${primaryColor}40` : shadowStyle === 'neon' ? `0 0 15px ${primaryColor}80` : 'none'}',
      }}
    >
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div 
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-inner"
          style={{ background: 'linear-gradient(135deg, ${primaryColor}, ${accentColor})' }}
        >
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="font-bold tracking-tight text-sm">${component.name.toUpperCase()}</span>
          <span className="block text-[10px] opacity-60">Variant: ${variantId}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-2">
        {['Overview', 'Telemetry', 'Deployments', 'Settings'].map((item) => (
          <button
            key={item}
            onClick={() => setActiveItem(item)}
            className={\`px-3 py-1.5 rounded-lg text-xs font-medium transition-all \${
              activeItem === item ? 'font-semibold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }\`}
            style={activeItem === item ? {
              backgroundColor: '${primaryColor}20',
              color: '${primaryColor}',
              border: '1px solid ${primaryColor}40',
            } : undefined}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button 
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black transition-transform active:scale-95"
          style={{ 
            backgroundColor: '${primaryColor}',
            boxShadow: '0 0 15px ${primaryColor}60'
          }}
        >
          Launch Action
        </button>
      </div>
    </header>
  );
};

export default ${compNamePascal};`;

  // HTML Preview
  const htmlCode = `<!-- ${component.name} (${variantId}) -->
<header 
  class="header-container"
  style="background-color: ${bgColor}; color: ${textColor}; border-radius: ${borderRadius}px; border: ${borderWidth}px solid ${borderColor}; padding: ${paddingY}px ${paddingX}px; backdrop-filter: blur(${blurIntensity}px);"
>
  <div class="brand">
    <div class="logo" style="background: linear-gradient(135deg, ${primaryColor}, ${accentColor});">
      ✦
    </div>
    <span class="title">${component.name}</span>
  </div>

  <nav class="nav-links">
    <a href="#overview" class="nav-item active" style="color: ${primaryColor};">Overview</a>
    <a href="#telemetry" class="nav-item">Telemetry</a>
    <a href="#deployments" class="nav-item">Deployments</a>
    <a href="#settings" class="nav-item">Settings</a>
  </nav>

  <div class="actions">
    <button class="cta-btn" style="background-color: ${primaryColor};">
      Launch Action
    </button>
  </div>
</header>`;

  // CSS Preview
  const cssCode = `/* ${component.name} Stylesheet */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${bgColor};
  color: ${textColor};
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderColor};
  padding: ${paddingY}px ${paddingX}px;
  gap: ${gap}px;
  backdrop-filter: blur(${blurIntensity}px);
  -webkit-backdrop-filter: blur(${blurIntensity}px);
  box-shadow: ${shadowStyle === 'glow' ? `0 0 25px ${primaryColor}40` : shadowStyle === 'neon' ? `0 0 15px ${primaryColor}80` : '0 10px 25px -5px rgba(0, 0, 0, 0.4)'};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  text-decoration: none;
  opacity: 0.75;
  transition: all 0.2s ease;
}

.nav-item:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}

.nav-item.active {
  opacity: 1;
  font-weight: 600;
  background: ${primaryColor}20;
  border: 1px solid ${primaryColor}40;
}

.cta-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #000000;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.cta-btn:hover {
  transform: translateY(-1px);
}`;

  // Tailwind CSS snippet
  const tailwindCode = `<!-- Tailwind CSS Container Snippet -->
<header 
  class="w-full flex items-center justify-between px-6 py-3 border shadow-2xl transition-all"
  style="background-color: ${bgColor}; color: ${textColor}; border-radius: ${borderRadius}px; border-color: ${borderColor}; backdrop-filter: blur(${blurIntensity}px);"
>
  <div class="flex items-center gap-3">
    <div 
      class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-inner"
      style="background: linear-gradient(135deg, ${primaryColor}, ${accentColor});"
    >
      ✦
    </div>
    <span class="font-bold text-sm tracking-tight">${component.name}</span>
  </div>

  <nav class="flex items-center gap-1 text-xs font-medium">
    <button 
      class="px-3 py-1.5 rounded-lg font-semibold"
      style="background-color: ${primaryColor}20; color: ${primaryColor}; border: 1px solid ${primaryColor}40;"
    >
      Overview
    </button>
    <button class="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5">
      Telemetry
    </button>
    <button class="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5">
      Deployments
    </button>
  </nav>

  <button 
    class="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black active:scale-95 transition-transform"
    style="background-color: ${primaryColor}; box-shadow: 0 0 15px ${primaryColor}60;"
  >
    Launch Action
  </button>
</header>`;

  return {
    react: reactCode,
    html: htmlCode,
    css: cssCode,
    tailwind: tailwindCode,
  };
}
