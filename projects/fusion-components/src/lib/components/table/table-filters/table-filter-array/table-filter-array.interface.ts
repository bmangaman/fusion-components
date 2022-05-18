import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterArrayInputComparator {
  CONTAINS = 'contains',
  DOES_NOT_CONTAIN = 'doesNotContain',
}

export interface TableFilterArrayTranslations extends TableFilterTranslations {
  comparators?: {
    [key in TableFilterArrayInputComparator]?: string;
  };
  fields?: {
    value?: string;
  };
}
