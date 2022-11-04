import { UntypedFormControl } from '@angular/forms';

import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;

  const errors: any = { required: true, noStartHyphen: true, noSpecialCharacters: true };

  beforeEach(() => {
    component = new ErrorMessageComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('displayError()', () => {
    it('should return true when the control has errors and is dirty', () => {
      component.control = new UntypedFormControl();
      component.control.markAsDirty();
      component.control.setErrors(errors);
      expect(component.displayError()).toBeTruthy();
    });

    it('should return true when the control has errors and is touched', () => {
      component.control = new UntypedFormControl();
      component.control.markAsTouched();
      component.control.setErrors(errors);
      expect(component.displayError()).toBeTruthy();
    });

    it('should return false when: the control is undefined, the control does not have errors, or the control is not dirty', () => {
      component.control = undefined as any;
      expect(component.displayError()).toBeFalsy();

      component.control = new UntypedFormControl();
      component.control.markAsPristine();
      expect(component.displayError()).toBeFalsy();

      component.control = new UntypedFormControl();
      component.control.markAsDirty();
      component.control.setErrors(null);
      expect(component.displayError()).toBeFalsy();
    });
  });
});
