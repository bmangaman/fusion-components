import { Pipe, PipeTransform } from '@angular/core';

import { PipeItem } from './meta.interface';

/**
 * META PIPE
 *
 * The Meta Pipe loops through the provided PipeItems (pipes and any additional arguments) and
 * transforms the provided value by each pipe.
 *
 * The Meta Pipe has two (2) primary uses:
 *  1. an easy to way to apply multiple pipes to a single piece of data
 *  2. a clean way to apply a pipe (or pipes) dynamically based on the provided inputs
 *     (used in LinearGaugeComponent to apply custom pipes within the component)
 */
@Pipe({
    name: 'meta',
    standalone: false
})
export class MetaPipe implements PipeTransform {

  /**
   * Loops through the provided pipes and applys each one to the provided value.
   *
   * @param val The original value to which the pipes are applied.
   * @param pipes The pipe configurations applied to the original value.
   * @returns The transformed value.
   */
  transform(val: any, pipes: PipeItem[]): any {
    let result: any = val;

    if (pipes && !!pipes.length) {
      pipes.forEach((pipeItem: PipeItem) => {
        if (!!pipeItem) {
          result = !!pipeItem.values ? pipeItem.pipe.transform(result, ...pipeItem.values) : pipeItem.pipe.transform(result);
        }
      });
    }

    return result;
  }
}
