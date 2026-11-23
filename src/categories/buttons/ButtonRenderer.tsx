import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  PrimaryButtonSimulator,
  SecondaryButtonSimulator,
  TertiaryButtonSimulator,
  GhostButtonSimulator,
  OutlineButtonSimulator,
  GradientButtonSimulator,
  GlassButtonSimulator,
} from './components/CoreButtonComponents';
import {
  IconButtonSimulator,
  FabButtonSimulator,
  SplitButtonSimulator,
  DropdownButtonSimulator,
  ToggleButtonSimulator,
  LoadingButtonSimulator,
  ExpandCollapseButtonSimulator,
} from './components/TriggerButtonComponents';
import {
  AnimatedButtonSimulator,
  MagneticButtonSimulator,
  NeonButtonSimulator,
  SocialLoginButtonSimulator,
  CopyButtonSimulator,
  ShareButtonSimulator,
} from './components/AdvancedButtonComponents';

export const ButtonRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    // 1. Core Buttons
    case 'primary-button':
      return <PrimaryButtonSimulator variantId={activeVariantId} />;
    case 'secondary-button':
      return <SecondaryButtonSimulator variantId={activeVariantId} />;
    case 'tertiary-button':
      return <TertiaryButtonSimulator variantId={activeVariantId} />;
    case 'ghost-button':
      return <GhostButtonSimulator variantId={activeVariantId} />;
    case 'outline-button':
      return <OutlineButtonSimulator variantId={activeVariantId} />;
    case 'gradient-button':
      return <GradientButtonSimulator variantId={activeVariantId} />;
    case 'glass-button':
      return <GlassButtonSimulator variantId={activeVariantId} />;

    // 2. Triggers & Controls
    case 'icon-button':
      return <IconButtonSimulator variantId={activeVariantId} />;
    case 'fab-button':
      return <FabButtonSimulator variantId={activeVariantId} />;
    case 'split-button':
      return <SplitButtonSimulator variantId={activeVariantId} />;
    case 'dropdown-button':
      return <DropdownButtonSimulator variantId={activeVariantId} />;
    case 'toggle-button':
      return <ToggleButtonSimulator variantId={activeVariantId} />;
    case 'loading-button':
      return <LoadingButtonSimulator variantId={activeVariantId} />;
    case 'expand-collapse-button':
      return <ExpandCollapseButtonSimulator variantId={activeVariantId} />;

    // 3. Advanced & Micro-FX
    case 'animated-button':
      return <AnimatedButtonSimulator variantId={activeVariantId} />;
    case 'magnetic-button':
      return <MagneticButtonSimulator variantId={activeVariantId} />;
    case 'neon-button':
      return <NeonButtonSimulator variantId={activeVariantId} />;
    case 'social-login-button':
      return <SocialLoginButtonSimulator variantId={activeVariantId} />;
    case 'copy-button':
      return <CopyButtonSimulator variantId={activeVariantId} />;
    case 'share-button':
      return <ShareButtonSimulator variantId={activeVariantId} />;

    default:
      return <PrimaryButtonSimulator variantId={activeVariantId} />;
  }
};
