import { Pipe, PipeTransform } from '@angular/core';

import { cloneDeep } from 'lodash-es';

import { TableRowData } from '../../table.interface';

/**
 * REMOVE TABLE ROW FORMATTING PIPE
 *
 * The remove-table-row-formatting pipe is to be used with the table component.
 * This pipe removes all the custom table-related keys and values appended to the based data for
 *  - emitting what rows/ values are selected
 *  - emitting what rows/ values are expanded
 *  - downloading the data
 */
@Pipe({
    name: 'removeTableRowFormatting',
    standalone: false
})
export class RemoveTableRowFormattingPipe implements PipeTransform {

  /**
   * Removes the following attributes from the table row data to return it to its original state:
   *  - isExpandable
   *  - isExpanded
   *  - isSelectable
   *  - isSelected
   *  - isVisible
   *  - isActionable
   *  - tableRowUuid
   *  - isNotInView
   *  - isFiltered
   *
   * @param data the table row data to be cleaned up
   */
  transform(data: TableRowData[] | undefined): any[] {
    if (!data || !data.length) {
      return [];
    }

    const newData: any[] = cloneDeep(data);

    newData.forEach((d: TableRowData) => {
      delete d.isExpandable;
      delete d.isExpanded;
      delete d.isSelectable;
      delete d.isSelected;
      delete d.isVisible;
      delete d.isActionable;
      delete d.tableRowUuid;
      delete d.isNotInView;
      delete d.isFiltered;
    });

    return newData;
  }
}
