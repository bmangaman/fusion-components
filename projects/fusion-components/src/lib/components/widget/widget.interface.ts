import { BadgeConfig } from '../badge';

export enum WidgetTemplate {
  HEADER = 'header',
  INFO_BOX = 'infoBox',
  INFO_DETAILS = 'infoDetails',
}

export interface InfoBoxDetail {
  header?: string | number;
  content?: string | number;
  footer?: string | number;
  badges?: BadgeConfig[];
}

export interface WidgetTranslations {
  lastUpdated?: string;
  infoDetailsButton?: string;
  refreshAriaLabel?: string;
  detailsToggleButtonAriaLabel?: string;
}

export const DEFAULT_WIDGET_TRANSLATIONS: WidgetTranslations = {
  lastUpdated: 'Last Updated',
  infoDetailsButton: 'Details',
  refreshAriaLabel: 'Refresh data',
  detailsToggleButtonAriaLabel: 'Toggle additional data',
};
