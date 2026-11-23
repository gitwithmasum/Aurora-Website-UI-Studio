import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  LoadingSpinnerSimulator,
  CircularProgressSimulator,
  AnimatedDotsSimulator,
  ProgressRingSimulator,
  IndeterminateLoaderSimulator,
} from './components/SpinnerRingComponents';
import {
  LinearProgressBarSimulator,
  UploadProgressSimulator,
  StepProgressIndicatorSimulator,
  MultiStepProgressBarSimulator,
  TimelineProgressSimulator,
} from './components/ProgressBarComponents';
import {
  SkeletonLoaderSimulator,
  ShimmerEffectSimulator,
  PageLoadingScreenSimulator,
  ButtonLoadingStateSimulator,
} from './components/SkeletonLoaderComponents';

export const ProgressRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    // 1. Spinners & Rings
    case 'loading-spinner':
      return <LoadingSpinnerSimulator variantId={activeVariantId} />;
    case 'circular-progress':
      return <CircularProgressSimulator variantId={activeVariantId} />;
    case 'animated-dots':
      return <AnimatedDotsSimulator variantId={activeVariantId} />;
    case 'progress-ring':
      return <ProgressRingSimulator variantId={activeVariantId} />;
    case 'indeterminate-loader':
      return <IndeterminateLoaderSimulator variantId={activeVariantId} />;

    // 2. Progress Bars
    case 'linear-progress-bar':
      return <LinearProgressBarSimulator variantId={activeVariantId} />;
    case 'upload-progress':
      return <UploadProgressSimulator variantId={activeVariantId} />;
    case 'step-progress-indicator':
      return <StepProgressIndicatorSimulator variantId={activeVariantId} />;
    case 'multi-step-progress-bar':
      return <MultiStepProgressBarSimulator variantId={activeVariantId} />;
    case 'timeline-progress':
      return <TimelineProgressSimulator variantId={activeVariantId} />;

    // 3. Skeletons & Loaders
    case 'skeleton-loader':
      return <SkeletonLoaderSimulator variantId={activeVariantId} />;
    case 'shimmer-effect':
      return <ShimmerEffectSimulator variantId={activeVariantId} />;
    case 'page-loading-screen':
      return <PageLoadingScreenSimulator variantId={activeVariantId} />;
    case 'button-loading-state':
      return <ButtonLoadingStateSimulator variantId={activeVariantId} />;

    default:
      return <LoadingSpinnerSimulator variantId={activeVariantId} />;
  }
};
