import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingSpinnerModule } from '../loading-spinner';

import { StateComponent } from './state.component';

@NgModule({
  declarations: [
    StateComponent,
  ],
  imports: [
    CommonModule,
    LoadingSpinnerModule,
  ],
  entryComponents: [
    StateComponent,
  ],
  exports: [
    CommonModule,
    LoadingSpinnerModule,

    StateComponent,
  ],
})
export class StateComponentsModule { }
