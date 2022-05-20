import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GetStatusLevelTextModule } from '../../pipes/get-status-level-text';
import { BadgeComponent } from './badge.component';

@NgModule({
  imports: [
    CommonModule,
    GetStatusLevelTextModule,
  ],
  declarations: [
    BadgeComponent,
  ],
  exports: [
    CommonModule,
    GetStatusLevelTextModule,

    BadgeComponent,
  ],
})
export class BadgeModule {}
