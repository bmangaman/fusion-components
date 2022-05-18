import { FusionUiState } from '@fusion-ui/fusion-components/lib/shared';
import { GetTableStatePipe } from './get-table-state.pipe';

describe('GetTableStatePipe', () => {
  let pipe: GetTableStatePipe;

  beforeEach(() => {
    pipe = new GetTableStatePipe();
  });

  describe('transform()', () => {
    it('should return the passed in state if the state is NOT loaded and there are results', () => {
      expect(pipe.transform(FusionUiState.ERROR, true)).toEqual(FusionUiState.ERROR);
      expect(pipe.transform(FusionUiState.ERROR, false)).toEqual(FusionUiState.ERROR);

      expect(pipe.transform(FusionUiState.NOT_LOADED, true)).toEqual(FusionUiState.NOT_LOADED);
      expect(pipe.transform(FusionUiState.NOT_LOADED, false)).toEqual(FusionUiState.NOT_LOADED);

      expect(pipe.transform(FusionUiState.LOADING, true)).toEqual(FusionUiState.LOADING);
      expect(pipe.transform(FusionUiState.LOADING, false)).toEqual(FusionUiState.LOADING);

      expect(pipe.transform(FusionUiState.NO_RESULTS, true)).toEqual(FusionUiState.NO_RESULTS);
      expect(pipe.transform(FusionUiState.NO_RESULTS, false)).toEqual(FusionUiState.NO_RESULTS);

      expect(pipe.transform(FusionUiState.LOADED, false)).toEqual(FusionUiState.LOADED);
    });

    it('should return NO_RESULTS state if the state is LOADED and there are NO results', () => {
      expect(pipe.transform(FusionUiState.LOADED, true)).toEqual(FusionUiState.NO_RESULTS);
    });
  });
});
