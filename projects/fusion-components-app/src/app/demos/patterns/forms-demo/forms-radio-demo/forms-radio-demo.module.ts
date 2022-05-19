import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsRadioDemoComponent } from './forms-radio-demo.component';

@NgModule({
  declarations: [
    FormsRadioDemoComponent,
  ],
  imports: [
    CommonModule,
    EscapeHtmlModule,
    FormsModule,
  ],
  exports: [
    FormsRadioDemoComponent,
  ]
})
export class FormsRadioDemoModule {}
