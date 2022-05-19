import { NgModule } from '@angular/core';

import { ModalModule, ButtonModule, MenuModule, DomService, ModalService } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { InnerModalComponent, ModalDemoComponent } from './modal-demo.component';
import { ModalDemoRoutingModule } from './modal-demo-routing.module';

@NgModule({
  declarations: [
    ModalDemoComponent,
    InnerModalComponent,
  ],
  imports: [
    ButtonModule,
    DemoModule,
    MenuModule,
    ModalModule,

    ModalDemoRoutingModule,
  ],
  providers: [
    ModalService,
    DomService,
  ]
})
export class ModalDemoModule {}
