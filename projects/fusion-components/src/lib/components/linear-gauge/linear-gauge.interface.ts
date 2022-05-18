import { DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS, FusionUiStatusLevel, FusionUIStatusLevelTranslations } from '../../shared';

export interface LinearGaugeTranslations extends FusionUIStatusLevelTranslations {
  title?: string;
  total?: string;
  used?: string;
}

export const DEFAULT_LINEAR_GAUGE_TRANSLATIONS: LinearGaugeTranslations = {
  title: 'Capacity',
  total: 'Total',
  used: 'Used',
  ...DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS,
};

export interface LinearGaugeThreshold {
  title: string;
  value: number;
  level: FusionUiStatusLevel;
  passed?: boolean;
}

export interface LinearGaugeState {
  value: number;
  maxValue: number;
  minValue: number;
  thresholds: LinearGaugeThreshold[];
  translations: LinearGaugeTranslations;
}
