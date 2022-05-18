import { NgModule } from '@angular/core';

import { ToCssClassPipe } from './to-css-class.pipe';

@NgModule({
  declarations: [
    ToCssClassPipe,
  ],
  exports: [
    ToCssClassPipe,
  ],
})
export class ToCssClassModule {}
