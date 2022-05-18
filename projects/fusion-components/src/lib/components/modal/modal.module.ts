import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalContentModule } from './modal-content/modal-content.module';
import { ModalFooterModule } from './modal-footer/modal-footer.module';
import { ModalHeaderModule } from './modal-header/modal-header.module';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalContentModule,
    ModalFooterModule,
    ModalHeaderModule,
  ],
  declarations: [
    ModalComponent,
  ],
  exports: [
    CommonModule,
    ModalContentModule,
    ModalFooterModule,
    ModalHeaderModule,
    ModalComponent,
  ]
})
export class ModalModule {}
