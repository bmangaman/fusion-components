import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterNumberInputComparator {
  EQUAL_TO = 'equalTo',
  NOT_EQUAL_TO = 'notEqualTo',
  LESS_THAN = 'lessThan',
  GREATER_THAN = 'greaterThan',
}

export interface TableFilterNumberTranslations extends TableFilterTranslations {
  comparators?: {
    [key in TableFilterNumberInputComparator]?: string;
  };
  fields?: {
    number?: string;
  };
}
