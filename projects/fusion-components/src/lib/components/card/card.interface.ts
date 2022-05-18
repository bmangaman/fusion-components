import { Observable } from 'rxjs';
import {
  DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS,
  FusionUiStatusLevel,
  FusionUIStatusLevelTranslations,
} from '../../shared';

export interface CardStatus {
  status: FusionUiStatusLevel;
  count?: number;
  text?: Observable<string> | string;
  isHidden?: boolean;
  isTextHidden?: boolean;
  isIconHidden?: boolean;
}

export interface CardTranslations {
  showDetails?: string;
  hideDetails?: string;
  statuses?: FusionUIStatusLevelTranslations;
}

export const DEFAULT_CARD_TRANSLATIONS: CardTranslations = {
  showDetails: 'Show Details',
  hideDetails: 'Hide Details',
  statuses: DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS,
};

export enum CardTemplate {
  TITLE = 'cardTitle',
  CONTENT = 'cardContent',
  DETAILS = 'cardDetails',
  FOOTER = 'cardFooter',
}
