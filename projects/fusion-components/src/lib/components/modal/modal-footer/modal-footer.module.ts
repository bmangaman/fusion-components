import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalFooterComponent } from './modal-footer.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ModalFooterComponent,
  ],
  exports: [
    CommonModule,

    ModalFooterComponent,
  ]
})
export class ModalFooterModule {}
