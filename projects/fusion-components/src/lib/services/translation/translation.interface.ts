import { DEFAULT_CARD_TRANSLATIONS, CardTranslations } from '../../components/card/card.interface';
import { DEFAULT_LINEAR_GAUGE_TRANSLATIONS, LinearGaugeTranslations } from './../../components/linear-gauge/linear-gauge.interface';
import { DEFAULT_NOTIFICATION_TRANSLATIONS, NotificationTranslations } from '../../components/notification/notification.interface';
import { DEFAULT_SELECT_TRANSLATIONS, SelectTranslations } from '../../components/select/select.interface';
import { DEFAULT_TABLE_TRANSLATIONS, TableTranslations } from '../../components/table/table.interface';
import { DEFAULT_UPLOAD_TRANSLATIONS, UploadTranslations } from '../../components/upload/upload.interface';
import { DEFAULT_ERROR_MESSAGE_GENERATOR_TRANSLATIONS, ErrorMessageGeneratorTranslations } from '../error-message-generator/error-message-generator.interface';

export interface FusionTranslations {
  components: {
    card: CardTranslations;
    linearGauge: LinearGaugeTranslations
    notification: NotificationTranslations,
    select: SelectTranslations,
    table: TableTranslations,
    upload: UploadTranslations,
  },
  services: {
    errorMessageGenerator: ErrorMessageGeneratorTranslations,
  },
}

export const DEFAULT_FUSION_TRANSLATIONS: FusionTranslations = {
  components: {
    card: DEFAULT_CARD_TRANSLATIONS,
    linearGauge: DEFAULT_LINEAR_GAUGE_TRANSLATIONS,
    notification: DEFAULT_NOTIFICATION_TRANSLATIONS,
    select: DEFAULT_SELECT_TRANSLATIONS,
    table: DEFAULT_TABLE_TRANSLATIONS,
    upload: DEFAULT_UPLOAD_TRANSLATIONS,
  },
  services: {
    errorMessageGenerator: DEFAULT_ERROR_MESSAGE_GENERATOR_TRANSLATIONS,
  },
};