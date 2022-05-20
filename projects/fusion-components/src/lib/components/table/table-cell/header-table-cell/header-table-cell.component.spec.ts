import { ChangeDetectorRef } from '@angular/core';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import {
  TableCellContentAlignment,
  TableCellContentVerticalAlignment,
  TableColumnConfig,
  TableColumnSorted,
  TableSpacing,
} from '../../table.interface';
import { HeaderTableCellComponent } from './header-table-cell.component';

describe('HeaderTableCellComponent', () => {
  let component: HeaderTableCellComponent;
  let changeDetectorRef: ChangeDetectorRef;
  let translationService: FusionComponentsTranslationService;

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    translationService = new FusionComponentsTranslationService();
    component = new HeaderTableCellComponent(changeDetectorRef, translationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters and setters', () => {
    describe('isResizing', () => {
      it('should return the private variable value', () => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        component['_isResizing'] = true;
        expect(component.isResizing).toEqual(true);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        component['_isResizing'] = false;
        expect(component.isResizing).toEqual(false);
      });
    });
  });

  describe('ngDoCheck()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    beforeEach(() => {
      component.cssClasses = undefined;
      component.prevCssClasses = undefined;

      component.spacing = TableSpacing.NORMAL;
      component.prevSpacing = TableSpacing.NORMAL;

      component.shouldProjectContent = false;
      component.prevShouldProjectContent = false;

      component.translations = {};
      component.prevTranslations = {};

      component.col = {};
      component.prevCol = {};

      component.isSticky = false;
      component['_prevIsSticky'] = false;

      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
    });

    it('should call changeDectorRef.markForCheck() if isSticky has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.isSticky = true;
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('startResizing()', () => {
    it('should set the coordinates, isResizing to true, and emit an event', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      spyOn(component.startResize, 'emit').and.stub();
      component.startResizing({ pageX: 100 } as MouseEvent);
      expect(component['_resizeCoordinates'].start).toEqual(100);
      expect(component['_isResizing']).toBeTrue();
      expect(component.startResize.emit).toHaveBeenCalled();

    /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('stopResizing', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    beforeEach(() => {
      spyOn(component.stopResize, 'emit').and.stub();
      component['_resizeCoordinates'] = { start: 100, stop: undefined };
      component.col = {
        width: '100px',
        updatedWidth: undefined,
      };
    });

    it('should do nothing if isResizing is false', () => {
      component['_isResizing'] = false;
      component.stopResizing({ pageX: 200 } as MouseEvent);
      expect(component['_resizeCoordinates'].stop).toBeFalsy();
      expect(component.stopResize.emit).not.toHaveBeenCalled();
    });

    it('should set the coordinates, isResizing to false, and emit an event', () => {
      component['_isResizing'] = true;
      component.stopResizing({ pageX: 200 } as MouseEvent);
      expect(component['_resizeCoordinates'].stop).toEqual(200);
      expect(component.stopResize.emit).toHaveBeenCalledWith('200px');
      expect(component.isResizing).toBeFalse();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('changeSort()', () => {
    it('should emit the new column sort config if col is defined', () => {
      spyOn(component.sort, 'emit').and.stub();

      component.col = null;
      component.changeSort();
      expect(component.sort.emit).not.toHaveBeenCalled();

      component.col = {} as TableColumnConfig;
      component.changeSort();
      expect(component.sort.emit).toHaveBeenCalledWith({ sorted: TableColumnSorted.ASCENDING } as TableColumnConfig);

      component.col = { sorted: TableColumnSorted.ASCENDING } as TableColumnConfig;
      component.changeSort();
      expect(component.sort.emit).toHaveBeenCalledWith({ sorted: TableColumnSorted.DESCENDING } as TableColumnConfig);
    });
  });

  describe('generateTableCellClasses()', () => {
    const stylePrefix = 'f-table__table-cell';
    const defaultClasses: string[] = [stylePrefix, `${stylePrefix}--header`];
    let expectedResult: string[];

    beforeEach(() => {
      expectedResult = undefined;
      component.col = undefined;
      component.isSticky = undefined;
      component.spacing = undefined;
    });

    it('should append the "f-table__table-cell" class by default', () => {
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the "f-table__table-cell--sticky" class if the input is set to true', () => {
      component.isSticky = false;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.isSticky = true;
      expectedResult = [...defaultClasses, `${stylePrefix}--sticky`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the "f-table__table-cell--overflow-visible" class if the isOverflowVisible col config is true', () => {
      component.col = {} as TableColumnConfig;

      component.col.isOverflowVisible = false;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.isOverflowVisible = true;
      expectedResult = [...defaultClasses, `${stylePrefix}--overflow-visible`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the "f-table__table-cell--sortable" class if the input is set to true', () => {
      component.col = {} as TableColumnConfig;

      component.col.isSortable = false;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.isSortable = true;
      expectedResult = [...defaultClasses, `${stylePrefix}--sortable`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the "f-table__table-cell--filtered" class if the input is set to true', () => {
      component.col = {} as TableColumnConfig;

      component.col.isFiltered = false;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.isFiltered = true;
      expectedResult = [...defaultClasses, `${stylePrefix}--filtered`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the "f-table__table-cell--sorted" class if the input is defined', () => {
      component.col = {} as TableColumnConfig;

      component.col.sorted = null;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.sorted = TableColumnSorted.ASCENDING;
      expectedResult = [...defaultClasses, `${stylePrefix}--sorted`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.sorted = TableColumnSorted.DESCENDING;
      expectedResult = [...defaultClasses, `${stylePrefix}--sorted`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the correct spacing class based on the input', () => {
      component.spacing = TableSpacing.CONDENSED;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableSpacing.CONDENSED}`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.spacing = TableSpacing.NORMAL;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableSpacing.NORMAL}`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.spacing = TableSpacing.SPACIOUS;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableSpacing.SPACIOUS}`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the correct alignment class based on the input', () => {
      component.col = {} as TableColumnConfig;

      component.col.cellContentAlignment = TableCellContentAlignment.LEFT;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableCellContentAlignment.LEFT}-aligned`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.cellContentAlignment = TableCellContentAlignment.CENTER;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableCellContentAlignment.CENTER}-aligned`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.cellContentAlignment = TableCellContentAlignment.RIGHT;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableCellContentAlignment.RIGHT}-aligned`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the "f-table__table-cell--resizable" class if the input is defined', () => {
      component.col = {} as TableColumnConfig;

      component.col.isResizable = true;
      expectedResult = [...defaultClasses, `${stylePrefix}--overflow-visible`, `${stylePrefix}--resizable`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the correct vertical alignment class based on the input', () => {
      component.col = {} as TableColumnConfig;

      component.col.cellContentVerticalAlignment = TableCellContentVerticalAlignment.TOP;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableCellContentVerticalAlignment.TOP}-aligned`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.cellContentVerticalAlignment = TableCellContentVerticalAlignment.MIDDLE;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableCellContentVerticalAlignment.MIDDLE}-aligned`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.cellContentVerticalAlignment = TableCellContentVerticalAlignment.BOTTOM;
      expectedResult = [...defaultClasses, `${stylePrefix}--${TableCellContentVerticalAlignment.BOTTOM}-aligned`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append any custom classes', () => {
      component.cssClasses = undefined;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.cssClasses = [];
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.cssClasses = ['custom-class'];
      expectedResult = [...defaultClasses, 'custom-class'];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.cssClasses = ['custom-class', 'custom-class-2'];
      expectedResult = [...defaultClasses, 'custom-class', 'custom-class-2'];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });
  });
});
