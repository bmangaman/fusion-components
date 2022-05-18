import { Observable } from 'rxjs';
import { TableFilterComponent } from '../table-filters';
import { TableFilterTranslations } from '../table-filters/table-filter/table-filter.interface';

export interface TableFilterConfig {
  label?: string | Observable<string>;
  field: string;
  filter: typeof TableFilterComponent;
  filterName: string;
  comparatorName: string;
  formValues: { [key: string]: any };
  isApplied?: boolean;
  uuid?: string;
  isVisible?: boolean;
  isVisibleInSelector?: boolean;
  isViewFilter?: boolean;
  translations?: TableFilterTranslations;
  valueTransformFunction?(val: any): any;
}

export interface TableFilterSelectorTranslations {
  removeAll?: string;
  removeFilter?: string;
  filterApplied?: string;
  filtersApplied?: string;
  menuTitle?: string;
  buttonAria?: string;
  menuDialogLabelledBy?: string;
  closeButtonAriaLabel?: string;
  allColumnsHidden?: string;
  columnSelectorLabel?: string;
}
