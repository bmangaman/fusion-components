import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FusionUiSize } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-loading-spinner',
  templateUrl: './loading-spinner-demo.component.html',
  styleUrls: ['./loading-spinner-demo.component.scss']
})
export class LoadingSpinnerDemoComponent {
  readonly FusionUiSize = FusionUiSize;
  loadingSpinnerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildLoadingSpinnerForm();
  }

  buildLoadingSpinnerForm(): void {
    this.loadingSpinnerForm = this.fb.group({
      size: [FusionUiSize.MEDIUM, [Validators.required]],
      opacity: [1, [Validators.required]],
      minWidth: [undefined, [Validators.required]],
      ariaLabel: ['Loading', [Validators.required]],
    })
  }
}
