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
              <div className="px-3 sm:px-6 py-2 border-b border-[#253745]/60 bg-[#11212D]/90 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-2 shrink-0 min-w-0 w-full">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2 truncate">
                      <span>{activeComponent.name}</span>
                    </h1>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 capitalize shrink-0">
                      {activeComponent.subcategory}
                    </span>
                    <span className="hidden lg:inline text-[10px] font-mono text-slate-500 shrink-0">
                      // ID: {activeComponent.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 max-w-2xl line-clamp-1 truncate">
                    {activeComponent.description}
                  </p>
                </div>

                {/* Design Variant Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 max-w-full min-w-0">
                  <span className="text-[9px] font-mono uppercase text-cyan-500/60 font-bold shrink-0 mr-1 hidden sm:inline">
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
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
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
              <div className="flex-1 overflow-hidden relative flex flex-col min-w-0 w-full">
                {activeTab === 'preview' && (
                  <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
                    {/* Canvas Viewport Toolbar */}
                    <div className="px-3 sm:px-6 py-1.5 border-b border-white/5 bg-[#070b16]/70 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs text-slate-400 shrink-0 min-w-0 w-full overflow-x-auto">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        {/* Device Mode Selector */}
                        <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10 shrink-0">
                          {[
                            { id: 'desktop', label: 'Desktop', icon: Monitor },
                            { id: 'laptop', label: 'Laptop', icon: Laptop },
                            { id: 'tablet', label: 'Tablet', icon: Tablet },
                            { id: 'mobile', label: 'Mobile', icon: Smartphone },
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
                                className={`p-1 rounded text-xs transition-all ${
                                  isActive ? 'bg-[#253745]/80 text-[#CCD0CF]' : 'text-slate-500 hover:text-slate-300'
                                }`}
                                title={dm.label}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </button>
                            );
                          })}
                        </div>

                        <span className="font-mono text-[10px] text-cyan-400 hidden sm:inline truncate">
                          {deviceMode.toUpperCase()} ({deviceWidthMap[deviceMode]})
                        </span>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <span className="hidden md:inline font-mono text-[10px] text-slate-400 truncate">
                          THEME: {customizations.theme.toUpperCase()}
                        </span>
                      </div>

                      {/* Canvas Background and Zoom Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Background switcher */}
                        <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10 overflow-x-auto">
                          {(['radar', 'grid', 'dots', 'mesh', 'dark', 'light'] as CanvasBackgroundType[]).map((bg) => (
                            <button
                              key={bg}
                              onClick={() => {
                                sound.playBlip(1100);
                                setCanvasBg(bg);
                              }}
                              className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-mono capitalize transition-all ${
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
                          <span className="text-[10px] font-mono px-1 sm:px-1.5 text-slate-300">{zoom}%</span>
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
