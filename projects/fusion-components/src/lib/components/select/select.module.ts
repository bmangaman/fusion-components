import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AutofocusModule } from '../../directives/autofocus';
import { InstanceOfModule } from '../../pipes/instance-of';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    AutofocusModule,
    CommonModule,
    FormsModule,
    InstanceOfModule,
    ReactiveFormsModule,
    ScrollingModule,
    TranslateModule,
  ],
  declarations: [
    SelectComponent,
  ],
  exports: [
    AutofocusModule,
    CommonModule,
    FormsModule,
    InstanceOfModule,
    ReactiveFormsModule,
    ScrollingModule,

    SelectComponent,
  ],
})
export class SelectModule {}
