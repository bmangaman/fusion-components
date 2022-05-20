import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { TemplateDirective } from '@fusion-components/lib/directives/template';

/**
 * ACCORDION PANEL COMPONENT
 *
 * The Accordion Panel Component consists of a title and content. The title is a button that is used to toggle the visibility of the
 * content.
 */
@Component({
  selector: 'f-accordion-panel',
  templateUrl: './accordion-panel.component.html',
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0 }),
            animate('350ms ease-out', style({ height: '*' })),
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: '*' }),
            animate('250ms ease-in', style({ height: 0 })),
          ]
        ),
      ],
    ),
  ],
})
export class AccordionPanelComponent implements AfterContentInit {
  /**
   * Determines the icon to be displayed for when the panel is collapsed by using the proviced classes.
   * If not set (set to undefined or null), will hide the icon.
   * By default is set to the material design plus icon.
   */
  @Input() expandIconClasses: string = 'mdi mdi-chevron-down';

  /**
   * Determines the icon to be displayed for when the panel is expanded by using the provided classes.
   * If not set (set to undefined or null), will hide the icon.
   * By default is set to the material design minus icon.
   */
  @Input() collapseIconClasses: string = 'mdi mdi-chevron-up';

  private _maxContentHeight: string;
  @Input()
  set maxContentHeight(height: string) {
    this._maxContentHeight = height;
    if (!!this.maxContentHeight && this.isExpanded && !!this.panelContentContainer) {
      this.panelContentContainer.nativeElement.style.overflow = 'auto';
    }
  }
  get maxContentHeight(): string {
    return this._maxContentHeight;
  }

  /**
   * Dictates whether or not a panel is expanded.
   * When updated, emits the updated panel state.
   * NOT RECOMMENDED to use directly as an input (circumvents onePanelLimit), but available if needed.
   */
  private _isExpanded: boolean;
  @Input()
  set isExpanded(isExpanded: boolean) {
    const prevValue: boolean = this._isExpanded;
    this._isExpanded = this.isDisabled ? false : isExpanded;

    if (prevValue !== this._isExpanded) {
      this.panelContentVisibilityChanged.emit(this);
    }
  }
  get isExpanded(): boolean {
    return this._isExpanded;
  }

  /**
   * Dictates whether or not a panel is disabled.
   * If a panel is disabled, it cannot be expanded.
   * When a panel is set to disabled, make to to close it.
   */
  private _isDisabled: boolean;
  @Input()
  set isDisabled(isDisabled: boolean) {
    this._isDisabled = isDisabled;
    this.isExpanded = isDisabled ? false : this.isExpanded;
  }
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  /**
   * Used to create an ID for the panel title and content (for accessibility).
   * By default, generates an ID.
   */
  private _id: string = uuidv4();
  @Input()
  set id(id: string) {
    this._id = id || this._id;
  }
  get id(): string {
    return this._id;
  }

  /**
   * When an panel header title button is clicked, emit an event containing information about this component.
   */
  @Output() panelHeaderClicked: EventEmitter<AccordionPanelComponent> = new EventEmitter<AccordionPanelComponent>();

  /**
   * When the isExpanded input is updated (with a new value), emit an event that the panel content has either been expanded or collapsed.
   */
  @Output() panelContentVisibilityChanged: EventEmitter<AccordionPanelComponent> = new EventEmitter<AccordionPanelComponent>();

  /**
   * A list of all the TemplateDirectives nested within this component.
   * Used to generate the panels with the correct titles and contents.
   */
  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  private _titleTemplate: TemplateRef<any>;
  get titleTemplate(): TemplateRef<any> {
    return this._titleTemplate;
  }

  private _contentTemplate: TemplateRef<any>;
  get contentTemplate(): TemplateRef<any> {
    return this._contentTemplate;
  }

  /**
   * The container for the panel content. Used to apply 'overflow: auto' styling AFTER the expansion animation finishes.
   */
  @ViewChild('panelContentContainer') panelContentContainer: ElementRef;

  /**
   * Loops through all the found templates and if any "panelTitle" or "panelContent" templates are found, set
   * titleTemplate and contentTemplate accordingly.
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      if (name === 'panelTitle') {
        this._titleTemplate = item.template;
      }

      if (name === 'panelContent') {
        this._contentTemplate = item.template;
      }
    });
  }

  /**
   * Toggles the #panelContentContainer overflow value to auto if maxCotentHeight is set after the expansion animation finishes.
   * This helps keep the vertical scrollbar from appearing or flickering during the expanding and collapsing animations.
   *
   * @param event The animation event used triggered on animation.done.
   */
  toggleOverflow(event: AnimationEvent): void {
    if (!!this.panelContentContainer && !!event) {
      this.panelContentContainer.nativeElement.style.overflow = event.fromState === 'void' && !!this.maxContentHeight ? 'auto' : 'hidden';
    }
  }

  /**
   * When a panel title is clicked, emit the panel as an event so the parent accordion component
   * can correctly handle which panels should be expanded and/ or collapsed.
   */
  toggleContentVisibility(): void {
    this.panelHeaderClicked.emit(this);
  }
}
