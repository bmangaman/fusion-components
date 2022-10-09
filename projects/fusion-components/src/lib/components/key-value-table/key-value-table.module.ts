import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../../directives/template';
import { InstanceOfModule } from '../../pipes/instance-of';
import { ToObservableModule } from '../../pipes/to-observable';


import { KeyValueTableComponent } from './key-value-table.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
    ToObservableModule,
  ],
  declarations: [
    KeyValueTableComponent,
  ],
  exports: [
    CommonModule,
    TemplateModule,
    ToObservableModule,

    KeyValueTableComponent,
  ],
})
export class KeyValueTableModule { }
