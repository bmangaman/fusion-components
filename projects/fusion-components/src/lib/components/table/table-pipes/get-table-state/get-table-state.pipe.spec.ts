import { State } from '@fusion-components/lib/shared';
import { GetTableStatePipe } from './get-table-state.pipe';

describe('GetTableStatePipe', () => {
  let pipe: GetTableStatePipe;

  beforeEach(() => {
    pipe = new GetTableStatePipe();
  });

  describe('transform()', () => {
    it('should return the passed in state if the state is NOT loaded and there are results', () => {
      expect(pipe.transform(State.ERROR, true)).toEqual(State.ERROR);
      expect(pipe.transform(State.ERROR, false)).toEqual(State.ERROR);

      expect(pipe.transform(State.NOT_LOADED, true)).toEqual(State.NOT_LOADED);
      expect(pipe.transform(State.NOT_LOADED, false)).toEqual(State.NOT_LOADED);

      expect(pipe.transform(State.LOADING, true)).toEqual(State.LOADING);
      expect(pipe.transform(State.LOADING, false)).toEqual(State.LOADING);

      expect(pipe.transform(State.NO_RESULTS, true)).toEqual(State.NO_RESULTS);
      expect(pipe.transform(State.NO_RESULTS, false)).toEqual(State.NO_RESULTS);

      expect(pipe.transform(State.LOADED, false)).toEqual(State.LOADED);
    });

    it('should return NO_RESULTS state if the state is LOADED and there are NO results', () => {
      expect(pipe.transform(State.LOADED, true)).toEqual(State.NO_RESULTS);
    });
  });
});
