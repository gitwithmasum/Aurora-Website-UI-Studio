import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  Compass, 
  Search, 
  Star, 
  Clock, 
  Bookmark, 
  Layers, 
  Sliders, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  PanelLeftClose,
  Boxes,
  Zap,
  Plus,
  Lock,
  Radio,
  Activity,
  Shield,
  MousePointerClick
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { NAVIGATION_COMPONENTS } from '../../data/navigationComponents';
import { BUTTON_COMPONENTS } from '../../data/buttonComponents';
import { CARD_COMPONENTS } from '../../data/cardComponents';
import { FORM_COMPONENTS } from '../../data/formComponents';
import { OVERLAY_COMPONENTS } from '../../data/overlayComponents';
import { PROGRESS_COMPONENTS } from '../../data/progressComponents';
import { NOTIFICATION_FEEDBACK_COMPONENTS } from '../../data/notificationFeedbackComponents';
import { DATA_VIZ_COMPONENTS } from '../../data/dataVizComponents';
import { TABLE_COMPONENTS } from '../../data/tableComponents';
import { USER_PROFILE_COMPONENTS } from '../../data/userProfileComponents';
import { MEDIA_COMPONENTS } from '../../data/mediaComponents';
import { FOOTER_COMPONENTS } from '../../data/footerComponents';
import { ANIMATION_COMPONENTS } from '../../data/animationComponents';
import { LAYOUT_COMPONENTS } from '../../data/layoutComponents';
import { ECOMMERCE_COMPONENTS } from '../../data/ecommerceComponents';
import { SPECIAL_COMPONENTS } from '../../data/specialComponents';
import { sound } from '../../utils/soundEngine';

