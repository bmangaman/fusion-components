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
  comparators?: {
    [key in TableFilterStringInputComparator]?: string;
  };
  fields?: {
    string?: string;
  };
}
