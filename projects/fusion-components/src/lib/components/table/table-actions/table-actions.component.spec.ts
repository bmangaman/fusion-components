import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { TableActionsComponent } from './table-actions.component';
import { DEFAULT_TABLE_ACTIONS_TRANSLATIONS, TableActionsTranslations } from './table-actions.interface';

describe('TableActionsComponent', () => {
  let component: TableActionsComponent;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    component = new TableActionsComponent(changeDetectorRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngDoCheck()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    beforeEach(() => {
      component.rowData = [];
      component['_prevRowData'] = [];

      component.templateRef = null;
      component['_prevTemplateRef'] = null;

      component.isDisabled = false;
      component['_prevIsDisabled'] = false;

      component.translations = DEFAULT_TABLE_ACTIONS_TRANSLATIONS;
      component['_prevTranslations'] = DEFAULT_TABLE_ACTIONS_TRANSLATIONS;

      component.dialogCssClasses = [];
      component['_prevDialogCssClasses'] = [];

      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
    });

    it('should call changeDetectorRef.markForCheck() if rowData has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.rowData = [{}];
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDetectorRef.markForCheck() if templateRef has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.templateRef = {} as TemplateRef<any>;
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDetectorRef.markForCheck() if isDisabled has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.isDisabled = true;
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDetectorRef.markForCheck() if translations has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.translations = {}  as any as TableActionsTranslations;
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call changeDetectorRef.markForCheck() if dialogCssClasses has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.dialogCssClasses = ['test-css-class'];
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });
});
