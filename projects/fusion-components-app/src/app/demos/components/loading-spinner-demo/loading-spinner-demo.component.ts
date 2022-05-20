import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Size } from '@fusion-components';

@Component({
  selector: 'fusion-demo-loading-spinner',
  templateUrl: './loading-spinner-demo.component.html',
  styleUrls: ['./loading-spinner-demo.component.scss']
})
export class LoadingSpinnerDemoComponent {
  readonly Size = Size;
  loadingSpinnerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildLoadingSpinnerForm();
  }

  buildLoadingSpinnerForm(): void {
    this.loadingSpinnerForm = this.fb.group({
      size: [Size.MEDIUM, [Validators.required]],
      opacity: [1, [Validators.required]],
      minWidth: [undefined, [Validators.required]],
      ariaLabel: ['Loading', [Validators.required]],
    })
  }
}
