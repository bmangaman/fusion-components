import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingSpinnerModule } from '@fusion-ui/fusion-components/lib/components/loading-spinner';
import { AutofocusModule } from '@fusion-ui/fusion-components/lib/directives/autofocus';

import { ButtonComponent } from './button.component';

@NgModule({
  imports: [
    AutofocusModule,
    CommonModule,
    LoadingSpinnerModule,
  ],
  declarations: [
    ButtonComponent,
  ],
  exports: [
    AutofocusModule,
    CommonModule,
    LoadingSpinnerModule,

    ButtonComponent,
  ],
})
export class ButtonModule { }
