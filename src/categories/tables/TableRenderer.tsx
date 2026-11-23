import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  BasicTableSimulator,
  AdvancedDataTableSimulator,
  SortableTableSimulator,
  PaginationSimulator,
  SelectableRowTableSimulator,
  BulkActionBarSimulator,
  DragDropListSimulator,
} from './components/TableSimulators';

export const TableRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'basic-table':
    case 'responsive-table':
    case 'compact-list':
    case 'grouped-list':
      return <BasicTableSimulator variantId={activeVariantId} />;
    case 'advanced-data-table':
    case 'filterable-table':
    case 'table-toolbar':
    case 'table-filter-chips':
    case 'table-action-menu':
      return <AdvancedDataTableSimulator variantId={activeVariantId} />;
    case 'sortable-table':
      return <SortableTableSimulator variantId={activeVariantId} />;
    case 'pagination-control':
      return <PaginationSimulator variantId={activeVariantId} />;
    case 'selectable-row-table':
    case 'expandable-row-table':
      return <SelectableRowTableSimulator variantId={activeVariantId} />;
    case 'bulk-action-bar':
      return <BulkActionBarSimulator variantId={activeVariantId} />;
    case 'drag-drop-list':
    case 'infinite-scroll-list':
    case 'list-view':
    case 'grid-view':
      return <DragDropListSimulator variantId={activeVariantId} />;
    default:
      return <BasicTableSimulator variantId={activeVariantId} />;
  }
};
