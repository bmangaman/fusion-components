import { QueryList } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

import { cloneDeep } from 'lodash-es';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import {
  TableFilterBytesComponent,
  TableFilterComponent,
  TableFilterIpComponent,
  TableFilterNumberComponent,
  TableFilterStringComponent,
} from '../../../table-filters';
import { AppliedFilterGroup } from './group-applied-filters.interface';
import { GroupAppliedFiltersPipe } from './group-applied-filters.pipe';

describe('GroupAppliedFiltersPipe', () => {
  const filters: QueryList<TableFilterComponent> = new QueryList<TableFilterComponent>();
  let appliedFilters: TableFilterComponent[];
  let pipe: GroupAppliedFiltersPipe;

  beforeEach(() => {
    pipe = new GroupAppliedFiltersPipe();
    generateFilters();
  });

  it('should return an empty array if either the provided appliedFilters or filters are undefined or empty', () => {
    expect(pipe.transform(undefined as any, undefined as any)).toEqual([]);
    expect(pipe.transform([], new QueryList<TableFilterComponent>())).toEqual([]);

    expect(pipe.transform(undefined as any, new QueryList<TableFilterComponent>())).toEqual([]);
    expect(pipe.transform(undefined as any, filters)).toEqual([]);
    expect(pipe.transform([], filters)).toEqual([]);

    expect(pipe.transform([], undefined as any)).toEqual([]);
    expect(pipe.transform(appliedFilters, undefined as any)).toEqual([]);
    expect(pipe.transform(appliedFilters, new QueryList<TableFilterComponent>())).toEqual([]);
  });

  it('should have a filter group for each visible filter that has any applied filters', () => {
    appliedFilters[0].filterName = 'wrongName';
    const expectedResult: AppliedFilterGroup[] = [
      {
        filterName: 'name',
        applications: [appliedFilters[0], appliedFilters[3]],
      },
      {
        filterName: 'count',
        applications: [appliedFilters[1]],
      },
    ];
    expect(pipe.transform(appliedFilters, filters)).toEqual(expectedResult);
  });

  /**
   * Helper function that generates the filter and applied filters to use for testing.
   */
  function generateFilters(): void {
    const stringFilter: TableFilterStringComponent =
      new TableFilterStringComponent(new UntypedFormBuilder());
    stringFilter.filterName = 'name';
    stringFilter.field = 'name';
    stringFilter.isVisible = true;

    const numberFilter: TableFilterNumberComponent =
      new TableFilterNumberComponent(new UntypedFormBuilder());
    numberFilter.filterName = 'count';
    numberFilter.field = 'count';
    numberFilter.isVisible = true;

    const bytesFilter: TableFilterBytesComponent = new TableFilterBytesComponent(new UntypedFormBuilder());
    bytesFilter.filterName = 'size';
    bytesFilter.field = 'size';
    bytesFilter.isVisible = false;

    const ipFilter: TableFilterIpComponent = new TableFilterIpComponent(new UntypedFormBuilder());
    ipFilter.filterName = 'ip';
    ipFilter.field = 'ip';
    ipFilter.isVisible = true;

    // eslint-disable-next-line @typescript-eslint/dot-notation
    filters['_results'] = [stringFilter, numberFilter, bytesFilter, ipFilter];

    const appliedStringFilter = cloneDeep(stringFilter);
    appliedStringFilter.filterForm.get('string')?.setValue('string');

    const appliedStringFilter2 = cloneDeep(stringFilter);
    appliedStringFilter.filterForm.get('string')?.setValue('string2');

    const appliedNumberFilter = cloneDeep(numberFilter);
    appliedNumberFilter.filterForm.get('number')?.setValue(100);

    const appliedBytesFilter = cloneDeep(bytesFilter);
    appliedNumberFilter.filterForm.get('number')?.setValue(1000);

    appliedFilters = [
      appliedStringFilter,
      appliedNumberFilter,
      appliedBytesFilter,
      appliedStringFilter2,
    ];
  }
});
