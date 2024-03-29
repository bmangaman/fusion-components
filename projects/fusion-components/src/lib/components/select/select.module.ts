import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AutofocusModule } from '../../directives/autofocus';
import { ToObservableModule } from '../../pipes/to-observable';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    AutofocusModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ToObservableModule,
  ],
  declarations: [
    SelectComponent,
  ],
  exports: [
    AutofocusModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ToObservableModule,

    SelectComponent,
  ],
})
export class SelectModule {}
