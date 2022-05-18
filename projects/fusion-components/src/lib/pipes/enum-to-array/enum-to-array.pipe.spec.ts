import { EnumToArrayPipe } from './enum-to-array.pipe';

describe('EnumToArrayPipe', () => {
  let pipe: EnumToArrayPipe;

  beforeEach(() => {
    pipe = new EnumToArrayPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('when isValue is true', () => {
    it('should return the ENUM values as an array of strings or numbers', () => {
      enum TestEnum1 { ONE = 'one', TWO = 'two', THREE = 'three' }
      enum TestEnum2 { ONE = 1, TWO = 2, THREE = 3 }
      enum TestEnum3 { ONE, TWO, THREE }
      enum TestEnum4 { A = 'ALPHA', B = 'BETA', C = 'GAMMA' }
      enum TestEnum5 { ALPHA = 'ALPHA', BETA = 'BETA', GAMMA = 'GAMMA' }

      expect(pipe.transform(TestEnum1)).toEqual(['one', 'two', 'three']);
      expect(pipe.transform(TestEnum2)).toEqual([1, 2, 3]);
      expect(pipe.transform(TestEnum3)).toEqual([0, 1, 2]);
      expect(pipe.transform(TestEnum4)).toEqual(['ALPHA', 'BETA', 'GAMMA']);
      expect(pipe.transform(TestEnum5)).toEqual(['ALPHA', 'BETA', 'GAMMA']);
    });
  });

  describe('when isValue is false', () => {
    it('should return the ENUM keys as an array of strings', () => {
      enum TestEnum1 { ONE = 'one', TWO = 'two', THREE = 'three' }
      enum TestEnum2 { ONE = 1, TWO = 2, THREE = 3 }
      enum TestEnum3 { ONE, TWO, THREE }
      enum TestEnum4 { A = 'ALPHA', B = 'BETA', C = 'GAMMA' }
      enum TestEnum5 { ALPHA = 'ALPHA', BETA = 'BETA', GAMMA = 'GAMMA' }

      expect(pipe.transform(TestEnum1, false)).toEqual(['ONE', 'TWO', 'THREE']);
      expect(pipe.transform(TestEnum2, false)).toEqual(['ONE', 'TWO', 'THREE']);
      expect(pipe.transform(TestEnum3, false)).toEqual(['ONE', 'TWO', 'THREE']);
      expect(pipe.transform(TestEnum4, false)).toEqual(['A', 'B', 'C']);
      expect(pipe.transform(TestEnum5, false)).toEqual(['ALPHA', 'BETA', 'GAMMA']);
    });
  });
});
