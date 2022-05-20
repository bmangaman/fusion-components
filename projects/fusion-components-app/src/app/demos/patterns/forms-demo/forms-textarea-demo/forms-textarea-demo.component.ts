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
<div class="f-form__fieldset">
  <label class="f-form__input-label">Default</label>
  <div class="f-form__input-wrapper">
    <textarea class="f-form__input"></textarea>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// FOCUS
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Focus</label>
  <div class="f-form__input-wrapper">
    <textarea class="f-form__input f-form__input--focus"></textarea>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// VALID
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Valid</label>
  <div class="f-form__input-wrapper">
    <textarea class="f-form__input f-form__input--valid"></textarea>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// WARNING
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Warning</label>
  <div class="f-form__input-wrapper">
    <textarea class="f-form__input f-form__input--warning"></textarea>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// INVALID
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Invalid</label>
  <div class="f-form__input-wrapper">
    <textarea class="f-form__input f-form__input--invalid"></textarea>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// READONLY (WITHOUT CONTENT)
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Readonly (Without Content)</label>
  <div class="f-form__input-wrapper">
    <textarea class="f-form__input" readonly></textarea>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// READONLY (WITH CONTENT)
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Readonly (With Content)</label>
  <div class="f-form__input-wrapper">
    <textarea class="f-form__input" readonly>
If a hen and a half lays and egg and a half in a day and a half, how many pancakes does it take to shingle a doghouse?

An apple, you fool: vests have no sleeves!
    </textarea>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// DISABLED
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Disabled</label>
  <div class="f-form__input-wrapper">
    <textarea class="f-form__input" disabled></textarea>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`
  ];

  readonly validationExamples = [
    `
    <form [formGroup]="demoForm">
      <div class="f-form__fieldset">
        <label class="f-form__input-label">Validation Styling (w/ wrapper)</label>
        <div class="f-form__input-wrapper">
          <textarea formControlName="input" class="f-form__input" fusionUiValidationStyling></textarea>
          <span class="f-form__input-wrapper-status-icon"></span>
        </div>
      </div>
    </form>
    `,
    `
    <form [formGroup]="demoForm">
      <div class="f-form__fieldset">
        <label class="f-form__input-label">Validation Styling (w/o wrapper)</label>
        <textarea formControlName="input2" class="f-form__input" fusionUiValidationStyling></textarea>
      </div>
    </form>
    `
  ]
}
