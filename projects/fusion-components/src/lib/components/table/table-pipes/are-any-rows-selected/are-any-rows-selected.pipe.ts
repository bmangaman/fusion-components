import { Pipe, PipeTransform } from '@angular/core';

import { TableRowData } from '../../table.interface';
import { AreAllVisibleRowsSelectedPipe } from '../are-all-visible-rows-selected/are-all-visible-rows-selected.pipe';

/**
 * ARE ANY ROWS SELECTED PIPE
 *
 * The are-any-rows-selected pipe is to be used with the table component.
 * This pipe checks whether or not any (but NOT all) rows are selected.
 */
@Pipe({name: 'areAnyRowsSelected'})
export class AreAnyRowsSelectedPipe implements PipeTransform {
  readonly areAllVisibleRowsSelectedPipe: AreAllVisibleRowsSelectedPipe = new AreAllVisibleRowsSelectedPipe();

  /**
   * Determines whether or not the provided data has any selected rows.
   *
   * @param data The table row data.
   * @returns True if the provided data has any selected rows; false otherwise.
   */
  transform(data: TableRowData[]): boolean {
    if (!data?.length) {
      return false;
    }

    return !this.areAllVisibleRowsSelectedPipe.transform(data) &&
      !!data.filter((d: TableRowData) => d.isSelected && !d.isFiltered && !d.isNotInView).length;
  }
}
