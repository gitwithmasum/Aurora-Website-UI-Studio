import { ComponentItem, CustomizationSettings } from '../../../types/studio';

export const generateEcommerceCode = (
  component: ComponentItem,
  variantId: string,
  settings: CustomizationSettings
) => {
  const compPascal = component.name.replace(/[^a-zA-Z0-9]/g, '');

  const reactCode = `import React, { useState } from 'react';
import { ShoppingCart, Heart, Plus, Minus } from 'lucide-react';

interface ${compPascal}Props {
  title?: string;
  price?: number;
}

export const ${compPascal}: React.FC<${compPascal}Props> = ({
  title = "${component.name}",
  price = 499,
}) => {
  const [qty, setQty] = useState(1);

  return (
    <div
      className="p-6 border font-mono select-none max-w-sm"
      style={{
        borderRadius: '${settings.borderRadius}px',
        backgroundColor: '${settings.surfaceColor || '#11212D'}F8',
        borderColor: '${settings.primaryColor}50',
        borderWidth: '${settings.borderWidth || 1}px',
        color: '${settings.textColor || '#CCD0CF'}',
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-white uppercase">{title}</span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
          ${variantId.toUpperCase()}
        </span>
      </div>

      <div className="h-32 rounded bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
        <span className="text-xs text-slate-500">Hardware Mockup</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-white">\${price * qty}</div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-cyan-400 bg-cyan-950/60 text-cyan-300 text-xs font-bold hover:bg-cyan-900">
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>BUY NOW</span>
        </button>
      </div>
    </div>
  );
};
`;

  const tailwindCode = `<!-- ${component.name} (${variantId.toUpperCase()}) -->
<div 
  class="p-6 border font-mono select-none max-w-sm bg-[#11212DF8] border-cyan-500/30 rounded-lg text-slate-200"
>
  <div class="flex justify-between items-center mb-4">
    <span class="text-xs font-bold text-white uppercase">${component.name}</span>
    <span class="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
      ${variantId.toUpperCase()}
    </span>
  </div>
  <div class="flex items-center justify-between">
    <span class="text-lg font-bold text-white">$499.00</span>
    <button class="px-4 py-2 rounded-lg border border-cyan-400 bg-cyan-950 text-cyan-300 text-xs font-bold">
      BUY NOW
    </button>
  </div>
</div>
`;

  const htmlCode = `<div class="aurora-ecommerce-card" data-variant="${variantId}">
  <div class="card-header">
    <span>${component.name}</span>
    <span class="badge">${variantId.toUpperCase()}</span>
  </div>
  <div class="card-body">
    <div class="price">$499.00</div>
    <button class="buy-btn">BUY NOW</button>
  </div>
</div>
`;

  const cssCode = `.aurora-ecommerce-card {
  padding: 1.5rem;
  font-family: monospace;
  background: ${settings.surfaceColor || '#11212D'};
  border: ${settings.borderWidth || 1}px solid ${settings.primaryColor}50;
  border-radius: ${settings.borderRadius}px;
  color: ${settings.textColor || '#CCD0CF'};
}
.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buy-btn {
  border: 1px solid ${settings.primaryColor};
  background: rgba(15, 150, 156, 0.2);
  color: ${settings.primaryColor};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
`;

  return { react: reactCode, tailwind: tailwindCode, html: htmlCode, css: cssCode };
};
