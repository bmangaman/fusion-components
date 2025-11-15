import { NgModule } from '@angular/core';

import { SidenavModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { SidenavDemoComponent } from './sidenav-demo.component';
import { SidenavDemoRoutingModule } from './sidenav-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        SidenavModule,
        SidenavDemoRoutingModule,
        SidenavDemoComponent,
    ],
})
export class SidenavDemoModule {}
