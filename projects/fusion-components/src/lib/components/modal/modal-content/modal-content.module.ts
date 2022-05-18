import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalContentComponent } from './modal-content.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ModalContentComponent,
  ],
  exports: [
    CommonModule,

    ModalContentComponent,
  ]
})
export class ModalContentModule {}
