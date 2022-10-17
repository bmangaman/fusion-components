import { UntypedFormBuilder } from '@angular/forms';

import { TableFilterComponent, TableFilterStringComponent } from '../../../table-filters';
import { VisibleAppliedFiltersPipe } from './visible-applied-filters.pipe';

describe('VisibleAppliedFiltersPipe', () => {
  let filters: TableFilterComponent[];
  let pipe: VisibleAppliedFiltersPipe;

  beforeEach(() => {
    pipe = new VisibleAppliedFiltersPipe();
    generateFilters();
  });

  it('should return an empty array if either the provided filters are undefined or empty', () => {
    expect(pipe.transform(undefined as any)).toEqual([]);
    expect(pipe.transform([])).toEqual([]);
  });

  it('should return all the filters that are visible', () => {
    const expectedResult: TableFilterComponent[] = [filters[0], filters[1]];
    expect(pipe.transform(filters)).toEqual(expectedResult);
  });

  /**
   * Helper function that generates the filters to use for testing.
   */
  function generateFilters(): void {
    const stringFilter: TableFilterStringComponent =
      new TableFilterStringComponent(new UntypedFormBuilder());
    stringFilter.filterName = 'name';
    stringFilter.isVisible = true;

    const stringFilter2: TableFilterStringComponent =
      new TableFilterStringComponent(new UntypedFormBuilder());
    stringFilter2.filterName = 'name2';
    stringFilter2.isVisible = true;

    const stringFilter3: TableFilterStringComponent =
      new TableFilterStringComponent(new UntypedFormBuilder());
    stringFilter3.filterName = 'name3';
    stringFilter3.isVisible = false;

    filters = [stringFilter, stringFilter2, stringFilter3];
  }
});
