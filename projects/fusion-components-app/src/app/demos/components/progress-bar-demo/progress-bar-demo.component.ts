import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FusionUiSize, ProgressBarStatus } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-progress-bar',
  templateUrl: './progress-bar-demo.component.html',
  styleUrls: ['./progress-bar-demo.component.scss']
})
export class ProgressBarDemoComponent {
  readonly FusionUiSize = FusionUiSize;
  readonly ProgressBarStatus = ProgressBarStatus;

  progressBarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildProgressBarForm();
  }

  buildProgressBarForm(): void {
    this.progressBarForm = this.fb.group({
      value: [50, Validators.required],
      minValue: [0, Validators.required],
      maxValue: [100, Validators.required],
      isValueDisplayed: [true],
      minDisplayedPercent: [5, Validators.required],
      size: [FusionUiSize.MEDIUM, Validators.required],
      status: [''],
      displayText: [undefined],
      ariaValueText: [undefined],
    });
  }
}
