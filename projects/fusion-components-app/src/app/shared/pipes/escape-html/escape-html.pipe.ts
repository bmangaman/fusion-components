import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * KEEP HTML PIPE
 *
 * The keep-html pipe allows a clean way to santize or bypass html.
 */
@Pipe({
    name: 'keepHtml', pure: false
})
export class EscapeHtmlPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer,
  ) {}

    /**
     * Transforms the provided content (html) to SafeHTML
     *
     * @param content the markup (html)
     * @param sanitize flag to either sanitize or bypassSecurity for the provided html content; default false
     */
  transform(content: string, sanitize: boolean = false): SafeHtml | null {
    return sanitize ? this.sanitizer.sanitize(SecurityContext.HTML, content) : this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
