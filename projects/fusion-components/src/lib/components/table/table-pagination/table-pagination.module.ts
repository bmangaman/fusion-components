import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '../../../components/button';

import { TablePaginationPipesModule } from './pipes';
import { TablePaginationComponent } from './table-pagination.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TablePaginationPipesModule,
  ],
  declarations: [
    TablePaginationComponent,
  ],
  exports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TablePaginationPipesModule,

    TablePaginationComponent,
  ],
})
export class TablePaginationModule {}
