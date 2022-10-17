import { Subscription } from 'rxjs';

import { unsubscribeAll } from '../../shared/utilities';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let subscriptions: Subscription[] = [];

  beforeEach(() => {
    service = new TranslationService();
  });

  afterEach(() => {
    unsubscribeAll(subscriptions);
  });
});
