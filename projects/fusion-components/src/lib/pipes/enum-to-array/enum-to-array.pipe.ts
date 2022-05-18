import { Pipe, PipeTransform } from '@angular/core';

/**
 * ENUM TO ARRAY PIPE
 *
 * The enum-to-array pipe converts a provided enum to an array of either the enum KEYs or VALUEs.
 */
@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {

  /**
   * Converts the provided enum Object to either an array of the enum's KEYs or VALUEs.
   *
   * @param data the enum
   * @param returnValues if true, returns an array of the enum's VALUES, otherwise, return an array of the enum's KEYS
   * @returns either an array of strings or numbers (that either the enum's KEYs oor VALUEs)
   */
  transform(data: Record<string, any>, returnValues: boolean = true): (string | number)[] {
    const stringIsNumber = (value: any): boolean => isNaN(Number(value));

    const keys: string[] = Object.keys(data).filter(stringIsNumber);
    const values: (string | number)[] = keys.map((k: string) => data[k]);

    return returnValues ? values : keys;
  }
}
