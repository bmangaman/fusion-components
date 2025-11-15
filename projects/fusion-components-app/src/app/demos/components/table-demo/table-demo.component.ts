import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { debounce, delay } from 'rxjs/operators';

import { cloneDeep, random, sample } from 'lodash-es';

import {
  State,
  TableSpacing,
  TableType,
  RowExpansionMode,
  SelectionMode,
  TableColumnConfig,
  BytesPipe,
  BytesPipeBase,
  TableFilterConfig,
  TableFilterNumberInputComparator,
  TableFilterStringInputComparator,
  TableFilterNumberComponent,
  TableFilterStringComponent,
  TableView,
  TableColumnComponent,
  TableColumnSorted,
  TableComponentEnums,
  TableRowData,
  TablePaginationEmit,
} from '@fusion-components';

import { VolumeState, VolumeAccess } from './table-demo.interface';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { TableModule } from '../../../../../../fusion-components/src/lib/components/table/table.module';
import { QueryParamsModule } from '../../../../../../fusion-components/src/lib/directives/query-params/query-params.module';
import { TableFilterNumberModule } from '../../../../../../fusion-components/src/lib/components/table/table-filters/table-filter-number/table-filter-number.module';
import { TableFilterStringModule } from '../../../../../../fusion-components/src/lib/components/table/table-filters/table-filter-string/table-filter-string.module';
import { TableFilterArrayModule } from '../../../../../../fusion-components/src/lib/components/table/table-filters/table-filter-array/table-filter-array.module';
import { TableFilterIpModule } from '../../../../../../fusion-components/src/lib/components/table/table-filters/table-filter-ip/table-filter-ip.module';
import { TableFilterBytesModule } from '../../../../../../fusion-components/src/lib/components/table/table-filters/table-filter-bytes/table-filter-bytes.module';
import { TableColumnModule } from '../../../../../../fusion-components/src/lib/components/table/table-column/table-column.module';
import { TemplateModule } from '../../../../../../fusion-components/src/lib/directives/template/template.module';
import { TooltipDirectiveModule } from '../../../../../../fusion-components/src/lib/directives/tooltip/tooltip.module';
import { BytesModule } from '../../../../../../fusion-components/src/lib/pipes/bytes/bytes.module';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'fusion-demo-table',
    templateUrl: './table-demo.component.html',
    styleUrls: ['./table-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, TableModule, QueryParamsModule, TableFilterNumberModule, TableFilterStringModule, TableFilterArrayModule, TableFilterIpModule, TableFilterBytesModule, TableColumnModule, TemplateModule, TooltipDirectiveModule, BytesModule, AsyncPipe]
})
export class TableDemoComponent implements OnInit {
  readonly TableComponentEnums = TableComponentEnums;
  readonly State = State;
  readonly VolumeAccess = VolumeAccess;
  readonly BytesPipeBase = BytesPipeBase;

  readonly bytesPipe = new BytesPipe();

  generatedData: any[] = [];
  data: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  tableViews: TableView[] = [];
  tableDemoForm: UntypedFormGroup;

  quickFilters: TableFilterConfig[] = [
    {
      label: 'Used: greather than 50%',
      field: 'used',
      comparatorName: TableFilterNumberInputComparator.GREATER_THAN,
      filterName: 'Used',
      filter: TableFilterNumberComponent,
      formValues: {
        number: 0.5,
      },
      isApplied: true,
    },
    {
      label: 'Access: Locked',
      field: 'access',
      comparatorName: TableFilterStringInputComparator.IS,
      filterName: 'Access',
      filter: TableFilterStringComponent,
      formValues: {
        string: 'locked',
      },
      isApplied: false,
    },
  ];

  appliedFilters: TableFilterConfig[] = [
    {
      field: 'iops.min',
      comparatorName: TableFilterNumberInputComparator.GREATER_THAN,
      filterName: 'Min IOPS',
      filter: TableFilterNumberComponent,
      formValues: {
        number: 500,
      },
    },
  ];

  defaultColumns: TableColumnConfig[] = [
    { field: 'qos', isVisible: false },
    { field: 'ip', isVisible: false },
    { field: 'access', sorted: TableColumnSorted.ASCENDING },
  ];

  columnFields: TableColumnConfig[] = [
    { field: 'id', isVisible: true, isHidable: true },
    { field: 'name', isVisible: true, isHidable: true, sorted: TableColumnSorted.ASCENDING },
    { field: 'account.name', isVisible: true, isHidable: true },
    { field: 'access', isVisible: true, isHidable: true },
    { field: 'ip', isVisible: false, isHidable: true },
    { field: 'used', isVisible: true, isHidable: true },
    { field: 'size', isVisible: true, isHidable: true },
    { field: 'snapshots', isVisible: true, isHidable: true },
    { field: 'qos', isVisible: false, isHidable: true },
    { field: 'iops.min', isVisible: true, isHidable: true },
    { field: 'iops.max', isVisible: true, isHidable: true },
    { field: 'iops.burst', isVisible: true, isHidable: true },
  ];

