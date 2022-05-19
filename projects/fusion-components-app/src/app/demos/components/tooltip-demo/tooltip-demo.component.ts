import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FusionUiPosition, MouseInteraction } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-tooltip',
  templateUrl: './tooltip-demo.component.html',
  styleUrls: ['./tooltip-demo.component.scss']
})
export class TooltipDemoComponent {
  readonly FusionUiPosition = FusionUiPosition;
  readonly MouseInteraction = MouseInteraction;
  tooltipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildTooltipForm();
  }

  buildTooltipForm(): void {
    this.tooltipForm = this.fb.group({
      position: [FusionUiPosition.TOP, Validators.required],
      text: ['Tooltip Text'],
      template: [false],
      displayOn: [MouseInteraction.CLICK],
      hideOn: [MouseInteraction.CLICK],
    });
  }
}
