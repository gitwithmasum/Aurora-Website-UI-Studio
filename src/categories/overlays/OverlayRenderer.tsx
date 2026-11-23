import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  ModalDialogSimulator,
  ConfirmationModalSimulator,
  AlertDialogSimulator,
  LoginModalSimulator,
  SignupModalSimulator,
  FullscreenOverlaySimulator,
} from './components/ModalDialogComponents';
import {
  BottomSheetSimulator,
  SideDrawerSimulator,
  CommandPaletteOverlaySimulator,
} from './components/DrawerSheetComponents';
import {
  PopoverOverlaySimulator,
  TooltipOverlaySimulator,
  HoverPopupSimulator,
  ContextualPopupSimulator,
  LightboxOverlaySimulator,
  ImagePreviewModalSimulator,
  CookieConsentPopupSimulator,
  ExitIntentPopupSimulator,
} from './components/PopoverNoticeComponents';

export const OverlayRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    // 1. Dialogs & Modals
    case 'modal-dialog':
      return <ModalDialogSimulator variantId={activeVariantId} />;
    case 'confirmation-modal':
      return <ConfirmationModalSimulator variantId={activeVariantId} />;
    case 'alert-dialog':
      return <AlertDialogSimulator variantId={activeVariantId} />;
    case 'login-modal':
      return <LoginModalSimulator variantId={activeVariantId} />;
    case 'signup-modal':
      return <SignupModalSimulator variantId={activeVariantId} />;
    case 'fullscreen-overlay':
      return <FullscreenOverlaySimulator variantId={activeVariantId} />;

    // 2. Drawers & Sheets
    case 'bottom-sheet':
      return <BottomSheetSimulator variantId={activeVariantId} />;
    case 'side-drawer':
      return <SideDrawerSimulator variantId={activeVariantId} />;
    case 'command-palette-overlay':
      return <CommandPaletteOverlaySimulator variantId={activeVariantId} />;

    // 3. Popovers & Tooltips
    case 'popover-overlay':
      return <PopoverOverlaySimulator variantId={activeVariantId} />;
    case 'tooltip-overlay':
      return <TooltipOverlaySimulator variantId={activeVariantId} />;
    case 'hover-popup':
      return <HoverPopupSimulator variantId={activeVariantId} />;
    case 'contextual-popup':
      return <ContextualPopupSimulator variantId={activeVariantId} />;

    // 4. Media & Notices
    case 'lightbox-overlay':
      return <LightboxOverlaySimulator variantId={activeVariantId} />;
    case 'image-preview-modal':
      return <ImagePreviewModalSimulator variantId={activeVariantId} />;
    case 'cookie-consent-popup':
      return <CookieConsentPopupSimulator variantId={activeVariantId} />;
    case 'exit-intent-popup':
      return <ExitIntentPopupSimulator variantId={activeVariantId} />;

    default:
      return <ModalDialogSimulator variantId={activeVariantId} />;
  }
};
