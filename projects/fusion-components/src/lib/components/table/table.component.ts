import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { cloneDeep, intersection, isEqual } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Location, Size, State, TranslatedComponent } from '@fusion-components/lib/shared';

import { TemplateDirective } from '../../directives/template';
import { ButtonType } from '../button';

import { DownloadDirectiveFileType } from '../../directives/download';
import { FusionComponentsTranslationService } from '../../services';
import { StateLocation } from '../state';
import { TableColumnComponent } from './table-column';
import { CaseSensitiveSort } from './table-column-sorts';
import { TableFilterConfig } from './table-filter-selector/table-filter-selector.interface';
import { TableFilterComponent } from './table-filters';
import { TablePaginationConfig } from './table-pagination';
import { AreAllVisibleRowsSelectedPipe, RemoveTableRowFormattingPipe } from './table-pipes';
import {
  EnabledTableFunctionality,
  RowExpansionMode,
  SelectionMode,
  TableCellContentAlignment,
  TableColumnConfig,
  TableColumnSorted,
  TableFlags,
  TableRowData,
  TableSpacing,
  TableTemplate,
  TableTranslations,
  TableType,
  TableView,
  ViewChangeOrDefaultCols,
} from './table.interface';

/**
 * TABLE COMPONENT
 *
 * The Table Component provides a consistent way to render a table in the UI.
 *
 * There are two (2) types of tables:
 *  1. BASIC    - no controls, no pagination, optional header, optional set height
 *  2. ADVANCED - same as basic, but by default displays controls and pagination
 */
