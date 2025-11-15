import { NgModule } from '@angular/core';

import { TableModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { TypographyPatternComponent } from './typography-pattern.component';
import { TypographyPatternRoutingModule } from './typography-pattern-routing.module';

@NgModule({
    imports: [
        DemoModule,
        TableModule,
        TypographyPatternRoutingModule,
        TypographyPatternComponent,
    ],
})
export class TypographyPatternModule {}