export const Sidebar: React.FC = () => {
  const { 
    categories,
    activeCategory,
    setActiveCategory,
    activeComponent, 
    setActiveComponent, 
    searchQuery, 
    favorites,
    toggleFavorite,
    isFavorite,
    customTemplates,
    activeFilter,
    isSidebarOpen,
    setIsSidebarOpen,
    setIsTemplateInjectorOpen,
    customizations
  } = useStudio();

  const [expandedSubcats, setExpandedSubcats] = useState<{ [key: string]: boolean }>({
    header: true,
    navigation: true,
    'profile-actions': true,
    effects: true,
    'core-buttons': true,
    'triggers-controls': true,
    'advanced-fx': true,
  });

  const toggleSubcat = (subcat: string) => {
    sound.playHover();
    setExpandedSubcats((prev) => ({ ...prev, [subcat]: !prev[subcat] }));
  };

  const getCategoryComponents = (catId: string) => {
    switch (catId) {
      case 'category-02': return BUTTON_COMPONENTS;
      case 'category-03': return CARD_COMPONENTS;
      case 'category-04': return FORM_COMPONENTS;
      case 'category-05': return OVERLAY_COMPONENTS;
      case 'category-06': return PROGRESS_COMPONENTS;
      case 'category-07': return NOTIFICATION_FEEDBACK_COMPONENTS;
      case 'category-08': return DATA_VIZ_COMPONENTS;
      case 'category-09': return TABLE_COMPONENTS;
      case 'category-10': return USER_PROFILE_COMPONENTS;
      case 'category-11': return MEDIA_COMPONENTS;
      case 'category-12': return FOOTER_COMPONENTS;
      case 'category-13': return ANIMATION_COMPONENTS;
      case 'category-14': return LAYOUT_COMPONENTS;
      case 'category-15': return ECOMMERCE_COMPONENTS;
      case 'category-16': return SPECIAL_COMPONENTS;
      default: return NAVIGATION_COMPONENTS;
    }
  };

  const currentCategoryComponents = getCategoryComponents(activeCategory.id);

  const subcategoryLabels: Record<string, string> = {
    // 01 Nav
    header: 'Header Protocols',
    navigation: 'Navigation Matrix',
    'profile-actions': 'Profile & Actions',
    effects: 'Micro-FX / Physics',
    // 02 Buttons
    'core-buttons': 'Core Action Buttons',
    'triggers-controls': 'Triggers & Controls',
    'advanced-fx': 'Advanced & Micro-FX',
    // 03 Cards
    'content-cards': 'Content & Information Cards',
    'aesthetic-cards': 'Aesthetic & Kinetic Cards',
    'feature-project-cards': 'Feature & Project Cards',
    // 04 Forms
    'basic-inputs': 'Basic Data Inputs',
    'selection-controls': 'Selection & Toggle Controls',
    'advanced-pickers': 'Advanced Pickers & Uploads',
    'enhanced-states': 'Enhanced Validation States',
    // 05 Overlays
    'dialogs-modals': 'Dialogs & Fullscreen Modals',
    'drawers-sheets': 'Drawers & Command Palettes',
    'popovers-tooltips': 'Popovers, Tooltips & Context',
    'media-notices': 'Media Overlays & Notices',
    // 06 Progress
    'spinners-rings': 'Spinners & Indicators',
    'progress-bars': 'Progress Bars & Timelines',
    'skeletons-loaders': 'Skeletons & System Loaders',
    // 07 Notifications
    'alerts-toasts': 'Alerts & System Toasts',
    'messages-banners': 'Messages & Banners',
    'indicators-status': 'Indicators & Status Feeds',
    // 08 DataViz
    'charts-telemetry': 'Charts & Telemetry',
    'metrics-kpi': 'Metrics & KPI Cards',
    'tracking-activity': 'Tracking & Heatmaps',
    // 09 Tables
    'tables-grids': 'Tables & Data Grids',
    'lists-views': 'Lists & Virtual Views',
    'actions-toolbars': 'Actions & Toolbars',
    // 10 UserProfile
    'avatars-presence': 'Avatars & Online Presence',
    'account-settings': 'Account Settings & Forms',
    'security-auth': 'Security & Two-Factor Auth',
    'activity-social': 'Activity Feeds & Social Links',
    // 11 Media
    'galleries-sliders': 'Galleries & Sliders',
    'media-players': 'Cyber Media Players',
    'interactive-tools': 'Interactive Visual Tools',
    // 12 Footer
    footers: 'Full-Width Footers',
    elements: 'Footer Elements & Inputs',
    legal: 'Copyright & Compliance',
    // 13 Animation
    triggers: 'Interactive Triggers & Cursor',
    cursors: 'Custom Reticle Cursors',
    scrolling: 'Smooth Scroll & Parallax',
    transitions: 'Directional Transitions',
    specialized: 'Physics & SVG Morphing',
    lighting: 'Atmospheric Glows & Particles',
    // 14 Layout
    sections: 'Hero & Split Viewports',
    grids: 'Bento & CSS Grids',
    containers: 'Containers & Floating Pods',
    dividers: 'Laser Dividers & Spacers',
    // 15 Ecommerce
    display: 'Product Dossiers & Specs',
    actions: 'Cart Actions & Steppers',
    checkout: 'Checkout & Receipts',
    reviews: 'Ratings & Feedback',
    // 16 Special
    futuristic: 'Cyberpunk HUDs & Glass',
    workspace: 'Terminals & AI Workspaces',
    advanced: 'Split Panes & Widgets',
  };

  const uniqueSubcatIds = Array.from(new Set(currentCategoryComponents.map(c => c.subcategory)));
  const subcategories = uniqueSubcatIds.map(subId => ({
    id: subId,
    label: subcategoryLabels[subId] || subId.replace(/-/g, ' ').toUpperCase(),
    count: `${currentCategoryComponents.filter(c => c.subcategory === subId).length.toString().padStart(2, '0')} NODES`,
  }));

  // Filter components
  const filteredComponents = currentCategoryComponents.filter((comp) => {
    const matchesSearch = 
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'favorites') return favorites.includes(comp.id);
    return true;
  });

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile only backdrop (hidden on desktop and laptop) */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        onClick={() => {
          sound.playHover();
          setIsSidebarOpen(false);
        }}
      />

      <aside className="fixed md:static inset-y-0 left-0 z-50 md:z-20 w-72 xl:w-80 max-w-[85vw] my-0 md:my-2.5 md:ml-2.5 h-full md:h-[calc(100%-1.25rem)] rounded-none md:rounded-[28px] border-r md:border border-white/10 bg-[#070b1a]/85 backdrop-blur-3xl flex flex-col select-none shrink-0 font-sans shadow-2xl md:shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden relative transition-all duration-300">
        {/* Cosmic Galaxy Atmosphere & Ambient Nebula Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18)_0%,_rgba(168,85,247,0.1)_40%,_transparent_75%)] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-56 h-56 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* 1. iOS-Inspired Galaxy Brand Header */}
        <div className="p-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* iOS Squircle App Icon with Galaxy Nebula Gradient */}
                <div 
                  className="w-10 h-10 rounded-[14px] p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-1 ring-white/20 transition-transform duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${customizations.primaryColor}, #a855f7, ${customizations.accentColor})`,
                  }}
                >
                  <div className="w-full h-full rounded-[13px] bg-[#070b1a]/70 backdrop-blur-md flex items-center justify-center font-bold text-white">
                    <Boxes className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  </div>
                </div>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm tracking-tight text-white font-sans">AURORA STUDIO</span>
                  <span 
                    className="text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                    style={{
                      backgroundColor: `${customizations.primaryColor}25`,
                      color: customizations.primaryColor,
                      border: `1px solid ${customizations.primaryColor}50`
                    }}
                  >
                    GALAXY
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-0.5">
                  <span className="text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                    SYS: G-CORE
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-semibold">ONLINE</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playHover();
                setIsSidebarOpen(false);
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all shadow-sm"
              title="Collapse Sidebar (Cmd+B)"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. iOS-Inspired Galaxy Blueprint Vault Card */}
        <div className="p-3 pb-2 border-b border-white/[0.06] relative z-10">
          <div 
            onClick={() => {
              sound.playScan();
              setIsTemplateInjectorOpen(true);
            }}
            className="p-3 rounded-[20px] bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-cyan-950/40 border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between group hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[12px] bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                  <span>Blueprint Vault</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/25 font-mono text-cyan-300 border border-cyan-400/40 font-bold">
                    {customTemplates.length}
                  </span>
                </div>
                <span className="text-[10px] text-cyan-300/80 font-mono block">
                  + Inject / Manage Blueprints
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-colors">
              <Plus className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-90 transition-transform" />
            </div>
          </div>
        </div>

        {/* 3. iOS-Style Rounded Protocols Grid (Categories 01 to 16) */}
        <div className="p-3 pb-0 space-y-2 relative z-10">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center justify-between px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 shadow-[0_0_6px_#c084fc]" />
              <span>GALAXY PROTOCOLS (01–16)</span>
            </span>
            <span className="text-[9px] text-cyan-400 font-bold">307 NODES</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory.id === cat.id;
              const shortName = cat.name.split(' ')[0];
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    sound.playConfirm();
                    setActiveCategory(cat);
                  }}
                  className={`p-2.5 rounded-[16px] border cursor-pointer transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? 'border-cyan-400/60 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-600/25 shadow-[0_0_20px_rgba(6,182,212,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] text-white ring-1 ring-cyan-400/30'
                      : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-mono font-bold text-[10px] truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {cat.number}. {shortName.toUpperCase()}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400">{cat.count} Nodes</span>
                    <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full border ${
                      isSelected 
                        ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400/50 font-bold' 
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}>
                      LIVE
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. iOS-Style Main Component Navigator */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3.5 relative z-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          {/* Component Subcategories */}
          {subcategories.map((subcat) => {
            const compsInSubcat = filteredComponents.filter(c => c.subcategory === subcat.id);
            if (compsInSubcat.length === 0 && activeFilter !== 'all') return null;

            const isExpanded = expandedSubcats[subcat.id] ?? true;

            return (
              <div key={subcat.id} className="space-y-1">
                <button
                  onClick={() => toggleSubcat(subcat.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-[14px] text-slate-300 hover:text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                    <span className="font-sans font-medium text-xs tracking-normal normal-case text-slate-200">{subcat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-cyan-400/80 font-mono">{subcat.count}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="space-y-1 pl-2.5 border-l border-white/10 ml-2">
                    {compsInSubcat.map((comp, idx) => {
                      const isActive = activeComponent.id === comp.id;
                      const isFav = isFavorite(comp.id);
                      const indexStr = (idx + 1).toString().padStart(2, '0');

                      return (
                        <div
                          key={comp.id}
                          onClick={() => {
                            sound.playBlip(1300);
                            setActiveComponent(comp);
                            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                              setIsSidebarOpen(false);
                            }
                          }}
                          className={`group relative flex items-center justify-between px-3 py-2 rounded-[14px] text-xs cursor-pointer transition-all duration-200 ${
                            isActive
                              ? 'bg-white/[0.12] text-white font-semibold backdrop-blur-xl border border-white/25 shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-cyan-400/40'
                              : 'text-slate-300 hover:bg-white/[0.05] hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                              {indexStr}.
                            </span>
                            <span className="truncate">{comp.name}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                sound.playConfirm();
                                toggleFavorite(comp.id);
                              }}
                              className={`p-1 rounded-full hover:bg-white/10 transition-colors ${
                                isFav ? 'text-amber-400' : 'text-slate-600 opacity-0 group-hover:opacity-100'
                              }`}
                              title={isFav ? 'Remove Favorite' : 'Add to Favorites'}
                            >
                              <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
