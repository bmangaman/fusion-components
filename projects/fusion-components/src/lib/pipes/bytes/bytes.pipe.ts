import { Pipe, PipeTransform } from '@angular/core';

import { EnumToArrayPipe } from '@fusion-components/lib/pipes/enum-to-array';
import { BiBytesUnit, BytesUnit } from '@fusion-components/lib/shared';

import { BytesPipeBase } from './bytes.interface';

/**
 * BYTES PIPE
 *
 * The bytes pipe provides a quick way to convert bytes to another unit based on the base.
 * It allows the following controls:
 *  - whether or not to return the unit (e.g. KB, GiB)
 *  - the base, either TEN (1000) or two (1024)
 *  - the precision (how many places after the decimal are displayed)
 */
@Pipe({ name: 'bytes' })
export class BytesPipe implements PipeTransform {
  readonly enumToArrayPipe: EnumToArrayPipe = new EnumToArrayPipe();
  private byteSizes: string[];
  private biByteSizes: string[];

  constructor() {
    this.byteSizes = this.enumToArrayPipe.transform(BytesUnit) as string[];
    this.biByteSizes = this.enumToArrayPipe.transform(BiBytesUnit) as string[];
  }

  /**
   * Transforms the provided bytes value to the largest byte-unit that is >= 1.
   *
   * @param bytes the bytes to be converted
   * @param base the base to use to calculate the transformed value; default is TWO (1024)
   * @param includeUnit flag to determine whether or not to include the unit (e.g. KB, GiB); default is true
   * @param precision the maximum number of places after the decimal to be returned (e.g. 2 => 1000.25)
   * @returns either a string with the converted bytes value and the unit, or a number of just the converted bytes value
   */
  transform(
    bytes: number,
    base: BytesPipeBase = BytesPipeBase.TWO,
    includeUnit: boolean = true,
    precision: number = 2,
  ): string | number {
    if (!bytes && bytes !== 0) {
      return '-';
    }

    if (bytes === 0) {
      return includeUnit ? '0 B' : bytes;
    }

    const isBaseTen: boolean = base === BytesPipeBase.TEN;
    const unit: number = isBaseTen ? Math.floor(Math.log(bytes) / Math.log(1000)) : Math.floor(Math.log2(bytes) / Math.log2(1024));
    const value: number = +(bytes / (isBaseTen ? Math.pow(1000, unit) : Math.pow(1024, unit))).toFixed(precision);
    const unitValue: string = isBaseTen ? this.byteSizes[unit] : this.biByteSizes[unit];

    return includeUnit ? `${value} ${unitValue}` : value;
  }
}
