import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  CyberpunkHUDSimulator,
  TerminalShellSimulator,
} from './components/SpecialSimulators';

export const SpecialRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'terminal-window':
    case 'code-editor-panel':
    case 'ai-chat-interface':
    case 'chat-bubble':
    case 'chat-input-composer':
    case 'multi-tab-workspace':
      return <TerminalShellSimulator variantId={activeVariantId} />;
    case 'glassmorphism-panel':
    case 'neumorphism-button':
    case 'holographic-card':
    case 'cyberpunk-panel':
    case 'hud-interface':
    case 'command-center':
    case 'interactive-map':
    case 'timeline-component':
    case 'kanban-board':
    case 'calendar-widget':
    case 'drag-and-drop-builder':
    case 'split-pane':
    case 'resizable-panel':
    case 'floating-widget':
    default:
      return <CyberpunkHUDSimulator variantId={activeVariantId} />;
  }
};
