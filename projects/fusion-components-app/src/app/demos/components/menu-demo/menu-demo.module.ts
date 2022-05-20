import { NgModule } from '@angular/core';

import { AutofocusModule, ButtonModule, MenuModule, PipesModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { MenuDemoComponent } from './menu-demo.component';
import { MenuDemoRoutingModule } from './menu-demo-routing.module';

@NgModule({
  declarations: [
    MenuDemoComponent,
  ],
  imports: [
    AutofocusModule,
    ButtonModule,
    DemoModule,
    MenuModule,
    PipesModule,

    MenuDemoRoutingModule,
  ],
})
export class MenuDemoModule {}
