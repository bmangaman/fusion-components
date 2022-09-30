import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TableFilterModule } from '../table-filter';
import { TableFilterComparatorModule } from '../table-filter-comparator';
import { TableFilterStringComponent } from './table-filter-string.component';

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
        TableFilterStringComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableFilterComparatorModule,
        TableFilterModule,
        TableFilterStringComponent,
    ]
})
export class TableFilterStringModule {}
