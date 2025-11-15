import { Directive, ViewContainerRef } from '@angular/core';

/**
 * TABLE FILTER HOST DIRECTIVE
 *
 * Used to provide consistent location for the table filter to be rendered in the TableFilterSelectorComponent.
 */
@Directive({
    selector: '[fusionUiFilterHost]',
    standalone: false
})
export class TableFilterHostDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
  ) {}
}
