import { NgModule } from '@angular/core';

import { ButtonModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { ButtonDemoComponent } from './button-demo.component';
import { ButtonDemoRoutingModule } from './button-demo-routing.module';

@NgModule({
  declarations: [
    ButtonDemoComponent,
  ],
  imports: [
    ButtonModule,
    DemoModule,

    ButtonDemoRoutingModule,
  ],
})
export class ButtonDemoModule {}
