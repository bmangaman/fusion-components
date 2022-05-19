import { NgModule } from '@angular/core';

import { SidenavModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { SidenavDemoComponent } from './sidenav-demo.component';
import { SidenavDemoRoutingModule } from './sidenav-demo-routing.module';

@NgModule({
  declarations: [
    SidenavDemoComponent,
  ],
  imports: [
    DemoModule,
    SidenavModule,

    SidenavDemoRoutingModule,
  ],
})
export class SidenavDemoModule {}
