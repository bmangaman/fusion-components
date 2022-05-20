import { NgModule } from '@angular/core';

import { WizardModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { WizardDemoComponent } from './wizard-demo.component';
import { WizardDemoRoutingModule } from './wizard-demo-routing.module';

@NgModule({
  declarations: [
    WizardDemoComponent,
  ],
  imports: [
    DemoModule,
    WizardModule,

    WizardDemoRoutingModule,
  ],
})
export class WizardDemoModule {}
