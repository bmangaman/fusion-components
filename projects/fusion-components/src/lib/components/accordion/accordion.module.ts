import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../../directives/template';

import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './panel/accordion-panel.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
  ],
  declarations: [
    AccordionComponent,
    AccordionPanelComponent,
  ],
  exports: [
    CommonModule,
    TemplateModule,

    AccordionComponent,
    AccordionPanelComponent,
  ],
})
export class AccordionModule { }
