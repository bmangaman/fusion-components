import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipComponent } from './tooltip.component';

@NgModule({
  declarations: [
    TooltipComponent,
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
    TooltipComponent,
  ],
  exports: [
    CommonModule,

    TooltipComponent,
  ],
})
export class TooltipComponentModule {}
