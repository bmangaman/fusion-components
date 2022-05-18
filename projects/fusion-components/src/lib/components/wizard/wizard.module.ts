import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WizardComponent } from './wizard.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    WizardComponent,
  ],
  exports: [
    CommonModule,

    WizardComponent,
  ],
})
export class WizardModule { }
