import { SimpleChange } from '@angular/core';

import { cloneDeep } from 'lodash-es';

import { WizardComponent } from './wizard.component';
import { WizardStep } from './wizard.interface';

describe('WizardComponent', () => {
  const defaultSteps: WizardStep[] = [
    {
      title: 'Step 1',
      isCurrent: true,
    },
    {
      title: 'Step 2',
    },
    {
      title: 'Step 3',
    },
    {
      title: 'Step 4',
    },
    {
      title: 'Step 5',
    },
  ];

  let component: WizardComponent;

  beforeEach(() => {
    component = new WizardComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('@Input()', () => {
    describe('steps', () => {
      it('should loop through each step and append a uuid if one does not already exist', () => {
        const steps: WizardStep[] = cloneDeep(defaultSteps);
        steps[1].uuid = 'custom uuid';
        component.steps = steps;
        component.steps.forEach((step: WizardStep) => expect(step.uuid).toBeTruthy);
        expect(component.steps[1].uuid).toEqual('custom uuid');
      });

      it('should call setCurrentStepByIndex()', () => {
        spyOn(component, 'setCurrentStepByIndex').and.stub();
        component.steps = cloneDeep(defaultSteps);
        expect(component.setCurrentStepByIndex).toHaveBeenCalled();
      });
    });
  });

  describe('ngOnChanges()', () => {
    it('should call setCurrentStepByIndex() if disableNextSteps or disablePreviousSteps inputs change', () => {
      const setCurrentStepByIndexSpy: jasmine.Spy = spyOn(component, 'setCurrentStepByIndex').and.stub();

      component.steps = cloneDeep(defaultSteps);
      setCurrentStepByIndexSpy.calls.reset();
      component.ngOnChanges({
        steps: new SimpleChange(null, component.steps, false),
      });
      expect(component.setCurrentStepByIndex).not.toHaveBeenCalled();

      component.disableNextSteps = true;
      setCurrentStepByIndexSpy.calls.reset();
      component.ngOnChanges({
        disableNextSteps: new SimpleChange(null, component.disableNextSteps, false),
      });
      expect(component.setCurrentStepByIndex).toHaveBeenCalled();

      component.disablePreviousSteps = true;
      setCurrentStepByIndexSpy.calls.reset();
      component.ngOnChanges({
        disablePreviousSteps: new SimpleChange(null, component.disablePreviousSteps, false),
      });
      expect(component.setCurrentStepByIndex).toHaveBeenCalled();
    });
  });

  describe('setCurrentStep()', () => {
    it('should call setCurrentStepByIndex() with the index of the provided step', () => {
      spyOn(component, 'setCurrentStepByIndex').and.stub();
      component.steps = cloneDeep(defaultSteps);
      component.setCurrentStep(component.steps[0]);
      expect(component.setCurrentStepByIndex).toHaveBeenCalledWith(0);
    });
  });

  describe('setCurrentStepByIndex()', () => {
    it('should loop through the steps and set the isComplete and isCurrent flags based on the index', () => {
      component.steps = cloneDeep(defaultSteps);
      expect(component.steps[0].isCompleted).toBeFalsy();
      expect(component.steps[0].isCurrent).toBeTrue();
      expect(component.steps[1].isCompleted).toBeFalse();
      expect(component.steps[1].isCurrent).toBeFalse();
      expect(component.steps[2].isCompleted).toBeFalse();
      expect(component.steps[2].isCurrent).toBeFalse();

      component.setCurrentStepByIndex(1);
      expect(component.steps[0].isCompleted).toBeTrue();
      expect(component.steps[0].isCurrent).toBeFalse();
      expect(component.steps[1].isCompleted).toBeFalsy();
      expect(component.steps[1].isCurrent).toBeTrue();
      expect(component.steps[2].isCompleted).toBeFalse();
      expect(component.steps[2].isCurrent).toBeFalse();

      component.setCurrentStepByIndex(2);
      expect(component.steps[0].isCompleted).toBeTrue();
      expect(component.steps[0].isCurrent).toBeFalse();
      expect(component.steps[1].isCompleted).toBeTrue();
      expect(component.steps[1].isCurrent).toBeFalse();
      expect(component.steps[2].isCompleted).toBeFalse();
      expect(component.steps[2].isCurrent).toBeTrue();
    });

    it('should disable the current step', () => {
      component.steps = cloneDeep(defaultSteps);
      component.setCurrentStepByIndex(2);
      expect(component.steps[0].isDisabled).toBeFalse();
      expect(component.steps[1].isDisabled).toBeFalse();
      expect(component.steps[2].isDisabled).toBeTrue();
      expect(component.steps[3].isDisabled).toBeFalse();
      expect(component.steps[4].isDisabled).toBeFalse();
    });

    it('should disable all previous steps if disablePreviousSteps is true', () => {
      component.steps = cloneDeep(defaultSteps);
      component.disablePreviousSteps = true;
      component.setCurrentStepByIndex(2);
      expect(component.steps[0].isDisabled).toBeTrue();
      expect(component.steps[1].isDisabled).toBeTrue();
      expect(component.steps[2].isDisabled).toBeTrue();
      expect(component.steps[3].isDisabled).toBeFalse();
      expect(component.steps[4].isDisabled).toBeFalse();
    });

    it('should disable all next steps if disableNextSteps is true', () => {
      component.steps = cloneDeep(defaultSteps);
      component.disableNextSteps = true;
      component.setCurrentStepByIndex(2);
      expect(component.steps[0].isDisabled).toBeFalse();
      expect(component.steps[1].isDisabled).toBeFalse();
      expect(component.steps[2].isDisabled).toBeTrue();
      expect(component.steps[3].isDisabled).toBeTrue();
      expect(component.steps[4].isDisabled).toBeTrue();
    });
  });

  describe('navigateToNextStep()', () => {
    it('should set the currentStep to the next visible step', () => {
      component.steps = cloneDeep(defaultSteps);
      component.steps[2].isHidden = true;

      expect(component.getCurrentStepIndex()).toEqual(0);
      component.navigateToNextStep();
      expect(component.getCurrentStepIndex()).toEqual(1);
      component.navigateToNextStep();
      expect(component.getCurrentStepIndex()).toEqual(3);
    });
  });

  describe('navigateToPreviousStep()', () => {
    it('should set the currentStep to the previous visible step', () => {
      component.steps = cloneDeep(defaultSteps);
      component.steps[2].isHidden = true;
      component.steps[0].isCurrent = false;
      component.steps[3].isCurrent = true;

      expect(component.getCurrentStepIndex()).toEqual(3);
      component.navigateToPreviousStep();
      expect(component.getCurrentStepIndex()).toEqual(1);
      component.navigateToPreviousStep();
      expect(component.getCurrentStepIndex()).toEqual(0);
    });
  });

  describe('getCurrentStepIndex()', () => {
    it('should return the index of the current step', () => {
      component.steps = cloneDeep(defaultSteps);
      expect(component.getCurrentStepIndex()).toEqual(0);
      component.steps[0].isCurrent = false;
      component.steps[4].isCurrent = true;
      expect(component.getCurrentStepIndex()).toEqual(4);
    });
  });
});
