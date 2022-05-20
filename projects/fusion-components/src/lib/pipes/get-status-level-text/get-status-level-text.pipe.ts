import { Pipe, PipeTransform } from '@angular/core';

import {
  DEFAULT_STATUS_LEVEL_TRANSLATIONS,
  StatusLevel,
  FusionUIStatusLevelTranslations,
} from '@fusion-components/lib/shared';

/**
 * GET FUSION UI LEVEL TEXT PIPE
 *
 * The Get Fusion UI Level Text Pipe returns the text to be display based on the provided level and translations.
 * Used with the linear gauge and card components. It will use a custom stranslated string if provided, but otherwise
 * will just use the default English string.
 */
@Pipe({ name: 'getStatusLevelText' })
export class GetStatusLevelTextPipe implements PipeTransform {
  /**
   * Transforms the provided level to a string for use in the linear gauge component.
   *
   * @param level The fusion ui level (base, normal, warning, error, critical, etc).
   * @param translations The custom translations for the linear gauge component.
   * @param toLowerCase The flag to set the string to all lowercase.
   * @returns The level as a string.
   */
  transform(level: StatusLevel, translations?: FusionUIStatusLevelTranslations, toLowerCase: boolean = false): string {
    const levelString: string = (translations && translations[level]) || DEFAULT_STATUS_LEVEL_TRANSLATIONS[level] || '';
    return toLowerCase ? levelString.toLocaleLowerCase() : levelString;
  }
}
