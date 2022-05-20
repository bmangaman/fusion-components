import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { cloneDeep } from 'lodash';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { SelectOption, SelectComponentUtils } from '@fusion-components';

@Component({
  selector: 'fusion-demo-select',
  templateUrl: './select-demo.component.html',
  styleUrls: ['./select-demo.component.scss']
})
export class SelectDemoComponent {
  selectForm: FormGroup;
  selectOptions: SelectOption[] = [];

  selectFormControl: FormControl = new FormControl(null, SelectComponentUtils.selectRequiredValidator);

  constructor(
    private fb: FormBuilder,
  ) {
    this.generateSelectOptions(100);
    this.buildSelectForm();
  }

  /**
   * Builds the select form and then subscribes to when the numOfOptions and hasDisabledOptions fields change.
   */
  buildSelectForm(): void {
    this.selectForm = this.fb.group({
      label: ['Label'],
      isDisabled: [false],
      numOfOptions: [100],
      hasDisabledOptions: [false],
      isSearchable: [false],
    });
    
    this.selectFormControl.valueChanges.subscribe((value: any) => console.log('valueChanges', value));

    this.selectForm.get('numOfOptions').valueChanges.pipe(debounce(() => interval(400))).subscribe((val: number) => {
      const hasDisabledOptions: boolean = this.selectForm.get('hasDisabledOptions').value;
      this.generateSelectOptions(val, hasDisabledOptions);
    });

    this.selectForm.get('hasDisabledOptions').valueChanges.pipe(debounce(() => interval(400))).subscribe((val: boolean) => {
      const numOfOptions: number = this.selectForm.get('numOfOptions').value || 0;
      this.generateSelectOptions(numOfOptions, val);
    });

    this.selectForm.get('isDisabled').valueChanges.subscribe((val: boolean) => {
      console.log('isDisabled', val);
      val ? this.selectFormControl.disable() : this.selectFormControl.enable();
    })
  }

  /**
   * Generates the Select Component options based on the provided number of options and
   * whether or not any of them should be disabled.
   *
   * @param numOfOptions The number of options to be generated.
   * @param isDisabledOptions Flag to determine if any of the generated options are disabled.
   */
  generateSelectOptions(numOfOptions: number, isDisabledOptions?: boolean): void {
    const newOptions: SelectOption[] = [];

    for (let i = 0; i < numOfOptions; i++) {
      newOptions.push({
        isDisabled: isDisabledOptions ? Math.random() > 0.5 : false,
        label: `Option ${i} Label`,
        value: `option-${1}-value`,
      });
    }

    this.selectOptions = cloneDeep(newOptions);
  }
}
