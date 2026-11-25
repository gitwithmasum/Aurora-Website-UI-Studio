import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CategoryItem, 
  ComponentItem, 
  CustomizationSettings, 
  DeviceMode, 
  SavedPreset, 
  CustomTemplate,
  ThemePreset 
} from '../types/studio';
import { CATEGORIES } from '../data/categories';
import { NAVIGATION_COMPONENTS } from '../data/navigationComponents';
import { BUTTON_COMPONENTS } from '../data/buttonComponents';
import { CARD_COMPONENTS } from '../data/cardComponents';
import { FORM_COMPONENTS } from '../data/formComponents';
import { OVERLAY_COMPONENTS } from '../data/overlayComponents';
import { PROGRESS_COMPONENTS } from '../data/progressComponents';
import { NOTIFICATION_FEEDBACK_COMPONENTS } from '../data/notificationFeedbackComponents';
import { DATA_VIZ_COMPONENTS } from '../data/dataVizComponents';
import { TABLE_COMPONENTS } from '../data/tableComponents';
import { USER_PROFILE_COMPONENTS } from '../data/userProfileComponents';
import { MEDIA_COMPONENTS } from '../data/mediaComponents';
import { FOOTER_COMPONENTS } from '../data/footerComponents';
import { ANIMATION_COMPONENTS } from '../data/animationComponents';
import { LAYOUT_COMPONENTS } from '../data/layoutComponents';
import { ECOMMERCE_COMPONENTS } from '../data/ecommerceComponents';
import { SPECIAL_COMPONENTS } from '../data/specialComponents';
import { DEFAULT_CUSTOMIZATION, THEME_PRESETS } from '../data/themePresets';
import { sound } from '../utils/soundEngine';

export const ALL_COMPONENTS: ComponentItem[] = [
  ...NAVIGATION_COMPONENTS,
  ...BUTTON_COMPONENTS,
  ...CARD_COMPONENTS,
  ...FORM_COMPONENTS,
  ...OVERLAY_COMPONENTS,
  ...PROGRESS_COMPONENTS,
  ...NOTIFICATION_FEEDBACK_COMPONENTS,
  ...DATA_VIZ_COMPONENTS,
  ...TABLE_COMPONENTS,
  ...USER_PROFILE_COMPONENTS,
  ...MEDIA_COMPONENTS,
  ...FOOTER_COMPONENTS,
  ...ANIMATION_COMPONENTS,
  ...LAYOUT_COMPONENTS,
  ...ECOMMERCE_COMPONENTS,
  ...SPECIAL_COMPONENTS,
];

export type CanvasBackgroundType = 'grid' | 'dots' | 'radar' | 'mesh' | 'dark' | 'light';
export type FilterType = 'all' | 'header' | 'navigation' | 'profile-actions' | 'effects' | 'favorites' | 'custom-templates';
export type StudioTab = 'preview' | 'code' | 'matrix' | 'templates';

