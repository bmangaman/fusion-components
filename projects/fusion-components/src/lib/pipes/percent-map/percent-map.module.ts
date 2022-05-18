import { NgModule } from '@angular/core';

import { PercentMapPipe } from './percent-map.pipe';

@NgModule({
  declarations: [
    PercentMapPipe,
  ],
  exports: [
    PercentMapPipe,
  ],
})
export class PercentMapModule {}
