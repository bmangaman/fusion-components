import { Pipe, PipeTransform } from '@angular/core';

import { TableRowData } from '../../table.interface';

/**
 * VISIBLE TABLE ROWS PIPE
 *
 * The visible-table-rows pipe is to be used with the table component.
 * It filters and returns visible table row data.
 */
@Pipe({name: 'visibleTableRows'})
export class VisibleTableRowsPipe implements PipeTransform {

  /**
   * Filters the provided table row data by the 'isVisible' attribute. Returns row data that is visible.
   *
   * @param data the array of table row data to be filtered
   * @returns the array of visible table row data
   */
  transform(data: TableRowData[]): TableRowData[] {
    if (!data || !data.length) {
      return data;
    }

    return data.filter((d: TableRowData) => d.isVisible && !d.isFiltered && !d.isNotInView);
  }
}
