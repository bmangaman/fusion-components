import { of, take } from 'rxjs';

import { GetComparatorLabelPipe } from './get-comparator-label.pipe';
import { FilterComparator } from '../../table-filters';

describe('GetTableStatePipe', () => {
  let pipe: GetComparatorLabelPipe;

  beforeEach(() => {
    pipe = new GetComparatorLabelPipe();
  });

  describe('transform()', () => {
    it('should convert the table filter comparator label to an observable', (done: DoneFn) => {
      const comparator: FilterComparator = { label: 'label' } as FilterComparator;

      pipe.transform(comparator).pipe(take(1)).subscribe((label: string) => {
        expect(label).toEqual('label');
        done();
      });
    });

    it('should return the table filter comparator label if it is already an observable', (done: DoneFn) => {
      const comparator: FilterComparator = { label: of('label') } as FilterComparator;

      pipe.transform(comparator).pipe(take(1)).subscribe((label: string) => {
        expect(label).toEqual('label');
        done();
      });
    });
  });
});
