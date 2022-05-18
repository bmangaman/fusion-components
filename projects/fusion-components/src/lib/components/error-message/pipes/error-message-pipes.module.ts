import { NgModule } from '@angular/core';

import { GetAllErrorsPipe } from './get-all-errors';
import { GetSingleErrorPipe } from './get-single-error';

@NgModule({
  declarations: [
    GetAllErrorsPipe,
    GetSingleErrorPipe,
  ],
  exports: [
    GetAllErrorsPipe,
    GetSingleErrorPipe,
  ],
})
export class ErrorMessagePipesModule {}
