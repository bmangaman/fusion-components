import { getWindow } from './window.provider';

describe('windowProvider', () => {
  describe('getWindow()', () => {
    it('should return window', () => {
      expect(getWindow()).toEqual(window);
    });
  });
});
