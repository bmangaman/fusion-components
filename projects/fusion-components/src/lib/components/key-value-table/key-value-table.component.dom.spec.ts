import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeyValueTableComponentPageObject } from './key-value-table.component.spec.po';
import { KeyValueTableData } from './key-value-table.interface';
import { KeyValueTableModule } from './key-value-table.module';

@Component({
    selector: 'f-test-component',
    template: `
    <f-key-value-table *ngIf="loaded" [data]="data">

      <ng-template fusionUiTemplate="hostname" type="key" *ngIf="customHostnameKey">
        Custom Hostname
      </ng-template>

      <ng-template fusionUiTemplate="hostname" type="value" *ngIf="customHostnameValue" let-data>
        Custom Hostname {{ data?.value }}
      </ng-template>

    </f-key-value-table>
  `,
    standalone: false
})
export class KeyValueTableTestComponent {
  loaded: boolean;
  data: KeyValueTableData[];

  customHostnameKey: boolean;
  customHostnameValue: boolean;
}

describe('KeyValueTableComponent', () => {
  let component: KeyValueTableTestComponent;
  let fixture: ComponentFixture<KeyValueTableTestComponent>;
  let page: KeyValueTableComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        KeyValueTableTestComponent,
      ],
      imports: [
        KeyValueTableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(KeyValueTableTestComponent);
    component = fixture.componentInstance;
    page = new KeyValueTableComponentPageObject(fixture);

    generateTableData();
    reloadTableComponent();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.table).toBeTruthy();
  });

  describe('the table data', () => {
    it('should be displayed in the correct number of rows and columns', () => {
      expect(page.table.tableRows?.length).toEqual(4);
      expect(page.table.tableKeyCells?.length).toEqual(4);
      expect(page.table.tableValueCells?.length).toEqual(4);
      expect(page.table.getTableRowAtIndex(0)?.childNodes.length).toEqual(2);
    });

    it('should display the provided key and value data', () => {
      expect(page.table.getTableKeyCellAtRowIndex(0)?.innerText).toContain('IP Address');
      expect(page.table.getTableValueCellAtRowIndex(0)?.innerText).toContain('192.168.1.1');

      expect(page.table.getTableKeyCellAtRowIndex(1)?.innerText).toContain('Hostname');
      expect(page.table.getTableValueCellAtRowIndex(1)?.innerText).toContain('example-hostname');

      expect(page.table.getTableKeyCellAtRowIndex(2)?.innerText).toContain('Capacity');
      expect(page.table.getTableValueCellAtRowIndex(2)?.innerText).toContain('1024');

      expect(page.table.getTableKeyCellAtRowIndex(3)?.innerText).toContain('Number of Drives');
      expect(page.table.getTableValueCellAtRowIndex(3)?.innerText).toContain('12');
    });
  });

  describe('custom key and value templates', () => {
    it('should display the custom key template for a specific row if provided', () => {
      component.customHostnameKey = true;
      reloadTableComponent();
      expect(page.table.getTableKeyCellAtRowIndex(1)?.innerText).toContain('Custom Hostname');
      expect(page.table.getTableValueCellAtRowIndex(1)?.innerText).toContain('example-hostname');
    });

    it('should display the custom value template for a specific row if provided', () => {
      component.customHostnameValue = true;
      reloadTableComponent();
      expect(page.table.getTableKeyCellAtRowIndex(1)?.innerText).toContain('Hostname');
      expect(page.table.getTableValueCellAtRowIndex(1)?.innerText).toContain('Custom Hostname example-hostname');
    });
  });

  /**
   * Helper function to generate the mock data to be displayed in the key-value-table-component.
   */
  function generateTableData(): void {
    const data: KeyValueTableData[] = [
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
    ];

    component.data = data;
    component.customHostnameKey = false;
    component.customHostnameValue = false;
  }

  /**
   * Helper function to reload the key-value-table component by removing it and re-adding it to the DOM.
   */
  function reloadTableComponent(): void {
    component.loaded = false;
    fixture.detectChanges();
    component.loaded = true;
    fixture.detectChanges();
  }

});
