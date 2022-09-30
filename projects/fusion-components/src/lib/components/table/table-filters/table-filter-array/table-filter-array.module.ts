import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TableFilterModule } from '../table-filter';
import { TableFilterComparatorModule } from '../table-filter-comparator';
import { TableFilterArrayComponent } from './table-filter-array.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableFilterComparatorModule,
        TableFilterModule,
        TranslateModule,
    ],
    declarations: [
        TableFilterArrayComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableFilterComparatorModule,
        TableFilterModule,
        TableFilterArrayComponent,
    ]
})
export class TableFilterArrayModule {}
