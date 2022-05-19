import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsSwitchDemoComponent } from './forms-switch-demo.component';

@NgModule({
  declarations: [
    FormsSwitchDemoComponent,
  ],
  imports: [
    CommonModule,
    EscapeHtmlModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsSwitchDemoComponent,
  ]
})
export class FormsSwitchDemoModule {}
