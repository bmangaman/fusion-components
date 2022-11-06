import { SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { ErrorMessage } from '../../components/error-message/error-message.interface';
import { ErrorMessageGeneratorService } from './error-message-generator.service';
import {
  ErrorMessageGeneratorConfig,
  ErrorMessageMaxlengthGeneratorConfig,
  ErrorMessageMinlengthGeneratorConfig,
} from './error-message-generator.service.interface';

describe('ErrorMessageGenerator', () => {
  let service: ErrorMessageGeneratorService;

  beforeEach(() => {
    service = new ErrorMessageGeneratorService();
  });

  describe('specific error message generators', () => {
    let defaultError: string;
    let config: ErrorMessageGeneratorConfig;
    let result: ErrorMessage;
    let expectedResult: ErrorMessage;

    beforeEach(() => {
      defaultError = '';
      config = undefined as any;
      result = undefined as any;
      expectedResult = undefined as any;
    });

    describe('required()', () => {
      beforeEach(() => {
        defaultError = 'required';
      });

      it('should create an error message with the default values if no config was provided', () => {
        expectedResult = {
          priority: undefined,
          error: defaultError,
          translation: of('required'),
        };

        result = service.required(null as any);
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});

        result = service.required(undefined as any);
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});

        result = service.required({});
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});
      });

      it('should create an error message using the provided config', () => {
        config = {
          priority: 1,
          error: 'custom error',
          translation: of('custom translation'),
        };

        expectedResult = {
          priority: config.priority,
          error: config.error as string,
          translation: config.translation as Observable<string>,
        };

        result = service.required(config);
        expect(result).toEqual(expectedResult);
      });
    });

    describe('minlength()', () => {
      beforeEach(() => {
        defaultError = 'minlength';
      });

      it('should create an error message with the default values if no config was provided', () => {
        expectedResult = {
          priority: undefined,
          error: defaultError,
          translation: of('minLength'),
        };

        result = service.minLength(null as any);
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});

        result = service.minLength(undefined as any);
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});

        result = service.minLength({});
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});
      });

      it('should create an error message using the provided config', () => {
        config = {
          priority: 1,
          error: 'custom error',
          translation: of('custom translation'),
        };

        expectedResult = {
          priority: config.priority,
          error: config.error as string,
          translation: config.translation as Observable<string>,
        };

        result = service.minLength(config as ErrorMessageMinlengthGeneratorConfig);
        expect(result).toEqual(expectedResult);
      });
    });

    describe('maxlength()', () => {
      beforeEach(() => {
        defaultError = 'maxlength';
      });

      it('should create an error message with the default values if no config was provided', () => {
        expectedResult = {
          priority: undefined,
          error: defaultError,
          translation: of('maxLength'),
        };

        result = service.maxLength(null as any);
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});

        result = service.maxLength(undefined as any);
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});

        result = service.maxLength({});
        expect(result).toEqual({ ...expectedResult, translation: jasmine.any(Observable)});
      });

      it('should create an error message using the provided config', () => {
        config = {
          priority: 1,
          error: 'custom error',
          translation: of('custom translation'),
        };

        expectedResult = {
          priority: config.priority,
          error: config.error as string,
          translation: config.translation as Observable<string>,
        };

        result = service.maxLength(config as ErrorMessageMaxlengthGeneratorConfig);
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
