import { NgModule } from '@angular/core';

import { PasswordVisibilityToggleModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { PasswordVisibilitytoggleDemoComponent } from './password-visibility-toggle-demo.component';
import { PasswordVisibilityToggleDemoRoutingModule } from './password-visibility-toggle-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        PasswordVisibilityToggleModule,
        PasswordVisibilityToggleDemoRoutingModule,
        PasswordVisibilitytoggleDemoComponent,
    ],
})
export class PasswordVisibilityToggleDemoModule {}
