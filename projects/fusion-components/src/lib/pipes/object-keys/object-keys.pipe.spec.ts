import { ObjectKeysPipe } from './object-keys.pipe';

describe('ObjectKeysPipe', () => {
  let pipe: ObjectKeysPipe;

  beforeEach(() => {
    pipe = new ObjectKeysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("should return an array of an object's keys", () => {
    let obj: Record<string, any>;
    let expectedResult: string[];

    obj = undefined as any;
    expectedResult = [];
    expect(pipe.transform(obj)).toEqual(expectedResult);

    obj = {};
    expectedResult = [];
    expect(pipe.transform(obj)).toEqual(expectedResult);

    obj = { key: 'value' };
    expectedResult = ['key'];
    expect(pipe.transform(obj)).toEqual(expectedResult);

    obj = { key: 'value', key2: 'value2' };
    expectedResult = ['key', 'key2'];
    expect(pipe.transform(obj)).toEqual(expectedResult);
  });
});
