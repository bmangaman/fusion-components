import { fakeAsync, tick } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { Utilities } from '../../shared/utilities';
import { DEFAULT_FUSION_TRANSLATIONS, FusionTranslations } from './translation.interface';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let subscriptions: Subscription[] = [];

  beforeEach(() => {
    service = new TranslationService();
  });

  it('should have default translations', () => {
    expect(service.translations).toEqual(DEFAULT_FUSION_TRANSLATIONS);
    subscriptions.push(
      service.translations$.subscribe((translations: FusionTranslations) => {
        expect(translations).toEqual(DEFAULT_FUSION_TRANSLATIONS);
      })
    );
  });

  it('should allow custom translations to be set', fakeAsync(() => {
    const expectedResult: FusionTranslations = {} as FusionTranslations;

    service.translations = {} as FusionTranslations;

    tick();

    expect(service.translations).toEqual(expectedResult);

    subscriptions.push(
      service.translations$.subscribe((translations: FusionTranslations) => {
        expect(translations).toEqual(expectedResult);
      })
    );
  }));

  afterEach(() => {
    Utilities.unsubscribeAll(subscriptions);
  });
});
