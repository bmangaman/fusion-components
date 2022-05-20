import { ComponentFixture } from '@angular/core/testing';
import { MenuPageObject } from './menu.spec.po';

/**
 * TABLE PAGE OBJECT
 *
 * Page object for the f-table component.
 * Makes it easier to find and select certain f-table attributes and elements.
 */
export class TablePageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string;

  /**
   * Get the "f-table" tag
   */
  get fusionUiTable(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the f-tablear,
    // otherwise, just use the f-progress-bar tag
    const table: HTMLElement = (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('f-table');

    return table;
  }

  /**
   * Gets the top-level container that contains all of the f-table elements.
   *
   * @returns The outermost div element.
   */
  get container(): HTMLElement {
    const table: HTMLElement = this.fusionUiTable;
    return table ? table.querySelector('.f-table') : null;
  }

  /**
   * Gets the header container.
   *
   * @returns The header container.
   */
  get header(): HTMLDivElement {
    const table: HTMLElement = this.fusionUiTable;
    return table ? table.querySelector('.f-table__header') : null;
  }

  /**
   * Gets the controls container.
   *
   * @returns The controls container.
   */
  get controls(): HTMLDivElement {
    const table: HTMLElement = this.fusionUiTable;
    return table ? table.querySelector('.f-table__controls') : null;
  }

  /**
   * Gets the filter control area (that contains quick filters and filter selector menu).
   *
   * @returns The filter control area.
   */
  get filterControls(): HTMLElement {
    const controls: HTMLDivElement = this.controls;
    return controls ? controls.querySelector('.f-table__filter-selector') : null;
  }

  /**
   * Gets the filter selector menu page object.
   *
   * @returns The filter selector menu page object.
   */
  get filterSelectorMenu(): MenuPageObject {
    const controls: HTMLDivElement = this.controls;
    const filterSelectorComponent: HTMLElement = controls ? controls.querySelector('f-table-filter-selector') : null;
    return filterSelectorComponent ? new MenuPageObject(this.fixture, '.f-table__filter-selector') : null;
  }

  /**
   * Gets the list of quick filters.
   *
   * @returns The list of quick filters.
   */
  get quickFilters(): NodeListOf<HTMLButtonElement> {
    const filterControls: HTMLElement = this.filterControls;
    return filterControls ? filterControls.querySelectorAll('.f-table__filter-selector-quick-filter-button') : null;
  }

  /**
   * Gets the column selector menu page object.
   *
   * @returns The column selector menu page object.
   */
  get columnSelectorMenu(): MenuPageObject {
    const controls: HTMLDivElement = this.controls;
    const columnSelectorComponent: HTMLElement = controls ? controls.querySelector('f-table-column-selector') : null;
    return columnSelectorComponent ? new MenuPageObject(this.fixture, '.f-table__column-selector') : null;
  }

  /**
   * Gets the column selector menu checkbox inputs.
   *
   * @returns The column selector menu checkbox inputs.
   */
  get columnSelectorMenuInputs(): NodeListOf<HTMLInputElement> {
    const menu: MenuPageObject = this.columnSelectorMenu;
    const menuContent: HTMLElement = menu ? menu.menuDialogContent : null;
    return menuContent ? menuContent.querySelectorAll('.f-table__column-selector-checkbox') : null;
  }

  /**
   * Gets the column selector menu checkbox input by the provided column header.
   *
   * @param header The column header.
   * @returns The column selector menu input.
   */
  getColumnSelectorMenuInputByColumnHeader(header: string): HTMLInputElement {
    const menu: MenuPageObject = this.columnSelectorMenu;
    const menuContent: HTMLElement = menu ? menu.menuDialogContent : null;
    return menuContent ? menuContent.querySelector(`#f-column-selector-checkbox--${header}`) : null;
  }

  /**
   * Gets the refresh button in the controls container.
   *
   * @returns The refresh button in the controls container.
   */
  get refreshButton(): HTMLButtonElement {
    const controls: HTMLDivElement = this.controls;
    return controls ? controls.querySelector('.f-table__controls--button--refresh') : null;
  }

  /**
   * Gets the download button in the controls container.
   *
   * @returns the download button in the controls container.
   */
  get downloadButton(): HTMLButtonElement {
    const controls: HTMLDivElement = this.controls;
    return controls ? controls.querySelector('.f-table__controls--button--download') : null;
  }

  /**
   * Gets the div element that contains the actual HTML table.
   *
   * @returns The table conainer.
   */
  get tableContainer(): HTMLDivElement {
    const table: HTMLElement = this.fusionUiTable;
    return table ? table.querySelector('.f-table__container') : null;
  }

  /**
   * Gets the visible state container. There four (4) possible states (loaded, empty, loading, and error).
   *
   * @returns The visible state container.
   */
  get stateContainer(): HTMLDivElement {
    const table: HTMLElement = this.fusionUiTable;
    return table ? table.querySelector('.f-table__state') : null;
  }

  /**
   * Gets the HTML table element.
   *
   * @return The HTML table element.
   */
  get table(): HTMLTableElement {
    const table: HTMLElement = this.fusionUiTable;
    return table ? table.querySelector('.f-table__table') : null;
  }

  /**
   * Gets the thead element.
   *
   * @returns The thead element.
   */
  get tableHead(): HTMLElement {
    const table: HTMLElement = this.table;
    return table ? table.querySelector('.f-table__table-thead') : null;
  }

  /**
   * Gets the single table row in the thead.
   *
   * @returns The single table row in the thead.
   */
  get tableHeadRow(): HTMLTableRowElement {
    const tableHead: HTMLElement = this.tableHead;
    return tableHead ? tableHead.querySelector('.f-table__table-row') : null;
  }

  /**
   * Gets the table columns (th) of the single row in the thead.
   *
   * @returns The lable columnns (td) of the single row in the thead.
   */
  get tableHeadColumns(): NodeListOf<HTMLTableHeaderCellElement> {
    const tableHeadRow: HTMLElement = this.tableHeadRow;
    return tableHeadRow ? tableHeadRow.querySelectorAll('.f-table__table-cell') : null;
  }

  /**
   * Gets the table column of the row in the thead at the provided index.
   *
   * @param index The index of the table column.
   * @retturns The table column of the row in the thead at the provided index.
   */
  getTableHeadColumnAtIndex(index: number): HTMLElement {
    const columns: NodeListOf<HTMLTableHeaderCellElement> = this.tableHeadColumns;
    return columns ? columns.item(index) : null;
  }

  /**
   * Gets the tbody element.
   *
   * @returns The tbody element.
   */
  get tableBody(): HTMLElement {
    const table: HTMLElement = this.table;
    return table ? table.querySelector('.f-table__table-tbody') : null;
  }

  /**
   * Gets all the table rows in the table body.
   *
   * @returns All the table rows in the table body.
   */
  get tableBodyRows(): NodeListOf<HTMLTableRowElement> {
    const tableBody: HTMLElement = this.tableBody;
    return tableBody ? tableBody.querySelectorAll('.f-table__table-row') : null;
  }

  /**
   * Gets the table row at the provided index.
   *
   * @param index The index of the table row.
   * @returns The table row at the provied index.
   */
  getTableBodyRowAtIndex(index: number): HTMLTableRowElement {
    const tableBodyRows: NodeListOf<HTMLTableRowElement> = this.tableBodyRows;
    return tableBodyRows ? tableBodyRows.item(index) : null;
  }

  /**
   * Gets all the columns of the row at the provided index.
   *
   * @param index The index of the table row.
   * @returns All the columns of the row at the provided index.
   */
  getTableBodyColumnsAtRowIndex(index: number): NodeListOf<HTMLTableCellElement> {
    const tableBodyRow: HTMLTableRowElement = this.getTableBodyRowAtIndex(index);
    return tableBodyRow ? tableBodyRow.querySelectorAll('.f-table__table-cell') : null;
  }

/**
 * Gets interior element contents from a particular row, as specified by css selector string.
 *
 * @param index The index of the table row.
 * @param selector css string selector for desired content
 * @returns The HTML element at the provided row and css seletor
 */
  getTableBodyRowContentAtIndex(index: number, selector: string): HTMLElement {
    const tableBodyRow = this.getTableBodyRowAtIndex(index);
    return tableBodyRow ? tableBodyRow.querySelector(selector) : null;
  }

  /**
   * Gets the table column at the provided colIndex of the row at the provided rowIndex.
   *
   * @param rowIndex The index of the table row.
   * @param colIndex The index of the column.
   * @returns The table column at the provided colIndex of the row at the provided rowIndex.
   */
  getTableBodyColumnAtIndex(rowIndex: number, colIndex: number): HTMLTableCellElement {
    const tableBodyColumns: NodeListOf<HTMLTableCellElement> = this.getTableBodyColumnsAtRowIndex(rowIndex);
    return tableBodyColumns ? tableBodyColumns.item(colIndex) : null;
  }

  /**
   * Gets the table row actions column at the provided row index.
   *
   * @param index The index of the table row.
   * @returns The row actions column at the provided row index.
   */
  getTableBodyActionsColumnAtRowIndex(index: number): HTMLTableCellElement {
    const tableBodyRow: HTMLTableRowElement = this.getTableBodyRowAtIndex(index);
    return tableBodyRow ? tableBodyRow.querySelector('.f-table__table-cell--actions') : null;
  }

  /**
   * Get the table row actions menu page object at the provided row index.
   *
   * @param index The index of the table row.
   * @returns The table row actions menu page object.
   */
  getTableBodyActionsButtonAtRowIndex(index: number): MenuPageObject {
    const tableActionsColumnAtIndex: HTMLTableCellElement = this.getTableBodyActionsColumnAtRowIndex(index);
    return tableActionsColumnAtIndex ? new MenuPageObject(this.fixture, `.f-table__table-row--${index}`) : null;
  }

  /**
   * Get the table select/deselect all input in the table header.
   *
   * @returns The select/deselect all input in the table header.
   */
  get tableHeaderSelectionInput(): HTMLInputElement {
    const tableSelectionHeaderColumn: HTMLElement = this.getTableHeadColumnAtIndex(0);
    return tableSelectionHeaderColumn ? tableSelectionHeaderColumn.querySelector('input') : null;
  }

  /**
   * Gets the table row selection column at the provided row index.
   *
   * @param index The index of the table row.
   * @returns The row selection column at the provided row index.
   */
  getTableBodySelectionColumnAtRowIndex(index: number): HTMLTableCellElement {
    const tableBodyRow: HTMLTableRowElement = this.getTableBodyRowAtIndex(index);
    return tableBodyRow ? tableBodyRow.querySelector('.f-table__table-cell--selection-control') : null;
  }

  /**
   * Get the table row selection input page object (checkbox or radio button) at the provided row index.
   *
   * @param index The index of the table row.
   * @returns The table row selection input page object.
   */
  getTableBodySelectionInputAtRowIndex(index: number): HTMLInputElement {
    const tableSelectionColumnAtIndex: HTMLTableCellElement = this.getTableBodySelectionColumnAtRowIndex(index);
    return tableSelectionColumnAtIndex ? tableSelectionColumnAtIndex.querySelector('input') : null;
  }

  /**
   * Get the Row Expansion button page object for a row if one exists.
   *
   * @param index The index of the table row
   * @returns The table row's expander button page object.
   */
  getTableBodyRowExpanderAtRowIndex(index: number): HTMLButtonElement {
    const tableBodyRow: HTMLTableRowElement = this.getTableBodyRowAtIndex(index);
    return tableBodyRow ? tableBodyRow.querySelector('.f-table__table-cell-expansion-button') : null;
  }

  async clickExpansionLinkAtRowIndex(index: number): Promise<void> {
    const expansionButton = this.getTableBodyRowExpanderAtRowIndex(index);
    return await expansionButton.click();
  }

  /**
   * Gets the pagination container.
   *
   * @returns The pagination container.
   */
  get pagination(): HTMLDivElement {
    const table: HTMLElement = this.fusionUiTable;
    return table ? table.querySelector('.f-table__pagination') : null;
  }

  /**
   * Gets the text that describes the number of results.
   *
   * @returns The text that describes the number of results.
   */
  get paginationNumOfResults(): string {
    const pagination: HTMLDivElement = this.pagination;
    return pagination ? pagination.querySelector('.f-table__pagination-num-of-results').textContent : null;
  }

  /**
   * Gets the table pagination navigation buttons (e.g. <<, <, 1, 2...)
   *
   * @returns The pagination navigation buttons.
   */
  get paginationControlButtons(): NodeListOf<HTMLButtonElement> {
    const pagination: HTMLDivElement = this.pagination;
    const controls: HTMLDivElement = pagination ? pagination.querySelector('.f-table__pagination-controls') : null;
    return controls ? controls.querySelectorAll('.f-table__pagination-controls-button') : null;
  }

  /**
   * Gets the select input that controls the number of results displayed per page.
   *
   * @returns The selec tinput that controls the number of results displayed per page.
   */
  get paginationNumPerPage(): HTMLSelectElement {
    const pagination: HTMLDivElement = this.pagination;
    return pagination ? pagination.querySelector('.f-table__pagination-num-per-page-select') : null;
  }

  /**
   * Gets the rows that have been selected by looking for a checked input in the row.
   */
  get selectedRows(): HTMLTableRowElement[] {
    const rows = this.tableBodyRows;
    const selectedRows: HTMLTableRowElement[] = [];

    rows.forEach(row => {
      const selectedInput = row.querySelector('.f-table__table-cell-inner .f-form__radio-input--checked');

      if (selectedInput) {
        selectedRows.push(row);
      }
    });

    return selectedRows;
  }

  /**
   * Iterates through all visible rows and sets the selected state.
   *
   * @params selected {boolean} whether all rows should be selected (true) or not selected (false)
   */
  selectAll(selected: boolean = true): void {
    const rows = this.tableBodyRows;

    rows.forEach(row => {
      const checkbox: HTMLInputElement = row.querySelector('.f-table__table-cell-inner .f-form__checkbox-input');
      checkbox.checked = selected;
    });

    this.fixture.detectChanges();
  }

  /**
   * Iterates through all visible rows and unsets the selected state.
   */
  deselectAll(): void {
    this.selectAll(false);
  }

  /**
   * Creates a page object for a f-table DOM element based on the provided fixture and optional containerClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the f-table.
   * @param containerClass Optional, providing a css class of a parent element of the f-table
   * will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
