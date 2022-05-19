import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsButtonDemoComponent } from './forms-button-demo.component';

@NgModule({
  declarations: [
    FormsButtonDemoComponent,
  ],
  imports: [
    CommonModule,
    EscapeHtmlModule,
    FormsModule,
  ],
  exports: [
    FormsButtonDemoComponent,
  ]
})
export class FormsButtonDemoModule {}
