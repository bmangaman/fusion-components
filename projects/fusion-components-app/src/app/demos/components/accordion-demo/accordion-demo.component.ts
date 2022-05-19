import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { PanelContentVisibilityChangedEmit, AccordionPanelComponent } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-accordion',
  templateUrl: './accordion-demo.component.html',
  styleUrls: ['./accordion-demo.component.scss']
})
export class AccordionDemoComponent {
  private numberOfPanels: number = 0;
  isAllExpanded: boolean;
  triggerExpandAll: any;
  accordionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildAccordionForm();
  }

  buildAccordionForm(): void {
    this.accordionForm = this.fb.group({
      onePanelLimit: [false],
      maxContentHeight: [''],
      expandIconClasses: ['mdi mdi-chevron-down'],
      collapseIconClasses: ['mdi mdi-chevron-up'],
      panels: this.fb.array([]),
    });

    this.addNewPanel();
    this.addNewPanel();
  }

  createPanelFormGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      isDisabled: [false],
      isExpanded: [false],
      content: [`Panel Content ${this.numberOfPanels}`, Validators.required],
      title: [`Panel Title ${this.numberOfPanels}`, Validators.required],
    });
  }

  addNewPanel(): void {
    (this.accordionForm.get('panels') as FormArray).push(this.createPanelFormGroup());
    this.numberOfPanels++;
  }

  removePanel(index: number): void {
    (this.accordionForm.get('panels') as FormArray).removeAt(index);
  }

  updateAccordionForm(event: PanelContentVisibilityChangedEmit): void {
    if (event && event.panels && !!event.panels.length) {
      setTimeout(() => {
        event.panels.forEach((panel: AccordionPanelComponent, index: number) => {
          const panelFormGroup: FormGroup = (this.accordionForm.get('panels') as FormArray).at(index) as FormGroup;
          panelFormGroup.get('id').setValue(panel.id);
          panelFormGroup.get('isDisabled').setValue(panel.isDisabled);
          panelFormGroup.get('isExpanded').setValue(panel.isExpanded);
        });
        this.isAllExpanded = event.areAllPanelsExpanded;
      });
    }
  }

  toggleAll(): void {
    this.triggerExpandAll = {};
  }
}
