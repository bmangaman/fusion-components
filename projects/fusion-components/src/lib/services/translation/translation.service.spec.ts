import { FusionComponentsTranslationService } from './translation.service';

describe('FusionComponentsTranslationService', () => {
  let service: FusionComponentsTranslationService;

  beforeEach(() => {
    service = new FusionComponentsTranslationService();
  });

  describe('set and get baseTranslationKey()', () => {
    it('should set the _baseTranslationKey$ BehaviorSubject', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      spyOn(service['_baseTranslationKey$'], 'next').and.callThrough();
      service.baseTranslationKey = 'key';
      expect(service['_baseTranslationKey$'].next).toHaveBeenCalledWith('key');
      expect(service.baseTranslationKey).toEqual('key');

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('get baseTranslationKey$()', () => {
    it('should return the _baseTranslationKey$ as an Observable', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(service.baseTranslationKey$).toEqual(service['_baseTranslationKey$'].asObservable());
    });
  });
});
