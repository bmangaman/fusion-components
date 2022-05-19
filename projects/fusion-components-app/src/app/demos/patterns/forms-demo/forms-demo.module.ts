import { NgModule } from '@angular/core';

import { TabviewModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { EscapeHtmlModule } from '../../../shared/pipes/escape-html';

import { FormsDemoComponent } from './forms-demo.component';
import { FormsDemoRoutingModule } from './forms-demo-routing.module';
import { FormsCheckboxDemoModule } from './forms-checkbox-demo/forms-checkbox-demo.module';
import { FormsRadioDemoModule } from './forms-radio-demo/forms-radio-demo.module';
import { FormsInputDemoModule } from './forms-input-demo/forms-input-demo.module';
import { FormsSelectDemoModule } from './forms-select-demo/forms-select-demo.module';
import { FormsButtonDemoModule } from './forms-button-demo/forms-button-demo.module';
import { FormsButtonGroupDemoModule } from './forms-button-group-demo/forms-button-group-demo.module';
import { FormsSwitchDemoModule } from './forms-swtich-demo/forms-switch-demo.module';
import { FormsTextareaDemoModule } from './forms-textarea-demo/forms-textarea-demo.module';

@NgModule({
  declarations: [
    FormsDemoComponent,
  ],
  imports: [
    DemoModule,
    EscapeHtmlModule,
    TabviewModule,

    FormsCheckboxDemoModule,
    FormsRadioDemoModule,
    FormsInputDemoModule,
    FormsSelectDemoModule,
    FormsButtonDemoModule,
    FormsButtonGroupDemoModule,
    FormsSwitchDemoModule,
    FormsDemoRoutingModule,
    FormsTextareaDemoModule,
  ],
})
export class FormsDemoModule {}
