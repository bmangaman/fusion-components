import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { TableActionsComponent } from './table-actions.component';
import { TableActionsTranslations } from './table-actions.interface';

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
      component.rowData = undefined as any;
      component['_prevRowData'] = undefined as any;

      component.templateRef = undefined as any;
      component['_prevTemplateRef'] = undefined as any;

      component.isDisabled = undefined as any;
      component['_prevIsDisabled'] = undefined as any;

      component.translations = undefined as any;
      component['_prevTranslations'] = undefined as any;

      component.dialogCssClasses = undefined as any;
      component['_prevDialogCssClasses'] = undefined as any;

      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
    });

    it('should call changeDetectorRef.markForCheck() if rowData has changed', () => {
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();

      component.rowData = [];
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

      component.dialogCssClasses = [];
      (changeDetectorRef.markForCheck as jasmine.Spy).calls.reset();
      component.ngDoCheck();
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });
});
