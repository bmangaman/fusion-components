import { FusionUiStatusLevel } from '@fusion-ui/fusion-components/lib/shared';

import { LinearGaugeComponent } from './linear-gauge.component';
import { LinearGaugeState, LinearGaugeThreshold } from './linear-gauge.interface';

describe('LinearGaugeComponent', () => {
  let component: LinearGaugeComponent;
  const thresholds: LinearGaugeThreshold[] = [
    {
      title: 'warning',
      value: 2,
      level: FusionUiStatusLevel.WARNING,
    },
    {
      title: 'error',
      value: 4,
      level: FusionUiStatusLevel.ERROR,
    },
  ];

  beforeEach(() => {
    component = new LinearGaugeComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnChanges()', () => {
    it('should call calculateLevel() and set level to the result', () => {
      spyOn(component, 'calculateLevel').and.returnValue(FusionUiStatusLevel.BASE);
      component.ngOnChanges();
      expect(component.calculateLevel).toHaveBeenCalled();
      expect(component.level).toEqual(FusionUiStatusLevel.BASE);
    });

    it('shoould emit that the linear gauge state has changed', () => {
      const state: LinearGaugeState = {
        value: 5,
        maxValue: 10,
        minValue: 0,
        thresholds: [],
        translations: {},
      };

      spyOn(component, 'generateLinearGaugeState').and.returnValue(state);
      spyOn(component.linearGaugeChanged, 'emit').and.stub();
      component.ngOnChanges();
      expect(component.linearGaugeChanged.emit).toHaveBeenCalledWith(state);
    });
  });

  describe('calculateLevel()', () => {
    it('should return BASE if there are no thresholds', () => {
      component.thresholds = null;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.BASE);

      component.thresholds = [];
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.BASE);
    });

    it('should return CRITICAL if the value is greater than the max value', () => {
      component.thresholds = thresholds;

      component.value = 10;
      component.maxValue = 10;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.CRITICAL);

      component.value = 15;
      component.maxValue = 10;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.CRITICAL);
    });

    it('should return the level of the highest passed threshold', () => {
      component.thresholds = thresholds;
      component.maxValue = 5;
      component.minValue = 0;

      component.value = 0;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.NORMAL);

      component.value = 1;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.NORMAL);

      component.value = 2;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.WARNING);

      component.value = 3;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.WARNING);

      component.value = 4;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.ERROR);

      component.value = 5;
      expect(component.calculateLevel()).toEqual(FusionUiStatusLevel.CRITICAL);
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
