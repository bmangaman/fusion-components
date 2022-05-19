import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { of } from 'rxjs';

import { ErrorMessage, ErrorMessageGeneratorService } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-error-message',
  templateUrl: './error-message-demo.component.html',
  styleUrls: ['./error-message-demo.component.scss'],
})
export class ErrorMessageDemoComponent {
  errorMessageForm: FormGroup;
  errorMessageFormControl: FormControl = new FormControl(
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
    private fb: FormBuilder,
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