  constructor(
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.generateTableViews();
    this.generateTableData();
    this.generateTableDemoForm();
    this.refresh();
  }

  generateTableData(): void {
    const generateAccessGroups = (id: number): string[] => {
      const accessGroups: string[] = [];

      const numOfAccessGroups: number = Math.max(0, Math.floor(Math.random() * 5));
      for (let i = 0; i < numOfAccessGroups; i++) {
        accessGroups.push(i % 2 === 0 ? `${id}-access-group-name-${i}` : `${id}-super-long-access-group-name-to-test-truncation${i}`);
      }

      return accessGroups;
    }

    const data: any[] = [];

    for (let i = 0; i < 5000; i++) {
      data.push({
        state: Math.random() < 0.5 ? VolumeState.ACTIVE : VolumeState.DELETED,
        id: i,
        ip: this.generateIp(),
        name: `volume-name-${i}`,
        account: {
          name: `account-${i}`
        },
        accessGroups: generateAccessGroups(i),
        access: sample(Object.values(VolumeAccess)) as VolumeAccess,
        used: Number(Math.random().toFixed(2)),
        size: Math.floor(Math.random() * 100000000000),
        snapshots: Math.floor(Math.random() * 10),
        qos: `qos-policy-${i}`,
        iops: {
          min: Math.floor(Math.random() * 1000),
          max: Math.floor(Math.random() * 1000 + 1000),
          burst: Math.floor(Math.random() * 1000 + 2000),
        },
        actions: {
          edit: Math.random() < 0.5,
          clone: Math.random() < 0.5,
          delete: Math.random() < 0.5,
          pair: Math.random() < 0.5,
          snapshot: Math.random() < 0.5,
          backupTo: Math.random() < 0.5,
          restoreFrom: Math.random() < 0.5,
        },
      });
    }

    this.generatedData = data;
  }

  generateIp(): string {
    return [sample([ '192', '10', '172' ]), sample([ '168', '0', '1', '2' ]), sample([ '0', '1', '2' ]), random(1, 255)].join('.');
  }

  generateTableDemoForm(): void {
    this.tableDemoForm = this.fb.group({
      numberOfDataItems: [25, Validators.required],
      type: [TableType.ADVANCED, Validators.required],
      spacing: [TableSpacing.NORMAL, Validators.required],
      state: [State.LOADED, Validators.required],
      fillContainer: [false],
      rowExpansionMode: [RowExpansionMode.MULTIPLE],
      selectionMode: [SelectionMode.MULTIPLE],
      tableTitle: ['Demo Table Title'],
      appliedTableViewName: [],
      useAppliedFilters: [false],
      disableRowExpansionFunction: [true],
      disableRowActionsFunction: [true],
      disableRowSelectionFunction: [true],
      isConsoleLogEnabled: [true],
    });

    this.tableDemoForm.get('numberOfDataItems')?.valueChanges.pipe(debounce(() => interval(400))).subscribe((value: number) => {

      // if value is less than 0 (there cannot be negative # of search results), set to 0
      // if value is greather than the number of generated values, set to the length of the generated data values
      if (value < 0 || value >= this.generatedData.length) {
        const newValue: number = Math.min(Math.max(0, value), this.generatedData.length);
        this.tableDemoForm.get('numberOfDataItems')?.setValue(newValue);
      }

      this.setNumberOfDataItems();
    });
  }

  generateTableViews(): void {
    const tableViewDeleteColumns: TableColumnConfig[] = cloneDeep(this.columnFields);
    tableViewDeleteColumns.splice(1, 1, { field: 'name', isVisible: false, isHidable: false });

    this.tableViews = [
      {
        label: 'Active',
        name: 'active',
        isSelected: true,
        isVisible: true,
        columns: cloneDeep(this.columnFields),
        filters: [
          {
            label: 'Active',
            field: 'state',
            comparatorName: TableFilterStringInputComparator.IS,
            filterName: 'State',
            filter: TableFilterStringComponent,
            formValues: {
              string: VolumeState.ACTIVE,
            },
          },
        ],
      },
      {
        label: 'Deleted',
        name: 'deleted',
        isVisible: true,
        columns: tableViewDeleteColumns,
        filters: [
          {
            label: 'Deleted',
            field: 'state',
            comparatorName: TableFilterStringInputComparator.IS,
            filterName: 'State',
            filter: TableFilterStringComponent,
            formValues: {
              string: VolumeState.DELETED,
            },
          },
        ],
      },
    ];
  }

  refresh(): void {
    this.tableDemoForm.disable();
    this.tableDemoForm.get('state')?.setValue(State.LOADING);
    this.getTableData().pipe(delay(1000)).subscribe(() => {
      this.setNumberOfDataItems();
      this.tableDemoForm.get('state')?.setValue(State.LOADED);
      this.tableDemoForm.enable();
    });
  }

