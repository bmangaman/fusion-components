export interface ResultsPerPageOption {
  value: number;
  isDefault?: boolean;
}

export interface TablePaginationConfig {
  resultsPerPageOptions: ResultsPerPageOption[];
  allowViewAllOption?: boolean;
  displayNumSelected?: boolean;
}

export const TABLE_PAGINATION_CONFIG: TablePaginationConfig = {
  resultsPerPageOptions: [{ value: 5 }, { value: 10 }, { value: 30, isDefault: true }, { value: 100 }],
  allowViewAllOption: false,
  displayNumSelected: true,
};

export interface TablePaginationEmit {
  config: TablePaginationConfig;
  numOfPages: number;
  oldNumResultsPerPage: number;
  numResultsPerPage: number;
  currentPageIndex: number;
}

export interface TablePaginationTranslations {
  results?: string;
  viewAll?: string;
  navigateToPage?: string;
  navigateToPrevPage?: string;
  navigateToNextPage?: string;
  selected?: string;
  deselectAll?: string;
}
