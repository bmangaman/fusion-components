import {
  DEFAULT_STATUS_LEVEL_TRANSLATIONS,
  StatusLevel,
  FusionUIStatusLevelTranslations,
} from '@fusion-components/lib/shared';
import { GetStatusLevelTextPipe } from './get-status-level-text.pipe';

describe('GetStatusLevelTextPipe', () => {
  const translations: FusionUIStatusLevelTranslations = {
    [StatusLevel.UNKNOWN]: 'ex-unknown',
    [StatusLevel.BASE]: 'ex-base',
    [StatusLevel.SUCCESS]: 'ex-succss',
    [StatusLevel.NORMAL]: 'ex-normal',
    [StatusLevel.WARNING]: 'ex-warning',
    [StatusLevel.ERROR]: 'ex-error',
    [StatusLevel.CRITICAL]: 'ex-critical',
  };

  let pipe: GetStatusLevelTextPipe;

  beforeEach(() => {
    pipe = new GetStatusLevelTextPipe();
  });

  it('should return an empty string as the default case', () => {
    expect(pipe.transform(undefined!, undefined!)).toEqual('');
    expect(pipe.transform({} as StatusLevel, translations)).toEqual('');
  });

  it('should return the tranlsated strings if provided', () => {
    expect(pipe.transform(StatusLevel.UNKNOWN, translations)).toEqual(translations[0]);
    expect(pipe.transform(StatusLevel.BASE, translations)).toEqual(translations[1]);
    expect(pipe.transform(StatusLevel.NORMAL, translations)).toEqual(translations[2]);
    expect(pipe.transform(StatusLevel.SUCCESS, translations)).toEqual(translations[3]);
    expect(pipe.transform(StatusLevel.WARNING, translations)).toEqual(translations[4]);
    expect(pipe.transform(StatusLevel.ERROR, translations)).toEqual(translations[5]);
    expect(pipe.transform(StatusLevel.CRITICAL, translations)).toEqual(translations[6]);
  });

  it('should return the default text if no translations provided', () => {
    expect(pipe.transform(StatusLevel.UNKNOWN, undefined!)).toEqual(DEFAULT_STATUS_LEVEL_TRANSLATIONS[0]);
    expect(pipe.transform(StatusLevel.BASE, undefined!)).toEqual(DEFAULT_STATUS_LEVEL_TRANSLATIONS[1]);
    expect(pipe.transform(StatusLevel.NORMAL, undefined!)).toEqual(DEFAULT_STATUS_LEVEL_TRANSLATIONS[2]);
    expect(pipe.transform(StatusLevel.SUCCESS, undefined!)).toEqual(DEFAULT_STATUS_LEVEL_TRANSLATIONS[3]);
    expect(pipe.transform(StatusLevel.WARNING, undefined!)).toEqual(DEFAULT_STATUS_LEVEL_TRANSLATIONS[4]);
    expect(pipe.transform(StatusLevel.ERROR, undefined!)).toEqual(DEFAULT_STATUS_LEVEL_TRANSLATIONS[5]);
    expect(pipe.transform(StatusLevel.CRITICAL, undefined!)).toEqual(DEFAULT_STATUS_LEVEL_TRANSLATIONS[6]);
  });

  it('should convert the string to lowercase if the toLowerCase flag is set to true', () => {
    expect(pipe.transform(StatusLevel.NORMAL, translations, true)).toEqual('ex-normal');
    expect(pipe.transform(StatusLevel.NORMAL, undefined!, true)).toEqual('normal');
  });
});
