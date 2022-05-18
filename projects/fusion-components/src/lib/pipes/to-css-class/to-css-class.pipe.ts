import { Pipe, PipeTransform } from '@angular/core';

/**
 * TO CSS CLASS PIPE
 *
 * The To CSS Class Pipe transform a given string to a standard CSS class string (no spaces, no capital letters).
 */
@Pipe({
  name: 'toCssClass'
})
export class ToCssClassPipe implements PipeTransform {

  /**
   * Transforms the provied text into a CSS class string.
   * E.g.
   *  - 'Some Text' => 'some-text'
   *  - 'someText' => 'some-text'
   *
   * @param text The text to be transformed.
   * @returns The transformed text.
   */
  transform(text: string): string {
    const camelCaseRegExp = new RegExp('([a-z]+[A-Z]+\\w+)+');
    let newText: string = text;

    if (!newText) {
      return '';
    }

    if (camelCaseRegExp.test(newText)) {
      newText = newText.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
    }

    if (newText.charAt(0) === '-') {
      newText = newText.substr(1);
    }

    return newText
      .replace(/\s-+/g, '-') // swap spacehypen for hypen
      .replace(/\s+/g, '-') // swap space for hyphen
      .replace(/_/g, '-') // swap underscore for hyphen
      .toLowerCase();
  }
}
