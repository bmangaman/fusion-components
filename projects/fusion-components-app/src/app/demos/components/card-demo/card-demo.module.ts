import { NgModule } from '@angular/core';

import { CardModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { CardDemoComponent } from './card-demo.component';
import { CardDemoRoutingModule } from './card-demo-routing.module';

@NgModule({
  declarations: [
    CardDemoComponent,
  ],
  imports: [
    CardModule,
    DemoModule,

    CardDemoRoutingModule,
  ],
})
export class CardDemoModule {}
