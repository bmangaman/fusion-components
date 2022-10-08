import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../../directives/template';
import { InstanceOfModule } from '../../pipes/instance-of';
import { ToObsersableModule } from '../../pipes/to-observable';


import { KeyValueTableComponent } from './key-value-table.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
    ToObsersableModule,
  ],
  declarations: [
    KeyValueTableComponent,
  ],
  exports: [
    CommonModule,
    TemplateModule,
    ToObsersableModule,

    KeyValueTableComponent,
  ],
})
export class KeyValueTableModule { }
