import { Directive, HostListener, Input, ViewContainerRef } from '@angular/core';

import { DownloadDirectiveFileType } from './download.interface';

/**
 * DOWNLOAD DIRECTIVE
 *
 * The download directive allows a file to be generated and downloaded when the element on which it is applied
 * is clicked. This directive should be appended to buttons or elements with role="button".
 */
@Directive({
  selector: '[fusionUiDownload]',
})
export class DownloadDirective {
  /**
   * Dictates what content is to be downloaded.
   */
  @Input() content: any;

  /**
   * Dictates the name of the downloaded file.
   */
  @Input() fileName: string = 'downloaded-file';

  /**
   * Dictates the extension of the downloaded file.
   * Currently only supports JSON.
   */
  @Input() fileExtension: DownloadDirectiveFileType = DownloadDirectiveFileType.JSON;

  constructor(
    public viewContainer: ViewContainerRef,
  ) {}

  /**
   * On element click (should be a button), call the saveFile() function to generate and download the file.
   * The saveFile() function appends a link <a> element within the directive to actually do the downloading of the file,
   * and so to avoid duplicate clicks from occurring, links <a> are ignored.
   *
   * @param target The element clicked.
   */
  @HostListener('click', ['$event.target'])
  clicked(target: any): void {
    if (target.nodeName !== 'A') {
      this.saveFile();
    }
  }

  /**
   * Saves the file by doing the following:
   *  1. converts the content to a downloadable format (either JSON or CSV)
   *  2. creates and appends an <a> tag to that DOM that, when clicked, downloads the generated file
   *  3. clicks the <a> tag to download the generated file
   *  4. removes the <a> tag from the DOM
   */
  saveFile(): void {
    const data = this.fileExtension === DownloadDirectiveFileType.CSV ? this.createCsv() : this.createJson();
    const downloadLogsLink: HTMLAnchorElement = document.createElement('a');

    downloadLogsLink.setAttribute('href', data);
    downloadLogsLink.setAttribute('download', `${this.fileName}.${this.fileExtension}`);
    downloadLogsLink.setAttribute('visibility', 'hidden');

    this.viewContainer.element.nativeElement.appendChild(downloadLogsLink);
    downloadLogsLink.click();
    this.viewContainer.element.nativeElement.removeChild(downloadLogsLink);
  }

  /**
   * Creates the JSON to be downloaded.
   *
   * @returns The JSON as a string.
   */
  createJson(): string {
    return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.content))}`;
  }

  /**
   * Creates the CSV to be downloaded.
   *
   * @returns The CSV as a string;
   */
  createCsv(): string {
    let csvContent = '';

    // If this.content is an array
    if (Array.isArray(this.content) && !!this.content.length) {

      // If each item in the this.content array is also an array
      if (Array.isArray(this.content[0]) && !!this.content[0].length) {

        // For each array index, if the value is an object or array, convert it to a string and make it pretty.
        this.content.forEach((rowArray: any[]) => {
          const row: string = this.convertArrayToString(rowArray);
          csvContent += `${row}\r\n`;
        });

      // If each item in the this.content array is an Object
      } else if (!!this.content[0] && this.isJsonObject(this.content[0])) {
        const headerRow: string = Object.keys(this.content[0]).join(',');
        csvContent += `${headerRow}\r\n`;

        // For each object, if the object's value is an object or array, convert it to a string and make it pretty.
        this.content.forEach((rowObject: Record<string, any>) => {
          const row: string = this.convertArrayToString(Object.values(rowObject));
          csvContent += `${row}\r\n`;
        });

      // If each item in the this.content array is neither an array or Object
      } else {
        this.content.forEach((row: any) => csvContent += `${row}\r\n`);
      }

    // If this.content is an Object
    } else if (!!this.content && this.isJsonObject(this.content)) {
      Object.keys(this.content).forEach((key: string) => csvContent += `${key},${this.content[key]}\r\n`);

    // If this.content is neither an array or Object
    } else {
      csvContent = this.content;
    }

    // Using semicolon (;) to indicate the separation of entries to help support JSON Objects (strings with commas) as entries
    const blob: Blob = new Blob([csvContent], { type: 'text/csv;charset=utf8\n' });
    return URL.createObjectURL(blob);
  }

  /**
   * Converts the provided array into a string surrounded by double quotes (") so that the comma-separate-values
   * are not interpreted as new data points/ columns.
   *
   * @param array The array to be converted into a string.
   * @returns The array as a string.
   */
  convertArrayToString(array: any[]): string {
    return array
      .map((value: any) => {
        if (Array.isArray(value)) {
          return `"${value.join(',')}"`;
        }

        if (this.isJsonObject(value)) {
          return `"${JSON.stringify(value).replace(/\\/g, '').replace(/"/g, '')}"`;
        }

        return value;
      })
      .join(',');
  } 

  /**
   * Determines whether or not the provided item is a JSON object.
   *
   * @param obj The item to check.
   * @returns True if the provided item is a JSON object (e.g. { key: value }), false otherwise
   */
  isJsonObject(obj: any): boolean {
    let item: any = typeof obj !== 'string' && !(obj instanceof String) ? JSON.stringify(obj) : obj;

    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    return !!item && typeof item === 'object' && !Array.isArray(item);
  }
}
