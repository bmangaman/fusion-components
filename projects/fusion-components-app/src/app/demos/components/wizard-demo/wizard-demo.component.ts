import { Component, ViewChild } from '@angular/core';
import { WizardStep, WizardComponent } from '@fusion-ui/fusion-components';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'fusion-demo-wizard',
  templateUrl: './wizard-demo.component.html',
  styleUrls: ['./wizard-demo.component.scss']
})
export class WizardDemoComponent {
  wizardForm: FormGroup;

  steps: WizardStep[] = [
    {
      title: 'Step 1',
      isCurrent: true,
    },
    {
      title: 'Step 2',
      isHidden: true,
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
    {
      title: 'Step 6',
      isHidden: true,
    },
  ]

  @ViewChild(WizardComponent, { static: false }) wizard: WizardComponent;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildWizardForm();
  }

  buildWizardForm(): void {
    this.wizardForm = this.fb.group({
      disableNextSteps: [false],
      disablePreviousSteps: [false],
      hideSteps2And6: [true],
    });

    this.wizardForm.valueChanges.subscribe(() => {
      const hideSteps2And5Value: boolean = this.wizardForm.get('hideSteps2And6').value;
      this.steps[1].isHidden = hideSteps2And5Value;
      this.steps[5].isHidden = hideSteps2And5Value;
    });
  }

  getCurrentStep(): WizardStep {
    return this.steps.find((step: WizardStep) => step.isCurrent);
  }

  nextStep(): void {
    this.wizard.navigateToNextStep();
  }

  prevStep(): void {
    this.wizard.navigateToPreviousStep();
  }

  stepsChanged(steps: WizardStep[]): void {
    console.log('steps changed', steps);
  }

}
