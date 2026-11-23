import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  ProfileCardSimulator,
  ProductCardSimulator,
  PricingCardSimulator,
  FeatureCardSimulator,
  StatisticsCardSimulator,
  DashboardCardSimulator,
  NotificationCardSimulator,
} from './components/ContentCardComponents';
import {
  GlassCardSimulator,
  GradientCardSimulator,
  FloatingCardSimulator,
  InteractiveCardSimulator,
  HoverRevealCardSimulator,
  FlipCardSimulator,
} from './components/AestheticCardComponents';
import {
  TestimonialCardSimulator,
  TeamMemberCardSimulator,
  CourseCardSimulator,
  BlogCardSimulator,
  ProjectCardSimulator,
  StatusCardSimulator,
  BentoGridCardSimulator,
} from './components/FeatureProjectCardComponents';

export const CardRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    // Subcategory 1: Content Cards
    case 'profile-card':
      return <ProfileCardSimulator variantId={activeVariantId} />;
    case 'product-card':
      return <ProductCardSimulator variantId={activeVariantId} />;
    case 'pricing-card':
      return <PricingCardSimulator variantId={activeVariantId} />;
    case 'feature-card':
      return <FeatureCardSimulator variantId={activeVariantId} />;
    case 'statistics-card':
      return <StatisticsCardSimulator variantId={activeVariantId} />;
    case 'dashboard-card':
      return <DashboardCardSimulator variantId={activeVariantId} />;
    case 'notification-card':
      return <NotificationCardSimulator variantId={activeVariantId} />;

    // Subcategory 2: Aesthetic Cards
    case 'glass-card':
      return <GlassCardSimulator variantId={activeVariantId} />;
    case 'gradient-card':
      return <GradientCardSimulator variantId={activeVariantId} />;
    case 'floating-card':
      return <FloatingCardSimulator variantId={activeVariantId} />;
    case 'interactive-card':
      return <InteractiveCardSimulator variantId={activeVariantId} />;
    case 'hover-reveal-card':
      return <HoverRevealCardSimulator variantId={activeVariantId} />;
    case 'flip-card':
      return <FlipCardSimulator variantId={activeVariantId} />;

    // Subcategory 3: Feature & Project Cards
    case 'testimonial-card':
      return <TestimonialCardSimulator variantId={activeVariantId} />;
    case 'team-member-card':
      return <TeamMemberCardSimulator variantId={activeVariantId} />;
    case 'course-card':
      return <CourseCardSimulator variantId={activeVariantId} />;
    case 'blog-card':
      return <BlogCardSimulator variantId={activeVariantId} />;
    case 'project-card':
      return <ProjectCardSimulator variantId={activeVariantId} />;
    case 'status-card':
      return <StatusCardSimulator variantId={activeVariantId} />;
    case 'bento-grid-card':
      return <BentoGridCardSimulator variantId={activeVariantId} />;

    default:
      return <ProfileCardSimulator variantId={activeVariantId} />;
  }
};
