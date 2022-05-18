import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';

import { TemplateDirective } from '@fusion-ui/fusion-components/lib/directives/template';
import {
  TableCellContentAlignment,
  TableCellContentVerticalAlignment,
  TableColumnConfig,
  TableColumnSorted,
  TableTemplate,
} from '../table.interface';

/**
 * TABLE COLUMN COMPONENT
 */
@Component({
  selector: 'fusion-ui-table-column',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableColumnComponent implements AfterContentInit {
  private _contentTemplateRef: TemplateRef<any>;
  get contentTemplateRef(): TemplateRef<any> {
    return this._contentTemplateRef;
  }

  private _headerTemplateRef: TemplateRef<any>;
  get headerTemplateRef(): TemplateRef<any> {
    return this._headerTemplateRef;
  }

  /**
   * Keeps track of the width of a column based on a column resize.
   * Takes priority over the width input that is used in the table header and body cell components.
   * Currently updated via the stopResize() function in the table component.
   */
  updatedWidth: string;

  /**
   * Determines whether or not the column is filtered.
   * Used to determine whether or not to display the filter icon to the left of the column header.
   */
  @Input() isFiltered: boolean;

  /**
   * Determines the text to be displayed in the column header (th).
   */
  @Input() header: string;

  /**
   * Determines the field with which the column is associated.
   * If no custom template is provided, the column displays the value of the matching data object key.
   */
  @Input() field: string;

  /**
   * Determines the horizontal alignment of the table cell content.
   * Current options are: LEFT, RIGHT, CENTER
   */
  @Input() cellContentAlignment: TableCellContentAlignment = TableCellContentAlignment.LEFT;

  /**
   * Determines the vertical alignment of the table cell content.
   * Current options are: TOP, MIDDLE, BOTTOM
   */
  @Input() cellContentVerticalAlignment: TableCellContentVerticalAlignment = TableCellContentVerticalAlignment.MIDDLE;

  /**
   * Determines the minimum width of the column (will not shrink smaller than this value).
   * Currently does NOT support % values. Should use pixel (px) values.
   **/
  @Input() minWidth: string;

  /**
   * Determines the width of the column (will not grow or shrink).
   * Currently does NOT support % values. Should use pixel (px) values.
   */
  @Input() width: string;

  /**
   * Determines whether or not the column is sorted, and if so, how (ascending vs descending).
   */
  @Input() sorted: TableColumnSorted;

  /**
   * Determines whether or not the column is sortable; by default true.
   */
  @Input() isSortable: boolean = true;

  /**
   * Determines whether or not the column is the default sort when the table initially loads.
   * Only one column of a table should have this value set, if any (if more are set, the first column with this set is used).
   * If no columns have this value set, it will sort the table by the first column by ascending.
   */
  @Input() defaultSort: TableColumnSorted;

  /**
   * Determines how the column data will be sorted.
   * If not provided, will use the default sorting method provided by the table.
   */
  @Input() sortFunction: (...args: any[]) => number;

  /**
   * Determines whether or not the table cell content will be truncated.
   * A width has to be set for the '...' to appear. Otherwise, if no width is set,
   * the column width will just grow to accomodate the cell content.
   */
  @Input() isTruncated: boolean;

  /**
   * Determines whether or not this column will show up in the column selector menu; by default true.
   */
  @Input() isHidable: boolean = true;

  /**
   * Determines whether or not this column is visible; by default true.
   */
  @Input() isVisible: boolean = true;

  /**
   * Determines whether or not the table cell content can flow outside the cell.
   * Usually set to true for cells with popovers, tooltips, menus, etc.
   */
  @Input() isOverflowVisible: boolean;

  /**
   * Determines whether or not the table column width is resizable.
   * Recommended to only be used with columns with isTruncated set to true.
   */
  @Input() isResizable: boolean;

  /**
   * Determines any custom classes to be appended to the table cells of the column.
   */
  @Input() columnCellStyleClassesFunction: (...args: any[]) => string[];

  /**
   * WARNING: downloadTransformationFunction is deprecated. Should use the table-level downloadTransformationFunction input instead.
   *
   * Determines how the data will be formatted when downloaded.
   * Useful if the provided data is an advanced data type (like and Object).
   */
  @Input() downloadTransformationFunction: (...args: any[]) => any;

  /**
   * A list of all the TemplateDirectives nested within this component.
   * Used to generate the table cell content.
   */
  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  /**
   * After the component's content initializes, attempt to find certain elements with TemplateDirectives
   * to figure out what content should be rendered where.
   *
   * 'tableCell' allows control over the content of the each of the body table cells of the column.
   * 'tableHeader' allows control over the content of the table header cell of the column.
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      if (name === TableTemplate.TABLE_CELL) {
        this._contentTemplateRef = item.template;
      }

      if (name === TableTemplate.TABLE_COLUMN_HEADER) {
        this._headerTemplateRef = item.template;
      }
    });

    this.cdr.markForCheck();
  }

  /**
   * Generates a config to quickly tell if the column has changed.
   * Primarily used by the header-table-cell and body-table-cell components.
   *
   * @returns The generated table column config.
   */
  get config(): TableColumnConfig {
    return {
      header: this.header,
      field: this.field,
      cellContentAlignment: this.cellContentAlignment,
      cellContentVerticalAlignment: this.cellContentVerticalAlignment,
      minWidth: this.minWidth,
      width: this.width,
      updatedWidth: this.updatedWidth,
      sorted: this.sorted,
      isSortable: this.isSortable,
      defaultSort: this.defaultSort,
      sortFunction: this.sortFunction,
      isFiltered: this.isFiltered,
      isTruncated: this.isTruncated,
      isOverflowVisible: this.isOverflowVisible,
      isResizable: this.isResizable,
      isVisible: this.isVisible,
      isHidable: this.isHidable,
      columnCellStyleClassesFunction: this.columnCellStyleClassesFunction,
      contentTemplateRef: this.contentTemplateRef,
      headerTemplateRef: this.headerTemplateRef,
    };
  }
}
