import { ChangeDetectorRef, EventEmitter, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { of, Subject } from 'rxjs';

import { StubFactory } from '../../../unit-test-helpers/stub-factory.spec'

import {
  TableColumnComponent,
  TableColumnSorted,
  TableComponent,
  TableFilterComponent,
  TableFilterConfig,
  TableView,
} from '@fusion-components/lib/components/table';
import { DeepLinkedTableDirective } from './deep-linked-table.directive';
import { TableQueryParamsParser } from './table-query-params-parser';

describe('DeepLinkedTable', () => {
  let directive: DeepLinkedTableDirective;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  const columns = new QueryList<TableColumnComponent>();
  const filters = new QueryList<TableFilterComponent>();
  const cdr: ChangeDetectorRef = {
    detectChanges: jasmine.createSpy('detectChanges') as any
  } as ChangeDetectorRef;
  const getTable = (): TableComponent => ({
    columns,
    filters,
    quickFilters: [],
    appliedFilters: [],
    data: new Subject(),
    sortChange: new EventEmitter<any>(),
    columnVisibilityChange: new EventEmitter<any>(),
    filterChange: new EventEmitter<any>(),
    viewChange: new EventEmitter<any>(),
  }) as any;

  function setRouteQueryParams(params: any): void {
    (directive as any).route = {
      queryParams: of(params)
    };
  }

  function createMockColumns(names: string[]): void {
    const columnComponents: TableColumnComponent[] = [];
    names.forEach(name => {
      const colDir = new TableColumnComponent(cdr);
      colDir.field = name;
      columnComponents.push(colDir);
    });

    columnComponents[0].sorted = TableColumnSorted.DESCENDING;

    (columns as any)._results = columnComponents;
  }

  function createMockFilters(): void {
    const filterComponents = [];

    const numberFilter = {} as TableFilterConfig;
    numberFilter.field = 'id';
    const stringFilter = {} as TableFilterConfig;
    stringFilter.field = 'name';

    filterComponents.push(numberFilter);
    filterComponents.push(stringFilter);

    (filters as any)._results = filterComponents;
  }

  beforeEach(() => {
    router = StubFactory.getRouterStub() as Router;
    activatedRoute = StubFactory.getActivetedRouteStub() as ActivatedRoute;
    directive = new DeepLinkedTableDirective(activatedRoute, router, cdr, getTable() as TableComponent);

    spyOn(TableQueryParamsParser, 'getFiltersFromQueryParams').and.returnValue([{} as any]);
    spyOn(TableQueryParamsParser, 'getSortFromQueryParams').and.returnValue({} as any);
    spyOn(TableQueryParamsParser, 'getColumnsFromQueryParams').and.returnValue([{} as any]);
    spyOn(TableQueryParamsParser, 'getViewFromQueryParams').and.returnValue({} as any);
    spyOn(TableQueryParamsParser, 'createQueryParams').and.returnValue([{} as any]);

    createMockColumns(['id', 'name']);
    createMockFilters();

    setRouteQueryParams({});
  });

  afterEach(() => {
    directive.ngOnDestroy();
  });

  it('should cleanup on destroy', () => {
    spyOn((directive as any)._destroy$, 'complete');
    spyOn((directive as any)._destroy$, 'unsubscribe');
    directive.ngOnDestroy();
    expect((directive as any)._destroy$.complete).toHaveBeenCalled();
    expect((directive as any)._destroy$.unsubscribe).toHaveBeenCalled();
  });

  describe('init', () => {
    it('should set default values correctly', () => {
      expect(directive.allColumnVisibleFields.length).toBe(0);
      expect(directive.defaultFilters.length).toBe(0);

      (directive as any).init();

      expect(directive.allColumnVisibleFields.length).toBe(2);
      expect(directive.defaultFilters.length).toBe(0);
    });

    it('should set default filters correctly if quickFilters are set', () => {
      expect(directive.defaultFilters.length).toBe(0);
      (directive as any).table.quickFilters = [
        { field: 'name', isApplied: true } as TableFilterConfig,
      ];

      (directive as any).init();

      expect(directive.defaultFilters.length).toBe(1);
    });

    it('should set default filters correctly if appliedFilters are set', () => {
      expect(directive.defaultFilters.length).toBe(0);
      (directive as any).table.appliedFilters = [
        { field: 'name', isApplied: true } as TableFilterConfig,
      ];

      (directive as any).init();

      expect(directive.defaultFilters.length).toBe(1);
    });

    it('should set default filters correctly if quickFilters and appliedFilters are set', () => {
      expect(directive.defaultFilters.length).toBe(0);
      (directive as any).table.quickFilters = [
        { field: 'name', isApplied: true } as TableFilterConfig,
      ];
      (directive as any).table.appliedFilters = [
        { field: 'name', isApplied: true } as TableFilterConfig,
      ];

      (directive as any).init();

      expect(directive.defaultFilters.length).toBe(2);
    });

    it('should not error if quickFilters and appliedFilters do not exist', () => {
      expect(directive.defaultFilters.length).toBe(0);
      (directive as any).table.quickFilters = null;
      (directive as any).table.appliedFilters = null;

      (directive as any).init();

      expect(directive.defaultFilters.length).toBe(0);
    });
  });

  describe('setupChangeListeners', () => {
    it('should call setup listeners', () => {
      const filterChangeSpy = spyOn((directive as any).table.filterChange, 'subscribe').and.stub();
      const sortChangeSpy = spyOn((directive as any).table.sortChange, 'subscribe').and.stub();
      const columnChangeSpy = spyOn((directive as any).table.columnVisibilityChange, 'subscribe').and.stub();
      const viewChangeSpy = spyOn((directive as any).table.viewChange, 'subscribe').and.stub();

      directive.setupChangeListeners();
      expect(filterChangeSpy).toHaveBeenCalledTimes(1);
      expect(sortChangeSpy).toHaveBeenCalledTimes(1);
      expect(columnChangeSpy).toHaveBeenCalledTimes(1);
      expect(viewChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should call the on change methods when a change occurs', () => {
      spyOn(directive, 'handleFiltersChange').and.callFake(() => null);
      spyOn(directive, 'handleSortChange').and.callFake(() => null);
      spyOn(directive, 'handleColumnsChange').and.callFake(() => null);
      spyOn(directive, 'handleViewChange').and.callFake(() => null);
      directive.ngAfterViewInit();

      (directive as any).table.filterChange.emit([]);
      (directive as any).table.sortChange.emit({});
      (directive as any).table.columnVisibilityChange.emit([]);
      (directive as any).table.viewChange.emit({} as any);

      expect(directive.handleFiltersChange).toHaveBeenCalledTimes(1);
      expect(directive.handleSortChange).toHaveBeenCalledTimes(1);
      expect(directive.handleColumnsChange).toHaveBeenCalledTimes(1);
      expect(directive.handleViewChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call setup listeners', () => {
      spyOn(directive as any, 'init').and.stub();
      spyOn(directive, 'getQueryParamData').and.stub();
      spyOn(directive, 'setupChangeListeners').and.stub();

      directive.ngAfterViewInit();

      expect((directive as any).init).toHaveBeenCalledTimes(1);
      expect(directive.getQueryParamData).toHaveBeenCalledTimes(1);
      expect(directive.setupChangeListeners).toHaveBeenCalledTimes(1);
    });

    it('should error if there is no turbo table', () => {
      (directive as any).table = undefined;
      expect(() => directive.ngAfterViewInit()).toThrowError(directive.noTableErrorMsg);
    });
  });

  describe('getQueryParamData', () => {
    it('should only attempt to parse query params when present', () => {
      directive.getQueryParamData();
      expect(TableQueryParamsParser.getFiltersFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getSortFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getColumnsFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getViewFromQueryParams).not.toHaveBeenCalled();

      expect(directive.paramData).toEqual({
        filters: [],
        sort: undefined,
        columns: [],
        view: undefined,
      });
    });

    it('should only attempt to parse filters query params when present', () => {
      setRouteQueryParams({
        filters: 'id:equalTo:1'
      });

      directive.getQueryParamData();
      expect(TableQueryParamsParser.getFiltersFromQueryParams).toHaveBeenCalled();
      expect(TableQueryParamsParser.getSortFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getColumnsFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getViewFromQueryParams).not.toHaveBeenCalled();

      expect(directive.paramData.filters.length).toBe(1);
    });

    it('should attempt to parse sort and column query params when present', () => {
      setRouteQueryParams({
        sort: 'name:-1'
      });

      directive.getQueryParamData();
      expect(TableQueryParamsParser.getFiltersFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getSortFromQueryParams).toHaveBeenCalled();
      expect(TableQueryParamsParser.getColumnsFromQueryParams).toHaveBeenCalled();
      expect(TableQueryParamsParser.getViewFromQueryParams).not.toHaveBeenCalled();

      expect(directive.paramData.sort).not.toBeNull();
      expect(directive.paramData.sort).not.toBeUndefined();
      expect(directive.paramData.columns).not.toBeUndefined();
      expect(directive.paramData.columns).not.toBeNull();
    });

    it('should only attempt to parse columns query params when present', () => {
      setRouteQueryParams({
        columns: 'name'
      });

      directive.getQueryParamData();
      expect(TableQueryParamsParser.getFiltersFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getSortFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getColumnsFromQueryParams).toHaveBeenCalled();
      expect(TableQueryParamsParser.getViewFromQueryParams).not.toHaveBeenCalled();
    });

    it('should use query param sort when present', () => {
      const sort = {
        field: 'name',
        order: -1
      };
      (TableQueryParamsParser.getSortFromQueryParams as jasmine.Spy).and.returnValue(sort);
      setRouteQueryParams({
        sort: 'name:-1',
        columns: 'name'
      });

      directive.getQueryParamData();
      expect(TableQueryParamsParser.getFiltersFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getSortFromQueryParams).toHaveBeenCalled();
      expect(TableQueryParamsParser.getColumnsFromQueryParams).toHaveBeenCalledWith('name', jasmine.anything(), sort);
      expect(TableQueryParamsParser.getViewFromQueryParams).not.toHaveBeenCalled();
    });

    it('should use default sort when query param sort is not present', () => {
      setRouteQueryParams({
        columns: 'name'
      });

      directive.defaultSort = {
        field: 'id',
        order: 1
      };

      directive.getQueryParamData();
      expect(TableQueryParamsParser.getFiltersFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getSortFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getColumnsFromQueryParams)
        .toHaveBeenCalledWith('name', jasmine.anything(), directive.defaultSort);
      expect(TableQueryParamsParser.getViewFromQueryParams).not.toHaveBeenCalled();
    });

    it('should set the columns param data when they differ from the default columns', () => {
      (TableQueryParamsParser.getColumnsFromQueryParams as jasmine.Spy).and.returnValue([{field: 'name', isVisible: true} as any]);
      directive.allColumnVisibleFields = ['id', 'name'];

      setRouteQueryParams({
        columns: 'name'
      });

      directive.getQueryParamData();
      expect(TableQueryParamsParser.getFiltersFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getSortFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getColumnsFromQueryParams).toHaveBeenCalled();
      expect(TableQueryParamsParser.getViewFromQueryParams).not.toHaveBeenCalled();

      expect(directive.paramData.columns.length).toBeGreaterThan(0);
    });

    it('should only attempt to parse view query params when present', () => {
      setRouteQueryParams({
        view: { name: 'myView' }
      });

      directive.getQueryParamData();
      expect(TableQueryParamsParser.getFiltersFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getSortFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getColumnsFromQueryParams).not.toHaveBeenCalled();
      expect(TableQueryParamsParser.getViewFromQueryParams).toHaveBeenCalled();

      expect(directive.paramData.view).not.toBeNull();
      expect(directive.paramData.view).not.toBeUndefined();
    });

    it('should not call update table subjects if parser returns empty list', () => {
      setRouteQueryParams({
        filters: 'invalid:23o:dogj;dl',
        sort: 'invalid:23o:dogj;dl',
        columns: 'invalid:23o:dogj;dl',
        view: 'blah-dee-dah'
      });

      (TableQueryParamsParser.getFiltersFromQueryParams as jasmine.Spy).and.returnValue([]);
      (TableQueryParamsParser.getSortFromQueryParams as jasmine.Spy).and.returnValue(undefined);
      (TableQueryParamsParser.getColumnsFromQueryParams as jasmine.Spy).and.returnValue([]);
      (TableQueryParamsParser.getViewFromQueryParams as jasmine.Spy).and.returnValue(undefined);

      const filtersNextSpy = spyOn((directive as any).table.filterChange, 'next').and.callThrough();
      const sortNextSpy = spyOn((directive as any).table.sortChange, 'next').and.callThrough();
      const columnsNextSpy = spyOn((directive as any).table.columnVisibilityChange, 'next').and.callThrough();
      const viewNextSpy = spyOn((directive as any).table.viewChange, 'next').and.callThrough();

      directive.getQueryParamData();
      expect(filtersNextSpy).not.toHaveBeenCalled();
      expect(sortNextSpy).not.toHaveBeenCalled();
      expect(columnsNextSpy).not.toHaveBeenCalled();
      expect(viewNextSpy).not.toHaveBeenCalled();

      expect(directive.paramData.filters.length).toBe(0);
      expect(directive.paramData.sort).toBe(undefined);
      expect(directive.paramData.columns.length).toBe(0);
      expect(directive.paramData.view).toBe(undefined);
    });
  });

  describe('Change Listeners', () => {
    const fakeParams = {
      filters: 'fake:fake:fake',
      sorts: 'fake:1',
      columns: 'fake'
    };

    beforeEach(() => {
      (TableQueryParamsParser.createQueryParams as jasmine.Spy).and.returnValue(fakeParams);
    });

    describe('handleFiltersChange', () => {
      it('should set the filters data correctly', () => {
        const newFilters = [{
          filter: TableFilterComponent,
          filterName: 'id',
          field: 'id',
          comparatorName: 'equals',
          formValues: { string: 'string' },
        }];
        directive.handleFiltersChange(newFilters);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: newFilters, sort: undefined, columns: [], view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });

      it('should not set the filters data if the filters are view filters', () => {
        const newFilters = [{
          filter: TableFilterComponent,
          filterName: 'id',
          field: 'id',
          comparatorName: 'equals',
          formValues: { string: 'string' },
          isViewFilter: true
        }];
        directive.handleFiltersChange(newFilters);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: undefined, columns: [], view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });

      it('should not set the filters data if the filters are the same as default', () => {
        const newFilters = [{
          filter: TableFilterComponent,
          filterName: 'id',
          field: 'id',
          comparatorName: 'equals',
          formValues: { string: 'string' },
          isViewFilter: true
        }];
        directive.defaultFilters = newFilters as any;
        directive.handleFiltersChange(newFilters);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: undefined, columns: [], view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });
    });

    describe('handleSortChange', () => {
      it('should call navigate with the correct params', () => {
        const sort = {
          field: 'name',
          sorted: TableColumnSorted.ASCENDING
        };
        directive.handleSortChange(sort);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: { field: 'name', order: -1 }, columns: [], view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });

      it('should not set sort if the sort is the same as the default sort', () => {
        const sort = {
          field: 'name',
          order: TableColumnSorted.DESCENDING
        };
        directive.defaultSort = { field: 'name', order: 1 };
        directive.handleSortChange(sort);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: undefined, columns: [], view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });
    });

    describe('handleColumnsChange', () => {
      beforeEach(() => {
        directive.allColumnVisibleFields = ['id', 'name'];
      });

      it('should call navigate with the correct params', () => {
        const newColumns = [
          { field: 'name' },
        ] as TableColumnComponent[];
        directive.handleColumnsChange(newColumns);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: undefined, columns: newColumns, view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });

      it('should not set columns if they are the same as the default columns.', () => {
        const newColumns = [
          { field: 'name', isVisible: true },
          { field: 'id', isVisible: true },
        ] as TableColumnComponent[];
        directive.handleColumnsChange(newColumns);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: undefined, columns: [], view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });

      it('should not set columns if they are the same as the views default columns', () => {
        (directive as any).table.appliedTableView = {
          columns: [
            {field: 'id', isVisible: true},
            {field: 'name', isVisible: true},
          ]
        } as TableView;

        const newColumns = [
          { field: 'name', isVisible: true },
          { field: 'id', isVisible: true },
        ] as TableColumnComponent[];
        directive.handleColumnsChange(newColumns);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: undefined, columns: [], view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });
    });

    describe('handleViewChange', () => {
      it('should call navigate with the correct params', () => {
        const newView = {
          name: 'myView'
        } as TableView;
        directive.handleViewChange(newView);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: undefined, columns: [], view: newView }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });

      it('should not set view if it is the same as the default view.', () => {
        const newView = {
          name: 'myView'
        } as TableView;
        directive.defaultView = newView;
        directive.handleViewChange(newView);

        expect(TableQueryParamsParser.createQueryParams)
          .toHaveBeenCalledWith({ filters: [], sort: undefined, columns: [], view: undefined }, jasmine.anything());
        expect(router.navigate).toHaveBeenCalledWith([jasmine.any(String)], {
          replaceUrl: true,
          queryParams: fakeParams
        });
      });
    });
  });

  describe('getDefaultSort()', () => {
    it('should return an empty applied sort if the sort column was not found', () => {
      directive.allColumns = [];
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(directive['getDefaultSort']()).toEqual({ field: '', order: 1 });
    });
  });
});
