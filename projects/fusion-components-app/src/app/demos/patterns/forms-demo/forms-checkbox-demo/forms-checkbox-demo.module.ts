import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsCheckboxDemoComponent } from './forms-checkbox-demo.component';

@NgModule({
  declarations: [
    FormsCheckboxDemoComponent,
  ],
  imports: [
    CommonModule,
    EscapeHtmlModule,
    FormsModule,
  ],
  exports: [
    FormsCheckboxDemoComponent,
  ]
})
export class FormsCheckboxDemoModule {}
