import { NgModule } from '@angular/core';

import { NotificationModule } from '@fusion-components/lib/components/notification';

import { TemplateModule } from '@fusion-components';
import { DemoModule } from '../../../shared/components/demo/demo.module';
import { NotificationDemoComponent } from './notification-demo.component';
import { NotificationDemoRoutingModule } from './notification-demo-routing-module';

@NgModule({
    imports: [
        DemoModule,
        NotificationModule,
        TemplateModule,
        NotificationDemoRoutingModule,
        NotificationDemoComponent,
    ]
})
export class NotificationDemoModule {}
