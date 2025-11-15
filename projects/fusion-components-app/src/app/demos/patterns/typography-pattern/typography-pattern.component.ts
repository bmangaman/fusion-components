import { Component } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import { State, TableTemplate, TableType, TableColumnSorted } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { TableModule } from '../../../../../../fusion-components/src/lib/components/table/table.module';
import { TableColumnModule } from '../../../../../../fusion-components/src/lib/components/table/table-column/table-column.module';
import { TemplateModule } from '../../../../../../fusion-components/src/lib/directives/template/template.module';

@Component({
    selector: 'fusion-demo-typography',
    templateUrl: './typography-pattern.component.html',
    styleUrls: ['./typography-pattern.component.scss'],
    standalone: true,
    imports: [DemoComponent, TableModule, TableColumnModule, TemplateModule]
})
export class TypographyPatternComponent {
  readonly TableTemplate = TableTemplate;
  readonly TableType = TableType;
  readonly State = State;
  readonly TableColumnSorted = TableColumnSorted;

  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  lineHeights: { variable: string, height: number, result: SafeHtml }[] = [
    {
      variable: '$f-line-height-sm',
      height: 1.3,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="line-height: 1.3em">Result</p>'),
    },
    {
      variable: '$f-line-height-md',
      height: 1.4,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="line-height: 1.4em">Result</p>'),
    },
    {
      variable: '$f-line-height-lg',
      height: 1.5,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="line-height: 1.5em">Result</p>'),
    },
  ];

  fontWeights: { variable: string, weight: number, result: SafeHtml }[] = [
    {
      variable: '$f-font-weight-light',
      weight: 300,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-weight: 300">Result</p>'),
    },
    {
      variable: '$f-font-weight-regular',
      weight: 400,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-weight: 400">Result</p>'),
    },
    {
      variable: '$f-font-weight-semibold',
      weight: 600,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-weight: 600">Result</p>'),
    },
    {
      variable: '$f-font-weight-bold',
      weight: 700,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-weight: 700">Result</p>'),
    },
  ];

  fontSizes: { variable: string, size: number, result: SafeHtml }[] = [
    {
      variable: '$f-font-size-xs',
      size: 12,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 12px">Result</p>'),
    },
    {
      variable: '$f-font-size-sm',
      size: 14,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 14px">Result</p>'),
    },
    {
      variable: '$f-font-size-md',
      size: 16,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 16px">Result</p>'),
    },
    {
      variable: '$f-font-size-lg',
      size: 24,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 24px">Result</p>'),
    },
    {
      variable: '$f-font-size-xl',
      size: 32,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 32px">Result</p>'),
    },
    {
      variable: '$f-font-size-xxl',
      size: 48,
      result: this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 48px">Result</p>'),
    },
  ];

  headers: { level: string, size: number, weight: number, height: number, class: string, result: SafeHtml }[] = [
    {
      level: 'Header 1 (h1)',
      size: this.fontSizes[4].size,
      weight: this.fontWeights[1].weight,
      height: +(this.lineHeights[0].height * this.fontSizes[4].size).toFixed(1),
      class: 'f-h1',
      result: this.sanitizer.bypassSecurityTrustHtml('<h1 class="f-h1">Result</h1>'),
    },
    {
      level: 'Header 2 (h2)',
      size: this.fontSizes[3].size,
      weight: this.fontWeights[2].weight,
      height: +(this.lineHeights[0].height * this.fontSizes[3].size).toFixed(1),
      class: 'f-h2',
      result: this.sanitizer.bypassSecurityTrustHtml('<h2 class="f-h2">Result</h2>'),
    },
    {
      level: 'Header 3 (h3)',
      size: 20,
      weight: this.fontWeights[2].weight,
      height: +(this.lineHeights[1].height * 20).toFixed(1),
      class: 'f-h3',
      result: this.sanitizer.bypassSecurityTrustHtml('<h3 class="f-h3">Result</h3>'),
    },
    {
      level: 'Header 4 (h4)',
      size: 18,
      weight: this.fontWeights[2].weight,
      height: +(this.lineHeights[1].height * 18).toFixed(1),
      class: 'f-h4',
      result: this.sanitizer.bypassSecurityTrustHtml('<h4 class="f-h4">Result</h4>'),
    },
    {
      level: 'Header 5 (h5)',
      size: this.fontSizes[2].size,
      weight: this.fontWeights[2].weight,
      height: +(this.lineHeights[1].height * this.fontSizes[2].size).toFixed(1),
      class: 'f-h5',
      result: this.sanitizer.bypassSecurityTrustHtml('<h5 class="f-h5">Result</h5>'),
    },
  ];

  paragraphFillterText: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium lectus quam id leo in vitae turpis. Auctor neque vitae tempus quam pellentesque nec. Tellus at urna condimentum mattis pellentesque id. Elementum pulvinar etiam non quam. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Id faucibus nisl tincidunt eget nullam non nisi. Eu nisl nunc mi ipsum faucibus vitae. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Ullamcorper dignissim cras tincidunt lobortis. Vestibulum morbi blandit cursus risus at ultrices mi. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Morbi tristique senectus et netus et malesuada fames ac turpis. Vulputate sapien nec sagittis aliquam malesuada. Mattis pellentesque id nibh tortor id aliquet lectus. Nibh nisl condimentum id venenatis a condimentum. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Urna condimentum mattis pellentesque id nibh tortor id.',
    'Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Eu lobortis elementum nibh tellus molestie nunc non. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Integer enim neque volutpat ac tincidunt. Aliquam ultrices sagittis orci a scelerisque purus semper. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Ultrices gravida dictum fusce ut placerat orci. Id venenatis a condimentum vitae sapien pellentesque habitant. Erat imperdiet sed euismod nisi. Lacus laoreet non curabitur gravida arcu ac tortor. At ultrices mi tempus imperdiet nulla malesuada. Amet venenatis urna cursus eget. Arcu odio ut sem nulla. Purus faucibus ornare suspendisse sed nisi lacus. Elit duis tristique sollicitudin nibh sit amet commodo.',
  ];

  paragraphs: { level: string, size: number, weight: number, height: number, class: string, result: SafeHtml }[] = [
    {
      level: 'Paragraph Large',
      size: this.fontSizes[2].size,
      weight: this.fontWeights[1].weight,
      height: +(this.lineHeights[2].height * this.fontSizes[2].size).toFixed(1),
      class: 'f-p-lg',
      result: this.sanitizer.bypassSecurityTrustHtml(`<p class="f-p-lg">${this.paragraphFillterText[0]}</p><p class="f-p-lg">${this.paragraphFillterText[1]}</p>`),
    },
    {
      level: 'Paragraph Medium',
      size: this.fontSizes[1].size,
      weight: this.fontWeights[1].weight,
      height: +(this.lineHeights[1].height * this.fontSizes[1].size).toFixed(1),
      class: 'f-p-md',
      result: this.sanitizer.bypassSecurityTrustHtml(`<p class="f-p-md">${this.paragraphFillterText[0]}</p><p class="f-p-md">${this.paragraphFillterText[1]}</p>`),
    },
    {
      level: 'Paragraph Small',
      size: this.fontSizes[0].size,
      weight: this.fontWeights[1].weight,
      height: +(this.lineHeights[2].height * this.fontSizes[0].size).toFixed(1),
      class: 'f-p-sm',
      result: this.sanitizer.bypassSecurityTrustHtml(`<p class="f-p-sm">${this.paragraphFillterText[0]}</p><p class="f-p-sm">${this.paragraphFillterText[1]}</p>`),
    },
  ];

}
