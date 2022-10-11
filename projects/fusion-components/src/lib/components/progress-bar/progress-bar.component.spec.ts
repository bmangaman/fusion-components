import { SimpleChange } from '@angular/core';
import { Size } from '../../shared';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ProgressBarStatus } from './progress-bar.interface';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;

  beforeEach(() => {
    component = new ProgressBarComponent();
  });

  describe('ngOnInit()', () => {
    it('should create a subscription for when resultingValue changes', () => {
      spyOn(component.resultingValue$, 'subscribe').and.callThrough();
      spyOn(component, 'calculateResultingStatus').and.stub();
      component.ngOnInit();
      // eslint-disable-next-line import/no-deprecated
      expect(component.resultingValue$.subscribe).toHaveBeenCalled();
      component.resultingValue$.next(50);
      expect(component.calculateResultingStatus).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges()', () => {
    it('should call generateClasses() if size or classes inputs are changed', () => {
      spyOn(component, 'generateClasses').and.callThrough();

      component.size = undefined as any;
      component.classes = undefined as any;

      component.size = Size.MEDIUM;
      component.ngOnChanges({
        size: new SimpleChange(null, component.size, false),
      });
      expect(component.generateClasses).toHaveBeenCalled();

      component.classes = ['custom-class-1'];
      component.ngOnChanges({
        classes: new SimpleChange(null, component.classes, false),
      });
      expect(component.generateClasses).toHaveBeenCalled();
    });

    it('should call calculateResultingValue() if value, minValue, or maxValue inputs are changed', () => {
      spyOn(component, 'calculateResultingValue').and.callThrough();

      component.value = 0;
      component.minValue = 0;
      component.maxValue = 100;

      component.value = 50;
      component.ngOnChanges({
        value: new SimpleChange(null, component.value, false),
      });
      expect(component.calculateResultingValue).toHaveBeenCalled();

      component.minValue = 10;
      component.ngOnChanges({
        minValue: new SimpleChange(null, component.minValue, false),
      });
      expect(component.calculateResultingValue).toHaveBeenCalled();

      component.maxValue = 110;
      component.ngOnChanges({
        maxValue: new SimpleChange(null, component.maxValue, false),
      });
      expect(component.calculateResultingValue).toHaveBeenCalled();
    });

    it('should call calculateResultingStatus() if status input is changed', () => {
      spyOn(component, 'calculateResultingStatus').and.callThrough();

      component.status = undefined as any;

      component.status = ProgressBarStatus.WARNING;
      component.ngOnChanges({
        status: new SimpleChange(null, component.status, false),
      });
      expect(component.calculateResultingStatus).toHaveBeenCalled();
    });
  });

  describe('calculateResultingValue()', () => {
    it('should update the resutlingValue by the response from the percentMapPipe transform', () => {
      spyOn(component.resultingValue$, 'next').and.callThrough();
      spyOn(component.percentMapPipe, 'transform').and.callThrough();

      component.value = 50;
      component.calculateResultingValue();

      expect(component.resultingValue$.next).toHaveBeenCalledWith(50);
      expect(component.percentMapPipe.transform).toHaveBeenCalledWith(50, 100, 0);
    });
  });

  describe('calculateResultingStatus()', () => {
    beforeEach(() => {
      spyOn(component.resultingStatus$, 'next').and.callThrough();
    });

    it('should set resultingStatus to the status input if provided', () => {
      component.status = ProgressBarStatus.WARNING;
      component.calculateResultingStatus();
      expect(component.resultingStatus$.next).toHaveBeenCalledWith(ProgressBarStatus.WARNING);
    });

    it('should use the resultingValue to calculate the status', () => {
      component.resultingValue$.next(0);
      component.calculateResultingStatus();
      expect(component.resultingStatus$.next).toHaveBeenCalledWith(ProgressBarStatus.NOT_STARTED);

      component.resultingValue$.next(10);
      component.calculateResultingStatus();
      expect(component.resultingStatus$.next).toHaveBeenCalledWith(ProgressBarStatus.IN_PROGRESS);

      component.resultingValue$.next(99);
      component.calculateResultingStatus();
      expect(component.resultingStatus$.next).toHaveBeenCalledWith(ProgressBarStatus.IN_PROGRESS);

      component.resultingValue$.next(100);
      component.calculateResultingStatus();
      expect(component.resultingStatus$.next).toHaveBeenCalledWith(ProgressBarStatus.SUCCESS);
    });

  });

  describe('generateClasses()', () => {
    it('should generate the CSS classes based on the proviced inputs', () => {
      let expectedResult: string[] = [];

      // DEFAULT
      component.size = undefined as any;
      component.resultingStatus$.next(undefined as any);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      // SIZE
      component.size = Size.SMALL;
      component.resultingStatus$.next(undefined as any);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--small'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      component.size = Size.MEDIUM;
      component.resultingStatus$.next(undefined as any);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--medium'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      component.size = Size.LARGE;
      component.resultingStatus$.next(undefined as any);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--large'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      // STATUS
      component.size = undefined as any;
      component.resultingStatus$.next(ProgressBarStatus.ERROR);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--error'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      component.size = undefined as any;
      component.resultingStatus$.next(ProgressBarStatus.IN_PROGRESS);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--in-progress'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      component.size = undefined as any;
      component.resultingStatus$.next(ProgressBarStatus.NOT_STARTED);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--not-started'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      component.size = undefined as any;
      component.resultingStatus$.next(ProgressBarStatus.PAUSED);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--paused'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      component.size = undefined as any;
      component.resultingStatus$.next(ProgressBarStatus.SUCCESS);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--success'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      component.size = undefined as any;
      component.resultingStatus$.next(ProgressBarStatus.WARNING);
      component.classes = [];
      expectedResult = ['f-progress-bar__bar', 'f-progress-bar__bar--warning'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      // CUSTOM CLASSES
      component.size = undefined as any;
      component.resultingStatus$.next(undefined as any);
      component.classes = ['custom-class-1'];
      expectedResult = ['f-progress-bar__bar', 'custom-class-1'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);

      component.size = undefined as any;
      component.resultingStatus$.next(undefined as any);
      component.classes = ['custom-class-1', 'custom-class-2'];
      expectedResult = ['f-progress-bar__bar', 'custom-class-1', 'custom-class-2'];
      component.generateClasses();
      expect(component.generatedClasses).toEqual(expectedResult);
    });
  });
});
