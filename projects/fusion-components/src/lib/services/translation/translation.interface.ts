import { DEFAULT_NOTIFICATION_TRANSLATIONS, NotificationTranslations } from '../../components/notification';
import { DEFAULT_SELECT_TRANSLATIONS, SelectTranslations } from '../../components/select';
import { DEFAULT_TABLE_TRANSLATIONS, TableTranslations } from '../../components/table';
import { DEFAULT_UPLOAD_TRANSLATIONS, UploadTranslations } from '../../components/upload';
import { DEFAULT_ERROR_MESSAGE_GENERATOR_TRANSLATIONS, ErrorMessageGeneratorTranslations } from '../error-message-generator/error-message-generator.interface';

export interface FusionTranslations {
  components: {
    table: TableTranslations,
    notification: NotificationTranslations,
    select: SelectTranslations,
    upload: UploadTranslations,
  },
  services: {
    errorMessageGenerator: ErrorMessageGeneratorTranslations,
  },
}

export const DEFAULT_FUSION_TRANSLATIONS: FusionTranslations = {
  components: {
    table: DEFAULT_TABLE_TRANSLATIONS,
    notification: DEFAULT_NOTIFICATION_TRANSLATIONS,
    select: DEFAULT_SELECT_TRANSLATIONS,
    upload: DEFAULT_UPLOAD_TRANSLATIONS,
  },
  services: {
    errorMessageGenerator: DEFAULT_ERROR_MESSAGE_GENERATOR_TRANSLATIONS,
  },
};