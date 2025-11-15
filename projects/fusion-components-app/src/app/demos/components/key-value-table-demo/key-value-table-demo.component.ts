import { Component } from '@angular/core';

import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { KeyValueTableData } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { KeyValueTableModule } from '../../../../../../fusion-components/src/lib/components/key-value-table/key-value-table.module';
import { TemplateModule } from '../../../../../../fusion-components/src/lib/directives/template/template.module';

@Component({
    selector: 'fusion-demo-key-value-table',
    templateUrl: './key-value-table-demo.component.html',
    styleUrls: ['./key-value-table-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, KeyValueTableModule, TemplateModule]
})
export class KeyValueTableDemoComponent {
  keyValueTableForm: UntypedFormGroup;
  generatedData: KeyValueTableData[] = [];

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildButtonForm();
    this.generateData();
  }
  
  generateData(): void {
    const data: KeyValueTableData[] = [];

    data.push(
      {
        key: 'ipAdddress',
        keyText: 'IP Address',
        value: '192.168.1.1',
      },
      {
        key: 'hostname',
        keyText: 'Hostname',
        value: 'example-hostname',
      },
      {
        key: 'capacity',
        keyText: 'Capacity',
        value: 1024,
      },
      {
        key: 'numOfDrives',
        keyText: 'Number of Drives',
        value: 12,
      },
    );

    this.generatedData = data;
  }

  buildButtonForm(): void {
    this.keyValueTableForm = this.fb.group({})
  }
}
