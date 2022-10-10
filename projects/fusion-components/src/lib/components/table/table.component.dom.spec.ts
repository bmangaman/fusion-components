import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { cloneDeep } from 'lodash-es';

import translations from 'projects/fusion-components-site/src/i18n/en.json';

import { TranslatedComponentSpecModule } from '@fusion-components/unit-test-helpers/translated-component.module.spec';
import { FusionComponentsTranslationService } from '../../services/translation';
import { State } from '../../shared';
import { TableFilterConfig } from './table-filter-selector';
import { TableFilterNumberComponent, TableFilterNumberInputComparator } from './table-filters';
import { TABLE_PAGINATION_CONFIG, TablePaginationConfig } from './table-pagination';
import { TableComponentPageObject } from './table.component.spec.po';
import {
  RowExpansionMode,
  SelectionMode,
  TableColumnConfig,
  TableRowData,
  TableSpacing,
  TableTemplate,
  TableTranslations,
  TableType,
} from './table.interface';
import { TableModule } from './table.module';

@Component({
  selector: 'f-test-component',
  template: `
  <f-table
    *ngIf="loaded"
    [data]="data"
    [dataKey]="dataKey"
    [state]="state"
    [fillContainer]="fillContainer"
    [selectionMode]="selectionMode"
    [type]="type"
    [rowExpansionMode]="rowExpansionMode"
    [disableRowExpansionFunction]="disableRowExpansionFunction"
    [disableRowActionsButtonFunction]="disableRowActionsButtonFunction"
    [disableRowSelectionFunction]="disableRowSelectionFunction"
    [paginationConfig]="paginationConfig"
    [quickFilters]="quickFilters"
    [spacing]="spacing"
    [translations]="translations"
    [tableTitle]="tableTitle">

    <ng-container *ngIf="includeTableFilters">
      <f-table-number-filter field="id" filterName="ID"></f-table-number-filter>
      <f-table-string-filter field="data0" filterName="Data0"></f-table-string-filter>
    </ng-container>

    <f-table-column
      *ngFor="let col of columns"
      [header]="col?.header"
      [isVisible]="col?.isVisible"
      [isHidable]="col?.isHidable"
      [field]="col?.field">
    </f-table-column>

    <ng-template [fusionUiTemplate]="TableTemplate.TABLE_HEADER" *ngIf="headerTemplate">
      Custom Header
    </ng-template>

    <ng-template [fusionUiTemplate]="TableTemplate.ROW_EXPANSION" *ngIf="rowExpansionTemplate">
      Custom Row Expansion Content
    </ng-template>

    <ng-template [fusionUiTemplate]="TableTemplate.ROW_ACTIONS" *ngIf="rowActionsTemplate">
      Custom Row Actions Content
    </ng-template>

  </f-table>
  `,
})
export class TableTestComponent {
  readonly TableTemplate = TableTemplate;

  loaded: boolean = true;
  headerTemplate: boolean = false;
  rowExpansionTemplate: boolean = false;
  rowActionsTemplate: boolean = false;

  includeTableFilters: boolean = false;

  columns: TableColumnConfig[] = [];

  data: any[];
  dataKey: string;
  state: State;
  fillContainer: boolean;
  selectionMode: SelectionMode;
  type: TableType;
  spacing: TableSpacing;
  tableTitle: string;
  rowExpansionMode: RowExpansionMode;
  paginationConfig: TablePaginationConfig;

  quickFilters: TableFilterConfig[];

  translations: TableTranslations = {};

  disableRowExpansionFunction(d: TableRowData): boolean {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    return d['data0'] === undefined;
  }

  disableRowActionsButtonFunction(d: TableRowData): boolean {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    return d['data0'] === undefined;
  }

  disableRowSelectionFunction(d: TableRowData): boolean {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    return d['data0'] === undefined;
  }
}

@Component({
  selector: 'f-test-component-with-refresh',
  template: `
  <f-table (refresh)="refreshCallback()" [data]="data" [type]="type" [state]="state">
    <f-table-column
      *ngFor="let col of columns"
      [header]="col?.header"
      [isVisible]="col?.isVisible"
      [isHidable]="col?.isHidable"
      [field]="col?.field">
    </f-table-column>
  </f-table>
  `,
})
export class TableWithRefreshTestComponent {
  columns: TableColumnConfig[] = [];
  data: any[];
  state: State;
  fillContainer: boolean;
  type: TableType;

  refreshCallback(): void {
    // do nothing;
  }
}

