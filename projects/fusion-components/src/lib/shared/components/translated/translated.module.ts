import { NgModule } from '@angular/core';

import { TranslatedComponent } from './translated.component';

@NgModule({
  declarations: [
    TranslatedComponent,
  ],
  exports: [
    TranslatedComponent,
  ],
})
export class TranslatedModule {}
