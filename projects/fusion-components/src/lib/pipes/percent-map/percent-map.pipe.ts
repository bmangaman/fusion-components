import { Pipe, PipeTransform } from '@angular/core';

/**
 * PERCENT MAP PIPE
 *
 * The percent-map pipe maps a value based on the provied min and max values to a value in between 0 and 100.
 */
@Pipe({ name: 'percentMap' })
export class PercentMapPipe implements PipeTransform {
  /**
   * Maps the provided value to a 0 to 100 percentage
   *
   * @param value the value between a max and min value
   * @param maxValue the maxium value to be mapped to 100
   * @param minValue the minimum value to be mapped to 0
   * @returns the mapping of the value as a percent in reference to the provide max and min values, either a number or string
   */
  transform(
    value: number,
    maxValue: number = 100,
    minValue: number = 0,
  ): number {
    if (!value && value !== 0) {
      return 0;
    }

    const range: number = Math.abs(maxValue - minValue);
    const diff: number = Math.abs(range - maxValue);
    const percentValue: number = Math.ceil(100 * (value + diff) / (maxValue + diff));
    const result: number = Math.min(100, Math.max(0, percentValue));
    return result;
  }
}
