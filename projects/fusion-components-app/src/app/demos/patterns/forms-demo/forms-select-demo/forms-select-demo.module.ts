import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsSelectDemoComponent } from './forms-select-demo.component';

@NgModule({
  declarations: [
    FormsSelectDemoComponent,
  ],
  imports: [
    CommonModule,
    EscapeHtmlModule,
    FormsModule,
  ],
  exports: [
    FormsSelectDemoComponent,
  ]
})
export class FormsSelectDemoModule {}
