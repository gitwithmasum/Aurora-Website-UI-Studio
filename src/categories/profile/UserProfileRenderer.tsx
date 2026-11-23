import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  AvatarSimulator,
  AvatarGroupSimulator,
  ProfileDropdownSimulator,
  TwoFactorAuthSimulator,
  SocialProfileLinksSimulator,
} from './components/UserProfileSimulators';

export const UserProfileRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'avatar-component':
    case 'user-status-badge':
    case 'online-indicator':
    case 'profile-header':
    case 'profile-cover':
      return <AvatarSimulator variantId={activeVariantId} />;
    case 'avatar-group':
      return <AvatarGroupSimulator variantId={activeVariantId} />;
    case 'profile-dropdown':
    case 'account-settings-panel':
    case 'profile-edit-form':
    case 'security-settings-panel':
    case 'password-change-panel':
    case 'account-switcher':
    case 'user-activity-feed':
    case 'profile-statistics':
      return <ProfileDropdownSimulator variantId={activeVariantId} />;
    case 'two-factor-auth':
      return <TwoFactorAuthSimulator variantId={activeVariantId} />;
    case 'social-profile-links':
      return <SocialProfileLinksSimulator variantId={activeVariantId} />;
    default:
      return <AvatarSimulator variantId={activeVariantId} />;
  }
};
