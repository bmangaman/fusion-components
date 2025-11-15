import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CheckboxModule, ErrorMessageGeneratorService, ErrorMessageModule, ValidationStylingModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { ErrorMessageDemoComponent } from './error-message-demo.component';
import { ErrorMessageDemoRoutingModule } from './error-message-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        CheckboxModule,
        ErrorMessageModule,
        ValidationStylingModule,
        TranslateModule,
        ErrorMessageDemoRoutingModule,
        ErrorMessageDemoComponent,
    ],
    providers: [
        ErrorMessageGeneratorService,
    ],
})
export class ErrorMessageDemoModule {}
