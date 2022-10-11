import { TableRowData } from '../../table.interface';
import { VisibleTableRowsPipe } from './visible-table-rows.pipe';

describe('VisibleTableRowsPipe', () => {
  let pipe: VisibleTableRowsPipe;

  beforeEach(() => {
    pipe = new VisibleTableRowsPipe();
  });

  it('should only return visible rows', () => {
    const tableRowData: TableRowData[] = [
      // isVisible === true
      {
        id: 0,
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isVisible: true,
        isActionable: true,
        tableRowUuid: 'table-uuid',
      },
      // isVisible === false
      {
        id: 1,
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isVisible: false,
        isActionable: true,
        tableRowUuid: 'table-uuid',
      },
      // no isVisible
      {
        id: 2,
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isActionable: true,
        tableRowUuid: 'table-uuid',
      },
      // isFiltered === true && isVisible === true
      {
        id: 3,
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isActionable: true,
        tableRowUuid: 'table-uuid',
        isVisible: true,
        isFiltered: true
      },
      // isFiltered === true && isVisible === false
      {
        id: 4,
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isActionable: true,
        tableRowUuid: 'table-uuid',
        isVisible: false,
        isFiltered: true
      },
      // isFiltered === false && isVisible === false
      {
        id: 5,
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isActionable: true,
        tableRowUuid: 'table-uuid',
        isVisible: false,
        isFiltered: false
      },
      // isFiltered === false && no isVisible
      {
        id: 6,
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isActionable: true,
        tableRowUuid: 'table-uuid',
        isFiltered: false
      },
      // isFiltered === false && isVisible === true
      {
        id: 7,
        isExpandable: true,
        isExpanded: false,
        isSelectable: true,
        isSelected: false,
        isActionable: true,
        tableRowUuid: 'table-uuid',
        isFiltered: false,
        isVisible: true,
      },
    ];

    expect(pipe.transform(undefined as any)).toEqual(undefined as any);
    expect(pipe.transform([])).toEqual([]);
    // The only time data will be visible is when 'isVisible' is truthy and 'isFiltered' is falsy
    expect(pipe.transform(tableRowData)).toEqual([tableRowData[0], tableRowData[7]]);
  });

});
