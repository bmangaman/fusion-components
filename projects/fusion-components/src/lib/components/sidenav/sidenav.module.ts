import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToObsersableModule } from '@fusion-components';

import { TemplateModule } from '../../directives/template';
import { InstanceOfModule } from '../../pipes/instance-of';
import { NavItemComponent } from './nav-item/nav-item.component';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    InstanceOfModule,
    RouterModule,
    TemplateModule,
    ToObsersableModule,
  ],
  declarations: [
    NavItemComponent,
    SidenavComponent,
  ],
  exports: [
    CommonModule,
    InstanceOfModule,
    RouterModule,
    TemplateModule,

    NavItemComponent,
    SidenavComponent,
  ],
})
export class SidenavModule {}
