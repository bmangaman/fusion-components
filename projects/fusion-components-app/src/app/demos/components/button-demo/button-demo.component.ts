import { Component } from '@angular/core';

import { ButtonType, FusionUiSize, FusionUiState, ButtonInputType } from '@fusion-ui/fusion-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'fusion-demo-button',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent {
  readonly ButtonType = ButtonType;
  readonly ButtonInputType = ButtonInputType;
  readonly FusionUiSize = FusionUiSize;
  readonly FusionUiState = FusionUiState;

  buttonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildButtonForm();
  }

  buildButtonForm(): void {
    this.buttonForm = this.fb.group({
      type: [ButtonType.PRIMARY, [Validators.required]],
      inputType: [ButtonInputType.BUTTON, [Validators.required]],
      size: [FusionUiSize.MEDIUM, [Validators.required]],
      text: ['Default Button Text', [Validators.required]],
      icon: ['mdi-content-copy', [Validators.required]],
      state: [FusionUiState.LOADED, [Validators.required]],
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
