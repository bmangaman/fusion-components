import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterNumberInputComparator {
  EQUAL_TO = 'equalTo',
  NOT_EQUAL_TO = 'notEqualTo',
  LESS_THAN = 'lessThan',
  GREATER_THAN = 'greaterThan',
}

export interface TableFilterNumberTranslations extends TableFilterTranslations {
  comparators: {
    [key in TableFilterNumberInputComparator]?: string;
  };
  fields: {
    number?: string;
  };
}

export const DEFAULT_TABLE_FILTER_NUMBER_TRANSLATIONS: TableFilterNumberTranslations = {
  comparator: {
    comparatorLabel: 'Number',
  },
  comparators: {
    equalTo: 'equal to',
    notEqualTo: 'not equal to',
    lessThan: 'less than',
    greaterThan: 'greater than',
  },
  fields: {
    number: 'Number',
  },
};
