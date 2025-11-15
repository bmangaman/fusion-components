import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';

import { ErrorMessage, ErrorMessageGeneratorService } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { CheckboxModule } from '../../../../../../fusion-components/src/lib/components/checkbox/checkbox.module';
import { ValidationStylingModule } from '../../../../../../fusion-components/src/lib/directives/validation-styling/validation-styling.module';
import { ErrorMessageModule } from '../../../../../../fusion-components/src/lib/components/error-message/error-message.module';

@Component({
    selector: 'fusion-demo-error-message',
    templateUrl: './error-message-demo.component.html',
    styleUrls: ['./error-message-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, CheckboxModule, ValidationStylingModule, ErrorMessageModule]
})
export class ErrorMessageDemoComponent {
  errorMessageForm: UntypedFormGroup;
  errorMessageFormControl: UntypedFormControl = new UntypedFormControl(
      '',
    [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(5),
      Validators.pattern(/^\D*$/),
    ],
  );

  errorMessages: ErrorMessage[] = [
    this.errorMessageGenerator.required({ priority: 0 }),
    this.errorMessageGenerator.minLength({ priority: 1, translationConfig: { min: 5, isPlural: true }}),
    this.errorMessageGenerator.maxLength({ priority: 2, translationConfig: { max: 10, isPlural: true }}),
    {
      priority: 4,
      translation: of('No numbers'),
      error: 'pattern'
    },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private errorMessageGenerator: ErrorMessageGeneratorService,
  ) {
    this.buildErrorMessageForm();

    this.errorMessageFormControl.valueChanges.subscribe(() => console.log('errors', this.errorMessageFormControl.errors));
  }

  /**
   * Builds the error message form.
   */
  buildErrorMessageForm(): void {
    this.errorMessageForm = this.fb.group({
      hasErrors: [true],
      displayMultiple: [false],
    });
  }
}
