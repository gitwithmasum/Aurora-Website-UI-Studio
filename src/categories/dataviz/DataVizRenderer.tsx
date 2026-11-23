import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  BarChartSimulator,
  LineChartSimulator,
  PieChartSimulator,
  DonutChartSimulator,
  AreaChartSimulator,
  RadarChartSimulator,
  StatisticsWidgetSimulator,
  KpiCardSimulator,
  AnalyticsPanelSimulator,
  DataTableVizSimulator,
  ActivityTimelineVizSimulator,
  HeatmapChartSimulator,
  CalendarHeatmapSimulator,
  LeaderboardWidgetSimulator,
  GaugeChartSimulator,
  SparklineChartSimulator,
  ComparisonChartSimulator,
} from './components/DataVizSimulators';
import { ProgressRingSimulator } from '../progress/components/SpinnerRingComponents';

export const DataVizRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    case 'bar-chart':
      return <BarChartSimulator variantId={activeVariantId} />;
    case 'line-chart':
      return <LineChartSimulator variantId={activeVariantId} />;
    case 'pie-chart':
      return <PieChartSimulator variantId={activeVariantId} />;
    case 'donut-chart':
      return <DonutChartSimulator variantId={activeVariantId} />;
    case 'area-chart':
      return <AreaChartSimulator variantId={activeVariantId} />;
    case 'radar-chart':
      return <RadarChartSimulator variantId={activeVariantId} />;
    case 'progress-ring-chart':
      return <ProgressRingSimulator variantId={activeVariantId} />;
    case 'statistics-widget':
      return <StatisticsWidgetSimulator variantId={activeVariantId} />;
    case 'kpi-card':
      return <KpiCardSimulator variantId={activeVariantId} />;
    case 'analytics-panel':
      return <AnalyticsPanelSimulator variantId={activeVariantId} />;
    case 'data-table-viz':
      return <DataTableVizSimulator variantId={activeVariantId} />;
    case 'activity-timeline-viz':
      return <ActivityTimelineVizSimulator variantId={activeVariantId} />;
    case 'heatmap-chart':
      return <HeatmapChartSimulator variantId={activeVariantId} />;
    case 'calendar-heatmap':
      return <CalendarHeatmapSimulator variantId={activeVariantId} />;
    case 'leaderboard-widget':
      return <LeaderboardWidgetSimulator variantId={activeVariantId} />;
    case 'gauge-chart':
      return <GaugeChartSimulator variantId={activeVariantId} />;
    case 'sparkline-chart':
      return <SparklineChartSimulator variantId={activeVariantId} />;
    case 'comparison-chart':
      return <ComparisonChartSimulator variantId={activeVariantId} />;
    default:
      return <BarChartSimulator variantId={activeVariantId} />;
  }
};
