import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EnumToArrayModule, GetFusionUiStatusLevelTextModule, MetaModule, PercentageModule } from '@fusion-ui/fusion-components/lib/pipes/';

import { TooltipDirectiveModule } from '../../directives/tooltip';
import { LinearGaugeComponent } from './linear-gauge.component';

@NgModule({
  imports: [
    CommonModule,
    EnumToArrayModule,
    GetFusionUiStatusLevelTextModule,
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
    GetFusionUiStatusLevelTextModule,
    MetaModule,
    PercentageModule,
    TooltipDirectiveModule,

    LinearGaugeComponent,
  ],
})
export class LinearGaugeModule {}
