import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  ToastNotificationSimulator,
  SnackbarSimulator,
  SuccessMessageSimulator,
  ErrorMessageSimulator,
  WarningMessageSimulator,
  InfoMessageSimulator,
  NotificationBadgeSimulator,
  NotificationCenterSimulator,
  NotificationDropdownSimulator,
  AlertBannerSimulator,
  InlineFeedbackSimulator,
  StatusIndicatorSimulator,
  PulseIndicatorSimulator,
  LiveActivityIndicatorSimulator,
  ConnectionStatusSimulator,
  EmptyStateMessageSimulator,
} from './components/NotificationFeedbackSimulators';

export const NotificationFeedbackRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'toast-notification':
      return <ToastNotificationSimulator variantId={activeVariantId} />;
    case 'snackbar':
      return <SnackbarSimulator variantId={activeVariantId} />;
    case 'success-message':
      return <SuccessMessageSimulator variantId={activeVariantId} />;
    case 'error-message':
      return <ErrorMessageSimulator variantId={activeVariantId} />;
    case 'warning-message':
      return <WarningMessageSimulator variantId={activeVariantId} />;
    case 'info-message':
      return <InfoMessageSimulator variantId={activeVariantId} />;
    case 'notification-badge':
      return <NotificationBadgeSimulator variantId={activeVariantId} />;
    case 'notification-center':
      return <NotificationCenterSimulator variantId={activeVariantId} />;
    case 'notification-dropdown':
      return <NotificationDropdownSimulator variantId={activeVariantId} />;
    case 'alert-banner':
      return <AlertBannerSimulator variantId={activeVariantId} />;
    case 'inline-feedback':
      return <InlineFeedbackSimulator variantId={activeVariantId} />;
    case 'status-indicator':
      return <StatusIndicatorSimulator variantId={activeVariantId} />;
    case 'pulse-indicator':
      return <PulseIndicatorSimulator variantId={activeVariantId} />;
    case 'live-activity-indicator':
      return <LiveActivityIndicatorSimulator variantId={activeVariantId} />;
    case 'connection-status':
      return <ConnectionStatusSimulator variantId={activeVariantId} />;
    case 'empty-state-message':
      return <EmptyStateMessageSimulator variantId={activeVariantId} />;
    default:
      return <ToastNotificationSimulator variantId={activeVariantId} />;
  }
};
