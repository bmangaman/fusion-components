import { ComponentFixture } from '@angular/core/testing';
import { FusionUiStatusLevel } from '@fusion-ui/fusion-components/lib/shared';

import { GetFusionUiStatusLevelTextPipe } from '@fusion-ui/fusion-components/lib/pipes/get-fusion-ui-status-level-text';

/**
 * CARD PAGE OBJECT
 *
 * Page object for the fusion-ui-card component.
 * Makes it easier to find and select certain fusion-ui-card attributes and elements.
 */
export class CardPageObject {
  private fixture: ComponentFixture<any>;
  private cardClass: string;

  private _getFusionUiStatusLevelTextPipe: GetFusionUiStatusLevelTextPipe = new GetFusionUiStatusLevelTextPipe();

  /**
   * Gets the "fusion-ui-card" element.
   *
   * @returns The "fusion-ui-card" element.
   */
  get card(): HTMLElement {
    // first try to get the fusion-ui-card element by a provided class
    const cardClass: HTMLElement = this.cardClass ? this.fixture.nativeElement.querySelector(this.cardClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-card element by the fusion-ui-card tag
    const fusionCard: HTMLElement = cardClass || this.fixture.nativeElement.querySelector('fusion-ui-card');
    // if fusion-ui-card found, find the actual <card> element by the .fusion-ui-card class
    const card: HTMLElement = fusionCard ? fusionCard.querySelector('.fusion-ui-card') : null;

    return card;
  }

  /**
   * Gets the list of CSS classes on the "fusion-ui-card" element.
   *
   * @returns The list of the CSS classes on the "fusion-ui-card" element.
   */
  get classes(): DOMTokenList {
    const card: HTMLElement = this.card;
    return card ? card.classList : null;
  }

  /**
   * Gets the title container element.
   *
   * @returns The title container element.
   */
  get title(): HTMLElement {
    const card: HTMLElement = this.card;
    return card ? card.querySelector('.fusion-ui-card__title') : null;
  }

  /**
   * Gets the title text element.
   *
   * @returns The title text element.
   */
  get titleText(): HTMLElement {
    const title: HTMLElement = this.title;
    return title ? title.querySelector('.fusion-ui-card__title-text') : null;
  }

  /**
   * Gets the list of status elements in the title.
   *
   * @reutrns The list of the status elements in the title.
   */
  get statuses(): NodeListOf<HTMLElement> {
    const title: HTMLElement = this.title;
    return title ? title.querySelectorAll('.fusion-ui-card__title-status') : null;
  }

  /**
   * Gets a status of the provided type.
   *
   * @param type The type of the status (e.g. ERROR, WARNING, SUCCESS).
   * @param returns The status element for the provided type.
   */
  getStatusByType(type: FusionUiStatusLevel): HTMLElement {
    const title: HTMLElement = this.title;
    const FusionUiStatusLevelText: string = this._getFusionUiStatusLevelTextPipe.transform(type, null, true);
    return title ? title.querySelector(`.fusion-ui-card__title-status--${FusionUiStatusLevelText}`) : null;
  }

  /**
   * Gets the content element.
   *
   * @returns The content element.
   */
  get content(): HTMLElement {
    const card: HTMLElement = this.card;
    return card ? card.querySelector('.fusion-ui-card__content') : null;
  }

  /**
   * Gets the details element.
   *
   * @returns The details element.
   */
  get details(): HTMLElement {
    const card: HTMLElement = this.card;
    return card ? card.querySelector('.fusion-ui-card__details') : null;
  }

  /**
   * @returns the card footer
   */
  get footer(): HTMLElement {
    const card: HTMLElement = this.card;
    return card ? card.querySelector('.fusion-ui-card__footer') : null;
  }

  /**
   * Gets the details button that toggles the visibility of the details content.
   *
   * @returns The details button.
   */
  get detailsButton(): HTMLButtonElement {
    const card: HTMLElement = this.card;
    return card ? card.querySelector('.fusion-ui-card__details-button') : null;
  }

  /**
   * Gets the details content element.
   *
   * @returns The details content element.
   */
  get detailsContent(): HTMLElement {
    const card: HTMLElement = this.card;
    return card ? card.querySelector('.fusion-ui-card__details-content') : null;
  }

  /**
   * Creates a page object for a fusion-ui-card DOM element based on the provided fixture and optional cardClass.
   *
   * @param fixture the parent DOM fixture/ element that houses the fusion-ui-card.
   * @param cardClass optional, providing a css class appended to a fusion-ui-card will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, cardClass?: string) {
    this.fixture = fixture;
    this.cardClass = cardClass;
  }
}