@Component({
  selector: 'f-table',
  templateUrl: 'table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent extends TranslatedComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  readonly ButtonType = ButtonType;
  readonly DownloadDirectiveFileType = DownloadDirectiveFileType;
  readonly TableCellContentAlignment = TableCellContentAlignment;
  readonly Location = Location;
  readonly Size = Size;
  readonly State = State;
  readonly RowExpansionMode = RowExpansionMode;
  readonly SelectionMode = SelectionMode;
  readonly StateLocation = StateLocation;
  readonly TableType = TableType;

  readonly areAllVisibleRowsSelectedPipe = new AreAllVisibleRowsSelectedPipe();
  readonly removeTableRowFormattingPipe = new RemoveTableRowFormattingPipe();

  private _prevFilters: TableFilterComponent[];
  private _prevVisibleColumns: TableColumnComponent[];
  private _prevSelectedData: TableRowData[];
  private _prevSortTableColumnConfig: TableColumnConfig;
  private _prevAppliedTableView: TableView;

  tableCssClasses: string[];
  enabledFunctionality: EnabledTableFunctionality = {};
  flags: TableFlags = {};
  resizeXCoordinate: number;

  tableData$: BehaviorSubject<TableRowData[]> = new BehaviorSubject<TableRowData[]>([]);
  filteredTableData$: BehaviorSubject<TableRowData[]> = new BehaviorSubject<TableRowData[]>([]);
  sortedTableData$: BehaviorSubject<TableRowData[]> = new BehaviorSubject<TableRowData[]>([]);
  paginatedTableData$: BehaviorSubject<TableRowData[]> = new BehaviorSubject<TableRowData[]>([]);
  selectedTableData$: BehaviorSubject<TableRowData[]> = new BehaviorSubject<TableRowData[]>([]);
  finalTableData$: BehaviorSubject<TableRowData[]> = new BehaviorSubject<TableRowData[]>([]);

  private _visibleColumns: TableColumnComponent[] = [];
  /**
   * The list of visible columns. Updated every time the list of columns (or their attributes) is/are updated.
   *
   * Everything is wrapped in a timeout to make sure the data is fully done changing before updating the columns.
   *
   * Loops through the filters and hides filters in the selection input if the corresponding column is hidden.
   * Checks to make sure the visible columns actually changed; if they did, kick off the data transformation pipeline.
   */
  set visibleColumns(columns: TableColumnComponent[]) {
    this._prevVisibleColumns = this.visibleColumns;
    this._visibleColumns = columns;

    this.filters?.forEach((filter: TableFilterComponent) => {
      filter.isVisibleInSelector = this.visibleColumns.some((column: TableColumnComponent) =>
        column.field === filter.field && column.isVisible);
    });

    const visibleColumnsFields: string[] = this._visibleColumns?.map((col: TableColumnComponent) => col.field);
    const prevVisibleColumnsFields: string[] = this._prevVisibleColumns?.map((col: TableColumnComponent) => col.field);

    if (!isEqual(visibleColumnsFields, prevVisibleColumnsFields) || !isEqual(this._prevAppliedTableView, this.appliedTableView)) {
      this.data = this.data;
    }
  }
  get visibleColumns(): TableColumnComponent[] {
    return this._visibleColumns;
  }

  /**
   * Keeps track of the applied table view.
   */
  private _appliedTableView: TableView;
  set appliedTableView(view: TableView) {
    this._prevAppliedTableView = this.appliedTableView;
    this._appliedTableView = view;
    this.updateColumns(undefined, ViewChangeOrDefaultCols.VIEW_CHANGE);
    this.viewChange.emit(view);
  }
  get appliedTableView(): TableView {
    return this._appliedTableView;
  }

  /**
   * Determines the title text of the table. If set, displays the table header.
   */
  @Input() tableTitle: string;

  /**
   * Determines the UUID of the table. Used to generate classes and ids for the elements (like checkboxes)
   * that are used within the table.
   */
  private _tableUuid: string = uuidv4();
  @Input()
  set tableUuid(id: string) {
    this._tableUuid = id || this._tableUuid;
  }
  get tableUuid(): string {
    return this._tableUuid;
  }

  private _previousData: TableRowData;
  /**
   * Determines the data to be displayed in the table.
   *
   * Loops through the provided data and sets the following attributes:
   *  - tableRowUuid
   *  - isVisible
   *  - isSelected
   *  - isSelectable
   *  - isActionable
   *  - isExpandable
   */
  private _data: any[];
  @Input()
  set data(data: any[]) {
    this._previousData = this.finalTableData$.value;
    this._data = cloneDeep(data);

    if (!!data?.length) {
      this.data.forEach((d: TableRowData) => {
        const sameData: TableRowData = this._previousData ?
          this._previousData.find((td: TableRowData) => this.isRowTableDataEqual(td, d)) :
          null;

        d.isVisible = d.hasOwnProperty('isVisible') ? d.isVisible : true;
        d.isSelectable = this.isTableDataSelectable(d);
        d.isActionable = this.isTableDataActionEnabled(d);
        d.isExpandable = this.isTableDataExpandable(d);

        d.tableRowUuid = !!sameData ? sameData.tableRowUuid : d.tableRowUuid || uuidv4();
        d.isExpanded = !!sameData ? d.isExpandable && sameData.isExpanded : d.isExpanded;
        d.isSelected = !!sameData ? sameData.isSelected : d.isSelected;
      });
    }

    this.tableData$.next(data);
  }
  get data(): any[] {
    return this._data;
  }

  /**
   * Determines the piece of data from each entry to be used to compare entries.
   */
  @Input() dataKey: string;

  /**
   * Determines the default state of the columns of the table.
   * Primarily used for deeplinking.
   */
  private _defaultColumns: TableColumnConfig[];
  @Input()
  set defaultColumns(columns: TableColumnConfig[]) {
    this._defaultColumns = columns;
    this.updateColumns(undefined, ViewChangeOrDefaultCols.DEFAULT_COLS);
  }
  get defaultColumns(): TableColumnConfig[] {
    return this._defaultColumns;
  }

  /**
   * Determines the filters to be applied to the table data.
   * Primarily used for deeplinking.
   */
  private _appliedFilters: TableFilterConfig[];
  @Input()
  set appliedFilters(filters: TableFilterConfig[]) {
    this._appliedFilters = filters;
  }
  get appliedFilters(): TableFilterConfig[] {
    return this._appliedFilters;
  }

  /**
   * Determines the "static" text to be displayed throughout the table.
   */
  @Input() translations: TableTranslations;

  /**
   * Determines the state of the table.
   *  - While getting asynchronous data, should be LOADING
   *  - When the data is available, should be LOADED
   *  - If there was an issue getting the data, should be ERROR
   * By default is LOADED.
   */
  @Input() state: State = State.LOADED;

  /**
   * Determines whether the table component will stretch to fill the height of its parent container.
   * Set this to true if the following is desired:
   *  - a maximum table height
   *  - a sticky table header
   */
  @Input() fillContainer: boolean;

  /**
   * Determines the type of the filter.
   * ADVANCED reveals table controls such as filtering, pagination, and refreshing.
   * By default is set to ADVANCED.
   */
  @Input() type: TableType = TableType.ADVANCED;

  /**
   * Determines the spacing around table cell contents.
   * By default is set to NORMAL.
   */
  @Input() spacing: TableSpacing = TableSpacing.NORMAL;

  /**
   * Determines the name of the exported table data file.
   */
  @Input() exportFileName: string = 'table-data';

  /**
   * Determines if the selection column is visible.
   *  - null / undefined (no selection column)
   *  - SINGLE means only one row can be selected at a time (radio input)
   *  - MULTIPLE means multiple rows can be selected at a time (checkboxes)
   */
  @Input() selectionMode: SelectionMode;

  /**
   * Logic to disable the selection input of a row.
   */
  private _disableRowSelectionFunction: (...args: any[]) => boolean;
  @Input()
  set disableRowSelectionFunction(func: (...args: any[]) => boolean) {
    this._disableRowSelectionFunction = func;

    const newData: TableRowData[] = cloneDeep(this.data);
    newData?.forEach((d: TableRowData) => d.isExpandable = this.isTableDataSelectable(d));
    this.data = newData;
  }
  get disableRowSelectionFunction(): (...args: any[]) => boolean {
    return this._disableRowSelectionFunction;
  }

  /**
   * Determines whether or not each row has expandable content and the row expansion mode of the table.
   *  - null / undefined (no row expansion)
   *  - SINGLE (only one row can be expanded at a time)
   *  - MULTIPLE (any number of rows can be expanded at a time)
   */
  @Input() rowExpansionMode: RowExpansionMode = RowExpansionMode.MULTIPLE;

  /**
   * Logic to disable the expansion of a row.
   */
  private _disableRowExpansionFunction: (...args: any[]) => boolean;
  @Input()
  set disableRowExpansionFunction(func: (...args: any[]) => boolean) {
    this._disableRowExpansionFunction = func;

    const newData: TableRowData[] = cloneDeep(this.data);
    newData?.forEach((d: TableRowData) => d.isExpandable = this.isTableDataExpandable(d));
    this.data = newData;
  }
  get disableRowExpansionFunction(): (...args: any[]) => boolean {
    return this._disableRowExpansionFunction;
  }

  /**
   * Logic to disable the actions button for a row.
   */
  private _disableRowActionsButtonFunction: (...args: any[]) => boolean;
  @Input()
  set disableRowActionsButtonFunction(func: (...args: any[]) => boolean) {
    this._disableRowActionsButtonFunction = func;

    const newData: TableRowData[] = cloneDeep(this.data);
    newData?.forEach((d: TableRowData) => d.isActionable = this.isTableDataActionEnabled(d));
    this.data = newData;
  }
  get disableRowActionsButtonFunction(): (...args: any[]) => boolean {
    return this._disableRowActionsButtonFunction;
  }

  /**
   * Logic to transform the downloaded data.
   */
  @Input() downloadTransformationFunction: (...args: any[]) => any[];

  /**
   * Allows a custom configuration of the pagination options (e.g. # of rows per page).
   */
  @Input() paginationConfig: TablePaginationConfig;

  /**
   * Determines the quick filters (if any) to be available in the table controls
   */
  @Input() quickFilters: TableFilterConfig[] = [];

  /**
   * Determines the different views of the table, which affects what columns are visible and
   * what filters are applied. Displays a button group in the top left-hand side of the
   */
  private _tableViews: TableView[];
  @Input()
  set tableViews(views: TableView[]) {
    this._tableViews = views;
    const seletedTableView: TableView = this.tableViews.find((view: TableView) => view.isSelected);
    this.appliedTableView = this.appliedTableView || seletedTableView;
  }
  get tableViews(): TableView[] {
    return this._tableViews;
  }

  /**
   * Determines the currently applied table view.
   */
  private _appliedTableViewName: string;
  @Input()
  set appliedTableViewName(name: string) {
    this._appliedTableViewName = name;

    const matchingView: TableView = this.tableViews?.find((view: TableView) => view.name === name);
    if (matchingView) {
      this.appliedTableView = matchingView;
    }
  }
  get appliedTableViewName(): string {
    return this._appliedTableViewName;
  }

  /**
   * When the refresh button is clicked, emit an event to trigger the parent component to "refresh the table data".
   */
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();

  /**
   * When the sorting of the table (by a column) changes, emit an event to let the parent component know by which column
   * the table is currently sorted.
   */
  @Output() sortChange: EventEmitter<TableColumnConfig> = new EventEmitter<TableColumnConfig>();

  /**
   * When expanding or collapsing any of the table rows, emit an event to let the parent component know which
   * rows are currently expanded.
   */
  @Output() expansionChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * When selecting or unselecting any of the table rows, emit an event to let the parent component know which
   * rows (data points) are currently selected.
   */
  @Output() selectChange: EventEmitter<any[]> = new EventEmitter<any[]>();

 /*
  * When hiding or exposing certain table columns, emit an event to let the parent component know which columns
  * are currently visible.
  */
  @Output() columnVisibilityChange: EventEmitter<TableColumnComponent[]> = new EventEmitter<TableColumnComponent[]>();

  /**
   * When updating the table pagination, emit and event ot let the parent component know what the new configuration is.
   */
  @Output() paginationChange: EventEmitter<TablePaginationConfig> = new EventEmitter<TablePaginationConfig>();

  /**
   * When applying or removing a table filter, emit an event to let the parent component know which
   * filters are currently applied.
   */
  @Output() filterChange: EventEmitter<TableFilterConfig[]> = new EventEmitter<TableFilterConfig[]>();

  /**
   * When switching views, emit an event to let the parent component know which view was selected.
   */
  @Output() viewChange: EventEmitter<TableView> = new EventEmitter<TableView>();

  /**
   * Whenever the finalTableData$ behavior subject is updated, emit the value of the finalTableData.
   */
  @Output() finalTableDataChange: EventEmitter<TableRowData[]> = new EventEmitter<TableRowData[]>();

  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  private _tableHeader: TemplateRef<any>;
  get tableHeader(): TemplateRef<any> {
    return this._tableHeader;
  }

  private _leftControls: TemplateRef<any>;
  get leftControls(): TemplateRef<any> {
    return this._leftControls;
  }

  private _rightControls: TemplateRef<any>;
  get rightControls(): TemplateRef<any> {
    return this._rightControls;
  }

  private _rowExpansion: TemplateRef<any>;
  get rowExpansion(): TemplateRef<any> {
    return this._rowExpansion;
  }

  private _rowActions: { template: TemplateRef<any>, dialogCssClasses: string[] };
  get rowActions(): { template: TemplateRef<any>, dialogCssClasses: string[] } {
    return this._rowActions;
  }

  private _selectionColumn: TemplateRef<any>;
  get selectionColumn(): TemplateRef<any> {
    return this._selectionColumn;
  }

  /**
   * The filters of the table.
   * Determined by the number of TableFilter components nested within the <f-table> tag.
   */
  private _filters: QueryList<TableFilterComponent>;
  @ContentChildren(TableFilterComponent)
  set filters(filters: QueryList<TableFilterComponent>) {
    this._filters = filters;
    this.enabledFunctionality.filtering = this.type === TableType.ADVANCED && !!filters?.toArray()?.length;
  }
  get filters(): QueryList<TableFilterComponent> {
    return this._filters;
  }

  /**
   * The columns of the table.
   * Determined by the number of TableColumnComponents nested within the <f-table> tag.
   */
  private _columns: QueryList<TableColumnComponent>;
  @ContentChildren(TableColumnComponent)
  set columns(columns: QueryList<TableColumnComponent>) {
    if (!isEqual(this._columns?.toArray(), columns?.toArray())) {
      this.updateColumns(columns);
    }
  }
  get columns(): QueryList<TableColumnComponent> {
    return this._columns;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    protected translationService: FusionComponentsTranslationService,
    private cdr: ChangeDetectorRef,
  ) {
    super(translationService);
  }

  /**
   * On component initialization, create a flow of pipes to generate the table view based on data manipulation
   *
   * [ input data => tableData ]
   * [ tableData => sortedTableData ]
   * [ sortedTableData => selectedTableDAta ]
   * [ selectedTableData => filteredTableData ]
   * If pagination enabled, [ filteredTableData => paginatedTableData ], otherwise, [ filteredTableData => finalTableData]
   * If pagination enabled, [ paginatedTableData => finalTableData ]
   * [ finalTableData => isActionable, isSelectable, and isExpandable logic ]
   */
  ngOnInit(): void {
    // When table data is updated, sort the table data
    this.tableData$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.updateSortingOnDataChange(true);
    });

    // When sorted table data is changed, update selected table data
    this.sortedTableData$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: TableRowData[]) => {
      this.selectedTableData$.next(data);
    });

    // When selected table data is changed, update filtered table data
    this.selectedTableData$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: TableRowData[]) => {
      this.filteredTableData$.next(data);
    });

    // If pagination is NOT enabled, when filtered table data is updated, update final table data
    this.filteredTableData$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: TableRowData[]) => {
      if (!this.enabledFunctionality.pagination) {
        this.finalTableData$.next(data);
      }
    });

    // If pagination is enabled, when paginated table data is updated, update final table data
    this.paginatedTableData$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: TableRowData[]) => {
      if (this.enabledFunctionality.pagination) {
        this.finalTableData$.next(data);
      }
    });

    /**
     * Whenever final table data is changed:
     * - update noResults flag
     * - update areAllVisibleRowsExpanded
     * - emit list of selected rows if changed
     * - emit final table data if changed
     */
    this.finalTableData$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: TableRowData[]) => {
      this.flags.noResults = !(!!data?.filter((d: TableRowData) => d.isVisible && !d.isFiltered && !d.isNotInView).length);
      this.flags.areAllVisibleRowsExpanded = this.areAllVisibleRowsExpanded(data);

      const selectedData: TableRowData[] = cloneDeep(data)?.filter((d: TableRowData) => d.isSelected && !d.isNotInView) || [];
      // remove isVisible to not erroneously trigger selectChange on page change
      selectedData.forEach((d: TableRowData) => delete d.isVisible);
      if (!isEqual(this._prevSelectedData, selectedData)) {
        this._prevSelectedData = selectedData;
        this.selectChange.emit(this.removeTableRowFormattingPipe.transform(selectedData));
      }

      if (!isEqual(this._previousData, data)) {
        this.finalTableDataChange.emit(data);
      }

      this.cdr.detectChanges();
    });

    // On view change, clear all selected data
    this.viewChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.deselectAll());
  }

  /**
   * On component teardown:
   *  - unsubscribes for any active subscriptions (super.ngOnDestroy())
   *  - unlistens and clears the resizeIndicatorVisibleListener
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.unlistenToResizeIndicatorVisibleMouseMove();
  }

  /**
   * After the component's content initializes, attempt to find certain elements with TemplateDirectives
   * to figure out what content should be rendered where.
   *
   * 'tableHeader' appends a table header at the top of the component, above table controls.
   * 'leftControls' appends an area above the table (in the table controls, below the header) to display custom controls.
   * 'rightControls' appends an area above the table (in the table controls, below the header) to display custom controls.
   * 'rowExpansion' appends the row expansion column to the table
   * 'rowActions' appends the row actions column to the table
   * 'selectionColumn' appends custom content to the row selection column of the table
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      switch (name) {
        case TableTemplate.TABLE_HEADER:
          this._tableHeader = item.template;
          this.enabledFunctionality.header = !!this.tableHeader;
          break;
        case TableTemplate.LEFT_CONTROLS:
          this._leftControls = item.template;
          break;
        case TableTemplate.RIGHT_CONTROLS:
          this._rightControls = item.template;
          break;
        case TableTemplate.ROW_EXPANSION:
          this._rowExpansion = item.template;
          this.enabledFunctionality.rowExpansion = !!this.rowExpansionMode && !!this.rowExpansion;
          break;
        case TableTemplate.ROW_ACTIONS:
          this._rowActions = {
            template: item.template,
            dialogCssClasses: item.attributes?.dialogCssClasses,
          };
          this.enabledFunctionality.rowActions = !!this.rowActions;
          break;
        case TableTemplate.SELECTION_COLUMN:
          this._selectionColumn = item.template;
          break;
      }
    });

    this.cdr.detectChanges();
  }

  /**
   * When any of the table inputs change, this function gets called.
   *
   * @param c The input changes.
   */
  // eslint-disable-next-line complexity
  ngOnChanges(c: SimpleChanges): void {
    if (c.type) {
      const isTableTypeAdvanced: boolean = this.type === TableType.ADVANCED;
      this.enabledFunctionality.controls = isTableTypeAdvanced;
      this.enabledFunctionality.pagination = isTableTypeAdvanced;
      this.enabledFunctionality.filtering = isTableTypeAdvanced && !!this.filters?.toArray()?.length;

      // If the table type changes, recalculate what data should be sorted, visible, etc.
      this.updateSortingOnDataChange();
    }

    if (c.selectionMode) {
      this.enabledFunctionality.rowSelection = !!this.selectionMode;
    }

    if (c.tableTitle) {
      this.enabledFunctionality.header = !!this.tableTitle || !!this.tableHeader;
    }

    if (c.fillContainer || c.spacing || c.state || c.type ) {
      this.generateTableCssClasses();
    }

    if (c.rowExpansionMode) {
      this.enabledFunctionality.rowExpansion = !!this.rowExpansionMode && !!this.rowExpansion;
    }
  }

  /**
   * Sorts the table data.
   * If a custom sort logic was provided for a column, use that; otherwise, use the default logic.
   * Only apply sorting logic if the provided sort config is different.
   *
   * @param config The configuration of the column sort.
   * @param isNewData Determines was newly provided from the data input; otherwise, use finalTableData.
   */
  sortTableData(config?: TableColumnConfig, isNewData?: boolean): void {
    const data: TableRowData[] = cloneDeep(this.data);
    const finalTableData: TableRowData[] = cloneDeep(this.finalTableData$.value);
    const startingData: TableRowData[] = isNewData ? data : !!finalTableData?.length ? finalTableData : data;

    if (config) {
      // Set the sort input of the column with the field indicated in the provided config
      this.visibleColumns?.forEach((col: TableColumnComponent) => {
        col.sorted = config.field === col.field ? config.sorted : null;
      });

      if (!!startingData?.length) {
        // If there is no custom sortFunction for the sorted column, use the default sort
        // Otherwise, use the custom sortFunction for the column to sort the table data

        let sortedData: TableRowData[];
        if (!!config.sortFunction) {
          sortedData = startingData.sort(
          (a: TableRowData, b: TableRowData) =>  config.sortFunction(a, b, config.field, config.sorted));
        } else {
          sortedData = startingData.sort(
            (a: TableRowData, b: TableRowData) => CaseSensitiveSort(a, b, config.field, config.sorted));
        }
        this.sortedTableData$.next(sortedData);
      } else {
        this.sortedTableData$.next(startingData);
      }

      // If the provided sort config does NOT equal the previous sort config, emit the latest sort config
      const isSortConfigEqual: boolean =
        !!config &&
        !!this._prevSortTableColumnConfig &&
        config.field === this._prevSortTableColumnConfig.field &&
        config.sorted === this._prevSortTableColumnConfig.sorted;

      if (!isSortConfigEqual) {
        this._prevSortTableColumnConfig = cloneDeep(config);
        this.sortChange.emit(config);
      }

    } else {
      this.sortedTableData$.next(startingData);
    }
  }

  /**
   * Updates the paginatedTableData with the provided data.
   * Sets the 'areAllVisibleRowsExpanded' flag to false to reset the chevron styling.
   *
   * @param data The data to which to update the paginated data.
   */
  paginateTableData(data: TableRowData[]): void {
    this.flags.areAllVisibleRowsExpanded = false;
    this.paginatedTableData$.next(data);
  }

  /**
   * Updates the filteredTableData with the provided data.
   * Clears selected rows. Remove this logic to persist row selection after filtering.
   *
   * @param data The data to which to update the filtered data.
   */
  filterTableData(data: TableRowData[]): void {
    this.filteredTableData$.next(data);
  }

  /**
   * Handles when the applied table filters change.
   *
   * If the provided filters are different than the previous filters, update the visible columns to display the filter icon.
   *
   * @param filters The currently applied table filters.
   */
  appliedFiltersChange(filters: TableFilterComponent[]): void {
    /*
     * Need to check if the new filters are different from the previous filters to limit the number of updates to the
     * list of visibleColumns. Otherwise, this creates a cyclical update of filters => columns => sort data => filters => ...
     */
    this.flags.didFiltersChange = !isEqual(this._prevFilters, filters);

    if (this.flags.didFiltersChange) {
      this.filterChange.emit(filters.map((filter: TableFilterComponent) => filter.config));

      this.visibleColumns?.forEach((column: TableColumnComponent) =>
        column.isFiltered = filters.some((filter: TableFilterComponent) => filter.field === column.field));

      this._prevFilters = filters;
    }

    this.cdr.detectChanges();
  }

  /**
   * If new data provided, sort data by:
   *   1. an already sorted column
   *   2. by ASCENDING of a column that has been set as the default sort column
   *   3. by ASCENDING of the first column
   * Otherwise, do no real sorting (call sortTableData without any params).
   */
  updateSortingOnDataChange(isNewData?: boolean): void {
    if (!!this.visibleColumns?.length) {
      const alreadySortColIndex: number = this.visibleColumns.findIndex((col: TableColumnComponent) => col.sorted);

      if (alreadySortColIndex < 0) {
        const defaultSortColIndex: number = this.visibleColumns.findIndex((col: TableColumnComponent) => col.defaultSort);
        const sortIndex: number = defaultSortColIndex < 0 ? 0 : defaultSortColIndex;

        this.visibleColumns[sortIndex].sorted = this.visibleColumns[sortIndex].defaultSort || TableColumnSorted.ASCENDING;
        this.sortTableData(this.visibleColumns[sortIndex].config, isNewData);
      } else {
        this.sortTableData(this.visibleColumns[alreadySortColIndex].config, isNewData);
      }
    } else {
      this.sortTableData(null, isNewData);
    }
  }

  /**
   * Updates the isSelected attribute of all visible rows.
   *  - If selectionMode is MULTIPLE, handles select/unselect all logic and allows multiple rows to be selected
   *  - If selectionMode is SINGLE, only allows one row to be selected at a time
   * Whenever selection is updated, emits the list of selected rows
   *
   * @param row The row data and index to either be selected or unselected.
   * @param isAll Flag to determine if all visible data should is affected (checkbox in the table header).
   */
  updateSelectedData(row?: TableRowData, isAll?: boolean): void {
    const finalTableData: TableRowData[] = cloneDeep(this.finalTableData$.value);

    if (!!finalTableData?.length) {

      // If SelectionMode is MULTIPLE (checkboxes)
      if (this.selectionMode === SelectionMode.MULTIPLE) {

        // If the select/ deselect all checkbox in the header is clicked
        if (isAll) {

          // If all visible rows are selected, deselect all visible and selectable rows
          if (this.areAllVisibleRowsSelectedPipe.transform(finalTableData)) {
            finalTableData
              .filter((d: TableRowData) => d.isSelected && d.isSelectable && d.isVisible && !d.isFiltered && !d.isNotInView)
              .forEach((d: TableRowData) => d.isSelected = false);

          // If all visible rows are NOT selected, select all visible and selectable rows
          } else {
            finalTableData
              .filter((d: TableRowData) => !d.isSelected && d.isSelectable && d.isVisible && !d.isFiltered && !d.isNotInView)
              .forEach((d: TableRowData) => d.isSelected = true);
          }

        // Either select or deselect the desired row
        } else {
          if (!!row) {
            const matchingData: TableRowData = finalTableData.find(d => d.tableRowUuid === row.tableRowUuid);
            matchingData.isSelected = !matchingData.isSelected;
          }
        }
      }

      // If SelectionMode is SINGLE (radio buttons)
      if (this.selectionMode === SelectionMode.SINGLE) {
        if (!!row) {
          const matchingData: TableRowData = finalTableData.find(d => d.tableRowUuid === row.tableRowUuid);

          finalTableData
            .filter((d: TableRowData) => d.isSelected && d.isSelectable)
            .forEach((d: TableRowData) => d.isSelected = false);

          matchingData.isSelected = !row.isSelected;
        }
      }
    }

    // Update selectedTableData
    this.selectedTableData$.next(finalTableData);
  }

  /**
   * Deselects all table data.
   */
  deselectAll(): void {
    const data: TableRowData[] = cloneDeep(this.selectedTableData$.value) || [];
    data
      .filter((d: TableRowData) => d.isSelected && d.isSelectable && !d.isNotInView)
      .forEach((d: TableRowData) => d.isSelected = false);
    this.selectedTableData$.next(data);
  }

  /**
   * Logic to update the list of visible columns to be displayed in the table.
   * After updating the list, emit the list of visible columns.
   *
   * @param columns The visible table columns.
   */
  updateColumnVisibilityChange(columns: TableColumnComponent[]): void {
    this.visibleColumns = columns;
    this.columnVisibilityChange.emit(columns);
  }

  /**
   * Logic to either expand or collapse a visible row/ all visible rows.
   * If the rowExpansionMode is MULTIPLE, just toggle the isExpanded flag of the provided rowData. Otherwise,
   * if SINGLE, collapse all other expanded rows and expand only the row with matching rowData.
   *
   * @param rowData The data of the row. If not provided, assumes that the "expand all" button is clicked.
   * @param index The index of the row.
   */
  handleRowExpansion(rowData?: TableRowData, index?: number): void {
    if (!!rowData) {
      if (this.rowExpansionMode === RowExpansionMode.MULTIPLE && rowData.isExpandable) {
        rowData.isExpanded = !rowData.isExpanded;
      }

      if (this.rowExpansionMode === RowExpansionMode.SINGLE) {
        this.finalTableData$.value.forEach((data: TableRowData, i: number) => {
          const isMatchingData: boolean = this.isRowTableDataEqual(data, rowData, i, index);
          data.isExpanded = data.isExpandable && isMatchingData ? !data.isExpanded : false;
        });
      }
    } else {
      this.flags.areAllVisibleRowsExpanded = !this.flags.areAllVisibleRowsExpanded;
      this.finalTableData$.value
        .filter((d: TableRowData) => d.isExpandable)
        .forEach((d: TableRowData) => d.isExpanded = this.flags.areAllVisibleRowsExpanded);
    }

    this.expansionChange.emit(
      this.removeTableRowFormattingPipe.transform(this.finalTableData$.value.filter((d: TableRowData) => d.isExpanded))
    );
  }

  /**
   * Generates the CSS classes to be appended to the outermost div within table.component.html.
   */
  generateTableCssClasses(): void {
    const classes: string[] = ['f-table'];

    if (!!this.fillContainer) {
      classes.push('f-table--fillContainer');
    }

    if (!!this.type) {
      classes.push(`f-table--${this.type}`);
    }

    if (!!this.spacing) {
      classes.push(`f-table--spacing-${this.spacing}`);
    }

    if (!!this.state) {
      classes.push(`f-table--${this.state}`);
    }

    this.tableCssClasses = classes;

    this.cdr.detectChanges();
  }

  /**
   * Tracks the column data to make ngFor more performant.
   *
   * @param index the index of the current column
   * @param item the current column (to get the field).
   * @returns Either the provided item field or index.
   */
  colTrackByFn(index: number, item: TableColumnComponent): number | string {
    return !!item && !!item.field ? item.field : index;
  }

  /**
   * Tracks the table row data to make ngFor more performant.
   *
   * @param index The index of the current data.
   * @param data The current data (to get the tableRowUuid).
   * @returns Either the provided data tableRowUuid or index.
   */
  rowTrackByFn(index: number, data: TableRowData): number | string {
    return !!data && data.tableRowUuid ? data.tableRowUuid : index;
  }

  /**
   * Emits an event to prompt the parent component to refresh the data of the table.
   */
  refreshData(): void {
    this.refresh.emit();
  }

  /**
   * Helper function to check whether or not two (2) pieces of row data are equal.
   *  - First, tries to compare with the dataKey, if one was set
   *  - Second, tries to compare with the uuid, if generated
   *  - Third, tries to compare with the index, if provided
   *
   * @param d1 the first piece of row data
   * @param d2  the second piece of row data
   * @param d1Index optional, the index of the first piece of row data
   * @param d2Index optional, the index of the second piece of row data
   * @returns True if the provided row data are equal, false otherwise.
   */
  // eslint-disable-next-line complexity
  isRowTableDataEqual(d1: TableRowData, d2: TableRowData, d1Index?: number, d2Index?: number): boolean {
    if (!!this.dataKey && !!d1 && this.dataKey in d1 && !!d2 && this.dataKey in d2) {
      return d1[this.dataKey] === d2[this.dataKey];
    }
    if (!!d1 && !!d1.tableRowUuid && !!d2 && !!d2.tableRowUuid) {
      return d1.tableRowUuid === d2.tableRowUuid;
    }
    if (d1Index !== undefined && d2Index !== undefined) {
      return d1Index === d2Index;
    }
    return false;
  }

  /**
   * Determines whether or not a row of table data is selectable (checkbox/ radio button is enabled).
   * Tries to use the disableRowSelectionFunction if it is defined.
   * Otherwise, just set it to true.
   *
   * @param data The table row data.
   * @returns True if the row is selectable, false otherwise.
   */
  isTableDataSelectable(data: TableRowData): boolean {
    return this.disableRowSelectionFunction ? !this.disableRowSelectionFunction(data) : true;
  }

  /**
   * Determines whether or not a row of table data is expandable (chevron button is enabled).
   * Tries to use the disableRowExpansionFunction if it is defined.
   * Otherwise, just set it to true.
   *
   * @param data The table row data.
   * @returns True if the row is expandable, false otherwise.
   */
  isTableDataExpandable(data: TableRowData): boolean {
    return this.disableRowExpansionFunction ? !this.disableRowExpansionFunction(data) : true;
  }

  /**
   * Determines whether or not a row of table data is actionable (action menu button is enabled).
   * Tries to use the disableRowActionsButtonFunction if it is defined.
   * Otherwise, just set it to true.
   *
   * @param data The table row data.
   * @returns True if the row is actionable, false otherwise.
   */
  isTableDataActionEnabled(data: TableRowData): boolean {
    return this.disableRowActionsButtonFunction ? !this.disableRowActionsButtonFunction(data) : true;
  }

  /**
   * Determines whether or not all the visible data that can be expanded is expanded.
   *
   * @param data The table data.
   * @returns True if all the visible rows are expanded, false otherwise.
   */
  areAllVisibleRowsExpanded(data: TableRowData[]): boolean {
    if (!data || !data.length) {
      return true;
    }

    const visibleData: TableRowData[] = data.filter((d: TableRowData) => d.isVisible && d.isExpandable);
    const selectedData: TableRowData[] = data.filter((d: TableRowData) => d.isExpandable && d.isExpanded);
    return intersection(visibleData, selectedData).length === visibleData.length;
  }

  /**
   * Updates the query list of table columns based on the found table elements, table view, and default column inputs.
   *
   * @param columns Optional. The table column elements (ContentChildren).
   * @param viewChangeOrDefaultCols Optional. Indicates if the column update is from a view or column children change.
   */
  updateColumns(columns?: QueryList<TableColumnComponent>, viewChangeOrDefaultCols?: ViewChangeOrDefaultCols): void {
    const cols: TableColumnComponent[] = (columns || this.columns)?.toArray();

    if (!!cols?.length) {
      const newColumns: QueryList<TableColumnComponent> = new QueryList<TableColumnComponent>();
      newColumns.reset(cols);

      newColumns.forEach((col: TableColumnComponent) => {
        // See if there is a matching config for an existing table column; if so, update all configured attributes.
        if (columns || viewChangeOrDefaultCols === ViewChangeOrDefaultCols.VIEW_CHANGE) {

          // If any of the applied filters have a sort or default sort, clear the sort for each column first
          if (this.appliedTableView?.columns?.some((c: TableColumnConfig) => !!c.sorted || !!c.defaultSort)) {
            col.sorted = undefined;
          }

          const matchingColViewConfig: TableColumnConfig =
            this.appliedTableView?.columns?.find((viewCol: TableColumnConfig) => col.field === viewCol.field);
          Object.keys(matchingColViewConfig || {}).forEach((key: string) => col[key] = matchingColViewConfig[key]);
        }

        // Only use the default column configs when a new set of columns are found (on table load)
        if (columns || viewChangeOrDefaultCols === ViewChangeOrDefaultCols.DEFAULT_COLS) {
          const matchingDefaultColConfig: TableColumnConfig =
            this.defaultColumns?.find((config: TableColumnConfig) => config.field === col.field);
          Object.keys(matchingDefaultColConfig || {}).forEach((key: string) => col[key] = matchingDefaultColConfig[key]);
        }
      });

      newColumns.setDirty();
      this._columns = newColumns;

      this.visibleColumns = newColumns.toArray().filter((col: TableColumnComponent) => col.isVisible);
    }
  }

  /**
   * When a table cell emits a startResize event, create a listener for the mousemove mouse event and
   * set the resizeIndicatorVisibleListener flag equal to it.
   * This displays the vertical line to indicate the new table column width under the cursor.
   */
  startResize(): void {
    this.flags.resizeIndicatorVisibleListener = this.renderer.listen(window, 'mousemove', (event: MouseEvent) => {
      const relativeLeft: number = this.elementRef.nativeElement.getBoundingClientRect().left;
      const scrollLeft: number = this.elementRef.nativeElement.querySelector('.f-table__container').scrollLeft;
      this.resizeXCoordinate = event.pageX - relativeLeft + scrollLeft;
      this.cdr.detectChanges();
    });
  }

  /**
   * When a table cell emits a stopResize event, set the resizeIndicatorVisibleListener flag to undefined.
   * Updates the column's updatedWidth value with the new column width size.
   *
   * @param colField The field of the column to update.
   * @param updatedWidth The new width of the column.
   */
  stopResize(colField: string, updatedWidth: string): void {
    this.unlistenToResizeIndicatorVisibleMouseMove();
    const matchingColumn: TableColumnComponent = this.columns.toArray().find((col: TableColumnComponent) => col.field === colField);
    matchingColumn.updatedWidth = updatedWidth;
  }

  /**
   * Unlistens to the resizeIndicatorVisibleListener and sets to undefined.
   */
  unlistenToResizeIndicatorVisibleMouseMove(): void {
    if (!!this.flags?.resizeIndicatorVisibleListener) {
      this.flags.resizeIndicatorVisibleListener(); // unlisten
      this.flags.resizeIndicatorVisibleListener = undefined;
    }
  }
}
