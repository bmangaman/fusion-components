import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterArrayInputComparator {
  CONTAINS = 'contains',
  DOES_NOT_CONTAIN = 'doesNotContain',
}

export interface TableFilterArrayTranslations extends TableFilterTranslations {
  comparators: {
    [key in TableFilterArrayInputComparator]?: string;
  };
  fields: {
    value: string;
  };
}

export const DEFAULT_TABLE_FILTER_ARRAY_TRANSLATIONS: TableFilterArrayTranslations = {
  comparator: {
    comparatorLabel: 'Array',
  },
  comparators: {
    contains: 'contains',
    doesNotContain: 'does not contain',
  },
  fields: {
    value: 'value',
  },
};
