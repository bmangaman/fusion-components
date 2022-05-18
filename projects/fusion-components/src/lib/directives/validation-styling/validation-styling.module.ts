import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ValidationStylingDirective } from './validation-styling.directive';

@NgModule({
  declarations: [
    ValidationStylingDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ValidationStylingDirective,
  ]
})
export class ValidationStylingModule {}
