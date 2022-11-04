import { cloneDeep } from 'lodash-es';
import { TableRowData } from '../../table.interface';
import { AreAllVisibleRowsSelectedPipe } from './are-all-visible-rows-selected.pipe';

describe('AreAllVisibleRowsSelectedPipe', () => {
  let tableRowData: TableRowData[];
  let pipe: AreAllVisibleRowsSelectedPipe;

  beforeEach(() => {
    pipe = new AreAllVisibleRowsSelectedPipe();

    tableRowData = [
      {
        id: 0,
        isSelectable: true,
        isSelected: true,
        isVisible: true,
        isFiltered: false,
        isNotInView: false,
      },
      {
        id: 1,
        isSelectable: true,
        isSelected: true,
        isVisible: true,
        isFiltered: false,
        isNotInView: false,
      },
      {
        id: 2,
        isSelectable: true,
        isSelected: true,
        isVisible: true,
        isFiltered: false,
        isNotInView: false,
      },
    ];
  });

  it('should return false if the data provided is undefined or empty', () => {
    expect(pipe.transform(undefined as any)).toBeFalse();
    expect(pipe.transform([])).toBeFalse();
  });

  it('should return true if the number of selected rows equals the number of visible rows', () => {
    expect(pipe.transform(tableRowData)).toBeTrue();
  });

  it('should return false if the number of selected rows does NOT equal the number of visible rows', () => {
    tableRowData[0].isSelectable = false;
    expect(pipe.transform(tableRowData)).toBeTrue();
    tableRowData[0].isSelectable = true;

    tableRowData[0].isVisible = false;
    expect(pipe.transform(tableRowData)).toBeTruthy();
    tableRowData[0].isVisible = true;

    tableRowData[0].isSelected = false;
    expect(pipe.transform(tableRowData)).toBeFalse();
    tableRowData[0].isSelected = true;
  });

  it('should return false if nothing is visible', () => {
    const notVisibleData = cloneDeep(tableRowData).map(rowData =>
      ({
        ...rowData,
        isVisible: false
      }));

    expect(pipe.transform(notVisibleData)).toBeFalse();
  });

  it('should return false if nothing is selectable', () => {
    const notSelectableData = cloneDeep(tableRowData).map(rowData =>
      ({
        ...rowData,
        isSelectable: false
      }));

    expect(pipe.transform(notSelectableData)).toBeFalse();
  });

  it('should return false if everything is filtered', () => {
    const notSelectableData = cloneDeep(tableRowData).map(rowData =>
      ({
        ...rowData,
        isFiltered: true
      }));

    expect(pipe.transform(notSelectableData)).toBeFalse();
  });

  it('should return false if everything is not in the view', () => {
    const notSelectableData = cloneDeep(tableRowData).map(rowData =>
      ({
        ...rowData,
        isNotInView: true
      }));

    expect(pipe.transform(notSelectableData)).toBeFalse();
  });
});
