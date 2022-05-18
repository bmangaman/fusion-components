import {
  DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS,
  FusionUiStatusLevel,
  FusionUIStatusLevelTranslations,
} from '@fusion-ui/fusion-components/lib/shared';
import { GetFusionUiStatusLevelTextPipe } from './get-fusion-ui-status-level-text.pipe';

describe('GetFusionUiStatusLevelTextPipe', () => {
  const translations: FusionUIStatusLevelTranslations = {
    [FusionUiStatusLevel.UNKNOWN]: 'ex-unknown',
    [FusionUiStatusLevel.BASE]: 'ex-base',
    [FusionUiStatusLevel.SUCCESS]: 'ex-succss',
    [FusionUiStatusLevel.NORMAL]: 'ex-normal',
    [FusionUiStatusLevel.WARNING]: 'ex-warning',
    [FusionUiStatusLevel.ERROR]: 'ex-error',
    [FusionUiStatusLevel.CRITICAL]: 'ex-critical',
  };

  let pipe: GetFusionUiStatusLevelTextPipe;

  beforeEach(() => {
    pipe = new GetFusionUiStatusLevelTextPipe();
  });

  it('should return an empty string as the default case', () => {
    expect(pipe.transform(null, null)).toEqual('');
    expect(pipe.transform({} as FusionUiStatusLevel, translations)).toEqual('');
  });

  it('should return the tranlsated strings if provided', () => {
    expect(pipe.transform(FusionUiStatusLevel.UNKNOWN, translations)).toEqual(translations[0]);
    expect(pipe.transform(FusionUiStatusLevel.BASE, translations)).toEqual(translations[1]);
    expect(pipe.transform(FusionUiStatusLevel.NORMAL, translations)).toEqual(translations[2]);
    expect(pipe.transform(FusionUiStatusLevel.SUCCESS, translations)).toEqual(translations[3]);
    expect(pipe.transform(FusionUiStatusLevel.WARNING, translations)).toEqual(translations[4]);
    expect(pipe.transform(FusionUiStatusLevel.ERROR, translations)).toEqual(translations[5]);
    expect(pipe.transform(FusionUiStatusLevel.CRITICAL, translations)).toEqual(translations[6]);
  });

  it('should return the default text if no translations provided', () => {
    expect(pipe.transform(FusionUiStatusLevel.UNKNOWN, null)).toEqual(DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS[0]);
    expect(pipe.transform(FusionUiStatusLevel.BASE, null)).toEqual(DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS[1]);
    expect(pipe.transform(FusionUiStatusLevel.NORMAL, null)).toEqual(DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS[2]);
    expect(pipe.transform(FusionUiStatusLevel.SUCCESS, null)).toEqual(DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS[3]);
    expect(pipe.transform(FusionUiStatusLevel.WARNING, null)).toEqual(DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS[4]);
    expect(pipe.transform(FusionUiStatusLevel.ERROR, null)).toEqual(DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS[5]);
    expect(pipe.transform(FusionUiStatusLevel.CRITICAL, null)).toEqual(DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS[6]);
  });

  it('should convert the string to lowercase if the toLowerCase flag is set to true', () => {
    expect(pipe.transform(FusionUiStatusLevel.NORMAL, translations, true)).toEqual('ex-normal');
    expect(pipe.transform(FusionUiStatusLevel.NORMAL, null, true)).toEqual('normal');
  });
});
