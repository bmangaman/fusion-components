import { UntypedFormControl } from '@angular/forms';

import * as SelectComponentUtils from './select.component.utils';

describe('SelectComponentUtils', () => {
  let control: UntypedFormControl;

  describe('selectRequiredValidator()', () => {
    it('should return null if a non-empty Select Component option control is provided', () => {
      control = new UntypedFormControl({ value: 'value' });
      expect(SelectComponentUtils.selectRequiredValidator(control)).toEqual(null);
    });

    it('should return { required: true } if an empty Select Component option control is provided', () => {
      control = null;
      expect(SelectComponentUtils.selectRequiredValidator(control)).toEqual({ required: true });

      control = new UntypedFormControl();
      expect(SelectComponentUtils.selectRequiredValidator(control)).toEqual({ required: true });

      control = new UntypedFormControl({ value: null });
      expect(SelectComponentUtils.selectRequiredValidator(control)).toEqual({ required: true });
    });
  });
});
