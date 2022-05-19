import { NgModule } from '@angular/core';

import { TabviewModule, PipesModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../shared/components/demo/demo.module';
import { PipesDemoComponent } from './pipes-demo.component';
import { PipesDemoRoutingModule } from './pipes-demo-routing.module';

@NgModule({
  declarations: [
    PipesDemoComponent,
  ],
  imports: [
    DemoModule,
    PipesModule,
    TabviewModule,

    PipesDemoRoutingModule,
  ],
})
export class PipesDemoModule {}
