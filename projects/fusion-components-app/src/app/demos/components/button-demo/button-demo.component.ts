import { Component } from '@angular/core';

import { ButtonType, Size, State, ButtonInputType } from '@fusion-components';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';

@Component({
    selector: 'fusion-demo-button',
    templateUrl: './button-demo.component.html',
    styleUrls: ['./button-demo.component.scss'],
    standalone: false
})
export class ButtonDemoComponent {
  readonly ButtonType = ButtonType;
  readonly ButtonInputType = ButtonInputType;
  readonly Size = Size;
  readonly State = State;

  buttonForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildButtonForm();
  }

  buildButtonForm(): void {
    this.buttonForm = this.fb.group({
      type: [ButtonType.PRIMARY, [Validators.required]],
      inputType: [ButtonInputType.BUTTON, [Validators.required]],
      size: [Size.MEDIUM, [Validators.required]],
      text: ['Default Button Text', [Validators.required]],
      icon: ['mdi-content-copy', [Validators.required]],
      state: [State.LOADED, [Validators.required]],
      isDisabled: [false],
      isAutofocused: [false],
      isSelected: [false],
      opensMenu: [false],
      noBorder: [false],
      fullWidth: [false],
    })
  }

  buttonClicked(): void {
    console.log('button clicked');
  }
}
