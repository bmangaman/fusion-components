import { ChangeDetectorRef, QueryList, ViewContainerRef } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

import { cloneDeep } from 'lodash-es';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import {
  TableFilterComponent,
  TableFilterNumberComponent,
  TableFilterNumberInputComparator,
  TableFilterStringComponent,
  TableFilterStringInputComparator,
} from '../table-filters';
import { TableRowData, TableView } from '../table.interface';
import { TableFilterHostDirective } from './table-filter-host/table-filter-host.directive';
import { TableFilterSelectorComponent } from './table-filter-selector.component';
import { TableFilterConfig } from './table-filter-selector.interface';

describe('TableFilterSelectorComponent', () => {
  let component: TableFilterSelectorComponent;
  let viewContainerRef: ViewContainerRef;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    viewContainerRef = ComponentStubFactory.getViewContainerRefStub() as ViewContainerRef;
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;

    component = new TableFilterSelectorComponent(
      changeDetectorRef,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input()', () => {
    describe('quickFilters', () => {
      it('should set quick filters', () => {
        component.quickFilters = null as any;
        expect(component.quickFilters).toEqual([]);
        const quickFilters: TableFilterConfig[] = [{} as TableFilterConfig, {} as TableFilterConfig];
        component.quickFilters = quickFilters;
        expect(component.quickFilters).toEqual(quickFilters);
      });

      it('should call addGeneratedFilter() if isApplied is true', () => {
        spyOn(component, 'addGeneratedFilter').and.stub();
        const quickFilters: TableFilterConfig[] = [{isApplied: true} as TableFilterConfig, {} as TableFilterConfig];
        component.quickFilters = quickFilters;
        expect(component.addGeneratedFilter).toHaveBeenCalled();
      });
    });

    describe('filters', () => {
      it('should set filters', () => {
        const filters: QueryList<TableFilterComponent> = new QueryList<TableFilterComponent>();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        filters['_results'] = [
          new TableFilterComponent(new UntypedFormBuilder()),
          new TableFilterComponent(new UntypedFormBuilder()),
        ];
        component.filters = filters;
        expect(component.filters).toEqual(filters);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_filters']).toEqual(filters);
      });
    });

    describe('sortedData', () => {
      it('should set the data', () => {
        spyOn(component, 'filterData').and.stub();

        const data: TableRowData[] = [{ data: 'data' }];
        component.data = data;
        expect(component.data).toEqual(data);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_data']).toEqual(data);
        expect(component.filterData).toHaveBeenCalled();
      });
    });

    describe('tableView', () => {
      it('should set the view and filter data', () => {
        spyOn(component, 'filterData').and.stub();
        component.tableView = {} as TableView;
        expect(component.tableView).toEqual({} as TableView);
        expect(component.filterData).toHaveBeenCalled();
      });

      it('should remove all applied view table filters', () => {
        spyOn(component, 'removeFilter').and.stub();

        const appliedFilter1: TableFilterComponent = new TableFilterComponent(new UntypedFormBuilder());
        appliedFilter1.isViewFilter = false;
        const appliedFilter2: TableFilterComponent = new TableFilterComponent(new UntypedFormBuilder());
        appliedFilter2.isViewFilter = true;
        const appliedFilter3: TableFilterComponent = undefined as any;

        component.appliedFilters = [appliedFilter1, appliedFilter2, appliedFilter3];

        component.tableView = {} as TableView;

        expect(component.removeFilter).toHaveBeenCalledTimes(1);
      });

      it('should not add and generate any view filters if there are none', () => {
        spyOn(component, 'addGeneratedFilter').and.stub();

        component.tableView = undefined as any;
        expect(component.addGeneratedFilter).not.toHaveBeenCalled();

        component.tableView = { filters: undefined } as TableView;
        expect(component.addGeneratedFilter).not.toHaveBeenCalled();

        component.tableView = { filters: [] } as any as TableView;
        expect(component.addGeneratedFilter).not.toHaveBeenCalled();
      });

      it('should add and generate all applied view table filters', () => {
        spyOn(component, 'addGeneratedFilter').and.stub();

        const view: TableView = {
          filters: [
            {} as TableFilterConfig,
          ],
        } as TableView;

        component.tableView = view;
        expect(component.addGeneratedFilter).toHaveBeenCalled();
      });
    });

    describe('externalAppliedFilters', () => {
      it('should set externalAppliedFilters, removeAllFilters(), and generate and add all applied filters', () => {
        spyOn(component, 'removeAllFilters').and.stub();
        spyOn(component, 'addGeneratedFilter').and.stub();

        const filterConfigs: TableFilterConfig[] = [
          {} as TableFilterConfig,
          {} as TableFilterConfig,
        ];

        component.externalAppliedFilters = undefined;
        expect(component.removeAllFilters).toHaveBeenCalled();
        expect(component.addGeneratedFilter).not.toHaveBeenCalled();

        component.externalAppliedFilters = filterConfigs;
        expect(component.removeAllFilters).toHaveBeenCalled();
        expect(component.addGeneratedFilter).toHaveBeenCalledTimes(2);
        expect(component.externalAppliedFilters).toEqual(filterConfigs);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_externalAppliedFilters']).toEqual(filterConfigs);
      });
    });
  });

  describe('ngOnInit()', () => {
    it('should call loadComponent if the filterField changes and tableFilterTemplate is defined', () => {
      spyOn(component, 'loadComponent').and.stub();

      component.tableFilterTemplate = undefined as any;
      component.ngOnInit();
      component.filterField.setValue({} as TableFilterComponent);
      expect(component.loadComponent).not.toHaveBeenCalled();

      component.tableFilterTemplate = {} as TableFilterHostDirective;
      component.ngOnInit();
      component.filterField.setValue(undefined);
      expect(component.loadComponent).not.toHaveBeenCalled();

      component.tableFilterTemplate = {} as TableFilterHostDirective;
      component.ngOnInit();
      component.filterField.setValue({} as TableFilterComponent);
      expect(component.loadComponent).toHaveBeenCalledWith({} as TableFilterComponent);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should unsubscribe from any subscriptions', () => {
      const sub1: Subscription = new Subscription();
      spyOn(sub1, 'unsubscribe').and.stub();
      const sub2: Subscription = new Subscription();
      spyOn(sub2, 'unsubscribe').and.stub();
      component.subscriptions = [sub1, sub2];
      component.ngOnDestroy();
      expect(sub1.unsubscribe).toHaveBeenCalled();
      expect(sub2.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('menuOpened()', () => {
    beforeEach(() => {
      spyOn(component.filterField, 'setValue').and.stub();
    });

    it('should set the filterField value if filters is defined and not empty', fakeAsync(() => {
      component.filters = undefined as any;
      component.menuOpened();
      tick();
      expect(component.filterField.setValue).not.toHaveBeenCalled();

      component.filters = new QueryList<TableFilterComponent>();
      component.menuOpened();
      tick();
      expect(component.filterField.setValue).not.toHaveBeenCalled();

      component.filters = new QueryList<TableFilterComponent>();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.filters['_results'] = [{} as TableFilterComponent];
      component.menuOpened();
      tick();
      expect(component.filterField.setValue).toHaveBeenCalled();

      discardPeriodicTasks();
    }));

    it('should disable the filterField if there are no visible filters', fakeAsync(() => {
      spyOn(component.filterField, 'enable').and.stub();
      spyOn(component.filterField, 'disable').and.stub();

      component.filters = new QueryList<TableFilterComponent>();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.filters['_results'] = [{ isVisibleInSelector: false } as TableFilterComponent];
      component.menuOpened();
      tick();
      expect(component.filterField.disable).toHaveBeenCalled();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.filters['_results'] = [{ isVisibleInSelector: true } as TableFilterComponent];
      component.menuOpened();
      tick();
      expect(component.filterField.enable).toHaveBeenCalled();

      discardPeriodicTasks();
    }));
  });

  describe('loadComponent()', () => {
    it('should update the tableFilter', () => {
      component.tableFilter = undefined as any;
      component.tableFilterTemplate = new TableFilterHostDirective(viewContainerRef);
      component.loadComponent(new TableFilterComponent(new UntypedFormBuilder()));
      expect(component.tableFilter).toBeDefined();
    });
  });

  describe('isFormValid()', () => {
    it('should return true if any of the required objects or if the table filter form is invalid', () => {
      component.tableFilter = undefined as any;
      expect(component.isFormInvalid()).toBeTrue();

      component.tableFilter = new TableFilterComponent(new UntypedFormBuilder());

      const tableFilterIsFormInvalidSpy: jasmine.Spy = spyOn(component.tableFilter, 'isFormInvalid');
      const filterFieldInvalidSpy: jasmine.Spy = spyOnProperty(component.filterField, 'invalid');

      tableFilterIsFormInvalidSpy.and.returnValue(true);
      expect(component.isFormInvalid()).toBeTrue();

      filterFieldInvalidSpy.and.returnValue(true);
      expect(component.isFormInvalid()).toBeTrue();

      tableFilterIsFormInvalidSpy.and.returnValue(false);
      filterFieldInvalidSpy.and.returnValue(false);
      expect(component.isFormInvalid()).toBeFalse();
    });
  });

  describe('toggleQuickFilter', () => {
    it('should remove the quick filter if it is applied, remove it otherwise', () => {
      const quickFilter: TableFilterConfig = {
        field: 'id',
        filter: TableFilterStringComponent,
        filterName: 'ID',
        comparatorName: TableFilterStringInputComparator.IS,
        isApplied: true,
        formValues: { string: 'value' },
      };

      component.quickFilters = [cloneDeep(quickFilter)];

      expect(component.appliedFilters.length).toEqual(1);
      expect(component.quickFilters[0].isApplied).toBeTrue();

      component.toggleQuickFilter(component.quickFilters[0]);
      expect(component.appliedFilters.length).toEqual(0);
      expect(component.quickFilters[0].isApplied).toBeFalse();

      component.toggleQuickFilter(component.quickFilters[0]);
      expect(component.appliedFilters.length).toEqual(1);
      expect(component.quickFilters[0].isApplied).toBeTrue();
    });
  });

  describe('addGeneratedFilter()', () => {
    it('should generate a filter based on the provided config and apply it', () => {
      spyOn(component, 'generateFilter').and.callThrough();
      spyOn(component, 'filterData').and.callThrough();

      const filterConfig: TableFilterConfig = {
        filter: TableFilterStringComponent,
        uuid: '2',
        isApplied: true,
        formValues: { string: 'value' },
      } as any as TableFilterConfig;

      expect(component.appliedFilters.length).toEqual(0);
      component.addGeneratedFilter(filterConfig);
      expect(component.generateFilter).toHaveBeenCalled();
      expect(component.filterData).toHaveBeenCalled();
      expect(component.appliedFilters.length).toEqual(1);
    });

    it('should not call filterData if the filter is a view filter', () => {
      spyOn(component, 'generateFilter').and.callThrough();
      spyOn(component, 'filterData').and.callThrough();

      let filterConfig: TableFilterConfig = {
        filter: TableFilterStringComponent,
        filterName: 'ID',
        field: 'id',
        comparatorName: TableFilterStringInputComparator.IS,
        uuid: '2',
        isApplied: true,
        formValues: { string: 'value' },
        isViewFilter: true,
      };

      component.addGeneratedFilter(filterConfig);
      expect(component.filterData).not.toHaveBeenCalled();

      filterConfig.isViewFilter = undefined;
      component.addGeneratedFilter(filterConfig, true);
      expect(component.filterData).not.toHaveBeenCalled();

      filterConfig = undefined as any;
      component.addGeneratedFilter(filterConfig, true);
      expect(component.filterData).not.toHaveBeenCalled();
    });
  });

  describe('updateAppliedFilters()', () => {
    let tableFilter: TableFilterComponent;
    let addedTableFilter: TableFilterComponent;

    beforeEach(() => {
      tableFilter = new TableFilterComponent(new UntypedFormBuilder());
      addedTableFilter = new TableFilterComponent(new UntypedFormBuilder());

      component.appliedFilters = [tableFilter];
    });

    it('should append a non-table-view filter to the end of the array', () => {
      component.updateAppliedFilters(addedTableFilter);
      expect(component.appliedFilters).toEqual([tableFilter, addedTableFilter]);
    });

    it('should append a table-view filter to the front of the array', () => {
      addedTableFilter.isViewFilter = true;
      component.updateAppliedFilters(addedTableFilter);
      expect(component.appliedFilters).toEqual([addedTableFilter, tableFilter]);
    });
  });

  describe('applyFilter()', () => {
    let filter: TableFilterComponent;
    let quickFilter: TableFilterConfig;

    beforeEach(() => {
      spyOn(component, 'filterData').and.stub();

      filter = new TableFilterStringComponent(new UntypedFormBuilder());
      filter.TableFilter = TableFilterStringComponent;
      filter.selectedFilterComparator.next(filter.filterComparators[0]); // IS
      filter.filterForm.patchValue({ string: 'data' });
      filter.field = 'data';

      component.filterField.setValue('data');
      component.filters = new QueryList<TableFilterComponent>();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.filters['_results'] = [filter];
      component.tableFilter = cloneDeep(filter);

      quickFilter = {
        filter: TableFilterStringComponent,
        uuid: '2',
        comparatorName: filter.filterComparators[0].name,
        field: 'data',
        formValues: { string: 'data' },
      } as any as TableFilterConfig;
    });

    it('should do nothing if there is no table filter or if the form is invalid', () => {
      const isFormInvalidSpy: jasmine.Spy = spyOn(component, 'isFormInvalid');

      spyOn(component.filterField, 'setValue').and.stub();

      component.tableFilter = undefined as any;
      isFormInvalidSpy.and.returnValue(true);
      component.applyFilter();
      expect(component.filterField.setValue).not.toHaveBeenCalled();

      component.tableFilter = filter;
      isFormInvalidSpy.and.returnValue(true);
      component.applyFilter();
      expect(component.filterField.setValue).not.toHaveBeenCalled();

      component.tableFilter = undefined as any;
      isFormInvalidSpy.and.returnValue(false);
      component.applyFilter();
      expect(component.filterField.setValue).not.toHaveBeenCalled();
    });

    it('should apply the filter if it is valid', () => {
      component.applyFilter();
      expect(component.tableFilter).toBeUndefined();
      expect(component.appliedFilters.length).toEqual(1);
      expect(component.filterData).toHaveBeenCalled();
    });

    it('should apply the quick filter if the current filter matches', () => {
      component.quickFilters = [cloneDeep(quickFilter)];

      // Should use the toggle quick filter function
      component.applyFilter();
      expect(component.tableFilter).toBeUndefined();
      expect(component.appliedFilters.length).toEqual(1);
      expect(component.filterData).toHaveBeenCalled();

      // Should do nothing since the filter is already applied
      component.tableFilter = cloneDeep(filter);
      component.filterField.setValue('data');
      component.applyFilter();
      expect(component.tableFilter).toBeUndefined();
      expect(component.appliedFilters.length).toEqual(1);
      expect(component.filterData).toHaveBeenCalled();
    });
  });

  describe('filterData()', () => {
    let appliedFilter: TableFilterComponent;

    beforeEach(() => {
      spyOn(component.filteredData, 'emit').and.stub();
      spyOn(component.appliedFiltersChange, 'emit').and.stub();

      appliedFilter = new TableFilterStringComponent(new UntypedFormBuilder());
      appliedFilter.uuid = '1';
      appliedFilter.TableFilter = TableFilterStringComponent;
      appliedFilter.selectedFilterComparator.next(appliedFilter.filterComparators[0]); // IS
      appliedFilter.filterForm.patchValue({ string: 'data' });
      appliedFilter.field = 'data';
    });

    it('should do nothing/ just return the pass in value if it is undefined, has no length, or if there are no applied filters', () => {
      component.data = null;
      component.filterData();
      expect(component.filteredData.emit).toHaveBeenCalledWith([]);
      expect(component.appliedFiltersChange.emit).toHaveBeenCalledWith(component.appliedFilters);

      component.appliedFilters = [];
      component.data = null;
      component.filterData();
      expect(component.filteredData.emit).toHaveBeenCalledWith([]);
      expect(component.appliedFiltersChange.emit).toHaveBeenCalledWith(component.appliedFilters);

      component.appliedFilters = [cloneDeep(appliedFilter)];
      component.data = null;
      component.filterData();
      expect(component.filteredData.emit).toHaveBeenCalledWith([]);
      expect(component.appliedFiltersChange.emit).toHaveBeenCalledWith(component.appliedFilters);

      component.appliedFilters = [cloneDeep(appliedFilter)];
      component.data = [];
      component.filterData();
      expect(component.filteredData.emit).toHaveBeenCalledWith([]);
      expect(component.appliedFiltersChange.emit).toHaveBeenCalledWith(component.appliedFilters);

      component.appliedFilters = [];
      component.data = [{ data: 'data' }, { data: 'data2'} ];
      component.filterData();
      expect(component.filteredData.emit).toHaveBeenCalledWith(component.data);
      expect(component.appliedFiltersChange.emit).toHaveBeenCalledWith(component.appliedFilters);
    });

    it('should filter out any data that does not match the filter criteria', () => {
      component.appliedFilters = [cloneDeep(appliedFilter)];
      component.data = [{ data: 'data' }, { data: 'data2' }];
      const expectedEmit: TableRowData[] = [
        { data: 'data', isFiltered: false, isNotInView: false },
        { data: 'data2', isFiltered: true, isNotInView: false },
      ];
      component.filterData();
      expect(component.filteredData.emit).toHaveBeenCalledWith(expectedEmit);
      expect(component.appliedFiltersChange.emit).toHaveBeenCalledWith(component.appliedFilters);
    });

    it('should update the matching quick filter', () => {
      component.appliedFilters = [cloneDeep(appliedFilter)];
      component.data = [{ data: 'data' }, { data: 'data2'} ];
      component.quickFilters = [ { ...appliedFilter.config, isApplied: false, uuid: undefined }];

      component.filterData();

      expect(component.quickFilters[0].isApplied).toBeTrue();
      expect(component.quickFilters[0].uuid).toEqual(appliedFilter.uuid);
    });

    it('should filter correctly with a nested field', () => {
      component.appliedFilters = [cloneDeep(appliedFilter)];
      component.appliedFilters[0].field = 'nest.field';
      appliedFilter.filterForm.patchValue({ string: 'value2' });
      component.data = [
        { data: 'data', nest: {field: 'value'} },
        { data: 'data2', nest: {field: 'value2'} },
      ];
      const expectedEmit: TableRowData[] = [
        { data: 'data', nest: {field: 'value'}, isFiltered: true, isNotInView: false },
        { data: 'data2', nest: {field: 'value2'}, isFiltered: false, isNotInView: false },
      ];
      component.filterData();
      expect(component.filteredData.emit).toHaveBeenCalledWith(expectedEmit);
      expect(component.appliedFiltersChange.emit).toHaveBeenCalledWith(component.appliedFilters);
    });
  });

  describe('removeFilter()', () => {
    beforeEach(() => {
      const appliedFilter: TableFilterComponent = new TableFilterStringComponent(new UntypedFormBuilder());
      appliedFilter.uuid = '1';
      appliedFilter.filterName = 'ID';
      appliedFilter.field = 'id';
      appliedFilter.TableFilter = TableFilterStringComponent;

      const quickFilter: TableFilterConfig = {
        field: 'id',
        filter: TableFilterStringComponent,
        filterName: 'ID',
        comparatorName: TableFilterStringInputComparator.IS,
        uuid: '2',
        isApplied: true,
        formValues: { string: 'value' },
      };

      component.appliedFilters = [cloneDeep(appliedFilter)];
      component.quickFilters = [cloneDeep(quickFilter)];
    });

    it('should remove the filter if it is found in the list of applied filters and removed matching quick filters', () => {
      component.removeFilter(null as any);
      expect(component.appliedFilters.length).toEqual(2);
      expect(component.quickFilters[0].isApplied).toBeTrue();

      component.removeFilter(new TableFilterComponent(new UntypedFormBuilder()));
      expect(component.appliedFilters.length).toEqual(2);
      expect(component.quickFilters[0].isApplied).toBeTrue();

      component.removeFilter(component.appliedFilters[0]);
      expect(component.appliedFilters.length).toEqual(1);
      expect(component.quickFilters[0].isApplied).toBeTrue();

      component.removeFilter(component.appliedFilters[0]);
      expect(component.appliedFilters).toEqual([]);
      expect(component.quickFilters[0].isApplied).toBeFalse();
    });

    it('should call filterData() if the filterData flag is true and the filter was found', () => {
      spyOn(component, 'filterData').and.callThrough();

      component.removeFilter(new TableFilterComponent(new UntypedFormBuilder()), true);
      expect(component.filterData).not.toHaveBeenCalled();

      component.removeFilter(component.appliedFilters[0], false);
      expect(component.filterData).not.toHaveBeenCalled();

      component.removeFilter(component.appliedFilters[0], true);
      expect(component.filterData).toHaveBeenCalled();
    });
  });

  describe('removeAllFilters()', () => {
    it('should call removeFilter on all visible applied filters', () => {
      spyOn(component, 'removeFilter').and.callThrough();

      const visibleFilter: TableFilterComponent = new TableFilterComponent(new UntypedFormBuilder());
      visibleFilter.uuid = '1';
      visibleFilter.isVisible = true;

      const notVisibleFilter: TableFilterComponent = new TableFilterComponent(new UntypedFormBuilder());
      notVisibleFilter.uuid = '2';
      notVisibleFilter.isVisible = false;

      const filters: TableFilterComponent[] = [visibleFilter, notVisibleFilter];
      component.appliedFilters = cloneDeep(filters);
      component.removeAllFilters();
      expect(component.removeFilter).toHaveBeenCalledWith(filters[0]);
      expect(component.removeFilter).not.toHaveBeenCalledWith(filters[1]);
      expect(component.appliedFilters.length).toEqual(1);
      expect(component.appliedFilters).toEqual([filters[1]]);
    });
  });

  describe('generateFilter()', () => {
    let config: TableFilterConfig;

    beforeEach(() => {
      config = {
        uuid: '1',
        isVisible: true,
        isVisibleInSelector: true,
        filterName: 'name',
        field: 'field',
        comparatorName: TableFilterNumberInputComparator.EQUAL_TO,
        valueTransformFunction: (val: any) => val,
        formValues: {},
        label: 'label',
        filter: TableFilterNumberComponent,
      };
    });

    it('should generate filter based on the provided config', () => {
      let generatedFilter: TableFilterComponent = component.generateFilter(config);
      expect(generatedFilter.TableFilter).toEqual(config.filter);
      expect(generatedFilter.uuid).toEqual(config.uuid as string);

      config.isVisible = undefined;

      generatedFilter = component.generateFilter(config);
      expect(generatedFilter.TableFilter).toEqual(config.filter);
      expect(generatedFilter.isVisible).toBeTrue();
      expect(generatedFilter.uuid).toEqual(config.uuid as string);

      config.isVisibleInSelector = undefined;

      generatedFilter = component.generateFilter(config);
      expect(generatedFilter.TableFilter).toEqual(config.filter);
      expect(generatedFilter.isVisible).toBeTrue();
      expect(generatedFilter.uuid).toEqual(config.uuid as string);

      config.uuid = undefined;

      generatedFilter = component.generateFilter(config);
      expect(generatedFilter.TableFilter).toEqual(config.filter);
      expect(generatedFilter.uuid).toBeTruthy();

      expect(generatedFilter.valueTransformFunction(1)).toEqual(config.valueTransformFunction!(1));
    });

    it('should use the valueTransformFunction of an existing filter', () => {
      config.valueTransformFunction = undefined;

      const filter: TableFilterComponent = new TableFilterComponent(new UntypedFormBuilder());
      filter.valueTransformFunction = (val: any) => val * 2;
      filter.field = 'field';

      const filters: QueryList<TableFilterComponent> = new QueryList<TableFilterComponent>();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      filters['_results'] = [filter, new TableFilterComponent(new UntypedFormBuilder())];
      component.filters = filters;

      const generatedFilter: TableFilterComponent = component.generateFilter(config);
      expect(generatedFilter.valueTransformFunction(1)).toEqual(filter.valueTransformFunction(1));
    });
  });

  describe('menuLogic()', () => {
    it('returns true if the target element grandparent element contains the remove filters button class', () => {
      const grandparent: HTMLElement = document.createElement('div');
      grandparent.setAttribute('class', 'f-table__filter-selector-remove-filter-button');
      const parent: HTMLElement = document.createElement('div');
      const element: HTMLElement = document.createElement('div');

      parent.append(element);
      grandparent.appendChild(parent);
      expect(component.menuLogic(element)).toBeTruthy();

      grandparent.removeAttribute('class');
      expect(component.menuLogic(element)).toBeFalse();
    });

    it('should return false if the provided element is not valid', () => {
      expect(component.menuLogic(null as any)).toEqual(false);
    });
  });

  describe('matchingQuickFilter()', () => {
    it('should return the matching quick filter for the provided filter', () => {
      const quickFilter: TableFilterConfig = {} as TableFilterConfig;

      const filter: TableFilterComponent = new TableFilterNumberComponent(new UntypedFormBuilder());
      filter.uuid = 'uuid';
      filter.field = 'id';
      filter.filterForm.get('number')?.setValue(1);

      // quickFilters and provided filter are undefined
      component.quickFilters = undefined as any;
      expect(component.matchingQuickFilter(undefined as any)).toEqual(undefined as any);

      // quickFilters are undefined
      component.quickFilters = undefined as any;
      expect(component.matchingQuickFilter(filter)).toEqual(undefined as any);

      // quickFilters are empty
      component.quickFilters = [];
      expect(component.matchingQuickFilter(filter)).toEqual(undefined as any);

      // no matches
      quickFilter.uuid = undefined;
      component.quickFilters = [quickFilter];
      expect(component.matchingQuickFilter(filter)).toEqual(undefined as any);

      // no selectedFilterComparator
      filter.selectedFilterComparator.next(filter.filterComparators[0]);
      component.quickFilters = [quickFilter];
      expect(component.matchingQuickFilter(filter)).toEqual(undefined as any);

      // uuid matches
      quickFilter.uuid = 'uuid';
      component.quickFilters = [quickFilter];
      expect(component.matchingQuickFilter(filter)).toEqual(quickFilter);
    });
  });
});
