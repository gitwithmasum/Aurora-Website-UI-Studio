import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  Star,
  Quote,
  CheckCircle2,
  Github,
  Globe,
  Play,
  Clock,
  BookOpen,
  ArrowRight,
  Server,
  Activity,
  Layers,
  Sparkles,
  Bookmark,
  Share2,
} from 'lucide-react';

// 14. Testimonial Card Simulator
export const TestimonialCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [helpfulCount, setHelpfulCount] = useState(14);
  const [voted, setVoted] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-6 group"
      >
        <Quote className="w-8 h-8 text-white/10 absolute top-4 right-4" />

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs font-mono text-slate-400 ml-2">5.0 / 5.0</span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed italic mb-6">
          "Aurora Studio completely revolutionized our design system throughput. The micro-interactions and volumetric neon lighting are lightyears ahead of conventional UI libraries."
        </p>

        {/* Client Author Info */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-black border"
              style={{
                backgroundColor: customizations.primaryColor,
                borderColor: `${customizations.primaryColor}80`,
              }}
            >
              DR
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1">
                <span>Dr. Elena Rostova</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              </h4>
              <p className="text-[10px] text-slate-400 font-mono">Head of UI @ Hyperion Dynamics</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playBlip(1200);
              if (!voted) {
                setHelpfulCount((c) => c + 1);
                setVoted(true);
              }
            }}
            className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
              voted ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            ★ {helpfulCount}
          </button>
        </div>
      </div>
    </div>
  );
};

// 15. Team Member Card Simulator
export const TeamMemberCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [contacted, setContacted] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF0',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-5 group text-center"
      >
        {/* Avatar Ring */}
        <div className="relative inline-block mb-3">
          <div 
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center font-bold text-xl border-2 p-1"
            style={{
              borderColor: customizations.primaryColor,
              boxShadow: `0 0 20px -3px ${customizations.primaryColor}60`,
              background: `radial-gradient(circle, ${customizations.primaryColor}30, #06141B)`,
            }}
          >
            <span style={{ color: customizations.primaryColor }}>K.V</span>
          </div>
          <span className="absolute bottom-1 right-2 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#11212D]" />
        </div>

        <h3 className="text-sm font-bold text-white mb-0.5">Kaelen Voss</h3>
        <p className="text-xs font-mono text-cyan-400 mb-3">Senior Quantum Architect</p>

        {/* Skill Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
          {['Zero-G React', 'WebGL Shaders', 'Subatomic Rust'].map((skill, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playConfirm();
            setContacted(!contacted);
          }}
          className="w-full py-2 rounded-xl text-xs font-semibold tracking-wide transition-all border"
          style={{
            backgroundColor: contacted ? 'transparent' : customizations.primaryColor,
            color: contacted ? customizations.primaryColor : '#06141B',
            borderColor: customizations.primaryColor,
          }}
        >
          {contacted ? 'TRANSMISSION SENT' : 'PING OPERATIVE'}
        </button>
      </div>
    </div>
  );
};

// 16. Course Card Simulator
export const CourseCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [progress, setProgress] = useState(68);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-5 group"
      >
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>14.5 HOURS TOTAL</span>
          </span>
          <span className="text-cyan-400 font-bold">MODULE 04 // 08</span>
        </div>

        <h3 className="text-sm font-bold text-white mb-1.5">Quantum Neural Interface Design</h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          Master the development of high-framerate sci-fi interfaces, custom GLSL shaders, and audio-reactive haptics.
        </p>

        {/* Progress Bar */}
        <div className="space-y-1.5 mb-5">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Course Progress</span>
            <span style={{ color: customizations.primaryColor }} className="font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: customizations.primaryColor,
                boxShadow: `0 0 10px ${customizations.primaryColor}`,
              }}
            />
          </div>
        </div>

        <button
          onClick={() => {
            sound.playConfirm();
            setProgress((p) => Math.min(100, p + 8));
          }}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          style={{
            backgroundColor: customizations.primaryColor,
            color: '#06141B',
          }}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>RESUME LECTURE 04</span>
        </button>
      </div>
    </div>
  );
};

