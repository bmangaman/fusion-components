import { ChangeDetectorRef, QueryList } from '@angular/core';

import { cloneDeep } from 'lodash';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services/translation';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import { TableColumnComponent } from '../table-column/table-column.component';
import { TableColumnSelectorComponent } from './table-column-selector.component';

describe('TableColumnSelectorComponent', () => {
  const columns: QueryList<TableColumnComponent> = new QueryList<TableColumnComponent>();
  let component: TableColumnSelectorComponent;
  let translationService: FusionComponentsTranslationService;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    component = new TableColumnSelectorComponent(translationService);
    generateColumns();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateColumnVisibility()', () => {
    it('should update the visibility of the column at the provided index and emit the new list of visible columns', () => {
      spyOn(component.visibleColumns, 'emit').and.stub();
      component.columns.toArray()[0].isVisible = false;

      // Should make the column visible
      component.updateColumnVisibility(0);
      expect(component.columns.toArray()[0].isVisible).toBeTrue();
      expect(component.visibleColumns.emit).toHaveBeenCalled();

      // Should not do anything to an un-hidable column
      component.columns.toArray()[0].isHidable = false;
      component.updateColumnVisibility(0);
      expect(component.columns.toArray()[0].isVisible).toBeTrue();
      expect(component.visibleColumns.emit).toHaveBeenCalled();

      // Should hide the column
      component.columns.toArray()[0].isHidable = true;
      component.updateColumnVisibility(0);
      expect(component.columns.toArray()[0].isVisible).toBeFalse();
      expect(component.visibleColumns.emit).toHaveBeenCalled();
    });
  });

  describe('colTrackByFn', () => {
    it('should return the item field if defined', () => {
      expect(component.colTrackByFn(0, component.columns.toArray()[0])).toEqual('field1');
      expect(component.colTrackByFn(1, component.columns.toArray()[1])).toEqual('field2');
    });

    it('should return the index if the item or the item field is undefined', () => {
      expect(component.colTrackByFn(1)).toEqual(1);
      expect(component.colTrackByFn(1, new TableColumnComponent(changeDetectorRef))).toEqual(1);
    });
  });

  /**
   * Helper function to generate the component.columns QueryList
   */
  function generateColumns(numOfColumns: number = 2): void {
    const cols: TableColumnComponent[] = [];

    for (let i = 1; i < numOfColumns + 1; i++) {
      const column: TableColumnComponent = new TableColumnComponent(changeDetectorRef);
      column.field = `field${i}`;
      column.isVisible = true;
      column.isHidable = true;
      cols.push(column);
    }

    // eslint-disable-next-line @typescript-eslint/dot-notation
    columns['_results'] = cloneDeep(cols);
    component.columns = columns;
  }
});
