import { ComponentFixture } from '@angular/core/testing';

/**
 * KEY VALUE TABLE PAGE OBJECT
 *
 * Page object for the f-key-value-table component
 * Makes it easier to find and select certain f-key-value-table attributes and elements
 */
export class KeyValueTablePageObject {
  private fixture: ComponentFixture<any>;
  private tableClass: string | undefined;

  get table(): HTMLTableElement | null {
    // first try to get the f-key-value-table element by a provided class
    const tableClass: HTMLElement = this.tableClass ? this.fixture.nativeElement.querySelector(this.tableClass) : null;
    // if no provided class or element not found, try to find the f-key-value-table element by the f-key-value-table tag
    const keyValueTable: HTMLElement = tableClass || this.fixture.nativeElement.querySelector('f-key-value-table');
    // if f-key-value-table found, find the actual <button> element by the .f-key-value-table class
    const table: HTMLTableElement | null = keyValueTable ? keyValueTable.querySelector('.f-key-value-table') : null;

    return table;
  }

  /**
   * Gets all the table rows.
   *
   * @returns The table rows.
   */
  get tableRows(): NodeListOf<HTMLTableRowElement> | null {
    const table: HTMLTableElement | null = this.table;
    return table ? table.querySelectorAll('.f-key-value-table__row') : null;
  }

  /**
   * Gets all the table key cells (first column).
   *
   * @returns The table key cells.
   */
  get tableKeyCells(): NodeListOf<HTMLTableHeaderCellElement> | null {
    const table: HTMLTableElement | null = this.table;
    return table ? table.querySelectorAll('.f-key-value-table__cell--header') : null;
  }

  /**
   * Gets all the table value cells (second column).
   *
   * @returns The table value cells.
   */
  get tableValueCells(): NodeListOf<HTMLTableCellElement> | null {
    const table: HTMLTableElement | null = this.table;
    return table ? table.querySelectorAll('.f-key-value-table__cell--body') : null;
  }

  /**
   * Gets the table row at a given index.
   *
   * @param index The index of the row.
   * @returns The table row.
   */
  getTableRowAtIndex(index: number): HTMLTableRowElement | null {
    const tableRows: NodeListOf<HTMLTableRowElement> | null = this.tableRows;
    return tableRows ? tableRows.item(index) : null;
  }

  /**
   * Gets the table key cell (first column) of a table row at a given index.
   *
   * @param index The index of the row.
   * @returns The table key cell.
   */
  getTableKeyCellAtRowIndex(index: number): HTMLTableHeaderCellElement | null {
    const tableRow: HTMLTableRowElement | null = this.getTableRowAtIndex(index);
    return tableRow ? tableRow.querySelector('.f-key-value-table__cell--header') : null;
  }

  /**
   * Gets the table value cell (second column) of a table row at a given index.
   *
   * @param index The index of the row.
   * @returns The table value cell.
   */
  getTableValueCellAtRowIndex(index: number): HTMLTableCellElement | null {
    const tableRow: HTMLTableRowElement | null = this.getTableRowAtIndex(index);
    return tableRow ? tableRow.querySelector('.f-key-value-table__cell--body') : null;
  }

  /**
   * Creates a page object for a f-key-value-table DOM element based on the provided fixture and optional tableClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the f-key-value-table.
   * @param tableClass Optional, providing a css class appended to a f-key-value-table will help make sure the correct
   * one is selected.
   */
  constructor(fixture: ComponentFixture<any>, tableClass?: string) {
    this.fixture = fixture;
    this.tableClass = tableClass;
  }
}
