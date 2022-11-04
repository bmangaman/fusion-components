import { PercentMapPipe } from './percent-map.pipe';

describe('PercentMapPipe', () => {
  let pipe: PercentMapPipe;

  beforeEach(() => {
    pipe = new PercentMapPipe();
  });

  it('should return 0 if the provided value is undefined', () => {
    expect(pipe.transform(undefined as any)).toEqual(0);
  });

  it('should correctly map the provided range to a number between 0 and 100', () => {
    expect(pipe.transform(-50)).toEqual(0);
    expect(pipe.transform(0)).toEqual(0);
    expect(pipe.transform(50)).toEqual(50);
    expect(pipe.transform(100)).toEqual(100);
    expect(pipe.transform(150)).toEqual(100);

    expect(pipe.transform(-50, 200)).toEqual(0);
    expect(pipe.transform(0, 200)).toEqual(0);
    expect(pipe.transform(50, 200)).toEqual(25);
    expect(pipe.transform(200, 200)).toEqual(100);
    expect(pipe.transform(250, 200)).toEqual(100);

    expect(pipe.transform(-150, 100, -100)).toEqual(0);
    expect(pipe.transform(-100, 100, -100)).toEqual(0);
    expect(pipe.transform(0, 100, -100)).toEqual(50);
    expect(pipe.transform(100, 100, -100)).toEqual(100);
    expect(pipe.transform(150, 100, -100)).toEqual(100);

    expect(pipe.transform(-350, -100, -300)).toEqual(0);
    expect(pipe.transform(-300, -100, -300)).toEqual(0);
    expect(pipe.transform(-200, -100, -300)).toEqual(50);
    expect(pipe.transform(-100, -100, -300)).toEqual(100);
    expect(pipe.transform(-50, -100, -300)).toEqual(100);
  });
});
