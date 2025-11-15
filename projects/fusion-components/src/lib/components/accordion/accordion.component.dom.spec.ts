import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TemplateModule } from '@fusion-components/lib/directives/template';

import { AccordionComponentPageObject } from './accordion.component.spec.po';
import { AccordionModule } from './accordion.module';

@Component({
    selector: 'f-test-component',
    template: `
  <f-accordion
    [onePanelLimit]="onePanelLimit"
    [maxContentHeight]="maxContentHeight"
    [toggleAllPanels]="toggleAllPanels">
    @for (panel of panels; track panel) {
      <f-accordion-panel
        [isExpanded]="panel?.isExpanded"
        [isDisabled]="panel?.isDisabled"
        [id]="panel?.id">
        <ng-template fusionUiTemplate="panelTitle">{{ panel?.title }}</ng-template>
        <ng-template fusionUiTemplate="panelContent">{{ panel?.content }}</ng-template>
      </f-accordion-panel>
    }
  </f-accordion>
  `,
    standalone: false
})
export class AccordionTestComponent {
  onePanelLimit: boolean;
  maxContentHeight: string;
  toggleAllPanels: any;
  panels: any[];

  panelContentVisibilityChanged(): void {}

  generatePanels(numOfPanels: number = 0): void {
    const panels: any[] = [];

    for (let i = 0; i < numOfPanels; i++) {
      const panelConfig: any = {
        isExpanded: undefined,
        isDisabled: undefined,
        id: undefined,
        title: `panel title ${i}`,
        content: `panel content ${i}`,
      };
      panels.push(panelConfig);
    }

    this.panels = panels;
  }
}

describe('AccordionComponent', () => {
  let component: AccordionTestComponent;
  let fixture: ComponentFixture<AccordionTestComponent>;
  let page: AccordionComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccordionTestComponent,
      ],
      imports: [
        AccordionModule,
        NoopAnimationsModule,
        TemplateModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(AccordionTestComponent);
    component = fixture.componentInstance;
    page = new AccordionComponentPageObject(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component loads', () => {
    it('should display no panels if none are added', () => {
      component.generatePanels(0);
      fixture.detectChanges();
      expect(page.accordion.panels?.length).toEqual(0);
    });

    it('should display as many panels as added', () => {
      component.generatePanels(1);
      fixture.detectChanges();
      expect(page.accordion.panels?.length).toEqual(1);

      component.generatePanels(5);
      fixture.detectChanges();
      expect(page.accordion.panels?.length).toEqual(5);

      component.generatePanels(10);
      fixture.detectChanges();
      expect(page.accordion.panels?.length).toEqual(10);
    });
  });

  describe('when the panel title is clicked', () => {
    it('should expand the panel if it is closed', async () => {
      component.generatePanels(1);
      fixture.detectChanges();

      expect(page.accordion.panels?.length).toEqual(1);
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();

      const titleButton: HTMLButtonElement | null = page.accordion.getTitleOfPanelAtIndex(0);
      expect(titleButton).toBeTruthy();

      // open a closed panel
      titleButton?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeTruthy();

      // close an opened panel
      titleButton?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();
    });

    it('should only expand or collapse the panel that had its title was clicked', async () => {
      component.generatePanels(2);
      fixture.detectChanges();

      expect(page.accordion.panels?.length).toEqual(2);
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeFalsy();

      const titleButton0: HTMLButtonElement | null = page.accordion.getTitleOfPanelAtIndex(0);
      const titleButton1: HTMLButtonElement | null = page.accordion.getTitleOfPanelAtIndex(1);
      expect(titleButton0).toBeTruthy();
      expect(titleButton1).toBeTruthy();

      // open the first (closed) panel
      titleButton0?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeTruthy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeFalsy();

      // open the second (closed) panel
      titleButton1?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeTruthy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeTruthy();

      // close the first (opened) panel
      titleButton0?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeTruthy();

      // close the second (opened) panel
      titleButton1?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeFalsy();
    });

    it('should not do anything if the panel is disabled', async () => {
      component.generatePanels(1);
      component.panels[0].isDisabled = true;
      fixture.detectChanges();

      expect(page.accordion.panels?.length).toEqual(1);
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();

      const titleButton: HTMLButtonElement | null = page.accordion.getTitleOfPanelAtIndex(0);
      expect(titleButton).toBeTruthy();
      expect(titleButton?.disabled).toBeTruthy();

      titleButton?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();
    });

    it('should close all other panels if onePanelLimit is true', async () => {
      component.generatePanels(3);
      fixture.detectChanges();

      expect(page.accordion.panels?.length).toEqual(3);
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeFalsy();
      expect(page.accordion.getContentOfPanelAtIndex(2)).toBeFalsy();

      const titleButton0: HTMLButtonElement | null = page.accordion.getTitleOfPanelAtIndex(0);
      const titleButton1: HTMLButtonElement | null = page.accordion.getTitleOfPanelAtIndex(1);
      const titleButton2: HTMLButtonElement | null = page.accordion.getTitleOfPanelAtIndex(2);
      expect(titleButton0).toBeTruthy();
      expect(titleButton1).toBeTruthy();
      expect(titleButton2).toBeTruthy();

      // Expand all three (3) panels

      titleButton0?.click();
      titleButton1?.click();
      titleButton2?.click();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeTruthy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeTruthy();
      expect(page.accordion.getContentOfPanelAtIndex(2)).toBeTruthy();

      // Set onePanelLimit to true

      component.onePanelLimit = true;
      fixture.detectChanges();

      // Close the first panel, expect no other panels to collapse or expand

      titleButton0?.click();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeTruthy();
      expect(page.accordion.getContentOfPanelAtIndex(2)).toBeTruthy();

      // Open the first panel, expect all other panels to collapse

      titleButton0?.click();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeTruthy();
      expect(page.accordion.getContentOfPanelAtIndex(1)).toBeFalsy();
      expect(page.accordion.getContentOfPanelAtIndex(2)).toBeFalsy();
    });
  });

  describe('the panel', () => {
    it('should display the correct title and content', async () => {
      component.generatePanels(1);
      fixture.detectChanges();

      expect(page.accordion.panels?.length).toEqual(1);
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeFalsy();

      const titleButton: HTMLButtonElement | null = page.accordion.getTitleOfPanelAtIndex(0);
      expect(titleButton).toBeTruthy();
      expect(titleButton?.querySelector('i')).toBeTruthy();
      expect(titleButton?.innerText).toEqual('panel title 0');

      titleButton?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.accordion.getContentOfPanelAtIndex(0)).toBeTruthy();
      expect(page.accordion.getContentOfPanelAtIndex(0)?.innerText).toEqual('panel content 0');
    });
  });

});
