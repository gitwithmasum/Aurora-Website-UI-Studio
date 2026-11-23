import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateFooterCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React from 'react';
import { ArrowUp, Github, Twitter, Linkedin } from 'lucide-react';

interface ${compPascal}Props {
  brandName?: string;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  brandName = "AURORA STUDIO",
}) => {
  return (
    <footer
      className="p-6 border font-mono select-none flex flex-col md:flex-row items-center justify-between gap-4"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        color: '${settings.textColor || '#CCD0CF'}',
      }}
    >
      <div className="flex items-center gap-3">
        <span className="font-bold text-white text-sm">{brandName}</span>
        <span className="text-slate-500">|</span>
        <span className="text-xs text-slate-400">&copy; {new Date().getFullYear()} All Rights Reserved.</span>
      </div>

      <div className="flex items-center gap-3">
        <a href="#github" className="p-1.5 rounded hover:text-cyan-400 text-slate-400 transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <a href="#twitter" className="p-1.5 rounded hover:text-cyan-400 text-slate-400 transition-colors">
          <Twitter className="w-4 h-4" />
        </a>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        >
          <span>TOP</span>
          <ArrowUp className="w-3 h-3" />
        </button>
      </div>
    </footer>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<footer 
  class="p-6 border font-mono select-none flex flex-col md:flex-row items-center justify-between gap-4 bg-[#11212DF8] border-cyan-500/30 rounded-lg text-slate-300"
>
  <div class="flex items-center gap-3">
    <span class="font-bold text-white text-sm">AURORA STUDIO</span>
    <span class="text-xs text-slate-400">&copy; 2026 All Rights Reserved.</span>
  </div>
  <div class="flex items-center gap-3 text-xs">
    <a href="#" class="text-slate-400 hover:text-cyan-400">Documentation</a>
    <a href="#" class="text-slate-400 hover:text-cyan-400">Privacy</a>
    <a href="#" class="text-slate-400 hover:text-cyan-400">Terms</a>
  </div>
</footer>
`;

  const htmlCode = `<footer class="aurora-footer" data-variant="${variantId}">
  <div class="footer-left">
    <strong>AURORA STUDIO</strong>
    <span>&copy; 2026 All Rights Reserved.</span>
  </div>
  <div class="footer-right">
    <a href="#privacy">Privacy</a>
    <a href="#terms">Terms</a>
  </div>
</footer>
`;

  const cssCode = `.aurora-footer {
  padding: 1.5rem;
  font-family: monospace;
  background: ${settings.surfaceColor || '#11212D'};
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}50;
  border-radius: ${settings.borderRadius}px;
  color: ${settings.textColor || '#CCD0CF'};
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-left {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.footer-right a {
  color: ${settings.primaryColor};
  text-decoration: none;
  margin-left: 1rem;
}
`;

  return { react: reactCode, tailwind: tailwindCode, html: htmlCode, css: cssCode };
};
