import { TemplateRef } from '@angular/core';

import { State } from '../../shared';
import { DEFAULT_TABLE_ACTIONS_TRANSLATIONS, TableActionsTranslations } from './table-actions/';
import { TableColumnSelectorTranslations, DEFAULT_TABLE_COLUMN_SELECTOR_TRANSLATIONS } from './table-column-selector';
import { TableColumnSort } from './table-column-sorts';
import { DEFAULT_TABLE_FILTER_SELECTOR_TRANSLATIONS, TableFilterConfig, TableFilterSelectorTranslations } from './table-filter-selector';
import {
  DEFAULT_TABLE_FILTER_ARRAY_TRANSLATIONS,
  DEFAULT_TABLE_FILTER_BYTES_TRANSLATIONS,
  DEFAULT_TABLE_FILTER_IP_TRANSLATIONS,
  DEFAULT_TABLE_FILTER_NUMBER_TRANSLATIONS,
  DEFAULT_TABLE_FILTER_STRING_TRANSLATIONS,
  TableFilterArrayTranslations,
  TableFilterBytesTranslations,
  TableFilterIpTranslations,
  TableFilterNumberTranslations,
  TableFilterStringTranslations,
  TableFilterTranslations,
} from './table-filters';
import { DEFAULT_TABLE_PAGINATION_TRANSLATIONS, TablePaginationConfig, TablePaginationTranslations } from './table-pagination';

export enum TableSpacing {
  CONDENSED = 'condensed',
  NORMAL = 'normal',
  SPACIOUS = 'spacious',
}

