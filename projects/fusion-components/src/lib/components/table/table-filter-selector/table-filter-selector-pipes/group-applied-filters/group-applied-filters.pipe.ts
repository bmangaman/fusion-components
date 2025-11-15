import { Pipe, PipeTransform, QueryList } from '@angular/core';

import { TableFilterComponent } from '../../../table-filters/table-filter/table-filter.component';
import { AppliedFilterGroup } from './group-applied-filters.interface';

/**
 * GROUP APPLIED FILTERS PIPE
 *
 * The group-applied-filters pipe is to be used with the table fitler selector component.
 * It groups the applied filters together by their names.
 */
@Pipe({
    name: 'groupAppliedFilters',
    standalone: false
})
export class GroupAppliedFiltersPipe implements PipeTransform {

  /**
   * Groups the provided applied filters by their names.
   *
   * @param appliedFilters The applied filters to be grouped.
   * @param filtersList All of the available filters.
   * @returns The filters grouped together to be displayed in the filter selector component.
   */
  transform(appliedFilters: TableFilterComponent[], filtersList: QueryList<TableFilterComponent>): AppliedFilterGroup[] {
    if (!appliedFilters || !appliedFilters.length || !filtersList || !filtersList.toArray().length) {
      return [];
    }

    const filters: TableFilterComponent[] = filtersList.toArray();

    const appliedFilterGroups: AppliedFilterGroup[] = [];

    filters.filter((filter: TableFilterComponent) => filter.isVisible).forEach((filter: TableFilterComponent) => {
      const filterGroup: AppliedFilterGroup = {
        filterName: filter.filterName,
        applications: appliedFilters.filter((appliedFilter: TableFilterComponent) => {
          const filterNameEqual: boolean = !!(appliedFilter.filterName && filter.filterName) && appliedFilter.filterName === filter.filterName;
          const filterFieldEqual: boolean = !!(appliedFilter.field && filter.field) && appliedFilter.field === filter.field;
          return filterNameEqual || filterFieldEqual;
        })
      };

      if (filterGroup.applications.length) {
        appliedFilterGroups.push(filterGroup);
      }
    });

    return appliedFilterGroups;
  }
}
