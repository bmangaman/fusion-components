import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../../directives';
import { GetStatusLevelTextModule, ToObservableModule } from '../../pipes';

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
