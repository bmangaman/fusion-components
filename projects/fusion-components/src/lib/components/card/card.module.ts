import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InstanceOfModule } from '@fusion-ui/fusion-components/lib/pipes';

import { TemplateModule } from '../../directives/template';
import { GetFusionUiStatusLevelTextModule } from '../../pipes/get-fusion-ui-status-level-text';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule,
    GetFusionUiStatusLevelTextModule,
    TemplateModule,
    InstanceOfModule,
  ],
  declarations: [
    CardComponent,
  ],
  exports: [
    CommonModule,
    GetFusionUiStatusLevelTextModule,
    TemplateModule,

    CardComponent,
  ],
})
export class CardModule {}
