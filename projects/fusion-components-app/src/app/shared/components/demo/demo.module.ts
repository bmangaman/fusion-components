import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [
    DemoComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    DemoComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DemoModule {}
