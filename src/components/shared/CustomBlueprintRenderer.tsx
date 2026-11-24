import React, { useMemo, useState, useEffect, useRef } from 'react';
import { CustomTemplate } from '../../types/studio';
import { Code2, Eye, Check, Copy, Sparkles } from 'lucide-react';

interface CustomBlueprintRendererProps {
  template: CustomTemplate;
}

/**
 * Extracts and compiles raw HTML/Tailwind markup from user-provided blueprint code snippets.
 * Supports:
 * - Pure HTML5 markup (<nav ...>, <header ...>, <div ...>)
 * - React JSX with arrow functions (`() => ( <header ...> )` or `() => { return ( <nav ...> ) }`)
 * - JSX attributes (className -> class, htmlFor -> for, style={{ ... }} -> style="...")
 * - Self-closing non-void tags (<span ... /> -> <span></span>)
 */
export const parseBlueprintSnippetToHTML = (snippet: string): string => {
  if (!snippet || !snippet.trim()) return '';

  let cleaned = snippet.trim();

  // 1. Arrow function with concise return: `=> ( <jsx> );`
  const arrowParenMatch = cleaned.match(/=>\s*\(\s*([\s\S]*?)\s*\)\s*;?\s*$/);
  if (arrowParenMatch && arrowParenMatch[1]) {
    cleaned = arrowParenMatch[1].trim();
  } else {
    // 2. Function with return (...): `return ( <jsx> );`
    const returnParenMatch = cleaned.match(/return\s*\(\s*([\s\S]*?)\s*\)\s*;?\s*\}?\s*;?$/);
    if (returnParenMatch && returnParenMatch[1]) {
      cleaned = returnParenMatch[1].trim();
    } else {
      // 3. Simple return without parentheses: `return <jsx>;`
      const simpleReturnMatch = cleaned.match(/return\s+([<][\s\S]*?[>])\s*;?\s*\}?\s*;?$/);
      if (simpleReturnMatch && simpleReturnMatch[1]) {
        cleaned = simpleReturnMatch[1].trim();
      }
    }
  }

  // 4. If code still contains outer JS wrappers or comments, slice between first tag and last tag
  if (!cleaned.startsWith('<')) {
    const lines = cleaned.split('\n');
    const nonCommentLines = lines.filter(
      (line) => !line.trim().startsWith('//') && !line.trim().startsWith('/*') && !line.trim().startsWith('*')
    );
    const joined = nonCommentLines.join('\n');
    const firstTagIndex = joined.indexOf('<');
    const lastTagIndex = joined.lastIndexOf('>');
    if (firstTagIndex !== -1 && lastTagIndex !== -1 && lastTagIndex > firstTagIndex) {
      cleaned = joined.substring(firstTagIndex, lastTagIndex + 1);
    }
  }

  // 5. Convert className to class
  cleaned = cleaned.replace(/\bclassName\s*=\s*(["'])/g, 'class=$1');
  cleaned = cleaned.replace(/\bclassName\s*=\s*\{`([^`]+)`\}/g, 'class="$1"');
  cleaned = cleaned.replace(/\bclassName\s*=\s*\{["']([^"']+)["']\}/g, 'class="$1"');

  // 6. Convert htmlFor to for
  cleaned = cleaned.replace(/\bhtmlFor\s*=/g, 'for=');

  // 7. Convert JSX style objects style={{ color: '#fff' }} to style="color: #fff"
  cleaned = cleaned.replace(/style=\{\{([^}]+)\}\}/g, (_match, inner) => {
    try {
      const cssProps = inner
        .split(',')
        .map((pair: string) => {
          const colonIdx = pair.indexOf(':');
          if (colonIdx === -1) return '';
          const key = pair.substring(0, colonIdx).trim();
          const val = pair.substring(colonIdx + 1).trim();
          if (!key || !val) return '';
          const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          const cleanVal = val.replace(/['"`]/g, '').trim();
          return `${kebabKey}: ${cleanVal}`;
        })
        .filter(Boolean)
        .join('; ');
      return `style="${cssProps}"`;
    } catch {
      return '';
    }
  });

  // 8. Convert self-closing non-void tags to paired tags in HTML
  const nonVoidTags = [
    'div', 'span', 'p', 'a', 'button', 'header', 'nav', 'section', 'article', 
    'aside', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 
    'table', 'tbody', 'thead', 'tr', 'td', 'th', 'form', 'label', 'svg', 'path', 'i'
  ];
  nonVoidTags.forEach((tag) => {
    const regex = new RegExp(`<(${tag})\\b([^>]*?)\\s*\\/>`, 'gi');
    cleaned = cleaned.replace(regex, '<$1$2></$1>');
  });

  return cleaned;
};

