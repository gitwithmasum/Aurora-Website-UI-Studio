import { CustomizationSettings } from '../types/studio';

export function getComponentStyles(settings: CustomizationSettings) {
  const {
    theme,
    primaryColor,
    accentColor,
    bgColor,
    textColor,
    borderRadius,
    borderWidth,
    borderColor,
    borderStyle,
    shadowStyle,
    blurIntensity,
    paddingY,
    paddingX,
    gap,
    fontSize,
    fontWeight,
    letterSpacing,
  } = settings;

  // Box shadow mapping
  let boxShadow = 'none';
  if (shadowStyle === 'soft') {
    boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)';
  } else if (shadowStyle === 'glow') {
    boxShadow = `0 0 25px -4px ${primaryColor}40, 0 10px 20px -5px rgba(0, 0, 0, 0.4)`;
  } else if (shadowStyle === 'dramatic') {
    boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05)';
  } else if (shadowStyle === 'neon') {
    boxShadow = `0 0 15px ${primaryColor}80, 0 0 30px ${accentColor}40, inset 0 0 10px ${primaryColor}30`;
  }

  // Backdrop filter
  const backdropFilter = blurIntensity > 0 ? `blur(${blurIntensity}px)` : 'none';

  // Font size mapping
  const fontSizeMap = {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
  };

  // Font weight mapping
  const fontWeightMap = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  // Letter spacing mapping
  const letterSpacingMap = {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.05em',
  };

  return {
    container: {
      backgroundColor: bgColor,
      color: textColor,
      borderRadius: `${borderRadius}px`,
      borderWidth: `${borderWidth}px`,
      borderColor: borderColor,
      borderStyle: borderStyle === 'none' ? 'none' : borderStyle,
      boxShadow: boxShadow,
      backdropFilter: backdropFilter,
      WebkitBackdropFilter: backdropFilter,
      padding: `${paddingY}px ${paddingX}px`,
      gap: `${gap}px`,
      fontSize: fontSizeMap[fontSize],
      fontWeight: fontWeightMap[fontWeight],
      letterSpacing: letterSpacingMap[letterSpacing],
      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    } as React.CSSProperties,
    primaryColor,
    accentColor,
    textColor,
    theme,
  };
}

export function getInteractionStateClasses(state: string) {
  switch (state) {
    case 'hover':
      return 'ring-2 ring-cyan-500/50 scale-[1.01] brightness-110';
    case 'active':
    case 'pressed':
      return 'scale-[0.98] ring-2 ring-cyan-400';
    case 'focus':
      return 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900';
    case 'disabled':
      return 'opacity-40 pointer-events-none grayscale';
    case 'loading':
      return 'animate-pulse pointer-events-none';
    case 'selected':
      return 'ring-2 ring-cyan-400 bg-cyan-950/40';
    default:
      return '';
  }
}
