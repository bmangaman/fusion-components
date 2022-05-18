import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingSpinnerComponent } from './loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoadingSpinnerComponent,
  ],
  exports: [
    CommonModule,

    LoadingSpinnerComponent,
  ],
})
export class LoadingSpinnerModule { }
