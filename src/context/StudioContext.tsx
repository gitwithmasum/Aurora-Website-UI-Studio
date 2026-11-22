import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CategoryItem, 
  ComponentItem, 
  CustomizationSettings, 
  DeviceMode, 
  SavedPreset, 
  ThemePreset 
} from '../types/studio';
import { CATEGORIES } from '../data/categories';
import { NAVIGATION_COMPONENTS } from '../data/navigationComponents';
import { DEFAULT_CUSTOMIZATION, THEME_PRESETS } from '../data/themePresets';

export type CanvasBackgroundType = 'grid' | 'dots' | 'mesh' | 'dark' | 'light' | 'transparent';
export type FilterType = 'all' | 'header' | 'navigation' | 'profile-actions' | 'effects' | 'favorites' | 'presets';
export type StudioTab = 'preview' | 'code' | 'matrix' | 'docs';

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
  recentlyViewed: string[];
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isInspectorOpen: boolean;
  setIsInspectorOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const STORAGE_KEY_FAVORITES = 'ui_studio_favorites';
const STORAGE_KEY_PRESETS = 'ui_studio_presets';
const STORAGE_KEY_RECENT = 'ui_studio_recent';

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories] = useState<CategoryItem[]>(CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<CategoryItem>(CATEGORIES[0]);
  const [components] = useState<ComponentItem[]>(NAVIGATION_COMPONENTS);
  const [activeComponent, setActiveComponentState] = useState<ComponentItem>(NAVIGATION_COMPONENTS[0]);
  const [activeVariantId, setActiveVariantId] = useState<string>(NAVIGATION_COMPONENTS[0].variations[0]?.id || 'standard');
  const [activeTab, setActiveTab] = useState<StudioTab>('preview');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [canvasBg, setCanvasBg] = useState<CanvasBackgroundType>('grid');
  const [customizations, setCustomizations] = useState<CustomizationSettings>(DEFAULT_CUSTOMIZATION);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Local storage persisted state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return stored ? JSON.parse(stored) : ['top-navigation-bar', 'command-menu', 'glass-navigation-bar'];
    } catch {
      return ['top-navigation-bar'];
    }
  });

  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PRESETS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RECENT);
      return stored ? JSON.parse(stored) : ['top-navigation-bar', 'sticky-header', 'command-menu'];
    } catch {
      return ['top-navigation-bar'];
    }
  });

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Sync presets
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(savedPresets));
    } catch (e) {
      console.error(e);
    }
  }, [savedPresets]);

  // Sync recent
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  // Keybindings (Cmd+K for command menu, Cmd+B for sidebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault();
        setIsInspectorOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setActiveComponent = (comp: ComponentItem) => {
    setActiveComponentState(comp);
    setActiveVariantId(comp.variations[0]?.id || 'standard');

    // Add to recently viewed
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== comp.id);
      return [comp.id, ...filtered].slice(0, 8);
    });

    // If component has specific defaults, merge them
    if (comp.defaultSettings) {
      setCustomizations((prev) => ({
        ...prev,
        ...comp.defaultSettings,
      }));
    }
  };

  const updateCustomizations = (partial: Partial<CustomizationSettings>) => {
    setCustomizations((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  const applyTheme = (theme: ThemePreset) => {
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
    const themeConfig = THEME_PRESETS[customizations.theme] || THEME_PRESETS.dark;
    setCustomizations({
      ...themeConfig.settings,
      ...(activeComponent.defaultSettings || {}),
    } as CustomizationSettings);
  };

  const toggleFavorite = (compKey: string) => {
    setFavorites((prev) => 
      prev.includes(compKey) ? prev.filter((id) => id !== compKey) : [...prev, compKey]
    );
  };

  const isFavorite = (compKey: string) => favorites.includes(compKey);

  const savePreset = (name: string) => {
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
    setSavedPresets((prev) => prev.filter((p) => p.id !== id));
  };

  const applyPreset = (preset: SavedPreset) => {
    const targetComp = components.find((c) => c.id === preset.componentId);
    if (targetComp) {
      setActiveComponentState(targetComp);
    }
    setCustomizations({ ...preset.settings });
  };

  return (
    <StudioContext.Provider
      value={{
        categories,
        activeCategory,
        setActiveCategory,
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
        recentlyViewed,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isInspectorOpen,
        setIsInspectorOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        zoomLevel,
        setZoomLevel,
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
