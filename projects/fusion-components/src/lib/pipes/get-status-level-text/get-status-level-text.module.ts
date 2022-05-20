import { NgModule } from '@angular/core';

import { GetStatusLevelTextPipe } from './get-status-level-text.pipe';

@NgModule({
  declarations: [
    GetStatusLevelTextPipe,
  ],
  exports: [
    GetStatusLevelTextPipe,
  ],
})
export class GetStatusLevelTextModule {}
