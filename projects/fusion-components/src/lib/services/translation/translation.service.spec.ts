import { Subscription } from 'rxjs';

import { unsubscribeAll } from '../../shared/utilities';
import { DEFAULT_FUSION_TRANSLATIONS, FusionTranslations } from './translation.interface';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let subscriptions: Subscription[] = [];

  beforeEach(() => {
    service = new TranslationService();
  });

  it('should have default translations', () => {
    expect(service.transitions).toEqual(DEFAULT_FUSION_TRANSLATIONS);
    subscriptions.push(
      service.translations$.subscribe((translations: FusionTranslations) => {
        expect(translations).toEqual(DEFAULT_FUSION_TRANSLATIONS);
      })
    );
  });

  it('should allow custom translations to be set', () => {
    const expectedResult: FusionTranslations = {} as FusionTranslations;

    service.transitions = {} as FusionTranslations;
    expect(service.transitions).toEqual(expectedResult);
    subscriptions.push(
      service.translations$.subscribe((translations: FusionTranslations) => {
        expect(translations).toEqual(expectedResult);
      })
    );
  });

  afterEach(() => {
    unsubscribeAll(subscriptions);
  });
});
