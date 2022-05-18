import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterIpInputComparator {
  IS = 'is',
  IS_NOT = 'isNot',
  CONTAINS = 'contains',
  DOES_NOT_CONTAIN = 'doesNotContain',
}

export interface TableFilterIpTranslations extends TableFilterTranslations {
  comparators?: {
    [key in TableFilterIpInputComparator]?: string;
  };
  fields?: {
    octet1?: string;
    octet2?: string;
    octet3?: string;
    octet4?: string;
    ip?: string;
  };
}
