import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  ProductCardCartSimulator,
  OrderSummarySimulator,
} from './components/EcommerceSimulators';

export const EcommerceRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'order-summary':
    case 'coupon-input':
    case 'checkout-form':
    case 'payment-method-selector':
    case 'shopping-cart-drawer':
    case 'order-tracking-timeline':
      return <OrderSummarySimulator variantId={activeVariantId} />;
    case 'product-gallery':
    case 'product-details-panel':
    case 'product-variant-selector':
    case 'quantity-selector':
    case 'add-to-cart-button':
    case 'wishlist-button':
    case 'product-rating':
    case 'review-card':
    case 'stock-indicator':
    case 'price-comparison':
    default:
      return <ProductCardCartSimulator variantId={activeVariantId} />;
  }
};
