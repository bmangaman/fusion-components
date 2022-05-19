import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CheckboxModule, ErrorMessageGeneratorService, ErrorMessageModule, ValidationStylingModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { ErrorMessageDemoComponent } from './error-message-demo.component';
import { ErrorMessageDemoRoutingModule } from './error-message-demo-routing.module';

@NgModule({
  declarations: [
    ErrorMessageDemoComponent,
  ],
  imports: [
    DemoModule,
    CheckboxModule,
    ErrorMessageModule,
    ValidationStylingModule,
    TranslateModule,

    ErrorMessageDemoRoutingModule,
  ],
  providers: [
    ErrorMessageGeneratorService,
  ],
})
export class ErrorMessageDemoModule {}
