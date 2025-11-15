import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Position, MouseInteraction } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { TooltipDirectiveModule } from '../../../../../../fusion-components/src/lib/directives/tooltip/tooltip.module';

@Component({
    selector: 'fusion-demo-tooltip',
    templateUrl: './tooltip-demo.component.html',
    styleUrls: ['./tooltip-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, TooltipDirectiveModule]
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
