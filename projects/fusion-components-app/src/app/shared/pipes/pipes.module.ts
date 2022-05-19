import { NgModule } from '@angular/core';

import { EscapeHtmlModule } from './escape-html';

@NgModule({
  exports: [
    EscapeHtmlModule,
  ],
})
export class PipesModule {}
