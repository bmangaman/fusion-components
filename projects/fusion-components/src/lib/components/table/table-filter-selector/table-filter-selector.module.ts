import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from '@fusion-components/lib/components/button';
import { MenuModule } from '@fusion-components/lib/components/menu';
import { AutofocusModule } from '@fusion-components/lib/directives/autofocus';
import { InstanceOfModule } from '@fusion-components/lib/pipes/instance-of';

import { TableFilterHostDirective } from './table-filter-host';
import { TableFilterSelectorPipesModule } from './table-filter-selector-pipes';
import { TableFilterSelectorComponent } from './table-filter-selector.component';

@NgModule({
  imports: [
    AutofocusModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    InstanceOfModule,
    MenuModule,
    ReactiveFormsModule,
    TableFilterSelectorPipesModule,
    TranslateModule,
  ],
  declarations: [
    TableFilterHostDirective,
    TableFilterSelectorComponent,
  ],
  exports: [
    AutofocusModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    MenuModule,
    ReactiveFormsModule,

    TableFilterSelectorPipesModule,

    TableFilterHostDirective,
    TableFilterSelectorComponent,
  ],
})
export class TableFilterSelectorModule {}
