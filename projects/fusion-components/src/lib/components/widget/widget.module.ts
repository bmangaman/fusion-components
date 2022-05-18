import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../../directives/template';
import { BadgeModule } from '../badge';
import { ButtonModule } from '../button';
import { WidgetComponent } from './widget.component';

@NgModule({
  imports: [
    BadgeModule,
    ButtonModule,
    CommonModule,
    TemplateModule,
  ],
  declarations: [
    WidgetComponent,
  ],
  exports: [
    BadgeModule,
    ButtonModule,
    CommonModule,
    TemplateModule,

    WidgetComponent,
  ],
})
export class WidgetModule {}
