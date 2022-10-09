import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemplateModule } from '../../directives/template';
import { InstanceOfModule } from '../../pipes/instance-of';
import { ToObservableModule } from '../../pipes/to-observable';
import { NavItemComponent } from './nav-item/nav-item.component';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    InstanceOfModule,
    RouterModule,
    TemplateModule,
    ToObservableModule,
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
    ToObservableModule,

    NavItemComponent,
    SidenavComponent,
  ],
})
export class SidenavModule {}
