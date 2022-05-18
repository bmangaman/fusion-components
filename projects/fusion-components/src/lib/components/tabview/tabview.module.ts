import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutofocusModule } from '../../directives/autofocus';
import { TemplateModule } from '../../directives/template';

import { TabviewTabComponent } from './tab/tabview-tab.component';
import { TabviewComponent } from './tabview.component';

@NgModule({
  imports: [
    AutofocusModule,
    CommonModule,
    TemplateModule,
  ],
  declarations: [
    TabviewComponent,
    TabviewTabComponent,
  ],
  exports: [
    AutofocusModule,
    CommonModule,
    TemplateModule,

    TabviewComponent,
    TabviewTabComponent,
  ],
})
export class TabviewModule { }
