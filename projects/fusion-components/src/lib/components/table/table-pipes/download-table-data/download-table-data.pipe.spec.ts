import { ChangeDetectorRef, QueryList } from '@angular/core';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import { TableColumnComponent } from '../../table-column';
import { TableRowData } from '../../table.interface';
import { DownloadTableDataPipe } from './download-table-data.pipe';

describe('DownloadTableDataPipe', () => {
  let tableRowData: TableRowData[];
  let pipe: DownloadTableDataPipe;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    pipe = new DownloadTableDataPipe();

    tableRowData = [
      {
        id: 0,
        data: 'string0',
        isSelectable: true,
        isSelected: true,
        isVisible: true,
        isFiltered: false,
        isExpandable: true,
        isExpanded: true,
        isActionable: true,
        isNotInView: true,
      },
      {
        id: 1,
        data: 'string1',
        isSelectable: true,
        isSelected: true,
        isVisible: true,
        isFiltered: false,
        isExpandable: true,
        isExpanded: true,
        isActionable: true,
        isNotInView: true,
      },
      {
        id: 2,
        data: 'string2',
        isSelectable: true,
        isSelected: false,
        isVisible: true,
        isFiltered: false,
        isExpandable: true,
        isExpanded: true,
        isActionable: true,
        isNotInView: true,
      },
    ];
  });

  it('should handle if the provided data is undefined or empty', () => {
    expect(pipe.transform(undefined as any, null as any, null as any)).toEqual([]);
    expect(pipe.transform([], null as any, null as any)).toEqual([]);
  });

  it('should return the data with all table attributes removed', () => {
    const expectedResult: any[] = [
      { id: 0, data: 'string0' },
      { id: 1, data: 'string1' },
      { id: 2, data: 'string2' },
    ];
    expect(pipe.transform(tableRowData, null as any, null as any)).toEqual(expectedResult);
  });

  it('should remove filtered out data', () => {
    tableRowData[0].isFiltered = true;
    const expectedResult: any[] = [
      { id: 1, data: 'string1' },
      { id: 2, data: 'string2' },
    ];
    expect(pipe.transform(tableRowData, null as any, null as any)).toEqual(expectedResult);
  });

  it('should remove the data if the column is NOT visible', () => {
    const columns: QueryList<TableColumnComponent> = new QueryList<TableColumnComponent>();

    const idColumn: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
    idColumn.field = 'id';
    idColumn.header = 'id header';
    idColumn.isVisible = false;

    const fieldColumn: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
    fieldColumn.field = 'data';

    columns['_results'] = [idColumn, fieldColumn];

    const expectedResult: any[] = [
      { data: 'string0' },
      { data: 'string1' },
      { data: 'string2' },
    ];
    expect(pipe.transform(tableRowData, columns, null as any)).toEqual(expectedResult);
  });

  it('should apply the downloadTransformationFunction if provided', () => {
    const columns: QueryList<TableColumnComponent> = new QueryList<TableColumnComponent>();

    const idColumn: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
    idColumn.field = 'id';
    idColumn.header = 'id header';

    const fieldColumn: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
    fieldColumn.field = 'data';
    fieldColumn.downloadTransformationFunction = (data: string) => data.toUpperCase();

    columns['_results'] = [idColumn, fieldColumn];

    const expectedResult: any[] = [
      { 'id header': 0, data: 'STRING0' },
      { 'id header': 1, data: 'STRING1' },
      { 'id header': 2, data: 'STRING2' },
    ];
    expect(pipe.transform(tableRowData, columns, null as any)).toEqual(expectedResult);
  });

  it('should apply the downloadTransformationFunction if provided', () => {
    const downloadTransformationFunction: (...args: any[]) => any[] = (data: any[]) => {
      data.forEach((d: any) => d.data = d.data.toUpperCase());
      return data;
    };

    const expectedResult: any[] = [
      { id: 0, data: 'STRING0' },
      { id: 1, data: 'STRING1' },
      { id: 2, data: 'STRING2' },
    ];
    expect(pipe.transform(tableRowData, null as any, downloadTransformationFunction)).toEqual(expectedResult);
  });
});
