import React from 'react';
import { useStudio } from '../../context/StudioContext';
import { 
  TopNavigationBar,
  StickyHeader,
  TransparentHeader,
  FloatingHeader,
  MinimalHeader,
  SplitHeader,
  AnnouncementBar,
  SecondaryHeader
} from './components/HeaderComponents';
import { 
  NavbarComponent,
  SidebarNavigationComponent,
  BottomNavigationBarComponent,
  FloatingNavigationComponent,
  GlassNavigationBarComponent,
  MegaMenuComponent,
  DropdownMenuComponent
} from './components/NavigationComponentsPart1';
import { 
  HamburgerMenuComponent,
  NavigationDrawerComponent,
  BreadcrumbNavigationComponent,
  TabNavigationComponent,
  CommandMenuComponent,
  DockNavigationComponent,
  PaginationBarComponent
} from './components/NavigationComponentsPart2';
import { 
  ProfileNavigationComponent,
  ProfileDropdownComponent,
  QuickActionMenuComponent,
  SearchBarComponent,
  NotificationMenuComponent,
  AccountSwitcherComponent,
  UserStatusPresenceComponent
} from './components/ProfileAndActionComponents';
import { 
  ActiveMenuHighlightComponent,
  AnimatedUnderlineComponent,
  StretchyHighlightComponent,
  MagneticNavigationComponent,
  HoverRevealMenuComponent,
  CollapsibleSidebarComponent,
  NeonGlowingTabComponent
} from './components/NavigationEffectsComponents';

export const NavigationRenderer: React.FC = () => {
  const { activeComponent, activeVariantId, customizations } = useStudio();

  const renderComponent = () => {
    switch (activeComponent.id) {
      // 1. Headers
      case 'top-navigation-bar':
        return <TopNavigationBar settings={customizations} variantId={activeVariantId} />;
      case 'sticky-header':
        return <StickyHeader settings={customizations} variantId={activeVariantId} />;
      case 'transparent-header':
        return <TransparentHeader settings={customizations} variantId={activeVariantId} />;
      case 'floating-header':
        return <FloatingHeader settings={customizations} variantId={activeVariantId} />;
      case 'minimal-header':
        return <MinimalHeader settings={customizations} variantId={activeVariantId} />;
      case 'split-header':
        return <SplitHeader settings={customizations} variantId={activeVariantId} />;
      case 'announcement-bar':
        return <AnnouncementBar settings={customizations} variantId={activeVariantId} />;
      case 'secondary-header':
        return <SecondaryHeader settings={customizations} variantId={activeVariantId} />;

      // 2. Navigation
      case 'navbar':
        return <NavbarComponent settings={customizations} variantId={activeVariantId} />;
      case 'sidebar-navigation':
        return <SidebarNavigationComponent settings={customizations} variantId={activeVariantId} />;
      case 'bottom-navigation-bar':
        return <BottomNavigationBarComponent settings={customizations} variantId={activeVariantId} />;
      case 'floating-navigation':
        return <FloatingNavigationComponent settings={customizations} variantId={activeVariantId} />;
      case 'glass-navigation-bar':
        return <GlassNavigationBarComponent settings={customizations} variantId={activeVariantId} />;
      case 'mega-menu':
        return <MegaMenuComponent settings={customizations} variantId={activeVariantId} />;
      case 'dropdown-menu':
        return <DropdownMenuComponent settings={customizations} variantId={activeVariantId} />;
      case 'hamburger-menu':
        return <HamburgerMenuComponent settings={customizations} variantId={activeVariantId} />;
      case 'navigation-drawer':
        return <NavigationDrawerComponent settings={customizations} variantId={activeVariantId} />;
      case 'breadcrumb-navigation':
        return <BreadcrumbNavigationComponent settings={customizations} variantId={activeVariantId} />;
      case 'tab-navigation':
        return <TabNavigationComponent settings={customizations} variantId={activeVariantId} />;
      case 'command-menu':
        return <CommandMenuComponent settings={customizations} variantId={activeVariantId} />;
      case 'dock-navigation':
        return <DockNavigationComponent settings={customizations} variantId={activeVariantId} />;
      case 'pagination-nav':
        return <PaginationBarComponent settings={customizations} variantId={activeVariantId} />;

      // 3. Profile & Actions
      case 'profile-navigation':
        return <ProfileNavigationComponent settings={customizations} variantId={activeVariantId} />;
      case 'profile-dropdown':
        return <ProfileDropdownComponent settings={customizations} variantId={activeVariantId} />;
      case 'quick-action-menu':
        return <QuickActionMenuComponent settings={customizations} variantId={activeVariantId} />;
      case 'search-bar':
        return <SearchBarComponent settings={customizations} variantId={activeVariantId} />;
      case 'notification-menu':
        return <NotificationMenuComponent settings={customizations} variantId={activeVariantId} />;
      case 'account-switcher':
        return <AccountSwitcherComponent settings={customizations} variantId={activeVariantId} />;
      case 'user-badge-nav':
        return <UserStatusPresenceComponent settings={customizations} variantId={activeVariantId} />;

      // 4. Effects
      case 'active-menu-highlight':
        return <ActiveMenuHighlightComponent settings={customizations} variantId={activeVariantId} />;
      case 'animated-underline':
        return <AnimatedUnderlineComponent settings={customizations} variantId={activeVariantId} />;
      case 'stretchy-highlight':
        return <StretchyHighlightComponent settings={customizations} variantId={activeVariantId} />;
      case 'magnetic-navigation':
        return <MagneticNavigationComponent settings={customizations} variantId={activeVariantId} />;
      case 'hover-reveal-menu':
        return <HoverRevealMenuComponent settings={customizations} variantId={activeVariantId} />;
      case 'collapsible-sidebar':
        return <CollapsibleSidebarComponent settings={customizations} variantId={activeVariantId} />;
      case 'glowing-active-tab':
        return <NeonGlowingTabComponent settings={customizations} variantId={activeVariantId} />;

      default:
        return <TopNavigationBar settings={customizations} variantId={activeVariantId} />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {renderComponent()}
    </div>
  );
};
