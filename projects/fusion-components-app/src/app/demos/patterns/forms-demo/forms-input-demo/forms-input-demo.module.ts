import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidationStylingModule } from 'fusion-components/lib/directives/validation-styling/validation-styling.module';
import { EscapeHtmlModule } from '../../../../shared';
import { FormsInputDemoComponent } from './forms-input-demo.component';

@NgModule({
  declarations: [
    FormsInputDemoComponent,
  ],
  imports: [
    CommonModule,
    EscapeHtmlModule,
    FormsModule,
    ValidationStylingModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsInputDemoComponent,
  ]
})
export class FormsInputDemoModule {}