export const CustomBlueprintRenderer: React.FC<CustomBlueprintRendererProps> = ({ template }) => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [iframeHeight, setIframeHeight] = useState<number>(90);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const parsedHTML = useMemo(() => {
    try {
      return parseBlueprintSnippetToHTML(template.codeSnippet);
    } catch {
      return template.codeSnippet;
    }
  }, [template.codeSnippet]);

  // Build sandboxed HTML with full Tailwind CSS engine so ALL arbitrary classes, colors, and layouts work!
  const srcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html class="dark" style="background: transparent !important; background-color: transparent !important;">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: '#00f2fe',
            cyber: '#00f2fe'
          },
          boxShadow: {
            'glow-cyan': '0 0 20px rgba(0, 242, 254, 0.45)',
            'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.45)'
          }
        }
      }
    };
  </script>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 10px;
      background: transparent !important;
      background-color: transparent !important;
      color: #ccd0cf;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      overflow: hidden;
    }
    a { text-decoration: none; }
  </style>
</head>
<body class="dark antialiased" style="background: transparent !important; background-color: transparent !important;">
  ${parsedHTML}
  <script>
    function sendHeight() {
      const target = document.body.firstElementChild || document.body;
      const rect = target.getBoundingClientRect();
      const h = Math.ceil(rect.height || target.offsetHeight || 80);
      window.parent.postMessage({ type: 'AURORA_BLUEPRINT_RESIZE', height: h }, '*');
    }
    window.addEventListener('load', function() {
      sendHeight();
      if (window.ResizeObserver && document.body.firstElementChild) {
        new ResizeObserver(function() {
          sendHeight();
        }).observe(document.body.firstElementChild);
      }
    });
    setTimeout(sendHeight, 100);
    setTimeout(sendHeight, 300);
  </script>
</body>
</html>`;
  }, [parsedHTML]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'AURORA_BLUEPRINT_RESIZE' && typeof event.data.height === 'number') {
        const calculated = Math.ceil(event.data.height) + 24;
        setIframeHeight((prev) => {
          if (Math.abs(prev - calculated) > 4) {
            return Math.min(Math.max(calculated, 60), 800);
          }
          return prev;
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(template.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full relative flex flex-col items-center select-text">
      {/* Blueprint Control Bar */}
      <div className="w-full flex items-center justify-between mb-3 px-3 py-1.5 rounded-xl bg-black/60 border border-cyan-500/30 backdrop-blur-md text-[11px] font-mono shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan animate-pulse shrink-0" />
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] hidden sm:inline">
            CUSTOM USER BLUEPRINT:
          </span>
          <span className="text-white font-semibold truncate max-w-[180px] sm:max-w-none">
            {template.name}
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shrink-0 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
            <span>LIVE HTML / TAILWIND</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setViewMode(viewMode === 'preview' ? 'code' : 'preview')}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-[10px]"
            title="Toggle between Live Visual Preview and Source Code"
          >
            {viewMode === 'preview' ? (
              <>
                <Code2 className="w-3 h-3 text-cyan-400" />
                <span>View HTML</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-emerald-400" />
                <span>Live View</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
            title="Copy Blueprint Code"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Main Blueprint View */}
      {viewMode === 'preview' ? (
        <div className="w-full relative overflow-hidden transition-all duration-300 flex justify-center bg-transparent">
          {parsedHTML ? (
            <iframe
              ref={iframeRef}
              srcDoc={srcDoc}
              title={`Live Blueprint - ${template.name}`}
              className="w-full border-0 transition-all overflow-hidden"
              style={{ 
                height: `${iframeHeight}px`, 
                backgroundColor: 'transparent',
                colorScheme: 'dark'
              }}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-white/10 rounded-2xl w-full">
              No HTML or JSX code found in this blueprint. Click "View HTML" to inspect markup.
            </div>
          )}
        </div>
      ) : (
        <div className="w-full rounded-2xl bg-[#06141B] border border-cyan-500/30 p-4 font-mono text-xs text-cyan-300 overflow-x-auto select-text leading-relaxed">
          <pre>{template.codeSnippet}</pre>
        </div>
      )}
    </div>
  );
};
