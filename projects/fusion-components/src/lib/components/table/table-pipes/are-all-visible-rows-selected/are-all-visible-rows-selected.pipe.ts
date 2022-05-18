import { Pipe, PipeTransform } from '@angular/core';

import { intersection } from 'lodash';

import { TableRowData } from '../../table.interface';

/**
 * ARE ALL VISIBLE ROWS SELECTED PIPE
 *
 * The are-all-visible-rows-selected pipe is to be used with the table component.
 * This pipe checks whether or not the selected and visible data is exactly the same.
 */
@Pipe({name: 'areAllVisibleRowsSelected'})
export class AreAllVisibleRowsSelectedPipe implements PipeTransform {

  /**
   * Determines whether or not the provided visible data equals the provied selected data. It ignores unselectable data.
   *
   * @param data The table row data.
   * @returns True if the visible data equals the selected data; false otherwise.
   */
  transform(data: TableRowData[]): boolean {
    if (!data?.length) {
      return false;
    }

    const visibleData: TableRowData[] = data.filter((d: TableRowData) => d.isVisible && !d.isFiltered && !d.isNotInView && d.isSelectable);
    if (!visibleData.length) {
      // If nothing is selectable and visible then nothing has been selected.
      return false;
    }
    const selectedData: TableRowData[] = data.filter((d: TableRowData) => d.isSelected && d.isSelectable);
    return intersection(visibleData, selectedData).length === visibleData.length;
  }
}
