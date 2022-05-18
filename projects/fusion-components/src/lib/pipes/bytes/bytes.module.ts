import { NgModule } from '@angular/core';

import { EnumToArrayModule } from '../enum-to-array';
import { BytesPipe } from './bytes.pipe';

@NgModule({
  imports: [
    EnumToArrayModule,
  ],
  declarations: [
    BytesPipe,
  ],
  exports: [
    EnumToArrayModule,

    BytesPipe,
  ],
})
export class BytesModule {}
