import { Component } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { KeyValueTableData } from '@fusion-components';

@Component({
  selector: 'fusion-demo-key-value-table',
  templateUrl: './key-value-table-demo.component.html',
  styleUrls: ['./key-value-table-demo.component.scss']
})
export class KeyValueTableDemoComponent {
  keyValueTableForm: FormGroup;
  generatedData: KeyValueTableData[] = [];

  constructor(
    private fb: FormBuilder,
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
