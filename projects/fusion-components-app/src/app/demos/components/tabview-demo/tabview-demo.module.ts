import { NgModule } from '@angular/core';

import { TabviewModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { TabviewDemoComponent } from './tabview-demo.component';
import { TabviewDemoRoutingModule } from './tabview-demo-routing.module';

@NgModule({
  declarations: [
    TabviewDemoComponent,
  ],
  imports: [
    DemoModule,
    TabviewModule,

    TabviewDemoRoutingModule,
  ],
})
export class TabviewDemoModule {}
