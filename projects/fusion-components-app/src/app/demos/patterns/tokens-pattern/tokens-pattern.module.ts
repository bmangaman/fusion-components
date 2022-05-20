import { NgModule } from '@angular/core';

import { TabviewModule, PipesModule } from 'fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { TokensPatternComponent } from './tokens-pattern.component';
import { TokensPatternRoutingModule } from './tokens-pattern-routing.module';

@NgModule({
  declarations: [
    TokensPatternComponent,
  ],
  imports: [
    DemoModule,
    PipesModule,
    TabviewModule,

    TokensPatternRoutingModule,
  ],
})
export class TokensPatternModule {}
