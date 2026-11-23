import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  StandardFooterSimulator,
  MinimalFooterSimulator,
} from './components/FooterSimulators';

export const FooterRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'minimal-footer':
    case 'copyright-section':
    case 'legal-links':
    case 'back-to-top-button':
    case 'language-selector':
    case 'theme-selector':
      return <MinimalFooterSimulator variantId={activeVariantId} />;
    case 'standard-footer':
    case 'multi-column-footer':
    case 'social-links':
    case 'newsletter-subscription':
    case 'footer-navigation':
    case 'contact-information':
    default:
      return <StandardFooterSimulator variantId={activeVariantId} />;
  }
};
