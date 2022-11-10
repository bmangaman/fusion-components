import { ViewContainerRef } from '@angular/core';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { DownloadDirective } from './download.directive';
import { DownloadDirectiveFileType } from './download.interface';

describe('DownloadDirective', () => {
  let directive: DownloadDirective;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    viewContainerRef = ComponentStubFactory.getViewContainerRefStub() as ViewContainerRef;
    directive = new DownloadDirective(viewContainerRef);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  describe('HostListener', () => {
    describe('click - clicked()', () => {
      it('should call saveFile() if the target element is not an <a> tag', () => {
        spyOn(directive, 'saveFile').and.stub();

        directive.clicked({ nodeName: 'A' });
        expect(directive.saveFile).not.toHaveBeenCalled();

        directive.clicked({ nodeName: 'BUTTON' });
        expect(directive.saveFile).toHaveBeenCalled();
      });
    });
  });

  describe('saveFile()', () => {
    it('should call createJson if fileExtension is JSON', () => {
      spyOn(directive, 'createJson').and.callThrough();
      directive.fileExtension = DownloadDirectiveFileType.JSON;
      directive.saveFile();
      expect(directive.createJson).toHaveBeenCalled();
    });

    it('should call createCsv if fileExtension is CSV', () => {
      spyOn(directive, 'createCsv').and.callThrough();
      directive.fileExtension = DownloadDirectiveFileType.CSV;
      directive.saveFile();
      expect(directive.createCsv).toHaveBeenCalled();
    });

    it('should call viewContainer, appendChild, and removeChild', () => {
      directive.saveFile();

      expect(viewContainerRef.element.nativeElement.appendChild).toHaveBeenCalled();
      expect(viewContainerRef.element.nativeElement.removeChild).toHaveBeenCalled();
    });
  });

  describe('createJson()', () => {
    it('should generate and return a json string', () => {
      directive.content = { data: 'data' };
      const result: string = directive.createJson();
      expect(result.includes('data:text/json;charset=utf-8,')).toBeTrue();
    });
  });

  describe('createCsv()', () => {
    // TODO: getting a "has no expectation" warning message for this test
    it('should generate and return a csv string', () => {
      // An array of arrays
      const arrayArrayData: any = [['id 0', 'data 0'], ['id 1', 'data 1']];
      directive.content = arrayArrayData;
      expect(typeof directive.createCsv()).toEqual('string');

      // An Array of Objects
      const arrayObjectData: any = [{ id: 0, data: 'data 0' }, { id: 1, data: 'data 1' }];
      directive.content = arrayObjectData;
      expect(typeof directive.createCsv()).toEqual('string');

      // And Array of any
      const arrayAnyData: any = [true, false];
      directive.content = arrayAnyData;
      expect(typeof directive.createCsv()).toEqual('string');

      // An Object
      const objectData: any = { id: 0, data1: 'data 1', data2: 'data 2' };
      directive.content = objectData;
      expect(typeof directive.createCsv()).toEqual('string');

      // any
      const anyData: any = true;
      directive.content = anyData;
      expect(typeof directive.createCsv()).toEqual('string');
    });
  });

  describe('convertArrayToString()', () => {
    it('should handle converting an array of arrays', () => {
      const array: string[][] = [
        ['one', 'two', 'three'],
        ['four', 'five', 'six'],
        ['seven', 'eight', 'nine'],
      ];
      const expectedResult = '"one,two,three","four,five,six","seven,eight,nine"';
      expect(directive.convertArrayToString(array)).toEqual(expectedResult);
    });

    it('should handle converting an array of objects', () => {
      const array: any[] = [
        { one: 1, two: 2, three: 3 },
        { four: 4, five: 5, six: 6 },
        { seven: 7, eight: 8, nine: 9 },
      ];
      const expectedResult = '"{one:1,two:2,three:3}","{four:4,five:5,six:6}","{seven:7,eight:8,nine:9}"';
      expect(directive.convertArrayToString(array)).toEqual(expectedResult);
    });

    it('should handle converting an array of primitive values', () => {
      const stringArray: string[] = ['a', 'b', 'c'];
      const expectedStringResult = 'a,b,c';
      expect(directive.convertArrayToString(stringArray)).toEqual(expectedStringResult);

      const numberArray: number[] = [1, 2, 3];
      const expectedNumberResult = '1,2,3';
      expect(directive.convertArrayToString(numberArray)).toEqual(expectedNumberResult);
    });
  });

  describe('isJsonObject()', () => {
    it('should return true if the provided obj is a JSON object', () => {
      expect(directive.isJsonObject({})).toBeTrue();
    });

    it('should return false if the provided object is NOT a JSON object', () => {
      expect(directive.isJsonObject(undefined)).toBeFalse();
      expect(directive.isJsonObject(null)).toBeFalse();
      expect(directive.isJsonObject(false)).toBeFalse();
      expect(directive.isJsonObject('string')).toBeFalse();
      expect(directive.isJsonObject([])).toBeFalse();
    });
  });
});
