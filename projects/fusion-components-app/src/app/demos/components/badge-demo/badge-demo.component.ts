import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FusionUiStatusLevel, FusionUiSize } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-badge',
  templateUrl: './badge-demo.component.html',
  styleUrls: ['./badge-demo.component.scss'],
})
export class BadgeDemoComponent {
  readonly FusionUiSize = FusionUiSize;
  readonly FusionUiStatusLevel = FusionUiStatusLevel;

  badgeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildBadgeForm();
  }

  buildBadgeForm(): void {
    this.badgeForm = this.fb.group({
      type: [FusionUiStatusLevel.BASE, Validators.required],
      size: [FusionUiSize.MEDIUM, Validators.required],
      text: ['text'],
      subText: [],
      fillcontainer: [false],
    });
  }
}
