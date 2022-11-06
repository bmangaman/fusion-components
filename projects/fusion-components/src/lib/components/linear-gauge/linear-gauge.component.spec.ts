import { StatusLevel } from '@fusion-components/lib/shared';
import { TranslationService } from '@fusion-components/public-api';

import { LinearGaugeComponent } from './linear-gauge.component';
import { DEFAULT_LINEAR_GAUGE_TRANSLATIONS, LinearGaugeState, LinearGaugeThreshold } from './linear-gauge.interface';

describe('LinearGaugeComponent', () => {
  let component: LinearGaugeComponent;
  let translationService: TranslationService;

  const thresholds: LinearGaugeThreshold[] = [
    {
      title: 'warning',
      value: 2,
      level: StatusLevel.WARNING,
    },
    {
      title: 'error',
      value: 4,
      level: StatusLevel.ERROR,
    },
  ];

  beforeEach(() => {
    translationService = new TranslationService();
    component = new LinearGaugeComponent(translationService);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnChanges()', () => {
    it('should call calculateLevel() and set level to the result', () => {
      spyOn(component, 'calculateLevel').and.returnValue(StatusLevel.BASE);
      component.ngOnChanges();
      expect(component.calculateLevel).toHaveBeenCalled();
      expect(component.level).toEqual(StatusLevel.BASE);
    });

    it('shoould emit that the linear gauge state has changed', () => {
      const state: LinearGaugeState = {
        value: 5,
        maxValue: 10,
        minValue: 0,
        thresholds: [],
        translations: { ...DEFAULT_LINEAR_GAUGE_TRANSLATIONS },
      };

      spyOn(component, 'generateLinearGaugeState').and.returnValue(state);
      spyOn(component.linearGaugeChanged, 'emit').and.stub();
      component.ngOnChanges();
      expect(component.linearGaugeChanged.emit).toHaveBeenCalledWith(state);
    });
  });

  describe('calculateLevel()', () => {
    it('should return BASE if there are no thresholds', () => {
      component.thresholds = null as any;
      expect(component.calculateLevel()).toEqual(StatusLevel.BASE);

      component.thresholds = [];
      expect(component.calculateLevel()).toEqual(StatusLevel.BASE);
    });

    it('should return CRITICAL if the value is greater than the max value', () => {
      component.thresholds = thresholds;

      component.value = 10;
      component.maxValue = 10;
      expect(component.calculateLevel()).toEqual(StatusLevel.CRITICAL);

      component.value = 15;
      component.maxValue = 10;
      expect(component.calculateLevel()).toEqual(StatusLevel.CRITICAL);
    });

    it('should return the level of the highest passed threshold', () => {
      component.thresholds = thresholds;
      component.maxValue = 5;
      component.minValue = 0;

      component.value = 0;
      expect(component.calculateLevel()).toEqual(StatusLevel.NORMAL);

      component.value = 1;
      expect(component.calculateLevel()).toEqual(StatusLevel.NORMAL);

      component.value = 2;
      expect(component.calculateLevel()).toEqual(StatusLevel.WARNING);

      component.value = 3;
      expect(component.calculateLevel()).toEqual(StatusLevel.WARNING);

      component.value = 4;
      expect(component.calculateLevel()).toEqual(StatusLevel.ERROR);

      component.value = 5;
      expect(component.calculateLevel()).toEqual(StatusLevel.CRITICAL);
    });
  });

  describe('generateLinearGauageState()', () => {
    it('should generate and return the state of the linear gauge', () => {
      component.thresholds = thresholds;
      component.value = 1;
      component.maxValue = 5;
      component.minValue = 0;

      expect(component.generateLinearGaugeState()).toEqual({
        value: component.value,
        maxValue: component.maxValue,
        minValue: component.minValue,
        thresholds: component.thresholds,
        translations: component.translations,
      });
    });
  });
});
