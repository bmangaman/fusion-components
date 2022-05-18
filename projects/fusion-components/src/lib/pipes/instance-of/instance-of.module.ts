import { NgModule } from '@angular/core';

import { InstanceOfPipe } from './instance-of.pipe';

@NgModule({
  declarations: [
    InstanceOfPipe,
  ],
  exports: [
    InstanceOfPipe,
  ],
})
export class InstanceOfModule {}
