import { ComponentFixture } from '@angular/core/testing';

/**
 * KEY VALUE TABLE PAGE OBJECT
 *
 * Page object for the fusion-ui-key-value-table component
 * Makes it easier to find and select certain fusion-ui-key-value-table attributes and elements
 */
export class KeyValueTablePageObject {
  private fixture: ComponentFixture<any>;
  private tableClass: string;

  get table(): HTMLTableElement {
    // first try to get the fusion-ui-key-value-table element by a provided class
    const tableClass: HTMLElement = this.tableClass ? this.fixture.nativeElement.querySelector(this.tableClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-key-value-table element by the fusion-ui-key-value-table tag
    const keyValueTable: HTMLElement = tableClass || this.fixture.nativeElement.querySelector('fusion-ui-key-value-table');
    // if fusion-ui-key-value-table found, find the actual <button> element by the .fusion-ui-key-value-table class
    const table: HTMLTableElement = keyValueTable ? keyValueTable.querySelector('.fusion-ui-key-value-table') : null;

    return table;
  }

  /**
   * Gets all the table rows.
   *
   * @returns The table rows.
   */
  get tableRows(): NodeListOf<HTMLTableRowElement> {
    const table: HTMLTableElement = this.table;
    return table ? table.querySelectorAll('.fusion-ui-key-value-table__row') : null;
  }

  /**
   * Gets all the table key cells (first column).
   *
   * @returns The table key cells.
   */
  get tableKeyCells(): NodeListOf<HTMLTableHeaderCellElement> {
    const table: HTMLTableElement = this.table;
    return table ? table.querySelectorAll('.fusion-ui-key-value-table__cell--header') : null;
  }

  /**
   * Gets all the table value cells (second column).
   *
   * @returns The table value cells.
   */
  get tableValueCells(): NodeListOf<HTMLTableCellElement> {
    const table: HTMLTableElement = this.table;
    return table ? table.querySelectorAll('.fusion-ui-key-value-table__cell--body') : null;
  }

  /**
   * Gets the table row at a given index.
   *
   * @param index The index of the row.
   * @returns The table row.
   */
  getTableRowAtIndex(index: number): HTMLTableRowElement {
    const tableRows: NodeListOf<HTMLTableRowElement> = this.tableRows;
    return tableRows ? tableRows.item(index) : null;
  }

  /**
   * Gets the table key cell (first column) of a table row at a given index.
   *
   * @param index The index of the row.
   * @returns The table key cell.
   */
  getTableKeyCellAtRowIndex(index: number): HTMLTableHeaderCellElement {
    const tableRow: HTMLTableRowElement = this.getTableRowAtIndex(index);
    return tableRow ? tableRow.querySelector('.fusion-ui-key-value-table__cell--header') : null;
  }

  /**
   * Gets the table value cell (second column) of a table row at a given index.
   *
   * @param index The index of the row.
   * @returns The table value cell.
   */
  getTableValueCellAtRowIndex(index: number): HTMLTableCellElement {
    const tableRow: HTMLTableRowElement = this.getTableRowAtIndex(index);
    return tableRow ? tableRow.querySelector('.fusion-ui-key-value-table__cell--body') : null;
  }

  /**
   * Creates a page object for a fusion-ui-key-value-table DOM element based on the provided fixture and optional tableClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the fusion-ui-key-value-table.
   * @param tableClass Optional, providing a css class appended to a fusion-ui-key-value-table will help make sure the correct
   * one is selected.
   */
  constructor(fixture: ComponentFixture<any>, tableClass?: string) {
    this.fixture = fixture;
    this.tableClass = tableClass;
  }
}
