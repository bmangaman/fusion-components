import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * FUSION COMPONENTS TRANSLATION SERVICE
 *
 * The translation service is used to help set up the fusion components translation.
 */
@Injectable({ providedIn: 'root' })
export class FusionComponentsTranslationService {
  /**
   * The base/ starting translation key used to make sure that ngx-translate is able to find and use
   * the correct translation keys and values for components.
   * It is recommended that this value is 'components', which would mean your translation json files would look like:
   * {
   *   components: {
   *     table: { ... },
   *     accordion: { ... },
   *   },
   *   ...
   * }
   */
  private _baseTranslationKey$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  set baseTranslationKey(base: string) {
    this._baseTranslationKey$.next(base);
  }
  get baseTranslationKey(): string {
    return this._baseTranslationKey$.value;
  }

  get baseTranslationKey$(): Observable<string> {
    return this._baseTranslationKey$.asObservable();
  }
}
