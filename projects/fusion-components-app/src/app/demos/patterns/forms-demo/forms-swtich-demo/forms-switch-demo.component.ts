import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'fusion-demo-forms-switch',
  templateUrl: './forms-switch-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsSwitchDemoComponent implements OnInit {
  switchDemoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildSwitchDemoForm();
  }

  buildSwitchDemoForm(): void {
    this.switchDemoForm = this.fb.group({
      switch: [false],
    });
  }

  readonly switchExamples: string[] = [
// CHECKED, DEFAULT
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox"
        checked="true" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Default (On)</span>
    </label>
  </span>
</div>`,

// CHECKED, HOVER
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input fusion-ui-form__switch-input--hover"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox"
        checked="true" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Hover (On)</span>
    </label>
  </span>
</div>`,

// CHECKED, FOCUSED
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input fusion-ui-form__switch-input--focus"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox"
        checked="true" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Focus (On)</span>
    </label>
  </span>
</div>`,

// CHECKED, DISABLED
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox"
        disabled="true"
        checked="true" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Disabled (On)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, DEFAULT
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Default (Off)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, HOVER
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input fusion-ui-form__switch-input--hover"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Hover (Off)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, FOCUSED
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input fusion-ui-form__switch-input--focus"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Focus (Off)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, DISABLED
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox"
        disabled="true" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Disabled (Off)</span>
    </label>
  </span>
</div>`,

// CHECKED, DEFAULT, SMALL
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch fusion-ui-form__switch--small">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox"
        checked="true" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Default (On)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, DEFAULT, SMALL
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__switch fusion-ui-form__switch--small">
    <label class="fusion-ui-form__switch-label" for="fusion-ui-form-switch">
      <input
        class="fusion-ui-form__switch-input"
        id="fusion-ui-switch"
        name="fusion-ui-switch"
        type="checkbox" />
      <span class="fusion-ui-form__switch-visual" aria-hidden="true"></span>
      <span class="fusion-ui-form__switch-label-text">Default (On)</span>
    </label>
  </span>
</div>`,
  ];

}
