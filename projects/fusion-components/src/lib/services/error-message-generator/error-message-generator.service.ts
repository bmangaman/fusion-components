import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { ErrorMessage } from '../../components/error-message/error-message.interface';
import {
  ErrorMessageGeneratorConfig,
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
  /**
   * Uses the generateError function to generate and return a required error message based on the optional configuration provided.
   *
   * @param config Optional configuration to update the priority, error, or text.
   * @returns The generated error message.
   */
  required(config: ErrorMessageGeneratorConfig): ErrorMessage {
    return this.generateError(config, 'required');
  }

  /**
   * Uses the generateError function to generate and return a minlength error message based on the optional configuration provided.
   *
   * @param config Optional configuration to update the priority, error, or text.
   * @returns The generated error message.
   */
  minLength(config: ErrorMessageMinlengthGeneratorConfig): ErrorMessage {
    return this.generateError(config, 'minlength');
  }

  /**
   * Uses the generateError function to generate and return a maxlength error message based on the optional configuration provided.
   *
   * @param config Optional configuration to update the priority, error, or text.
   * @returns The generated error message.
   */
  maxLength(config: ErrorMessageMaxlengthGeneratorConfig): ErrorMessage {
    return this.generateError(config, 'maxlength');
  }

  /**
   * Generates an error message based on the provided default error and config.
   *
   * @param config Optional. The custom config.
   * @param defaultError Optional. The default error (associated with react validator).
   * @returns The generated error message.
   */
  generateError(config: ErrorMessageGeneratorConfig, defaultError?: string): ErrorMessage {
    const priority: number | undefined = config?.priority;
    const error: string = config?.error || defaultError || '';
    const translation: Observable<string | SafeHtml> = config?.translation || of('');

    return { priority, translation, error };
  }
}
