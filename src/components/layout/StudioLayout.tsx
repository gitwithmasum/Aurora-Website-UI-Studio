import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { Inspector } from './Inspector';
import { CommandPalette } from './CommandPalette';
import { TelemetryBar } from './TelemetryBar';
import { TemplateInjectorModal } from '../shared/TemplateInjectorModal';
import { NavigationRenderer } from '../../categories/navigation/NavigationRenderer';
import { CodePlayground } from '../shared/CodePlayground';
import { InteractionMatrix } from '../shared/InteractionMatrix';
import { SavePresetModal } from '../shared/SavePresetModal';
import { ExportModal } from '../shared/ExportModal';
import { 
  Sparkles, 
  Layers, 
  Maximize2, 
  Grid, 
  ZoomIn, 
  ZoomOut, 
  Smartphone, 
  Laptop, 
  Monitor, 
  Tablet,
  Check,
  Plus
} from 'lucide-react';
import { CanvasBackgroundType } from '../../context/StudioContext';
import { sound } from '../../utils/soundEngine';

export const StudioLayout: React.FC = () => {
  const { 
    activeComponent, 
    activeVariantId, 
    setActiveVariantId, 
    activeTab, 
    deviceMode,
    canvasBg,
    setCanvasBg,
    customizations,
    crtEnabled,
    hudMode,
    setIsTemplateInjectorOpen
  } = useStudio();

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [zoom, setZoom] = useState(100);

  // Viewport width mapping
  const deviceWidthMap = {
    desktop: 'w-full',
    laptop: 'max-w-5xl',
    tablet: 'max-w-3xl',
    mobile: 'max-w-sm',
  };

  // Canvas background pattern
  const canvasBgClassMap: Record<CanvasBackgroundType, string> = {
    radar: 'bg-radar-pattern bg-[#050811]',
    grid: 'bg-grid-pattern bg-[#050811]',
    dots: 'bg-dots-pattern bg-[#050811]',
    mesh: 'bg-cyberpunk-mesh bg-[#050811]',
    dark: 'bg-[#03050a]',
    light: 'bg-[#f1f5f9] text-slate-900',
  };

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden bg-[#050811] text-slate-100 antialiased font-sans ${crtEnabled ? 'crt-scanlines' : ''}`}>
      {/* Upper Area: Sidebar + Main Content + Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. Left Sidebar */}
        <Sidebar />

        {/* 2. Main Studio Core */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Navbar */}
          <TopNavbar 
            onOpenSavePreset={() => setIsSaveModalOpen(true)}
            onOpenExport={() => setIsExportModalOpen(true)}
          />

          {/* Workspace Body */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Main Stage */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Component Header & Variant Switcher */}
              <div className="px-6 py-2.5 border-b border-cyan-500/15 bg-[#050811]/90 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
                      <span>{activeComponent.name}</span>
                    </h1>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 capitalize">
                      {activeComponent.subcategory}
                    </span>
                    <span className="hidden md:inline text-[10px] font-mono text-slate-500">
                      // ID: {activeComponent.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 max-w-2xl line-clamp-1">
                    {activeComponent.description}
                  </p>
                </div>

                {/* Design Variant Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                  <span className="text-[9px] font-mono uppercase text-cyan-500/60 font-bold shrink-0 mr-1">
                    TEMPLATES:
                  </span>
                  {activeComponent.variations.map((v) => {
                    const isSelected = activeVariantId === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          sound.playBlip(1400);
                          setActiveVariantId(v.id);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-cyan-300 font-semibold border border-cyan-500/50 shadow-glow-cyan'
                            : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {v.name}
                      </button>
                    );
                  })}

                  {/* Quick Blueprint Injector Button */}
                  <button
                    onClick={() => {
                      sound.playScan();
                      setIsTemplateInjectorOpen(true);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-dashed border-cyan-500/30 text-xs transition-colors shrink-0"
                    title="Inject a custom template or blueprint for this component"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Custom</span>
                  </button>
                </div>
              </div>

              {/* Dynamic View Tab Rendering */}
              <div className="flex-1 overflow-hidden relative flex flex-col">
                {activeTab === 'preview' && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Canvas Viewport Toolbar */}
                    <div className="px-6 py-1.5 border-b border-white/5 bg-[#070b16]/70 flex items-center justify-between text-xs text-slate-400 shrink-0">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] text-cyan-400">
                          VIEWPORT: {deviceMode.toUpperCase()} ({deviceWidthMap[deviceMode]})
                        </span>
                        <span className="hidden sm:inline text-slate-700">|</span>
                        <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
                          THEME: {customizations.theme.toUpperCase()}
                        </span>
                      </div>

                      {/* Canvas Background and Zoom Controls */}
                      <div className="flex items-center gap-2">
                        {/* Background switcher */}
                        <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10">
                          {(['radar', 'grid', 'dots', 'mesh', 'dark', 'light'] as CanvasBackgroundType[]).map((bg) => (
                            <button
                              key={bg}
                              onClick={() => {
                                sound.playBlip(1100);
                                setCanvasBg(bg);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition-all ${
                                canvasBg === bg ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              {bg}
                            </button>
                          ))}
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
                          <button 
                            onClick={() => {
                              sound.playHover();
                              setZoom((z) => Math.max(50, z - 10));
                            }}
                            className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white"
                            title="Zoom Out"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] font-mono px-1.5 text-slate-300">{zoom}%</span>
                          <button 
                            onClick={() => {
                              sound.playHover();
                              setZoom((z) => Math.min(150, z + 10));
                            }}
                            className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white"
                            title="Zoom In"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Live Canvas with Atmospheric Stage & Reticle Framing */}
                    <div 
                      className={`flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center transition-all atmospheric-stage ${canvasBgClassMap[canvasBg]}`}
                      style={{ '--stage-flare': `${customizations.primaryColor}80` } as React.CSSProperties}
                    >
                      <div 
                        className={`w-full transition-all duration-300 flex items-center justify-center relative z-10 ${deviceWidthMap[deviceMode]} ${hudMode === 'tactical' ? 'cyber-box p-4' : ''}`}
                        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
                      >
                        <NavigationRenderer />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && <CodePlayground />}
                {activeTab === 'matrix' && <InteractionMatrix />}
              </div>
            </main>

            {/* 3. Right Customization Inspector */}
            <Inspector />
          </div>
        </div>
      </div>

      {/* 4. Bottom Tactical Telemetry Bar */}
      <TelemetryBar />

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Template Injector & Blueprint Vault Modal */}
      <TemplateInjectorModal />

      {/* Save Preset Modal */}
      <SavePresetModal 
        isOpen={isSaveModalOpen} 
        onClose={() => setIsSaveModalOpen(false)} 
      />

      {/* Export Modal */}
      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
      />
    </div>
  );
};
