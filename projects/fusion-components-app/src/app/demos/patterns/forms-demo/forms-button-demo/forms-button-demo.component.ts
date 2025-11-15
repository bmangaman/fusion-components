import { Component } from '@angular/core';
import { EscapeHtmlPipe } from '../../../../shared/pipes/escape-html/escape-html.pipe';

@Component({
    selector: 'fusion-demo-forms-button',
    templateUrl: './forms-button-demo.component.html',
    styleUrls: ['../forms-demo-shared.scss'],
    standalone: true,
    imports: [EscapeHtmlPipe]
})
export class FormsButtonDemoComponent {

  readonly textButtonExamples: string[] = [

// BUTTON THAT LOOKS LIKE LINK
`<button class="f-button__link">Button that Looks Like Link</button>
`,

// STANDARD
`<button class="f-button f-button--primary">Primary</button>
<button class="f-button f-button--primary" disabled>Primary Disabled</button>
<button class="f-button f-button--secondary">Secondary</button>
<button class="f-button f-button--secondary" disabled>Secondary Disabled</button>
`,

// SMALL
`<button class="f-button f-button--primary f-button--small">Primary</button>
<button class="f-button f-button--primary f-button--small" disabled>Primary Disabled</button>
<button class="f-button f-button--secondary f-button--small">Secondary</button>
<button class="f-button f-button--secondary f-button--small" disabled>Secondary Disabled</button>
`,

// EXTRA SMALL
`<button class="f-button f-button--primary f-button--xSmall">Primary</button>
<button class="f-button f-button--primary f-button--xSmall" disabled>Primary Disabled</button>
<button class="f-button f-button--secondary f-button--xSmall">Secondary</button>
<button class="f-button f-button--secondary f-button--xSmall" disabled>Secondary Disabled</button>
`,

// LARGE
`<button class="f-button f-button--primary f-button--large">Primary</button>
<button class="f-button f-button--primary f-button--large" disabled>Primary Disabled</button>
<button class="f-button f-button--secondary f-button--large">Secondary</button>
<button class="f-button f-button--secondary f-button--large" disabled>Secondary Disabled</button>
`,
  ];

  readonly iconButtonExamples: string[] = [

// STANDARD, TEXT & ICON
`<button class="f-button f-button--primary">
  <span class="f-button__text">Primary</span><i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--primary" disabled>
  <span class="f-button__text">Primary Disabled</span><i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary">
  <span class="f-button__text">Secondary</span><i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary" disabled>
  <span class="f-button__text">Secondary Disabled</span><i class="mdi mdi-content-copy f-button__icon"></i>
</button>
`,

// STANDARD, TEXT & ICON
`<button class="f-button f-button--primary">
  <i class="mdi mdi-content-copy f-button__icon"></i><span class="f-button__text">Primary</span>
</button>

<button class="f-button f-button--primary" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i><span class="f-button__text">Primary Disabled</span>
</button>

<button class="f-button f-button--secondary">
  <i class="mdi mdi-content-copy f-button__icon"></i><span class="f-button__text">Secondary</span>
</button>

<button class="f-button f-button--secondary" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i><span class="f-button__text">Secondary Disabled</span>
</button>
`,

// STANDARD
`<button class="f-button f-button--primary f-button--icon">
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--primary f-button--icon" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary f-button--icon">
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary f-button--icon" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>
`,

// SMALL
`<button class="f-button f-button--primary f-button--small f-button--icon">
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--primary f-button--small f-button--icon" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary f-button--small f-button--icon">
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary f-button--small f-button--icon" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>
`,

// EXTRA SMALL
`<button class="f-button f-button--primary f-button--xSmall f-button--icon">
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--primary f-button--xSmall f-button--icon" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary f-button--xSmall f-button--icon">
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary f-button--xSmall f-button--icon" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>
`,

// LARGE
`<button class="f-button f-button--primary f-button--large f-button--icon">
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--primary f-button--large f-button--icon" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary f-button--large f-button--icon">
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>

<button class="f-button f-button--secondary f-button--large f-button--icon" disabled>
  <i class="mdi mdi-content-copy f-button__icon"></i>
</button>
`,
  ];

}
