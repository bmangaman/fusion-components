import { Pipe, PipeTransform, QueryList } from '@angular/core';

import { TableColumnComponent } from '../../table-column';
import { TableRowData } from '../../table.interface';
import { RemoveTableRowFormattingPipe } from '../remove-table-row-formatting';

/**
 * DOWNLOAD DATA PIPE
 *
 * The Download Data Pipe transforms the provided data to be downloaded.
 */
@Pipe({name: 'downloadTableData'})
export class DownloadTableDataPipe implements PipeTransform {
  readonly removeTableRowFormattingPipe: RemoveTableRowFormattingPipe = new RemoveTableRowFormattingPipe();

  /**
   * Downloads the finalTableData without any table-related attributes.
   *
   * Converts the field (column headers) to the column headers (translated).
   *
   * If any columns were provided with a downloadTransformationFunction, loop through and format
   * the data using that logic. Note: using downloadTransformationFunction is deprecated and downloadTransformationFunction
   * should be used instead.
   *
   * Then, if the downloadTransformationFunction was provided, use that to modify the structure of the data.
   *
   * @param data The data to be transformed (usually finalTableData$.value)
   * @param columns The columns of the table.
   * @param downloadTransformationFunction The function to transform the table data.
   * @returns The table data without any table-related attributes and with the provided data formatting.
   */
  transform(data: TableRowData[] | null, columns: QueryList<TableColumnComponent>, downloadTransformationFunction: (...args: any[]) => any[]): any[] {
    let coreData: any[] = data ? this.removeTableRowFormattingPipe.transform(data?.filter((d: any) => !d.isFiltered)) : [];

    // Apply the downloadTransformationFunction if it is provided
    if (downloadTransformationFunction) {
      coreData = downloadTransformationFunction(coreData);
    }

    // Update the data based on the provided columns (header, field, and downloadTransformationFunction)
    if (!!columns?.length) {
      columns.toArray().forEach((column: TableColumnComponent) => {
        coreData.forEach((d: any) => {

          // If the column is visible, add it to the downloaded data; delete it otherwise
          if (column.isVisible) {

            // If the downloadTransformationFunction is set, update the data using that function
            if (!!column?.downloadTransformationFunction) {
              console.warn(`WARNING: The TableColumnComponent downloadTransformationFunction @Input is deprecated.
                It is recommended to use the TableComponent downloadTransformationFunction @Input instead to
                transform downloaded data formatting.`);
              d[column.field] = column.downloadTransformationFunction(d[column.field]);
            }

            // If the column has a header set, update the data key to use the column header instead of the field
            if (column?.header) {
              d[column.header] = d[column.field];
              delete d[column.field];
            }

          } else {
            delete d[column.field];
          }

        });
      });
    }

    return coreData;
  }
}
