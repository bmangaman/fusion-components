import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { TemplateDirective } from '@fusion-components/lib/directives/template';

@Component({
  selector: 'f-tabview-tab',
  template: '',
})
export class TabviewTabComponent implements AfterContentInit {
  /**
   * Dictates at what route this tab should be displayed
   * Requires the routingParent input of the parent tabview component to be set
   */
  @Input() route: string;

  /**
   * Dictates whether or not the tab content is loaded (rendered in the DOM, but not necessarily displayed)
   */
  @Input() isLoaded: boolean;

  /**
   * Dictates whether or not a tab is selected (and thus displayed)
   */
  @Input() isSelected: boolean;

  /**
   * Dictates whether or not a tab is disabled (disables the nav button)
   */
  @Input() isDisabled: boolean;

  /**
   * Used to create an ID for the tab title and content (for accessibility)
   * By default, generates an ID
   */
  @Input() id: string = uuidv4();

  /**
   * A list of all the TemplateDirectives nested within this component
   * Used to generate the tab navigation and panels
   */
  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  private _headerTemplate: TemplateRef<any>;
  get headerTemplate(): TemplateRef<any> {
    return this._headerTemplate;
  }

  private _contentTemplate: TemplateRef<any>;
  get contentTemplate(): TemplateRef<any> {
    return this._contentTemplate;
  }

  /**
   * Loops through all the found templates and if any "tabHeader" or "tabContent" templates are found, set
   * headerTemplate and contentTemplate accordingly.
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      if (name === 'tabHeader') {
        this._headerTemplate = item.template;
      }

      if (name === 'tabContent') {
        this._contentTemplate = item.template;
      }
    });
  }
}
