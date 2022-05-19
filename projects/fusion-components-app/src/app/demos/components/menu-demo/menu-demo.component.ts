import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FusionUiLocation, FusionUiSize } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-menu',
  templateUrl: './menu-demo.component.html',
  styleUrls: ['./menu-demo.component.scss']
})
export class MenuDemoComponent {
  readonly FusionUiLocation = FusionUiLocation;
  readonly FusionUiSize = FusionUiSize;

  menuForm: FormGroup;
  isMenuDialogOpen: boolean;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildMenuForm();
  }

  buildMenuForm(): void {
    this.menuForm = this.fb.group({
      dialogLocation: [FusionUiLocation.TOP],
      minWidth: [200, []],
      maxHeight: [200, []],
    })
  }
}
