import { NgModule } from '@angular/core';

import { GetCenterFivePagesPipe } from './get-center-five-pages';
import { NumOfResultsPipe } from './num-of-results';

@NgModule({
  declarations: [
    GetCenterFivePagesPipe,
    NumOfResultsPipe,
  ],
  exports: [
    GetCenterFivePagesPipe,
    NumOfResultsPipe,
  ],
})
export class TablePaginationPipesModule {}
