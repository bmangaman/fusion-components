import { ComponentFixture } from '@angular/core/testing';
import { StatusLevel } from '@fusion-components/lib/shared';

import { GetStatusLevelTextPipe } from '@fusion-components/lib/pipes/get-status-level-text';

/**
 * CARD PAGE OBJECT
 *
 * Page object for the f-card component.
 * Makes it easier to find and select certain f-card attributes and elements.
 */
export class CardPageObject {
  private fixture: ComponentFixture<any>;
  private cardClass: string | undefined;

  private _getStatusLevelTextPipe: GetStatusLevelTextPipe = new GetStatusLevelTextPipe();

  /**
   * Gets the "f-card" element.
   *
   * @returns The "f-card" element.
   */
  get card(): HTMLElement | null {
    // first try to get the f-card element by a provided class
    const cardClass: HTMLElement = this.cardClass ? this.fixture.nativeElement.querySelector(this.cardClass) : null;
    // if no provided class or element not found, try to find the f-card element by the f-card tag
    const fusionCard: HTMLElement = cardClass || this.fixture.nativeElement.querySelector('f-card');
    // if f-card found, find the actual <card> element by the .f-card class
    const card: HTMLElement | null = fusionCard.querySelector('.f-card');

    return card;
  }

  /**
   * Gets the list of CSS classes on the "f-card" element.
   *
   * @returns The list of the CSS classes on the "f-card" element.
   */
  get classes(): DOMTokenList | undefined {
    const card: HTMLElement | null = this.card;
    return card?.classList;
  }

  /**
   * Gets the title container element.
   *
   * @returns The title container element.
   */
  get title(): HTMLElement | null {
    const card: HTMLElement | null = this.card;
    return card ? card.querySelector('.f-card__title') : null;
  }

  /**
   * Gets the title text element.
   *
   * @returns The title text element.
   */
  get titleText(): HTMLElement | null {
    const title: HTMLElement | null = this.title;
    return title ? title.querySelector('.f-card__title-text') : null;
  }

  /**
   * Gets the list of status elements in the title.
   *
   * @reutrns The list of the status elements in the title.
   */
  get statuses(): NodeListOf<HTMLElement> | null {
    const title: HTMLElement | null = this.title;
    return title ? title.querySelectorAll('.f-card__title-status') : null;
  }

  /**
   * Gets a status of the provided type.
   *
   * @param type The type of the status (e.g. ERROR, WARNING, SUCCESS).
   * @returns The status element for the provided type.
   */
  getStatusByType(type: StatusLevel): HTMLElement | null {
    const title: HTMLElement | null = this.title;
    const statusLevelText: string = this._getStatusLevelTextPipe.transform(type, undefined, true);
    return title ? title.querySelector(`.f-card__title-status--${statusLevelText}`) : null;
  }

  /**
   * Gets the content element.
   *
   * @returns The content element.
   */
  get content(): HTMLElement | null {
    const card: HTMLElement | null = this.card;
    return card ? card.querySelector('.f-card__content') : null;
  }

  /**
   * Gets the details element.
   *
   * @returns The details element.
   */
  get details(): HTMLElement | null {
    const card: HTMLElement | null = this.card;
    return card ? card.querySelector('.f-card__details') : null;
  }

  /**
   * @returns the card footer
   */
  get footer(): HTMLElement | null {
    const card: HTMLElement | null = this.card;
    return card ? card.querySelector('.f-card__footer') : null;
  }

  /**
   * Gets the details button that toggles the visibility of the details content.
   *
   * @returns The details button.
   */
  get detailsButton(): HTMLButtonElement | null {
    const card: HTMLElement | null = this.card;
    return card ? card.querySelector('.f-card__details-button') : null;
  }

  /**
   * Gets the details content element.
   *
   * @returns The details content element.
   */
  get detailsContent(): HTMLElement | null {
    const card: HTMLElement | null = this.card;
    return card ? card.querySelector('.f-card__details-content') : null;
  }

  /**
   * Creates a page object for a f-card DOM element based on the provided fixture and optional cardClass.
   *
   * @param fixture the parent DOM fixture/ element that houses the f-card.
   * @param cardClass optional, providing a css class appended to a f-card will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, cardClass?: string) {
    this.fixture = fixture;
    this.cardClass = cardClass || '';
  }
}
