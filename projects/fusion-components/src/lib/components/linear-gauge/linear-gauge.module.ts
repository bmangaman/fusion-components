import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EnumToArrayModule, GetStatusLevelTextModule, MetaModule, PercentageModule } from '@fusion-components/lib/pipes/';

import { TooltipDirectiveModule } from '../../directives/tooltip';
import { LinearGaugeComponent } from './linear-gauge.component';

@NgModule({
  imports: [
    CommonModule,
    EnumToArrayModule,
    GetStatusLevelTextModule,
    MetaModule,
    PercentageModule,
    TooltipDirectiveModule,
  ],
  declarations: [
    LinearGaugeComponent,
  ],
  exports: [
    CommonModule,
    EnumToArrayModule,
    GetStatusLevelTextModule,
    MetaModule,
    PercentageModule,
    TooltipDirectiveModule,

    LinearGaugeComponent,
  ],
})
export class LinearGaugeModule {}
