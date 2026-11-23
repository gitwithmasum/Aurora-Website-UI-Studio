export type ThemePreset = 
  | 'light'
  | 'dark'
  | 'glassmorphism'
  | 'cyberpunk'
  | 'black-gold'
  | 'minimal'
  | 'electric-violet'
  | 'crimson-velvet'
  | 'deep-ocean'
  | 'midnight-steel'
  | 'opal-frost';

export type DeviceMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export type InteractionState = 
  | 'default'
  | 'hover'
  | 'active'
  | 'focus'
  | 'pressed'
  | 'disabled'
  | 'expanded'
  | 'collapsed'
  | 'loading'
  | 'selected';

export interface CustomizationSettings {
  theme: ThemePreset;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  surfaceColor?: string;
  textColor: string;
  borderRadius: number; // 0 to 24px
  borderWidth: number; // 0 to 4px
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'none';
  shadowStyle: 'none' | 'soft' | 'glow' | 'dramatic' | 'neon';
  blurIntensity: number; // 0 to 32px
  paddingY: number; // 4 to 32px
  paddingX: number; // 8 to 48px
  gap: number; // 4 to 32px
  fontSize: 'xs' | 'sm' | 'base' | 'lg';
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  letterSpacing: 'tight' | 'normal' | 'wide';
  widthMode: 'full' | 'contained' | 'compact';
  iconStyle: 'minimal' | 'filled' | 'duotone';
  animationSpeed: 'none' | 'fast' | 'normal' | 'slow';
  activeState: InteractionState;
}

export interface ComponentVariation {
  id: string;
  name: string;
  description: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  category?: string;
  categoryNumber?: string;
  categoryId?: string;
  subcategory: string;
  description: string;
  tags: string[];
  status?: 'ready' | 'beta' | 'coming-soon';
  variations: ComponentVariation[];
  defaultSettings?: Partial<CustomizationSettings>;
}

export interface CategoryItem {
  id: string;
  number: string;
  name: string;
  description: string;
  iconName: string;
  count: number;
  status: 'available' | 'coming-soon';
}

export interface SavedPreset {
  id: string;
  name: string;
  componentId: string;
  settings: CustomizationSettings;
  createdAt: string;
}

export interface CustomTemplate {
  id: string;
  name: string;
  componentId: string;
  description: string;
  codeSnippet: string;
  tags: string[];
  settings: CustomizationSettings;
  isUserCreated: boolean;
  createdAt: string;
}
