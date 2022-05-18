import { Pipe, PipeTransform } from '@angular/core';

import {
  DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS,
  FusionUiStatusLevel,
  FusionUIStatusLevelTranslations,
} from '@fusion-ui/fusion-components/lib/shared';

/**
 * GET FUSION UI LEVEL TEXT PIPE
 *
 * The Get Fusion UI Level Text Pipe returns the text to be display based on the provided level and translations.
 * Used with the linear gauge and card components. It will use a custom stranslated string if provided, but otherwise
 * will just use the default English string.
 */
@Pipe({ name: 'getFusionUiStatusLevelText' })
export class GetFusionUiStatusLevelTextPipe implements PipeTransform {
  /**
   * Transforms the provided level to a string for use in the linear gauge component.
   *
   * @param level The fusion ui level (base, normal, warning, error, critical, etc).
   * @param translations The custom translations for the linear gauge component.
   * @param toLowerCase The flag to set the string to all lowercase.
   * @returns The level as a string.
   */
  transform(level: FusionUiStatusLevel, translations?: FusionUIStatusLevelTranslations, toLowerCase: boolean = false): string {
    const levelString: string = (translations && translations[level]) || DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS[level] || '';
    return toLowerCase ? levelString.toLocaleLowerCase() : levelString;
  }
}
