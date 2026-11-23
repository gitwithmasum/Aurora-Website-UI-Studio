import React, { useState, useRef } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Zap, 
  Github, 
  Twitter, 
  Linkedin, 
  Link2,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ButtonProps {
  variantId: string;
}

// 15. Animated Button Simulator
export const AnimatedButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <div className="relative inline-block p-[1px] overflow-hidden rounded-2xl group">
        {/* Animated Conic Laser Border Sweep */}
        <span 
          className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] opacity-80"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${customizations.primaryColor} 50%, transparent 100%)`
          }}
        />

        <button
          onClick={() => sound.playConfirm()}
          onMouseEnter={() => {
            sound.playHover();
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
          className="relative px-7 py-3 rounded-2xl bg-[#06141B] text-xs font-semibold text-white flex items-center gap-2.5 transition-all cursor-pointer backdrop-blur-xl"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="tracking-wide">QUANTUM PERIMETER BEAM</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · CONTINUOUS CONIC LASER BORDER SWEEP
      </span>
    </div>
  );
};

// 16. Magnetic Button Simulator
export const MagneticButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        ref={buttonRef}
        onClick={() => sound.playConfirm()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => sound.playHover()}
        className="relative px-8 py-4 rounded-full text-xs font-bold text-white transition-transform duration-100 ease-out cursor-pointer shadow-2xl border border-cyan-500/40"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          backgroundColor: `${customizations.primaryColor}25`,
          boxShadow: `0 10px 30px -5px ${customizations.primaryColor}70`,
        }}
      >
        <span 
          className="relative z-10 flex items-center gap-2 transition-transform duration-75"
          style={{ transform: `translate(${position.x * 0.5}px, ${position.y * 0.5}px)` }}
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>MAGNETIC CURSOR PULL</span>
        </span>
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · HOVER AND MOVE CURSOR TO TEST SPRING PHYSICS
      </span>
    </div>
  );
};

// 17. Neon Button Simulator
export const NeonButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [flickering, setFlickering] = useState(false);

  const handleClick = () => {
    sound.playConfirm();
    setFlickering(true);
    setTimeout(() => setFlickering(false), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <button
        onClick={handleClick}
        className={`px-8 py-3 rounded-xl font-mono text-xs font-bold tracking-widest text-cyan-300 transition-all cursor-pointer border ${
          flickering ? 'opacity-40 scale-95' : 'opacity-100'
        }`}
        style={{
          backgroundColor: '#04060C',
          borderColor: customizations.primaryColor,
          color: customizations.primaryColor,
          textShadow: `0 0 8px ${customizations.primaryColor}, 0 0 20px ${customizations.primaryColor}`,
          boxShadow: `0 0 20px -2px ${customizations.primaryColor}80, 0 0 50px -10px ${customizations.primaryColor}40, inset 0 0 15px -3px ${customizations.primaryColor}40`,
        }}
      >
        <span>CYBER_PHOSPHOR_V8</span>
      </button>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · CLICK TO TRIGGER CATHODE FLICKER
      </span>
    </div>
  );
};

// 18. Social Login Button Simulator
export const SocialLoginButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    sound.playConfirm();
    setActiveProvider(name);
    setTimeout(() => setActiveProvider(null), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 w-full max-w-xs">
      <div className="flex flex-col gap-2.5 w-full">
        {/* GitHub */}
        <button
          onClick={() => handleLogin('github')}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/30 text-xs font-medium text-white transition-all cursor-pointer shadow"
        >
          <Github className="w-4 h-4" />
          <span>{activeProvider === 'github' ? 'AUTHENTICATING...' : 'Continue with GitHub'}</span>
        </button>

        {/* Web3 Ethereum */}
        <button
          onClick={() => handleLogin('web3')}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all cursor-pointer shadow-glow-cyan"
        >
          <Cpu className="w-4 h-4" />
          <span>{activeProvider === 'web3' ? '0x889F...7A12 CONNECTED' : 'Connect Web3 Wallet'}</span>
        </button>

        {/* Google Cloud Spatial */}
        <button
          onClick={() => handleLogin('google')}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-medium text-slate-200 transition-all cursor-pointer"
        >
          <span className="font-bold text-sm text-cyan-400">G</span>
          <span>{activeProvider === 'google' ? 'VERIFYING SESSION...' : 'Sign in with Google'}</span>
        </button>
      </div>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · MULTI-PROVIDER AUTHENTICATION
      </span>
    </div>
  );
};

// 19. Copy Button Simulator
export const CopyButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    sound.playConfirm();
    navigator.clipboard?.writeText('npx create-aurora-studio@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-black/60 border border-cyan-500/30 shadow-lg">
        <code className="text-xs font-mono text-cyan-300">npx create-aurora-studio@latest</code>
        
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            copied 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'COPIED!' : 'COPY'}</span>
        </button>
      </div>

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · CLICK TO COPY CODE SNIPPET TO CLIPBOARD
      </span>
    </div>
  );
};

// 20. Share Button Simulator
export const ShareButtonSimulator: React.FC<ButtonProps> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    sound.playScan();
    setShowShareModal(!showShareModal);
  };

  const copyUrl = () => {
    sound.playConfirm();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/40 text-xs font-medium text-cyan-300 transition-all cursor-pointer shadow-glow-cyan"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>BROADCAST COMPONENT</span>
      </button>

      {showShareModal && (
        <div className="absolute top-16 p-3 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl z-40 w-64 animate-in fade-in zoom-in-95">
          <div className="text-[10px] font-mono text-slate-400 mb-2 font-bold uppercase">
            Share Component Protocol
          </div>
          <div className="space-y-1.5">
            <button
              onClick={copyUrl}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white"
            >
              <div className="flex items-center gap-2">
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copiedLink ? 'Link Copied!' : 'Copy Public Link'}</span>
              </div>
              {copiedLink && <Check className="w-3 h-3 text-emerald-400" />}
            </button>
            <button
              onClick={() => {
                sound.playBlip(1400);
                window.open('https://twitter.com/intent/tweet?text=Exploring%20Aurora%20UI%20Studio%20futuristic%20components!', '_blank');
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white"
            >
              <Twitter className="w-3.5 h-3.5 text-cyan-400" />
              <span>Share on X (Twitter)</span>
            </button>
          </div>
        </div>
      )}

      <span className="text-[11px] font-mono text-slate-500">
        // TEMPLATE: {variantId.toUpperCase()} · WEB DISTRIBUTION POPUP MODAL
      </span>
    </div>
  );
};
