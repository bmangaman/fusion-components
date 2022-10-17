import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_FUSION_TRANSLATIONS, FusionTranslations } from './translation.interface';

/**
 * TRANSLATION SERVICE
 *
 * The translation service is used to provide translations for the whole library.
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private _translations$: BehaviorSubject<FusionTranslations> = new BehaviorSubject<FusionTranslations>(DEFAULT_FUSION_TRANSLATIONS);
  get translations$(): Observable<FusionTranslations> {
    return this._translations$.asObservable();
  }
  get translations(): FusionTranslations {
    return this._translations$.value;
  }
  set transitions(translations: FusionTranslations) {
    this._translations$.next(translations);
  }
}
