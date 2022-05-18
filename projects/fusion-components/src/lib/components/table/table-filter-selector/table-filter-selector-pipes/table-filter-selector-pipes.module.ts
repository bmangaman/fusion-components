import { NgModule } from '@angular/core';

import { GroupAppliedFiltersPipe } from './group-applied-filters';
import { VisibleAppliedFiltersPipe } from './visible-applied-filters';

@NgModule({
  imports: [],
  declarations: [
    GroupAppliedFiltersPipe,
    VisibleAppliedFiltersPipe,
  ],
  exports: [
    GroupAppliedFiltersPipe,
    VisibleAppliedFiltersPipe,
  ],
})
export class TableFilterSelectorPipesModule {}
