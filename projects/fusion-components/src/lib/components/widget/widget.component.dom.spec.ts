import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FusionUiStatusLevel } from '../../shared/interfaces';
import { WidgetComponentPageObject } from './widget.component.spec.po';
import { DEFAULT_WIDGET_TRANSLATIONS, InfoBoxDetail, WidgetTemplate, WidgetTranslations } from './widget.interface';
import { WidgetModule } from './widget.module';

@Component({
  selector: 'fusion-ui-test-component',
  template: `
  <fusion-ui-widget
    *ngIf="isComponentRendered"
    [isTimestampDisplayed]="isTimestampDisplayed"
    [isRefreshButtonDisplayed]="isRefreshButtonDisplayed"
    [infoDetailsData]="infoDetailsData"
    [infoBoxesDetails]="infoBoxesDetails"
    (refresh)="refresh()">

    <!-- START: header -->
    <ng-container *ngIf="isContentHeader">
      <ng-template [fusionUiTemplate]="WidgetTemplate.HEADER">Custom Widget Header</ng-template>
    </ng-container>
    <!-- END: header -->

    <!-- START: info boxes -->
    <ng-container *ngIf="isCustomInfoBoxes">
      <ng-template [fusionUiTemplate]="WidgetTemplate.INFO_BOX">Custom info box</ng-template>
      <ng-template [fusionUiTemplate]="WidgetTemplate.INFO_BOX">Custom info box 2</ng-template>
    </ng-container>
    <!-- END: info boxes -->

    <!-- START: info details -->
    <ng-container *ngIf="isCustomInfoDetails">
      <ng-template [fusionUiTemplate]="WidgetTemplate.INFO_DETAILS">Custom info details</ng-template>
    </ng-container>
    <!-- END: info details -->

  </fusion-ui-widget>
  `,
})
export class WidgetTestComponent {
  readonly WidgetTemplate = WidgetTemplate;

  isComponentRendered: boolean = true;
  isContentHeader: boolean;
  isCustomInfoBoxes: boolean;
  isCustomInfoDetails: boolean;

  isTimestampDisplayed: boolean;
  isRefreshButtonDisplayed: boolean;
  infoBoxesDetails: InfoBoxDetail[];
  infoDetailsData: { [key: string]: any };
  translations: WidgetTranslations = DEFAULT_WIDGET_TRANSLATIONS;

  refresh(): void {}
}