// 17. Blog Card Simulator
export const BlogCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-5 group"
      >
        {/* Category Header */}
        <div className="flex items-center justify-between mb-3">
          <span 
            className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider border font-bold"
            style={{
              backgroundColor: `${customizations.primaryColor}20`,
              color: customizations.primaryColor,
              borderColor: `${customizations.primaryColor}40`,
            }}
          >
            ARCHITECTURE
          </span>
          <button
            onClick={() => {
              sound.playHover();
              setBookmarked(!bookmarked);
            }}
            className="text-slate-400 hover:text-white"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          The Future of Web Interfaces: From Flat to Atmospheric Spaciality
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          How modern browsers and GPU compositing are reintroducing depth, volumetric lighting, and tactical telemetry to web products.
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-slate-400">
          <span>By Alex Chen • 6 min read</span>
          <span className="font-mono text-cyan-400 hover:underline cursor-pointer flex items-center gap-1">
            READ <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

// 18. Project Card Simulator
export const ProjectCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [starred, setStarred] = useState(384);
  const [hasStarred, setHasStarred] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF2',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-5 group"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase">ACTIVE PROTOCOL</span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
            <Globe className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
          </div>
        </div>

        <h3 className="text-base font-bold text-white mb-1.5">Aurora Kernel v2.0</h3>
        <p className="text-xs text-slate-400 mb-4 line-clamp-2">
          Decentralized telemetry engine with zero-overhead state distribution and microsecond synchronization.
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {['TypeScript', 'Tailwind', 'Rust Core', 'WASM'].map((tech, idx) => (
            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/5 text-slate-300">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <button
            onClick={() => {
              sound.playConfirm();
              if (!hasStarred) {
                setStarred((s) => s + 1);
                setHasStarred(true);
              }
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white"
          >
            <Star className={`w-3.5 h-3.5 ${hasStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{starred} STARS</span>
          </button>

          <span className="text-[10px] font-mono text-slate-500">UPDATED 2H AGO</span>
        </div>
      </div>
    </div>
  );
};

// 19. Status Card Simulator
export const StatusCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [ping, setPing] = useState(14);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF2',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-5 group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-glow-emerald animate-pulse" />
            <h4 className="text-xs font-bold text-white font-mono uppercase">ALL SYSTEMS NOMINAL</h4>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            99.99% UPTIME
          </span>
        </div>

        {/* Server clusters */}
        <div className="space-y-2 mb-4">
          {[
            { name: 'API Cluster Global', status: 'Operational', latency: `${ping}ms` },
            { name: 'Subatomic Database Mesh', status: 'Operational', latency: `${ping + 4}ms` },
            { name: 'Edge CDN Relay', status: 'Operational', latency: `${ping - 2}ms` },
          ].map((srv, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-[#06141B] border border-white/5 flex items-center justify-between text-[11px] font-mono"
            >
              <span className="text-slate-300">{srv.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400">{srv.latency}</span>
                <span className="text-emerald-400">●</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playHover();
            setPing(Math.floor(10 + Math.random() * 8));
          }}
          className="w-full py-1.5 rounded-lg text-[10px] font-mono text-slate-400 hover:text-white border border-white/5 hover:bg-white/5 transition-all text-center"
        >
          [REFRESH CLUSTER PING]
        </button>
      </div>
    </div>
  );
};

// 20. Bento Grid Card Simulator
export const BentoGridCardSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [toggleActive, setToggleActive] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF2',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          backdropFilter: `blur(${customizations.blurIntensity}px)`,
        }}
        className="relative overflow-hidden border p-6 group"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            BENTO CELL // 2x1
          </span>
          <button
            onClick={() => {
              sound.playBlip(1300);
              setToggleActive(!toggleActive);
            }}
            className={`w-8 h-4 rounded-full p-0.5 transition-colors border ${
              toggleActive ? 'bg-cyan-500/30 border-cyan-400' : 'bg-black/50 border-white/20'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-white transition-transform ${
                toggleActive ? 'translate-x-4 bg-cyan-300' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <h3 className="text-base font-extrabold text-white mb-1">High-Throughput Bento Cell</h3>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Modular container cell optimized for asymmetric Bento grids with seamless visual density.
        </p>

        {/* Live metric mini widget */}
        <div className="p-3 rounded-xl bg-[#06141B] border border-white/5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">SYNAPSE RATE</div>
            <div className="text-sm font-mono font-bold text-white">4.2 GHz</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
