import { Component } from '@angular/core';

import { FusionUiSize, FusionUiStatusLevel, CardTemplate, CardStatus } from '@fusion-ui/fusion-components';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'fusion-demo-card',
  templateUrl: './card-demo.component.html',
  styleUrls: ['./card-demo.component.scss']
})
export class CardDemoComponent {
  readonly FusionUiStatusLevel = FusionUiStatusLevel;
  readonly FusionUiSize = FusionUiSize;
  readonly CardTemplate = CardTemplate;

  cardForm: FormGroup;
  statuses: CardStatus[] = [];
  isLoaded: boolean = true;

  constructor(
    private fb: FormBuilder,
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
      size: [FusionUiSize.MEDIUM],
      hideStatusBarStyling: [false],
      statuses: this.fb.array([]),
    });

    this.updateStatuses();
    this.cardForm.get('statuses').valueChanges.subscribe(() => this.updateStatuses());

    merge(
      this.cardForm.get('useTitleTemplate').valueChanges,
      this.cardForm.get('useContentTemplate').valueChanges,
      this.cardForm.get('useDetailsTemplate').valueChanges,
      this.cardForm.get('useFooterTemplate').valueChanges,
    ).subscribe(() => {
      this.isLoaded = false;
      setTimeout(() => this.isLoaded = true);
    })
  }

  createStatusFormGroup(): FormGroup {
    return this.fb.group({
      status: [FusionUiStatusLevel.BASE],
      count: [0],
      text: [''],
      isHidden: [false],
      isTextHidden: [false],
      isIconHidden: [false],
    });
  }

  updateStatuses(): void {
    const statusesArrayLength: number = (this.cardForm.get('statuses') as FormArray).length;
    const statuses: CardStatus[] = [];

    for (let i = 0; i < statusesArrayLength; i++) {
      const status: AbstractControl = (this.cardForm.get('statuses') as FormArray).at(i);
      statuses.push({
        status: parseInt(status.get('status').value, 10),
        count: status.get('count').value,
        text: status.get('text').value,
        isHidden: status.get('isHidden').value,
        isTextHidden: status.get('isTextHidden').value,
        isIconHidden: status.get('isIconHidden').value,
      });
    }

    this.statuses = statuses;
  }

  addNewStatus(): void {
    (this.cardForm.get('statuses') as FormArray).push(this.createStatusFormGroup());
  }

  removeStatus(index: number): void {
    (this.cardForm.get('statuses') as FormArray).removeAt(index);
  }
}
