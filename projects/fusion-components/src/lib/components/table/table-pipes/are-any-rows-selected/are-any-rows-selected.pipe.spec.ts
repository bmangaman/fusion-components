import { cloneDeep } from 'lodash-es';
import { TableRowData } from '../../table.interface';
import { AreAnyRowsSelectedPipe } from './are-any-rows-selected.pipe';

describe('AreAnyRowsSelectedPipe', () => {
  let tableRowData: TableRowData[];
  let pipe: AreAnyRowsSelectedPipe;

  beforeEach(() => {
    pipe = new AreAnyRowsSelectedPipe();

    tableRowData = [
      {
        id: 0,
        isSelectable: true,
        isSelected: true,
        isVisible: true,
      },
      {
        id: 1,
        isSelectable: true,
        isSelected: true,
        isVisible: true,
      },
      {
        id: 2,
        isSelectable: true,
        isSelected: false,
        isVisible: true,
      },
    ];
  });

  it('should return false if the data provided is undefined or empty', () => {
    expect(pipe.transform(undefined)).toBeFalse();
    expect(pipe.transform([])).toBeFalse();
  });

  it('should return false if areAllVisibleRowsSelectedPipe is true', () => {
    spyOn(pipe.areAllVisibleRowsSelectedPipe, 'transform').and.returnValue(true);
    expect(pipe.transform(tableRowData)).toBeFalse();
  });

  it('should return true if any rows are selected', () => {
    tableRowData[0].isSelectable = false;
    expect(pipe.transform(tableRowData)).toBeTrue();
    tableRowData[0].isSelectable = true;

    tableRowData[0].isVisible = false;
    expect(pipe.transform(tableRowData)).toBeTruthy();
    tableRowData[0].isVisible = true;

    tableRowData[0].isSelected = false;
    tableRowData[1].isSelected = false;
    expect(pipe.transform(tableRowData)).toBeFalse();
  });

  it('should return false if all rows are selected but also filtered out', () => {
    const filteredData = cloneDeep(tableRowData).map(rowData =>
      ({
        ...rowData,
        isSelected: true,
        isFiltered: true
      }));
    expect(pipe.transform(filteredData)).toBeFalse();
  });

  it('should return false if all rows are selected but are not in the view', () => {
    const notInViewData = cloneDeep(tableRowData).map(rowData =>
      ({
        ...rowData,
        isSelected: true,
        isNotInView: true
      }));
    expect(pipe.transform(notInViewData)).toBeFalse();
  });

  it('should return false if all rows are filtered out', () => {
    const notSelectableData = cloneDeep(tableRowData).map(rowData =>
      ({
        ...rowData,
        isFiltered: true
      }));

    expect(pipe.transform(notSelectableData)).toBeFalse();
  });

  it('should return false if all rows are not in the view', () => {
    const notSelectableData = cloneDeep(tableRowData).map(rowData =>
      ({
        ...rowData,
        isNotInView: true
      }));

    expect(pipe.transform(notSelectableData)).toBeFalse();
  });
});
