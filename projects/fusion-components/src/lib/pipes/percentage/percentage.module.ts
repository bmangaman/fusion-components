import { NgModule } from '@angular/core';

import { PercentagePipe } from './percentage.pipe';

@NgModule({
  declarations: [
    PercentagePipe,
  ],
  exports: [
    PercentagePipe,
  ],
})
export class PercentageModule {}
