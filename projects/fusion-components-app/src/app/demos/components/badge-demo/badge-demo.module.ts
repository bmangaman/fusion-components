import { NgModule } from '@angular/core';

import { BadgeModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { BadgeDemoComponent } from './badge-demo.component';
import { BadgeDemoRoutingModule } from './badge-demo-routing.module';

@NgModule({
  declarations: [
    BadgeDemoComponent,
  ],
  imports: [
    BadgeModule,
    DemoModule,

    BadgeDemoRoutingModule,
  ],
})
export class BadgeDemoModule {}
