import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

import { unsubscribeAll } from '../../shared';
import { HccAccordionIcontype, PanelContentVisibilityChangedEmit } from './accordion.interface';
import { AccordionPanelComponent } from './panel';

/**
 * ACCORDION COMPONENT
 *
 * The Accordion Component is made of tabs and panels.
 *
 * @example
 * <fusion-ui-accordion>
 *   <fusion-ui-accordion-panel>
 *     <ng-template fusionUiTemplate="panelTitle">Panel Title</ng-template>
 *     <ng-template fusionUiTemplate="panelContent">Panel Content</ng-template>
 *   </fusion-ui-accordion-panel>
 *   <fusion-ui-accordion-panel>
 *     <ng-template fusionUiTemplate="panelTitle">Panel Title 2</ng-template>
 *     <ng-template fusionUiTemplate="panelContent">Panel Content 2</ng-template>
 *   </fusion-ui-accordion-panel>
 * </fusion-ui-accordion>
 */
@Component({
  selector: 'fusion-ui-accordion',
  template: '<div class="fusion-ui-accordion"><ng-content></ng-content></div>',
})
export class AccordionComponent implements AfterContentInit {
  subscriptions: Subscription[] = [];
  areAllPanelsExpanded: boolean;

  /**
   * Dictates whether or not multiple panels can be opened at time.
   * By default is false (allowing multiple panels to be opened at a time).
   */
  @Input() onePanelLimit: boolean;

  /**
   * Dicates whether or not the content of each panel has a max height. If set,
   * a scrollbar will appear if the panel content height goes beyond the set max height.
   * There is no max height set by default.
   */
  private _maxContentHeight: string;
  @Input()
  set maxContentHeight(maxHeight: string) {
    this._maxContentHeight = maxHeight;
    this.updatePanelsMaxContentHeight();
  }
  get maxContentHeight(): string {
    return this._maxContentHeight;
  }

  /**
   * Determines the icon to be displayed for when the panel is collapsed by using the proviced classes.
   * If not set (set to undefined or null), will hide the icon.
   * By default is set to the material design plus icon.
   */
  private _expandIconClasses: string = 'mdi mdi-plus';
  @Input()
  set expandIconClasses(iconClasses: string) {
    this._expandIconClasses = iconClasses;
    this.setPanelsIcon(HccAccordionIcontype.EXPAND);
  }
  get expandIconClasses(): string {
    return this._expandIconClasses;
  }

  /**
   * Determines the icon to be displayed for when the panel is expanded by using the provided classes.
   * If not set (set to undefined or null), will hide the icon.
   * By default is set to the material design minus icon.
   */
  private _collapseIconClasses: string = 'mdi mdi-minus';
  @Input()
  set collapseIconClasses(iconClasses: string) {
    this._collapseIconClasses = iconClasses;
    this.setPanelsIcon(HccAccordionIcontype.COLLAPSE);
  }
  get collapseIconClasses(): string {
    return this._collapseIconClasses;
  }

  /**
   * If all panels are expanded, collapse all the panels (hide the contnet).
   * Otherwise, toggle all the panels so that they are all expanded.
   */
  @Input()
  set toggleAllPanels(_any: any) {
    if (this.panels && !!this.panels.toArray().length) {
      const areAllPanelsExpanded = this.areAllPanelsExpanded;
      this.panels.forEach((panel: AccordionPanelComponent) => panel.isExpanded = !areAllPanelsExpanded);
    }
  }

  /**
   * Emits when a panel is opened or closed.
   */
  @Output() panelContentVisibilityChanged: EventEmitter<PanelContentVisibilityChangedEmit> =
    new EventEmitter<PanelContentVisibilityChangedEmit>();

  /**
   * A list of all the AccordionPanelComponent nested within this comoponent.
   * Used to generate the panel titles and content.
   * When the list of panels changes:
   *  - update the subscriptions for when the panel is changed
   *  - update the max content height
   */
  private _panels !: QueryList<AccordionPanelComponent>;
  @ContentChildren(AccordionPanelComponent)
  set panels(panels: QueryList<AccordionPanelComponent>) {
    this._panels = panels;
    this.updatePanelsMaxContentHeight();
    this.subscribeToPanelChanges();
  }
  get panels(): QueryList<AccordionPanelComponent> {
    return this._panels;
  }

  /**
   * Aftr the content initializes:
   *  - make sure the maxContentHeight of each panel is set
   *  - emit the starting state of the panels
   */
  ngAfterContentInit(): void {
    this.updatePanelsMaxContentHeight();
    this.createAndEmitPanelContentVisibilityChangedEmitObject();
  }

  /**
   * Sets the expand and/ or collapse icon classes.
   *
   * @param type The type of accordion icon (either EXPAND or COLLAPSE).
   */
  setPanelsIcon(type: HccAccordionIcontype): void {
    if (this.panels && !!this.panels.toArray().length) {
      this.panels.forEach((panel: AccordionPanelComponent) => panel[`${type}IconClasses`] = this[`${type}IconClasses`]);
    }
  }

  /**
   * First unsubscribe from any active subscriptions.
   * Then, subscribe to each panels' panelHeaderClicked and panelContentVisiblityChanged events.
   * When the panelHeaderClicked event is triggered, toggle the content of the provided panel.
   * When the panelContentVisibilityChanged event is triggered, emit an event with all the panel data and
   * whether or not all expandable (non-disabled) panels are expanded.
   */
  subscribeToPanelChanges(): void {
    unsubscribeAll(this.subscriptions);

    if (this.panels) {
      this.panels.forEach((panel: AccordionPanelComponent) => {
        this.subscriptions.push(panel.panelHeaderClicked.subscribe(((p: AccordionPanelComponent) => this.togglePanelContentVisibility(p))));
        this.subscriptions.push(panel.panelContentVisibilityChanged.subscribe(() => {
          const enabledPanels: AccordionPanelComponent[] = this.panels.filter((p: AccordionPanelComponent) => !p.isDisabled);
          this.areAllPanelsExpanded = enabledPanels.filter((p: AccordionPanelComponent) => p.isExpanded).length === enabledPanels.length;
          this.createAndEmitPanelContentVisibilityChangedEmitObject();
        }));
      });
    }
  }

  /**
   * Creates and emits the PanelContentVisibilityChangedEmit object whenever a panel is expanded or collapsed.
   */
  createAndEmitPanelContentVisibilityChangedEmitObject(): void {
    this.panelContentVisibilityChanged.emit(
      { panels: this.panels.toArray(), areAllPanelsExpanded: this.areAllPanelsExpanded }
    );
  }

  /**
   * Toggles the visibility of a panel's content.
   * If only one panel is allowed to be expanded at a time, collapse all other panels.
   *
   * @param panel The panel to either be expanded or collapsed.
   */
  togglePanelContentVisibility(panel: AccordionPanelComponent): void {
    if (!!panel) {
      panel.isExpanded = !panel.isExpanded;

      if (this.onePanelLimit && panel.isExpanded && !!this.panels && !!this.panels.toArray().length) {
        this.panels.forEach((p: AccordionPanelComponent) => {
          if (p !== panel && p.isExpanded) {
            p.isExpanded = false;
          }
        });
      }
    }
  }

  /**
   * Updates the the maxContentHeight attributes for each panel.
   */
  updatePanelsMaxContentHeight(): void {
    if (!!this.panels) {
      this.panels.forEach((panel: AccordionPanelComponent) => panel.maxContentHeight = this.maxContentHeight);
    }
  }
}
