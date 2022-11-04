export interface ErrorMessageTranslations {
  singular: string;
  plural?: string;
}

export interface ErrorMessageGeneratorTranslations {
  required: ErrorMessageTranslations;
  maxlength: ErrorMessageTranslations;
  minlength: ErrorMessageTranslations;
  [key: string]: ErrorMessageTranslations;
}

export const DEFAULT_ERROR_MESSAGE_GENERATOR_TRANSLATIONS: ErrorMessageGeneratorTranslations = {
  required: {
    singular: 'Required',
  },
  maxlength: {
    singular: 'Maximum of {{ max }} character',
    plural: 'Maximum of {{ max }} characters',
  },
  minlength: {
    singular: 'Minimum of {{ min }} character',
    plural: 'Minimum of {{ min }} characters',
  },
}