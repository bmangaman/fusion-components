import { Component } from '@angular/core';

@Component({
  selector: 'fusion-demo-forms-select',
  templateUrl: './forms-select-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsSelectDemoComponent {

  readonly selectExamples: string[] = [

// DEFAULT
`
<div class="f-form__fieldset f-table__filter-input-field-selector">
  <label class="f-form__input-label">Default</label>
  <div class="f-form__input-wrapper f-form__select-wrapper">
    <select class="f-form__input f-form__select">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// FOCUS
`
<div class="f-form__fieldset f-table__filter-input-field-selector">
  <label class="f-form__input-label">Default</label>
  <div class="f-form__input-wrapper f-form__select-wrapper">
    <select class="f-form__input f-form__select f-form__input--focus">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// VALID
`
<div class="f-form__fieldset f-table__filter-input-field-selector">
  <label class="f-form__input-label">Valid</label>
  <div class="f-form__input-wrapper f-form__select-wrapper">
    <select class="f-form__input f-form__select f-form__input--valid">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// WARNING
`
<div class="f-form__fieldset f-table__filter-input-field-selector">
  <label class="f-form__input-label">Warning</label>
  <div class="f-form__input-wrapper f-form__select-wrapper">
    <select class="f-form__input f-form__select f-form__input--warning">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// INVALID
`
<div class="f-form__fieldset f-table__filter-input-field-selector">
  <label class="f-form__input-label">Invalid</label>
  <div class="f-form__input-wrapper f-form__select-wrapper">
    <select class="f-form__input f-form__select f-form__input--invalid">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// DISABLED
`
<div class="f-form__fieldset f-table__filter-input-field-selector">
  <label class="f-form__input-label">Disabled</label>
  <div class="f-form__input-wrapper f-form__select-wrapper">
    <select class="f-form__input f-form__select" disabled>
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="f-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,
  ];

}
