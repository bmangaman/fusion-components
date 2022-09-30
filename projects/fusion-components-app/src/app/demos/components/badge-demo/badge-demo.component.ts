import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { StatusLevel, Size } from '@fusion-components';

@Component({
  selector: 'fusion-demo-badge',
  templateUrl: './badge-demo.component.html',
  styleUrls: ['./badge-demo.component.scss'],
})
export class BadgeDemoComponent {
  readonly Size = Size;
  readonly StatusLevel = StatusLevel;

  badgeForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildBadgeForm();
  }

  buildBadgeForm(): void {
    this.badgeForm = this.fb.group({
      type: [StatusLevel.BASE, Validators.required],
      size: [Size.MEDIUM, Validators.required],
      text: ['text'],
      subText: [],
      fillcontainer: [false],
    });
  }
}
