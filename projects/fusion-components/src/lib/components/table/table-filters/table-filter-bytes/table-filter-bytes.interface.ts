import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterBytesInputComparator {
  EQUAL_TO = 'equalTo',
  NOT_EQUAL_TO = 'notEqualTo',
  LESS_THAN = 'lessThan',
  GREATER_THAN = 'greaterThan',
}

export interface TableFilterBytesTranslations extends TableFilterTranslations {
  comparators?: {
    [key in TableFilterBytesInputComparator]?: string;
  };
  fields?: {
    bytes?: string;
    unit?: string;
  };
}
