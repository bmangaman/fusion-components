import { NgModule } from '@angular/core';

import { TableModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { TypographyPatternComponent } from './typography-pattern.component';
import { TypographyPatternRoutingModule } from './typography-pattern-routing.module';

@NgModule({
  declarations: [
    TypographyPatternComponent,
  ],
  imports: [
    DemoModule,
    TableModule,

    TypographyPatternRoutingModule,
  ],
})
export class TypographyPatternModule {}
