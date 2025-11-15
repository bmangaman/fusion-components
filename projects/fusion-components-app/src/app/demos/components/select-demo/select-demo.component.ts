import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { cloneDeep } from 'lodash-es';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { SelectOption, SelectComponentUtils } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { SelectModule } from '../../../../../../fusion-components/src/lib/components/select/select.module';

@Component({
    selector: 'fusion-demo-select',
    templateUrl: './select-demo.component.html',
    styleUrls: ['./select-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, SelectModule]
})
export class SelectDemoComponent {
  selectForm: UntypedFormGroup;
  selectOptions: SelectOption[] = [];

  selectFormControl: UntypedFormControl = new UntypedFormControl(null, SelectComponentUtils.selectRequiredValidator);

  constructor(
    private fb: UntypedFormBuilder,
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

    this.selectForm.get('numOfOptions')?.valueChanges.pipe(debounce(() => interval(400))).subscribe((val: number) => {
      const hasDisabledOptions: boolean = this.selectForm.get('hasDisabledOptions')?.value;
      this.generateSelectOptions(val, hasDisabledOptions);
    });

    this.selectForm.get('hasDisabledOptions')?.valueChanges.pipe(debounce(() => interval(400))).subscribe((val: boolean) => {
      const numOfOptions: number = this.selectForm.get('numOfOptions')?.value || 0;
      this.generateSelectOptions(numOfOptions, val);
    });

    this.selectForm.get('isDisabled')?.valueChanges.subscribe((val: boolean) => {
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
