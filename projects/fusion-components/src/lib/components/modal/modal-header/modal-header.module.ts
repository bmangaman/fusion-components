import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalHeaderComponent } from './modal-header.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ModalHeaderComponent,
  ],
  exports: [
    CommonModule,

    ModalHeaderComponent,
  ]
})
export class ModalHeaderModule {}
