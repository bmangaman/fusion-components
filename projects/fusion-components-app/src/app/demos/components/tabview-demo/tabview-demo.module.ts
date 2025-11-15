import { NgModule } from '@angular/core';

import { TabviewModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { TabviewDemoComponent } from './tabview-demo.component';
import { TabviewDemoRoutingModule } from './tabview-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        TabviewModule,
        TabviewDemoRoutingModule,
        TabviewDemoComponent,
    ],
})
export class TabviewDemoModule {}
