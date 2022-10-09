import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { WizardStep } from './wizard.interface';

/**
 * WIZARD COMPONENT
 *
 * The Wizard Component provides the structure and logic to navigate through a wizard. It takes an array of steps
 * that keep track of the state of the wizard navigation.
 *
 * @example
 * <f-wizard [(steps)]="steps" (stepsChanged)="stepsChanged($event)">
 *   Content Goes Here
 * </f-wizard>
 */
@Component({
  selector: 'f-wizard',
  templateUrl: 'wizard.component.html',
})
export class WizardComponent implements OnChanges {
  /**
   * Determines whether or not navigation to all next steps are disabled.
   */
  @Input() disableNextSteps: boolean;

  /**
   * Determines whether or not navigation to all previous steps are disabled.
   */
  @Input() disablePreviousSteps: boolean;

  /**
   * Determines the steps of the wizard.
   * Each step keeps track of its own state (completed, disabled, current, etc.).
   * Generates and appends a uuid for each step to help make them easy to compare.
   */
  private _steps: WizardStep[] = [];
  @Input()
  set steps(steps: WizardStep[]) {
    steps.forEach((step: WizardStep) => step.uuid = step.uuid || uuidv4());
    this._steps = steps;
    this.setCurrentStepByIndex(this.getCurrentStepIndex());
  }
  get steps(): WizardStep[] {
    return this._steps;
  }
  @Output() stepsChange: EventEmitter<WizardStep[]> = new EventEmitter<WizardStep[]>();

  /**
   * Emits the current steps of the wizard.
   */
  @Output() stepsChanged: EventEmitter<WizardStep[]> = new EventEmitter<WizardStep[]>();

  /**
   * Updates the state of the steps if disableNextSteps or disablePreviousSteps inputs are updated.
   *
   * @param c Input changes.
   */
  ngOnChanges(c: SimpleChanges): void {
    if (c['disableNextSteps'] || c['disablePreviousSteps']) {
      this.setCurrentStepByIndex(this.getCurrentStepIndex());
    }
  }

  /**
   * Updates the state of the wizrd by calling setCurrentStepByIndex with the index of the provided step.
   *
   * @param step The step to be set as the current step.
   */
  setCurrentStep(step: WizardStep): void {
    const newCurrentStepIndex: number = this.steps.findIndex((s: WizardStep) => s.uuid === step.uuid);
    this.setCurrentStepByIndex(newCurrentStepIndex);
  }

  /**
   * Updates the state of the wizrd:
   *  - sets the current step,
   *  - sets all previous steps as 'completed',
   *  - emits that the steps have changed,
   *
   * @param index The index of the step to be set as the current step.
   */
  setCurrentStepByIndex(index: number): void {
    this.steps.forEach((step: WizardStep, i: number) => {
      step.isCompleted = i < index;
      step.isCurrent = i === index;
      step.isDisabled = i === index || !!(this.disableNextSteps && i > index) || !!(this.disablePreviousSteps && i < index);
    });
    this.stepsChanged.emit(this.steps);
  }

  /**
   * Navigates to the next visible step (isHidden is false).
   */
  navigateToNextStep(): void {
    const currentStepIndex: number = this.getCurrentStepIndex();

    let nextIndex: number = currentStepIndex + 1;

    while (nextIndex < this.steps.length) {
      if (!this.steps[nextIndex].isHidden) {
        this.setCurrentStep(this.steps[nextIndex]);
        break;
      }
      nextIndex++;
    }
  }

  /**
   * Navigates to the previous visible step (isHidden is false).
   */
  navigateToPreviousStep(): void {
    const currentStepIndex: number = this.getCurrentStepIndex();

    let prevIndex: number = currentStepIndex - 1;

    while (prevIndex > -1) {
      if (!this.steps[prevIndex].isHidden) {
        this.setCurrentStep(this.steps[prevIndex]);
        break;
      }
      prevIndex--;
    }
  }

  /**
   * Gets the index of the current step.
   *
   * @returns The index of the current step;
   */
  getCurrentStepIndex(): number {
    return this.steps.findIndex((step: WizardStep) => step.isCurrent);
  }
}