interface StudioContextType {
  categories: CategoryItem[];
  activeCategory: CategoryItem;
  setActiveCategory: (cat: CategoryItem) => void;
  components: ComponentItem[];
  activeComponent: ComponentItem;
  setActiveComponent: (comp: ComponentItem) => void;
  activeVariantId: string;
  setActiveVariantId: (vId: string) => void;
  activeTab: StudioTab;
  setActiveTab: (tab: StudioTab) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  canvasBg: CanvasBackgroundType;
  setCanvasBg: (bg: CanvasBackgroundType) => void;
  customizations: CustomizationSettings;
  updateCustomizations: (partial: Partial<CustomizationSettings>) => void;
  applyTheme: (theme: ThemePreset) => void;
  resetCustomizations: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  favorites: string[];
  toggleFavorite: (compKey: string) => void;
  isFavorite: (compKey: string) => boolean;
  savedPresets: SavedPreset[];
  savePreset: (name: string) => void;
  deletePreset: (id: string) => void;
  applyPreset: (preset: SavedPreset) => void;
  customTemplates: CustomTemplate[];
  activeCustomTemplateId: string | null;
  setActiveCustomTemplateId: (id: string | null) => void;
  activeCustomTemplate: CustomTemplate | null;
  addCustomTemplate: (template: Omit<CustomTemplate, 'id' | 'createdAt'>) => CustomTemplate;
  deleteCustomTemplate: (id: string) => void;
  applyCustomTemplate: (template: CustomTemplate) => void;
  isTemplateInjectorOpen: boolean;
  setIsTemplateInjectorOpen: (open: boolean) => void;
  recentlyViewed: string[];
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isInspectorOpen: boolean;
  setIsInspectorOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  crtEnabled: boolean;
  setCrtEnabled: (enabled: boolean) => void;
  hudMode: 'tactical' | 'standard';
  setHudMode: (mode: 'tactical' | 'standard') => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const STORAGE_KEY_FAVORITES = 'aurora_favorites';
const STORAGE_KEY_PRESETS = 'aurora_presets';
const STORAGE_KEY_TEMPLATES = 'aurora_custom_templates';
const STORAGE_KEY_RECENT = 'aurora_recent';

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories] = useState<CategoryItem[]>(CATEGORIES);
  const [activeCategory, setActiveCategoryState] = useState<CategoryItem>(CATEGORIES[0]);
  const [components] = useState<ComponentItem[]>(ALL_COMPONENTS);
  const [activeComponent, setActiveComponentState] = useState<ComponentItem>(NAVIGATION_COMPONENTS[0]);
  const [activeVariantId, setActiveVariantIdState] = useState<string>(NAVIGATION_COMPONENTS[0].variations[0]?.id || 'standard');
  const [activeCustomTemplateId, setActiveCustomTemplateId] = useState<string | null>(null);
  const [activeTab, setActiveTabState] = useState<StudioTab>('preview');
  const [deviceMode, setDeviceModeState] = useState<DeviceMode>('desktop');
  const [canvasBg, setCanvasBgState] = useState<CanvasBackgroundType>('radar');
  const [customizations, setCustomizations] = useState<CustomizationSettings>(DEFAULT_CUSTOMIZATION);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilterState] = useState<FilterType>('all');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280;
    }
    return true;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [isTemplateInjectorOpen, setIsTemplateInjectorOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [crtEnabled, setCrtEnabledState] = useState<boolean>(false);
  const [hudMode, setHudModeState] = useState<'tactical' | 'standard'>('tactical');

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return stored ? JSON.parse(stored) : ['top-navigation-bar', 'command-menu', 'dock-navigation'];
    } catch {
      return ['top-navigation-bar'];
    }
  });

  // Presets
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PRESETS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Custom User Templates (Persistent Blueprint Arsenal)
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TEMPLATES);
      if (stored) return JSON.parse(stored);
    } catch {}
    // Seed default sample futuristic template
    return [
      {
        id: 'template_quantum_core',
        name: 'Quantum Spatial Glass Island',
        componentId: 'top-navigation-bar',
        description: 'Ultra-luxurious frosted glass floating island with specular highlight rim, gradient neon aura, and frosted pill links.',
        codeSnippet: `<nav class="w-full max-w-4xl mx-auto p-3.5 rounded-full bg-white/[0.05] backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(0,242,254,0.2)] ring-1 ring-white/10 flex items-center justify-between text-white font-sans transition-all relative overflow-hidden">
  <div class="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent pointer-events-none"></div>
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,242,254,0.7)] font-bold text-xs">
      ✦
    </div>
    <span class="font-extrabold tracking-wider text-xs sm:text-sm text-white">QUANTUM // SPATIAL</span>
  </div>
  <div class="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10 backdrop-blur-md text-xs font-semibold">
    <a href="#overview" class="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.3)]">Overview</a>
    <a href="#telemetry" class="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all">Telemetry</a>
    <a href="#deploy" class="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all">Deployments</a>
  </div>
  <div class="flex items-center gap-2">
    <button class="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 transition-all">Search ⌘K</button>
    <button class="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(0,242,254,0.5)]">Connect</button>
  </div>
</nav>`,
        tags: ['Glassmorphism', 'Spatial', 'HUD', 'Floating Island'],
        settings: {
          ...DEFAULT_CUSTOMIZATION,
          theme: 'cyberpunk',
          primaryColor: '#00f2fe',
          accentColor: '#f43f5e',
          shadowStyle: 'neon',
          borderRadius: 9999,
          blurIntensity: 24,
        },
        isUserCreated: false,
        createdAt: 'Official Blueprint',
      },
    ];
  });

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RECENT);
      return stored ? JSON.parse(stored) : ['top-navigation-bar', 'sticky-header'];
    } catch {
      return ['top-navigation-bar'];
    }
  });

  // Sound sync
  const setSoundEnabled = (enabled: boolean) => {
    sound.enabled = enabled;
    setSoundEnabledState(enabled);
    if (enabled) sound.playBlip(1600);
  };

  const setCrtEnabled = (enabled: boolean) => {
    sound.playBlip(900);
    setCrtEnabledState(enabled);
  };

  const setHudMode = (mode: 'tactical' | 'standard') => {
    sound.playScan();
    setHudModeState(mode);
  };

  const setActiveTab = (tab: StudioTab) => {
    sound.playBlip(1200);
    setActiveTabState(tab);
  };

  const setDeviceMode = (mode: DeviceMode) => {
    sound.playBlip(1400);
    setDeviceModeState(mode);
  };

  const setCanvasBg = (bg: CanvasBackgroundType) => {
    sound.playBlip(1100);
    setCanvasBgState(bg);
  };

  const setActiveFilter = (filter: FilterType) => {
    sound.playHover();
    setActiveFilterState(filter);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(savedPresets));
    } catch {}
  }, [savedPresets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(customTemplates));
    } catch {}
  }, [customTemplates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(recentlyViewed));
    } catch {}
  }, [recentlyViewed]);

  const handleSelectCategory = (cat: CategoryItem) => {
    sound.playConfirm();
    setActiveCategoryState(cat);
    let targetFirstComp = NAVIGATION_COMPONENTS[0];
    if (cat.id === 'category-02') targetFirstComp = BUTTON_COMPONENTS[0];
    else if (cat.id === 'category-03') targetFirstComp = CARD_COMPONENTS[0];
    else if (cat.id === 'category-04') targetFirstComp = FORM_COMPONENTS[0];
    else if (cat.id === 'category-05') targetFirstComp = OVERLAY_COMPONENTS[0];
    else if (cat.id === 'category-06') targetFirstComp = PROGRESS_COMPONENTS[0];
    else if (cat.id === 'category-07') targetFirstComp = NOTIFICATION_FEEDBACK_COMPONENTS[0];
    else if (cat.id === 'category-08') targetFirstComp = DATA_VIZ_COMPONENTS[0];
    else if (cat.id === 'category-09') targetFirstComp = TABLE_COMPONENTS[0];
    else if (cat.id === 'category-10') targetFirstComp = USER_PROFILE_COMPONENTS[0];
    else if (cat.id === 'category-11') targetFirstComp = MEDIA_COMPONENTS[0];
    else if (cat.id === 'category-12') targetFirstComp = FOOTER_COMPONENTS[0];
    else if (cat.id === 'category-13') targetFirstComp = ANIMATION_COMPONENTS[0];
    else if (cat.id === 'category-14') targetFirstComp = LAYOUT_COMPONENTS[0];
    else if (cat.id === 'category-15') targetFirstComp = ECOMMERCE_COMPONENTS[0];
    else if (cat.id === 'category-16') targetFirstComp = SPECIAL_COMPONENTS[0];

    setActiveComponentState(targetFirstComp);
    setActiveVariantIdState(targetFirstComp.variations[0]?.id || 'standard');
    setActiveCustomTemplateId(null);
  };

  const setActiveComponent = (comp: ComponentItem) => {
    sound.playBlip(1300);
    setActiveComponentState(comp);
    setActiveVariantIdState(comp.variations[0]?.id || 'standard');
    setActiveCustomTemplateId(null);

    if (comp.categoryId) {
      const parentCat = CATEGORIES.find((c) => c.id === comp.categoryId);
      if (parentCat && parentCat.id !== activeCategory.id) {
        setActiveCategoryState(parentCat);
      }
    }

    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== comp.id);
      return [comp.id, ...filtered].slice(0, 8);
    });

    if (comp.defaultSettings) {
      setCustomizations((prev) => ({
        ...prev,
        ...comp.defaultSettings,
      }));
    }
  };

  const setActiveVariantId = (vId: string) => {
    setActiveVariantIdState(vId);
    setActiveCustomTemplateId(null);
  };

  const updateCustomizations = (partial: Partial<CustomizationSettings>) => {
    sound.playHover();
    setCustomizations((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  const applyTheme = (theme: ThemePreset) => {
    sound.playScan();
    const themeConfig = THEME_PRESETS[theme];
    if (themeConfig) {
      setCustomizations((prev) => ({
        ...prev,
        ...themeConfig.settings,
        theme,
      }));
    }
  };

  const resetCustomizations = () => {
    sound.playConfirm();
    const themeConfig = THEME_PRESETS[customizations.theme] || THEME_PRESETS.dark;
    setCustomizations({
      ...themeConfig.settings,
      ...(activeComponent.defaultSettings || {}),
    } as CustomizationSettings);
  };

  const toggleFavorite = (compKey: string) => {
    sound.playConfirm();
    setFavorites((prev) => 
      prev.includes(compKey) ? prev.filter((id) => id !== compKey) : [...prev, compKey]
    );
  };

  const isFavorite = (compKey: string) => favorites.includes(compKey);

  const savePreset = (name: string) => {
    sound.playConfirm();
    const newPreset: SavedPreset = {
      id: `preset_${Date.now()}`,
      name,
      componentId: activeComponent.id,
      settings: { ...customizations },
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    setSavedPresets((prev) => [newPreset, ...prev]);
  };

  const deletePreset = (id: string) => {
    sound.playBlip(600);
    setSavedPresets((prev) => prev.filter((p) => p.id !== id));
  };

  const applyPreset = (preset: SavedPreset) => {
    sound.playScan();
    const targetComp = components.find((c) => c.id === preset.componentId);
    if (targetComp) {
      setActiveComponentState(targetComp);
    }
    setCustomizations({ ...preset.settings });
  };

  const activeCustomTemplate = activeCustomTemplateId 
    ? customTemplates.find((t) => t.id === activeCustomTemplateId) || null 
    : null;

  // Custom Template actions
  const addCustomTemplate = (templateData: Omit<CustomTemplate, 'id' | 'createdAt'>): CustomTemplate => {
    sound.playConfirm();
    const newTemplate: CustomTemplate = {
      ...templateData,
      id: `tmpl_${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    setCustomTemplates((prev) => [newTemplate, ...prev]);
    return newTemplate;
  };

  const deleteCustomTemplate = (id: string) => {
    sound.playBlip(500);
    if (activeCustomTemplateId === id) {
      setActiveCustomTemplateId(null);
      setActiveVariantIdState(activeComponent.variations[0]?.id || 'standard');
    }
    setCustomTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const applyCustomTemplate = (template: CustomTemplate) => {
    sound.playScan();
    const targetComp = ALL_COMPONENTS.find((c) => c.id === template.componentId);
    if (targetComp) {
      setActiveComponentState(targetComp);
      if (targetComp.categoryId) {
        const parentCat = CATEGORIES.find((cat) => cat.id === targetComp.categoryId);
        if (parentCat && parentCat.id !== activeCategory.id) {
          setActiveCategoryState(parentCat);
        }
      }
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((id) => id !== targetComp.id);
        return [targetComp.id, ...filtered].slice(0, 8);
      });
    }
    setActiveCustomTemplateId(template.id);
    setActiveVariantIdState('');
    if (template.settings) {
      setCustomizations({ ...template.settings });
    }
  };

  return (
    <StudioContext.Provider
      value={{
        categories,
        activeCategory,
        setActiveCategory: handleSelectCategory,
        components,
        activeComponent,
        setActiveComponent,
        activeVariantId,
        setActiveVariantId,
        activeTab,
        setActiveTab,
        deviceMode,
        setDeviceMode,
        canvasBg,
        setCanvasBg,
        customizations,
        updateCustomizations,
        applyTheme,
        resetCustomizations,
        searchQuery,
        setSearchQuery,
        activeFilter,
        setActiveFilter,
        favorites,
        toggleFavorite,
        isFavorite,
        savedPresets,
        savePreset,
        deletePreset,
        applyPreset,
        customTemplates,
        activeCustomTemplateId,
        setActiveCustomTemplateId,
        activeCustomTemplate,
        addCustomTemplate,
        deleteCustomTemplate,
        applyCustomTemplate,
        isTemplateInjectorOpen,
        setIsTemplateInjectorOpen,
        recentlyViewed,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isInspectorOpen,
        setIsInspectorOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        zoomLevel,
        setZoomLevel,
        soundEnabled,
        setSoundEnabled,
        crtEnabled,
        setCrtEnabled,
        hudMode,
        setHudMode,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
