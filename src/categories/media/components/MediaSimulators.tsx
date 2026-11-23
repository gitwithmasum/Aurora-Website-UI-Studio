import React, { useState, useRef } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { Play, Pause, Volume2, Maximize, Image as ImageIcon, Sliders, Eye, RefreshCw, ZoomIn, Film } from 'lucide-react';
import { sound } from '../../../utils/soundEngine';

export const ImageGallerySimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('ALL');

  const images = [
    { id: 1, title: 'Orbital Array', tag: 'CYBER', ratio: 'h-40', color: 'from-cyan-950 to-slate-900', border: customizations.primaryColor },
    { id: 2, title: 'Neural Matrix', tag: 'NET', ratio: 'h-48', color: 'from-blue-950 to-slate-900', border: '#4A5C6A' },
    { id: 3, title: 'Quantum Core', tag: 'CYBER', ratio: 'h-36', color: 'from-teal-950 to-slate-900', border: customizations.primaryColor },
    { id: 4, title: 'Sub-Relay 09', tag: 'RADAR', ratio: 'h-44', color: 'from-indigo-950 to-slate-900', border: '#4A5C6A' },
  ];

  const filtered = activeTab === 'ALL' ? images : images.filter(i => i.tag === activeTab);

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-2xl relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: `${customizations.primaryColor}22` }}>
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4" style={{ color: customizations.primaryColor }} />
          <span className="text-xs font-bold uppercase tracking-wider text-white">Visual Media Matrix</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">
            {variantId.toUpperCase()}
          </span>
        </div>
        <div className="flex gap-1.5 text-[10px]">
          {['ALL', 'CYBER', 'NET', 'RADAR'].map(tab => (
            <button
              key={tab}
              onClick={() => { sound.playBlip(); setActiveTab(tab); }}
              className={`px-2 py-0.5 rounded transition-all ${activeTab === tab ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-slate-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(img => (
          <div
            key={img.id}
            onClick={() => { sound.playConfirm(); setSelectedImg(img.id); }}
            className={`relative rounded-lg p-3 bg-gradient-to-br ${img.color} border cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between`}
            style={{ minHeight: '110px', borderColor: `${img.border}66` }}
          >
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span className="font-bold text-slate-300">{img.title}</span>
              <span className="px-1 py-0.2 rounded bg-black/50 text-[9px] text-cyan-400">#{img.tag}</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-all bg-black/40">
                <ZoomIn className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex justify-between items-center text-[9px] text-slate-500">
              <span>RAW: 3840x2160</span>
              <span className="text-cyan-400 group-hover:underline">INSPECT</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImg && (
        <div className="mt-4 p-3 rounded-lg border border-cyan-500/40 bg-black/60 flex items-center justify-between text-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-semibold">Active Lightbox Preview Node #{selectedImg}</span>
          </div>
          <button
            onClick={() => { sound.playBlip(); setSelectedImg(null); }}
            className="text-[10px] px-2 py-0.5 rounded border border-red-500/40 text-red-400 hover:bg-red-500/20"
          >
            DISMISS
          </button>
        </div>
      )}
    </div>
  );
};

export const VideoPlayerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(42);
  const [volume, setVolume] = useState(75);

  const togglePlay = () => {
    sound.playConfirm();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-2xl relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      {/* Video Viewport Area */}
      <div className="w-full h-56 rounded-lg border border-cyan-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-black relative flex flex-col justify-between p-4 overflow-hidden shadow-inner">
        <div className="flex justify-between items-center z-10 text-[10px]">
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-black/60 border border-cyan-500/30 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            LIVE STREAM FEED 1080P // 60FPS
          </div>
          <span className="text-slate-400">REC: 00:04:32</span>
        </div>

        {/* Center Play Button Overlay */}
        <div className="self-center z-10">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full border border-cyan-400 bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-cyan-500/30"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
        </div>

        {/* Bottom Status Grid */}
        <div className="z-10 flex justify-between items-end text-[10px] text-slate-400">
          <div>FEED: ENCRYPTED // LATENCY 4ms</div>
          <div className="text-cyan-400 font-bold">{isPlaying ? 'PLAYBACK STREAMING' : 'STREAM PAUSED'}</div>
        </div>

        {/* Scanline Background Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none opacity-40"></div>
      </div>

      {/* Cyber Scrubber & Controls */}
      <div className="mt-4 space-y-3">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>01:42</span>
            <span className="text-cyan-400">{progress}%</span>
            <span>04:15</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Actions Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="p-1.5 rounded hover:bg-slate-800 text-cyan-400">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500">{volume}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded border border-cyan-500/20 text-cyan-400 bg-cyan-950/30">
              {variantId.toUpperCase()}
            </span>
            <button onClick={() => sound.playBlip()} className="p-1.5 rounded hover:bg-slate-800 text-slate-300">
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AudioPlayerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const heights = [35, 70, 50, 95, 60, 40, 85, 90, 45, 65, 80, 55, 30, 90, 75, 40, 60, 85];

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-xl relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Disc / Play Icon */}
        <div
          onClick={() => { sound.playConfirm(); setIsPlaying(!isPlaying); }}
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${isPlaying ? 'border-cyan-400 shadow-lg shadow-cyan-500/30 bg-cyan-950/40' : 'border-slate-700 bg-slate-900 hover:border-slate-500'}`}
        >
          {isPlaying ? <Pause className="w-6 h-6 text-cyan-400" /> : <Play className="w-6 h-6 text-slate-300 ml-1" />}
        </div>

        {/* Track Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white truncate">CYBER_SYNTH_WAVE_V8.FLAC</span>
            <span className="text-[10px] text-cyan-400 font-semibold">{variantId.toUpperCase()}</span>
          </div>
          <div className="text-[10px] text-slate-400">AURORA SOUND LABS // 24-BIT 96kHz</div>

          {/* Spectrum Visualizer Waves */}
          <div className="flex items-end gap-1 h-7 mt-2">
            {heights.map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t transition-all duration-300"
                style={{
                  height: isPlaying ? `${h}%` : '20%',
                  backgroundColor: isPlaying ? customizations.primaryColor : '#4A5C6A',
                  opacity: isPlaying ? (i % 2 === 0 ? 1 : 0.7) : 0.4,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ComparisonSliderSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div
      className="p-6 border font-mono select-none w-full max-w-xl relative overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: `${customizations.borderRadius}px`,
        backgroundColor: `${customizations.surfaceColor || '#11212D'}FA`,
        borderColor: `${customizations.primaryColor}55`,
        borderWidth: `${customizations.borderWidth || 1}px`,
        color: customizations.textColor || '#CCD0CF',
      }}
    >
      <div className="flex justify-between items-center mb-3 text-xs">
        <span className="font-bold text-white uppercase tracking-wider">Hologram Comparison Slider</span>
        <span className="text-[10px] text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-950/30">
          {variantId.toUpperCase()}
        </span>
      </div>

      <div className="relative w-full h-52 rounded-lg border border-slate-700 overflow-hidden bg-slate-950">
        {/* Layer 1: Rendered Output */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 flex items-center justify-center p-6 text-center">
          <div>
            <div className="text-xl font-extrabold text-cyan-300 drop-shadow-md">RAY-TRACED SHADER</div>
            <div className="text-xs text-cyan-200/70 mt-1">4K Neural Volumetric Pass</div>
          </div>
        </div>

        {/* Layer 2: Wireframe (clipped by sliderPos) */}
        <div
          className="absolute inset-y-0 left-0 bg-slate-900 border-r-2 border-cyan-400 flex items-center justify-center p-6 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="w-80 text-center shrink-0">
            <div className="text-xl font-mono text-slate-300">WIREFRAME MESH</div>
            <div className="text-xs text-slate-500 mt-1">Raw Topology // 142k Polys</div>
          </div>
        </div>

        {/* Center Draggable Bar Handle */}
        <div
          className="absolute inset-y-0 -ml-3 w-6 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-400/50">
            <Sliders className="w-3.5 h-3.5 rotate-90" />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>&larr; WIREFRAME</span>
          <span>CURTAIN POS: {sliderPos}%</span>
          <span>PHOTOREAL &rarr;</span>
        </div>
      </div>
    </div>
  );
};
