import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ErrorMessage } from '../../components/error-message/error-message.interface';
import { FusionComponentsTranslationService } from '../translation';
import {
  ErrorMessageGeneratorConfig,
  ErrorMessageGeneratorTranslationConfig,
  ErrorMessageMaxlengthGeneratorConfig,
  ErrorMessageMinlengthGeneratorConfig,
} from './error-message-generator.service.interface';

/**
 * ERROR MESSAGE GENERATOR SERVICE
 *
 * The Error Message Generator Service provides a quick and easy way to generate and set error messages for
 * the error message component.
 */
@Injectable()
export class ErrorMessageGeneratorService {
  constructor(
    private translationService: FusionComponentsTranslationService,
    private translateService: TranslateService,
  ) {}

  /**
   * Uses the generateError function to generate and return a required error message based on the optional configuration provided.
   *
   * @param config Optional configuration to update the priority, error, or text.
   * @returns The generated error message.
   */
  required(config?: ErrorMessageGeneratorConfig): ErrorMessage {
    return this.generateError(config, 'required');
  }

  /**
   * Uses the generateError function to generate and return a minlength error message based on the optional configuration provided.
   *
   * @param config Optional configuration to update the priority, error, or text.
   * @returns The generated error message.
   */
  minLength(config?: ErrorMessageMinlengthGeneratorConfig): ErrorMessage {
    return this.generateError(config, 'minlength');
  }

  /**
   * Uses the generateError function to generate and return a maxlength error message based on the optional configuration provided.
   *
   * @param config Optional configuration to update the priority, error, or text.
   * @returns The generated error message.
   */
  maxLength(config?: ErrorMessageMaxlengthGeneratorConfig): ErrorMessage {
    return this.generateError(config, 'maxlength');
  }

  /**
   * Generates an error message based on the provided default error and config.
   *
   * @param config Optional. The custom config.
   * @param defaultError Optional. The default error (associated with react validator).
   * @returns The generated error message.
   */
  generateError(config?: ErrorMessageGeneratorConfig, defaultError?: string): ErrorMessage {
    const priority: number = config?.priority;
    const error: string = config?.error || defaultError;
    const translation: Observable<string | SafeHtml> = config?.translation || this.getTranslation(config?.translationConfig, error);

    return { priority, translation, error };
  }

  /**
   * Returns the desired text to be displayed.
   * Supports both plural and singular translations by setting isPlural in the translationConfig.
   *
   * @param config The error message generator config.
   * @returns The generated translation based on the provided config and error.
   */
  private getTranslation(translationConfig: ErrorMessageGeneratorTranslationConfig, error: string): Observable<string | SafeHtml> {
    const translationKey = `${this.translationService.baseTranslationKey}.errorMessage.${error}.${translationConfig?.isPlural ? 'plural' : 'singular'}`;
    return this.translateService.get(translationKey, translationConfig);
  }
}
