import { NgModule } from '@angular/core';

import { DeepLinkedTableDirective } from './deep-linked-table.directive';

@NgModule({
  declarations: [
    DeepLinkedTableDirective,
  ],
  exports: [
    DeepLinkedTableDirective,
  ],
})
export class QueryParamsModule {}
