import { NgModule } from '@angular/core';

import { StateDirectiveModule } from 'fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { StateDemoComponent } from './state-demo.component';
import { StateDemoRoutingModule } from './state-demo-routing.module';

@NgModule({
  declarations: [
    StateDemoComponent,
  ],
  imports: [
    DemoModule,
    StateDirectiveModule,

    StateDemoRoutingModule,
  ],
})
export class StateDemoModule {}
