import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GetFusionUiStatusLevelTextModule } from '../../pipes/get-fusion-ui-status-level-text';
import { BadgeComponent } from './badge.component';

@NgModule({
  imports: [
    CommonModule,
    GetFusionUiStatusLevelTextModule,
  ],
  declarations: [
    BadgeComponent,
  ],
  exports: [
    CommonModule,
    GetFusionUiStatusLevelTextModule,

    BadgeComponent,
  ],
})
export class BadgeModule {}
