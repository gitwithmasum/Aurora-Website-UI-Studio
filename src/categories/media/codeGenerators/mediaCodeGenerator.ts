import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateMediaCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Image as ImageIcon } from 'lucide-react';

interface ${compPascal}Props {
  title?: string;
  sourceUrl?: string;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  title = "${component.name}",
  sourceUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="p-5 border font-mono select-none overflow-hidden relative"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        color: '${settings.textColor || '#CCD0CF'}',
      }}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase">{title}</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
          ${variantId.toUpperCase()}
        </span>
      </div>

      <div className="w-full h-44 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center text-cyan-400 bg-cyan-950/60 hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
        </button>
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-5 border font-mono select-none overflow-hidden relative bg-[#11212DF8] border-cyan-500/30 rounded-lg text-slate-200"
>
  <div class="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-4">
    <div class="flex items-center gap-2">
      <span class="text-xs font-bold uppercase">${component.name}</span>
    </div>
    <span class="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
      ${variantId.toUpperCase()}
    </span>
  </div>
  <div class="w-full h-44 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
    <div class="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center text-cyan-400 bg-cyan-950/60">
      ▶
    </div>
  </div>
</div>
`;

  const htmlCode = `<div class="aurora-media-container" data-variant="${variantId}">
  <div class="media-header">
    <span class="media-title">${component.name}</span>
    <span class="media-badge">${variantId.toUpperCase()}</span>
  </div>
  <div class="media-stage">
    <button class="media-action-trigger">PLAY</button>
  </div>
</div>
`;

  const cssCode = `.aurora-media-container {
  padding: 1.25rem;
  font-family: monospace;
  background: ${settings.surfaceColor || '#11212D'};
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}50;
  border-radius: ${settings.borderRadius}px;
  color: ${settings.textColor || '#CCD0CF'};
}
.media-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.media-stage {
  height: 180px;
  background: #06141B;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.media-action-trigger {
  border: 1px solid ${settings.primaryColor};
  background: rgba(15, 150, 156, 0.2);
  color: ${settings.primaryColor};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
}
`;

  return { react: reactCode, tailwind: tailwindCode, html: htmlCode, css: cssCode };
};
