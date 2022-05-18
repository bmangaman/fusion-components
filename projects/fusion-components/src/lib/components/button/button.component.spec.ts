import { SimpleChange } from '@angular/core';

import { FusionUiSize, FusionUiState } from '@fusion-ui/fusion-components/lib/shared';

import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonInputType, ButtonType } from './button.interface';

describe('ButtonComponent', () => {
  let component: ButtonComponent;

  beforeEach(() => {
    component = new ButtonComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngAfterViewInit()', () => {
    it('should call setContentMinWidth()' , () => {
      spyOn(component, 'setContentMinWidth').and.stub();
      component.ngAfterViewInit();
      expect(component.setContentMinWidth).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges()', () => {
    it('should call setContentMinWidth() if text, icon, or opensMneu inputs are changed', fakeAsync(() => {
      spyOn(component, 'setContentMinWidth').and.stub();

      component.text = undefined;
      component.icon = undefined;
      component.opensMenu = undefined;

      component.text = 'text';
      component.ngOnChanges({
        text: new SimpleChange(null, component.text, false),
      });
      tick();
      expect(component.setContentMinWidth).toHaveBeenCalled();

      component.icon = 'icon';
      component.ngOnChanges({
        icon: new SimpleChange(null, component.icon, false),
      });
      tick();
      expect(component.setContentMinWidth).toHaveBeenCalled();

      component.opensMenu = true;
      component.ngOnChanges({
        opensMenu: new SimpleChange(null, component.opensMenu, false),
      });
      tick();
      expect(component.setContentMinWidth).toHaveBeenCalled();

      discardPeriodicTasks();
    }));

    it('should update isButtonDisabled flag if isDisabled or state inputs are changed', () => {
      component.isDisabled = undefined;
      component.state = undefined;
      component.isButtonDisabled = undefined;

      component.inputType = ButtonInputType.BUTTON;
      component.ngOnChanges({
        inputType: new SimpleChange(null, component.inputType, false),
      });
      expect(component.isButtonDisabled).toBeUndefined();

      component.isDisabled = true;
      component.ngOnChanges({
        isDisabled: new SimpleChange(null, component.isDisabled, false),
      });
      expect(component.isButtonDisabled).toEqual(true);

      component.isDisabled = false;
      component.ngOnChanges({
        isDisabled: new SimpleChange(null, component.isDisabled, false),
      });
      expect(component.isButtonDisabled).toEqual(false);

      component.state = FusionUiState.LOADING;
      component.ngOnChanges({
        state: new SimpleChange(null, component.state, false),
      });
      expect(component.isButtonDisabled).toEqual(true);

      component.state = FusionUiState.LOADED;
      component.ngOnChanges({
        state: new SimpleChange(null, component.state, false),
      });
      expect(component.isButtonDisabled).toEqual(false);
    });

    it('should update loadingSpinnerSize variable if size input is changed', () => {
      component.size = undefined;
      component.loadingSpinnerSize = undefined;

      component.inputType = ButtonInputType.BUTTON;
      component.ngOnChanges({
        inputType: new SimpleChange(null, component.inputType, false),
      });
      expect(component.loadingSpinnerSize).toBeUndefined();

      component.size = FusionUiSize.LARGE;
      component.ngOnChanges({
        size: new SimpleChange(null, component.size, false),
      });
      expect(component.loadingSpinnerSize).toEqual(FusionUiSize.MEDIUM);

      component.size = FusionUiSize.MEDIUM;
      component.ngOnChanges({
        size: new SimpleChange(null, component.size, false),
      });
      expect(component.loadingSpinnerSize).toEqual(FusionUiSize.MEDIUM);

      component.size = FusionUiSize.SMALL;
      component.ngOnChanges({
        size: new SimpleChange(null, component.size, false),
      });
      expect(component.loadingSpinnerSize).toEqual(FusionUiSize.SMALL);

      component.size = FusionUiSize.X_SMALL;
      component.ngOnChanges({
        size: new SimpleChange(null, component.size, false),
      });
      expect(component.loadingSpinnerSize).toEqual(FusionUiSize.X_SMALL);
    });

    it('should call generateButtonClasses() and update the buttonClasses variable when inputs are changed', () => {
      spyOn(component, 'generateButtonClasses').and.callThrough();

      setInputValuesToUndefined();
      component.buttonClasses = undefined;

      let previousButtonClasses: string[] = component.buttonClasses;

      component.inputType = ButtonInputType.BUTTON;
      component.ngOnChanges({
        inputType: new SimpleChange(null, component.inputType, false),
      });
      expect(component.generateButtonClasses).not.toHaveBeenCalled();
      expect(component.buttonClasses).toEqual(previousButtonClasses);
      expect(component.buttonClasses).toBeUndefined();

      component.type = ButtonType.PRIMARY;
      component.ngOnChanges({
        type: new SimpleChange(null, component.type, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
      previousButtonClasses = component.buttonClasses;

      component.size = FusionUiSize.MEDIUM;
      component.ngOnChanges({
        size: new SimpleChange(null, component.size, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
      previousButtonClasses = component.buttonClasses;

      component.state = FusionUiState.LOADED;
      component.ngOnChanges({
        state: new SimpleChange(null, component.state, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
      previousButtonClasses = component.buttonClasses;

      component.isSelected = true;
      component.ngOnChanges({
        isSelected: new SimpleChange(null, component.isSelected, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
      previousButtonClasses = component.buttonClasses;

      component.noBorder = true;
      component.ngOnChanges({
        noBorder: new SimpleChange(null, component.noBorder, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
      previousButtonClasses = component.buttonClasses;

      component.isDisabled = true;
      component.ngOnChanges({
        isDisabled: new SimpleChange(null, component.isDisabled, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
      previousButtonClasses = component.buttonClasses;

      component.icon = 'icon';
      component.ngOnChanges({
        icon: new SimpleChange(null, component.icon, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
      previousButtonClasses = component.buttonClasses;

      component.text = 'text';
      component.ngOnChanges({
        text: new SimpleChange(null, component.text, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
      previousButtonClasses = component.buttonClasses;

      component.classes = ['class'];
      component.ngOnChanges({
        classes: new SimpleChange(null, component.classes, false),
      });
      expect(component.generateButtonClasses).toHaveBeenCalled();
      expect(component.buttonClasses).not.toEqual(previousButtonClasses);
    });
  });

  describe('setContentMinWidth()', () => {
    it('should set the contentMinWith if buttonContent is defined', () => {
      component.buttonContent = null;
      component.contentMinWidth = null;
      component.setContentMinWidth();
      expect(component.contentMinWidth).toBeNull();

      component.buttonContent = { nativeElement: { offsetWidth: 100 } };
      component.setContentMinWidth();
      expect(component.contentMinWidth).toEqual('100px');
    });
  });

  describe('buttonClicked()', () => {
    it('should emit buttonClick', () => {
      spyOn(component.buttonClick, 'emit').and.stub();
      component.buttonClicked();
      expect(component.buttonClick.emit).toHaveBeenCalled();
    });
  });

  describe('generateButtonClasses()', () => {
    let expectedResult: string[];

    beforeEach(() => {
      setInputValuesToUndefined();
      expectedResult = [];
    });

    it('should include just the base class by default', () => {
      expectedResult = [
        'fusion-ui-button',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include the button type if provided', () => {
      component.type = ButtonType.PRIMARY;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--primary',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.type = ButtonType.SECONDARY;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--secondary',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include the button size if provided', () => {
      component.size = FusionUiSize.SMALL;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--small',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.size = FusionUiSize.MEDIUM;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--medium',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.size = FusionUiSize.LARGE;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--large',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include the button state if provided', () => {
      component.state = FusionUiState.LOADED;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--loaded',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.state = FusionUiState.LOADING;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--loading',
        'fusion-ui-button--disabled',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include selected if isSelected', () => {
      component.isSelected = true;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--selected',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include disabled if isDisabled or state === LOADING', () => {
      component.isDisabled = true;
      component.state = FusionUiState.LOADED;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--loaded',
        'fusion-ui-button--disabled',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.isDisabled = false;
      component.state = FusionUiState.LOADING;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--loading',
        'fusion-ui-button--disabled',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.isDisabled = true;
      component.state = FusionUiState.LOADING;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--loading',
        'fusion-ui-button--disabled',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include noBorder if noBorder', () => {
      component.noBorder = true;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--noBorder',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include full-width if fullWidth', () => {
      component.fullWidth = true;
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--full-width',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include --text if text and no icon provided', () => {
      component.text = 'button text';
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--text',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.icon = 'mdi-close';
      expectedResult = [
        'fusion-ui-button',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include --icon if icon and no text provided', () => {
      component.icon = 'mdi-close';
      expectedResult = [
        'fusion-ui-button',
        'fusion-ui-button--icon',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.text = 'button text';
      expectedResult = [
        'fusion-ui-button',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });

    it('should include any provided classes', () => {
      component.classes = ['custom-class-1'];
      expectedResult = [
        'fusion-ui-button',
        'custom-class-1',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);

      component.classes = ['custom-class-1', 'custom-class-2'];
      expectedResult = [
        'fusion-ui-button',
        'custom-class-1',
        'custom-class-2',
      ];
      expect(component.generateButtonClasses()).toEqual(expectedResult);
    });
  });

  /**
   * Helper function to set a bunch of the input values to null
   */
  function setInputValuesToUndefined(): void {
    component.type = undefined;
    component.size = undefined;
    component.state = undefined;
    component.isSelected = undefined;
    component.isDisabled = undefined;
    component.noBorder = undefined;
    component.icon = undefined;
    component.text = undefined;
    component.classes = undefined;
  }
});
