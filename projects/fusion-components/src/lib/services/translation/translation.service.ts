import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_FUSION_TRANSLATIONS, FusionTranslations } from './translation.interface';

/**
 * TRANSLATION SERVICE
 *
 * The translation service is used to provide translations for the whole library.
 */
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private _translations$: BehaviorSubject<FusionTranslations> = new BehaviorSubject<FusionTranslations>(DEFAULT_FUSION_TRANSLATIONS);

  /**
   * Gets all of the fusion components translations as an observable.
   */
  get translations$(): Observable<FusionTranslations> {
    return this._translations$.asObservable();
  }

  /**
   * Gets all the fusion components translations as a plain object.
   */
  get translations(): FusionTranslations {
    return this._translations$.value;
  }

  /**
   * Sets all the fusion components translations.
   */
  set translations(newTranslations: FusionTranslations) {
    this._translations$.next(newTranslations);
  }
}
