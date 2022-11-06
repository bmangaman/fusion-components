import { TableFilterTranslations } from '../table-filter/table-filter.interface';

export enum TableFilterIpInputComparator {
  IS = 'is',
  IS_NOT = 'isNot',
  CONTAINS = 'contains',
  DOES_NOT_CONTAIN = 'doesNotContain',
}

export interface TableFilterIpTranslations extends TableFilterTranslations {
  comparators: {
    [key in TableFilterIpInputComparator]?: string;
  };
  fields: {
    octet1: string;
    octet2: string;
    octet3: string;
    octet4: string;
    ip: string;
  };
}

export const DEFAULT_TABLE_FILTER_IP_TRANSLATIONS: TableFilterIpTranslations = {
  comparator: {
    comparatorLabel: 'IP Address',
  },
  comparators: {
    contains: 'contains',
    doesNotContain: 'does not contain',
    is: 'is',
    isNot: 'is not'
  },
  fields: {
    octet1: 'Octet 1',
    octet2: 'Octet 2',
    octet3: 'Octet 3',
    octet4: 'Octet 4',
    ip: 'IP',
  },
};

export interface TableFilterIpForm {
  octet1: string;
  octet2: string;
  octet3: string;
  octet4: string;
  ip: string;
}