export enum RowExpansionMode {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export enum SelectionMode {
  MULTIPLE = 'multiple',
  SINGLE = 'single',
}

export enum TableType {
  ADVANCED = 'advanced',
  BASIC = 'basic',
}

export interface TableConfig {
  tableTitle?: string;
  tableUuid?: string;
  data?: any;
  dataKey?: string;
  defaultColumns?: TableColumnConfig[];
  appliedFilters?: TableFilterConfig[];
  translations?: TableTranslations;
  state?: State;
  fillContainer?: boolean;
  type?: TableType;
  spacing?: TableSpacing;
  exportFileName?: string;
  selectionMode?: SelectionMode;
  disableRowSelectionFunction?: () => boolean;
  rowExpansionMode?: RowExpansionMode;
  disableRowExpansionFunction?: () => boolean;
  disableRowActionsButtonFunction?: () => boolean;
  downloadTransformationFunction?: (...args: any[]) => any;
  paginationConfig?: TablePaginationConfig;
  quickFilters?: TableFilterConfig[];
  tableViews?: TableView[];
  appliedTableViewName?: string;
  refresh?: () => void;
  sortChange?: (...args: unknown[]) => void;
  expansionChange?: (...args: unknown[]) => void;
  selectChange?: (...args: unknown[]) => void;
  columnVisibilityChange?: (...args: unknown[]) => void;
  filterChange?: (...args: unknown[]) => void;
  viewChange?: (...args: unknown[]) => void;
  finalTableDataChange?: (...args: unknown[]) => void;
}

/**
 * The TableColumnConfig is used to define the settings (Inputs) of the Table Column Component.
 * Used to update column state and to emit the current state of (visible) columns.
 * - header: the string displayed in the column header
 * - field: the attribute of the data to be displayed in the column body cells
 * - cellContentAlignment - determines how the column cell content is aligned (left, right, or center)
 * - minWidth - the minimum width of the column, can grow beyond this value
 * - width - the set width of the column, will not grow or shrink
 * - sorted - determines whether or not the column is sorted, either ascending or descending, only one column can be sorted at a time
 * - isSortable - determines whether or not the column can be sorted
 * - defaultSort - determines whether or not the column is sorted by default, and in which direction (ascending or descending)
 * - contentTemplateRef - allows for custom cell content
 * - headerTemplateRef - allows for a custom cell header
 * - isTruncated - used with the width attribute; determines if the content is truncated (will not wrap)
 * - isFiltered - determines whether or not the column data has any filters applied
 * - isOverflowVisible - determines if overflow items, like menus, are visible
 * - isVisible - determines if the column is visible
 * - isHidable - determines if the column visibility is togglable (via the column selector)
 * - sortFunction - allows for a custom sort function
 * - columnCellStyleClassesFunction - allows for custom classes to be appended to the table cell
 */
export interface TableColumnConfig {
  header?: string;
  field?: string;
  cellContentAlignment?: TableCellContentAlignment;
  cellContentVerticalAlignment?: TableCellContentVerticalAlignment;
  minWidth?: string;
  width?: string;
  updatedWidth?: string;
  sorted?: TableColumnSorted;
  isSortable?: boolean;
  defaultSort?: TableColumnSorted;
  contentTemplateRef?: TemplateRef<any>;
  headerTemplateRef?: TemplateRef<any>;
  isTruncated?: boolean;
  isFiltered?: boolean;
  isOverflowVisible?: boolean;
  isResizable?: boolean;
  isVisible?: boolean;
  isHidable?: boolean;
  sortFunction?: TableColumnSort;
  columnCellStyleClassesFunction?(...args: any[]): string[];
}

export enum TableCellContentAlignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum TableCellContentVerticalAlignment {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

/**
 * The TableRowData is used to define what table-specifc attributes can be appended to a piece of table data to help
 * keep track of the state of the table and its data.
 * - tableRowUuid - generated uuid for the piece of data
 * - isVisible - is the data visible in the table (used for pagination)
 * - isFiltered - is the data filtered out of the table (used in filtering)
 * - isNotInView - if the data is filtered out b/c of table view filter
 * - isActionable - is the action menu enabled
 * - isSelected - is the data selected
 * - isSelectable - is the select input (radio or checkbox) enabled
 * - isExpanded - is the row expanded
 * - isExpandable - is the row expansion toggle button enabled
 */
export interface TableRowData {
  [any: string]: any;
  tableRowUuid?: string;
  isVisible?: boolean;
  isFiltered?: boolean;
  isNotInView?: boolean;
  isActionable?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  isExpanded?: boolean;
  isExpandable?: boolean;
}

export enum TableColumnSorted {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

/**
 * Keeps track of the flags for the functionality enabled (or disabled) on the table.
 */
export interface EnabledTableFunctionality {
  controls?: boolean;
  pagination?: boolean;
  header?: boolean;
  rowExpansion?: boolean;
  rowActions?: boolean;
  rowSelection?: boolean;
  filtering?: boolean;
}

/**
 * Keeps track of more generic, state-related flags for the table.
 */
export interface TableFlags {
  areAllVisibleRowsExpanded?: boolean;
  noResults?: boolean;
  didFiltersChange?: boolean;
  resizeIndicatorVisibleListener?: any;
}

/**
 * The TableView is used to create different views of the table.
 *  - label: The string displayed in the "button"
 *  - isSelected: Flag that determines whether or not the view is active/ selected; only one (1) view at a time should be selected.
 *  - columns: The list of columns to be visible/ hidable/ etc with the view.
 *  - filters: The filters to be applied with a view; recommend setting tableFilterConfig.isVisible flag to false.
 *  - isVisible: Flag that determines whether or not the view (button) is visible.
 */
export interface TableView {
  label: string;
  name: string;
  isSelected?: boolean;
  columns?: TableColumnConfig[];
  filters?: TableFilterConfig[];
  isVisible?: boolean;
}

export enum ViewChangeOrDefaultCols {
  VIEW_CHANGE = 'viewChange',
  DEFAULT_COLS = 'defaultCols',
}

export enum TableTemplate {
  TABLE_HEADER = 'tableHeader',
  LEFT_CONTROLS = 'leftControls',
  RIGHT_CONTROLS = 'rightControls',
  TABLE_CELL = 'tableCell',
  TABLE_COLUMN_HEADER = 'tableColumnHeader',
  ROW_EXPANSION = 'rowExpansion',
  ROW_ACTIONS = 'rowActions',
  SELECTION_COLUMN = 'selectionColumn',
}

export interface TableCellTranslations {
  sortAscending: string;
  sortDescending: string;
  isFiltered: string;
}

export const DEFAULT_TABLE_CELL_TRANSLATIONS: TableCellTranslations = {
  sortAscending: 'Sort column by ascending.',
  sortDescending: 'Sort column by descending.',
  isFiltered: 'Column is filtered.',
}

export interface TableTranslations {
  state: {
    loadingSpinnerAriaLabel: string;
    error: string;
    noResults: string;
  };
  actions: TableActionsTranslations;
  pagination: TablePaginationTranslations;
  selection: {
    selectAll: string;
    select: string;
  };
  expansion: {
    expandAll: string;
    expand: string;
  };
  filters: {
    array: TableFilterArrayTranslations;
    bytes: TableFilterBytesTranslations;
    ip: TableFilterIpTranslations,
    number: TableFilterNumberTranslations,
    string: TableFilterStringTranslations,
    [key: string]: TableFilterTranslations;
  },
  filtering: TableFilterSelectorTranslations;
  tableCell: TableCellTranslations;
  columnSelector: TableColumnSelectorTranslations;
}

export const DEFAULT_TABLE_TRANSLATIONS: TableTranslations = {
  state: {
    loadingSpinnerAriaLabel: 'Getting table data',
    error: 'ERROR',
    noResults: 'No Results',
  },
  actions: DEFAULT_TABLE_ACTIONS_TRANSLATIONS,
  pagination: DEFAULT_TABLE_PAGINATION_TRANSLATIONS,
  selection: {
    selectAll: 'Select all visible rows',
    select: 'Select row',
  },
  expansion: {
    expandAll: 'Expand all visible rows',
    expand: 'Expand row',
  },
  filtering: DEFAULT_TABLE_FILTER_SELECTOR_TRANSLATIONS,
  filters: {
    array: DEFAULT_TABLE_FILTER_ARRAY_TRANSLATIONS,
    bytes: DEFAULT_TABLE_FILTER_BYTES_TRANSLATIONS,
    ip: DEFAULT_TABLE_FILTER_IP_TRANSLATIONS,
    number: DEFAULT_TABLE_FILTER_NUMBER_TRANSLATIONS,
    string: DEFAULT_TABLE_FILTER_STRING_TRANSLATIONS,
  },
  tableCell: DEFAULT_TABLE_CELL_TRANSLATIONS,
  columnSelector: DEFAULT_TABLE_COLUMN_SELECTOR_TRANSLATIONS,
}

/**
 * Object made up of the enums usually used to configure the table component.
 * Replaces the need to individually import and set all of these enums in a component.
 */
export const TableComponentEnums: Record<string, any> = {
  RowExpansionMode,
  SelectionMode,
  TableColumnSorted,
  TableSpacing,
  TableTemplate,
  TableType,
  TableCellContentAlignment,
  TableCellContentVerticalAlignment,
  ViewChangeOrDefaultCols,
};
