export interface SelectOption {
  label: string;
  value: any;
  isDisabled?: boolean;
}

export interface SelectTranslations {
  defaultLabel: string;
  noResults: string;
}

export const DEFAULT_SELECT_TRANSLATIONS: SelectTranslations = {
  defaultLabel: '- Select -',
  noResults: 'No Results',
};
