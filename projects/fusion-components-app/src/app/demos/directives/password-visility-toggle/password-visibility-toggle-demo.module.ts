import { NgModule } from '@angular/core';

import { PasswordVisibilityToggleModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { PasswordVisibilitytoggleDemoComponent } from './password-visibility-toggle-demo.component';
import { PasswordVisibilityToggleDemoRoutingModule } from './password-visibility-toggle-demo-routing.module';

@NgModule({
  declarations: [
    PasswordVisibilitytoggleDemoComponent,
  ],
  imports: [
    DemoModule,
    PasswordVisibilityToggleModule,

    PasswordVisibilityToggleDemoRoutingModule,
  ],
})
export class PasswordVisibilityToggleDemoModule {}
