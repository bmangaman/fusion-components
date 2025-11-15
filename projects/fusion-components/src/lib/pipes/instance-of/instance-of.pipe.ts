import { Pipe, PipeTransform } from '@angular/core';

/**
 * INSTANCE OF PIPE
 *
 * The Instance Of Pipe checks to see if the provided item is an instance of the provided interface, class, type, etc.
 */
@Pipe({
    name: 'instanceOf',
    standalone: false
})
export class InstanceOfPipe implements PipeTransform {

  /**
   * Checks to see if the provided item is an instance of the provided interface, class, type, etc.
   *
   * @param item The item to be checked.
   * @param instanceOf The type to check against.
   * @returns True if the item is an instance of, false otherwise.
   */
  transform(item: any, instanceOf: any): boolean {
    return !!item && !!instanceOf && item instanceof instanceOf;
  }
}
