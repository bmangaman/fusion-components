import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterStringInputComparator {
  IS = 'is',
  IS_NOT = 'isNot',
  CONTAINS = 'contains',
  DOES_NOT_CONTAIN = 'doesNotContain',
  IS_EMPTY = 'isEmpty',
  IS_NOT_EMPTY = 'isNotEmpty',
}

export interface TableFilterStringTranslations extends TableFilterTranslations {
  comparators: {
    [key in TableFilterStringInputComparator]?: string;
  };
  fields: {
    string?: string;
  };
}

export const DEFAULT_TABLE_FILTER_STRING_TRANSLATIONS: TableFilterStringTranslations = {
  comparator: {
    comparatorLabel: 'Text',
  },
  comparators: {
    contains: 'contains',
    doesNotContain: 'does not contain',
    is: 'is',
    isNot: 'is not',
    isEmpty: 'is empty',
    isNotEmpty: 'is not empty',
  },
  fields: {
    string: 'Text',
  },
};
