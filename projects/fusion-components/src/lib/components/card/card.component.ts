import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { TemplateDirective } from '../../directives/template';
import { GetStatusLevelTextPipe } from '../../pipes/get-status-level-text';
import { Size, StatusLevel } from '../../shared';
import { CardStatus, CardTemplate, CardTranslations, DEFAULT_CARD_TRANSLATIONS } from './card.interface';

/**
 * CARD COMPONENT
 */
@Component({
  selector: 'f-card',
  templateUrl: 'card.component.html',
})
export class CardComponent implements OnInit, AfterContentInit, OnChanges {
  readonly StatusLevel = StatusLevel;
  readonly Size = Size;
  readonly getStatusLevelPipe: GetStatusLevelTextPipe = new GetStatusLevelTextPipe();
  readonly Observable = Observable;

  containerCssClasses: string[] = [];

  private _isDetailsSectionExpanded: boolean;
  get isDetailsSectionExpanded(): boolean {
    return this._isDetailsSectionExpanded;
  }

  /**
   * Determines the title of the card. Used if a cardTitle template was not provided.
   */
  @Input() title: string;

  /**
   * Determines the content of the card. Used if a cardContent template was not provided.
   */
  @Input() content: string;

  /**
   * Determines the details of the card. Used if a cardDetails template was not provided.
   */
  @Input() details: string;

  /**
   * Determines the footer of the card. Used if a cardFooter template was not provided.
   */
  @Input() footer: string;

  /**
   * Determines the size of the card.
   * Currently only supports MEDIUM and SMALL.
   * By default is MEDIUM.
   */
  @Input() size: Size = Size.MEDIUM;

  /**
   * Allows for custom CSS classes to be appended to the wrapping container.
   */
  @Input() cssClasses: string[] = [];

  /**
   * Determines the status(es) of the card.
   * Affects the styling of the card and any status icons in the title area.
   */
  private _statuses: CardStatus[] = [];
  @Input()
  set statuses(statuses: CardStatus[]) {
    const newStatuses: CardStatus[] = !!statuses && !!statuses.length ?
      statuses
        .filter((status: CardStatus) => !status.isHidden)
        .sort((a: CardStatus, b: CardStatus) => a.status - b.status) :
        [];
    this._statuses = newStatuses;
  }
  get statuses(): CardStatus[] {
    return this._statuses;
  }

  /**
   * Determines whether or not to hide the status bar styling.
   */
  @Input() hideStatusBarStyling: boolean;

  /**
   * Determines the "static" text used in the card component.
   */
  @Input() translations: CardTranslations = DEFAULT_CARD_TRANSLATIONS;

  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  private _cardTitle: TemplateRef<any>;
  get cardTitle(): TemplateRef<any> {
    return this._cardTitle;
  }

  private _cardContent: TemplateRef<any>;
  get cardContent(): TemplateRef<any> {
    return this._cardContent;
  }

  private _cardDetails: TemplateRef<any>;
  get cardDetails(): TemplateRef<any> {
    return this._cardDetails;
  }

  private _cardFooter: TemplateRef<any>;
  get cardFooter(): TemplateRef<any> {
    return this._cardFooter;
  }

  /**
   * On component initialize, generate the container CSS classes.
   */
  ngOnInit(): void {
    this.generateContainerCssClasses();
  }

  /**
   * After the component's content initializes, attempt to find certain elements with TemplateDirectives
   * to figure out what content should be rendered where.
   *
   * 'header' appends a header to the card component.
   * 'content' appends content to the card component.
   * 'details' appends a details section to the card component.
   * 'footer' appends a footer section to the card component.
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      switch (name) {
        case CardTemplate.TITLE:
          this._cardTitle = item.template;
          break;
        case CardTemplate.CONTENT:
          this._cardContent = item.template;
          break;
        case CardTemplate.DETAILS:
          this._cardDetails = item.template;
          break;
        case CardTemplate.FOOTER:
          this._cardFooter = item.template;
          break;
      }
    });
  }

  /**
   * When any inputs change, regenerate the container CSS classes.
   */
  ngOnChanges(): void {
    this.generateContainerCssClasses();
  }

  /**
   * Toggles the visibility of the content of the details section.
   */
  toggleDetailsSectionExpansion(): void {
    this._isDetailsSectionExpanded = !this._isDetailsSectionExpanded;
  }

  /**
   * Generates the container CSS classes based on the provided inputs.
   */
  generateContainerCssClasses(): void {
    const classes: string[] = ['f-card'];

    /**
     * When the thresholds are provided, they are sorted by the StatusLevel enum numerical values (0, 1, 2, etc).
     * The last value in the tresholds array should have the highest value/ be the most critical/ important status.
     * Use that status to indicate what the overall status of the card is (which affects the top border color).
     */
    if (!this.hideStatusBarStyling && !!this.statuses && !!this.statuses.length) {
      const status: string = this.getStatusLevelPipe.transform(
        this.statuses[this.statuses.length - 1].status,
        this.translations.statuses,
        true,
      );
      classes.push(`f-card--${status}`);
    }

    if (!!this.size) {
      classes.push(`f-card--${this.size}`);
    }

    if (!!this.cssClasses) {
      classes.push(...this.cssClasses);
    }

    this.containerCssClasses = classes;
  }
}
