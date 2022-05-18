import { PercentagePipe } from './percentage.pipe';

describe('PercentagePipe', () => {
  let pipe: PercentagePipe;

  beforeEach(() => {
    pipe = new PercentagePipe();
  });

  it('should return 0 if any of the values are not numbers', () => {
    expect(pipe.transform(NaN, 10, 0)).toEqual(0);
    expect(pipe.transform(5, NaN, 0)).toEqual(0);
    expect(pipe.transform(5, 10, NaN)).toEqual(0);
  });

  it('should return 0 if the value is equal to or less than the minValue', () => {
    expect(pipe.transform(0, 10, 0, true)).toEqual(0);
    expect(pipe.transform(-1, 10, 0, true)).toEqual(0);

    expect(pipe.transform(0, 10, 0, false)).toEqual(0);
    expect(pipe.transform(-1, 10, 0, false)).toEqual(-0.1);
  });

  it('should return 1 if the value is equal to or greater than the minValue', () => {
    expect(pipe.transform(10, 10, 0, true)).toEqual(1);
    expect(pipe.transform(11, 10, 0, true)).toEqual(1);

    expect(pipe.transform(10, 10, 0, false)).toEqual(1);
    expect(pipe.transform(11, 10, 0, false)).toEqual(1.1);
  });

  it('should calculate the the mapped value based on the value, maxValue, and mValues', () => {
    for (let i = 0; i < 10; i++) {
      expect(pipe.transform(i, 10, 0, false)).toEqual(i / 10);
    }

    expect(pipe.transform(0, 250, -250, false)).toEqual(0.5);
  });
});
