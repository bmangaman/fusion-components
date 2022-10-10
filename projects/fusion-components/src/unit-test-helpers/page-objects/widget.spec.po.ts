import { ComponentFixture } from '@angular/core/testing';
import { BadgePageObject } from './badge.spec.po';
import { ButtonPageObject } from './button.spec.po';

/**
 * WIDGET PAGE OBJECT
 *
 * Page object for the f-widget component.
 * Makes it easier to find and select certain f-widget attributes and elements.
 */
export class WidgetPageObject {
  private fixture: ComponentFixture<any>;
  private widgetClass: string | undefined;

  get widget(): HTMLElement | null {
    // first try to get the f-widget element by a provided class
    const widgetClass: HTMLElement = this.widgetClass ? this.fixture.nativeElement.querySelector(this.widgetClass) : null;
    // if no provided class or element not found, try to find the f-widget element by the f-widget tag
    const fusionWidget: HTMLElement = widgetClass || this.fixture.nativeElement.querySelector('f-widget');
    // if f-widget found, find the actual <widget> element by the .f-widget class
    const widget: HTMLElement | null = fusionWidget ? fusionWidget.querySelector('.f-widget') : null;

    return widget;
  }

  /**
   * Gets the widget header.
   *
   * @returns The widget header.
   */
  get header(): HTMLElement | null {
    const widget: HTMLElement | null = this.widget;
    return widget ? widget.querySelector('.f-widget__header') : null;
  }

  /**
   * Gets the widget header timestamp.
   *
   * @returns The widget header timestamp.
   */
  get headerTimestamp(): HTMLElement | null {
    const header: HTMLElement | null = this.header;
    return header ? header.querySelector('.f-widget__header-timestamp') : null;
  }

  /**
   * Gets the widget header content.
   *
   * @returns The widget header content.
   */
  get headerContent(): HTMLElement | null {
    const header: HTMLElement | null = this.header;
    return header ? header.querySelector('.f-widget__header-content') : null;
  }

  /**
   * Gets the widget header refresh button.
   *
   * @returns The widget header refresh button.
   */
  get headerRefreshButton(): ButtonPageObject | null {
    const header: HTMLElement | null = this.header;
    return header ? new ButtonPageObject(this.fixture) : null;
  }

  /**
   * Gets the widget info boxes container.
   *
   * @returns The widget info boxes container.
   */
  get infoBoxesContainer(): HTMLElement | null {
    const widget: HTMLElement | null = this.widget;
    return widget ? widget.querySelector('.f-widget__info-boxes') : null;
  }

  /**
   * Gets the widget header.
   *
   * @returns The widget header.
   */
  get infoBoxes(): NodeListOf<HTMLElement> | null {
    const infoBoxesContainer: HTMLElement | null = this.infoBoxesContainer;
    return infoBoxesContainer ? infoBoxesContainer.querySelectorAll('.f-widget__info-boxes-box') : null;
  }

  /**
   * Gets the info box at the provided index.
   *
   * @param index The index of the info box.
   * @returns The info box element at the provided index.
   */
  getInfoBoxAtIndex(index: number): HTMLElement | null {
    const infoBoxes: NodeListOf<HTMLElement> | null = this.infoBoxes;
    return infoBoxes ? infoBoxes.item(index) : null;
  }

  /**
   * Gets the info box header at the provided index.
   *
   * @param index The index of the info box.
   * @returns The info box header element at the provided index.
   */
  getInfoBoxHeaderAtIndex(index: number): HTMLElement | null {
    const infoBox: HTMLElement | null = this.getInfoBoxAtIndex(index);
    return infoBox ? infoBox.querySelector('.f-widget__info-boxes-box-header') : null;
  }

  /**
   * Gets the info box content at the provided index.
   *
   * @param index The index of the info box.
   * @returns The info box content element at the provided index.
   */
  getInfoBoxContentAtIndex(index: number): HTMLElement | null {
    const infoBox: HTMLElement | null = this.getInfoBoxAtIndex(index);
    return infoBox ? infoBox.querySelector('.f-widget__info-boxes-box-content') : null;
  }

  /**
   * Gets the info box badges container at the provided index.
   *
   * @param index The index of the info box.
   * @returns The info box badges container element at the provided index.
   */
  getInfoBoxBadgesContainerAtIndex(index: number): HTMLElement | null {
    const infoBox: HTMLElement | null = this.getInfoBoxAtIndex(index);
    return infoBox ? infoBox.querySelector('.f-widget__info-boxes-box-badges') : null;
  }

