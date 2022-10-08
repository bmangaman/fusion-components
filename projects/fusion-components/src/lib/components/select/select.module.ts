import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


import { AutofocusModule } from '../../directives/autofocus';
import { ToObsersableModule } from '../../pipes/to-observable';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    AutofocusModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ToObsersableModule,
    TranslateModule,
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
    ToObsersableModule,

    SelectComponent,
  ],
})
export class SelectModule {}
