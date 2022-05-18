import { NgModule } from '@angular/core';

import { EnumToArrayPipe } from './enum-to-array.pipe';

@NgModule({
  declarations: [
    EnumToArrayPipe,
  ],
  exports: [
    EnumToArrayPipe,
  ],
})
export class EnumToArrayModule {}
