import { FilterComparatorTranslations } from '../table-filter-comparator';

export interface TableFilterTranslations {
  comparators?: {
    [key: string]: string;
  };
  fields?: {
    [key: string]: string;
  };
  comparator?: FilterComparatorTranslations;
}
