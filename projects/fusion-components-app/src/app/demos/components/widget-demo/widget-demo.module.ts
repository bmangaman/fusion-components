import { NgModule } from '@angular/core';

import { WidgetModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { WidgetDemoComponent } from './widget-demo.component';
import { WidgetDemoRoutingModule } from './widget-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        WidgetModule,
        WidgetDemoRoutingModule,
        WidgetDemoComponent,
    ],
})
export class WidgetdDemoModule {}
