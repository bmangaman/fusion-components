import { Component } from '@angular/core';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { TabviewModule } from '../../../../../../fusion-components/src/lib/components/tabview/tabview.module';
import { TemplateModule } from '../../../../../../fusion-components/src/lib/directives/template/template.module';
import { FormsCheckboxDemoComponent } from './forms-checkbox-demo/forms-checkbox-demo.component';
import { FormsRadioDemoComponent } from './forms-radio-demo/forms-radio-demo.component';
import { FormsInputDemoComponent } from './forms-input-demo/forms-input-demo.component';
import { FormsTextareaDemoComponent } from './forms-textarea-demo/forms-textarea-demo.component';
import { FormsSelectDemoComponent } from './forms-select-demo/forms-select-demo.component';
import { FormsButtonDemoComponent } from './forms-button-demo/forms-button-demo.component';
import { FormsButtonGroupDemoComponent } from './forms-button-group-demo/forms-button-group-demo.component';
import { FormsSwitchDemoComponent } from './forms-swtich-demo/forms-switch-demo.component';

@Component({
    selector: 'fusion-demo-form',
    templateUrl: './forms-demo.component.html',
    styleUrls: ['./forms-demo.component.scss', './forms-demo-shared.scss'],
    imports: [DemoComponent, TabviewModule, TemplateModule, FormsCheckboxDemoComponent, FormsRadioDemoComponent, FormsInputDemoComponent, FormsTextareaDemoComponent, FormsSelectDemoComponent, FormsButtonDemoComponent, FormsButtonGroupDemoComponent, FormsSwitchDemoComponent]
})
export class FormsDemoComponent {}
