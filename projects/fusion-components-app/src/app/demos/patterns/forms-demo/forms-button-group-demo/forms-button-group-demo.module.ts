import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsButtonGroupDemoComponent } from './forms-button-group-demo.component';

@NgModule({
    imports: [
        CommonModule,
        EscapeHtmlModule,
        FormsModule,
        FormsButtonGroupDemoComponent,
    ],
    exports: [
        FormsButtonGroupDemoComponent,
    ]
})
export class FormsButtonGroupDemoModule {}
