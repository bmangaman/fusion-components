import { Component } from '@angular/core';

import { Size, StatusLevel, CardTemplate, CardStatus } from '@fusion-components';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray, AbstractControl, FormArray } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
    selector: 'fusion-demo-card',
    templateUrl: './card-demo.component.html',
    styleUrls: ['./card-demo.component.scss'],
    standalone: false
})
export class CardDemoComponent {
  readonly StatusLevel = StatusLevel;
  readonly Size = Size;
  readonly CardTemplate = CardTemplate;

  cardForm: UntypedFormGroup;
  statuses: CardStatus[] = [];
  isLoaded: boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildCardForm();
  }

  buildCardForm(): void {
    this.cardForm = this.fb.group({
      title: ['Card Title'],
      useTitleTemplate: [false],
      content: ['Card Content'],
      useContentTemplate: [false],
      details: ['Card Details'],
      useDetailsTemplate: [false],
      footer: ['Card Footer'],
      useFooterTemplate: [false],
      size: [Size.MEDIUM],
      hideStatusBarStyling: [false],
      statuses: this.fb.array([]),
    });

    this.updateStatuses();
    this.cardForm.get('statuses')?.valueChanges.subscribe(() => this.updateStatuses());

    merge(
      this.cardForm.get('useTitleTemplate')!.valueChanges,
      this.cardForm.get('useContentTemplate')!.valueChanges,
      this.cardForm.get('useDetailsTemplate')!.valueChanges,
      this.cardForm.get('useFooterTemplate')!.valueChanges,
    ).subscribe(() => {
      this.isLoaded = false;
      setTimeout(() => this.isLoaded = true);
    })
  }

  createStatusFormGroup(): UntypedFormGroup {
    return this.fb.group({
      status: [StatusLevel.BASE],
      count: [0],
      text: [''],
      isHidden: [false],
      isTextHidden: [false],
      isIconHidden: [false],
    });
  }

  updateStatuses(): void {
    const statusesArrayLength: number = (this.cardForm.get('statuses') as UntypedFormArray).length;
    const statuses: CardStatus[] = [];

    for (let i = 0; i < statusesArrayLength; i++) {
      const status: AbstractControl = (this.cardForm.get('statuses') as UntypedFormArray).at(i);
      statuses.push({
        status: parseInt(status.get('status')?.value, 10),
        count: status.get('count')?.value,
        text: status.get('text')?.value,
        isHidden: status.get('isHidden')?.value,
        isTextHidden: status.get('isTextHidden')?.value,
        isIconHidden: status.get('isIconHidden')?.value,
      });
    }

    this.statuses = statuses;
  }

  addNewStatus(): void {
    (this.cardForm.get('statuses') as UntypedFormArray).push(this.createStatusFormGroup());
  }

  removeStatus(index: number): void {
    (this.cardForm.get('statuses') as UntypedFormArray).removeAt(index);
  }

  get statusesFormArray(): FormArray {
    return this.cardForm.get('statuses') as FormArray;
  }
}
