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
        className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        onClick={() => {
          sound.playHover();
          setIsSidebarOpen(false);
        }}
      />

      <aside className="fixed md:static inset-y-0 left-0 z-50 md:z-20 w-72 xl:w-80 max-w-[85vw] h-full border-r border-[#253745]/60 bg-[#06141B] flex flex-col select-none shrink-0 font-sans shadow-2xl md:shadow-none transition-transform duration-300">
      {/* 1. Cybernetic Brand Header */}
      <div className="p-4 border-b border-[#253745]/60 bg-[#11212D]/90 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-glow-cyan border"
                style={{
                  background: `linear-gradient(135deg, ${customizations.primaryColor}, ${customizations.accentColor})`,
                  borderColor: `${customizations.primaryColor}80`
                }}
              >
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white font-mono">AURORA UI STUDIO</span>
                <span 
                  className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${customizations.primaryColor}20`,
                    color: customizations.primaryColor,
                    border: `1px solid ${customizations.primaryColor}40`
                  }}
                >
                  PRO
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="text-cyan-400">SYS: #0X889F</span>
                <span>•</span>
                <span className="text-emerald-400">STATUS: ONLINE</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playHover();
              setIsSidebarOpen(false);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Collapse Sidebar (Cmd+B)"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Tactical Blueprint Arsenal Card */}
      <div className="p-3 pb-2 border-b border-white/5">
        <div 
          onClick={() => {
            sound.playScan();
            setIsTemplateInjectorOpen(true);
          }}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all shadow-glow-cyan flex items-center justify-between group cyber-box"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <span>BLUEPRINT VAULT</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 font-mono text-cyan-300 border border-cyan-500/40">
                  {customTemplates.length}
                </span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono block">
                + Inject / Manage Blueprints
              </span>
            </div>
          </div>
          <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
            <Plus className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-90 transition-transform" />
          </div>
        </div>
      </div>

      {/* 4. Active Protocols Grid (Categories 01 to 16) */}
      <div className="p-3 pb-0 space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold flex items-center justify-between px-1">
          <span>ACTIVE PROTOCOLS (01–16)</span>
          <span className="text-[9px] text-cyan-400 font-bold">307 LIVE NODES</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
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
                className={`p-2 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/50 shadow-glow-cyan cyber-box'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className={`font-mono font-bold text-[10px] truncate ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`}>
                    {cat.number}. {shortName.toUpperCase()}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-400">{cat.count} Nodes</span>
                  <span className="text-[8px] font-mono px-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">LIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Main Component Navigator */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Component Subcategories */}
        {subcategories.map((subcat) => {
          const compsInSubcat = filteredComponents.filter(c => c.subcategory === subcat.id);
          if (compsInSubcat.length === 0 && activeFilter !== 'all') return null;

          const isExpanded = expandedSubcats[subcat.id] ?? true;

          return (
            <div key={subcat.id} className="space-y-1">
              <button
                onClick={() => toggleSubcat(subcat.id)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                  <span>{subcat.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] opacity-60 text-cyan-400">{subcat.count}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="space-y-1 pl-2 border-l border-cyan-500/20 ml-2">
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
                        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400 shadow-glow-cyan cyber-box'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                            {indexStr}.
                          </span>
                          <span className="truncate">{comp.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow-cyan animate-pulse" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sound.playConfirm();
                              toggleFavorite(comp.id);
                            }}
                            className={`p-1 rounded hover:bg-white/10 ${
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
