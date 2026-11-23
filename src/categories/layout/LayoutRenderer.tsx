import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  BentoLayoutSimulator,
  SplitLayoutSimulator,
} from './components/LayoutSimulators';

export const LayoutRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'split-layout':
    case 'split-screen':
    case 'multi-column-layout':
    case 'responsive-layout':
    case 'asymmetric-layout':
    case 'dashboard-layout':
      return <SplitLayoutSimulator variantId={activeVariantId} />;
    case 'bento-layout':
    case 'hero-section':
    case 'grid-layout':
    case 'masonry-layout':
    case 'container-layout':
    case 'content-wrapper':
    case 'section-divider':
    case 'vertical-divider':
    case 'horizontal-divider':
    case 'spacer-element':
    case 'sticky-section':
    case 'floating-panel':
    default:
      return <BentoLayoutSimulator variantId={activeVariantId} />;
  }
};
