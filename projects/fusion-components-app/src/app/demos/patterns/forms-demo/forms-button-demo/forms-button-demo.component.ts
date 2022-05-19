import { Component } from '@angular/core';

@Component({
  selector: 'fusion-demo-forms-button',
  templateUrl: './forms-button-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsButtonDemoComponent {

  readonly textButtonExamples: string[] = [

// BUTTON THAT LOOKS LIKE LINK
`<button class="fusion-ui-button__link">Button that Looks Like Link</button>
`,

// STANDARD
`<button class="fusion-ui-button fusion-ui-button--primary">Primary</button>
<button class="fusion-ui-button fusion-ui-button--primary" disabled>Primary Disabled</button>
<button class="fusion-ui-button fusion-ui-button--secondary">Secondary</button>
<button class="fusion-ui-button fusion-ui-button--secondary" disabled>Secondary Disabled</button>
`,

// SMALL
`<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--small">Primary</button>
<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--small" disabled>Primary Disabled</button>
<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--small">Secondary</button>
<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--small" disabled>Secondary Disabled</button>
`,

// EXTRA SMALL
`<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--xSmall">Primary</button>
<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--xSmall" disabled>Primary Disabled</button>
<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--xSmall">Secondary</button>
<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--xSmall" disabled>Secondary Disabled</button>
`,

// LARGE
`<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--large">Primary</button>
<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--large" disabled>Primary Disabled</button>
<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--large">Secondary</button>
<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--large" disabled>Secondary Disabled</button>
`,
  ];

  readonly iconButtonExamples: string[] = [

// STANDARD, TEXT & ICON
`<button class="fusion-ui-button fusion-ui-button--primary">
  <span class="fusion-ui-button__text">Primary</span><i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--primary" disabled>
  <span class="fusion-ui-button__text">Primary Disabled</span><i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary">
  <span class="fusion-ui-button__text">Secondary</span><i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary" disabled>
  <span class="fusion-ui-button__text">Secondary Disabled</span><i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>
`,

// STANDARD, TEXT & ICON
`<button class="fusion-ui-button fusion-ui-button--primary">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i><span class="fusion-ui-button__text">Primary</span>
</button>

<button class="fusion-ui-button fusion-ui-button--primary" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i><span class="fusion-ui-button__text">Primary Disabled</span>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i><span class="fusion-ui-button__text">Secondary</span>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i><span class="fusion-ui-button__text">Secondary Disabled</span>
</button>
`,

// STANDARD
`<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--icon">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--icon" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--icon">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--icon" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>
`,

// SMALL
`<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--small fusion-ui-button--icon">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--small fusion-ui-button--icon" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--small fusion-ui-button--icon">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--small fusion-ui-button--icon" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>
`,

// EXTRA SMALL
`<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--xSmall fusion-ui-button--icon">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--xSmall fusion-ui-button--icon" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--xSmall fusion-ui-button--icon">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--xSmall fusion-ui-button--icon" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>
`,

// LARGE
`<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--large fusion-ui-button--icon">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--primary fusion-ui-button--large fusion-ui-button--icon" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--large fusion-ui-button--icon">
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>

<button class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--large fusion-ui-button--icon" disabled>
  <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
</button>
`,
  ];

}
