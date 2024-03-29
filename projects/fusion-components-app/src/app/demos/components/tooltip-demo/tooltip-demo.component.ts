import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Position, MouseInteraction } from '@fusion-components';

@Component({
  selector: 'fusion-demo-tooltip',
  templateUrl: './tooltip-demo.component.html',
  styleUrls: ['./tooltip-demo.component.scss']
})
export class TooltipDemoComponent {
  readonly Position = Position;
  readonly MouseInteraction = MouseInteraction;
  tooltipForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildTooltipForm();
  }

  buildTooltipForm(): void {
    this.tooltipForm = this.fb.group({
      position: [Position.TOP, Validators.required],
      text: ['Tooltip Text'],
      template: [false],
      displayOn: [MouseInteraction.CLICK],
      hideOn: [MouseInteraction.CLICK],
    });
  }
}
