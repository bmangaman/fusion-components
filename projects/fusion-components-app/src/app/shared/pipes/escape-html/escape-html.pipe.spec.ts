import { SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ComponentStubFactory } from 'fusion-components/unit-test-helpers/component-stub-factory.spec';

import { EscapeHtmlPipe } from './escape-html.pipe';

describe('EscapeHtmlPipe', () => {
  let pipe: EscapeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    sanitizer = ComponentStubFactory.getDomSanitizerStub() as DomSanitizer;
    pipe = new EscapeHtmlPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call sanitizer.bypassSecurityTrustHtml with the provied content', () => {
    const content = '<a href="link"></a>';
    pipe.transform(content);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(content);
  });

  it('should call sanitizer.sanitize with the provied content', () => {
    const content = '<a href="link"></a>';
    pipe.transform(content, true);
    expect(sanitizer.sanitize).toHaveBeenCalledWith(SecurityContext.HTML, content);
  });
});
