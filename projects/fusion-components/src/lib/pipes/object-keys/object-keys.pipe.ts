import { Pipe, PipeTransform } from '@angular/core';

/**
 * OBJECT KEYS PIPE
 *
 * The object-keys pipe returns all the keys of an object as an array of strings.
 */
@Pipe({
    name: 'objectKeys',
    standalone: false
})
export class ObjectKeysPipe implements PipeTransform {

  /**
   * Converts the provided object into an array of its keys.
   *
   * @param object the object from which to grab the keys
   * @returns an array of the provided object's keys
   */
  transform(object: Record<string, any>): string[] {
    if (!object) {
      return [];
    }

    return Object.keys(object);
  }
}
