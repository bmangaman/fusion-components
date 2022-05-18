import { NgModule } from '@angular/core';

import { StateComponentsModule } from '../../components/state';
import { StateDirective } from './state.directive';

@NgModule({
  declarations: [
    StateDirective,
  ],
  imports: [
    StateComponentsModule,
  ],
  exports: [
    StateComponentsModule,

    StateDirective,
  ],
})
export class StateDirectiveModule {}