describe('TableComponent', () => {
  let component: TableTestComponent;
  let fixture: ComponentFixture<TableTestComponent>;
  let page: TableComponentPageObject;
  let translate: TranslateService;
  let translationService: FusionComponentsTranslationService;

  let data: any[];
  let columns: TableColumnConfig[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableTestComponent,
        TableWithRefreshTestComponent,
      ],
      imports: [
        TableModule,
        TranslatedComponentSpecModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(TableTestComponent);
    component = fixture.componentInstance;
    page = new TableComponentPageObject(fixture);

    translationService = TestBed.inject(FusionComponentsTranslationService);
    translationService.baseTranslationKey = 'components';

    translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', translations);
    translate.setDefaultLang('en');

    await asyncDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the table refresh', () => {
    describe('without refresh callback', () => {
      it('should not show a refresh button if no refresh callback is provided', () => {
        component.state = State.LOADED;
        component.type = TableType.ADVANCED;
        fixture.detectChanges();

        expect(page.table.refreshButton).toBeNull();
      });
    });

    describe('with refresh callback', () => {
      let fixtureWithRefresh: ComponentFixture<TableWithRefreshTestComponent>
      let componentWithRefresh;

      beforeEach(async () => {
        fixtureWithRefresh = TestBed.createComponent(TableWithRefreshTestComponent);
        componentWithRefresh = fixtureWithRefresh.componentInstance;
        page = new TableComponentPageObject(fixtureWithRefresh);

        await asyncDetectChanges();

        generateData(1);
        componentWithRefresh.data = data;
        componentWithRefresh.state = State.LOADED;
        componentWithRefresh.type = TableType.ADVANCED;
        fixtureWithRefresh.detectChanges();
      });

      it('should show the refresh button if refresh callback is provided', async () => {
        expect(page.table.refreshButton).toBeTruthy();
      });

      it('should call the refresh callback on refresh button click', async () => {
        spyOn(componentWithRefresh, 'refreshCallback').and.stub();
        page.table.refreshButton.click();

        await asyncDetectChanges();

        expect(componentWithRefresh.refreshCallback).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('the table state', () => {
    it('should display a loading spinner when the state is "LOADING"', () => {
      component.state = State.LOADING;
      fixture.detectChanges();
      const stateContainer: HTMLElement = page.table.stateContainer;
      expect(stateContainer).toBeTruthy();
      expect(stateContainer.classList).toContain('f-table__state--loading');
      expect(stateContainer.querySelector('f-loading-spinner')).toBeTruthy();
    });

    it('should display an error message when the state is "ERROR"', () => {
      component.state = State.ERROR;
      fixture.detectChanges();
      const stateContainer: HTMLElement = page.table.stateContainer;
      expect(stateContainer).toBeTruthy();
      expect(stateContainer.classList).toContain('f-table__state--error');
    });

    it('should display a "no results" message when the state is "LOADED" but data is either undefined or empty', () => {
      component.data = undefined;
      component.state = State.LOADED;
      fixture.detectChanges();
      let stateContainer: HTMLElement = page.table.stateContainer;
      expect(stateContainer).toBeTruthy();
      expect(stateContainer.classList).toContain('f-table__state--no-results');

      component.data = [];
      component.state = State.LOADED;
      fixture.detectChanges();
      stateContainer = page.table.stateContainer;
      expect(stateContainer).toBeTruthy();
      expect(stateContainer.classList).toContain('f-table__state--no-results');
    });

    it('should display the data when the state is state is "LOADED" and data is NOT empty', () => {
      generateData(1);
      component.data = data;
      component.state = State.LOADED;
      fixture.detectChanges();
      const stateContainer: HTMLElement = page.table.stateContainer;
      expect(stateContainer).toBeTruthy();
      expect(stateContainer.classList).toContain('f-table__state--loaded');
      expect(page.table.table).toBeTruthy();
    });
  });

  describe('the table columns', () => {
    beforeEach(() => {
      generateData(1);
      component.data = data;
      component.state = State.LOADED;
      component.type = TableType.ADVANCED;
      fixture.detectChanges();
      expect(page.table.table).toBeTruthy();
    });

    it('should display the correct columns based on the tableColumnComponents', async () => {
      // no f-table-columns added
      expect(page.table.tableHeadColumns.length).toEqual(0);

      // one (1) f-table columns (id) added
      generateColumns(0);
      component.columns = columns;
      await asyncDetectChanges();
      expect(page.table.tableHeadColumns.length).toEqual(1);

      // three (3) f-table-columns (id, data1, data2) added
      generateColumns(2);
      component.columns = columns;
      await asyncDetectChanges();
      expect(page.table.tableHeadColumns.length).toEqual(3);
    });

    it('should only display visible columns', async () => {
      // three (3) f-table-columns (id, data1, data2) added
      // one 'isVisible' attribute is false
      generateColumns(2);
      columns[0].isVisible = false;
      component.columns = columns;
      await asyncDetectChanges();
      expect(page.table.tableHeadColumns.length).toEqual(2);
    });

    it('should toggle the visibility of a column using the column selector menu', async () => {
      // Verify the default state of three (3) visible columns
      generateColumns(2);
      component.columns = columns;
      await asyncDetectChanges();
      expect(page.table.tableHeadColumns.length).toEqual(3);

      // Find the column selector menu and open it
      expect(page.table.controls).toBeTruthy();
      expect(page.table.columnSelectorMenu).toBeTruthy();
      expect(page.table.columnSelectorMenu.menuButton).toBeTruthy();
      page.table.columnSelectorMenu.menuButton.click();
      await asyncDetectChanges();
      expect(page.table.columnSelectorMenu.menuDialogContent).toBeTruthy();
      expect(page.table.columnSelectorMenuInputs.length).toEqual(3);
      expect(page.table.getColumnSelectorMenuInputByColumnHeader(columns[0].header).checked).toBeTruthy();

      // Click the checkbox corresponding to the first column (id)
      page.table.getColumnSelectorMenuInputByColumnHeader(columns[0].header).click();
      await asyncDetectChanges();
      expect(page.table.getColumnSelectorMenuInputByColumnHeader(columns[0].header).checked).toBeFalsy();
      expect(page.table.tableHeadColumns.length).toEqual(2);

      // Click the checkbox corresponding to the first column (id)
      page.table.getColumnSelectorMenuInputByColumnHeader(columns[0].header).click();
      expect(page.table.getColumnSelectorMenuInputByColumnHeader(columns[0].header).checked).toBeTruthy();
      await asyncDetectChanges();
      expect(page.table.tableHeadColumns.length).toEqual(3);
    });

    it('should not display a column as hidable if isHidable is false', async () => {
      generateColumns(2);
      columns[0].isHidable = false;
      component.columns = columns;
      await asyncDetectChanges();
      expect(page.table.tableHeadColumns.length).toEqual(3);

      // Find the column selector menu and open it
      expect(page.table.controls).toBeTruthy();
      expect(page.table.columnSelectorMenu).toBeTruthy();
      expect(page.table.columnSelectorMenu.menuButton).toBeTruthy();
      page.table.columnSelectorMenu.menuButton.click();
      await asyncDetectChanges();
      expect(page.table.columnSelectorMenu.menuDialogContent).toBeTruthy();
      expect(page.table.columnSelectorMenuInputs.length).toEqual(2);
      expect(page.table.getColumnSelectorMenuInputByColumnHeader(columns[0].header)).toBeFalsy();
    });
  });

  describe('the table header', () => {
    it('should not be displayed if no tableTitle was set OR if no custom table header template was provided', () => {
      component.tableTitle = undefined;
      component.headerTemplate = false;
      fixture.detectChanges();
      expect(page.table.header).toBeFalsy();
    });

    it('should display the tableTitle text if the tableTitle is set', () => {
      component.tableTitle = 'Table Title';
      component.headerTemplate = false;
      fixture.detectChanges();
      expect(page.table.header).toBeTruthy();
      expect(page.table.header.innerText).toEqual('Table Title');
    });

    it('should display the custom table header template if provided', () => {
      component.tableTitle = undefined;
      component.headerTemplate = true;
      reloadTableComponent();
      expect(page.table.header).toBeTruthy();
      expect(page.table.header.innerText).toEqual('Custom Header');
    });
  });

  describe('the table type', () => {
    it('should hide the pagination and controls if the table type is "BASIC"', () => {
      component.type = TableType.ADVANCED;
      fixture.detectChanges();
      expect(page.table.controls).toBeTruthy();
      expect(page.table.pagination).toBeTruthy();

      component.type = TableType.BASIC;
      fixture.detectChanges();
      expect(page.table.controls).toBeFalsy();
      expect(page.table.pagination).toBeFalsy();
    });
  });

  describe('table row expansion', () => {
    it(
      'should display the table row exapnsion controls column if the rowExpansion template exists AND if rowExpansionMode is defined',
      async () => {
        generateData(1);
        generateColumns(2);
        component.data = data;
        component.columns = columns;
        component.state = State.LOADED;

        component.rowExpansionTemplate = false;
        component.rowExpansionMode = undefined;
        reloadTableComponent();
        await asyncDetectChanges();
        expect(page.table.tableBodyRows.length).toEqual(1);
        expect(page.table.getTableHeadColumnAtIndex(0).classList).not.toContain('f-table__table-cell--expansion-control');
        expect(page.table.getTableBodyColumnAtIndex(0, 0).classList).not.toContain('f-table__table-cell--expansion-control');

        component.rowExpansionTemplate = false;
        component.rowExpansionMode = RowExpansionMode.MULTIPLE;
        reloadTableComponent();
        await asyncDetectChanges();
        expect(page.table.tableBodyRows.length).toEqual(1);
        expect(page.table.getTableHeadColumnAtIndex(0).classList).not.toContain('f-table__table-cell--expansion-control');
        expect(page.table.getTableBodyColumnAtIndex(0, 0).classList).not.toContain('f-table__table-cell--expansion-control');

        component.rowExpansionTemplate = true;
        component.rowExpansionMode = RowExpansionMode.MULTIPLE;
        reloadTableComponent();
        await asyncDetectChanges();
        expect(page.table.tableBodyRows.length).toEqual(1);
        expect(page.table.getTableHeadColumnAtIndex(0).classList).toContain('f-table__table-cell--expansion-control');
        expect(page.table.getTableBodyColumnAtIndex(0, 0).classList).toContain('f-table__table-cell--expansion-control');
      }
    );

    it('should disable the row expansion button for a row if the disableRowExpansionFunction returns true', () => {
      generateData(2);
      generateColumns(2);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      data[0]['data0'] = undefined;

      component.columns = columns;
      component.state = State.LOADED;
      component.rowExpansionTemplate = true;
      component.rowExpansionMode = RowExpansionMode.MULTIPLE;
      reloadTableComponent();

      component.data = data;
      fixture.detectChanges();

      // Verify row one (1) is visible, and when the (disabled) expand row button is clicked, nothing happens
      expect(page.table.tableBodyRows.length).toEqual(2);
      expect(page.table.getTableHeadColumnAtIndex(0).classList).toContain('f-table__table-cell--expansion-control');
      expect(page.table.getTableBodyColumnAtIndex(0, 0).classList).toContain('f-table__table-cell--expansion-control');
      const expandButton0: HTMLButtonElement = page.table.getTableBodyColumnAtIndex(0, 0).querySelector('button');
      expect(expandButton0).toBeTruthy();
      expect(expandButton0.disabled).toBeTruthy();
      expandButton0.click();
      fixture.detectChanges();
      expect(page.table.getTableBodyRowAtIndex(1)).toBeTruthy();
      expect(page.table.getTableBodyRowAtIndex(1).classList).not.toContain('f-table__table-row--expansion');

      // Verify row one (2) is visible, and when the expand row button is clicked, the row is expanded (and when clicked again, collapses)
      expect(page.table.getTableBodyColumnAtIndex(1, 0).classList).toContain('f-table__table-cell--expansion-control');
      const expandButton1: HTMLButtonElement = page.table.getTableBodyColumnAtIndex(1, 0).querySelector('button');
      expect(expandButton1).toBeTruthy();
      expect(expandButton1.disabled).toBeFalsy();
      expandButton1.click();
      fixture.detectChanges();
      expect(page.table.getTableBodyRowAtIndex(2)).toBeTruthy();
      expect(page.table.getTableBodyRowAtIndex(2).classList).toContain('f-table__table-row--expansion');
      expandButton1.click();
      fixture.detectChanges();
      expect(page.table.getTableBodyRowAtIndex(2)).toBeFalsy();
    });

    it('should display the expand/ collapse all button if the rowExpansionMode is MULTUPLE', () => {
      generateData(2);
      generateColumns(2);
      component.data = data;
      component.columns = columns;
      component.state = State.LOADED;
      component.rowExpansionTemplate = true;
      reloadTableComponent();

      // Verify that the header expand row control button is visible if rowExpansionMode is MULTIPLE
      component.rowExpansionMode = RowExpansionMode.MULTIPLE;
      fixture.detectChanges();
      expect(page.table.tableBodyRows.length).toEqual(2);
      expect(page.table.getTableHeadColumnAtIndex(0).classList).toContain('f-table__table-cell--expansion-control');
      let expandButton: HTMLButtonElement = page.table.getTableHeadColumnAtIndex(0).querySelector('button');
      expect(expandButton).toBeTruthy();
      expandButton.click();
      fixture.detectChanges();
      expect(page.table.tableBodyRows.length).toEqual(4);
      expandButton.click();
      fixture.detectChanges();
      expect(page.table.tableBodyRows.length).toEqual(2);

      // Verify that the header expand row control button is NOT visible if rowExpansionMode is SINGLE
      component.rowExpansionMode = RowExpansionMode.SINGLE;
      fixture.detectChanges();
      expect(page.table.tableBodyRows.length).toEqual(2);
      expect(page.table.getTableHeadColumnAtIndex(0).classList).toContain('f-table__table-cell--expansion-control');
      expandButton = page.table.getTableHeadColumnAtIndex(0).querySelector('button');
      expect(expandButton).toBeFalsy();
    });
  });

  describe('table row actions', () => {
    it('should display the table row actions column if the rowActions template exists', async () => {
      generateData(1);
      generateColumns(2);
      component.data = data;
      component.columns = columns;
      component.state = State.LOADED;

      component.rowActionsTemplate = false;
      reloadTableComponent();
      await asyncDetectChanges();
      expect(page.table.tableHeadColumns.length).toEqual(3);
      expect(page.table.getTableBodyActionsColumnAtRowIndex(0)).toBeFalsy();
      expect(page.table.getTableBodyActionsButtonAtRowIndex(0)).toBeFalsy();

      component.rowActionsTemplate = true;
      reloadTableComponent();
      await asyncDetectChanges();
      expect(page.table.tableHeadColumns.length).toEqual(4);
      expect(page.table.getTableBodyActionsColumnAtRowIndex(0)).toBeTruthy();
      expect(page.table.getTableBodyActionsButtonAtRowIndex(0)).toBeTruthy();
    });

    it('should disable the row actions button for a row if the disableRowActionsButtonFunction returns true', async () => {
      generateData(2);
      generateColumns(2);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      data[0]['data0'] = undefined;

      component.columns = columns;
      component.rowActionsTemplate = true;
      component.state = State.LOADED;
      reloadTableComponent();

      component.data = data;
      fixture.detectChanges();
      await asyncDetectChanges();

      expect(page.table.tableHeadColumns.length).toEqual(4);
      const row0ActionsButton: HTMLButtonElement = page.table.getTableBodyActionsButtonAtRowIndex(0).menuButton;
      expect(row0ActionsButton.disabled).toBeTruthy();
      expect(row0ActionsButton).toBeTruthy();

      const row1ActionsButton: HTMLButtonElement = page.table.getTableBodyActionsButtonAtRowIndex(1).menuButton;
      expect(row1ActionsButton).toBeTruthy();
      expect(row1ActionsButton.disabled).toBeFalsy();
    });
  });

  describe('table pagination', () => {
    beforeEach(async () => {
      generateData(100);
      generateColumns(2);
      component.data = data;
      component.columns = columns;
      component.type = TableType.ADVANCED;
      component.state = State.LOADED;

      reloadTableComponent();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(page.table.pagination).toBeTruthy();
    });

    it('should disable the pagination section if the state is anything other than loaded', async () => {
      component.state = State.LOADED;
      await fixture.whenStable();
      fixture.detectChanges();
      expect(page.table.pagination.classList.contains('f-table__pagination--disabled')).toBeFalsy();
      expect(page.table.pagination.getAttribute('aria-hidden')).toEqual('false');

      component.state = State.LOADING;
      await fixture.whenStable();
      fixture.detectChanges();
      expect(page.table.pagination.classList.contains('f-table__pagination--disabled')).toBeTruthy();
      expect(page.table.pagination.getAttribute('aria-hidden')).toBeTruthy();

      component.state = State.NOT_LOADED;
      await fixture.whenStable();
      fixture.detectChanges();
      expect(page.table.pagination.classList.contains('f-table__pagination--disabled')).toBeTruthy();
      expect(page.table.pagination.getAttribute('aria-hidden')).toBeTruthy();

      component.state = State.NO_RESULTS;
      await fixture.whenStable();
      fixture.detectChanges();
      expect(page.table.pagination.classList.contains('f-table__pagination--disabled')).toBeTruthy();
      expect(page.table.pagination.getAttribute('aria-hidden')).toBeTruthy();

      component.state = State.ERROR;
      await fixture.whenStable();
      fixture.detectChanges();
      expect(page.table.pagination.classList.contains('f-table__pagination--disabled')).toBeTruthy();
      expect(page.table.pagination.getAttribute('aria-hidden')).toBeTruthy();
    });

    it('should display the number of results text', async () => {
      // Default results string
      expect(page.table.paginationNumOfResults).toEqual(' 1 - 30 of 100 results ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      // Custom results string
      component.translations = { pagination: { results: 'Displaying $min - $max of $total' } };
      await asyncDetectChanges();
      expect(page.table.paginationNumOfResults).toEqual(' Displaying 1 - 30 of 100 ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      // Custom results string with different num of results per page option selected
      page.table.paginationNumPerPage.value = page.table.paginationNumPerPage.options[0].value; // select "5" option
      page.table.paginationNumPerPage.dispatchEvent(new Event('change'));
      await asyncDetectChanges();
      expect(page.table.paginationNumOfResults).toEqual(' Displaying 1 - 5 of 100 ');
      expect(page.table.tableBodyRows.length).toEqual(5);
    });

    it('should display the correct number of control buttons', async () => {
      expect(page.table.paginationControlButtons.length).toEqual(8);

      page.table.paginationNumPerPage.value = page.table.paginationNumPerPage.options[0].value; // select "5" option
      page.table.paginationNumPerPage.dispatchEvent(new Event('change'));
      await asyncDetectChanges();
      expect(page.table.paginationControlButtons.length).toEqual(9);
      expect(page.table.tableBodyRows.length).toEqual(5);

      page.table.paginationNumPerPage.value = page.table.paginationNumPerPage.options[3].value; // select "100" option
      page.table.paginationNumPerPage.dispatchEvent(new Event('change'));
      await asyncDetectChanges();
      expect(page.table.paginationControlButtons.length).toEqual(5);
      expect(page.table.tableBodyRows.length).toEqual(100);
    });

    it('should display the correct options for the number of results per page select input', async () => {
      expect(page.table.paginationNumPerPage.options.length).toEqual(4);
      expect(page.table.paginationNumPerPage.options[0].textContent).toEqual(' 5 ');
      expect(page.table.paginationNumPerPage.options[1].textContent).toEqual(' 10 ');
      expect(page.table.paginationNumPerPage.options[2].textContent).toEqual(' 30 ');
      expect(page.table.paginationNumPerPage.options[3].textContent).toEqual(' 100 ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      const config: TablePaginationConfig = {
        resultsPerPageOptions: [{ value: 10 }, { value: 100 }],
        allowViewAllOption: false,
      };
      component.paginationConfig = config;
      await asyncDetectChanges();
      expect(page.table.paginationNumPerPage.options.length).toEqual(2);
      expect(page.table.paginationNumPerPage.options[0].textContent).toEqual(' 10 ');
      expect(page.table.paginationNumPerPage.options[1].textContent).toEqual(' 100 ');
      await asyncDetectChanges();
      expect(page.table.tableBodyRows.length).toEqual(10);
    });

    it('should display and handle the "View All" option correctly', async () => {
      const config: TablePaginationConfig = cloneDeep(TABLE_PAGINATION_CONFIG);
      config.allowViewAllOption = true;
      component.paginationConfig = config;
      await asyncDetectChanges();
      expect(page.table.paginationNumPerPage.options.length).toEqual(5);
      expect(page.table.paginationNumPerPage.options[0].textContent).toEqual(' 5 ');
      expect(page.table.paginationNumPerPage.options[1].textContent).toEqual(' 10 ');
      expect(page.table.paginationNumPerPage.options[2].textContent).toEqual(' 30 ');
      expect(page.table.paginationNumPerPage.options[3].textContent).toEqual(' 100 ');
      expect(page.table.paginationNumPerPage.options[4].textContent).toEqual(' View All ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      page.table.paginationNumPerPage.value = page.table.paginationNumPerPage.options[4].value; // select "View All" option
      page.table.paginationNumPerPage.dispatchEvent(new Event('change'));
      await asyncDetectChanges();
      expect(page.table.paginationControlButtons.length).toEqual(5);
      expect(page.table.paginationNumOfResults).toEqual(' 1 - 100 of 100 results ');
      expect(page.table.tableBodyRows.length).toEqual(100);
    });

    it('should display the correct results based on the selected page', async () => {
      expect(page.table.paginationControlButtons.length).toEqual(8);
      expect(page.table.paginationNumOfResults).toEqual(' 1 - 30 of 100 results ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      page.table.paginationControlButtons.item(page.table.paginationControlButtons.length - 2).click(); // click "next page" button
      await asyncDetectChanges();
      expect(page.table.paginationNumOfResults).toEqual(' 31 - 60 of 100 results ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      page.table.paginationControlButtons.item(4).click(); // click "3" button
      await asyncDetectChanges();
      expect(page.table.paginationNumOfResults).toEqual(' 61 - 90 of 100 results ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      page.table.paginationControlButtons.item(1).click(); // click "previous page" button
      await asyncDetectChanges();
      expect(page.table.paginationNumOfResults).toEqual(' 31 - 60 of 100 results ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      page.table.paginationControlButtons.item(0).click(); // click "first page" button
      await asyncDetectChanges();
      expect(page.table.paginationNumOfResults).toEqual(' 1 - 30 of 100 results ');
      expect(page.table.tableBodyRows.length).toEqual(30);

      page.table.paginationControlButtons.item(page.table.paginationControlButtons.length - 1).click(); // click "last page" button
      await asyncDetectChanges();
      expect(page.table.paginationNumOfResults).toEqual(' 91 - 100 of 100 results ');
      expect(page.table.tableBodyRows.length).toEqual(10);
    });

    it('should display the correct results when data has been filtered', async () => {
      component.quickFilters = [
        {
          label: 'ID: greater than 50',
          field: 'id',
          comparatorName: TableFilterNumberInputComparator.GREATER_THAN,
          filterName: 'ID',
          filter: TableFilterNumberComponent,
          formValues: {
            number: 50,
          },
        },
      ];
      component.includeTableFilters = true;
      reloadTableComponent();

      page.table.quickFilters.item(0).click();

      await asyncDetectChanges();

      expect(page.table.paginationControlButtons.length).toEqual(6);
      expect(page.table.paginationNumOfResults).toEqual(' 1 - 30 of 49 results ');
    });
  });

  describe('table selection', () => {
    beforeEach(() => {
      component.dataKey = 'id';
    });

    it('should not display the selection column if a selectionMode was not provided', async () => {
      generateData(2);
      generateColumns(2);
      component.data = data;
      component.columns = columns;
      component.state = State.LOADED;

      // SelectionMode is undefined
      component.selectionMode = undefined;
      reloadTableComponent();
      await asyncDetectChanges();
      expect(page.table.tableBodyRows.length).toEqual(2);
      expect(page.table.tableHeadColumns.length).toEqual(3);
      expect(page.table.tableHeaderSelectionInput).toBeFalsy();
      for (let i = 0; i < 2; i++) {
        expect(page.table.getTableBodySelectionColumnAtRowIndex(i)).toBeFalsy();
      }

      // SelectionMnode is SINGLE
      component.selectionMode = SelectionMode.SINGLE;
      reloadTableComponent();
      await asyncDetectChanges();
      expect(page.table.tableBodyRows.length).toEqual(2);
      expect(page.table.tableHeadColumns.length).toEqual(4);
      expect(page.table.tableHeaderSelectionInput).toBeFalsy();
      for (let i = 0; i < 2; i++) {
        expect(page.table.getTableBodySelectionColumnAtRowIndex(i)).toBeTruthy();
      }

      // SelectionMnode is MULTIPLE
      component.selectionMode = SelectionMode.MULTIPLE;
      reloadTableComponent();
      await asyncDetectChanges();
      expect(page.table.tableBodyRows.length).toEqual(2);
      expect(page.table.tableHeadColumns.length).toEqual(4);
      expect(page.table.tableHeaderSelectionInput).toBeTruthy();
      for (let i = 0; i < 2; i++) {
        expect(page.table.getTableBodySelectionColumnAtRowIndex(i)).toBeTruthy();
      }
    });

    describe('when selectionMnode === MULTIPLE', () => {
      beforeEach(() => {
        component.selectionMode = SelectionMode.MULTIPLE;
      });

      it('should select and unselect all enabled row checkboses when the select all checkbox is clicked', async () => {
        // Setup Table Data/ Columns
        generateData(5);
        generateColumns(2);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        data[0]['data0'] = undefined;
        component.columns = columns;
        component.state = State.LOADED;
        reloadTableComponent();
        await asyncDetectChanges();

        component.data = data;
        fixture.detectChanges();

        // Verify the correct number of rows and columns were generated
        expect(page.table.tableBodyRows.length).toEqual(5);
        expect(page.table.tableHeadColumns.length).toEqual(4);

        // Verify the select/ deselect all input is rendered
        const tableHeaderSelectionInput: HTMLInputElement = page.table.tableHeaderSelectionInput;
        expect(tableHeaderSelectionInput).toBeTruthy();

        // Verify none of the inputs are checked
        expect(tableHeaderSelectionInput.checked).toBeFalsy();
        for (let i = 0; i < 2; i++) {
          const selectionInput: HTMLInputElement = page.table.getTableBodySelectionInputAtRowIndex(i);
          expect(selectionInput).toBeTruthy();
          expect(selectionInput.checked).toBeFalsy();
        }

        // Verify that when the header select all checkbox is clicked, all isSelectable rows are selected
        tableHeaderSelectionInput.click();
        fixture.detectChanges();
        expect(tableHeaderSelectionInput.checked).toBeTruthy();
        for (let i = 0; i < 2; i++) {
          const selectionInput: HTMLInputElement = page.table.getTableBodySelectionInputAtRowIndex(i);
          expect(selectionInput).toBeTruthy();
          if (i === 0) {
            expect(selectionInput.disabled).toBeTruthy();
            expect(selectionInput.checked).toBeFalsy();
          } else {
            expect(selectionInput.checked).toBeTruthy();
          }
        }

        // Verify that when the header deselect all checkbox is clicked, all isSelectable rows are deselected
        tableHeaderSelectionInput.click();
        fixture.detectChanges();
        expect(tableHeaderSelectionInput.checked).toBeFalsy();
        for (let i = 0; i < 2; i++) {
          const selectionInput: HTMLInputElement = page.table.getTableBodySelectionInputAtRowIndex(i);
          expect(selectionInput).toBeTruthy();
          expect(selectionInput.checked).toBeFalsy();
        }
      });

      it('should select and unselect individual enabled row checkboxes', async () => {
        // Setup Table Data/ Columns
        generateData(5);
        generateColumns(2);
        component.data = data;
        component.columns = columns;
        component.state = State.LOADED;
        reloadTableComponent();
        await asyncDetectChanges();

        // Verify the correct number of rows and columns were generated
        expect(page.table.tableBodyRows.length).toEqual(5);
        expect(page.table.tableHeadColumns.length).toEqual(4);

        // Verify the select/ deselect all input is rendered
        const tableHeaderSelectionInput: HTMLInputElement = page.table.tableHeaderSelectionInput;
        expect(tableHeaderSelectionInput).toBeTruthy();

        // Verify none of the inputs are checked
        expect(tableHeaderSelectionInput.checked).toBeFalsy();
        expect(tableHeaderSelectionInput.indeterminate).toBeFalsy();
        for (let i = 0; i < 2; i++) {
          const selectionInput: HTMLInputElement = page.table.getTableBodySelectionInputAtRowIndex(i);
          expect(selectionInput).toBeTruthy();
          expect(selectionInput.checked).toBeFalsy();
        }

        const selectionInputIndex1: HTMLInputElement = page.table.getTableBodySelectionInputAtRowIndex(1);

        // Click the selection input at index 1, verify it is checked and that the header input is indeterminate
        selectionInputIndex1.click();
        fixture.detectChanges();
        expect(selectionInputIndex1.checked).toBeTruthy();
        expect(tableHeaderSelectionInput.indeterminate).toBeTruthy();

        // Click the selection input at index 1, verify it is unchecked and that the header input is also unchecked
        selectionInputIndex1.click();
        fixture.detectChanges();
        expect(selectionInputIndex1.checked).toBeFalsy();
        expect(tableHeaderSelectionInput.indeterminate).toBeFalsy();
      });
    });

    describe('when selectionMnode === SINGLE', () => {
      beforeEach(() => {
        component.selectionMode = SelectionMode.SINGLE;
      });

      it('should select and unselect individual enabled row checkboxes', async () => {
        // Setup Table Data/ Columns
        generateData(5);
        generateColumns(2);
        component.data = data;
        component.columns = columns;
        component.state = State.LOADED;
        reloadTableComponent();
        await asyncDetectChanges();

        // Verify the correct number of rows and columns were generated
        expect(page.table.tableBodyRows.length).toEqual(5);
        expect(page.table.tableHeadColumns.length).toEqual(4);

        // Verify none of the inputs are checked
        for (let i = 0; i < 2; i++) {
          const selectionInput: HTMLInputElement = page.table.getTableBodySelectionInputAtRowIndex(i);
          expect(selectionInput).toBeTruthy();
          expect(selectionInput.checked).toBeFalsy();
        }

        const selectionInputIndex1: HTMLInputElement = page.table.getTableBodySelectionInputAtRowIndex(1);
        const selectionInputIndex2: HTMLInputElement = page.table.getTableBodySelectionInputAtRowIndex(2);

        // Click the selection input at index 1, verify it is checked
        selectionInputIndex1.click();
        fixture.detectChanges();
        expect(selectionInputIndex1.checked).toBeTruthy();
        expect(selectionInputIndex2.checked).toBeFalsy();

        // Click the selection input at index 2, verify it is checked
        selectionInputIndex2.click();
        fixture.detectChanges();
        expect(selectionInputIndex1.checked).toBeFalsy();
        expect(selectionInputIndex2.checked).toBeTruthy();

        // Click the selection input at index 2, verify it is unchecked
        selectionInputIndex2.click();
        fixture.detectChanges();
        expect(selectionInputIndex1.checked).toBeFalsy();
        expect(selectionInputIndex2.checked).toBeFalsy();
      });
    });
  });

  describe('table filtering', () => {
    let quickFilters: TableFilterConfig[];

    beforeEach(() => {
      quickFilters = [
        {
          label: 'ID: greather than 4',
          field: 'id',
          comparatorName: TableFilterNumberInputComparator.GREATER_THAN,
          filterName: 'ID',
          filter: TableFilterNumberComponent,
          formValues: {
            number: 4,
          },
        },
      ];

      generateData(10);
      generateColumns(2);
      component.data = data;
      component.columns = columns;
      component.state = State.LOADED;
      component.type = TableType.ADVANCED;

      reloadTableComponent();
    });

    it('should NOT display the filtering control button if it is not enabled', () => {
      component.includeTableFilters = false;
      reloadTableComponent();

      expect(page.table.filterSelectorMenu).toBeFalsy();
    });

    it('should display the filtering control button if filtering is enabled', () => {
      component.includeTableFilters = true;
      reloadTableComponent();

      expect(page.table.filterSelectorMenu.menuButton).toBeTruthy();
      page.table.filterSelectorMenu.menuButton.click();
      fixture.detectChanges();
      expect(page.table.filterSelectorMenu.menu).toBeTruthy();
    });

    it('should display quick filters if provided', () => {
      component.includeTableFilters = true;
      component.quickFilters = quickFilters;
      reloadTableComponent();

      expect(page.table.quickFilters.length).toEqual(1);
    });

    it('should toggle the quick filter when it is clicked', async () => {
      component.includeTableFilters = true;
      component.quickFilters = quickFilters;
      reloadTableComponent();
      await asyncDetectChanges();

      expect(page.table.tableBodyRows.length).toEqual(10);
      expect(page.table.quickFilters.item(0).classList).not.toContain('f-button--selected');

      page.table.quickFilters.item(0).click();
      await asyncDetectChanges();
      expect(page.table.quickFilters.item(0).classList).toContain('f-button--selected');
      expect(page.table.tableBodyRows.length).toEqual(5);

      page.table.quickFilters.item(0).click();
      await asyncDetectChanges();
      expect(page.table.quickFilters.item(0).classList).not.toContain('f-button--selected');
      expect(page.table.tableBodyRows.length).toEqual(10);
    });
  });

  /**
   * Helper function to generate some mock data to populate the table.
   *
   * @param numOfRows the number or data points (rows) to generate
   * @param numOfFields the number of fields to generate (data fields per row)
   */
  function generateData(numOfRows: number, numOfFields: number = 2): void {
    data = [];

    for (let i = 0; i < numOfRows; i++) {
      const d: Record<string, string> = {};

      for (let j = 0; j < numOfFields; j++) {
        d[`data${j}`] = `data${i}`;
      }

      data.push({ id: i,  ...d });
    }
  }

  /**
   * Helper function to generate the columns. Always includes and id column + number of generated columns.
   *
   * @param numOfColumns the number or data points (rows) to generate
   */
  function generateColumns(numOfColumns: number = 2): void {
    columns = [{ header: 'id', field: 'id', isVisible: true, isHidable: true }];

    for (let i = 0; i < numOfColumns; i++) {
      columns.push({
        header: `Column Title ${i}`,
        field: `data${i}`,
        isVisible: true,
        isHidable: true,
      });
    }
  }

  /**
   * Helper function to reload the table component by removing it and re-adding it to the DOM.
   */
  function reloadTableComponent(): void {
    component.loaded = false;
    fixture.detectChanges();
    component.loaded = true;
    fixture.detectChanges();
  }

  async function asyncDetectChanges(): Promise<any> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }
});
