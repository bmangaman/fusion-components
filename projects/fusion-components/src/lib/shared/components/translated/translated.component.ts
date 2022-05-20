import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services/translation';
import { UnsubscribeComponent } from '../unsubscribe';

/**
 * TRANSLATED COMPONENT
 *
 * The Translated Component provides a consistent way to set and keep track of the translations.
 */
@Component({
  selector: 'f-translated',
  template: '',
})
export class TranslatedComponent extends UnsubscribeComponent {
  private _baseTranslationKey: string;

  constructor(
    protected translationService: FusionComponentsTranslationService,
  ) {
    super();

    this.translationService.baseTranslationKey$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((key: string) => this._baseTranslationKey = key);
  }

  get baseTranslationKey(): string {
    return this._baseTranslationKey;
  }
}
