import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../../directives/template';
import { GetStatusLevelTextModule } from '../../pipes/get-status-level-text';
import { ToObservableModule } from '../../pipes/to-observable';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule,
    GetStatusLevelTextModule,
    TemplateModule,
    ToObservableModule,
  ],
  declarations: [
    CardComponent,
  ],
  exports: [
    CommonModule,
    GetStatusLevelTextModule,
    TemplateModule,
    ToObservableModule,

    CardComponent,
  ],
})
export class CardModule {}
