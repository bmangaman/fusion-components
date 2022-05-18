import { Pipe, PipeTransform } from '@angular/core';

import { FusionUiState } from '@fusion-ui/fusion-components/lib/shared';

/**
 * GET TABLE STATE PIPE
 *
 * The Get Table State Pipe gets the final state of the table based on the input value and
 * the number of data points (if any).
 */
@Pipe({name: 'getTableState'})
export class GetTableStatePipe implements PipeTransform {

  /**
   * If the state is LOADED and there are no results, return NO_RESULTS;
   * Otherwise, return the provided state.
   *
   * @param state The state of the table (the input value).
   * @param noResults The noResults flag of the table.
   */
  transform(state: FusionUiState, noResults: boolean): FusionUiState {
    return state === FusionUiState.LOADED && noResults ? FusionUiState.NO_RESULTS : state;
  }
}
