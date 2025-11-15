import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';

import { TemplateDirective } from '../../directives/template';
import { Size } from '../../shared';
import { ButtonType } from '../button';
import { DEFAULT_WIDGET_TRANSLATIONS, InfoBoxDetail, WidgetTemplate, WidgetTranslations } from './widget.interface';

/**
 * WIDGET COMPONENT
 *
 * @example
 * <f-widget
 *   [isTimestampDisplayed]="true"
 *   [isRefreshButtonDisplayed]="true"
 *   [infoDetailsData]="infoDetailsData"
 *   [infoBoxesDetails]="infoBoxesDetails">
 *
 *   <!-- START: header -->
 *   <ng-template [fusionUiTemplate]="WidgetTemplate.HEADER">
 *     Custom Widget Header
 *   </ng-template>
 *   <!-- END: header -->
 *
 *   <!-- START: info boxes -->
 *   <ng-template [fusionUiTemplate]="WidgetTemplate.INFO_BOX">
 *     Custom info box
 *   </ng-template>
 *
 *   <ng-template [fusionUiTemplate]="WidgetTemplate.INFO_BOX">
 *     Custom info box 2
 *   </ng-template>
 *   <!-- END: info boxes -->
 *
 *   <!-- START: info details -->
 *   <ng-template [fusionUiTemplate]="WidgetTemplate.INFO_DETAILS">
 *     Custom info details
 *   </ng-template>
 *   <!-- END: info details -->
 *
 * </f-widget>
 */
@Component({
    selector: 'f-widget',
    templateUrl: 'widget.component.html',
    standalone: false
})
export class WidgetComponent implements AfterContentInit {
  readonly ButtonType =  ButtonType;
  readonly Size = Size;

  private _timestamp: Date = new Date();
  get timeStamp(): Date {
    return this._timestamp;
  }

  private _isInfoDetailsExpanded: boolean;
  get isInfoDetailsExpanded(): boolean {
    return this._isInfoDetailsExpanded;
  }

  /**
   * Determines whether or not the timestemp is displayed in the header.
   * By default is set to true.
   */
  @Input() isTimestampDisplayed: boolean = true;

  /**
   * Determines whether or not the refresh button is displayed in the header.
   * By default is set to true.
   */
  @Input() isRefreshButtonDisplayed: boolean = true;

  /**
   * Determines the data to be displayed in the infoBoxes section.
   */
  @Input() infoBoxesDetails: InfoBoxDetail[] = [];

  /**
   * Determines the data to be displayed in the infoDetails section.
   */
  @Input() infoDetailsData: { [key: string]: any };

  /**
   * Determines the static text used in the component.
   */
  @Input() translations: WidgetTranslations = DEFAULT_WIDGET_TRANSLATIONS;

  /**
   * Emit an event when the refresh button in the header is clicked.
   */
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  private _header: TemplateRef<any>;
  get header(): TemplateRef<any> {
    return this._header;
  }

  private _infoBoxes: TemplateRef<any>[] = [];
  get infoBoxes(): TemplateRef<any>[] {
    return this._infoBoxes;
  }

  private _infoDetails: TemplateRef<any>;
  get infoDetails(): TemplateRef<any> {
    return this._infoDetails;
  }

  /**
   * After the component's content initializes, attempt to find certain elements with TemplateDirectives
   * to figure out what content should be rendered where.
   *
   * 'header' appends a header bar with a timestamp of when the data was last updated and refresh button
   * 'infoDetails' appends an area below the section with info boxes that can be expanded and collapsed
   * 'infoBox' appends an info box to the section displayed between the timestamp and infoDetails sections
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      switch (name) {
        case WidgetTemplate.HEADER:
          this._header = item.template;
          break;
        case WidgetTemplate.INFO_DETAILS:
          this._infoDetails = item.template;
          break;
        case WidgetTemplate.INFO_BOX:
          if (!this.infoBoxes) {
            this._infoBoxes = [];
          }

          this.infoBoxes.push(item.template);
          break;
      }
    });
  }

  /**
   * On button click:
   *  - update the timestamp
   *  - emit that the button was clicked
   */
  refreshData(): void {
    this._timestamp = new Date();
    this.refresh.emit();
  }

  /**
   * Toggles info details content.
   */
  toggleInfoDetailsSection(): void {
    this._isInfoDetailsExpanded = !this.isInfoDetailsExpanded;
  }
}
