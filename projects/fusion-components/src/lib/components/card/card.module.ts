import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../../directives/template';
import { GetStatusLevelTextModule } from '../../pipes/get-status-level-text';
import { ToObsersableModule } from '../../pipes/to-observable';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule,
    GetStatusLevelTextModule,
    TemplateModule,
    ToObsersableModule,
  ],
  declarations: [
    CardComponent,
  ],
  exports: [
    CommonModule,
    GetStatusLevelTextModule,
    TemplateModule,
    ToObsersableModule,

    CardComponent,
  ],
})
export class CardModule {}
