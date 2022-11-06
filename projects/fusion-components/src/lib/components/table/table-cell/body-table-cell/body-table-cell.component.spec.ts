import { ChangeDetectorRef } from '@angular/core';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import {
  TableCellContentAlignment,
  TableCellContentVerticalAlignment,
  TableCellTranslations,
  TableColumnConfig,
  TableRowData,
  TableSpacing,
} from '../../table.interface';
import { BodyTableCellComponent } from './body-table-cell.component';

describe('BodyTableCellComponent', () => {
  let component: BodyTableCellComponent;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    component = new BodyTableCellComponent(changeDetectorRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngDoCheck()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    beforeEach(() => {
      component.cssClasses = [];
      component.prevCssClasses = [];

      component.spacing = TableSpacing.NORMAL;
      component.prevSpacing = TableSpacing.NORMAL;

      component.shouldProjectContent = false;
      component.prevShouldProjectContent = false;

      component.translations = {} as any as TableCellTranslations;
      component.prevTranslations = {} as any as TableCellTranslations;

      component.col = {};
      component.prevCol = {};

      component.rowData = {};
      component['_prevRowData'] = {};

      component.index = 0;
      component['_prevIndex'] = 0;

      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
    });

    it('should call changeDectorRef.markForCheck() if the rowData has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.rowData = { data: 'data' };
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDectorRef.markForCheck() if the index has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.index = 1;
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('generateTableCellClasses()', () => {
    const stylePrefix = 'f-table__table-cell';
    const defaultClasses: string[] = [stylePrefix, `${stylePrefix}--body`];
    let expectedResult: string[];

    beforeEach(() => {
      expectedResult = undefined as any;
      component.col = undefined as any;
      component.index = undefined as any;
      component.spacing = undefined as any;
    });

    it('should append the "f-table__table-cell" class by default', () => {
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the "f-table__table-cell--grey" class if the input is odd', () => {
      component.index = 2;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.index = 1;
      expectedResult = [...defaultClasses, `${stylePrefix}--grey`];
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

    it('should append the "f-table__table-cell--truncated" class if the isTruncated col config is true', () => {
      component.col = {} as TableColumnConfig;

      component.col.isTruncated = false;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.isTruncated = true;
      expectedResult = [...defaultClasses, `${stylePrefix}--truncated`];
      expect(component.generateTableCellClasses()).toEqual(expectedResult);
    });

    it('should append the generated CSS class if the cell style classes function col config is provided', () => {
      component.col = {} as TableColumnConfig;

      const cellStylingFunc: any = (d: TableRowData): string[] => {
        if (d && d['value']) {
          return ['custom-class'];
        }
        return [];
      };
      const data: TableRowData = {
        value: 'value',
      };

      component.col.columnCellStyleClassesFunction = null as any;
      component.rowData = null as any;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.columnCellStyleClassesFunction = cellStylingFunc;
      component.rowData = null as any;
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.columnCellStyleClassesFunction = cellStylingFunc;
      component.rowData = {};
      expectedResult = defaultClasses;
      expect(component.generateTableCellClasses()).toEqual(expectedResult);

      component.col.columnCellStyleClassesFunction = cellStylingFunc;
      component.rowData = data;
      expectedResult = [...defaultClasses, 'custom-class'];
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
