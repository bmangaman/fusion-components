import { NumOfResultsPipe } from './num-of-results.pipe';

describe('NumOfResultsPipe', () => {
  const resultsTranslation = '$min - $max of $total results';
  let pipe: NumOfResultsPipe;

  let expectedResult: string;
  let selectedDataLength: number;
  let numResultsPerPage: number;
  let currentPageIndex: number;

  beforeEach(() => {
    pipe = new NumOfResultsPipe();

    expectedResult = undefined as any;
    selectedDataLength = undefined as any;
    numResultsPerPage = undefined as any;
    currentPageIndex = undefined as any;
  });

  it('should return "-" if there are no selectedDataLength and numResultsPerPage', (done: DoneFn) => {
    selectedDataLength = 0;
    numResultsPerPage = 0;
    currentPageIndex = 0;
    expectedResult = '-';
    pipe.transform(selectedDataLength, numResultsPerPage, currentPageIndex, resultsTranslation).subscribe((result: string) => {
      expect(result).toEqual(expectedResult);
      done();
    });
  });

  it('should return "-" if there are no selectedDataLength', (done: DoneFn) => {
    selectedDataLength = 1;
    numResultsPerPage = 0;
    currentPageIndex = 0;
    expectedResult = '-';
    pipe.transform(selectedDataLength, numResultsPerPage, currentPageIndex, resultsTranslation).subscribe((result: string) => {
      expect(result).toEqual(expectedResult);
      done();
    });
  });

  it('should return "-" if there are no numResultsPerPage', (done: DoneFn) => {
    selectedDataLength = 0;
    numResultsPerPage = 1;
    currentPageIndex = 0;
    expectedResult = '-';
    pipe.transform(selectedDataLength, numResultsPerPage, currentPageIndex, resultsTranslation).subscribe((result: string) => {
      expect(result).toEqual(expectedResult);
      done();
    });
  });

  describe('when translation is proviced', () => {
    it('should return the generated results string (1 result)', (done: DoneFn) => {
      selectedDataLength = 1;
      numResultsPerPage = 1;
      currentPageIndex = 0;
      expectedResult = '1 - 1 of 1 results';
      pipe.transform(selectedDataLength, numResultsPerPage, currentPageIndex, resultsTranslation).subscribe((result: string) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('should return the generated results string (100 results, page 2)', (done: DoneFn) => {
      selectedDataLength = 100;
      numResultsPerPage = 10;
      currentPageIndex = 2;
      expectedResult = '21 - 30 of 100 results';
      pipe.transform(selectedDataLength, numResultsPerPage, currentPageIndex, resultsTranslation).subscribe((result: string) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('should return the generated results string (100 results, display all)', (done: DoneFn) => {
      selectedDataLength = 100;
      numResultsPerPage = -1;
      currentPageIndex = 0;
      expectedResult = '1 - 100 of 100 results';
      pipe.transform(selectedDataLength, numResultsPerPage, currentPageIndex, resultsTranslation).subscribe((result: string) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });
  });
});
