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
<div class="fusion-ui-form__fieldset fusion-ui-table__filter-input-field-selector">
  <label class="fusion-ui-form__input-label">Default</label>
  <div class="fusion-ui-form__input-wrapper fusion-ui-form__select-wrapper">
    <select class="fusion-ui-form__input fusion-ui-form__select">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// FOCUS
`
<div class="fusion-ui-form__fieldset fusion-ui-table__filter-input-field-selector">
  <label class="fusion-ui-form__input-label">Default</label>
  <div class="fusion-ui-form__input-wrapper fusion-ui-form__select-wrapper">
    <select class="fusion-ui-form__input fusion-ui-form__select fusion-ui-form__input--focus">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// VALID
`
<div class="fusion-ui-form__fieldset fusion-ui-table__filter-input-field-selector">
  <label class="fusion-ui-form__input-label">Valid</label>
  <div class="fusion-ui-form__input-wrapper fusion-ui-form__select-wrapper">
    <select class="fusion-ui-form__input fusion-ui-form__select fusion-ui-form__input--valid">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// WARNING
`
<div class="fusion-ui-form__fieldset fusion-ui-table__filter-input-field-selector">
  <label class="fusion-ui-form__input-label">Warning</label>
  <div class="fusion-ui-form__input-wrapper fusion-ui-form__select-wrapper">
    <select class="fusion-ui-form__input fusion-ui-form__select fusion-ui-form__input--warning">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// INVALID
`
<div class="fusion-ui-form__fieldset fusion-ui-table__filter-input-field-selector">
  <label class="fusion-ui-form__input-label">Invalid</label>
  <div class="fusion-ui-form__input-wrapper fusion-ui-form__select-wrapper">
    <select class="fusion-ui-form__input fusion-ui-form__select fusion-ui-form__input--invalid">
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,

// DISABLED
`
<div class="fusion-ui-form__fieldset fusion-ui-table__filter-input-field-selector">
  <label class="fusion-ui-form__input-label">Disabled</label>
  <div class="fusion-ui-form__input-wrapper fusion-ui-form__select-wrapper">
    <select class="fusion-ui-form__input fusion-ui-form__select" disabled>
      <option selected>Option 1</option>
      <option>Option 2</option>
      <option>Option 2</option>
    </select>
    <span class="fusion-ui-form__input-wrapper-status-icon"></span>
  </div>
</div>
`,
  ];

}
