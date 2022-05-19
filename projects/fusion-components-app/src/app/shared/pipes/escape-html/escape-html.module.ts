import { NgModule } from '@angular/core';

import { EscapeHtmlPipe } from './escape-html.pipe';

@NgModule({
  declarations: [
    EscapeHtmlPipe,
  ],
  exports: [
    EscapeHtmlPipe,
  ],
})
export class EscapeHtmlModule {}
