import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidationStylingModule } from '@fusion-components/lib/directives/validation-styling/validation-styling.module';
import { EscapeHtmlModule } from '../../../../shared';
import { FormsTextareaDemoComponent } from './forms-textarea-demo.component';

@NgModule({
  declarations: [
    FormsTextareaDemoComponent,
  ],
  imports: [
    CommonModule,
    EscapeHtmlModule,
    FormsModule,
    ValidationStylingModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsTextareaDemoComponent,
  ]
})
export class FormsTextareaDemoModule {}
