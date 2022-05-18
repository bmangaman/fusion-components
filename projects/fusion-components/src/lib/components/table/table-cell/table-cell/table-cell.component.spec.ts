import { ChangeDetectorRef } from '@angular/core';
import { FusionComponentsTranslationService } from '@fusion-ui/fusion-components/lib/services';
import { ComponentStubFactory } from '@fusion-ui/fusion-components/unit-test-helpers/component-stub-factory.spec';
import { TableColumnConfig, TableSpacing } from '../../table.interface';
import { TableCellComponent } from './table-cell.component';

describe('TableCellComponent', () => {
  let component: TableCellComponent;
  let changeDetectorRef: ChangeDetectorRef;
  let translationService: FusionComponentsTranslationService;

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    translationService = new FusionComponentsTranslationService();
    component = new TableCellComponent(changeDetectorRef, translationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@HostBinding()', () => {
    describe('hostClasses', () => {
      it('should return the table cell classes as a joined string', () => {
        /* eslint-disable @typescript-eslint/dot-notation */
        component.tableCellClasses = [];
        expect(component.hostClasses).toEqual('');

        component.tableCellClasses = ['class1'];
        expect(component.hostClasses).toEqual('class1');

        component.tableCellClasses = ['class1', 'class2'];
        expect(component.hostClasses).toEqual('class1 class2');
        /* eslint-enable @typescript-eslint/dot-notation */
      });
    });

    describe('style.width', () => {
      it('should return the input col.updatedWidth if col is defined', () => {
        component.col = undefined;
        expect(component.hostWidth).toEqual(undefined);

        component.col = { updatedWidth: '100px' } as TableColumnConfig;
        expect(component.hostWidth).toEqual('100px');
      });

      it('should return the input col.width if col is defined', () => {
        component.col = undefined;
        expect(component.hostWidth).toEqual(undefined);

        component.col = { width: '100px' } as TableColumnConfig;
        expect(component.hostWidth).toEqual('100px');
      });
    });

    describe('style.minWidth', () => {
      it('should return the input col.minWidth if col is defined', () => {
        component.col = null;
        expect(component.hostMinWidth).toEqual(null);

        component.col = { minWidth: '100px' } as TableColumnConfig;
        expect(component.hostMinWidth).toEqual('100px');
      });
    });

    describe('attr.role', () => {
      it('should return the hard-coded "cell" role', () => {
        expect(component.role).toEqual('cell');
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

      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
    });

    it('should call changeDectorRef.markForCheck() if the cssClasses has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();

      component.cssClasses = ['class'];
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDectorRef.markForCheck() if the spacing has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();

      component.spacing = TableSpacing.SPACIOUS;
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDectorRef.markForCheck() if the shouldProjectContent has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();

      component.shouldProjectContent = true;
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDectorRef.markForCheck() if the translations has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();

      component.translations = undefined;
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDectorRef.markForCheck() if the col has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();

      component.col = { header: '' };
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('generateTableCellClasses()', () => {
    it('should return an empty array', () => {
      expect(component.generateTableCellClasses()).toEqual([]);
    });
  });
});
