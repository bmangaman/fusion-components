import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fusion-demo-checkbox',
  templateUrl: './checkbox-demo.component.html',
  styleUrls: ['./checkbox-demo.component.scss']
})
export class CheckboxDemoComponent {
  checkboxForm: FormGroup;

  checkboxFormControl: FormControl = new FormControl(null);

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildSelectForm();
  }

  /**
   * Builds the select form and then subscribes to when the numOfOptions and hasDisabledOptions fields change.
   */
  buildSelectForm(): void {
    this.checkboxForm = this.fb.group({
      label: ['Label'],
      isDisabled: [false],
      isRequired: [false],
    });

    this.checkboxForm.get('isDisabled').valueChanges.subscribe((val: boolean) => {
      val ? this.checkboxFormControl.disable() : this.checkboxFormControl.enable();
    })

    this.checkboxForm.get('isRequired').valueChanges.subscribe((val: boolean) => {
      val ? this.checkboxFormControl.setValidators(Validators.requiredTrue) : this.checkboxFormControl.clearValidators();
      this.checkboxFormControl.updateValueAndValidity();
    })
  }
}
