import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { Size, StatusLevel } from '../../shared';
import { CardComponentPageObject } from './card.component.spec.po';
import { CardStatus, CardTemplate, CardTranslations, DEFAULT_CARD_TRANSLATIONS } from './card.interface';
import { CardModule } from './card.module';

@Component({
    selector: 'f-test-component',
    template: `
  @if (isLoaded) {
    <f-card
      [title]="title"
      [content]="content"
      [details]="details"
      [footer]="footer"
      [hideStatusBarStyling]="hideStatusBarStyling"
      [size]="size"
      [translations]="translations"
      [statuses]="statuses">
      @if (useTitleTemplate) {
        <ng-template [fusionUiTemplate]="CardTemplate.TITLE">Template Title</ng-template>
      }
      @if (useContentTemplate) {
        <ng-template [fusionUiTemplate]="CardTemplate.CONTENT">Template Content</ng-template>
      }
      @if (useDetailsTemplate) {
        <ng-template [fusionUiTemplate]="CardTemplate.DETAILS">Template Details</ng-template>
      }
      @if (useFooterTemplate) {
        <ng-template [fusionUiTemplate]="CardTemplate.FOOTER">Template Footer</ng-template>
      }
    </f-card>
  }
  `,
    standalone: false
})
export class CardTestComponent {
  readonly CardTemplate = CardTemplate;

  title: string;
  content: string;
  details: string;
  footer: string;
  size: Size;
  cssClasses: string[];
  statuses: CardStatus[];
  hideStatusBarStyling: boolean;
  translations: CardTranslations = DEFAULT_CARD_TRANSLATIONS;

  useTitleTemplate: boolean;
  useContentTemplate: boolean;
  useDetailsTemplate: boolean;
  useFooterTemplate: boolean;

  isLoaded: boolean;
}

