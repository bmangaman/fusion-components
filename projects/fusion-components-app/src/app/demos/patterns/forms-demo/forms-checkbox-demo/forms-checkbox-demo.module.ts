import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsCheckboxDemoComponent } from './forms-checkbox-demo.component';

@NgModule({
    imports: [
        CommonModule,
        EscapeHtmlModule,
        FormsModule,
        FormsCheckboxDemoComponent,
    ],
    exports: [
        FormsCheckboxDemoComponent,
    ]
})
export class FormsCheckboxDemoModule {}
