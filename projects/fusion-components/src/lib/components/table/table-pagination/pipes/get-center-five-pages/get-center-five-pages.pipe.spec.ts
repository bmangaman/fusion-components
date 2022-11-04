import { GetCenterFivePagesPipe } from './get-center-five-pages.pipe';

describe('GetCenterFivePagesPipe', () => {
  let currentPageIndex: number;
  let expectedResult: number[];
  let numOfPages: number;
  let pipe: GetCenterFivePagesPipe;

  beforeEach(() => {
    pipe = new GetCenterFivePagesPipe();
    numOfPages = undefined as any;
    currentPageIndex = undefined as any;
  });

  it('should return all the indexes if the numOfPages is less than six (6)', () => {
    numOfPages = 0;
    expectedResult = [];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    numOfPages = 1;
    expectedResult = [0];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    numOfPages = 2;
    expectedResult = [0, 1];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    numOfPages = 3;
    expectedResult = [0, 1, 2];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    numOfPages = 4;
    expectedResult = [0, 1, 2, 3];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    numOfPages = 5;
    expectedResult = [0, 1, 2, 3, 4];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);
  });

  it('should return the center five (5) pages around the currentPageIndex if the numOfPages is greater than 4', () => {
    numOfPages = 10;

    currentPageIndex = 0;
    expectedResult = [0, 1, 2, 3, 4];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 1;
    expectedResult = [0, 1, 2, 3, 4];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 2;
    expectedResult = [0, 1, 2, 3, 4];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 3;
    expectedResult = [1, 2, 3, 4, 5];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 4;
    expectedResult = [2, 3, 4, 5, 6];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 5;
    expectedResult = [3, 4, 5, 6, 7];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 6;
    expectedResult = [4, 5, 6, 7, 8];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 7;
    expectedResult = [5, 6, 7, 8, 9];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 8;
    expectedResult = [5, 6, 7, 8, 9];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);

    currentPageIndex = 9;
    expectedResult = [5, 6, 7, 8, 9];
    expect(pipe.transform(numOfPages, currentPageIndex)).toEqual(expectedResult);
  });
});