  /**
   * Gets the info box badges at the provided index.
   *
   * @param index The index of the info box.
   * @returns The info box badges element at the provided index.
   */
  getInfoBoxBadgesAtIndex(index: number): BadgePageObject[] {
    const badgesContainer: HTMLElement | null = this.getInfoBoxBadgesContainerAtIndex(index);
    const badgeElements: NodeListOf<HTMLElement> | [] =
      badgesContainer ? badgesContainer.querySelectorAll('.f-widget__info-boxes-box-badges-badge') : [];

    const badges: BadgePageObject[] = [];
    badgeElements.forEach(() => badges.push(new BadgePageObject(this.fixture, '.f-widget__info-boxes-box-badges-badge')));
    return badges;
  }

  /**
   * Gets the info box badges footer at the provided index.
   *
   * @param index The index of the info box.
   * @returns The info box badges footer element at the provided index.
   */
  getInfoBoxFooterAtIndex(index: number): HTMLElement | null {
    const infoBox: HTMLElement | null = this.getInfoBoxAtIndex(index);
    return infoBox ? infoBox.querySelector('.f-widget__info-boxes-box-footer') : null;
  }

  /**
   * Gets the widget info details container.
   *
   * @returns The widget info details container.
   */
  get infoDetailsContainer(): HTMLElement | null {
    const widget: HTMLElement | null = this.widget;
    return widget ? widget.querySelector('.f-widget__info-details') : null;
  }

  /**
   * Gets the widget info details button.
   *
   * @returns The widget info details button.
   */
  get infoDetailsButton(): HTMLButtonElement | null {
    const infoDetailsContainer: HTMLElement | null = this.infoDetailsContainer;
    return infoDetailsContainer ? infoDetailsContainer.querySelector('.f-widget__info-details-button') : null;
  }

  /**
   * Gets the widget info details content.
   *
   * @returns The widget info details content.
   */
  get infoDetailsContent(): HTMLElement | null {
    const infoDetailsContainer: HTMLElement | null = this.infoDetailsContainer;
    return infoDetailsContainer ? infoDetailsContainer.querySelector('.f-widget__info-details-content') : null;
  }

  /**
   * Gets the widget info details table.
   *
   * @returns The widget info details table.
   */
  get infoDetailsTable(): HTMLElement | null {
    const infoDetailsContainer: HTMLElement | null = this.infoDetailsContainer;
    return infoDetailsContainer ? infoDetailsContainer.querySelector('.f-widget__info-details-table') : null;
  }

  /**
   * Gets the widget info details table cells.
   *
   * @returns The widget info details table cells.
   */
  get infoDetailsTableCells(): NodeListOf<HTMLElement> | null {
    const infoDetailsTable: HTMLElement | null = this.infoDetailsTable;
    return infoDetailsTable ? infoDetailsTable.querySelectorAll('.f-widget__info-details-table-cell') : null;
  }

  /**
   * Gets the info details table cell at the provided index.
   *
   * @param index The index of the info table cell.
   * @returns The info details table cell at the provided index.
   */
  getInfoDetailsTableCellAtIndex(index: number): HTMLElement | null {
    const infoDetailsTableCells: NodeListOf<HTMLElement> | null = this.infoDetailsTableCells;
    return infoDetailsTableCells ? infoDetailsTableCells.item(index) : null;
  }

  /**
   * Gets the info details table cell key at the provided index.
   *
   * @param index The index of the info table cell.
   * @returns The info details table cell key at the provided index.
   */
  getInfoDetailsTableCellKeyAtIndex(index: number): HTMLElement | null {
    const tableCell: HTMLElement | null = this.getInfoDetailsTableCellAtIndex(index);
    return tableCell ? tableCell.querySelector('.f-widget__info-details-table-cell-key') : null;
  }

  /**
   * Gets the info details table cell value at the provided index.
   *
   * @param index The index of the info table cell.
   * @returns The info details table cell value at the provided index.
   */
  getInfoDetailsTableCellValueAtIndex(index: number): HTMLElement | null {
    const tableCell: HTMLElement | null = this.getInfoDetailsTableCellAtIndex(index);
    return tableCell ? tableCell.querySelector('.f-widget__info-details-table-cell-value') : null;
  }

  /**
   * Creates a page object for a f-widget DOM element based on the provided fixture and optional widgetClass
   *
   * @param fixture the parent DOM fixture/ element that houses the f-widget
   * @param widgetClass optional, providing a css class appended to a f-widget will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, widgetClass?: string) {
    this.fixture = fixture;
    this.widgetClass = widgetClass;
  }
}
