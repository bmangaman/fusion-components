import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonType, Location, Size } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { MenuModule } from '../../../../../../fusion-components/src/lib/components/menu/menu.module';
import { TemplateModule } from '../../../../../../fusion-components/src/lib/directives/template/template.module';
import { ButtonModule } from '../../../../../../fusion-components/src/lib/components/button/button.module';
import { AutofocusModule } from '../../../../../../fusion-components/src/lib/directives/autofocus/autofocus.module';
import { EnumToArrayModule } from '../../../../../../fusion-components/src/lib/pipes/enum-to-array/enum-to-array.module';

@Component({
    selector: 'fusion-demo-menu',
    templateUrl: './menu-demo.component.html',
    styleUrls: ['./menu-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, MenuModule, TemplateModule, ButtonModule, AutofocusModule, EnumToArrayModule]
})
export class MenuDemoComponent {
  readonly ButtonType = ButtonType;
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
