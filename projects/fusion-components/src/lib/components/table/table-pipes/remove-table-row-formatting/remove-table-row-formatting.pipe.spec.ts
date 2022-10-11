import { TableRowData } from '../../table.interface';
import { RemoveTableRowFormattingPipe } from './remove-table-row-formatting.pipe';

describe('RemoveTableRowFormattingPipe', () => {
  let pipe: RemoveTableRowFormattingPipe;

  beforeEach(() => {
    pipe = new RemoveTableRowFormattingPipe();
  });

  it('should remove all the correct values from an array of table rows', () => {
    const baseData: any[] = [
      {
        id: 1,
        customData1: 'data1',
        customData2: 'data2',
      },
      {
        id: 2,
        customData1: 'data1',
        customData2: 'data2',
      },
    ];

    const tableRowData: TableRowData[] = [
      {
        ...baseData[0],
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isVisible: true,
        isActionable: true,
        tableRowUuid: 'table-uuid',
        isNotInView: true,
        isFiltered: true,
      },
      {
        ...baseData[1],
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isVisible: true,
        isActionable: true,
        tableRowUuid: 'table-uuid',
        isNotInView: false,
        isFiltered: false,
      },
    ];

    expect(pipe.transform(undefined)).toEqual(undefined as any);
    expect(pipe.transform([])).toEqual([]);
    expect(pipe.transform(baseData)).toEqual(baseData);
    expect(pipe.transform(tableRowData)).toEqual(baseData);
  });

});
