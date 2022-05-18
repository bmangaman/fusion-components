import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../../directives/template';
import { InstanceOfModule } from '../../pipes/instance-of';

import { KeyValueTableComponent } from './key-value-table.component';

@NgModule({
  imports: [
    CommonModule,
    InstanceOfModule,
    TemplateModule,
  ],
  declarations: [
    KeyValueTableComponent,
  ],
  exports: [
    CommonModule,
    InstanceOfModule,
    TemplateModule,

    KeyValueTableComponent,
  ],
})
export class KeyValueTableModule { }
