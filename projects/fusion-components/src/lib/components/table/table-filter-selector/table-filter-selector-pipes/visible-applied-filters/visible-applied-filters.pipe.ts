import { Pipe, PipeTransform } from '@angular/core';

import { TableFilterComponent } from '../../../table-filters/table-filter/table-filter.component';

/**
 * VISIBLE APPLIED FILTERS PIPE
 *
 * The visible-applied-filters pipe is to be used with the table fitler selector component.
 * It returns all the applied filters that are visible.
 */
@Pipe({
    name: 'visibleAppliedFilters',
    standalone: false
})
export class VisibleAppliedFiltersPipe implements PipeTransform {

  /**
   * Returns all the visible filters.
   *
   * @param appliedFilters The filters to be filtered.
   * @returns The visible filters.
   */
  transform(appliedFilters: TableFilterComponent[]): TableFilterComponent[] {
    if (!appliedFilters || !appliedFilters.length) {
      return [];
    }

    return appliedFilters.filter((filter: TableFilterComponent) => filter.isVisible);
  }
}
