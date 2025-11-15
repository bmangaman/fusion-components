import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EscapeHtmlModule } from '../../../../shared';
import { FormsButtonDemoComponent } from './forms-button-demo.component';

@NgModule({
    imports: [
        CommonModule,
        EscapeHtmlModule,
        FormsModule,
        FormsButtonDemoComponent,
    ],
    exports: [
        FormsButtonDemoComponent,
    ]
})
export class FormsButtonDemoModule {}
