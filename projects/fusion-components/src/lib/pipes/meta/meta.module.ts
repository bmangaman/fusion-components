import { NgModule } from '@angular/core';

import { MetaPipe } from './meta.pipe';

@NgModule({
  declarations: [
    MetaPipe,
  ],
  exports: [
    MetaPipe,
  ],
})
export class MetaModule {}
