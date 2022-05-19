import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { FusionUiStatusLevel, LinearGaugeThreshold, PipeItem, BytesPipe, BytesPipeBase } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-linear-gauge',
  templateUrl: './linear-gauge-demo.component.html',
  styleUrls: ['./linear-gauge-demo.component.scss']
})
export class LinearGaugeDemoComponent {
  readonly FusionUiStatusLevel = FusionUiStatusLevel;
  readonly bytesPipe: BytesPipe = new BytesPipe();

  dataFormatPipeItem: PipeItem = { pipe: this.bytesPipe, values: [true, BytesPipeBase.TWO, 3] };
  valueFormatPipeItem: PipeItem = { pipe: this.bytesPipe, values: [true, BytesPipeBase.TWO, 2] };

  linearGaugeForm: FormGroup;
  numOfThresholds: number = 0;
  thresholds: LinearGaugeThreshold[];

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildLinearGaugeForm();
  }

  buildLinearGaugeForm(): void {
    this.linearGaugeForm = this.fb.group({
      value: [50],
      minValue: [0],
      maxValue: [100],
      useDataFormatPipe: [false],
      useValueFormatPipe: [false],
      thresholds: this.fb.array([]),
    });

    this.addNewThreshold();
    this.addNewThreshold();

    this.updateThresholds();
    this.linearGaugeForm.get('thresholds').valueChanges.subscribe(() => this.updateThresholds());
  }

  updateThresholds(): void {
    const thresholdsArrayLength: number = (this.linearGaugeForm.get('thresholds') as FormArray).length;
    const thresholds: LinearGaugeThreshold[] = [];

    for (let i = 0; i < thresholdsArrayLength; i++) {
      const threshold: AbstractControl = (this.linearGaugeForm.get('thresholds') as FormArray).at(i);
      thresholds.push({
        title: threshold.get('title').value,
        value: threshold.get('value').value,
        level: parseInt(threshold.get('level').value, 10),
      });
    }

    this.thresholds = thresholds;
  }

  createThresholdFormGroup(): FormGroup {
    let generatedValue = 0;
    let previousThresholdValue: number;
    let previousThresholdLevel: FusionUiStatusLevel = FusionUiStatusLevel.WARNING;

    const thresholdsFormArray: FormArray = (this.linearGaugeForm.get('thresholds') as FormArray);
    const maxValue: number = this.linearGaugeForm.get('maxValue').value;
    const minValue: number = this.linearGaugeForm.get('minValue').value;

    // Get the value of the previous threshold (if it exists).
    if (!!thresholdsFormArray && !!thresholdsFormArray.length) {
      const thresholdFormGroup: AbstractControl = thresholdsFormArray.at(this.numOfThresholds - 1);
      previousThresholdValue = !!thresholdFormGroup ? thresholdFormGroup.get('value').value : undefined;
      previousThresholdLevel = !!thresholdFormGroup ?
        FusionUiStatusLevel[FusionUiStatusLevel[Math.min(parseInt(thresholdFormGroup.get('level').value, 10) + 1, 6)]] :
        FusionUiStatusLevel.WARNING;
    }

    // If there is a previous threshold, use the value of that treshold as the lower bounds of the newly generated threshold.
    // Otherwise, use the minValue.
    if (!isNaN(maxValue) && (!isNaN(minValue) || !isNaN(previousThresholdValue))) {
      const startValue: number = previousThresholdValue || minValue;
      generatedValue = Math.round(Math.random() * Math.abs(this.linearGaugeForm.get('maxValue').value - startValue)) + startValue;
    }

    return this.fb.group({
      title: [`title ${this.numOfThresholds + 1}`, Validators.required],
      value: [generatedValue, Validators.required],
      level: [previousThresholdLevel, Validators.required],
    });
  }

  removeThreshold(index: number): void {
    (this.linearGaugeForm.get('thresholds') as FormArray).removeAt(index);
    this.numOfThresholds--;
  }

  addNewThreshold(): void {
    (this.linearGaugeForm.get('thresholds') as FormArray).push(this.createThresholdFormGroup());
    this.numOfThresholds++;
  }
}
