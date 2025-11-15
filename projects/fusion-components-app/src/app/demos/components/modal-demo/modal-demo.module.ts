import { NgModule } from '@angular/core';

import { ModalModule, ButtonModule, MenuModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { InnerModalComponent, ModalDemoComponent } from './modal-demo.component';
import { ModalDemoRoutingModule } from './modal-demo-routing.module';

@NgModule({
    imports: [
        ButtonModule,
        DemoModule,
        MenuModule,
        ModalModule,
        ModalDemoRoutingModule,
        ModalDemoComponent,
        InnerModalComponent,
    ],
})
export class ModalDemoModule {}
