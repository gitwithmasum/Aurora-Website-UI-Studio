import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  MagneticTiltSimulator,
  MicroInteractionTriggerSimulator,
} from './components/AnimationSimulators';

export const AnimationRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'three-d-tilt-effect':
    case 'hover-animation':
    case 'magnetic-cursor':
    case 'custom-cursor':
    case 'magnetic-button-effect':
    case 'parallax-effect':
    case 'cursor-following-glow':
    case 'glow-effect':
    case 'interactive-gradient':
      return <MagneticTiltSimulator variantId={activeVariantId} />;
    case 'click-animation':
    case 'ripple-effect':
    case 'smooth-scrolling':
    case 'scroll-reveal':
    case 'fade-in-out':
    case 'slide-in-out':
    case 'scale-animation':
    case 'morphing-animation':
    case 'elastic-animation':
    case 'spring-animation':
    case 'animated-underline':
    case 'liquid-animation':
    case 'particle-effect':
    case 'page-transition':
    case 'stagger-animation':
    case 'animated-background':
    default:
      return <MicroInteractionTriggerSimulator variantId={activeVariantId} />;
  }
};
