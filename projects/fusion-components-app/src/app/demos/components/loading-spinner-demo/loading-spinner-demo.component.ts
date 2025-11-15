import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { LoadingSpinnerModule } from '../../../../../../fusion-components/src/lib/components/loading-spinner/loading-spinner.module';

@Component({
    selector: 'fusion-demo-loading-spinner',
    templateUrl: './loading-spinner-demo.component.html',
    styleUrls: ['./loading-spinner-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, LoadingSpinnerModule]
})
export class LoadingSpinnerDemoComponent {
  readonly Size = Size;
  loadingSpinnerForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
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
