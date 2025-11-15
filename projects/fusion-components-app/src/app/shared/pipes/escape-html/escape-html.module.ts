import { NgModule } from '@angular/core';

import { EscapeHtmlPipe } from './escape-html.pipe';

@NgModule({
    imports: [EscapeHtmlPipe],
    exports: [
        EscapeHtmlPipe,
    ],
})
export class EscapeHtmlModule {}
