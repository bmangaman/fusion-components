import { Pipe, PipeTransform } from '@angular/core';

/**
 * PERCENTAGE PIPE
 *
 * The percentage pipe transforms a value to a percentage based on provided maximum and minimum values.
 * If the calculated decimal falls below 0 or exceeds 1, the limit parameter forces the minimum and maximum
 * percentages to 0 and 1, respectively.
 */
@Pipe({
    name: 'percentage',
    standalone: false
})
export class PercentagePipe implements PipeTransform {
  /**
   * Maps the provided value to a percentage (as a decimal). By default is limited between 0 and 1.
   *
   * @param value The value between a max and min value. The current value; used as the numerator.
   * @param maxValue The maxium value to be mapped to 1. The smallest possible number in the range; used to calculate the denominator.
   * @param minValue The minimum value to be mapped to 0. The largest possible number in the range; used to calculate the denominator.
   * @param limit Flag to limit the min output to 0 and the max output to 1. By default is set to true.
   * @returns The mapping of the value as a percent in reference to the provide max and min values.
   */
  // eslint-disable-next-line complexity
  transform(value: number, maxValue: number, minValue: number, limit: boolean = true): number {
    /**
     * Return 0 if:
     *  - any of the provided values are not numbers
     *  - if the value equals the min value
     *  - if the limit flag is set to true and the value is less than or equal to the min value
     */
    if (isNaN(value) || isNaN(maxValue) || isNaN(minValue) || value === minValue || (limit && value <= minValue)) {
      return 0;
    }

    /**
     * Return 1 if:
     *  - the value equals the max value
     *  - the min value equals the max value
     *  - if the limit flag is set to true and the value is greater than or equal to the max value
     */
    if (value === maxValue || (limit && value >= maxValue) || maxValue === minValue) {
      return 1;
    }

    return (value - minValue) / (maxValue - minValue);
  }
}
