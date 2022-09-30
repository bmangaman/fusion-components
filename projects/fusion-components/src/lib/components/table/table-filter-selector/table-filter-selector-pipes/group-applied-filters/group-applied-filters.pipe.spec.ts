import { QueryList } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { cloneDeep } from 'lodash';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services/translation';
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
  let translationService: FusionComponentsTranslationService;
  let translateService: TranslateService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    translateService = ComponentStubFactory.getTranslateServiceStub();
    pipe = new GroupAppliedFiltersPipe();
    generateFilters();
  });

  it('should return an empty array if either the provided appliedFilters or filters are undefined or empty', () => {
    expect(pipe.transform(undefined, undefined)).toEqual([]);
    expect(pipe.transform([], new QueryList<TableFilterComponent>())).toEqual([]);

    expect(pipe.transform(undefined, new QueryList<TableFilterComponent>())).toEqual([]);
    expect(pipe.transform(undefined, filters)).toEqual([]);
    expect(pipe.transform([], filters)).toEqual([]);

    expect(pipe.transform([], undefined)).toEqual([]);
    expect(pipe.transform(appliedFilters, undefined)).toEqual([]);
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
      new TableFilterStringComponent(new UntypedFormBuilder(), translationService, translateService);
    stringFilter.filterName = 'name';
    stringFilter.field = 'name';
    stringFilter.isVisible = true;

    const numberFilter: TableFilterNumberComponent =
      new TableFilterNumberComponent(new UntypedFormBuilder(), translationService, translateService);
    numberFilter.filterName = 'count';
    numberFilter.field = 'count';
    numberFilter.isVisible = true;

    const bytesFilter: TableFilterBytesComponent = new TableFilterBytesComponent(new UntypedFormBuilder(), translationService, translateService);
    bytesFilter.filterName = 'size';
    bytesFilter.field = 'size';
    bytesFilter.isVisible = false;

    const ipFilter: TableFilterIpComponent = new TableFilterIpComponent(new UntypedFormBuilder(), translationService, translateService);
    ipFilter.filterName = 'ip';
    ipFilter.field = 'ip';
    ipFilter.isVisible = true;

    // eslint-disable-next-line @typescript-eslint/dot-notation
    filters['_results'] = [stringFilter, numberFilter, bytesFilter, ipFilter];

    const appliedStringFilter = cloneDeep(stringFilter);
    appliedStringFilter.filterForm.get('string').setValue('string');

    const appliedStringFilter2 = cloneDeep(stringFilter);
    appliedStringFilter.filterForm.get('string').setValue('string2');

    const appliedNumberFilter = cloneDeep(numberFilter);
    appliedNumberFilter.filterForm.get('number').setValue(100);

    const appliedBytesFilter = cloneDeep(bytesFilter);
    appliedNumberFilter.filterForm.get('number').setValue(1000);

    appliedFilters = [
      appliedStringFilter,
      appliedNumberFilter,
      appliedBytesFilter,
      appliedStringFilter2,
    ];
  }
});
