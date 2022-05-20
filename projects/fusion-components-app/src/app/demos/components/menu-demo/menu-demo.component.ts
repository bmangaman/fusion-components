import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Location, Size } from '@fusion-components';

@Component({
  selector: 'fusion-demo-menu',
  templateUrl: './menu-demo.component.html',
  styleUrls: ['./menu-demo.component.scss']
})
export class MenuDemoComponent {
  readonly Location = Location;
  readonly Size = Size;

  menuForm: FormGroup;
  isMenuDialogOpen: boolean;

  constructor(
    private fb: FormBuilder,
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
