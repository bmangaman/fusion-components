import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PercentMapModule } from '../../pipes';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    PercentMapModule,
  ],
  exports: [
    CommonModule,
    PercentMapModule,

    ProgressBarComponent,
  ],
})
export class ProgressBarModule { }
