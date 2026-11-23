import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  ImageGallerySimulator,
  VideoPlayerSimulator,
  AudioPlayerSimulator,
  ComparisonSliderSimulator,
} from './components/MediaSimulators';

export const MediaRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'image-gallery':
    case 'thumbnail-gallery':
    case 'image-cropper':
    case 'media-upload-preview':
    case 'lazy-loading-image':
    case 'avatar-image':
    case 'background-image':
    case 'image-zoom':
      return <ImageGallerySimulator variantId={activeVariantId} />;
    case 'video-player':
    case 'video-thumbnail':
      return <VideoPlayerSimulator variantId={activeVariantId} />;
    case 'audio-player':
      return <AudioPlayerSimulator variantId={activeVariantId} />;
    case 'image-slider':
    case 'image-carousel':
    case 'image-comparison-slider':
    case 'before-after-slider':
      return <ComparisonSliderSimulator variantId={activeVariantId} />;
    default:
      return <ImageGallerySimulator variantId={activeVariantId} />;
  }
};
