import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelContentVisibilityChangedEmit, AccordionPanelComponent } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { AccordionModule } from '../../../../../../fusion-components/src/lib/components/accordion/accordion.module';
import { TemplateModule } from '../../../../../../fusion-components/src/lib/directives/template/template.module';

@Component({
    selector: 'fusion-demo-accordion',
    templateUrl: './accordion-demo.component.html',
    styleUrls: ['./accordion-demo.component.scss'],
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, AccordionModule, TemplateModule]
})
export class AccordionDemoComponent {
  private numberOfPanels: number = 0;

  isAllExpanded: boolean = false;
  triggerExpandAll: any;
  accordionForm: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    private fb: UntypedFormBuilder,
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

  createPanelFormGroup(): UntypedFormGroup {
    return this.fb.group({
      id: [''],
      isDisabled: [false],
      isExpanded: [false],
      content: [`Panel Content ${this.numberOfPanels}`, Validators.required],
      title: [`Panel Title ${this.numberOfPanels}`, Validators.required],
    });
  }

  addNewPanel(): void {
    (this.accordionForm.get('panels') as UntypedFormArray).push(this.createPanelFormGroup());
    this.numberOfPanels++;
  }

  removePanel(index: number): void {
    (this.accordionForm.get('panels') as UntypedFormArray).removeAt(index);
  }

  updateAccordionForm(event: PanelContentVisibilityChangedEmit): void {
    if (event && event.panels && !!event.panels.length) {
      setTimeout(() => {
        event.panels.forEach((panel: AccordionPanelComponent, index: number) => {
          const panelFormGroup: UntypedFormGroup = (this.accordionForm.get('panels') as UntypedFormArray).at(index) as UntypedFormGroup;
          panelFormGroup.get('id')?.setValue(panel.id);
          panelFormGroup.get('isDisabled')?.setValue(panel.isDisabled);
          panelFormGroup.get('isExpanded')?.setValue(panel.isExpanded);
        });
        this.isAllExpanded = event.areAllPanelsExpanded;
      });
    }
  }

  toggleAll(): void {
    this.triggerExpandAll = {};
  }

  get panelsFormArray(): FormArray {
    return this.accordionForm.get('panels') as FormArray;
  }
}
