import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterBytesInputComparator {
  EQUAL_TO = 'equalTo',
  NOT_EQUAL_TO = 'notEqualTo',
  LESS_THAN = 'lessThan',
  GREATER_THAN = 'greaterThan',
}

export interface TableFilterBytesTranslations extends TableFilterTranslations {
  comparators: {
    [key in TableFilterBytesInputComparator]?: string;
  };
  fields: {
    bytes: string;
    unit: string;
  };
}

export const DEFAULT_TABLE_FILTER_BYTES_TRANSLATIONS: TableFilterBytesTranslations = {
  comparator: {
    comparatorLabel: 'Bytes',
  },
  comparators: {
    equalTo: 'equal to',
    notEqualTo: 'not equal to',
    lessThan: 'less than',
    greaterThan: 'greater than',
  },
  fields: {
    bytes: 'Bytes',
    unit: 'Unit',
  },
};
