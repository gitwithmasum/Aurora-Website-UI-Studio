import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { Inspector } from './Inspector';
import { CommandPalette } from './CommandPalette';
import { TelemetryBar } from './TelemetryBar';
import { TemplateInjectorModal } from '../shared/TemplateInjectorModal';
import { NavigationRenderer } from '../../categories/navigation/NavigationRenderer';
import { ButtonRenderer } from '../../categories/buttons/ButtonRenderer';
import { CardRenderer } from '../../categories/cards/CardRenderer';
import { FormRenderer } from '../../categories/forms/FormRenderer';
import { OverlayRenderer } from '../../categories/overlays/OverlayRenderer';
import { ProgressRenderer } from '../../categories/progress/ProgressRenderer';
import { NotificationFeedbackRenderer } from '../../categories/notifications/NotificationFeedbackRenderer';
import { DataVizRenderer } from '../../categories/dataviz/DataVizRenderer';
import { TableRenderer } from '../../categories/tables/TableRenderer';
import { UserProfileRenderer } from '../../categories/profile/UserProfileRenderer';
import { MediaRenderer } from '../../categories/media/MediaRenderer';
import { FooterRenderer } from '../../categories/footer/FooterRenderer';
import { AnimationRenderer } from '../../categories/animations/AnimationRenderer';
import { LayoutRenderer } from '../../categories/layout/LayoutRenderer';
import { EcommerceRenderer } from '../../categories/ecommerce/EcommerceRenderer';
import { SpecialRenderer } from '../../categories/special/SpecialRenderer';
import { CodePlayground } from '../shared/CodePlayground';
import { InteractionMatrix } from '../shared/InteractionMatrix';
import { SavePresetModal } from '../shared/SavePresetModal';
import { ExportModal } from '../shared/ExportModal';
import { StyleSamplesModal } from '../shared/StyleSamplesModal';
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
    activeCategory,
    activeComponent, 
    activeVariantId, 
    setActiveVariantId, 
    activeTab, 
    deviceMode,
    setDeviceMode,
    canvasBg,
    setCanvasBg,
    customizations,
    crtEnabled,
    hudMode,
    setIsTemplateInjectorOpen
  } = useStudio();

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isStyleSamplesOpen, setIsStyleSamplesOpen] = useState(false);
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
    <div className={`flex flex-col h-screen w-screen max-w-full overflow-hidden bg-[#050811] text-slate-100 antialiased font-sans ${crtEnabled ? 'crt-scanlines' : ''}`}>
      {/* Upper Area: Sidebar + Main Content + Inspector */}
      <div className="flex-1 flex overflow-hidden min-w-0 w-full relative">
        {/* 1. Left Sidebar */}
        <Sidebar />

        {/* 2. Main Studio Core */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden w-full">
          {/* Top Navbar */}
          <TopNavbar 
            onOpenSavePreset={() => setIsSaveModalOpen(true)}
            onOpenExport={() => setIsExportModalOpen(true)}
            onOpenStyleSamples={() => setIsStyleSamplesOpen(true)}
          />

          {/* Workspace Body */}
          <div className="flex-1 min-w-0 flex overflow-hidden relative w-full">
            {/* Main Stage */}
            <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden w-full">
              {/* Component Header & Variant Switcher */}
              <div className="px-3 sm:px-6 py-2.5 border-b border-[#253745]/70 bg-gradient-to-r from-[#06141B]/95 via-[#11212D]/90 to-[#0A1622]/95 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 min-w-0 w-full relative">
                {/* Holographic Top Laser Hairline Accent */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

                {/* Left: Component Identity & Node Telemetry */}
                <div className="min-w-0 flex items-center gap-3">
                  <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cyan-400 via-teal-400 to-blue-500 shadow-glow-cyan shrink-0 hidden sm:block" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                      <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-mono flex items-center gap-2 truncate">
                        <span>{activeComponent.name}</span>
                      </h1>
                      {/* Futuristic Subcategory Tag */}
                      <span className="text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-400/30 uppercase flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-glow-cyan" />
                        <span>{activeComponent.subcategory}</span>
                      </span>
                      {/* Telemetry Node Identifier */}
                      <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400">
                        <span className="text-slate-600">//</span>
                        <span>NODE:</span>
                        <span className="text-cyan-400/90 font-bold">#{activeComponent.id.toUpperCase()}</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 max-w-2xl line-clamp-1 truncate font-sans">
                      {activeComponent.description}
                    </p>
                  </div>
                </div>

                {/* Right: Futuristic HUD Template & Variant Dock */}
                <div className="flex items-center gap-2 shrink-0 max-w-full min-w-0">
                  <div className="flex items-center p-1 rounded-xl bg-black/60 border border-cyan-500/20 backdrop-blur-md shadow-lg min-w-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex items-center gap-1.5 px-2 shrink-0 text-[10px] font-mono uppercase text-cyan-400 font-bold border-r border-white/10 mr-1">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">Templates:</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {activeComponent.variations.map((v) => {
                        const isSelected = activeVariantId === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => {
                              sound.playBlip(1400);
                              setActiveVariantId(v.id);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                              isSelected
                                ? 'bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-blue-500/30 text-cyan-200 font-bold border border-cyan-400/60 shadow-glow-cyan'
                                : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                            }`}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow-cyan animate-pulse shrink-0" />
                            )}
                            <span>{v.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick Blueprint Injector Button */}
                    <button
                      onClick={() => {
                        sound.playScan();
                        setIsTemplateInjectorOpen(true);
                      }}
                      className="ml-1 px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-100 border border-dashed border-cyan-400/40 hover:border-cyan-400 text-xs font-mono font-medium flex items-center gap-1 transition-all shrink-0 group"
                      title="Inject a custom template or blueprint for this component"
                    >
                      <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform text-cyan-400" />
                      <span className="hidden md:inline">Inject</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic View Tab Rendering */}
              <div className="flex-1 overflow-hidden relative flex flex-col min-w-0 w-full">
                {activeTab === 'preview' && (
                  <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
                    {/* Canvas Viewport Toolbar */}
                    <div className="px-3 sm:px-6 py-2 border-b border-white/5 bg-[#06141B]/95 backdrop-blur-md flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs text-slate-400 shrink-0 min-w-0 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {/* Left: Device Mode Dock & Stage Telemetry */}
                      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 shrink-0">
                        {/* Device Mode Selector Dock */}
                        <div className="flex items-center bg-black/60 p-0.5 rounded-xl border border-white/10 shadow-inner shrink-0">
                          {[
                            { id: 'desktop', label: 'Desktop (1440×900)', icon: Monitor },
                            { id: 'laptop', label: 'Laptop (1024×768)', icon: Laptop },
                            { id: 'tablet', label: 'Tablet (768×1024)', icon: Tablet },
                            { id: 'mobile', label: 'Mobile (390×844)', icon: Smartphone },
                          ].map((dm) => {
                            const Icon = dm.icon;
                            const isActive = deviceMode === dm.id;
                            return (
                              <button
                                key={dm.id}
                                onClick={() => {
                                  sound.playBlip(1400);
                                  setDeviceMode(dm.id as any);
                                }}
                                className={`p-1.5 rounded-lg transition-all ${
                                  isActive 
                                    ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-glow-cyan' 
                                    : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                                }`}
                                title={dm.label}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </button>
                            );
                          })}
                        </div>

                        {/* Tactical Telemetry Badge */}
                        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] shrink-0">
                          <span className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-bold flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{deviceMode.toUpperCase()} ({deviceWidthMap[deviceMode]})</span>
                          </span>
                          <span className="text-slate-600 hidden md:inline">•</span>
                          <span className="text-slate-400 hidden md:inline truncate">
                            THEME: <span className="text-cyan-400 font-bold">{customizations.theme.toUpperCase()}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right: Canvas Background and Zoom Controls */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        {/* Background Matrix Switcher */}
                        <div className="flex items-center bg-black/60 p-0.5 rounded-xl border border-white/10 shadow-inner overflow-x-auto [&::-webkit-scrollbar]:hidden shrink-0">
                          {(['radar', 'grid', 'dots', 'mesh', 'dark', 'light'] as CanvasBackgroundType[]).map((bg) => (
                            <button
                              key={bg}
                              onClick={() => {
                                sound.playBlip(1100);
                                setCanvasBg(bg);
                              }}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono capitalize transition-all whitespace-nowrap ${
                                canvasBg === bg 
                                  ? 'bg-cyan-500/25 text-cyan-200 font-bold border border-cyan-400/40 shadow-glow-cyan' 
                                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                              }`}
                            >
                              {bg}
                            </button>
                          ))}
                        </div>

                        {/* Precision HUD Zoom Controls */}
                        <div className="flex items-center bg-black/60 rounded-xl border border-white/10 p-0.5 shadow-inner shrink-0">
                          <button 
                            onClick={() => {
                              sound.playHover();
                              setZoom((z) => Math.max(50, z - 10));
                            }}
                            className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                            title="Zoom Out (Min 50%)"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              sound.playHover();
                              setZoom(100);
                            }}
                            className="text-[10px] font-mono px-1.5 text-cyan-300 font-bold hover:text-white transition-colors"
                            title="Click to reset zoom to 100%"
                          >
                            {zoom}%
                          </button>
                          <button 
                            onClick={() => {
                              sound.playHover();
                              setZoom((z) => Math.min(150, z + 10));
                            }}
                            className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                            title="Zoom In (Max 150%)"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Live Canvas with Atmospheric Stage & Reticle Framing */}
                    <div 
                      className={`flex-1 overflow-auto p-2 sm:p-4 md:p-8 flex items-center justify-center transition-all atmospheric-stage min-w-0 w-full ${canvasBgClassMap[canvasBg]}`}
                      style={{ '--stage-flare': `${customizations.primaryColor}80` } as React.CSSProperties}
                    >
                      <div 
                        className={`w-full max-w-full transition-all duration-300 flex items-center justify-center relative z-10 min-w-0 overflow-x-auto ${deviceWidthMap[deviceMode]} ${hudMode === 'tactical' ? 'cyber-box p-2 sm:p-4' : ''}`}
                        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
                      >
                        {(() => {
                          const catId = activeComponent.categoryId || activeCategory.id;
                          if (catId === 'category-02') return <ButtonRenderer />;
                          if (catId === 'category-03') return <CardRenderer />;
                          if (catId === 'category-04') return <FormRenderer />;
                          if (catId === 'category-05') return <OverlayRenderer />;
                          if (catId === 'category-06') return <ProgressRenderer />;
                          if (catId === 'category-07') return <NotificationFeedbackRenderer />;
                          if (catId === 'category-08') return <DataVizRenderer />;
                          if (catId === 'category-09') return <TableRenderer />;
                          if (catId === 'category-10') return <UserProfileRenderer />;
                          if (catId === 'category-11') return <MediaRenderer />;
                          if (catId === 'category-12') return <FooterRenderer />;
                          if (catId === 'category-13') return <AnimationRenderer />;
                          if (catId === 'category-14') return <LayoutRenderer />;
                          if (catId === 'category-15') return <EcommerceRenderer />;
                          if (catId === 'category-16') return <SpecialRenderer />;
                          return <NavigationRenderer />;
                        })()}
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

      {/* Futuristic Style Samples Showcase Modal */}
      <StyleSamplesModal 
        isOpen={isStyleSamplesOpen} 
        onClose={() => setIsStyleSamplesOpen(false)} 
      />
    </div>
  );
};
