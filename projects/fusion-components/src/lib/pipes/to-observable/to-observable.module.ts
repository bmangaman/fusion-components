import { NgModule } from '@angular/core';

import { ToObservablelPipe } from './to-observable.pipe';

@NgModule({
  declarations: [
    ToObservablelPipe,
  ],
  exports: [
    ToObservablelPipe,
  ],
})
export class ToObservableModule {}
