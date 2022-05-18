import {
  CaseInsensitiveSort,
  CaseSensitiveSort,
  NullsLastCaseSensitiveSort,
  NullsLastNumericSort,
  NumericSort,
} from './table-column-sorts';

describe('TableColumnSorts', () => {

  // AaBbCc, etc.
  describe('CaseSensitiveSort', () => {

    it('should sort lexically', () => {
      expect(CaseSensitiveSort({ field: 'A'}, { field: 'A'}, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseSensitiveSort({ field: 'A'}, { field: 'a'}, 'field')).toEqual(-1); // 'a' comes after 'A'
      expect(CaseSensitiveSort({ field: 'A'}, { field: 'B'}, 'field')).toEqual(-1); // 'B' comes after 'A'
      expect(CaseSensitiveSort({ field: 'a'}, { field: 'B'}, 'field')).toEqual(-1); // A -> a -> B -> b
      expect(CaseSensitiveSort({ field: 'Z'}, { field: 'a'}, 'field')).toEqual(1);
    });

    it("should sort null/undefined after 'z'", () => {
      expect(CaseSensitiveSort({ field: null }, { field: null }, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseSensitiveSort({ field: null }, { field: undefined }, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseSensitiveSort({ field: undefined }, { field: null }, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseSensitiveSort({ field: undefined }, { field: undefined }, 'field')).toEqual(0); // Same value, should be 0

      expect(CaseSensitiveSort({ field: null }, { field: 'A'}, 'field')).toEqual(1);
      expect(CaseSensitiveSort({ field: null }, { field: 'z' }, 'field')).toEqual(1);
      expect(CaseSensitiveSort({ field: 'A'}, { field: null }, 'field')).toEqual(-1);
      expect(CaseSensitiveSort({ field: 'z' }, { field: null }, 'field')).toEqual(-1);
    });

  });

  describe('CaseInsensitiveSort', () => {
    it('should sort lexically', () => {
      expect(CaseInsensitiveSort({ field: 'A'}, { field: 'A'}, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseInsensitiveSort({ field: 'A'}, { field: 'a'}, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseInsensitiveSort({ field: 'A'}, { field: 'B'}, 'field')).toEqual(-1);
      expect(CaseInsensitiveSort({ field: 'a'}, { field: 'B'}, 'field')).toEqual(-1); // Aa - Zz
      expect(CaseInsensitiveSort({ field: 'Z'}, { field: 'a'}, 'field')).toEqual(1);
    });

    it("should sort null/undefined after 'z'", () => {
      expect(CaseInsensitiveSort({ field: null }, { field: null }, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseInsensitiveSort({ field: null }, { field: undefined }, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseInsensitiveSort({ field: undefined }, { field: null }, 'field')).toEqual(0); // Same value, should be 0
      expect(CaseInsensitiveSort({ field: undefined }, { field: undefined }, 'field')).toEqual(0); // Same value, should be 0

      expect(CaseInsensitiveSort({ field: null }, { field: 'A'}, 'field')).toEqual(1);
      expect(CaseInsensitiveSort({ field: null }, { field: 'z' }, 'field')).toEqual(1);
      expect(CaseInsensitiveSort({ field: 'A'}, { field: null }, 'field')).toEqual(-1);
      expect(CaseInsensitiveSort({ field: 'z' }, { field: null }, 'field')).toEqual(-1);
    });
  });

  describe('NullsLastCaseSensitiveSort', () => {
    it('should sort lexically', () => {
      expect(NullsLastCaseSensitiveSort({ field: 'A'}, { field: 'A'}, 'field')).toEqual(0); // Same value, should be 0
      expect(NullsLastCaseSensitiveSort({ field: 'A'}, { field: 'a'}, 'field')).toEqual(-1); // 'a' comes after 'A'
      expect(NullsLastCaseSensitiveSort({ field: 'A'}, { field: 'B'}, 'field')).toEqual(-1); // 'B' comes after 'A'
      expect(NullsLastCaseSensitiveSort({ field: 'a'}, { field: 'B'}, 'field')).toEqual(-1); // A -> a -> B -> b
      expect(NullsLastCaseSensitiveSort({ field: 'Z'}, { field: 'a'}, 'field')).toEqual(1);
    });

    it("should sort null/undefined after 'z'", () => {
      expect(NullsLastCaseSensitiveSort({ field: null }, { field: null }, 'field')).toEqual(1);
      expect(NullsLastCaseSensitiveSort({ field: null }, { field: undefined }, 'field')).toEqual(1);
      expect(NullsLastCaseSensitiveSort({ field: undefined }, { field: null }, 'field')).toEqual(1);
      expect(NullsLastCaseSensitiveSort({ field: undefined }, { field: undefined }, 'field')).toEqual(1);

      expect(NullsLastCaseSensitiveSort({ field: null }, { field: 'A'}, 'field')).toEqual(1);
      expect(NullsLastCaseSensitiveSort({ field: null }, { field: 'z' }, 'field')).toEqual(1);
      expect(NullsLastCaseSensitiveSort({ field: 'A'}, { field: null }, 'field')).toEqual(1);
      expect(NullsLastCaseSensitiveSort({ field: 'z' }, { field: null }, 'field')).toEqual(1);
    });
  });

  describe('NullsLastNumericSort', () => {
    it('should sort numerically', () => {
      expect(NullsLastNumericSort({ field: 1 }, { field: 1 }, 'field')).toEqual(0); // Same value, should be 0
      expect(NullsLastNumericSort({ field: 1 }, { field: -1 }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: 1 }, { field: 0 }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: -1 }, { field: 0 }, 'field')).toEqual(-1);
      expect(NullsLastNumericSort({ field: -1 }, { field: 1 }, 'field')).toEqual(-1);
      expect(NullsLastNumericSort({ field: 0}, { field: -1}, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: 0}, { field: 1}, 'field')).toEqual(-1);
    });

    it('should sort letters before numbers', () => {
      expect(NullsLastNumericSort({ field: 'A'}, { field: 1}, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: 'A'}, { field: 0}, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: 'A'}, { field: -1}, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: 1}, { field: 'a'}, 'field')).toEqual(-1);
      expect(NullsLastNumericSort({ field: 0}, { field: 'a'}, 'field')).toEqual(-1);
      expect(NullsLastNumericSort({ field: -1}, { field: 'a'}, 'field')).toEqual(-1);
    });

    it("should sort null/undefined after 'z'", () => {
      expect(NullsLastNumericSort({ field: null }, { field: null }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: null }, { field: undefined }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: undefined }, { field: null }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: undefined }, { field: undefined }, 'field')).toEqual(1);

      expect(NullsLastNumericSort({ field: null }, { field: 1 }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: null }, { field: -1 }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: null }, { field: 0 }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: 1 }, { field: null }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: -1 }, { field: null }, 'field')).toEqual(1);
      expect(NullsLastNumericSort({ field: 0 }, { field: null }, 'field')).toEqual(1);
    });
  });

  describe('NumericSort', () => {
    it('should sort numerically', () => {
      expect(NumericSort({ field: 1 }, { field: 1 }, 'field')).toEqual(0); // Same value, should be 0
      expect(NumericSort({ field: 1 }, { field: -1 }, 'field')).toEqual(1);
      expect(NumericSort({ field: 1 }, { field: 0 }, 'field')).toEqual(1);
      expect(NumericSort({ field: 1 }, { field: 2 }, 'field')).toEqual(-1);
      expect(NumericSort({ field: -1 }, { field: 0 }, 'field')).toEqual(-1);
      expect(NumericSort({ field: -1 }, { field: 1 }, 'field')).toEqual(-1);
      expect(NumericSort({ field: -1 }, { field: -2 }, 'field')).toEqual(1);
      expect(NumericSort({ field: 0}, { field: -1}, 'field')).toEqual(1);
      expect(NumericSort({ field: 0}, { field: 1}, 'field')).toEqual(-1);
    });

    it('should sort letters after numbers', () => {
      expect(NumericSort({ field: 'A'}, { field: 1}, 'field')).toEqual(1);
      expect(NumericSort({ field: 'A'}, { field: 0}, 'field')).toEqual(1);
      expect(NumericSort({ field: 'A'}, { field: -1}, 'field')).toEqual(1);
      expect(NumericSort({ field: 1}, { field: 'a'}, 'field')).toEqual(-1);
      expect(NumericSort({ field: 0}, { field: 'a'}, 'field')).toEqual(-1);
      expect(NumericSort({ field: -1}, { field: 'a'}, 'field')).toEqual(-1);
      expect(NumericSort({ field: 'A'}, { field: 'a'}, 'field')).toEqual(1);
    });

    it("should sort null/undefined after 'z'", () => {
      expect(NumericSort({ field: null }, { field: null }, 'field')).toEqual(0); // Same value, should be 0
      expect(NumericSort({ field: null }, { field: undefined }, 'field')).toEqual(0); // Same value, should be 0
      expect(NumericSort({ field: undefined }, { field: null }, 'field')).toEqual(0); // Same value, should be 0
      expect(NumericSort({ field: undefined }, { field: undefined }, 'field')).toEqual(0); // Same value, should be 0

      expect(NumericSort({ field: null }, { field: 1 }, 'field')).toEqual(1);
      expect(NumericSort({ field: null }, { field: -1 }, 'field')).toEqual(1);
      expect(NumericSort({ field: null }, { field: 0 }, 'field')).toEqual(1);
      expect(NumericSort({ field: 1 }, { field: null }, 'field')).toEqual(-1);
      expect(NumericSort({ field: -1 }, { field: null }, 'field')).toEqual(-1);
      expect(NumericSort({ field: 0 }, { field: null }, 'field')).toEqual(-1);
    });
  });
});