describe('CardComponent', () => {
  let component: CardTestComponent;
  let fixture: ComponentFixture<CardTestComponent>;
  let page: CardComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardTestComponent,
      ],
      imports: [
        CardModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CardTestComponent);
    component = fixture.componentInstance;
    page = new CardComponentPageObject(fixture);
    component.isLoaded = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.card).toBeTruthy();
  });

  describe('the title', () => {
    beforeEach(() => {
      expect(page.card.title).toBeTruthy();
    });

    it('should not display the title text if not provided', () => {
      component.title = undefined!
      component.useTitleTemplate = false;
      reloadComponent();
      expect(page.card.titleText).toBeFalsy();
    });

    it('should display the title input text if no cardTitle template found', () => {
      component.title = 'TITLE';
      component.useTitleTemplate = false;
      reloadComponent();
      expect(page.card.titleText).toBeTruthy();
      expect(page.card.titleText?.innerText).toContain('TITLE');
    });

    it('should use the cardTitle template if provided', () => {
      component.title = 'TITLE';
      component.useTitleTemplate = true;
      reloadComponent();
      expect(page.card.titleText).toBeTruthy();
      expect(page.card.titleText?.innerText).toContain('Template Title');
    });

    it('should display the the provided statuses', () => {
      component.statuses = undefined!
      reloadComponent();
      expect(page.card.statuses).toBeTruthy();
      expect(page.card.statuses?.length).toEqual(0);

      component.statuses = [];
      reloadComponent();
      expect(page.card.statuses).toBeTruthy();
      expect(page.card.statuses?.length).toEqual(0);

      component.statuses = [
        { status: StatusLevel.SUCCESS },
        { status: StatusLevel.ERROR },
      ];
      reloadComponent();
      expect(page.card.statuses).toBeTruthy();
      expect(page.card.statuses?.length).toEqual(2);
      expect(page.card.getStatusByType(StatusLevel.SUCCESS)).toBeTruthy();
      expect(page.card.getStatusByType(StatusLevel.ERROR)).toBeTruthy();
      expect(page.card.getStatusByType(StatusLevel.CRITICAL)).toBeFalsy();
    });

    it('should display the provided status text', () => {
      let expectedText = 'NORMAL TEXT';
      component.statuses = [
        { status: StatusLevel.SUCCESS, text: expectedText },
      ];
      reloadComponent();
      expect(page.card.statuses).toBeTruthy();
      expect(page.card.statuses?.length).toEqual(1);
      let success = page.card.getStatusByType(StatusLevel.SUCCESS);
      expect(success).toBeTruthy();
      expect(success?.innerText).toEqual(expectedText);

      expectedText = 'ASYNC TEXT';
      component.statuses = [
        { status: StatusLevel.SUCCESS, text: of(expectedText) },
      ];
      reloadComponent();
      expect(page.card.statuses).toBeTruthy();
      expect(page.card.statuses?.length).toEqual(1);
      expect(page.card.getStatusByType(StatusLevel.SUCCESS)).toBeTruthy();
      success = page.card.getStatusByType(StatusLevel.SUCCESS);
      expect(success).toBeTruthy();
      expect(success?.innerText).toEqual(expectedText);
    });
  });

  describe('the content', () => {
    it('should display the content input text if no cardContent template found', () => {
      component.content = 'CONTENT';
      component.useContentTemplate = false;
      reloadComponent();
      expect(page.card.content).toBeTruthy();
      expect(page.card.content?.innerText).toContain('CONTENT');
    });

    it('should use the cardContent template if provided', () => {
      component.content = 'CONTENT';
      component.useContentTemplate = true;
      reloadComponent();
      expect(page.card.content).toBeTruthy();
      expect(page.card.content?.innerText).toContain('Template Content');
    });
  });

  describe('the details', () => {
    it('should not be visible if not provided', () => {
      component.details = undefined!
      component.useDetailsTemplate = false;
      reloadComponent();
      expect(page.card.details).toBeFalsy();
    });

    it('should toggle the details content when the button is clicked', () => {
      component.details = 'DETAILS';
      component.useDetailsTemplate = false;
      reloadComponent();
      expect(page.card.details).toBeTruthy();
      expect(page.card.detailsButton).toBeTruthy();
      expect(page.card.detailsContent).toBeFalsy();
      page.card.detailsButton?.click();
      fixture.detectChanges();
      expect(page.card.detailsContent).toBeTruthy();
      expect(page.card.detailsContent?.innerText).toContain('DETAILS');
    });

    it('should display the content input text if no cardContent template found', () => {
      component.details = 'DETAILS';
      component.useDetailsTemplate = false;
      reloadComponent();
      expect(page.card.details).toBeTruthy();
      expect(page.card.detailsButton).toBeTruthy();
      expect(page.card.detailsContent).toBeFalsy();
      page.card.detailsButton?.click();
      fixture.detectChanges();
      expect(page.card.detailsContent).toBeTruthy();
      expect(page.card.detailsContent?.innerText).toContain('DETAILS');
    });

    it('should use the cardContent template if provided', () => {
      component.details = 'DETAILS';
      component.useDetailsTemplate = true;
      reloadComponent();
      expect(page.card.details).toBeTruthy();
      expect(page.card.detailsButton).toBeTruthy();
      expect(page.card.detailsContent).toBeFalsy();
      page.card.detailsButton?.click();
      fixture.detectChanges();
      expect(page.card.detailsContent).toBeTruthy();
      expect(page.card.detailsContent?.innerText).toContain('Template Details');
    });
  });

  describe('the footer', () => {
    it('should display the footer input text if no cardFooter template found', () => {
      component.footer = 'FOOTER';
      component.useFooterTemplate = false;
      reloadComponent();
      expect(page.card.footer).toBeTruthy();
      expect(page.card.footer?.innerText).toContain('FOOTER');
    });

    it('should use the cardFooter template if provided', () => {
      component.footer = 'FOOTER';
      component.useFooterTemplate = true;
      reloadComponent();
      expect(page.card.footer).toBeTruthy();
      expect(page.card.footer?.innerText).toContain('Template Footer');
    });
  });

  /**
   * Helper function to reload the component by hiding it and then revealing it in the DOM.
   */
  function reloadComponent(): void {
    component.isLoaded = false;
    fixture.detectChanges();
    component.isLoaded = true;
    fixture.detectChanges();
  }

});
