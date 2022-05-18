import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '@fusion-ui/fusion-components/lib/components/button';
import { TemplateModule } from '@fusion-ui/fusion-components/lib/directives/template';

import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    TemplateModule,
  ],
  exports: [
    ButtonModule,
    CommonModule,
    TemplateModule,

    MenuComponent,
  ],
})
export class MenuModule { }