describe('WizardComponent', () => {
  let component: WidgetTestComponent;
  let fixture: ComponentFixture<WidgetTestComponent>;
  let page: WidgetComponentPageObject;

  const infoBoxesDetails: InfoBoxDetail[] = [
    {
      header: 'Movies Released This Year',
      content: '15,739',
    },
    {
      header: 'Highest Grossing Movie',
      content: '$3.4B',
      footer: 'Gone with the Wind',
    },
    {
      header: 'Movies Below 20% Rating',
      badges: [
        {
          text: 1807,
          type: FusionUiStatusLevel.WARNING,
        },
      ],
    },
    {
      header: 'Recommend Home Alone',
      badges: [
        {
          text: 44,
          subText: 'Yes',
          type: FusionUiStatusLevel.SUCCESS,
        },
        {
          text: 93,
          subText: 'No',
          type: FusionUiStatusLevel.CRITICAL,
        },
      ],
    },
  ];

  const infoDetailsData: { [key: string]: any } = {
    key: 'value',
    key2: 2,
    key3: WidgetTemplate.HEADER,
    key4: 'value4',
    key5: 5,
    key6: WidgetTemplate.INFO_BOX,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        WidgetTestComponent,
      ],
      imports: [
        WidgetModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTestComponent);
    component = fixture.componentInstance;
    page = new WidgetComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.widget.widget).toBeTruthy();
  });

  describe('the widget header', () => {
    it('should NOT be displayed if isTimestampDisplayed and isRefreshButtonDisplayed is false, and there is no custom header', () => {
      component.isTimestampDisplayed = false;
      component.isRefreshButtonDisplayed = false;
      component.isContentHeader = false;
      reloadComponent();
      expect(page.widget.header).toBeFalsy();
    });

    it('should display the timestamp in the header if isTimestampDisplayed is true', () => {
      component.isTimestampDisplayed = true;
      fixture.detectChanges();
      expect(page.widget.header).toBeTruthy();
      expect(page.widget.headerTimestamp).toBeTruthy();
    });

    it('should display the refresh button in the header if isRefreshButtonDisplayed is true', () => {
      spyOn(component, 'refresh').and.stub();

      component.isRefreshButtonDisplayed = true;
      fixture.detectChanges();
      expect(page.widget.header).toBeTruthy();
      expect(page.widget.headerRefreshButton).toBeTruthy();

      page.widget.headerRefreshButton.button.click();
      fixture.detectChanges();
      expect(component.refresh).toHaveBeenCalled();
    });

    it('should display the custom header content is provided as a template', () => {
      component.isContentHeader = true;
      reloadComponent();
      expect(page.widget.header).toBeTruthy();
      expect(page.widget.headerContent).toBeTruthy();
    });
  });

  describe('the info boxes', () => {
    it('should NOT be displayed if neither infoBoxes nor infoBoxesDetails are defined or have values', () => {
      component.infoBoxesDetails = null;
      component.isCustomInfoBoxes = null;
      reloadComponent();
      expect(page.widget.infoBoxesContainer).toBeFalsy();

      component.infoBoxesDetails = [];
      fixture.detectChanges();
      expect(page.widget.infoBoxesContainer).toBeFalsy();
    });

    it('should display the provided infoBoxesDetails', () => {
      component.infoBoxesDetails = infoBoxesDetails;
      fixture.detectChanges();

      expect(page.widget.infoBoxesContainer).toBeTruthy();
      expect(page.widget.infoBoxes.length).toEqual(4);

      expect(page.widget.getInfoBoxHeaderAtIndex(0).innerText).toEqual(infoBoxesDetails[0].header as string);
      expect(page.widget.getInfoBoxContentAtIndex(0).innerText).toEqual(infoBoxesDetails[0].content as string);
      expect(page.widget.getInfoBoxBadgesContainerAtIndex(0)).toBeFalsy();
      expect(page.widget.getInfoBoxFooterAtIndex(0)).toBeFalsy();

      expect(page.widget.getInfoBoxHeaderAtIndex(1).innerText).toEqual(infoBoxesDetails[1].header as string);
      expect(page.widget.getInfoBoxContentAtIndex(1).innerText).toEqual(infoBoxesDetails[1].content as string);
      expect(page.widget.getInfoBoxBadgesContainerAtIndex(1)).toBeFalsy();
      expect(page.widget.getInfoBoxFooterAtIndex(1).innerText).toEqual(infoBoxesDetails[1].footer as string);

      expect(page.widget.getInfoBoxHeaderAtIndex(2).innerText).toEqual(infoBoxesDetails[2].header as string);
      expect(page.widget.getInfoBoxContentAtIndex(2)).toBeFalsy();
      expect(page.widget.getInfoBoxBadgesContainerAtIndex(2)).toBeTruthy();
      expect(page.widget.getInfoBoxBadgesAtIndex(2).length).toEqual(1);
      expect(page.widget.getInfoBoxFooterAtIndex(2)).toBeFalsy();

      expect(page.widget.getInfoBoxHeaderAtIndex(3).innerText).toEqual(infoBoxesDetails[3].header as string);
      expect(page.widget.getInfoBoxContentAtIndex(3)).toBeFalsy();
      expect(page.widget.getInfoBoxBadgesContainerAtIndex(3)).toBeTruthy();
      expect(page.widget.getInfoBoxBadgesAtIndex(3).length).toEqual(2);
      expect(page.widget.getInfoBoxFooterAtIndex(3)).toBeFalsy();
    });

    it('should display the provided infoBoxes (as templates)', () => {
      component.isCustomInfoBoxes = true;
      reloadComponent();

      expect(page.widget.infoBoxesContainer).toBeTruthy();
      expect(page.widget.infoBoxes.length).toEqual(2);

      expect(page.widget.getInfoBoxAtIndex(0).innerText).toEqual('Custom info box');
      expect(page.widget.getInfoBoxAtIndex(1).innerText).toEqual('Custom info box 2');
    });
  });

  describe('the info details', () => {
    it('should NOT be displayed if neither infoDetails or infoDetailsData are defined', () => {
      component.infoDetailsData = null;
      component.isCustomInfoDetails = null;
      reloadComponent();
      expect(page.widget.infoDetailsContainer).toBeFalsy();
    });

    it('should toggle the visibility of the details content when the button is clicked', () => {
      component.infoDetailsData = infoDetailsData;
      fixture.detectChanges();

      expect(page.widget.infoDetailsContainer).toBeTruthy();
      expect(page.widget.infoDetailsButton).toBeTruthy();
      expect(page.widget.infoDetailsContent).toBeFalsy();
      page.widget.infoDetailsButton.click();
      fixture.detectChanges();
      expect(page.widget.infoDetailsContent).toBeTruthy();
    });

    it('should display the table when infoDetailsData is provided', () => {
      component.infoDetailsData = infoDetailsData;
      fixture.detectChanges();

      page.widget.infoDetailsButton.click();
      fixture.detectChanges();
      expect(page.widget.infoDetailsContent).toBeTruthy();
      expect(page.widget.infoDetailsTable).toBeTruthy();
      expect(page.widget.infoDetailsTableCells.length).toEqual(6);

      Object.keys(infoDetailsData).forEach((key: string, i: number) => {
        expect(page.widget.getInfoDetailsTableCellKeyAtIndex(i).innerText).toEqual(key);
        expect(page.widget.getInfoDetailsTableCellValueAtIndex(i).innerText).toEqual(infoDetailsData[key].toString());
      });
    });

    it('should display the custom content if infoDetails is provided as a template', () => {
      component.isCustomInfoDetails = true;
      reloadComponent();

      page.widget.infoDetailsButton.click();
      fixture.detectChanges();
      expect(page.widget.infoDetailsContent).toBeTruthy();
      expect(page.widget.infoDetailsContent.innerText).toEqual('Custom info details');
    });
  });

  function reloadComponent(): void {
    component.isComponentRendered = false;
    fixture.detectChanges();
    component.isComponentRendered = true;
    fixture.detectChanges();
  }
});
