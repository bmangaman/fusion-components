import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fusion-demo-forms-input',
    templateUrl: './forms-input-demo.component.html',
    styleUrls: ['../forms-demo-shared.scss'],
    standalone: false
})
export class FormsInputDemoComponent {

  demoForm = new UntypedFormGroup({
    input: new UntypedFormControl('', [Validators.maxLength(8), Validators.required]),
    input2: new UntypedFormControl('', [Validators.maxLength(8), Validators.required])
  });

  readonly inputExamples: string[] = [

// DEFAULT
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Default</label>
  <div class="f-form__input-wrapper">
    <input class="f-form__input" type="text"/>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// FOCUS
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Focus</label>
  <div class="f-form__input-wrapper">
    <input class="f-form__input f-form__input--focus" type="text"/>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// VALID
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Valid</label>
  <div class="f-form__input-wrapper">
    <input class="f-form__input f-form__input--valid" type="text" />
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// WARNING
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Warning</label>
  <div class="f-form__input-wrapper">
    <input class="f-form__input f-form__input--warning" type="text" />
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// INVALID
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Invalid</label>
  <div class="f-form__input-wrapper">
    <input class="f-form__input f-form__input--invalid" type="text" />
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// READONLY (WITHOUT CONTENT)
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Readonly (Without Content)</label>
  <div class="f-form__input-wrapper">
    <input class="f-form__input" readonly type="text" />
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// READONLY (WITH CONTENT)
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Readonly (With Content)</label>
  <div class="f-form__input-wrapper">
    <input class="f-form__input" readonly placeholder="Placeholder Text" type="text" />
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// DISABLED
`
<div class="f-form__fieldset">
  <label class="f-form__input-label">Disabled</label>
  <div class="f-form__input-wrapper">
    <input class="f-form__input" disabled type="text" />
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
          <input formControlName="input" class="f-form__input" type="text" fusionUiValidationStyling/>
          <span class="f-form__input-wrapper-status-icon"></span>
        </div>
      </div>
    </form>
    `,
    `
    <form [formGroup]="demoForm">
      <div class="f-form__fieldset">
        <label class="f-form__input-label">Validation Styling (w/o wrapper)</label>
        <input formControlName="input2" class="f-form__input" type="text" fusionUiValidationStyling/>
      </div>
    </form>
    `
  ]
}
