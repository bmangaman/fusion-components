import { TableColumnConfig, TableFilterConfig, TableView } from '@fusion-components/lib/components/table';

export interface AppliedSort {
  field: string;
  order: number;
}

export interface ParamData {
  filters: TableFilterConfig[];
  columns: TableColumnConfig[];
  sort: AppliedSort;
  view: TableView;
}
