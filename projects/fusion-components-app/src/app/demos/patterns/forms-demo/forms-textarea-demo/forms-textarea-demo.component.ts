import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fusion-demo-forms-textarea',
  templateUrl: './forms-textarea-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsTextareaDemoComponent {

  demoForm = new FormGroup({
    input: new FormControl('', [Validators.maxLength(8), Validators.required]),
    input2: new FormControl('', [Validators.maxLength(8), Validators.required])
  });

  readonly inputExamples: string[] = [

// DEFAULT
`
<div class="fusion-ui-form__fieldset">
  <label class="fusion-ui-form__input-label">Default</label>
  <div class="fusion-ui-form__input-wrapper">
    <textarea class="fusion-ui-form__input"></textarea>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// FOCUS
`
<div class="fusion-ui-form__fieldset">
  <label class="fusion-ui-form__input-label">Focus</label>
  <div class="fusion-ui-form__input-wrapper">
    <textarea class="fusion-ui-form__input fusion-ui-form__input--focus"></textarea>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// VALID
`
<div class="fusion-ui-form__fieldset">
  <label class="fusion-ui-form__input-label">Valid</label>
  <div class="fusion-ui-form__input-wrapper">
    <textarea class="fusion-ui-form__input fusion-ui-form__input--valid"></textarea>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// WARNING
`
<div class="fusion-ui-form__fieldset">
  <label class="fusion-ui-form__input-label">Warning</label>
  <div class="fusion-ui-form__input-wrapper">
    <textarea class="fusion-ui-form__input fusion-ui-form__input--warning"></textarea>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// INVALID
`
<div class="fusion-ui-form__fieldset">
  <label class="fusion-ui-form__input-label">Invalid</label>
  <div class="fusion-ui-form__input-wrapper">
    <textarea class="fusion-ui-form__input fusion-ui-form__input--invalid"></textarea>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// READONLY (WITHOUT CONTENT)
`
<div class="fusion-ui-form__fieldset">
  <label class="fusion-ui-form__input-label">Readonly (Without Content)</label>
  <div class="fusion-ui-form__input-wrapper">
    <textarea class="fusion-ui-form__input" readonly></textarea>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// READONLY (WITH CONTENT)
`
<div class="fusion-ui-form__fieldset">
  <label class="fusion-ui-form__input-label">Readonly (With Content)</label>
  <div class="fusion-ui-form__input-wrapper">
    <textarea class="fusion-ui-form__input" readonly>
If a hen and a half lays and egg and a half in a day and a half, how many pancakes does it take to shingle a doghouse?

An apple, you fool: vests have no sleeves!
    </textarea>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// DISABLED
`
<div class="fusion-ui-form__fieldset">
  <label class="fusion-ui-form__input-label">Disabled</label>
  <div class="fusion-ui-form__input-wrapper">
    <textarea class="fusion-ui-form__input" disabled></textarea>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`
  ];

  readonly validationExamples = [
    `
    <form [formGroup]="demoForm">
      <div class="fusion-ui-form__fieldset">
        <label class="fusion-ui-form__input-label">Validation Styling (w/ wrapper)</label>
        <div class="fusion-ui-form__input-wrapper">
          <textarea formControlName="input" class="fusion-ui-form__input" fusionUiValidationStyling></textarea>
          <span class="fusion-ui-form__input-wrapper-status-icon"></span>
        </div>
      </div>
    </form>
    `,
    `
    <form [formGroup]="demoForm">
      <div class="fusion-ui-form__fieldset">
        <label class="fusion-ui-form__input-label">Validation Styling (w/o wrapper)</label>
        <textarea formControlName="input2" class="fusion-ui-form__input" fusionUiValidationStyling></textarea>
      </div>
    </form>
    `
  ]
}
