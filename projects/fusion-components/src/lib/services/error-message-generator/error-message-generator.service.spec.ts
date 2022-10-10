import { SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services/translation';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { ErrorMessage } from '../../components/error-message/error-message.interface';
import { ErrorMessageGeneratorService } from './error-message-generator.service';
import {
  ErrorMessageGeneratorConfig,
  ErrorMessageGeneratorTranslationConfig,
  ErrorMessageMaxlengthGeneratorConfig,
  ErrorMessageMinlengthGeneratorConfig,
} from './error-message-generator.service.interface';

describe('ErrorMessageGenerator', () => {
  let service: ErrorMessageGeneratorService;
  let translationService: FusionComponentsTranslationService;
  let translateService: TranslateService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    translateService = ComponentStubFactory.getTranslateServiceStub();
    service = new ErrorMessageGeneratorService(translationService, translateService);

    translationService.baseTranslationKey = 'components';
  });

  describe('specific error message generators', () => {
    let defaultError: string;
    let config: ErrorMessageGeneratorConfig;
    let result: ErrorMessage;
    let expectedResult: ErrorMessage;
    let getTranslationSpy: jasmine.Spy;
    let getTranslationObservable: Observable<string | SafeHtml>;

    beforeEach(() => {
      defaultError = '';
      config = undefined as any;
      result = undefined as any;
      expectedResult = undefined as any;
      getTranslationObservable = of('get translation observable');
      getTranslationSpy = spyOn((service as any), 'getTranslation').and.returnValue(getTranslationObservable);
    });

    describe('required()', () => {
      beforeEach(() => {
        defaultError = 'required';
      });

      it('should create an error message with the default values if no config was provided', () => {
        expectedResult = {
          priority: undefined,
          error: defaultError,
          translation: getTranslationObservable,
        };

        result = service.required(null as any);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);

        result = service.required(undefined as any);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);

        result = service.required({});
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);
      });

      it('should create an error message using the provided config', () => {
        config = {
          priority: 1,
          error: 'custom error',
          translation: of('custom translation'),
          translationConfig: {},
        };

        expectedResult = {
          priority: config.priority,
          error: config.error as string,
          translation: config.translation as Observable<string>,
        };

        result = service.required(config);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).not.toHaveBeenCalled();
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
          translation: getTranslationObservable,
        };

        result = service.minLength(null as any);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);

        result = service.minLength(undefined as any);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);

        result = service.minLength({});
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);
      });

      it('should create an error message using the provided config', () => {
        config = {
          priority: 1,
          error: 'custom error',
          translation: of('custom translation'),
          translationConfig: {
            min: 5,
          },
        };

        expectedResult = {
          priority: config.priority,
          error: config.error as string,
          translation: config.translation as Observable<string>,
        };

        result = service.minLength(config as ErrorMessageMinlengthGeneratorConfig);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).not.toHaveBeenCalled();
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
          translation: getTranslationObservable,
        };

        result = service.maxLength(null as any);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);

        result = service.maxLength(undefined as any);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);

        result = service.maxLength({});
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).toHaveBeenCalledWith(undefined, defaultError);
      });

      it('should create an error message using the provided config', () => {
        config = {
          priority: 1,
          error: 'custom error',
          translation: of('custom translation'),
          translationConfig: {
            max: 5,
          },
        };

        expectedResult = {
          priority: config.priority,
          error: config.error as string,
          translation: config.translation as Observable<string>,
        };

        result = service.maxLength(config as ErrorMessageMaxlengthGeneratorConfig);
        expect(result).toEqual(expectedResult);
        expect(getTranslationSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('getTranslation()', () => {
    it('should call the translateService with a generated key based on the provided config and error', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      const error = 'error';
      let config: ErrorMessageGeneratorTranslationConfig;

      config = { isPlural: true };
      service['getTranslation'](config, error);
      expect(translateService.get).toHaveBeenCalledWith(
        'components.errorMessage.error.plural',
        config,
      );

      config.isPlural = false;
      service['getTranslation'](config, error);
      expect(translateService.get).toHaveBeenCalledWith(
        'components.errorMessage.error.singular',
        config,
      );

      config = undefined as any;
      service['getTranslation'](config, error);
      expect(translateService.get).toHaveBeenCalledWith(
        'components.errorMessage.error.singular',
        config,
      );

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });
});
