import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsSwitchDemoComponent } from './forms-switch-demo.component';

@NgModule({
    imports: [
        CommonModule,
        EscapeHtmlModule,
        FormsModule,
        ReactiveFormsModule,
        FormsSwitchDemoComponent,
    ],
    exports: [
        FormsSwitchDemoComponent,
    ]
})
export class FormsSwitchDemoModule {}
