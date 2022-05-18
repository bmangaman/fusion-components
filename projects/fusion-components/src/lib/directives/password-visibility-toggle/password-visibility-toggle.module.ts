import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PasswordVisibilityToggleDirective } from './password-visibility-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PasswordVisibilityToggleDirective,
  ],
  exports: [
    CommonModule,

    PasswordVisibilityToggleDirective,
  ]
})
export class PasswordVisibilityToggleModule {}
