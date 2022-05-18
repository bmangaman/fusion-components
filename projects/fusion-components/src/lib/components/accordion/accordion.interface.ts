import { AccordionPanelComponent } from './panel';

export interface PanelContentVisibilityChangedEmit {
  panels: AccordionPanelComponent[];
  areAllPanelsExpanded: boolean;
}

export enum HccAccordionIcontype {
  EXPAND = 'expand',
  COLLAPSE = 'collapse',
}
