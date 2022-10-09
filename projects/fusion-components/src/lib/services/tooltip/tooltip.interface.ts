import { ElementRef, TemplateRef } from '@angular/core';

export interface TooltipConfig {
  id: string;
  text?: string;
  template?: TemplateRef<any> | null;
  templateWithContext?: { template?: TemplateRef<any> | null, context?: { $implicit: any } };
  position?: any;
  element?: ElementRef;
  classes?: string[];
  appendedElement?: HTMLElement;
  zIndex?: number;
}