  /**
   * Gets the table data with a two (2) second delay to mimic a real API response.
   *
   * @returns The table data as an observable.
   */
  getTableData(): Observable<any> {
    return of(this.generateTableData).pipe(delay(2000));
  }

  setNumberOfDataItems(): void {
    const data: any[] = cloneDeep(this.generatedData);
    data.splice(this.tableDemoForm?.get('numberOfDataItems')?.value);
    this.data.next(data);
  }

  /**
   * Logic to conditionally append CSS classes to a table cell.
   *
   * @param data The row data.
   * @returns The array of CSS classes when the volume is locked.
   */
  columnCellStyleClassesFunction(data: any): string[] {
    if (data.access === VolumeAccess.locked) {
      return ['access-locked-color-red-highlight'];
    }

    return [];
  }

  /**
   * Logic to conditionally disable the actions button of a row.
   *
   * @param data The row data.
   * @returns True when the volume is locked, false otherwise.
   */
  disableRowActionsButtonFunction(data: any): boolean {
    return data.access === VolumeAccess.locked;
  }

  toggleDisableRowActionsButtonFunction(): void {
    console.log('toggle data');
    const newData: any[] | null = cloneDeep(this.data.value);

    newData?.forEach((d: TableRowData) => {
      if (d['access'] === VolumeAccess.locked) {
        d['access'] = VolumeAccess.readWrite;
      } else if (d['access'] === VolumeAccess.readWrite) {
        d['access'] = VolumeAccess.locked;
      }
    });

    this.data.next(newData);
  }

  /**
   * Logic to conditionally disable the selection input of a row.
   *
   * @param data The row data.
   * @returns True when the volume is locked, false otherwise.
   */
  disableRowSelectionFunction(data: any): boolean {
    return data.access === VolumeAccess.locked;
  }

  /**
   * Logic to conditionally disable the expansion capabilities of a row.
   *
   * @param data The row data.
   * @returns True when the volume is locked, false otherwise.
   */
  disableRowExpansionFunction(data: any): boolean {
    return data.access === VolumeAccess.locked;
  }

  /**
   * Logic to update what values are exported when the download button is clicked.
   *
   * @param data The table data.
   * @returns The formatted table data to be downloaded.
   */
  downloadTransformationFunction(data: any[]): any[] {
    const newData: any[] = data;
    newData.forEach((d: any) => delete d.actions);
    return newData;
  }

  /**
   * On table select change, console log the event value.
   *
   * @param data The event value (selected rows).
   */
  selectChange(data: any[]): void {
    if (this.tableDemoForm?.get('isConsoleLogEnabled')?.value) {
      console.log('selectChange', data);
    }
  }

  /**
   * On table expansion change, console log the event value.
   *
   * @param data The event value (expanded rows).
   */
  expansionChange(data: any[]): void {
    if (this.tableDemoForm?.get('isConsoleLogEnabled')?.value) {
      console.log('expansionChange', data);
    }
  }

  /**
   * On table sort change, console log the event value.
   *
   * @param config The event value (configuration of the sorted column).
   */
  sortChange(config: TableColumnConfig): void {
    if (this.tableDemoForm?.get('isConsoleLogEnabled')?.value) {
      console.log('sortChange', config);
    }
  }

  /**
   * On table column visibility change, console log the event value.
   *
   * @param columns The event value (configuration of the sorted column).
   */
  columnVisibilityChange(columns: TableColumnComponent[]): void {
    if (this.tableDemoForm?.get('isConsoleLogEnabled')?.value) {
      console.log('columnVisibilityChange', columns);
    }
  }

  /**
   * On table pagination change, console log the event value.
   *
   * @param columns The event value (table pagination config).
   */
  paginationChange(pagination: TablePaginationEmit): void {
    if (this.tableDemoForm?.get('isConsoleLogEnabled')?.value) {
      console.log('paginationChange', pagination);
    }
  }

  /**
   * On table filter change, console log the event value.
   *
   * @param filters The event value (list of applied table filters).
   */
  filterChange(filters: TableFilterConfig[]): void {
    if (this.tableDemoForm?.get('isConsoleLogEnabled')?.value) {
      console.log('filterChange', filters);
    }
  }

  /**
   * On table view change, console log the event value.
   *
   * @param context The applied table view.
   */
  viewChange(view: TableView): void {
    if (this.tableDemoForm?.get('isConsoleLogEnabled')?.value) {
      console.log('viewChange', view);
    }
  }

  /**
   * On final table data change, emit the data.
   *
   * @param data The final table data.
   */
  finalTableDataChange(data: TableRowData[] | null): void {
    if (this.tableDemoForm?.get('isConsoleLogEnabled')?.value) {
      console.log('finalTableDataChange', data);
    }
  }
}
