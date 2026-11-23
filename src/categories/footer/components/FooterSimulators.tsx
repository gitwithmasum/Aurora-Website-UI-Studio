import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import {
  Globe,
  ArrowUp,
  Github,
  Twitter,
  Disc as Discord,
  Linkedin,
  Send,
  Check,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { sound } from '../../../utils/soundEngine';

export const StandardFooterSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sound.playConfirm();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer
      className="p-8 border font-mono select-none w-full max-w-4xl relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-700/60">
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs"
              style={{ borderColor: customizations.primaryColor, color: customizations.primaryColor }}
            >
              AU
            </div>
            <span className="font-bold text-white text-sm tracking-wider">AURORA STUDIO</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Architecting next-generation autonomous UI components for tomorrow's cybernetic web.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] text-emerald-400 font-semibold">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Components</div>
          <div className="space-y-1.5 text-slate-400">
            <div className="hover:text-cyan-400 cursor-pointer transition-colors">01. Navigation Bars</div>
            <div className="hover:text-cyan-400 cursor-pointer transition-colors">02. Buttons & Actions</div>
            <div className="hover:text-cyan-400 cursor-pointer transition-colors">08. Data Visualizers</div>
            <div className="hover:text-cyan-400 cursor-pointer transition-colors">16. Advanced HUDs</div>
          </div>
        </div>

        {/* Links Col 2 */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Protocol Docs</div>
          <div className="space-y-1.5 text-slate-400">
            <div className="hover:text-cyan-400 cursor-pointer transition-colors">API Architecture</div>
            <div className="hover:text-cyan-400 cursor-pointer transition-colors">Design Tokens</div>
            <div className="hover:text-cyan-400 cursor-pointer transition-colors">Subagents Hub</div>
            <div className="hover:text-cyan-400 cursor-pointer transition-colors">Changelog v2.4</div>
          </div>
        </div>

        {/* Newsletter Col */}
        <div className="space-y-3">
          <div className="font-bold text-white uppercase tracking-wider text-[11px]">Neural Dispatch</div>
          <p className="text-xs text-slate-400">Receive bi-weekly UI blueprints and component drops.</p>
          <form onSubmit={handleSubscribe} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@aurora.io"
              className="w-full pl-3 pr-10 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center justify-center transition-all"
            >
              {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </form>
          {subscribed && (
            <div className="text-[10px] text-emerald-400 animate-fade-in">Encryption verified. Joined dispatch list!</div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} AURORA UI STUDIO. ALL RIGHTS RESERVED.</span>
          <span className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
            {variantId.toUpperCase()}
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          {[Github, Twitter, Discord, Linkedin].map((Icon, idx) => (
            <button
              key={idx}
              onClick={() => sound.playBlip()}
              className="w-8 h-8 rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-all text-slate-400 bg-slate-900/60"
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export const MinimalFooterSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [lang, setLang] = useState('EN');

  const scrollToTop = () => {
    sound.playConfirm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="px-6 py-4 border font-mono select-none w-full max-w-3xl relative overflow-hidden backdrop-blur-md flex flex-wrap items-center justify-between gap-4"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      <div className="flex items-center gap-3 text-xs">
        <span className="font-bold text-white tracking-wide">AURORA STUDIO</span>
        <span className="text-slate-600">&bull;</span>
        <span className="text-slate-400">MIT LICENSE</span>
        <span className="text-slate-600">&bull;</span>
        <span className="text-[10px] text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded bg-cyan-950/30">
          {variantId.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Pill */}
        <div className="flex items-center border border-slate-700 rounded-lg p-0.5 bg-slate-900 text-[10px]">
          {['EN', 'ES', 'JA', 'BN'].map((l) => (
            <button
              key={l}
              onClick={() => { sound.playBlip(); setLang(l); }}
              className={`px-2 py-0.5 rounded transition-all ${lang === l ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 text-xs transition-all"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
