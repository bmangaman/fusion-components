import { FormControl } from '@angular/forms';

import * as SelectComponentUtils from './select.component.utils';

describe('SelectComponentUtils', () => {
  let control: FormControl;

  describe('selectRequiredValidator()', () => {
    it('should return null if a non-empty Select Component option control is provided', () => {
      control = new FormControl({ value: 'value' });
      expect(SelectComponentUtils.selectRequiredValidator(control)).toEqual(null);
    });

    it('should return { required: true } if an empty Select Component option control is provided', () => {
      control = null;
      expect(SelectComponentUtils.selectRequiredValidator(control)).toEqual({ required: true });

      control = new FormControl();
      expect(SelectComponentUtils.selectRequiredValidator(control)).toEqual({ required: true });

      control = new FormControl({ value: null });
      expect(SelectComponentUtils.selectRequiredValidator(control)).toEqual({ required: true });
    });
  });
});
