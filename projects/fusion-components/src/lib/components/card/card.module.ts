import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InstanceOfModule } from '@fusion-components/lib/pipes';

import { TemplateModule } from '../../directives/template';
import { GetStatusLevelTextModule } from '../../pipes/get-status-level-text';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule,
    GetStatusLevelTextModule,
    TemplateModule,
    InstanceOfModule,
  ],
  declarations: [
    CardComponent,
  ],
  exports: [
    CommonModule,
    GetStatusLevelTextModule,
    TemplateModule,

    CardComponent,
  ],
})
export class CardModule {}
