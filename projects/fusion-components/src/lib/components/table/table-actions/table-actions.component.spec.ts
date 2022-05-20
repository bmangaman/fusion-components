import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { FusionComponentsTranslationService } from '@fusion-components/lib/services';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { TableActionsComponent } from './table-actions.component';

describe('TableActionsComponent', () => {
  let component: TableActionsComponent;
  let changeDetectorRef: ChangeDetectorRef;
  let translationService: FusionComponentsTranslationService;

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    translationService = new FusionComponentsTranslationService();
    component = new TableActionsComponent(changeDetectorRef, translationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngDoCheck()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    beforeEach(() => {
      component.rowData = undefined;
      component['_prevRowData'] = undefined;

      component.templateRef = undefined;
      component['_prevTemplateRef'] = undefined;

      component.isDisabled = undefined;
      component['_prevIsDisabled'] = undefined;

      component.translations = undefined;
      component['_prevTranslations'] = undefined;

      component.dialogCssClasses = undefined;
      component['_prevDialogCssClasses'] = undefined;

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

      component.translations = {};
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
