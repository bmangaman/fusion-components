import { ChangeDetectorRef, ElementRef, QueryList, Renderer2, SimpleChange, TemplateRef } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { cloneDeep } from 'lodash-es';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { MockElementRef } from '@fusion-components/unit-test-helpers/mock-utils.spec';
import { TemplateDirective } from '../../directives/template';
import { FusionComponentsTranslationService } from '../../services/translation';
import { State } from '../../shared';
import { TableColumnComponent } from './table-column';
import { TableFilterConfig } from './table-filter-selector';
import { TableFilterComponent } from './table-filters';
import { RemoveTableRowFormattingPipe } from './table-pipes';
import { TableComponent } from './table.component';
import {
  RowExpansionMode,
  SelectionMode,
  TableColumnConfig,
  TableColumnSorted,
  TableRowData,
  TableSpacing,
  TableType,
  TableView,
  ViewChangeOrDefaultCols,
} from './table.interface';

describe('TableComponent', () => {
  const removeTableRowFormattingPipe: RemoveTableRowFormattingPipe = new RemoveTableRowFormattingPipe();
  let component: TableComponent;
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let translationService: FusionComponentsTranslationService;
  let translateService: TranslateService;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    elementRef = new MockElementRef;
    renderer = ComponentStubFactory.getRenderer2Stub() as Renderer2;
    translationService = new FusionComponentsTranslationService();
    translateService = ComponentStubFactory.getTranslateServiceStub();
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    component = new TableComponent(elementRef, renderer, translationService, changeDetectorRef);
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  describe('Getters and Setters', () => {
    describe('visibleColumns', () => {
      let colA: TableColumnComponent;
      let colB: TableColumnComponent;
      let colC: TableColumnComponent;

      let filterA: TableFilterComponent;
      let filterC: TableFilterComponent;

      beforeEach(() => {
        colA = new TableColumnComponent(changeDetectorRef);
        colA.field = 'a';
        colB = new TableColumnComponent(changeDetectorRef);
        colB.field = 'b';
        colC = new TableColumnComponent(changeDetectorRef);
        colC.field = 'c';

        filterA = new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService);
        filterA.field = 'a';
        filterC = new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService);
        filterC.field = 'c';
      });

      it('should set the previous and current visible columns', fakeAsync(() => {
        /* eslint-disable @typescript-eslint/dot-notation */

        expect(component.visibleColumns).toEqual([]);
        expect(component['_prevVisibleColumns']).toEqual(undefined);

        component.visibleColumns = [colA, colB];
        tick();
        expect(component.visibleColumns).toEqual([colA, colB]);
        expect(component['_prevVisibleColumns']).toEqual([]);

        component.visibleColumns = [colA, colB, colC];
        tick();
        expect(component.visibleColumns).toEqual([colA, colB, colC]);
        expect(component['_prevVisibleColumns']).toEqual([colA, colB]);

        discardPeriodicTasks();

        /* eslint-enable @typescript-eslint/dot-notation */
      }));

      it('should update filter visibility', fakeAsync(() => {
        component.filters = new QueryList<TableFilterComponent>();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        component.filters['_results'] = [filterA, filterC];
        component.visibleColumns = [colA, colB];

        tick();

        const filters: TableFilterComponent[] = component.filters.toArray();

        expect(filters[0].isVisibleInSelector).toBeTrue();
        expect(filters[1].isVisibleInSelector).toBeFalse();

        discardPeriodicTasks();
      }));
    });

    describe('appliedTableView', () => {
      it('should set the view and emit the selected view', () => {
        spyOn(component.viewChange, 'emit').and.stub();
        component.appliedTableView = {} as TableView;
        expect(component.appliedTableView).toEqual({} as TableView);
        expect(component.viewChange.emit).toHaveBeenCalledWith({} as TableView);
      });
    });
  });

  describe('@Input()', () => {
    describe('data', () => {
      beforeEach(() => {
        spyOn(component.tableData$, 'next').and.stub();
      });

      it('should set the data and call tableData$.next', () => {
        /* eslint-disable @typescript-eslint/dot-notation */
        component.data = [{ data: 'data' }];
        expect(component['_data'].length).toEqual(1);
        expect(component['_data'][0].data).toEqual('data');
        expect(component.data[0].data).toEqual('data');
        expect(component.tableData$.next).toHaveBeenCalled();
        /* eslint-enable @typescript-eslint/dot-notation */
      });

      it('should generate and append a uuid if one does not already exist', () => {
        component.data = [{ data: 'data' }];
        expect(component.data[0].tableRowUuid).toBeTruthy();

        component.data = [{ data: 'data', tableRowUuid: 'table-uuid' }];
        expect(component.data[0].tableRowUuid).toBeTruthy();
        expect(component.data[0].tableRowUuid).toEqual('table-uuid');
      });

      it('should use the existing uuid if one already exists for that data point', () => {
        const prevData: TableRowData[] = [
          { tableRowUuid: '0', id: 0, data: 'data1' },
          { tableRowUuid: '1', id: 1, data: 'data2' },
        ];
        const newData: TableRowData[] = [
          { id: 0, data: 'data1New' },
          { id: 1, data: 'data2New' },
        ];
        component.dataKey = 'id';
        component.data = prevData;
        expect(component.data[0].tableRowUuid).toEqual('0');
        expect(component.data[1].tableRowUuid).toEqual('1');
        component.finalTableData$.next(component.data);
        component.data = newData;
        expect(component.data[0].tableRowUuid).toEqual('0');
        expect(component.data[1].tableRowUuid).toEqual('1');
      });

      it('should use the provided isSelected flag if one already exists for that data point', () => {
        const prevData: TableRowData[] = [
          { isSelected: true, id: 0, data: 'data1' },
          { isSelected: false, id: 1, data: 'data2' },
        ];
        const newData: TableRowData[] = [
          { id: 0, data: 'data1New' },
          { id: 1, data: 'data2New' },
          { id: 2, data: 'data3New' },
        ];
        component.dataKey = 'id';
        component.data = prevData;
        expect(component.data[0].isSelected).toEqual(true);
        expect(component.data[1].isSelected).toEqual(false);
        component.finalTableData$.next(component.data);
        component.data = newData;
        expect(component.data[0].isSelected).toEqual(true);
        expect(component.data[1].isSelected).toEqual(false);
        expect(component.data[2].isSelected).toEqual(undefined);
      });

      it('should use the existing isExpanded flag if one already exists for that data point', () => {
        const prevData: TableRowData[] = [
          { isExpanded: true, id: 0, data: 'data1' },
          { isExpanded: false, id: 1, data: 'data2' },
        ];
        const newData: TableRowData[] = [
          { id: 0, data: 'data1New' },
          { id: 1, data: 'data2New' },
        ];
        component.dataKey = 'id';
        component.data = prevData;
        expect(component.data[0].isExpanded).toEqual(true);
        expect(component.data[1].isExpanded).toEqual(false);
        component.finalTableData$.next(component.data);
        component.data = newData;
        expect(component.data[0].isExpanded).toEqual(true);
        expect(component.data[1].isExpanded).toEqual(false);
      });

      it('should set sameData to null if there was no previous data', () => {
        const newData: TableRowData[] = [
          { id: 0, data: 'data1New' },
          { id: 1, data: 'data2New' },
        ];
        component.dataKey = 'id';
        component.data = null;
        component.finalTableData$.next(component.data);
        component.data = newData;
        expect(component.data[0].isSelected).toBeUndefined();
        expect(component.data[1].isSelected).toBeUndefined();
      });

      it('should either use the existing isVisible attribute or set it to true', () => {
        component.data = [{ data: 'data' }];
        expect(component.data[0].isVisible).toBeTrue();

        component.data = [{ data: 'data', isVisible: false }];
        expect(component.data[0].isVisible).toBeFalse();
      });

      it('should use the disableRowActionsButtonFunction to set isActionable', () => {
        spyOn(component, 'isTableDataActionEnabled').and.callThrough();

        component.disableRowActionsButtonFunction = () => false;
        component.data = [{ data: 'data1' }, { data: 'data2' }];
        expect(component.isTableDataActionEnabled).toHaveBeenCalledTimes(2);
        expect(component.data[0].isActionable).toBeTrue();
        expect(component.data[1].isActionable).toBeTrue();
      });

      it('should use the disableRowSelectionFunction to set isSelectable', () => {
        spyOn(component, 'isTableDataSelectable').and.callThrough();

        component.disableRowSelectionFunction = () => false;
        component.data = [{ data: 'data1' }, { data: 'data2' }];
        expect(component.isTableDataSelectable).toHaveBeenCalledTimes(2);
        expect(component.data[0].isSelectable).toBeTrue();
        expect(component.data[1].isSelectable).toBeTrue();
      });

      it('should use the disableRowExpansionFunction to set isExpandable', () => {
        spyOn(component, 'isTableDataExpandable').and.callThrough();

        component.disableRowExpansionFunction = () => false;
        component.data = [{ data: 'data1' }, { data: 'data2' }];
        expect(component.isTableDataExpandable).toHaveBeenCalledTimes(2);
        expect(component.data[0].isExpandable).toBeTrue();
        expect(component.data[1].isExpandable).toBeTrue();
      });
    });

    describe('tableViews', () => {
      it('should set the view and the selected view, if it exists', () => {
        const views: TableView[] = [
          { isSelected: false } as TableView,
          { isSelected: false } as TableView,
        ];
        component.tableViews = views;
        expect(component.tableViews).toEqual(views);
        expect(component.appliedTableView).toBeFalsy();

        views[1].isSelected = true;
        component.tableViews = views;
        expect(component.tableViews).toEqual(views);
        expect(component.appliedTableView).toEqual(views[1]);
      });
    });

    describe('defaultColumns', () => {
      it('should set the default columns and call updateColumns()', () => {
        spyOn(component, 'updateColumns').and.stub();

        component.defaultColumns = [{} as TableColumnConfig];
        expect(component.defaultColumns).toEqual([{} as TableColumnConfig]);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_defaultColumns']).toEqual([{} as TableColumnConfig]);
        expect(component.updateColumns).toHaveBeenCalledWith(undefined, ViewChangeOrDefaultCols.DEFAULT_COLS);
      });
    });

    describe('appliedFilters', () => {
      it('should set the applied filters', () => {
        component.appliedFilters = [{} as TableFilterConfig];
        expect(component.appliedFilters).toEqual([{} as TableFilterConfig]);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_appliedFilters']).toEqual([{} as TableFilterConfig]);
      });
    });

    describe('disableRowSelectionFunction', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      it('should only update the isSelectable flag if there is data', () => {
        spyOn(component, 'isTableDataSelectable').and.callThrough();

        component['_data'] = null;
        component.disableRowSelectionFunction = () => false;
        expect(component.isTableDataSelectable).not.toHaveBeenCalled();

        component['_data'] = [];
        component.disableRowSelectionFunction = () => false;
        expect(component.isTableDataSelectable).not.toHaveBeenCalled();

        component['_data'] = [{}, {}];
        component.disableRowSelectionFunction = () => false;
        expect(component.isTableDataSelectable).toHaveBeenCalled();
        expect(component.data[0].isSelectable).toBeTrue();
        expect(component.data[1].isSelectable).toBeTrue();
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });

    describe('disableRowExpansionFunction', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      it('should only update the isExpandable flag if there is data', () => {
        spyOn(component, 'isTableDataExpandable').and.callThrough();

        component['_data'] = null;
        component.disableRowExpansionFunction = () => false;
        expect(component.isTableDataExpandable).not.toHaveBeenCalled();

        component['_data'] = [];
        component.disableRowExpansionFunction = () => false;
        expect(component.isTableDataExpandable).not.toHaveBeenCalled();

        component['_data'] = [{}, {}];
        component.disableRowExpansionFunction = () => false;
        expect(component.isTableDataExpandable).toHaveBeenCalled();
        expect(component.data[0].isExpandable).toBeTrue();
        expect(component.data[1].isExpandable).toBeTrue();
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });

    describe('disableRowActionsButtonFunction', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      it('should only update the isActionable flag if there is data', () => {
        spyOn(component, 'isTableDataActionEnabled').and.callThrough();

        component['_data'] = null;
        component.disableRowActionsButtonFunction = () => false;
        expect(component.isTableDataActionEnabled).not.toHaveBeenCalled();

        component['_data'] = [];
        component.disableRowActionsButtonFunction = () => false;
        expect(component.isTableDataActionEnabled).not.toHaveBeenCalled();

        component['_data'] = [{}, {}];
        component.disableRowActionsButtonFunction = () => false;
        expect(component.isTableDataActionEnabled).toHaveBeenCalled();
        expect(component.data[0].isActionable).toBeTrue();
        expect(component.data[1].isActionable).toBeTrue();
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });

    describe('tableUuid', () => {
      it('should generate and set a uuid by default', () => {
        expect(component.tableUuid).toBeTruthy();
      });

      it('should not allow the uuid to be set to a null/ empty value', () => {
        component.tableUuid = null;
        expect(component.tableUuid).toBeTruthy();
        component.tableUuid = '';
        expect(component.tableUuid).toBeTruthy();
      });

      it('should set the uuid', () => {
        component.tableUuid = 'uuid';
        expect(component.tableUuid).toEqual('uuid');
      });
    });

    describe('appliedTableViewName', () => {
      it('should set the applied table view name', () => {
        const tableView: TableView = { name: 'view', isSelected: true } as TableView;
        const nameTableView: TableView = { name: 'name' } as TableView;

        component.appliedTableViewName = 'n/a';
        expect(component.appliedTableViewName).toEqual('n/a');
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_appliedTableViewName']).toEqual('n/a');
        expect(component.appliedTableView).toEqual(undefined);

        component.tableViews = [tableView, nameTableView];
        component.appliedTableViewName = 'n/a';
        expect(component.appliedTableViewName).toEqual('n/a');
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_appliedTableViewName']).toEqual('n/a');
        expect(component.appliedTableView).toEqual(tableView);

        component.appliedTableViewName = 'name';
        expect(component.appliedTableViewName).toEqual('name');
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_appliedTableViewName']).toEqual('name');
        expect(component.appliedTableView).toEqual(nameTableView);
      });
    });
  });

  describe('@ContentChildren', () => {
    describe('columns', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      const columns: QueryList<TableColumnComponent> = new QueryList<TableColumnComponent>();

      beforeEach(() => {
        spyOn(component, 'updateColumns').and.stub();

        const columnA: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
        columnA.field = 'fieldA';
        columnA.isVisible = true;
        columnA.isHidable = true;

        const columnB: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
        columnB.field = 'fieldB';
        columnB.isVisible = false;
        columnB.isHidable = false;

        columns['_results'] = [cloneDeep(columnA), cloneDeep(columnB)];
      });

      it('should call updateColumns()', () => {
        component.columns = columns;
        expect(component.updateColumns).toHaveBeenCalledWith(columns);
      });

      it('should not call updateColumns() if the previous columns are equal to the new columns', () => {
        component['_columns'] = columns;
        component.columns = columns;
        expect(component.updateColumns).not.toHaveBeenCalled();
      });

      it('should not call updateColumns() if columns are not defined', () => {
        component['_columns'] = undefined;
        component.columns = undefined;
        expect(component.updateColumns).not.toHaveBeenCalled();
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });

    describe('filters', () => {
      it('should set and get the values correctly and set the enabled functionality flag', () => {
        /* eslint-disable @typescript-eslint/dot-notation */

        let filters: QueryList<TableFilterComponent>;

        filters = null;
        component.filters = filters;
        expect(component['_filters']).toEqual(filters);
        expect(component.filters).toEqual(filters);
        expect(component.enabledFunctionality.filtering).toBeFalse();

        filters = new QueryList<TableFilterComponent>();
        component.filters = filters;
        expect(component['_filters']).toEqual(filters);
        expect(component.filters).toEqual(filters);
        expect(component.enabledFunctionality.filtering).toBeFalse();

        filters = new QueryList<TableFilterComponent>();
        filters['_results'] = [
          new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService),
          new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService),
        ];
        component.filters = filters;
        expect(component['_filters']).toEqual(filters);
        expect(component.filters).toEqual(filters);
        expect(component.enabledFunctionality.filtering).toBeTrue();

        component.type = TableType.BASIC;
        filters = new QueryList<TableFilterComponent>();
        filters['_results'] = [
          new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService),
          new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService),
        ];
        component.filters = filters;
        expect(component['_filters']).toEqual(filters);
        expect(component.filters).toEqual(filters);
        expect(component.enabledFunctionality.filtering).toBeFalse();

        /* eslint-enable @typescript-eslint/dot-notation */
      });
    });
  });

  describe('ngOnInit()', () => {
    let finalTableDataSpy: jasmine.Spy;
    let selectedTableDataSpy: jasmine.Spy;
    let paginatedTableDataSpy: jasmine.Spy;
    let filteredTableDataSpy: jasmine.Spy;

    beforeEach(() => {
      finalTableDataSpy = spyOn(component.finalTableData$, 'next').and.callThrough();
      selectedTableDataSpy = spyOn(component.selectedTableData$, 'next').and.callThrough();
      paginatedTableDataSpy = spyOn(component.paginatedTableData$, 'next').and.callThrough();
      spyOn(component.sortedTableData$, 'next').and.callThrough();
      filteredTableDataSpy = spyOn(component.filteredTableData$, 'next').and.callThrough();
    });

    it('should create a subscription to the sortedTableData$ behavior subject', () => {
      spyOn(component.sortedTableData$, 'subscribe').and.callThrough();
      component.ngOnInit();
      // eslint-disable-next-line import/no-deprecated
      expect(component.sortedTableData$.subscribe).toHaveBeenCalled();

      selectedTableDataSpy.and.stub();
      component.sortedTableData$.next([{ data: 'data' }]);
      expect(component.selectedTableData$.next).toHaveBeenCalledWith([{ data: 'data' }]);
    });

    it('should create a subscription to the filteredTableData$ behavior subject', () => {
      spyOn(component.filteredTableData$, 'subscribe').and.callThrough();
      paginatedTableDataSpy.and.stub();

      component.ngOnInit();
      // eslint-disable-next-line import/no-deprecated
      expect(component.filteredTableData$.subscribe).toHaveBeenCalled();

      finalTableDataSpy.calls.reset();

      component.enabledFunctionality.pagination = true;
      component.filteredTableData$.next([{ data: 'data' }]);
      expect(component.paginatedTableData$.next).not.toHaveBeenCalled(); // updated in template, not with .next
      expect(component.finalTableData$.next).not.toHaveBeenCalled();

      paginatedTableDataSpy.calls.reset();
      finalTableDataSpy.calls.reset();

      component.enabledFunctionality.pagination = false;
      component.filteredTableData$.next([{ data: 'data' }]);
      expect(component.paginatedTableData$.next).not.toHaveBeenCalled();
      expect(component.finalTableData$.next).toHaveBeenCalledWith([{ data: 'data' }]);
    });

    it('should create a subscription to the selectedTableDataSub$ behavior subject', () => {
      spyOn(component.selectedTableData$, 'subscribe').and.callThrough();
      filteredTableDataSpy.and.stub();

      component.ngOnInit();
      // eslint-disable-next-line import/no-deprecated
      expect(component.selectedTableData$.subscribe).toHaveBeenCalled();

      filteredTableDataSpy.calls.reset();

      component.selectedTableData$.next([{ data: 'data' }]);
      expect(component.filteredTableData$.next).toHaveBeenCalled();
    });

    it('should create a subscription to the paginatedTableData$ behavior subject', () => {
      spyOn(component.sortedTableData$, 'subscribe').and.stub();
      spyOn(component.selectedTableData$, 'subscribe').and.stub();
      spyOn(component.paginatedTableData$, 'subscribe').and.callThrough();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.paginatedTableData$['_value'] = [{ data: 'data' }];

      component.enabledFunctionality.pagination = true;
      component.ngOnInit();
      // eslint-disable-next-line import/no-deprecated
      expect(component.paginatedTableData$.subscribe).toHaveBeenCalled();
      expect(component.finalTableData$.next).toHaveBeenCalledWith([{ data: 'data' }]);

      finalTableDataSpy.calls.reset();

      component.enabledFunctionality.pagination = false;
      component.ngOnInit();
      // eslint-disable-next-line import/no-deprecated
      expect(component.paginatedTableData$.subscribe).toHaveBeenCalled();
      expect(component.finalTableData$.next).not.toHaveBeenCalledWith([{ data: 'data' }]);
    });

    it('should create a subscription to the finalTableData$ behavior subject', () => {
      spyOn(component.finalTableData$, 'subscribe').and.callThrough();
      component.ngOnInit();
      // eslint-disable-next-line import/no-deprecated
      expect(component.finalTableData$.subscribe).toHaveBeenCalled();

      component.finalTableData$.next([{ data: 'data' }]);
      expect(component.flags.noResults).toBeTrue();

      component.finalTableData$.next([{ data: 'data', isVisible: true }]);
      expect(component.flags.noResults).toBeFalse();
    });

    it('should create a subscription to the viewChange', () => {
      spyOn(component.viewChange, 'subscribe').and.callThrough();
      spyOn(component, 'deselectAll').and.stub();
      component.ngOnInit();
      expect(component.viewChange.subscribe).toHaveBeenCalled();
      component.viewChange.emit();
      expect(component.deselectAll).toHaveBeenCalled();
    });
  });

  describe('ngAfterContentInit()', () => {
    beforeEach(() => {
      component.templates = new QueryList<TemplateDirective>();
    });

    it('should loop through the template and set the tableHeader templateRef if found', () => {
      component.enabledFunctionality.header = false;

      component.ngAfterContentInit();
      expect(component.tableHeader).toBeFalsy();
      expect(component.enabledFunctionality.header).toBeFalse();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.tableHeader).toBeFalsy();
      expect(component.enabledFunctionality.header).toBeFalse();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'tableHeader', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.tableHeader).toBeTruthy();
      expect(component.enabledFunctionality.header).toBeTrue();
    });

    it('should loop through the template and set the leftControls templateRef if found', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.leftControls).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'leftControls', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.leftControls).toBeTruthy();
    });

    it('should loop through the template and set the rightControls templateRef if found', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.rightControls).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'rightControls', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.rightControls).toBeTruthy();
    });

    it('should loop through the template and set the rowExpansion templateRef if found', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.rowExpansion).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'rowExpansion', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.rowExpansion).toBeTruthy();
    });

    it('should loop through the template and set the rowActions templateRef if found', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.rowActions).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'rowActions', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.rowActions).toBeTruthy();
    });

    it('should loop through the template and set the selectionColumn templateRef if found', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.selectionColumn).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'selectionColumn', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.selectionColumn).toBeTruthy();
    });
  });

  describe('ngOnChanges()', () => {
    it('should determine whether or not controls and pagination are enabled based on the table type', () => {
      spyOn(component, 'updateSortingOnDataChange').and.stub();

      component.type = TableType.ADVANCED;
      component.ngOnChanges({
        type: new SimpleChange(null, component.type, false),
      });
      expect(component.enabledFunctionality.controls).toBeTrue();
      expect(component.enabledFunctionality.pagination).toBeTrue();

      component.type = TableType.BASIC;
      component.ngOnChanges({
        type: new SimpleChange(null, component.type, false),
      });
      expect(component.enabledFunctionality.controls).toBeFalse();
      expect(component.enabledFunctionality.pagination).toBeFalse();

      expect(component.updateSortingOnDataChange).toHaveBeenCalled();
    });

    it('should determine whether or not filtering is enabled based on the table type and existence of filters', () => {
      let filters: QueryList<TableFilterComponent>;

      filters = null;
      component.filters = filters;
      component.type = TableType.BASIC;
      component.ngOnChanges({
        type: new SimpleChange(null, component.type, false),
      });
      expect(component.enabledFunctionality.filtering).toBeFalse();

      filters = null;
      component.filters = filters;
      component.type = TableType.ADVANCED;
      component.ngOnChanges({
        type: new SimpleChange(null, component.type, false),
      });
      expect(component.enabledFunctionality.filtering).toBeFalse();

      filters = new QueryList<TableFilterComponent>();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      filters['_results'] = [new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService)];
      component.filters = filters;
      component.type = TableType.BASIC;
      component.ngOnChanges({
        type: new SimpleChange(null, component.type, false),
      });
      expect(component.enabledFunctionality.filtering).toBeFalse();

      filters = new QueryList<TableFilterComponent>();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      filters['_results'] = [new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService)];
      component.filters = filters;
      component.type = TableType.ADVANCED;
      component.ngOnChanges({
        type: new SimpleChange(null, component.type, false),
      });
      expect(component.enabledFunctionality.filtering).toBeTrue();
    });

    it('should determine whether or not the table header is enabled based tableTitle and tableHeader', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component['_tableHeader'] = undefined;
      component.tableTitle = undefined;
      component.ngOnChanges({
        tableTitle: new SimpleChange(null, component.tableTitle, false),
      });
      expect(component.enabledFunctionality.header).toBeFalse();

      component['_tableHeader'] = undefined;
      component.tableTitle = '';
      component.ngOnChanges({
        tableTitle: new SimpleChange(null, component.tableTitle, false),
      });
      expect(component.enabledFunctionality.header).toBeFalse();

      component['_tableHeader'] = undefined;
      component.tableTitle = 'Table Title';
      component.ngOnChanges({
        tableTitle: new SimpleChange(null, component.tableTitle, false),
      });
      expect(component.enabledFunctionality.header).toBeTrue();

      component['_tableHeader'] = {} as TemplateRef<any>;
      component.tableTitle = 'Table Title';
      component.ngOnChanges({
        tableTitle: new SimpleChange(null, component.tableTitle, false),
      });
      expect(component.enabledFunctionality.header).toBeTruthy();

      component['_tableHeader'] = {} as TemplateRef<any>;
      component.tableTitle = undefined;
      component.ngOnChanges({
        tableTitle: new SimpleChange(null, component.tableTitle, false),
      });
      expect(component.enabledFunctionality.header).toBeTruthy();

      /* eslint-enable @typescript-eslint/dot-notation */
    });

    it('should determine whether or not rowSelection is enabled based on the selectionMnode', () => {
      component.selectionMode = null;
      component.ngOnChanges({
        selectionMode: new SimpleChange(null, component.selectionMode, false),
      });
      expect(component.enabledFunctionality.rowSelection).toBeFalse();

      component.selectionMode = SelectionMode.MULTIPLE;
      component.ngOnChanges({
        selectionMode: new SimpleChange(null, component.selectionMode, false),
      });
      expect(component.enabledFunctionality.rowSelection).toBeTrue();

      component.selectionMode = SelectionMode.SINGLE;
      component.ngOnChanges({
        selectionMode: new SimpleChange(null, component.selectionMode, false),
      });
      expect(component.enabledFunctionality.rowSelection).toBeTrue();
    });

    it('should determine whether or rowExpansion is enabled based on the roxExpansionMode and provided template', () => {
      const mockTemplate: TemplateRef<any> = {} as TemplateRef<any>;

      component.rowExpansionMode = null;
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_rowExpansion'] = null;
      component.ngOnChanges({
        rowExpansionMode: new SimpleChange(null, component.rowExpansionMode, false),
      });
      expect(component.enabledFunctionality.rowExpansion).toBeFalse();

      component.rowExpansionMode = RowExpansionMode.SINGLE;
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_rowExpansion'] = null;
      component.ngOnChanges({
        rowExpansionMode: new SimpleChange(null, component.rowExpansionMode, false),
      });
      expect(component.enabledFunctionality.rowExpansion).toBeFalse();

      component.rowExpansionMode = null;
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_rowExpansion'] = mockTemplate;
      component.ngOnChanges({
        rowExpansionMode: new SimpleChange(null, component.rowExpansionMode, false),
      });
      expect(component.enabledFunctionality.rowExpansion).toBeFalse();

      component.rowExpansionMode = RowExpansionMode.SINGLE;
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_rowExpansion'] = mockTemplate;
      component.ngOnChanges({
        rowExpansionMode: new SimpleChange(null, component.rowExpansionMode, false),
      });
      expect(component.enabledFunctionality.rowExpansion).toBeTrue();
    });

    it('should call generateTableCssClasses() if fillContainer, spacing, state, and/ or type inputs are changed', () => {
      spyOn(component, 'generateTableCssClasses').and.stub();

      component.fillContainer = true;
      component.ngOnChanges({
        fillContainer: new SimpleChange(null, component.fillContainer, false),
      });
      expect(component.generateTableCssClasses).toHaveBeenCalled();

      component.spacing = TableSpacing.CONDENSED;
      component.ngOnChanges({
        spacing: new SimpleChange(null, component.spacing, false),
      });
      expect(component.generateTableCssClasses).toHaveBeenCalled();

      component.state = State.LOADED;
      component.ngOnChanges({
        state: new SimpleChange(null, component.state, false),
      });
      expect(component.generateTableCssClasses).toHaveBeenCalled();

      component.type = TableType.ADVANCED;
      component.ngOnChanges({
        type: new SimpleChange(null, component.type, false),
      });
      expect(component.generateTableCssClasses).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call unlistenToResizeIndicatorVisibleMouseMove', () => {
      spyOn(component, 'unlistenToResizeIndicatorVisibleMouseMove').and.stub();
      component.ngOnDestroy();
      expect(component.unlistenToResizeIndicatorVisibleMouseMove).toHaveBeenCalled();
    });
  });

  describe('generateTableCssClasses()', () => {
    const stylePrefix = 'f-table';
    let expectedResult: string[];

    beforeEach(() => {
      expectedResult = undefined;
      component.fillContainer = undefined;
      component.type = undefined;
      component.spacing = undefined;
      component.state = undefined;
    });

    it('should append the "f-table" class by default', () => {
      expectedResult = [stylePrefix];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);
    });

    it('should append the "f-table--filterContainer" class if the input is set to true', () => {
      component.fillContainer = false;
      expectedResult = [stylePrefix];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);

      component.fillContainer = true;
      expectedResult = [stylePrefix, `${stylePrefix}--fillContainer`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);
    });

    it('should append the correct type class based on the input', () => {
      component.type = TableType.ADVANCED;
      expectedResult = [stylePrefix, `${stylePrefix}--${TableType.ADVANCED}`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);

      component.type = TableType.BASIC;
      expectedResult = [stylePrefix, `${stylePrefix}--${TableType.BASIC}`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);
    });

    it('should append the correct spacing class based on the input', () => {
      component.spacing = TableSpacing.CONDENSED;
      expectedResult = [stylePrefix, `${stylePrefix}--spacing-${TableSpacing.CONDENSED}`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);

      component.spacing = TableSpacing.NORMAL;
      expectedResult = [stylePrefix, `${stylePrefix}--spacing-${TableSpacing.NORMAL}`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);

      component.spacing = TableSpacing.SPACIOUS;
      expectedResult = [stylePrefix, `${stylePrefix}--spacing-${TableSpacing.SPACIOUS}`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);
    });

    it('should append the correct state class based on the input', () => {
      component.state = State.LOADING;
      expectedResult = [stylePrefix, `${stylePrefix}--${State.LOADING}`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);

      component.state = State.LOADED;
      expectedResult = [stylePrefix, `${stylePrefix}--${State.LOADED}`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);

      component.state = State.ERROR;
      expectedResult = [stylePrefix, `${stylePrefix}--${State.ERROR}`];
      component.generateTableCssClasses();
      expect(component.tableCssClasses).toEqual(expectedResult);
    });
  });

  describe('colTrackByFn()', () => {
    it('should return the item.field if defined, the index otherwise', () => {
      expect(component.colTrackByFn(undefined, undefined)).toEqual(undefined);
      expect(component.colTrackByFn(1, undefined)).toEqual(1);

      const column: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      expect(component.colTrackByFn(1, column)).toEqual(1);

      column.field = 'column field';
      expect(component.colTrackByFn(1, column)).toEqual('column field');
    });
  });

  describe('rowTrackByFn()', () => {
    it('should return the item.tableRowUuid if defined, the index otherwise', () => {
      expect(component.rowTrackByFn(undefined, undefined)).toEqual(undefined);
      expect(component.rowTrackByFn(1, undefined)).toEqual(1);

      const data: TableRowData = {};
      expect(component.rowTrackByFn(1, data)).toEqual(1);

      data.tableRowUuid = 'table-uuid';
      expect(component.rowTrackByFn(1, data)).toEqual('table-uuid');
    });
  });

  describe('sortTableData()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    let config: TableColumnConfig;
    let data: TableRowData[];
    let visibleColumns: TableColumnComponent[];

    beforeEach(fakeAsync(() => {
      const column1: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      column1.field = 'column1Field';

      const column2: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      column2.field = 'column2Field';

      visibleColumns = [column1, column2];

      data = [
        { column1Field: 'a', column2Field: null },
        { column1Field: 'a', column2Field: 3 },
        { column1Field: 'b', column2Field: 2 },
        { column1Field: 'c', column2Field: 1 },
        { column1Field: 'c', column2Field: 1 },
      ];

      config = {
        field: 'column2Field',
      } as TableColumnConfig;

      component['_data'] = cloneDeep(data);
      component.visibleColumns = cloneDeep(visibleColumns);

      tick();
      discardPeriodicTasks();
    }));

    it('should emit an event if a sort config is provided and it is not the same as the previous config', () => {
      const sortChangeEmitSpy: jasmine.Spy = spyOn(component.sortChange, 'emit').and.stub();

      component.sortTableData();
      expect(component.sortChange.emit).not.toHaveBeenCalled();
      sortChangeEmitSpy.calls.reset();

      component.sortTableData(config);
      expect(component.sortChange.emit).toHaveBeenCalledWith(config);
      sortChangeEmitSpy.calls.reset();

      component.sortTableData(config);
      expect(component.sortChange.emit).not.toHaveBeenCalled();
      sortChangeEmitSpy.calls.reset();
    });

    it('should NOT sort the table data if no sortConfig was provided, if there are no visible columns, if there is no data', () => {
      // no data, no visible columns, no config
      component['_visibleColumns'] = null;
      component['_data'] = null;
      component.sortTableData(null, true);
      expect(component.data).toEqual(null);

      component['_prevSortTableColumnConfig'] = undefined;

      // no visible columns, no config
      component['_visibleColumns'] = null;
      component['_data'] = data;
      component.sortTableData(null, true);
      expect(component.data).toEqual(data);

      component['_prevSortTableColumnConfig'] = undefined;

      // no visible columns
      component['_visibleColumns'] = null;
      component['_data'] = data;
      component.sortTableData(config, true);
      expect(component.data).toEqual(data);

      component['_prevSortTableColumnConfig'] = undefined;

      // no visible columns (length)
      component['_visibleColumns'] = [];
      component['_data'] = data;
      component.sortTableData(config, true);
      expect(component.data).toEqual(data);

      component['_prevSortTableColumnConfig'] = undefined;

      // no config
      component['_visibleColumns'] = visibleColumns;
      component['_data'] = data;
      component.sortTableData(null, true);
      expect(component.data).toEqual(data);

      component['_prevSortTableColumnConfig'] = undefined;

      // no data
      component['_visibleColumns'] = visibleColumns;
      component['_data'] = null;
      component.sortTableData(config, true);
      expect(component.data).toEqual(null);

      component['_prevSortTableColumnConfig'] = undefined;

      // no data (length)
      component['_visibleColumns'] = visibleColumns;
      component['_data'] = [];
      component.sortTableData(config, true);
      expect(component.data).toEqual([]);
    });

    it('should sort the finalTableData if the no new data is being provided', () => {
      config.field = 'column2Field';

      config.sorted = TableColumnSorted.ASCENDING;
      component.finalTableData$['_value'] = undefined;
      component.sortTableData(config, false);
      expect(component.visibleColumns[0].sorted).toEqual(null);
      expect(component.visibleColumns[1].sorted).toEqual(TableColumnSorted.ASCENDING);

      config.sorted = TableColumnSorted.DESCENDING;
      component.finalTableData$['_value'] = [];
      component.sortTableData(config, false);
      expect(component.visibleColumns[0].sorted).toEqual(null);
      expect(component.visibleColumns[1].sorted).toEqual(TableColumnSorted.DESCENDING);

      config.sorted = TableColumnSorted.ASCENDING;
      component.finalTableData$['_value'] = cloneDeep(data);
      component.sortTableData(config, false);
      expect(component.visibleColumns[0].sorted).toEqual(null);
      expect(component.visibleColumns[1].sorted).toEqual(TableColumnSorted.ASCENDING);
    });

    it('should update the sort input for each visible column based on the provided sort config', () => {
      config.sorted = TableColumnSorted.ASCENDING;
      config.field = 'column2Field';

      component.sortTableData(config, true);
      expect(component.visibleColumns[0].sorted).toEqual(null);
      expect(component.visibleColumns[1].sorted).toEqual(TableColumnSorted.ASCENDING);
    });

    it('should sort by the custom sort function if provided', () => {
      config.sortFunction = () => 1;
      spyOn(config, 'sortFunction').and.callThrough();
      component.sortTableData(config, true);
      expect(config.sortFunction).toHaveBeenCalled();
    });

    it('should do a standard sort based if not custom sort function was provided', () => {
      let expectedTableData: TableRowData[] = [
        { column1Field: 'c', column2Field: 1 },
        { column1Field: 'c', column2Field: 1 },
        { column1Field: 'b', column2Field: 2 },
        { column1Field: 'a', column2Field: 3 },
        { column1Field: 'a', column2Field: null },
      ];

      config.sorted = TableColumnSorted.ASCENDING;
      config.field = 'column2Field';
      component.sortTableData(config, true);
      expect(removeTableRowFormattingPipe.transform(component.sortedTableData$.value)).toEqual(expectedTableData);

      config.sorted = TableColumnSorted.DESCENDING;
      config.field = 'column2Field';
      component.sortTableData(config, true);
      expect(removeTableRowFormattingPipe.transform(component.sortedTableData$.value)).toEqual(data);

      expectedTableData = [
        { column1Field: 'c', column2Field: 1 },
        { column1Field: 'c', column2Field: 1 },
        { column1Field: 'b', column2Field: 2 },
        { column1Field: 'a', column2Field: null },
        { column1Field: 'a', column2Field: 3 },
      ];

      config.sorted = TableColumnSorted.ASCENDING;
      config.field = 'column1Field';
      component.sortTableData(config, true);
      expect(removeTableRowFormattingPipe.transform(component.sortedTableData$.value)).toEqual(data);

      config.sorted = TableColumnSorted.DESCENDING;
      config.field = 'column1Field';
      component.sortTableData(config, true);
      expect(removeTableRowFormattingPipe.transform(component.sortedTableData$.value)).toEqual(expectedTableData);
    });

    it('should properly sort with nested field values', () => {
      const dataWithNestedValues = [
        { column1Field: 'c', column2Field: { num: 1 } },
        { column1Field: 'c', column2Field: { num: 1 } },
        { column1Field: 'b', column2Field: { num: 2 } },
        { column1Field: 'a', column2Field: { num: 3 } },
      ];
      component['_data'] = dataWithNestedValues;

      config.sorted = TableColumnSorted.ASCENDING;
      config.field = 'column2Field.num';

      component.sortTableData(config, true);

      expect(component.sortedTableData$.value).toEqual(dataWithNestedValues);

      config.sorted = TableColumnSorted.DESCENDING;
      component.sortTableData(config, true);

      expect(component.sortedTableData$.value).toEqual(dataWithNestedValues.reverse());
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('paginateTableData()', () => {
    it('should update the areAllVisibleRowsExpanded flag and the paginatedTableData', () => {
      spyOn(component.paginatedTableData$, 'next').and.stub();
      const data: TableRowData[] = [{ data: 'data' }];
      component.paginateTableData(data);
      expect(component.flags.areAllVisibleRowsExpanded).toBeFalse();
      expect(component.paginatedTableData$.next).toHaveBeenCalledWith(data);
    });
  });

  describe('updateSortingOnDataChange()', () => {
    let visibleColumns: TableColumnComponent[];

    beforeEach(fakeAsync(() => {
      spyOn(component, 'sortTableData').and.stub();

      const column1: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      column1.field = 'column1Field';
      spyOnProperty(column1, 'config').and.returnValue({});

      const column2: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      column2.field = 'column2Field';
      spyOnProperty(column2, 'config').and.returnValue({});

      visibleColumns = [column1, column2];

      component.visibleColumns = cloneDeep(visibleColumns);

      tick();
      discardPeriodicTasks();
    }));

    it('should do nothing if there are no visible columns', fakeAsync(() => {
      component.visibleColumns = null;
      tick();
      component.updateSortingOnDataChange();
      expect(component.sortTableData).toHaveBeenCalledWith(null, undefined);

      component.visibleColumns = [];
      tick();
      component.updateSortingOnDataChange();
      expect(component.sortTableData).toHaveBeenCalledWith(null, undefined);

      discardPeriodicTasks();
    }));

    it('should sort the columns by the already-sorted column, if it exists', () => {
      component.visibleColumns[0].sorted = TableColumnSorted.ASCENDING;
      component.updateSortingOnDataChange();
      expect(component.sortTableData).toHaveBeenCalledWith(component.visibleColumns[0].config, undefined);
    });

    it('should sort by the default column, if the table is not already sorted', () => {
      component.visibleColumns[0].defaultSort = undefined;
      component.visibleColumns[0].sorted = null;
      component.visibleColumns[1].defaultSort = TableColumnSorted.ASCENDING;
      component.visibleColumns[1].sorted = null;
      component.updateSortingOnDataChange();
      expect(component.sortTableData).toHaveBeenCalledWith(component.visibleColumns[1].config, undefined);
      expect(component.visibleColumns[0].sorted).toEqual(null);
      expect(component.visibleColumns[1].sorted).toEqual(TableColumnSorted.ASCENDING);
    });

    it('should sort by the FIRST default column, if the table is not already sorted', () => {
      component.visibleColumns[0].defaultSort = TableColumnSorted.ASCENDING;
      component.visibleColumns[0].sorted = null;
      component.visibleColumns[1].defaultSort = TableColumnSorted.ASCENDING;
      component.visibleColumns[1].sorted = null;
      component.updateSortingOnDataChange();
      expect(component.sortTableData).toHaveBeenCalledWith(component.visibleColumns[0].config, undefined);
      expect(component.visibleColumns[0].sorted).toEqual(TableColumnSorted.ASCENDING);
      expect(component.visibleColumns[1].sorted).toEqual(null);
    });

    it('should sort by the first column, if there are is not a default column nor if the table was not already sorted', () => {
      component.visibleColumns[0].defaultSort = undefined;
      component.visibleColumns[0].sorted = null;
      component.visibleColumns[1].defaultSort = undefined;
      component.visibleColumns[1].sorted = null;
      component.updateSortingOnDataChange();
      expect(component.sortTableData).toHaveBeenCalledWith(component.visibleColumns[0].config, undefined);
    });
  });

  describe('filterTableData()', () => {
    let data: TableRowData[];

    beforeEach(() => {
      spyOn(component.filteredTableData$, 'next').and.stub();

      data = [ { data: 'data', isSelected: true, isSelectable: true } ];
    });

    it('should update filteredTableData', () => {
      component.filterTableData(undefined);
      expect(component.filteredTableData$.next).toHaveBeenCalledWith(undefined);

      component.filterTableData([]);
      expect(component.filteredTableData$.next).toHaveBeenCalledWith([]);

      component.filterTableData(data);
      expect(component.filteredTableData$.next).toHaveBeenCalledWith(data);
    });
  });

  describe('appliedFiltersChange()', () => {
    it('should call filterChange.emit and save the filters if the filters have changed', () => {
      spyOn(component.filterChange, 'emit').and.stub();
      const filters: TableFilterComponent[] = [new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService)];

      // New filters
      component.appliedFiltersChange(filters);
      expect(component.filterChange.emit).toHaveBeenCalledWith(filters.map((filter: TableFilterComponent) => filter.config));
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(component['_prevFilters']).toEqual(filters);
    });

    it('should update visible columns if the filters have changed', fakeAsync(() => {
      const column1: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      column1.field = 'field1';
      const column2: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      column2.field = 'field2';

      const filter1: TableFilterComponent = new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService);
      filter1.field = 'field1';

      // visibleColumns is undefined, do not update the isFiltered flag
      component.visibleColumns = undefined;
      tick();
      component.appliedFiltersChange([filter1]);
      expect(component.visibleColumns).toEqual(undefined);

      component.appliedFiltersChange([]); // reset

      // visibleColumns is empty, do not update the isFiltered flag
      component.visibleColumns = [];
      tick();
      component.appliedFiltersChange([filter1]);
      expect(component.visibleColumns).toEqual([]);

      component.visibleColumns = [column1, column2];
      tick();

      component.appliedFiltersChange([]); // reset

      // Should update the visible columns
      component.appliedFiltersChange([filter1]);
      expect(component.visibleColumns[0].isFiltered).toBeTrue();
      expect(component.visibleColumns[1].isFiltered).toBeFalsy();

      // Should do nothing since the filters did not change
      component.appliedFiltersChange([filter1]);
      expect(component.visibleColumns[0].isFiltered).toBeTrue();
      expect(component.visibleColumns[1].isFiltered).toBeFalsy();

      discardPeriodicTasks();
    }));
  });

  describe('updateSelectedData()', () => {
    let data: TableRowData[];
    let expectedNextResult: TableRowData[];
    let expectedEmitResult: any[];

    beforeEach(() => {
      component.type = TableType.BASIC;
      component.dataKey = 'id';
      component.ngOnInit();

      spyOn(component.selectedTableData$, 'next').and.callThrough();
      spyOn(component.finalTableData$, 'next').and.callThrough();
      spyOn(component.selectChange, 'emit').and.callThrough();

      data = [
        { id: 0, column1Field: 'a', column2Field: 3, isSelectable: true, isVisible: true, tableRowUuid: 'uuid0' },
        { id: 1, column1Field: 'b', column2Field: 2, isSelectable: false, isVisible: true, tableRowUuid: 'uuid1' },
        { id: 2, column1Field: 'c', column2Field: 1, isSelectable: true, isVisible: false, tableRowUuid: 'uuid2' },
        { id: 3, column1Field: 'c', column2Field: 1, isSelectable: true, isVisible: true, tableRowUuid: 'uuid3' },
      ];
    });

    it('should just use the selectedTableData with the finalTableData if undefined', () => {
      component.finalTableData$.next(undefined);
      component.updateSelectedData();
      expect(component.selectedTableData$.next).toHaveBeenCalledWith(undefined);
    });

    describe('selectionMode === MULTIPLE', () => {
      beforeEach(() => {
        component.selectionMode = SelectionMode.MULTIPLE;
      });

      it('should handle selecting and deselecting all visible and selectable rows at once', () => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        component.finalTableData$['_value'] = cloneDeep(data);

        // Select All
        component.updateSelectedData(null, true);
        expectedNextResult = cloneDeep(data);
        expectedNextResult[0].isSelected = true;
        expectedNextResult[3].isSelected = true;
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);

        expect(component.finalTableData$.next).toHaveBeenCalled();

        expectedEmitResult = [cloneDeep(data[0]), cloneDeep(data[3])];
        expectedEmitResult.forEach((d: any) => {
          delete d.tableRowUuid;
          delete d.isSelectable;
          delete d.isVisible;
        });

        expect(component.selectChange.emit).toHaveBeenCalledWith(expectedEmitResult);

        // Deselect All
        component.updateSelectedData(null, true);
        expectedNextResult[0].isSelected = false;
        expectedNextResult[3].isSelected = false;
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);

        expect(component.finalTableData$.next).toHaveBeenCalled();

        expect(component.selectChange.emit).toHaveBeenCalledWith([]);
      });

      it('should handle selecting and deselecting a single row', () => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        component.finalTableData$['_value'] = cloneDeep(data);

        // Select Single Row
        component.updateSelectedData(component.finalTableData$.value[0]);
        expectedNextResult = cloneDeep(data);
        expectedNextResult[0].isSelected = true;
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);

        expect(component.finalTableData$.next).toHaveBeenCalled();

        expectedEmitResult = [cloneDeep(data[0])];
        expectedEmitResult.forEach((d: any) => {
          delete d.tableRowUuid;
          delete d.isSelectable;
          delete d.isVisible;
        });

        expect(component.selectChange.emit).toHaveBeenCalledWith(expectedEmitResult);

        // Select Another Single Row
        component.updateSelectedData(component.finalTableData$.value[3]);
        expectedNextResult[3].isSelected = true;
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);

        expect(component.finalTableData$.next).toHaveBeenCalled();

        expectedEmitResult = [cloneDeep(data[0]), cloneDeep(data[3])];
        expectedEmitResult.forEach((d: any) => {
          delete d.tableRowUuid;
          delete d.isSelectable;
          delete d.isVisible;
        });

        expect(component.selectChange.emit).toHaveBeenCalledWith(expectedEmitResult);

        // Deselect Another Single Row
        component.updateSelectedData(component.finalTableData$.value[3]);
        expectedNextResult[3].isSelected = false;
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);

        expect(component.finalTableData$.next).toHaveBeenCalled();

        expectedEmitResult = [cloneDeep(data[0])];
        expectedEmitResult.forEach((d: any) => {
          delete d.tableRowUuid;
          delete d.isSelectable;
          delete d.isVisible;
        });

        expect(component.selectChange.emit).toHaveBeenCalledWith(expectedEmitResult);

        // Could not find matching data, so does nothing
        component.updateSelectedData(null);
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);
        expect(component.finalTableData$.next).toHaveBeenCalled();
        expect(component.selectChange.emit).toHaveBeenCalledWith(expectedEmitResult);
      });
    });

    describe('selectionMode === SINGLE', () => {
      beforeEach(() => {
        component.selectionMode = SelectionMode.SINGLE;
      });

      it('should handle selecting and deselecting a single row', () => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        component.finalTableData$['_value'] = cloneDeep(data);

        // Select Single Row
        component.updateSelectedData(component.finalTableData$.value[0]);
        expectedNextResult = cloneDeep(data);
        expectedNextResult[0].isSelected = true;
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);

        expect(component.finalTableData$.next).toHaveBeenCalled();

        expectedEmitResult = [cloneDeep(data[0])];
        expectedEmitResult.forEach((d: any) => {
          delete d.tableRowUuid;
          delete d.isSelectable;
          delete d.isVisible;
        });

        expect(component.selectChange.emit).toHaveBeenCalledWith(expectedEmitResult);

        // Select Another Single Row
        component.updateSelectedData(component.finalTableData$.value[3]);
        expectedNextResult = cloneDeep(data);
        expectedNextResult[0].isSelected = false;
        expectedNextResult[3].isSelected = true;
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);

        expect(component.finalTableData$.next).toHaveBeenCalled();

        expectedEmitResult = [cloneDeep(data[3])];
        expectedEmitResult.forEach((d: any) => {
          delete d.tableRowUuid;
          delete d.isSelectable;
          delete d.isVisible;
        });

        expect(component.selectChange.emit).toHaveBeenCalledWith(expectedEmitResult);

        // Could not find matching data, so does nothing
        component.updateSelectedData(null);
        expect(component.selectedTableData$.next).toHaveBeenCalledWith(expectedNextResult);
        expect(component.finalTableData$.next).toHaveBeenCalled();
        expect(component.selectChange.emit).toHaveBeenCalledWith(expectedEmitResult);
      });
    });
  });

  describe('deselectAll()', () => {
    it('should loop through the final table data and unselect all selected, selectable data', () => {
      component.selectedTableData$.next([
        { isSelected: true, isSelectable: true },
        { isSelected: true, isSelectable: false },
        { isSelected: false, isSelectable: true },
        { isSelected: false, isSelectable: false },
      ]);

      spyOn(component.selectedTableData$, 'next').and.stub();

      component.deselectAll();
      expect(component.selectedTableData$.next).toHaveBeenCalledWith([
        { isSelected: false, isSelectable: true },
        { isSelected: true, isSelectable: false },
        { isSelected: false, isSelectable: true },
        { isSelected: false, isSelectable: false },
      ]);
    });

    it('should handle if selectedTableData is undefined', () => {
      component.selectedTableData$.next(undefined);

      spyOn(component.selectedTableData$, 'next').and.stub();

      component.deselectAll();
      expect(component.selectedTableData$.next).toHaveBeenCalledWith([]);
    });
  });

  describe('updateColumnVisibilityChange()', () => {
    it('should update visibleColumns and emit the list of visible columns', fakeAsync(() => {
      spyOn(component.columnVisibilityChange, 'emit').and.stub();

      const columnA: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      columnA.field = 'fieldA';
      columnA.isVisible = true;
      columnA.isHidable = true;

      const columnB: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      columnB.field = 'fieldB';
      columnB.isVisible = true;
      columnB.isHidable = true;

      const columns = [cloneDeep(columnA), cloneDeep(columnB)];

      component.updateColumnVisibilityChange(columns);

      tick();

      expect(component.visibleColumns).toEqual(columns);
      expect(component.columnVisibilityChange.emit).toHaveBeenCalledWith(columns);

      discardPeriodicTasks();
    }));
  });

  describe('handleRowExpansion()', () => {
    beforeEach(() => {
      component.flags.areAllVisibleRowsExpanded = false;
      component.finalTableData$.next([
        { data: 'data1', isExpandable: true, isExpanded: false },
        { data: 'data2', isExpandable: true, isExpanded: true },
        { data: 'data3', isExpandable: false, isExpanded: false },
      ]);
    });

    it('should emit expansionChange with a list of all the expanded rows', () => {
      spyOn(component.expansionChange, 'emit').and.stub();
      component.handleRowExpansion();
      expect(component.expansionChange.emit).toHaveBeenCalledWith([
        { data: 'data1' },
        { data: 'data2' },
      ]);
    });

    it('should toggle all visible rows if no rowData is provided', () => {
      component.handleRowExpansion();
      expect(component.flags.areAllVisibleRowsExpanded).toBeTrue();
      expect(component.finalTableData$.value[0].isExpanded).toBeTrue();
      expect(component.finalTableData$.value[1].isExpanded).toBeTrue();
      expect(component.finalTableData$.value[2].isExpanded).toBeFalse();

      component.handleRowExpansion();
      expect(component.flags.areAllVisibleRowsExpanded).toBeFalse();
      expect(component.finalTableData$.value[0].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[1].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[2].isExpanded).toBeFalse();
    });

    it('should toggle the isExpanded flag of the provided rowData if rowExpansionMode === MULTIPLE', () => {
      component.rowExpansionMode = RowExpansionMode.MULTIPLE;
      component.handleRowExpansion(component.finalTableData$.value[0]);
      expect(component.finalTableData$.value[0].isExpanded).toBeTrue();
      expect(component.finalTableData$.value[1].isExpanded).toBeTrue();
      expect(component.finalTableData$.value[2].isExpanded).toBeFalse();

      component.handleRowExpansion(component.finalTableData$.value[0]);
      expect(component.finalTableData$.value[0].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[1].isExpanded).toBeTrue();
      expect(component.finalTableData$.value[2].isExpanded).toBeFalse();

      component.handleRowExpansion(component.finalTableData$.value[2]);
      expect(component.finalTableData$.value[0].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[1].isExpanded).toBeTrue();
      expect(component.finalTableData$.value[2].isExpanded).toBeFalse();
    });

    it('should only expand (or collapse) the provided rowData if rowExpansionMode === SINGLE', () => {
      component.dataKey = 'data';

      component.rowExpansionMode = RowExpansionMode.SINGLE;
      component.handleRowExpansion(component.finalTableData$.value[0]);
      expect(component.finalTableData$.value[0].isExpanded).toBeTrue();
      expect(component.finalTableData$.value[1].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[2].isExpanded).toBeFalse();

      component.rowExpansionMode = RowExpansionMode.SINGLE;
      component.handleRowExpansion(component.finalTableData$.value[0]);
      expect(component.finalTableData$.value[0].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[1].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[2].isExpanded).toBeFalse();

      component.rowExpansionMode = RowExpansionMode.SINGLE;
      component.handleRowExpansion(component.finalTableData$.value[2]);
      expect(component.finalTableData$.value[0].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[1].isExpanded).toBeFalse();
      expect(component.finalTableData$.value[2].isExpanded).toBeFalse();
    });
  });

  describe('refreshData()', () => {
    it('should emit an event', () => {
      spyOn(component.refresh, 'emit').and.stub();
      component.refreshData();
      expect(component.refresh.emit).toHaveBeenCalled();
    });
  });

  describe('isRowTableDataEqual()', () => {
    let data1: TableRowData;
    let data2: TableRowData;

    beforeEach(() => {
      data1 = {
        point1: 1,
        point2: 2,
        point3: 3,
      };
      data2 = {
        point1: 1,
        point2: 3,
        point3: 3,
      };
    });

    it('should first try to compare by the dataKey', () => {
      component.dataKey = 'point1';
      expect(component.isRowTableDataEqual(data1, data2)).toBeTrue();
      component.dataKey = 'point2';
      expect(component.isRowTableDataEqual(data1, data2)).toBeFalse();
    });

    it('should compare via the uuids the dataKey does not exist in the data', () => {
      component.dataKey = 'badPoint';
      data1.tableRowUuid = '1';
      data2.tableRowUuid = '1';
      expect(component.isRowTableDataEqual(data1, data2)).toBeTrue();
      data2.tableRowUuid = '2';
      expect(component.isRowTableDataEqual(data1, data2)).toBeFalse();
    });

    it('should try to compare by uuids second', () => {
      component.dataKey = null;
      data1.tableRowUuid = '1';
      data2.tableRowUuid = '1';
      expect(component.isRowTableDataEqual(data1, data2)).toBeTrue();
      data2.tableRowUuid = '2';
      expect(component.isRowTableDataEqual(data1, data2)).toBeFalse();
    });

    it('should try to compare using indexes last', () => {
      component.dataKey = null;
      expect(component.isRowTableDataEqual(data1, data2, 1, 1)).toBeTrue();
      expect(component.isRowTableDataEqual(data1, data2, 1, 2)).toBeFalse();
    });

    it('should return false if none of the required data was provided', () => {
      expect(component.isRowTableDataEqual(null, null, undefined, undefined)).toBeFalse();
      component.dataKey = null;
      expect(component.isRowTableDataEqual(null, null, undefined, undefined)).toBeFalse();
      expect(component.isRowTableDataEqual(data1, data2)).toBeFalse();
    });
  });

  describe('isTableDataSelectable()', () => {
    it('should use disableRowSelectionFunction if provided', () => {
      component.disableRowSelectionFunction = null;
      expect(component.isTableDataSelectable({})).toEqual(true);
      component.disableRowSelectionFunction = (_data: TableRowData) => true;
      expect(component.isTableDataSelectable({})).toEqual(false);
    });

    it('should either return true if disableRowSelectionFunction was not provided', () => {
      component.disableRowSelectionFunction = null;
      expect(component.isTableDataSelectable({})).toEqual(true);
      expect(component.isTableDataSelectable({ isSelectable: true })).toEqual(true);
    });
  });

  describe('isTableDataExpandable()', () => {
    it('should use disableRowExpansionFunction if provided', () => {
      component.disableRowExpansionFunction = null;
      expect(component.isTableDataExpandable({})).toEqual(true);
      component.disableRowExpansionFunction = (_data: TableRowData) => true;
      expect(component.isTableDataExpandable({})).toEqual(false);
    });

    it('should either return true if disableRowExpansionFunction was not provided', () => {
      component.disableRowExpansionFunction = null;
      expect(component.isTableDataExpandable({})).toEqual(true);
      expect(component.isTableDataExpandable({ isExpandable: true })).toEqual(true);
    });
  });

  describe('isTableDataActionEnabled()', () => {
    it('should use disableRowActionsButtonFunction if provided', () => {
      component.disableRowActionsButtonFunction = null;
      expect(component.isTableDataActionEnabled({})).toEqual(true);
      component.disableRowActionsButtonFunction = (_data: TableRowData) => true;
      expect(component.isTableDataActionEnabled({})).toEqual(false);
    });

    it('should either return true if disableRowActionsButtonFunction was not provided', () => {
      component.disableRowActionsButtonFunction = null;
      expect(component.isTableDataActionEnabled({})).toEqual(true);
      expect(component.isTableDataActionEnabled({ isActionable: true })).toEqual(true);
    });
  });

  describe('areAllVisibleRowsExpanded()', () => {
    let tableRowData: TableRowData[] = [];

    beforeEach(() => {
      tableRowData = [
        {
          id: 0,
          isSelectable: true,
          isSelected: true,
          isVisible: true,
        },
        {
          id: 1,
          isSelectable: true,
          isSelected: true,
          isVisible: true,
        },
        {
          id: 2,
          isSelectable: true,
          isSelected: true,
          isVisible: true,
        },
      ];
    });

    it('should return true if the data provided is undefined or empty', () => {
      expect(component.areAllVisibleRowsExpanded(undefined)).toBeTrue();
      expect(component.areAllVisibleRowsExpanded([])).toBeTrue();
    });

    it('should return true if the number of selected rows equals the number of visible rows', () => {
      expect(component.areAllVisibleRowsExpanded(tableRowData)).toBeTrue();
    });

    it('should return false if the number of selected rows does NOT equal the number of visible rows', () => {
      tableRowData[0].isExpandable = false;
      expect(component.areAllVisibleRowsExpanded(tableRowData)).toBeTrue();
      tableRowData[0].isExpandable = true;

      tableRowData[0].isVisible = false;
      expect(component.areAllVisibleRowsExpanded(tableRowData)).toBeTruthy();
      tableRowData[0].isVisible = true;

      tableRowData[0].isExpanded = false;
      expect(component.areAllVisibleRowsExpanded(tableRowData)).toBeFalse();
      tableRowData[0].isExpanded = true;
    });
  });

  describe('updateColumns()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    let columns: TableColumnComponent[];
    let columnsQuery: QueryList<TableColumnComponent>;

    let hiddenColumns: TableColumnComponent[];
    let hiddenColumnsQuery: QueryList<TableColumnComponent>;

    let appliedTableView: TableView;
    let defaultColumns: TableColumnComponent[];

    let resultColumns: TableColumnComponent[];

    beforeEach(() => {
      const colA: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      colA.field = 'a';
      colA.isVisible = true;

      const colB: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      colB.field = 'b';
      colB.isVisible = true;

      columns = [cloneDeep(colA), cloneDeep(colB)];
      columnsQuery = new QueryList<TableColumnComponent>();
      columnsQuery['_results'] = cloneDeep(columns);

      hiddenColumns = cloneDeep(columns);
      hiddenColumns.forEach((col: TableColumnComponent) => col.isVisible = false);
      hiddenColumnsQuery = new QueryList<TableColumnComponent>();
      hiddenColumnsQuery['_results'] = cloneDeep(hiddenColumns);

      appliedTableView = { label: 'table view', name: 'tableView', columns: [cloneDeep(columns[0])] };

      defaultColumns = [cloneDeep(columns[1])];
    });

    it('should use either the provided columns or component level columns', () => {
      component.updateColumns(columnsQuery);
      component.updateColumns();
    });

    it('should do nothing if there are no columns', () => {
      component['_visibleColumns'] = undefined;
      component.updateColumns(undefined);
      expect(component.visibleColumns).toEqual(undefined);
      component.updateColumns(new QueryList<TableColumnComponent>());
      expect(component.visibleColumns).toEqual(undefined);
    });

    it('should use both the appliedTableView and defaultColumns to update the columns if new columns were provided', () => {
      component['_appliedTableView'] = appliedTableView;
      component['_defaultColumns'] = defaultColumns;

      component.updateColumns(hiddenColumnsQuery);

      resultColumns = component.columns.toArray();
      expect(resultColumns[0].isVisible).toBeTrue();
      expect(resultColumns[1].isVisible).toBeTrue();
    });

    it('should use the appliedTableView to update the columns', () => {
      component['_appliedTableView'] = appliedTableView;
      component['_columns'] = hiddenColumnsQuery;

      resultColumns = component.columns.toArray();
      expect(resultColumns[0].isVisible).toBeFalse();
      expect(resultColumns[1].isVisible).toBeFalse();

      component.updateColumns(undefined, ViewChangeOrDefaultCols.VIEW_CHANGE);

      resultColumns = component.columns.toArray();
      expect(resultColumns[0].isVisible).toBeTrue();
      expect(resultColumns[1].isVisible).toBeFalse();
    });

    it('should use the appliedTableView to update the columns (clear column sorting)', () => {
      appliedTableView.columns[0].sorted = TableColumnSorted.ASCENDING;
      component['_appliedTableView'] = appliedTableView;
      component['_columns'] = hiddenColumnsQuery;

      resultColumns = component.columns.toArray();
      expect(resultColumns[0].isVisible).toBeFalse();
      expect(resultColumns[1].isVisible).toBeFalse();

      component.updateColumns(undefined, ViewChangeOrDefaultCols.VIEW_CHANGE);

      resultColumns = component.columns.toArray();
      expect(resultColumns[0].isVisible).toBeTrue();
      expect(resultColumns[1].isVisible).toBeFalse();
    });

    it('should use the defaultColumns to update the columns', () => {
      component['_defaultColumns'] = defaultColumns;
      component['_columns'] = hiddenColumnsQuery;

      resultColumns = component.columns.toArray();
      expect(resultColumns[0].isVisible).toBeFalse();
      expect(resultColumns[1].isVisible).toBeFalse();

      component.updateColumns(undefined, ViewChangeOrDefaultCols.DEFAULT_COLS);

      resultColumns = component.columns.toArray();
      expect(resultColumns[0].isVisible).toBeFalse();
      expect(resultColumns[1].isVisible).toBeTrue();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('startResize()', () => {
    it('should set the isResizeIndicatorVisible flag ', () => {
      (renderer.listen as jasmine.Spy).and.returnValue(() => ({ pageX: 100 }) as MouseEvent);
      component.startResize();
      expect(component.flags.resizeIndicatorVisibleListener).toBeTruthy();
    });
  });

  describe('stopResize()', () => {
    it('should set the flag to false and update the updatedWith value of the resized column', () => {
      (renderer.listen as jasmine.Spy).and.returnValue(() => ({ pageX: 100 }) as MouseEvent);
      const column: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      column.field = 'field';
      const columns: QueryList<TableColumnComponent> = new QueryList<TableColumnComponent>();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      columns['_results'] = [column];
      component.columns = columns;
      component.startResize();
      component.stopResize(column.field, '100px');
      expect(component.flags.resizeIndicatorVisibleListener).toBeUndefined();
      expect(component.columns.toArray()[0].updatedWidth).toEqual('100px');
    });
  });

  describe('unlistenToResizeIndicatorVisibleMouseMove()', () => {
    it('should un-listen and clear resizeIndicatorVisibleListener if defined', () => {
      component.flags = undefined;
      component.unlistenToResizeIndicatorVisibleMouseMove();

      component.flags = { resizeIndicatorVisibleListener: undefined };
      component.unlistenToResizeIndicatorVisibleMouseMove();

      (renderer.listen as jasmine.Spy).and.returnValue(() => ({ pageX: 100 }) as MouseEvent);
      component.startResize();
      expect(component.flags.resizeIndicatorVisibleListener).toBeTruthy();
      component.unlistenToResizeIndicatorVisibleMouseMove();
      expect(component.flags.resizeIndicatorVisibleListener).toBeFalsy();
    });
  });
});
