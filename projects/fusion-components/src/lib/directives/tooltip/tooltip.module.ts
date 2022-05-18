import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipComponentModule } from '../../components/tooltip';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    TooltipDirective,
  ],
  imports: [
    CommonModule,
    TooltipComponentModule,
  ],
  exports: [
    CommonModule,
    TooltipComponentModule,
    TooltipDirective,
  ],
})
export class TooltipDirectiveModule {}
