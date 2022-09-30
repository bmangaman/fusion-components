import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { Location, Size } from '@fusion-components';

@Component({
  selector: 'fusion-demo-menu',
  templateUrl: './menu-demo.component.html',
  styleUrls: ['./menu-demo.component.scss']
})
export class MenuDemoComponent {
  readonly Location = Location;
  readonly Size = Size;

  menuForm: UntypedFormGroup;
  isMenuDialogOpen: boolean;

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildMenuForm();
  }

  buildMenuForm(): void {
    this.menuForm = this.fb.group({
      dialogLocation: [Location.TOP],
      minWidth: [200, []],
      maxHeight: [200, []],
    })
  }
}
