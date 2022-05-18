import { FusionComponentsTranslationService } from '@fusion-ui/fusion-components/lib/services';
import { TranslatedComponent } from './translated.component';

describe('TranslatedComponent', () => {
  let component: TranslatedComponent;
  let translationService: FusionComponentsTranslationService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    component = new TranslatedComponent(translationService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('construction', () => {
    it('should update the baseTranslationKey whenever the key updates in the translation service', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component['translationService'].baseTranslationKey = 'components';
      expect(component.baseTranslationKey).toEqual('components');
      component['translationService'].baseTranslationKey = undefined;
      expect(component.baseTranslationKey).toEqual(undefined);

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });
});
