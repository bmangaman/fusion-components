import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Size, ProgressBarStatus } from '@fusion-components';

@Component({
  selector: 'fusion-demo-progress-bar',
  templateUrl: './progress-bar-demo.component.html',
  styleUrls: ['./progress-bar-demo.component.scss']
})
export class ProgressBarDemoComponent {
  readonly Size = Size;
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
      size: [Size.MEDIUM, Validators.required],
      status: [''],
      displayText: [undefined],
      ariaValueText: [undefined],
    });
  }
}
